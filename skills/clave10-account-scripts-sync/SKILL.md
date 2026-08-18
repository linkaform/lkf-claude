---
name: clave10-account-scripts-sync
description: Automatiza la actualización de scripts de módulos de Linkaform/Clave10 (lkf-addons) en una o varias cuentas de clientes, y el bootstrap del registro personal accounts.json a partir de un catálogo versionado de cuentas Clave10. Úsala cuando Paco pida "actualizar scripts", "instalar scripts de X módulo en tal cuenta", "correr lkfaddons", "cambiar de cuenta en local_settings", "actualizar scripts en varias cuentas / batch", "configurar mi accounts.json", o "refrescar mis credenciales". Cada cuenta de Clave10 tiene su propia base de datos y su propia versión de scripts que solo se actualiza corriendo manualmente `lkfaddons install -m <modulo> -i scripts` dentro del contenedor lkf-addons, después de cambiar las credenciales activas en config/local_settings.py. Esta skill automatiza ese ciclo completo (cambiar cuenta -> correr comando -> confirmar los dos prompts "y" -> repetir para la siguiente cuenta) para no tener que hacerlo a mano cuenta por cuenta. Separa "qué cuentas son Clave10" (references/accounts.template.json, versionado, sin secretos, solo se edita a mano) de "qué credenciales tiene cada persona" (accounts.json personal, generado por bootstrap_accounts.py desde local_settings.py de cada quien) — así ningún usuario nuevo puede jalar por accidente una cuenta de otro producto que no tiene Clave10.
---

# Sync de scripts de módulos en cuentas de Clave10

## Contexto del problema

En Clave10/Linkaform hay dos mecanismos de actualización distintos:

1. **lkf-addons global (Docker build+push)** — actualiza el contenedor padre y, después de un tiempo, los contenedores hijos, o se puede forzar con un comando directo. **Esto NO lo cubre esta skill** (Paco ya lo tiene resuelto).
2. **Scripts por cuenta** — cada cuenta cliente tiene su propia versión de scripts (módulo por módulo) que **solo se actualiza manualmente**, entrando al contenedor `lkf-addons` y corriendo:
   ```
   lkfaddons install -m <modulo> -i scripts
   ```
   con las credenciales de ESA cuenta activas en `config/local_settings.py`. El comando pide doble confirmación escribiendo `y` dos veces.

El archivo `local_settings.py` normalmente tiene ~20 cuentas, todas comentadas menos una (la activa). Cambiar de cuenta a mano implica comentar/descomentar bloques y volver a correr el comando — tedioso si hay que actualizar varias cuentas seguidas.

## Cómo funciona esta skill

En vez de tocar los bloques comentados del `local_settings.py` existente (frágil, propenso a error), esta skill usa un **registro de cuentas separado** (`accounts.json`, fuera de git, nunca se sube a ningún repo) del cual regenera `local_settings.py` limpio para la cuenta activa en cada paso del batch.

### Flujo

1. Verificar que existe `accounts.json`. Si no existe, o si cambiaron credenciales en `local_settings.py`, correr la **etapa de bootstrap** (ver sección siguiente) — nunca copiar cuentas de `local_settings.py` a mano ni asumir que todo lo que hay ahí es Clave10.
2. Confirmar con Paco: **lista de cuentas** (nombres/keys tal como están en `accounts.json`, o `all` para todas). `--local-settings-path`, `--accounts-file` y `--module` ya traen default (ruta local de Paco y módulo `accesos`) — solo pedirle que los especifique si quiere otro módulo distinto de `accesos` o si alguna ruta cambió.
3. Correr el script:
   ```bash
   python3 scripts/sync_accounts.py --accounts seguridad,gfh,hlmando
   ```
   Si Paco pide otro módulo u otra ruta, pasar el override explícito:
   ```bash
   python3 scripts/sync_accounts.py \
     --module transportistas \
     --accounts seguridad,gfh,hlmando
   ```
4. El script, por cada cuenta:
   - Regenera `local_settings.py` con solo los datos de esa cuenta.
   - Corre `docker exec -i lkf-addons bash -c "cd /srv/scripts/addons && lkfaddons install -m <modulo> -i scripts"` alimentando `y\ny\n` a los dos prompts de confirmación.
   - Registra éxito/error, qué scripts se actualizaron, y continúa con la siguiente cuenta aunque una falle.
   - Antes de tocar nada, el script ya tomó un snapshot automático de tu `local_settings.py` personal (la cuenta activa antes de correr el batch) en `~/.config/clave10/local_settings_backup.py`. Al terminar el batch, restaura `local_settings.py` desde ese snapshot, salvo que se pase `--no-restore`. Ya no depende de que Paco mantenga a mano un `local_settings_backup.py`: lo genera la skill misma en cada corrida.
5. Al final imprime un resumen tipo:
   ```
   ✅ seguridad   - OK - 1 script(s) actualizados: ocr_docs
   ✅ gfh         - OK - sin cambios
   ❌ hlmando     - ERROR (ver log arriba)
   ```
6. **Regla fija, siempre:** después de correr, pegar a Paco el LOG real de cada cuenta en un code block — no una tabla condensada. Por "log" Paco entiende el bloque de salida del proceso (`Running on`, `With User`, `Account id`, el resumen de `Reading Scripts`, y la(s) línea(s) `Creating script: X` o su ausencia), cerrando cada bloque con la línea `Scripts actualizados en <cuenta> (N): ...` o `ninguno`. Una tabla resumen puede agregarse *además*, pero nunca en lugar del log por cuenta. Esto aplica a toda corrida (real o dry-run), sin que Paco tenga que pedirlo cada vez.

### Etapa 0 — bootstrap de tu `accounts.json` personal

`local_settings.py` mezcla, en el mismo archivo y comentadas por igual, cuentas de
Clave10 **y cuentas de otros productos/pruebas de Linkaform que NO tienen el
módulo Clave10 instalado** (por ejemplo cuentas de Servido, cuentas de prueba,
etc.). Correr `lkfaddons install` o `./lkf update prod` contra una de esas
cuentas sería un error serio — por eso `accounts.json` **nunca** se genera
directo desde "todo lo que hay en `local_settings.py`".

En su lugar hay dos fuentes separadas:

1. **`references/accounts.template.json`** — registro **versionado** (vive en
   este repo, sin secretos: solo `username` + `account_id`, `apikey` siempre
   `""`) de qué cuentas SÍ son Clave10. Esta es la ÚNICA lista de la que se
   puede tomar cuentas. Dar de alta una cuenta Clave10 nueva es un cambio
   deliberado a este archivo (un commit normal, con alguien confirmando que
   esa cuenta sí tiene el módulo) — ninguna skill lo hace automáticamente.
2. **Tu `local_settings.py`** — de ahí solo se toman credenciales (apikey,
   openrouter, couch), nunca la decisión de qué cuentas existen.

`scripts/bootstrap_accounts.py` cruza ambas fuentes: para cada cuenta del
template, si tu `local_settings.py` trae su apikey, se copia a tu
`accounts.json` personal (`~/.config/clave10/accounts.json`, fuera de git); si
no la tienes, el campo se deja vacío — simplemente significa que todavía no
tienes acceso a esa cuenta, no es un error y no bloquea al resto.

```bash
# Genera o refresca tu accounts.json con lo que tengas en tu local_settings.py.
# Sin prompts: nunca puede agregar una cuenta que no esté en el template.
python3 scripts/bootstrap_accounts.py

# Ver qué escribiría sin tocar nada
python3 scripts/bootstrap_accounts.py --dry-run
```

Por qué esto es seguro sin pedir confirmación por cuenta:
- La decisión de "esta cuenta es Clave10" ya se tomó una vez, a mano, al
  agregarla al `accounts.template.json` versionado — no se vuelve a tomar en
  cada corrida.
- Nunca puede aparecer en tu `accounts.json` una cuenta que no esté en el
  template, sin importar qué tenga tu `local_settings.py` (ver caso `condumex`
  más abajo).
- Si `local_settings.py` trae dos bloques duplicados para la misma cuenta con
  datos distintos en el mismo campo, esa cuenta se reporta como conflicto y se
  omite (queda sin apikey) en vez de decidir en silencio cuál valor usar.
- Como en el resto de esta skill, nunca se imprime un apikey/password
  completo — siempre enmascarado (`58c6...0ce2`) o `(vacio)`.

`scripts/sync_accounts.py` valida esto también: si le pides una cuenta cuyo
`apikey` quedó vacío, se detiene con un mensaje claro en vez de intentar
autenticar con una credencial vacía.

Corre esta etapa la primera vez que alguien configura la skill, y cada vez que
cambien las credenciales en su `local_settings.py` — nunca editar
`accounts.json` a mano.

### Antes de correr en modo batch real

Ofrecer correr primero con `--dry-run` (no ejecuta docker exec, solo muestra qué `local_settings.py` generaría y qué comando correría por cuenta) cuando:
- Es la primera vez que se usa la skill.
- Se va a correr contra más de 3 cuentas de un jalón.
- Paco no lo pide explícitamente pero parece inseguro del resultado.

### Configuración confirmada

- `--local-settings-path`: confirmado, `/Users/pacogod/lkf/addons/config/local_settings.py` en esta Mac (volumen montado al contenedor). Si Paco corre esto desde otra máquina, pedir la ruta explícita.
- `--container`: se asume `lkf-addons` (confirmado por el prompt `nonroot@lkf-addons` que Paco mostró), pero validar si tiene otro nombre en `docker ps` antes de la primera corrida real.

## Seguridad — reglas estrictas

- **Nunca** imprimir el contenido completo de `accounts.json` ni de las API keys/contraseñas en el chat, ni copiarlas dentro de este SKILL.md o de cualquier commit.
- `accounts.json` debe vivir fuera de cualquier repo versionado (o en un repo privado con el path explícitamente en `.gitignore`). Si Paco no lo tiene así, recordárselo una vez.
- Si algo falla y hay que mostrar el error, recortar/ofuscar cualquier valor que luzca como una API key o password antes de mostrarlo (ej. mostrar `APIKEY: 58c6...0ce2` en vez de completo).
- No subir el `local_settings.py` generado a git — confirmar que ya está en `.gitignore` del proyecto addons.

## Archivos de esta skill

- `scripts/bootstrap_accounts.py` — etapa 0: genera/refresca tu `accounts.json` personal cruzando `accounts.template.json` (versionado) con tu `local_settings.py` (ver `--help`).
- `scripts/sync_accounts.py` — script principal del batch de sync (ver `--help` para todas las opciones).
- `references/accounts.template.json` — **versionado**: registro real de cuentas Clave10 (username + account_id, sin secretos). Editar este archivo es la única forma de dar de alta una cuenta nueva.
- `references/accounts.example.json` — formato de ejemplo con valores ficticios, solo para documentar la forma de `accounts.json` (el personal, con secretos).
