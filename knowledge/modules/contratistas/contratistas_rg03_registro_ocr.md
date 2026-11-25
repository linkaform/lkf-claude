# RG-03 · Registro · OCR de REPSE y CSF en el wizard

> Ficha de diseño de la tarea RG-03 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** OCR de REPSE y CSF dentro del wizard: prellenado de datos, con
"Omitir por ahora".
**Tipo:** full-stack · **Depende de:** RG-02, F0-11 (servicio OCR). Diseño v2.

## Dónde está en el diseño

Archivo: `diseno/registro-contrato/registro.dc.html`. Para verlo: abrir el
archivo → "Regístrate aquí" → elegir perfil → elegir tipo de persona → llegar
a los pasos 3 (REPSE) y 4 (CSF); o poner `pantallaInicial` en `paso3` / `paso4`
(si se entra directo a `paso3` falta haber elegido persona: el diseño usa
persona moral solo si `persona === "moral"`, así que conviene pasar por el
paso 2). Muestra el prellenado en el paso 5.

| Bloque | Líneas | Variable |
| --- | --- | --- |
| REPSE · zona de carga + "Omitir por ahora" (113) | 102–116 | `{{ ocrVacio }}`, `simular`, `omitirRepse` |
| REPSE · "Leyendo tu documento..." | 117–133 | `{{ ocrCargando }}` |
| REPSE · datos extraídos | 134–215 | `{{ ocrListo }}`, `repse`, `nombreFisica`, `actividades` |
| CSF · zona de carga + omitir | 220–234 | `{{ csfVacio }}`, `simularCsf`, `omitirCsf` |
| CSF · "Leyendo tu documento..." | 235–251 | `{{ csfCargando }}` |
| CSF · datos extraídos | 252–299 | `{{ csfListo }}`, `camposCsf`, `camposDomicilio`, `padron` |
| Prellenado en el paso 5 | 302–~330 | `verConfirmacion` |
| Simulación REPSE (1.9 s) | 615–630 | `simular` |
| Simulación CSF (1.9 s) | 649–676 | `simularCsf` |
| Paso 4 → 5: arma `cuenta` desde `fiscal` | 772–800 | `continuar` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

Todo el OCR del diseño es **simulado**: el botón de carga no abre un selector
de archivos, solo pone el estado en "cargando" y a los 1.9 s en "listo" con
datos fijos. Lo que debe leer el backend sale de esos datos.

- **REPSE** (PDF, máx. 10 MB; ayuda: consultar en repse.stps.gob.mx con el
  RFC). Campos extraídos y editables: número de registro (folio), inicio y fin
  de vigencia con chip "N meses restantes", razón social (moral) o
  nombre / primer apellido / segundo apellido (física), y la lista de
  **actividades autorizadas ante la STPS** (6 con clave, solo lectura, cada una con palomita). Acciones
  "Ver documento" (sin acción en el diseño) y "Cambiar archivo" (regresa a vacío). Además llena `rfc` y,
  en moral, el representante legal de la cuenta.
- **CSF** (PDF, máx. 10 MB; ayuda: se descarga en sat.gob.mx; si se omite hay
  que capturar a mano). Campos extraídos y editables: razón social o nombre,
  RFC, correo, **estatus en el padrón** (chip Activo/Inactivo, solo lectura) y
  los 11 campos del **domicilio fiscal**: código postal, tipo y nombre de
  vialidad, número exterior e interior, colonia, localidad, municipio, estado,
  entre calle y y calle.
- **Prellenado del paso 5:** si hubo CSF, aparece el aviso "Confirma tus
  datos" y se llenan razón social, RFC, correo, dominio (la parte del correo
  antes del primer punto después de la @) y dirección (vialidad, número,
  interior, colonia, C.P., municipio, estado unidos con comas). Si se omitió,
  los campos quedan vacíos.
- **Omitir por ahora:** REPSE → salta al paso 4; CSF → salta al paso 5.
  "Continuar" se habilita con extracción lista u omisión.
- Se puede volver a un paso y cambiar el archivo; reiniciar limpia ese paso.

## No está en el diseño

- Estado de error del OCR (archivo ilegible, tipo equivocado, RFC del
  documento distinto al capturado) ni % de confianza: aquí no hay.
- Dónde se guarda el PDF subido y cómo se reanuda un registro omitido: el
  diseño solo marca REPSE "Pendiente" en el éxito.
- Validación de que el RFC del REPSE coincida con el de la CSF.

## Qué reusa (no rehacer)

- Zona de carga, chips, botones: F0-05 · Servicio de extracción: F0-11. No
  usar el uploader de F0-10: este flujo no tiene mapeo ni duplicados.

## Fuera de esta tarea

- Layout del wizard, validaciones de cuenta y pantalla de éxito: RG-02.
- Alta de cuenta en backend: RG-01.
- REPSE con vigencia y aviso en Mi Empresa: ME-01.
