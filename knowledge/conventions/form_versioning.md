# Versionado de formularios y flujos

> Sin subir `updated_at`, la utilería de subida no detecta el cambio y no sube el form.

Al editar cualquier XML de `items/forms/` (el form, su `_workflow.xml` o su `_rules.xml`),
actualizar **en el XML del form** (`<nombre>.xml`, no en el workflow) estos dos campos
con el mismo valor, el epoch actual en segundos:

```xml
<description>version: 1792103263</description>
...
<updated_at>1792103263.0</updated_at>
```

```bash
date +%s   # valor nuevo
```

- Aplica aunque el cambio sea solo en el `_workflow.xml` o `_rules.xml`: estos no llevan
  `updated_at` propio, el form `.xml` es el que la utilería compara.
- No tocar `created_at`, `resource_uri` ni el `updated_at` anidado de referencias a
  catálogos dentro del workflow.
- Hacerlo en la misma edición, no después: es fácil olvidarlo y el síntoma
  ("no detecta cambios") no apunta a la causa.
