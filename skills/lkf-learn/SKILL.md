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

6. Al confirmar, decide dónde guardarlo y usa
   `lkf_add(name, category, content, description, shared=...)`.

   La base tiene dos niveles:

   - **local** (default, `shared=False`) — el knowledge de quien está usando el
     plugin, en `~/.config/lkf/knowledge/`. Sobrevive a las actualizaciones.
   - **compartido** (`shared=True`) — el `knowledge/` del repo `lkf-claude`,
     para commitear y que le llegue al equipo en el siguiente release. Solo
     funciona si el plugin corre desde su checkout de git; desde una copia
     instalada `lkf_add` lo rechaza y te lo dice.

   Guarda como **compartido** cuando el aprendizaje sea una convención del SDK
   que aplica a cualquiera. Guarda como **local** cuando sea específico de un
   cliente, de una cuenta o de un experimento que todavía no está confirmado.
   Si no está claro, guarda local: siempre se puede promover después.

   En las lecturas los dos niveles se mezclan, y ante un nombre repetido gana
   el local. Si estás tapando una entrada que trae el plugin, `lkf_add` te avisa.

7. Si lo guardaste como compartido, recuérdale hacer commit:
   ```
   git add knowledge/
   git commit -m "knowledge: agrega patrón <nombre>"
   ```
   Y push para que el equipo lo obtenga en el siguiente release del plugin.

   Si quedó local, no hay nada que commitear. Para promoverlo después, se copia
   el archivo de `~/.config/lkf/knowledge/` al repo y se manda en un PR.
