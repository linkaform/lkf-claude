# lkf-claude

Plugin de [Claude Code](https://claude.com/claude-code) con el conocimiento
acumulado de cómo desarrollar sobre `linkaform_sdk`: convenciones, patrones,
schemas y anti-patrones, empaquetados como skills y un MCP server
consultable en vivo desde el agente.

Pensado para cualquier desarrollador — dentro o fuera de Linkaform — que
trabaje con el SDK y quiera que Claude Code ya conozca sus reglas
fundamentales, sus módulos y sus convenciones de código antes de escribir
una sola línea.

## Instalación

```
/plugin marketplace add linkaform/lkf-claude
/plugin install lkf-claude@lkf-claude
```

Esto instala:
- **Skills**: `/lkf-claude:lkf` (modo desarrollo SDK), `/lkf-claude:lkf-module`
  (scaffolding de módulo), `/lkf-claude:lkf-learn` (capturar un patrón nuevo),
  `/lkf-claude:lkf-review` (revisar código contra convenciones),
  `/lkf-claude:worktree` (trabajar una tarea aislada en un git worktree).
- **MCP server `lkf-knowledge`**: `lkf_search`, `lkf_get`, `lkf_list`,
  `lkf_add`, `lkf_validate` — consulta la carpeta `knowledge/` en vivo, sin
  necesidad de Docker (solo requiere `python3` con `pip`; si no hay
  `python3` disponible, cae de vuelta a correr `mcp/Dockerfile`).

## Qué hay en `knowledge/`

- `conventions/` — reglas de nomenclatura, herencia, anti-patrones
- `patterns/` — cómo resolver operaciones concretas del SDK (Mongo, CouchDB,
  emails, catálogos, integraciones con Airflow, pantallas explorador, etc.)
- `modules/` — conocimiento específico por módulo
- `examples/` — plantillas completas y funcionales
- `schemas/` — shape real de las colecciones de MongoDB

## Reglas fundamentales del SDK (resumen)

1. IDs de campos siempre vía `self.f['campo']`/`self.mf['campo']`, nunca ObjectIds crudos.
2. Herencia siempre desde `lkf_addons.addons.base.app.Base`.
3. Errores vía `self.LKFException({'msg': '...', 'status_code': 400})`, nunca `return {'error': ...}`.
4. Todo `find()`/`$match` de MongoDB incluye `'deleted_at': {'$exists': False}` (soft-delete).

Ver `CLAUDE.md` para el detalle completo.

## Entorno de desarrollo con Docker

`docker/claude-code/` levanta un contenedor con Claude Code ya instalado,
montando tus repos locales de LinkaForm en el **mismo path absoluto** que
tienen en el host (no en `/workspace`) — así Claude Code encuentra el
historial de sesiones existente, que se indexa por el path absoluto del
directorio de trabajo:

```bash
cd docker/claude-code
cp .env.example .env
# ajusta LKF_HOST_PATH a tu carpeta de repos (ruta absoluta, sin "~")
docker compose up -d --build
docker compose exec claude-code stat -c '%g' /var/run/docker.sock   # ver DOCKER_GID real
# ajusta DOCKER_GID en .env con ese número y vuelve a correr:
docker compose up -d --build
docker compose exec claude-code claude
```

El socket de Docker del host (`/var/run/docker.sock`) se monta dentro del
contenedor para poder correr `docker`/`docker compose` desde ahí — necesario
para trabajar con los contenedores propios del SDK (Mongo, CouchDB,
lkf-sanic-apps, Airflow, etc.). El contenedor corre como el usuario `node`
(nunca root) y usa `group_add` con el `DOCKER_GID` del host para que ese
usuario pueda hablar con el socket sin privilegios extra.

**Notas si usas macOS con Docker Desktop:**
- No calcules `DOCKER_GID` con `stat -c` en la terminal del Mac (`stat` de
  macOS usa otra sintaxis, `-f` no `-c`, y además el GID que ve el Mac no es
  necesariamente el que ve el contenedor). Usa el comando de arriba
  (`docker compose exec claude-code stat -c ...`) que pregunta desde
  *adentro* del contenedor Linux — es el valor correcto sin importar el SO
  del host. En Docker Desktop suele salir `0` (root), no un GID tipo `999`.
- Si `docker compose up -d --build` falla con un error de
  `docker-credential-osxkeychain` / keychain bloqueado, es porque Docker
  Desktop intenta usar el llavero de macOS para el pull de `node:20-alpine`
  y la sesión (sobre todo si es SSH remota) no puede desbloquearlo. La
  forma más simple es correr el build una vez físicamente en la Mac (no por
  SSH); ya no debería volver a pedirlo para builds futuros con la imagen en
  caché.

## Memoria personal portátil entre máquinas (opcional)

Lo anterior instala el plugin y el entorno — pero tu memoria auto-generada,
historial de sesiones y preferencias de Claude Code viven fuera de este
repo, en tu `~/.claude/` local, y no se comparten solo por instalar el
plugin en otra máquina. Si quieres llevarlos de una laptop a otra, hay una
plantilla lista para armar tu propio repo privado con ese fin en
[`docs/personal-memory-template/`](docs/personal-memory-template/README.md).
Es personal — cada quien arma el suyo con sus propios datos, no es algo que
se comparta como equipo (a diferencia de `knowledge/`, que sí).

## Contribuir

1. Trabaja normalmente con el SDK usando el skill `/lkf-claude:lkf`.
2. Cuando descubras un patrón/convención nuevo, usa `/lkf-claude:lkf-learn`
   para capturarlo en `knowledge/` con el formato correcto.
3. Abre un PR — el conocimiento se comparte con todo el equipo (y con
   cualquiera que instale el plugin) vía `git pull` / actualización del
   plugin.

## Licencia

MIT — ver `LICENSE`.
