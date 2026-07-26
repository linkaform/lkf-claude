# airflow_linkaform_integration — Cómo LinkaForm genera y ejecuta DAGs en Airflow

Describe el flujo completo desde que LinkaForm define una tarea programada hasta que Airflow la ejecuta, pasando por `airflow_bob` como capa intermedia.

## Arquitectura general

```
LinkaForm UI
    ↓  POST /cron (JSON con tasks + schedule)
airflow_bob (Flask + MongoDB)
    ↓  escribe archivo .py
/opt/airflow/dags/bob_dags/account_{id}/dag_{account}_{sub_id}_{schedule}_{hash}.py
    ↓  Airflow scheduler detecta automáticamente
Airflow Worker ejecuta:
    LKFLogin → xcom_push(jwt) → LKFRunScript / CreateRecord / CreateAndAssignTask
    ↓
airflow_bob recibe notificación POST /event/setRecord
```

## Componentes

### airflow_bob (~/lkf/airflow_bob)
Framework Flask que actúa como puente. No es Airflow, es un servicio separado (container `af_airflow-bob`).

**Endpoints clave:**
| Ruta | Método | Función |
|------|--------|---------|
| `/cron` | POST | Crea DAG nuevo (genera .py + guarda en MongoDB) |
| `/cron` | PATCH | Pausa/reanuda DAG |
| `/cron/<dag_id>` | POST | Ejecuta DAG manualmente |
| `/event/setRecord` | POST | Registra ejecución de tarea (llamado desde `set_record_on_event`) |

**Generación del DAG:**
1. Recibe JSON con `tasks`, `schedule_interval`, `params` (username, api_key)
2. `dag_builder()` usa `pythonGenerator.py` (clases `PyModule`, `PyDag`, `DagTask`) para generar código Python
3. Escribe el `.py` en `/opt/airflow/dags/bob_dags/account_{account_id}/`
4. Airflow lo detecta automáticamente sin reiniciar

### lkf_operator.py (~/lkf/airflow/plugins/)
Operadores de Airflow que implementan la lógica de LinkaForm:

| Operador | Responsabilidad |
|----------|----------------|
| `LKFLogin` | Autentica en LinkaForm, pushea JWT a XCom |
| `LKFRunScript` | Ejecuta un script por ID (`script_id`) |
| `CreateRecord` | Crea un registro en un formulario (`form_id` + `answers`) |
| `CreateAndAssignTask` | Crea registro Y lo asigna a usuario/grupo |

**Funciones utilitarias:**
- `update_config(jwt)` — inyecta JWT en `settings.config` y retorna cliente `lkf_api`
- `get_jwt(context)` — busca JWT en XCom de cualquier task del dag run (ver `airflow_xcom_jwt`)
- `eval_answers(answers)` — evalúa expresiones dinámicas `{% $today + $hours - 7 %}` en respuestas
- `calc_funcint(func)` — evalúa variables de tiempo: `$today`, `$weekStart`, `$weekEnd`, `$hours`, `$weekNumber`

## Formato del DAG generado

```python
# Nombre: dag_{account_id}_{subscription_id}_{schedule}_{hash}.py
from lkf_operator import LKFLogin, LKFRunScript

args = {'owner': 'airflow', 'email': [...], 'retries': 3, ...}
params = {
    'username': Param(default='user@company.com', schema={'type': 'string'}),
    'api_key': Param(default='<apikey>', schema={'type': 'string'}),
}

with DAG(dag_id='dag_<account_id>_<sub_id>_<schedule>_<hash>', ..., params=params) as dag:
    do_run_lkf_login_{sub_id}_1 = LKFLogin(
        name='LKF Login',
        task_id='run_lkf_login_{sub_id}_1',
    )
    do_run_{task_name}_{sub_id}_2 = LKFRunScript(
        name='Nombre tarea',
        task_id='run_{task_name}_{sub_id}_2',
        params={'script_id': '<script_id>'},
    )

do_run_lkf_login_{sub_id}_1.set_downstream(do_run_{task_name}_{sub_id}_2)
```

**Convención de task_id:** `run_{task_name_snake}_{subscription_id}_{idx}`  
Ejemplo: `run_sync_de_oracle_<sub_id>_2`

## Debugging en Docker Swarm

**Containers relevantes:**
- `af_airflow-worker` — donde se ejecutan las tasks (aquí están los logs)
- `af_airflow-bob` — donde corre el framework de generación de DAGs
- `af_airflow-scheduler` — detecta y programa DAGs

**Ver log de una task:**
```bash
docker exec -it af_airflow-worker.1.<id> bash
# Logs en Airflow 2.x:
cd '/opt/airflow/logs/dag_id=dag_<account_id>_<sub_id>_<schedule>_<hash>/run_id=manual__.../
cat 'task_id=run_sync_de_oracle_<sub_id>_2/attempt=1.log'
```

**Probar task sin scheduler:**
```bash
docker exec -it af_airflow-worker.1.<id> bash
airflow tasks test dag_<account_id>_<sub_id>_<schedule>_<hash> run_sync_de_oracle_<sub_id>_2 2026-06-28
```

**Aplicar cambio en plugin sin rebuild:**
```bash
docker cp /path/to/lkf_operator.py af_airflow-worker.1.<id>:/opt/airflow/plugins/lkf_operator.py
```

## Persistencia en MongoDB

airflow_bob almacena en la DB `cron_task`:
- `CronModel` — uno por DAG (schedule, params, tasks)
- `CronTask` — una por tarea dentro del DAG
- `EventRecord` — registro de cada ejecución programada

## Notas

- Los `params` del DAG (username, api_key) se pasan como `Param` de Airflow y están disponibles en `context['params']` dentro de los operadores
- `LKFLogin` lee `username`/`api_key` de `self.parameters` que viene de `kwargs.get('params', {})`
- Los `answers` en `CreateRecord`/`CreateAndAssignTask` pueden contener expresiones dinámicas evaluadas en tiempo de ejecución con `eval_answers()`
- `set_record_on_event()` hace POST al endpoint `/event/setRecord` de airflow_bob para registrar la ejecución; no es crítico para el flujo principal
- El ambiente se detecta por el hostname del container: sufijo `_local`, `_qa`, `_preprod`
