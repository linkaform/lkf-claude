# F0-10 · Componente · Uploader con IA

> Ficha de diseño de la tarea F0-10 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** subir un archivo, analizarlo con IA, mostrar progreso, error y
reintento, inconsistencias, mapeo a requerimiento con % de confianza,
duplicados (reemplazar o conservar ambos) y visor.
**Tipo:** front · **Depende de:** F0-05 (modales, toast). Lo consumen ME-06,
ME-03, ME-04, ME-05, ME-07, ME-11, CF-01, R-02 y el wizard de ME-12.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Es un solo componente con
estado `dup` (individual) y `nomUp` (masivo), no una pantalla. Para verlo:
Mi empresa → **Documentos** → botón flotante "Subir Documento". El panel de
ajustes del diseño trae el prop `uploadScenario` (Alternar, Se lee bien, Con
alertas, No legible, Duplicado); con "Alternar" cada clic recorre los cuatro.

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Botón flotante "Subir Documento" | 3407 | `{{ dfabShow }}`, `dfabNew` |
| Duplicado: pregunta | 3852–3863 | `{{ dupAsk }}` |
| Progreso (subiendo, analizando, listo, falla) | 3864–3878 | `{{ dupLoad }}`, `dupPUp/dupPAi/dupPDone/dupPFail` |
| Revisión de datos tras el análisis | 3879–3905 | `{{ dupOpen }}` |
| Panel flotante minimizable (sin uso: `dupPanel: false`) | 3353–3358 | `{{ dupPanel }}` |
| Carga masiva: progreso | 4330–4344 | `{{ nomLoad }}` |
| Carga masiva: revisión en tabla | 4345–4369 | `{{ nomRev }}` |
| Escenarios, alertas, mapeo, guardado | 7933–7980 | `DUP_SC`, `upVals` en `docVals` |
| Arranque y simulación de avance | 8149–8150 | `startDup()`, `runDup()` |
| Masiva: datos, arranque, variables | 6051–6126 | `nomBuild`, `nomStart`, `nomVals` |

Pantallas donde aparece (todas llaman `startDup`): Documentos (8007), Detalle
de contrato → Requerimientos, subir por fila (5673), Cumplimiento (6196,
6250), Detalle de empleado → Documentos (8327), y "Subir Nueva Versión" del
panel de documento (7924). La masiva entra por arrastrar archivos (6074) o
mantener 2 s pulsado (6070).

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

- **Progreso:** "Subiendo documento" con % y "No cierres esta ventana" →
  "Analizando con IA" (Identificando documento, Extrayendo datos con OCR,
  Validando contra el expediente) → "Análisis completo". Con versión nueva el
  título es "Subiendo nueva versión". Botón Cancelar mientras corre.
- **Se lee bien / Con alertas:** abre "Subir documento" con "Identificado
  como <tipo>", nombre del documento (obligatorio; si ya existe: "Ya existe un
  documento con este nombre. Usa otro nombre."), **Mapeo** y **Propietario**
  como combobox buscable con chip de confianza (ej. 96 %, 99 %; "Manual" si
  el usuario lo cambia), comentarios y botones Cancelar / Subir. Al subir
  queda **Por revisar** hasta que Administración apruebe.
- **No legible:** el progreso termina en falla ("No se pudo leer el
  documento", "Podrás capturar los datos manualmente…"), el formulario abre
  con "No se pudo identificar el documento" y confianzas bajas (58 %, 61 %);
  se captura a mano y el comentario automático dice "Datos capturados
  manualmente: el archivo no se pudo leer."
- **Duplicado:** "El archivo ya existe": **Reemplazar** (nueva versión; las
  anteriores quedan en historial; chip "Nueva versión de #folio") o
  **Conservar ambos** (documento nuevo, nombre con " (1)").
- **Visor:** "Ver <archivo>" abre el PDF en pestaña nueva; avisa si el
  navegador bloquea ventanas emergentes (7927).
- **Masiva:** analiza varios archivos (XML CFDI de nómina o documentos
  diversos), extrae RFC/CURP/NSS, relaciona con empleados y abre una tabla
  Archivo | Nombre | Mapeo | Propietario, con un comentario común.

## Qué no está en el diseño

- **Inconsistencias y "reemplazar"**: la lógica arma `dupAlerts` (7945: "El
  registro patronal no coincide" con botón "Usar Y5412345108"; "Faltan 2
  contratos por reportar"; "Subir otro archivo" en No legible), pero ningún
  bloque del template los dibuja. Decidir con el equipo dónde se muestran.
- **Reintentar** tras una falla: solo existe "Subir otro archivo" dentro de
  esas alertas no dibujadas. Los campos `dupVig` y `dupReg` (vigencia y
  registro) tampoco están en el formulario.
- El % de confianza global (`dupConf`) se calcula pero no se muestra.

## Qué reusa (no rehacer)

- Modales, botones, toast: F0-05 · Panel lateral desde donde se sube: F0-07.

## Fuera de esta tarea

- Servicio de OCR/IA en backend: F0-11 (aquí solo se consume).
- Revisar y aprobar el documento subido: F0-13.
- Lista de documentos y estatus: ME-06.
- Alta masiva de empleados por Excel: ME-03.
