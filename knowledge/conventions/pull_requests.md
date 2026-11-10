# Pull requests: `clave10` y `clave10-app`

## Regla
**NUNCA abrir un pull request en `clave10` (front) ni en `clave10-app` (app móvil)** por iniciativa propia,
ni aunque el usuario haya pedido "un PR donde aplica", "a master" o similar. Tampoco subir una rama
(`git push -u origin <rama>`) con el fin de preparar ese PR.

## Cómo se hace, solo si el usuario lo quiere
Se necesita **doble confirmación**, en dos mensajes distintos del usuario:

1. **Primera**: el usuario pide explícitamente el PR de `clave10` / `clave10-app`.
2. **Segunda**: antes de ejecutar, mostrar repo, rama de origen, rama destino (base) y los commits que
   entran, y preguntar de nuevo "¿Confirmas abrir este PR?". Solo una respuesta afirmativa a *esa*
   pregunta autoriza `gh pr create`.

Una confirmación previa (de otra rama, de otro repo o de una pregunta general) no cuenta. Si hay duda,
no se abre.

## Otros repos
Para el resto de repos (addons, lkf-sanic-apps, modules...) rige lo normal: abrir el PR solo cuando el
usuario lo pide, y mensajes/descripciones sin líneas de atribución a Claude (`Co-Authored-By`,
"Generated with Claude Code").
