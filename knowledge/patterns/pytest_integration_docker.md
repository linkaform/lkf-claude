# Pytest Integration Docker

> Gotchas reales al correr/escribir pruebas de integración contra la API real desde `./lkf test` / `./lkf start test` (repo `addons`).

## Dos servicios de compose, propósitos distintos

`test/docker/docker-compose.yaml` define dos servicios que comparten imagen
pero tienen roles opuestos:

- **`lkf-do-test`** → `command: pytest` fijo. Es lo que corre `./lkf test`
  (acción bare, sin environment). Corre TODO automáticamente y termina —
  nunca deja una shell interactiva.
- **`lkf-test`** → sin `command` (queda con `tty`/`stdin_open`). Es lo que
  levanta `./lkf start test` (`docker compose up -d lkf-test && docker exec
  -it lkf-test bash`). Aquí es donde se hacen pruebas manuales / exploración.

Si algo falla solo en uno de los dos, sospecha primero de sus `volumes:` —
históricamente `lkf-do-test` ha quedado desincronizado de `lkf-test` (le
faltaban los mounts de `lkf_modules`, `lkf_addons`, y la llave
`lkf_jwt_key.pub`). Ambos servicios deben montar exactamente lo mismo salvo
`command`/`tty`.

## `account_settings` solo se resuelve después de importar `linkaform_api`

`from account_settings import settings` falla con `ModuleNotFoundError` si
lo haces en una shell nueva sin haber importado nada antes:

```python
>>> from account_settings import settings
ModuleNotFoundError: No module named 'account_settings'
```

Razón: `/srv/scripts/addons/config/` (donde vive `account_settings.py`,
montado desde `addons/config/` del host) solo se agrega a `sys.path` como
**efecto secundario** de importar `linkaform_api`:

```python
# linkaform_api/__init__.py y linkaform_api/lkf_base/__init__.py
sys.path.append('/srv/scripts/addons/config/')
```

Para explorar a mano en la shell interactiva, importa `linkaform_api` (o
cualquier `Accesos`/módulo que lo importe transitivamente) ANTES de tocar
`account_settings`:

```python
import linkaform_api
from account_settings import settings
print(settings.config)
```

## `settings.config` apunta a producción real, no a un sandbox

`HOST: app.linkaform.com`, `MONGODB_HOST: db2/db3/db4.linkaform.com`,
`ACCOUNT_ID: 10` (`seguridad@linkaform.com`) — toda la suite de integración
existente (y la que se agregue) corre contra la cuenta de producción real
de Linkaform/Clave10, no un ambiente aislado. Implicaciones:

- Usa nombres/emails/teléfonos obviamente de prueba en los datos que crees.
- Evita campos que disparen notificaciones reales
  (`enviar_correo_pre_registro`, `enviar_sms_pre_registro`) salvo que sea
  intencional.
- Si el flujo crea registros de "checkin/checkout" o similares, cierra el
  par (ver `feedback_clave10_test_cleanup` en memoria del agente) — nunca
  soft-delete accesos, deja el par abierto/cerrado limpio.

## pytest aborta TODA la colección si hay un solo error de import en cualquier archivo

```
!!!!!!!!!!!!!!!!!!! Interrupted: N errors during collection !!!!!!!!!!!!!!!!!!!!
```

Esto significa que **ningún test corrió**, ni siquiera los que sí importan
bien — no es un resumen parcial. Causas típicas encontradas en este repo:

- Falta `__init__.py` en algún nivel de la sección (ej. `accesos/concesionados/`
  lo tenía en `integration/` pero no en el nivel de sección — comparar
  contra una sección que sí funciona, como `rondines/`, antes de asumir
  cuál falta).
- Un archivo usa una dependencia no declarada en `requires.txt` (ej.
  `pandas`, usado solo por `stock/ont_test.py`, nunca estuvo en el
  requirements — el `ModuleNotFoundError` se ve solo al importar ese
  archivo específico, no al importar el resto del paquete).
- Un archivo `_test_template`/scaffold con imports placeholder
  (`Module.module_testing`) — no está pensado para ejecutarse, solo para
  copiarse. Se excluye con `collect_ignore_glob` en su `conftest.py`, no
  "arreglando" el placeholder.

Dos formas de destrabar sin arreglar todo el árbol de una:

```bash
# Opción A: correr solo la carpeta que te interesa
docker compose run --rm lkf-do-test pytest sdk_testing/accesos/passes/ -v

# Opción B: dejar que el resto corra ignorando lo roto
docker compose run --rm lkf-do-test pytest --continue-on-collection-errors -v
```

## Iterar rápido sin pasar por `./lkf test`

Si `docker` está disponible en el mismo host donde corre el agente/CLI, se
puede validar colección e incluso ejecutar tests puntuales directamente,
sin pedirle al humano que corra comandos:

```bash
cd addons/test/docker
docker compose run --rm lkf-do-test pytest sdk_testing/accesos/<seccion>/ --collect-only -q
docker compose run --rm lkf-do-test pytest sdk_testing/accesos/<seccion>/test_x.py::test_y -v -s
```

Limpiar los contenedores `run` que quedan atrás (uno por invocación):
```bash
docker ps -a --filter "name=docker-lkf-do-test-run" --format "{{.Names}}" | xargs -r docker rm -f
```

## Ver también
- `patterns/env_comparison_testing.md` — otro harness de verificación con datos reales.
- `patterns/legacy_script_migration.md` — punto 7, mismo espíritu de "verificar con datos reales, no solo lectura de código".
