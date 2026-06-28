Revisa código de LinkaForm SDK contra convenciones y anti-patrones.

**Archivo o código a revisar**: $ARGUMENTS

Proceso:

1. Si se pasó un archivo en `$ARGUMENTS`, léelo. Si no, pide al usuario que lo especifique.

2. Usa `lkf_validate(código)` para detección automática de anti-patrones.

3. Además, revisa manualmente:
   - Herencia correcta (desde `Base`, no `LKF_Base`)
   - `super().__init__()` como primer statement
   - Todos los catálogos con sus 3 atributos (`_CAT`, `_CAT_ID`, `_CAT_OBJ_ID`)
   - Uso de `self.LKFException()` para errores
   - `deleted_at` en todos los queries de MongoDB
   - Campos registrados en `self.f` antes de usarlos

4. Consulta `lkf_get("anti_patterns")` para verificar todos los anti-patrones conocidos.

5. Consulta `lkf_search("patrón relevante")` si hay algo que parece incorrecto pero no estás seguro.

6. Presenta los hallazgos como:
   - **Errores** (rompen convenciones, pueden causar bugs)
   - **Advertencias** (estilo o mejores prácticas)
   - **Bien hecho** (lo que está correcto, para que el usuario sepa qué mantener)

7. Si encuentras un patrón nuevo que no está en la knowledge base, sugiere guardarlo con `/lkf-learn`.
