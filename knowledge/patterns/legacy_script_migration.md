# Migrar un script legacy (dispatcher) a rutas Sanic

> Cómo portar un script CLI legacy tipo `mi_script.py` (con un dispatcher de `option`) hacia
> `addons/<modulo>/service.py` + `addons/<modulo>/routes.py` en `lkf-sanic-apps`.

## El patrón legacy que se está reemplazando

Los scripts legacy en `app/modules/<modulo>/items/scripts/<Modulo>/*.py` son procesos CLI
de un solo uso: reciben un JSON por `sys.argv`, sacan `option`, y hacen un dispatch manual
con `if/elif` a métodos de una instancia de la clase del módulo:

```python
if __name__ == "__main__":
    obj = Accesos(settings, sys_argv=sys.argv)
    obj.console_run()
    option = obj.data.get('data', {}).get("option", '')
    if option == 'crear_pase':
        response = obj.create_access_pass(location, access_pass)
    elif option == 'update_pass':
        response = obj.update_pass(access_pass, folio)
    ...
```

Algunos de estos scripts ya son puros wrappers hacia Sanic (ver
`script_turnos.py`: cada rama solo llama `middleware.auth.dispatch(endpoint, params, method)`,
que hace un HTTP request a `http://127.0.0.1:8000/<modulo>/<endpoint>` — el propio proceso
Sanic corriendo en el mismo contenedor). Ese es el patrón final al que hay que migrar
**todo** dispatcher legacy: cada `option` se vuelve una ruta Sanic real, y la lógica de
negocio vive en `addons/<modulo>/service.py`.

## Playbook

1. **Mapear cada `option` contra `addons/<modulo>/service.py`.** Es común que la lógica de
   negocio YA exista ahí (migrada hace tiempo) y solo falte la ruta HTTP — o que exista pero
   esté **desactualizada** frente al repo legacy activo (`linkaform/addons` en GitHub sigue
   recibiendo fixes que Sanic no hereda automáticamente). No asumas que "ya está migrado"
   solo porque el método existe con el mismo nombre — diferenciar body por body.

2. **El repo legacy activo es la fuente de verdad para lógica de negocio**, no la versión
   congelada en Sanic. Compara método por método (mismo nombre, firma, y cuerpo) entre
   `linkaform/addons` (`lkf_addons/addons/<modulo>/app.py`) y `lkf-sanic-apps`
   (`addons/<modulo>/service.py`). Aplica la traducción composición-vs-herencia descrita en
   `conventions/inheritance.md` ("Gotcha: el repo legacy todavía usa herencia múltiple") en
   cada línea que toque un atributo/método de un módulo cargado.

3. **Sigue la cadena de dependencias hasta el final, a mano.** Un método puede llamar a un
   helper que a su vez llama a OTRO helper que tampoco existe en Sanic. Una sola pasada de
   "¿qué llama este método?" no basta — verifica cada `self.algo(...)` nuevo que aparezca,
   incluyendo los que un análisis automatizado/agente puede pasar por alto (en una migración
   real de este SDK, un research pass encontró 3 dependencias faltantes pero se le escaparon
   2 más — `visita_a_set_format`, `access_pass_create_ics`, `autorizar_pase_acceso` — que
   solo aparecieron al leer el cuerpo completo línea por línea). Verifica también los
   `import` a nivel de módulo que un método nuevo necesita (un método copiado puede usar
   `generar_qr.LKF_QR(...)` sin que el archivo destino tenga `from linkaform_api import
   generar_qr` — el diff de cuerpos no lo detecta, solo revisar los imports sí).

4. **Cuidado con nombres genéricos al portar constantes/dicts nuevos** — ver anti-pattern #7
   en `conventions/anti_patterns.md`. Antes de agregar `self.X = ...` a un
   `models.py`/`service.py` compartido, grep `self.X` en el archivo destino completo.

5. **Exponer cada `option` migrado como ruta Sanic** en `addons/<modulo>/routes.py`, blueprint
   ya existente (`<modulo>_bp`):
   - GET + `request.args.get(...)` para parámetros escalares.
   - POST + `_ocr_payload(request)` (ya definido en `routes.py`, acepta JSON o form-data)
     cuando el payload trae listas o dicts — no caben de forma confiable en query string.
   - Revisa nombres ya usados en el blueprint antes de elegir el path — es fácil chocar con
     una ruta existente que resuelve a otra función (p.ej. ya existía `/enviar_msj` para
     una función distinta a la que necesitaba el script que se estaba migrando; se usó
     `/pase_enviar_msj` para evitar la colisión).

6. **Decisiones de comportamiento que cambian entre legacy y Sanic no se adivinan** — cuando
   el diff muestra una diferencia real de negocio (no solo de composición), pregúntale al
   humano cuál usar. Ejemplos reales de esta migración: si el campo `autorizado_por` se
   fuerza server-side al usuario de sesión (legacy) o se confía en el valor del cliente
   (versión vieja de Sanic); o si "mis pases" significa "visitado-por-mí OR creado-por-mí"
   (legacy) vs "autorizado-por-mí" (versión vieja de Sanic). Son decisiones de producto/
   seguridad, no de estilo de código.

7. **Verificar la migración con datos reales, no solo lectura de código** — correr el mismo
   request contra local y producción y diffear la respuesta encuentra bugs que la lectura
   de código no (colisiones de `self.f`, defaults de ruta que no matchean el CLI legacy,
   convenciones de respuesta). Ver `patterns/env_comparison_testing.md` para el harness y
   cómo distinguir bug real de drift de datos en vivo.

## Ver también
- `conventions/inheritance.md` — traducción composición vs herencia múltiple entre repos.
- `conventions/anti_patterns.md` — colisión de nombres al portar constantes compartidas,
  y `self.user.get('id')` vs `self.user.get('user_id')`.
- `patterns/self_f_label_collision.md` — por qué un campo migrado sale vacío sin error.
- `patterns/env_comparison_testing.md` — verificar la migración con datos reales.
