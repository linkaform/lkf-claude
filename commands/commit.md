# Smart Commit

Ayuda a hacer un commit de los cambios staged, con pull y push a la rama actual.

## Pasos a seguir SIEMPRE en este orden:

### 1. Detectar rama actual
Ejecuta `git branch --show-current` para saber en qué rama está el proyecto.

### 2. Pull de la rama actual
Ejecuta `git pull origin <rama-actual>` antes de cualquier otra cosa.
Si hay conflictos, reporta al usuario y detente.

### 3. Revisar qué hay staged
Ejecuta `git diff --cached --name-status` para ver solo los archivos que el USUARIO agregó al staging.
**No agregues ningún archivo tú mismo.** Solo trabaja con lo que ya está en staging.

Si no hay nada staged, muéstrale al usuario `git status` y dile que haga `git add` de los archivos que quiere commitear, luego detente.

### 4. Analizar los cambios staged
Lee los cambios con `git diff --cached` para entender qué hace cada archivo modificado y generar un buen mensaje de commit.

### 5. Proponer el mensaje de commit
Muéstrale al usuario:
- La **rama actual**
- La **lista de archivos** que se van a commitear (solo los staged)
- El **mensaje de commit propuesto** (en español, siguiendo el estilo del repo: `Fix:`, `Feat:`, `Update:`, etc.)

**Espera la aprobación del usuario antes de continuar.** Pregunta explícitamente: "¿Autoriza este commit?"

### 6. Si el usuario aprueba → hacer el commit
Ejecuta el commit con el mensaje aprobado (o el ajustado por el usuario).

### 7. Push a la misma rama
Ejecuta `git push origin <rama-actual>`.
Si el push es rechazado por cambios remotos, haz `git pull origin <rama-actual> --no-edit` primero y luego vuelve a intentar el push.

### 8. Confirmar resultado
Muestra el hash del commit y confirma que el push fue exitoso.

---

## Reglas importantes
- **NUNCA agregues archivos al staging tú mismo** (`git add`). Solo el usuario decide qué va en el commit.
- **NUNCA hagas force push**.
- **NUNCA uses `--no-verify`**.
- El pull siempre es de la rama en la que está el proyecto, no de `main` ni `master` por defecto.
- Si algo falla, reporta el error claramente y no continúes.
