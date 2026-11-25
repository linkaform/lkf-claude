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

## Excepción: plan de Contratistas en `clave10` (base `staging`)
El front de Contratistas se desarrolla sobre `staging` de `clave10` (no sale a producción hasta que
`staging` se mergea a `master`). Para esas tareas:

- Rama del plan con formato `tipo/<id>-<desc>` (ej. `feat/me-06-empresa-documentos`), creada desde
  `origin/staging`. Se puede subir (`git push -u origin <rama>`) sin confirmación extra.
- El PR se abre cuando el usuario lo pide, con **una sola confirmación**: mostrar rama, base y commits
  y preguntar una vez.
- Base **siempre `staging`**. Revisor obligatorio: el de la columna "Revisor" del plan
  (`gh pr create --base staging --reviewer <usuario>`). Usuarios: Paco = `pacosotto`, Maricruz =
  `MaricruzAlvarado`, Karina = `KarinaMoreno21`; Alain (`Alain-MV`) no revisa.
- Título sin ID de tarea, como un commit (`feat: documentos de la empresa`). Cuerpo:
  `## Qué cambia` y `## Tarea` (ID · Revisor, Spec, Ficha de diseño). Índice de fichas:
  `knowledge/modules/contratistas/contratistas.md`.

Un PR de `clave10` con base `master`, y cualquier PR de `clave10-app`, siguen con la doble confirmación.

## Otros repos
Para el resto de repos (addons, lkf-sanic-apps, modules...) rige lo normal: abrir el PR solo cuando el
usuario lo pide, y mensajes/descripciones sin líneas de atribución a Claude (`Co-Authored-By`,
"Generated with Claude Code").
