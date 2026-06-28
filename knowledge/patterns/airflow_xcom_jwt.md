# airflow_xcom_jwt — XCom JWT entre tasks en Airflow 2.x

En Airflow 2.x, `xcom_pull(key='jwt')` sin `task_ids` retorna `None` cuando el JWT fue pusheado por otro task (ej. `LKFLogin`). Esto hace que la API de LinkaForm rechace el request como usuario anónimo.

## Causa

`LKFLogin.execute()` pushea el JWT con:
```python
context['ti'].xcom_push(key='jwt', value=jwt_recover)
```
Pero en Airflow 2.x, `xcom_pull` sin `task_ids` solo jala XComs del **task actual**, no de upstream tasks.

## Solución: helper get_jwt(context)

```python
def get_jwt(context):
    ti = context['ti']
    # Primero intenta el task actual (por si mismo lo pusheó)
    jwt = ti.xcom_pull(key='jwt')
    if jwt:
        return jwt
    # Busca en todos los task instances del dag run
    for task_instance in context['dag_run'].get_task_instances():
        jwt = ti.xcom_pull(task_ids=task_instance.task_id, key='jwt')
        if jwt:
            return jwt
    return None
```

## Uso en todos los operadores

```python
# Reemplaza context['ti'].xcom_pull(key='jwt') en:
# - LKFRunScript.execute()
# - CreateAndAssignTask.execute() y set_record_on_event()
# - CreateRecord.execute() y set_record_on_event()

lkf_api = update_config(get_jwt(context))
JWT = get_jwt(context)
```

## Notas

- Hay 5 ocurrencias de `xcom_pull(key='jwt')` en `lkf_operator.py` (líneas ~312, 341, 410, 438, 481)
- El helper es robusto: funciona sin importar el `task_id` exacto del login en cada DAG
- Los DAGs generados por `airflow_bob` tienen el login con `task_id` dinámico:
  `run_lkf_login_{subscription_id}_1`
- Para aplicar en producción sin rebuild del Docker image:
  ```bash
  docker cp lkf_operator.py <worker_container>:/opt/airflow/plugins/lkf_operator.py
  ```
- Síntoma: error `"El usuario es anónimo y el script es privado"` con status 400
