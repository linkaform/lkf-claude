---
name: clave10-account-scripts-sync
description: Automatiza la actualización de scripts de módulos de Linkaform/Clave10 (lkf-addons) en una o varias cuentas de clientes. Úsala cuando Paco pida "actualizar scripts", "instalar scripts de X módulo en tal cuenta", "correr lkfaddons", "cambiar de cuenta con workwith", o "actualizar scripts en varias cuentas / batch", o "subir/instalar una forma (o reportes, catálogos) en varias cuentas". Cada cuenta de Clave10 tiene su propia base de datos y su propia versión de scripts que solo se actualiza corriendo manualmente `lkfaddons install -m <modulo> -i scripts` dentro del contenedor lkf-addons, después de dejar esa cuenta activa con `./lkf workwith <dominio>`. Esta skill automatiza ese ciclo completo (cambiar cuenta -> correr comando -> confirmar los dos prompts "y" -> repetir para la siguiente cuenta) para no tener que hacerlo a mano cuenta por cuenta.
---

# Sync de scripts de módulos en cuentas de Clave10

## Contexto del problema

En Clave10/Linkaform hay dos mecanismos de actualización distintos:

1. **lkf-addons global (Docker build+push)** — actualiza el contenedor padre y, después de un tiempo, los contenedores hijos, o se puede forzar con un comando directo. **Esto NO lo cubre esta skill** (Paco ya lo tiene resuelto, es la skill hermana `clave10-prod-update`).
2. **Scripts por cuenta** — cada cuenta cliente tiene su propia versión de scripts (módulo por módulo) que **solo se actualiza manualmente**, entrando al contenedor `lkf-addons` y corriendo:
   ```
   lkfaddons install -m <modulo> -i scripts
   ```
   con las credenciales de ESA cuenta activas. El comando pide doble confirmación escribiendo `y` dos veces.

## Cómo se cambia de cuenta activa (`./lkf workwith`, en `clave10-sdk/addons`)

Ya **no** se edita `config/local_settings.py` a mano (comentar/descomentar bloques). Ese archivo ahora es un loader dinámico: en cada arranque lee `secrets/accounts.ini` (catálogo real de cuentas, fuera de git) + `secrets/current_domain` (puntero de texto con el dominio activo) y arma la config con eso.

Cambiar de cuenta se hace con:

```bash
./lkf workwith <dominio>
```

corrido **en el HOST** (no dentro del contenedor — `modules/` es un submódulo cuyo `.git` real no está montado ahí) desde la raíz de `addons`. Este comando, además de fijar las credenciales activas:
- Exige que `modules/` esté limpio (sin cambios sin commitear) — si no, falla y pide `git stash`/`commit` a mano.
- Cambia el submódulo `modules/` a la rama del cliente (`branch_name` del `.ini`, o el nombre del dominio si no hay `branch_name`) — la crea desde `origin/<rama>` si solo existe remota; si no existe en ningún lado, falla y sugiere `./lkf branches create`.
- Mergea `origin/master` a favor de la rama del cliente (deja un commit de merge local si hacía falta).
- Escribe `secrets/current_domain`.

El **environment** (`local`/`preprod`/`prod`) es un toggle aparte, ortogonal a la cuenta:

```bash
./lkf workon <local|preprod|prod>
```

Escribe `secrets/current_env`, de eso depende `HOST`/`PROTOCOL`/`mongo_hosts`. Si nunca se corre, cae a `prod` por default.

`secrets/` está montado como volumen dentro del contenedor `lkf-addons`, así que estos cambios hechos en el host se ven de inmediato dentro del contenedor sin reiniciar nada.

## Cómo funciona esta skill

No regenera ningún archivo de credenciales: llama a `./lkf workwith <dominio>` por cada cuenta, y `workwith` toma las credenciales de `secrets/accounts.ini`. La lista de **qué cuentas son Clave10** (para `all` y para validar nombres) sale de:

1. `~/.config/clave10/accounts.json` (personal, fuera de git) si existe — Paco lo mantiene aparte de `accounts.ini` a propósito; no proponer unificarlos.
2. Si no existe, `references/accounts.template.json` — catálogo **versionado**, sin secretos (username + account_id + `workwith_domain`). Cualquier miembro del equipo puede usar la skill solo con esto + su `secrets/accounts.ini`. Dar de alta una cuenta Clave10 nueva = commit deliberado a este archivo.

`all` nunca toma cuentas de `accounts.ini` (ahí hay cuentas de otros productos sin Clave10, p. ej. `condumex`, `milenium`).

**Importante:** las keys de la lista deben coincidir con el nombre de sección en `secrets/accounts.ini` para que `workwith` las resuelva. Si no coinciden, agregar el campo opcional `"workwith_domain"` en esa cuenta dentro de `accounts.json` (ver `references/accounts.example.json`). Si una cuenta no tiene sección en `accounts.ini` todavía, `workwith` fallará limpio y el batch la reporta como ERROR con el motivo — no es un bug de la skill, es que a esa cuenta le falta su rama de cliente.

### Flujo

1. El script dice al arrancar de dónde tomó las cuentas (`Cuentas desde: ...`). Si alguien no tiene `accounts.json`, usa el template sin hacer nada más.
2. Confirmar con Paco: **lista de cuentas** (keys de `accounts.json`, o `all` para todas), **módulo** (default `accesos`), y **environment** (default `prod`) si el batch es contra preprod.
3. Correr el script:
   ```bash
   python3 scripts/sync_accounts.py --accounts seguridad,gfh,hlmando
   ```
   Con overrides:
   ```bash
   python3 scripts/sync_accounts.py \
     --module transportistas \
     --env preprod \
     --accounts seguridad,gfh,hlmando
   ```
   Otros tipos de item (formas, reportes, catálogos) con `--items` — ver la sección de formas abajo antes de usarlo:
   ```bash
   python3 scripts/sync_accounts.py --items forms --accounts seguridad,gfh
   python3 scripts/sync_accounts.py --items "scripts reports" --accounts all
   ```
4. El script:
   - Guarda qué cuenta/environment estaban activos ANTES del batch (lee `secrets/current_domain` y `secrets/current_env`).
   - Corre `./lkf workon <env>` una sola vez (no por cuenta).
   - Por cada cuenta: `./lkf workwith <dominio>` (host, raíz de `addons`) y luego `docker exec -i lkf-addons bash -c "cd /srv/scripts/addons && lkfaddons install -m <modulo> -i scripts"` alimentando `y\ny\n`.
   - Si `workwith` falla (rama sucia, rama inexistente, dominio no está en el catálogo), lo reporta con el motivo y por default detiene el batch ahí (mismo criterio que un error de `lkfaddons`); usar `--continue-on-error` para seguir con las demás cuentas.
   - Al terminar, salvo `--no-restore`, vuelve a correr `./lkf workwith <dominio_original>` (y `./lkf workon <env_original>` si cambió) para dejar a Paco exactamente en la cuenta/rama/environment donde estaba antes de correr el batch.
5. Al final imprime un resumen tipo:
   ```
   ✅ seguridad   - OK - 1 script(s) actualizados: ocr_docs
   ✅ gfh         - OK - sin cambios
   ❌ hlmando     - ERROR (ver log arriba)
   ```
6. **Regla fija, siempre:** después de correr, pegar a Paco el LOG real de cada cuenta en un code block — no una tabla condensada. Por "log" Paco entiende el bloque de salida completo: la salida de `workwith` (rama, merge de master si aplicó) y la de `lkfaddons` (`Running on`, `With User`, `Account id`, el resumen de `Reading Scripts`, y la(s) línea(s) `Creating script: X` o su ausencia), cerrando cada bloque con la línea `Scripts actualizados en <cuenta> (N): ...` o `ninguno`. Una tabla resumen puede agregarse *además*, pero nunca en lugar del log por cuenta. Esto aplica a toda corrida (real o dry-run), sin que Paco tenga que pedirlo cada vez.

### Efecto colateral esperado: merge automático de master por cuenta

Cada `workwith` de una cuenta puede dejar un commit de merge local en la rama de ese cliente (trae `origin/master` a favor de la rama). En un batch de N cuentas eso son hasta N commits de merge en una sola corrida — es el comportamiento normal de `workwith` (lo mismo pasaría corriéndolo a mano cuenta por cuenta), Paco ya lo confirmó como esperado. No hay flag para desactivarlo; si algún día hace falta, es un cambio en `bin/workwith.py`, no en esta skill.

### Formas en varias cuentas (`--items forms`)

`--items forms` corre `lkfaddons install -m <modulo> -i forms`, que instala **todas** las formas del módulo en la cuenta, no solo la que cambiaste. Desde addons `bedb225` solo sube las que tengan versión local más nueva que la instalada (`Form X sin cambios (local N <= instalada N), no se sube`), así que:

- **Subir la versión** de la forma que cambiaste: `<description>version: N</description>` y `updated_at` en el XML (regla 5 del `CLAUDE.md` del plugin). Sin eso no se instala en ninguna cuenta.
- Revisar en el log de cada cuenta qué líneas `Installing Form (...)` salieron: si aparece una forma que no tocaste, esa cuenta tenía una versión vieja y también se actualizó — avisar.
- Si la forma cambió en la rama de una cuenta (personalización del cliente), `workwith` mergea `origin/master` y la versión de la rama es la que se sube.
- Instalar **una sola forma** usa `-id <form_id>`, pero el form_id es distinto en cada cuenta, así que este batch no lo soporta: se hace a mano cuenta por cuenta (`./lkf workwith <dominio>` y `docker exec -i lkf-addons sh -c 'yes y | lkfaddons install -m <mod> -i forms -id <id>'`).

Antes de un batch de formas, correr primero contra una cuenta de prueba (`testing`) y revisar el log.

### Antes de correr en modo batch real

Ofrecer correr primero con `--dry-run` (no ejecuta `workwith`/`workon`/`docker exec` reales, solo muestra los comandos) cuando:
- Es la primera vez que se usa la skill.
- Se va a correr contra más de 3 cuentas de un jalón.
- Paco no lo pide explícitamente pero parece inseguro del resultado.

### Configuración

- `--container`: default `lkf-addons` (el `container_name` fijo del compose de `clave10-sdk`).
- `--lkf-path`: no hace falta pasarlo. Se resuelve con `lib/lkf_workspace.py` del plugin (repo `addons`): `LKF_ADDONS`, `~/.config/lkf/workspace.json`, y autodetección desde el cwd y `~/lkf`. Diagnóstico: `python3 lib/lkf_workspace.py`.

## Seguridad — reglas estrictas

- **Nunca** imprimir el contenido completo de `accounts.json` ni de las API keys/contraseñas en el chat, ni copiarlas dentro de este SKILL.md o de cualquier commit. Lo mismo aplica a `secrets/accounts.ini`.
- `accounts.json` debe vivir fuera de cualquier repo versionado (o en un repo privado con el path explícitamente en `.gitignore`). Si Paco no lo tiene así, recordárselo una vez.
- Si algo falla y hay que mostrar el error, recortar/ofuscar cualquier valor que luzca como una API key o password antes de mostrarlo (ej. mostrar `APIKEY: 58c6...0ce2` en vez de completo).
- Si se detecta una inconsistencia entre `accounts.json` y `secrets/accounts.ini` (account_id distinto, dominio faltante), avisarle a Paco explícitamente en vez de asumir cuál de los dos vale — puede ser un error real en el `.ini` (ya pasó: la sección `soter` traía el `account_id`/`branch_name` de `litoprocess`).

## Archivos de esta skill

- `scripts/sync_accounts.py` — script principal (ver `--help` para todas las opciones).
- `references/accounts.template.json` — **versionado**: catálogo de cuentas Clave10 (sin secretos). Lista default si no hay `accounts.json` personal.
- `references/accounts.example.json` — formato de ejemplo para un `accounts.json` personal (valores ficticios), incluye el campo opcional `workwith_domain`.
