---
name: lkf-learn
description: Captura y guarda un nuevo patrón/aprendizaje del LinkaForm SDK en la knowledge base compartida. Usar cuando el usuario diga "aprende esto", "guarda este patrón", o quiera documentar una convención nueva del SDK.
---

Captura un nuevo aprendizaje del LinkaForm SDK y lo guarda en la base de conocimiento compartida.

**Qué aprender**: $ARGUMENTS

Sigue este proceso:

1. Pide al usuario que te muestre o describa el patrón/convención/ejemplo que quiere guardar.
   Si ya lo proporcionó en `$ARGUMENTS`, úsalo directamente.

2. Analiza el código o descripción e identifica:
   - ¿Qué problema resuelve?
   - ¿Cuándo se usa?
   - ¿Qué convenciones aplica?

3. Propón un nombre en `snake_case` y una categoría:
   - `patterns` — cómo hacer algo con el SDK (operaciones, integraciones)
   - `modules` — conocimiento específico de un módulo (employee, stock, etc.)
   - `conventions` — reglas de nomenclatura, estructura, estilo
   - `examples` — ejemplos completos y funcionales

4. Redacta el contenido en Markdown con:
   - Descripción breve en una línea
   - Código de ejemplo limpio y comentado
   - Sección "Notas" con reglas importantes o casos edge

5. Muestra al usuario el borrador y pide confirmación.

6. Al confirmar, usa `lkf_add(name, category, content, description)` para guardarlo.

7. Recuérdale de hacer commit:
   ```
   git add knowledge/
   git commit -m "knowledge: agrega patrón <nombre>"
   ```
   Y push para que el equipo lo obtenga con `git pull`.
