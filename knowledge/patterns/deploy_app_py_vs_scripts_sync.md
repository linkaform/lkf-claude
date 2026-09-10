# Deploy: app.py vs sync de scripts

> Por qué un fix en `lkf_addons/addons/<modulo>/app.py` sigue fallando en
> producción después de correr `lkfaddons install -i scripts` — y qué hace
> falta realmente para que se refleje.

## El problema

`lkfaddons install -m <modulo> -i scripts` (ver skill
`clave10-account-scripts-sync`) solo sincroniza los **entry-point scripts**
sueltos en `modules/<modulo>/items/scripts/<Modulo>/` — los flags válidos de
`-i` son `forms`, `catalogs`, `scripts`, `reports`. No existe un flag
`-i app`/`-i core`.

`lkf_addons/addons/` (donde vive `app.py`, la clase principal del módulo)
**no es un volumen montado** como `modules/` — se copia dentro de la imagen
Docker en build time (`COPY /lkf_addons /usr/local/lib/python3.10/site-packages/lkf_addons/`
en el Dockerfile del stage prod). Si modificas un método en `app.py` y solo
corres el sync de scripts, el entry-point actualizado puede llamar a ese
método con argumentos/comportamiento nuevo mientras la clase base dentro del
contenedor sigue siendo la vieja.

## Cómo se manifiesta

El entry-point script sí se sincronizó (el log de `lkfaddons install`
confirma "Updating script"), pero la llamada real contra la cuenta sigue
fallando — típicamente con un error que apunta a una firma de método
desactualizada, ej.:

```
TypeError: Accesos.get_page_stats() got an unexpected keyword argument 'dateFrom'
```

## El fix: cuándo hace falta rebuild, no solo sync

Si el cambio de backend toca `lkf_addons/addons/<modulo>/app.py` (o
cualquier archivo del paquete `lkf_addons`, no solo el entry-point script en
`modules/`), el sync de scripts **no basta**. Hace falta:

```bash
git push origin master   # el build de prod hace git pull origin master primero
./lkf -p build prod       # reconstruye Y sube la imagen (flag -p = upload)
./lkf update prod <id>    # reinicia el contenedor de esa cuenta con la imagen nueva
```

El último paso es exactamente lo que cubre la skill `clave10-prod-update` —
distinta de `clave10-account-scripts-sync`, que solo cubre el paso de
scripts. Si tu cambio toca ambos (entry-point Y `app.py`), corre las dos
skills, en ese orden (scripts primero, build+update después).

## Regla rápida para saber cuál necesitas

| Archivo modificado | Comando |
|---|---|
| `modules/<modulo>/items/scripts/<Modulo>/*.py` (entry-point) | `lkfaddons install -m <modulo> -i scripts` |
| `modules/<modulo>/items/forms\|catalogs\|reports/*` | `lkfaddons install -m <modulo> -i forms\|catalogs\|reports` |
| `lkf_addons/addons/<modulo>/app.py` o `model.py` (o cualquier cosa dentro de `lkf_addons/`) | `git push` + `./lkf -p build prod` + `./lkf update prod <id>` |

## Ver también
- `patterns/env_comparison_testing.md` / `patterns/pytest_integration_docker.md`
  — probar contra `docker exec` verifica la DB real pero tampoco corre el
  código que sirve `app.linkaform.com`; el gap es análogo (sync de scripts
  ≠ código realmente corriendo en el contenedor de la cuenta).
