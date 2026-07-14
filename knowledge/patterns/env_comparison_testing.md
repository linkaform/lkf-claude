# Verificar una migración comparando local vs producción en vivo

> Cómo detectar bugs de una migración legacy -> Sanic que la lectura de código
> no encuentra, corriendo el mismo request contra ambos ambientes y
> diffeando la respuesta.

## Por qué

La revisión estática de código (comparar métodos línea por línea) no
detecta todo: colisiones de `self.f` (ver `patterns/self_f_label_collision.md`),
defaults de parámetros que difieren entre la ruta Sanic y el CLI legacy, o
convenciones de respuesta (`{"data": ...}` vs respuesta cruda) que solo se
notan al ver el JSON real. Correr ambos ambientes contra la MISMA base de
datos de producción y diffear la respuesta es mucho más rápido para
encontrar estos bugs que seguir leyendo código a mano.

## El harness (`test/env_comparison/` en `lkf-sanic-apps`)

- `compare.py` — pega a `/scripts/run/` en local y producción con el mismo
  body, hace un diff recursivo (`deep_diff`) tolerando: reordenamiento de
  listas (`unordered_lists`, para catálogos que dedupean con `set()`/CouchDB
  sin sort explícito) y campos legítimamente distintos por ambiente
  (`ignore_fields`).
- `test_cases.py` — catálogo de casos, uno por `option` de cada script.
- Login automatizado por API key (`POST /api/infosync/user_admin/login/` con
  `{"username":..., "api_key":...}`) — no hace falta pedir el JWT a mano.
- `postman/Accesos.postman_collection.json` — la misma suite exportada a
  Postman para correrla/revisarla manualmente.

## Ciclo de iteración

1. Editar código.
2. `./lkf build prod` (dentro de `lkf-sanic-apps/`) — reconstruye
   `linkaform/sanic-app:latest`. Corre `git pull origin master` primero;
   verificar que no hay commits nuevos en el remoto antes de dejarlo correr
   solo, para no arriesgar un conflicto con cambios locales sin commitear.
3. `docker stop account_10_linkaform.sanic-app..latest && docker rm ...` —
   el backend de Django lo vuelve a crear solo, fresco, en la siguiente
   petición (imagen `:latest` recién construida).
4. Correr `compare.py` (con retry de conexión ya integrado en
   `app/middleware/auth.py` para la primera petición justo después de
   recrear el contenedor — antes había que reintentar a mano).

## Cómo distinguir "bug real" de "dato en vivo cambiando"

La cuenta de prueba es una cuenta de producción con uso real activo — no
todo diff es un bug:

- **Si el código es byte-idéntico a legacy** (confirmado leyendo ambos
  archivos) y el campo que difiere es de naturaleza time-sensitive (status
  de checkin, conteos de disponibilidad, folios recién creados), es
  probablemente **drift de datos en vivo**, no bug.
- **Prueba decisiva**: comparar el contenido como conjunto (no por índice).
  Si el set de un lado es subconjunto EXACTO del otro (0 discrepancias,
  solo faltan/sobran los N más recientes), es timing — los IDs de Mongo
  ordenan por tiempo de creación, así que nuevos registros aparecen en un
  extremo. Si hay contenido genuinamente disjunto o un patrón de exclusión
  sistemático, es un bug de filtro real.
- Para catálogos con reordenamiento puro (mismo set, distinto orden):
  anotar `unordered_lists` en el test case en vez de perseguir un `$sort`
  que ni legacy garantiza.

## No asumir dónde vive el bug sin trazar la llamada real

Un fix puede apuntar al método equivocado si dos funciones tienen nombres
parecidos (`get_user_booth` singular en `Employee` vs `get_user_booths_availability`
en el service que realmente llama la ruta). Antes de arreglar, confirmar la
cadena real: ruta -> método del service -> métodos que este llama — no
asumir por el nombre del endpoint cuál función se está ejecutando.

## Ver también
- `patterns/self_f_label_collision.md` — la clase de bug más común encontrada así.
- `patterns/legacy_script_migration.md` — playbook de migración en general.
