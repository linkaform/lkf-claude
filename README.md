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
  `/lkf-claude:lkf-review` (revisar código contra convenciones).
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
# ajusta DOCKER_GID al valor real: stat -c '%g' /var/run/docker.sock
docker compose up -d --build
docker compose exec claude-code claude
```

El socket de Docker del host (`/var/run/docker.sock`) se monta dentro del
contenedor para poder correr `docker`/`docker compose` desde ahí — necesario
para trabajar con los contenedores propios del SDK (Mongo, CouchDB,
lkf-sanic-apps, Airflow, etc.). El contenedor corre como el usuario `node`
(nunca root) y usa `group_add` con el `DOCKER_GID` del host para que ese
usuario pueda hablar con el socket sin privilegios extra.

## Contribuir

1. Trabaja normalmente con el SDK usando el skill `/lkf-claude:lkf`.
2. Cuando descubras un patrón/convención nuevo, usa `/lkf-claude:lkf-learn`
   para capturarlo en `knowledge/` con el formato correcto.
3. Abre un PR — el conocimiento se comparte con todo el equipo (y con
   cualquiera que instale el plugin) vía `git pull` / actualización del
   plugin.

## Licencia

MIT — ver `LICENSE`.
