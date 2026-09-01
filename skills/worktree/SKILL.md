---
name: worktree
description: Crea un git worktree aislado en .trees/<nombre>, mueve la sesión ahí y ejecuta la tarea recibida sin tocar el árbol de trabajo principal. Úsala cuando el usuario diga "/worktree", "hazlo en un worktree", "trabaja esto aislado", "crea un worktree para X", o cuando quiera atacar una tarea en paralelo sin ensuciar la rama actual. El nombre del worktree lo determina el modelo a partir del requerimiento.
---

# Worktree — trabajo aislado

Crea un git worktree nuevo, mueve la sesión ahí, y ejecuta la tarea recibida
**de forma aislada** del código del directorio principal.

## Instrucciones recibidas
`$ARGUMENTS`

---

## Paso 1 — Determinar el nombre del worktree

Tú decides el nombre a partir de `$ARGUMENTS`. Reglas:
- `kebab-case`, en inglés o español, sin acentos ni espacios.
- Máximo 4 palabras / 40 caracteres. Debe describir el *requerimiento*, no la acción genérica.
- Prefijo según el tipo de trabajo cuando aplique: `fix-`, `feat-`, `refactor-`, `docs-`, `test-`, `spike-`.
- Ejemplos:
  - "arregla el bug de fechas en el reporte de asistencia" → `fix-fechas-reporte-asistencia`
  - "agrega endpoint de exportación a CSV" → `feat-export-csv`
  - "prueba si conviene migrar a pydantic v2" → `spike-pydantic-v2`

Si `$ARGUMENTS` viene vacío, **detente** y pregunta:
> "¿Qué quieres que haga en el worktree?"

## Paso 2 — Crear el worktree

Desde la raíz del repositorio:

```bash
git rev-parse --show-toplevel          # ubicar la raíz; trabaja siempre desde ahí
git worktree add .trees/<nombre>       # crea la rama <nombre> a partir de HEAD
```

- Si ya existe una rama con ese nombre, usa `git worktree add .trees/<nombre> -b <nombre>-2`
  o elige un nombre alterno, e infórmalo.
- Si el path `.trees/<nombre>` ya existe, reutilízalo solo si `git worktree list` lo reporta;
  si no, elige otro nombre.
- Asegura que `.trees/` esté ignorado **sin ensuciar el repo** (exclusión local):

```bash
grep -qx '.trees/' "$(git rev-parse --git-common-dir)/info/exclude" || echo '.trees/' >> "$(git rev-parse --git-common-dir)/info/exclude"
```

## Paso 3 — Entrar al worktree

Usa la herramienta `EnterWorktree` con el parámetro `path` apuntando al worktree recién creado
(ruta absoluta a `.trees/<nombre>`). **No** uses `name`: el worktree ya existe.

Confirma con `pwd` que la sesión quedó dentro de `.trees/<nombre>` antes de tocar cualquier archivo.

## Paso 4 — Renombrar la sesión

Los comandos internos del CLI no se pueden invocar desde el modelo, así que pídeselo al usuario
con una sola línea, sin adornos:

> Para renombrar la sesión, escribe: `/rename <nombre>`

## Paso 5 — Ejecutar la tarea

Ejecuta las instrucciones de `$ARGUMENTS` **dentro del worktree**:
- Todas las rutas y comandos relativos al worktree, nunca al directorio original.
- Si la tarea toca código de `lkf_addons`, aplican igual las reglas del SDK
  (ver skill `lkf`): `self.f[...]`, herencia desde `Base`, `self.LKFException()`,
  soft-delete en todo `find()`/`$match`.
- Commitea en la rama del worktree cuando la tarea lo amerite; **no** hagas push salvo que se pida.
- Al terminar, reporta: nombre del worktree, rama, ruta, y qué se hizo.

---

## Reglas importantes
- **Nunca** modifiques archivos fuera de `.trees/<nombre>` una vez dentro del worktree.
- **Nunca** hagas `git worktree remove` ni `ExitWorktree` por iniciativa propia: el worktree
  se queda vivo hasta que el usuario lo pida explícitamente.
- Si `git worktree add` falla (repo sucio, rama ocupada, etc.), reporta el error tal cual y detente.
- Si el directorio no es un repositorio git, dilo y detente.
