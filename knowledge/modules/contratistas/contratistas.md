# Contratistas

> Índice del proyecto Contratistas de Clave 10: dónde está el diseño de cada
> tarea del plan y cómo leerlo sin cargar archivos de varios MB.

## Cómo usarlo

1. Busca el ID de tu tarea (ej. `ME-06`) en la tabla de abajo.
2. Abre su ficha (`lkf_get("contratistas_me06_documentos")` o el archivo
   directo). La ficha dice qué archivo de diseño, qué bloque y qué líneas.
3. Lee **solo esas líneas** del diseño. Nunca el archivo completo:
   `plataforma.dc.html` pesa 3.3 MB.
4. Estilo (colores, tipografía, tablas, modales): `contratistas_ui_spec.md`.
   Manda sobre el design system anterior cuando no coinciden.

## Tarea → ficha

| ID | Tarea | Ficha |
| --- | --- | --- |
| F0-03 | Contexto de empresa activa y modo (kLbl) | `contratistas_f003_contexto_empresa.md` |
| F0-04 | Mega menú y rutas | `contratistas_f004_mega_menu.md` |
| F0-05 | UI kit: tabla, modales, toast, folios | `contratistas_f005_ui_kit.md` |
| F0-06 | Filtros | `contratistas_f006_filtros.md` |
| F0-07 | Panel de detalle lateral | `contratistas_f007_panel_detalle.md` |
| F0-10 | Uploader con IA | `contratistas_f010_uploader_ia.md` |
| F0-12 | Motor de matriz | `contratistas_f012_motor_matriz.md` |
| F0-13 | Revisar documento | `contratistas_f013_revisar_documento.md` |
| F0-14 | Selector de vigencia / recurrencia | `contratistas_f014_recurrencia.md` |
| F0-15 | Modal de ligar y de notificar | `contratistas_f015_modal_ligar.md` |
| RG-02 | Login y wizard de registro | `contratistas_rg02_registro_wizard.md` |
| RG-03 | OCR de REPSE y CSF en el wizard | `contratistas_rg03_registro_ocr.md` |
| ME-01 | Mi Empresa · Generales | `contratistas_me01_generales.md` |
| ME-03 | Mi Empresa · Empleados | `contratistas_me03_empleados.md` |
| ME-04 | Detalle de empleado | `contratistas_me04_empleado_detalle.md` |
| ME-05 | Empleado · Contratos y Sanciones | `contratistas_me05_empleado_contratos.md` |
| ME-06 | Mi Empresa · Documentos | `contratistas_me06_documentos.md` |
| ME-07 | Cumplimiento documental | `contratistas_me07_cumplimiento.md` |
| ME-08 | Activos | `contratistas_me08_activos.md` |
| ME-09 | Contratos · Lista | `contratistas_me09_contratos.md` |
| ME-10 | Contrato · Generales | `contratistas_me10_contrato_generales.md` |
| ME-11 | Contrato · Empleados, Requerimientos, Incidencias | `contratistas_me11_contrato_pestanas.md` |
| ME-12 | Nuevo contrato | `contratistas_me12_nuevo_contrato.md` |
| ME-13 | Mapeo y homologación | `contratistas_me13_mapeo.md` |
| R-02 | Invitar cliente/contratista | `contratistas_r02_invitacion.md` |
| R-04 | Lista Clientes/Contratistas | `contratistas_r04_relaciones_lista.md` |
| R-05 | Detalle de cliente/contratista | `contratistas_r05_relaciones_detalle.md` |
| R-06 | Contratistas · Empleados agregados | `contratistas_r06_empleados_agregados.md` |
| R-07 | Incidentes/Fallas y Sanciones | `contratistas_r07_sanciones.md` |
| CF-01 | Configuración · Requerimientos | `contratistas_cf01_requerimientos.md` |
| CF-02 | Servicios, Perfiles y Equipos | `contratistas_cf02_servicios_perfiles_equipos.md` |
| CF-03 | Sesiones | `contratistas_cf03_sesiones.md` |
| CF-04 | Sesiones · Participantes | `contratistas_cf04_sesiones_participantes.md` |
| MX-01 | Cumplimiento de contratistas | `contratistas_mx01_cumplimiento_contratistas.md` |
| MX-02 | Aprobación por cliente | `contratistas_mx02_aprobacion_cliente.md` |
| MX-03 | Notificar incumplimientos | `contratistas_mx03_notificar.md` |
| MX-04 | Cumplimiento de empleados | `contratistas_mx04_cumplimiento_empleados.md` |
| MX-05 | Asignación de requerimientos | `contratistas_mx05_asignacion.md` |

Sin ficha:
- **Backend** (F0-01, F0-02, F0-08, F0-11, F0-16, ME-14, ME-15, R-01, RG-01,
  R-03): se guían por sus specs; las fichas de front dicen qué consumen.
- **Sin diseño**: ME-02 (reusar pantallas actuales de áreas y ubicaciones),
  R-03 y R-08 (árbol de subcontratación), Usuarios de Mi Empresa.
- **Proceso y QA**: F0-09, R-09, R-10.

Cada ficha trae una sección de **inconsistencias** o **"No está en el
diseño"**: revísala antes de construir; lo que diga ahí se decide con Paco o
Karina, no se inventa.

## Diseños

```
diseno/
  plataforma/plataforma.dc.html        todo, salvo registro y nuevo contrato
  registro-contrato/registro.dc.html   login + wizard de registro (5 pasos)
  registro-contrato/nuevo-contrato.dc.html  nuevo contrato + mapeo y homologación
```

- Cada subcarpeta es autocontenida (`_ds/`, `assets/`, `support.js`); las dos
  traen versiones distintas del design system, no mezclarlas.
- Se abren directo en el navegador. El panel de ajustes del diseño cambia
  escenarios: `uploadScenario` (Se lee bien / Con alertas / No legible /
  Duplicado), `estadoVacio`, `cargaMasiva`, `perfil`.
- **Fuera de alcance** aunque aparece en `plataforma.dc.html`: el Inicio
  general de Clave 10 (check-in, favoritas, comunicados, Pedro).
- `registro.dc.html` enlaza a `Dashboard.dc.html` al terminar; ese archivo no
  se incluyó (no es parte del alcance).

## Cómo leer el diseño

`plataforma.dc.html` tiene dos partes:

- **Template** (líneas 1–4724): HTML con `<sc-if value="{{ xxTab }}">` por
  pantalla y `{{ variable }}` para datos. Las pestañas de Mi Empresa están en
  `EMP_TABS`, las de un contrato en `CTO_TABS`.
- **Lógica** (líneas 4725–8991): un componente con métodos `xxVals(tab)` que
  calculan las variables de cada pantalla, y datos semilla `XX_SEED`.

Para ubicar una pantalla sin ficha: busca su texto visible (`grep -n
"Buscar documento"`), toma el prefijo de sus variables (`dc…`) y busca
`{{ dcTab }}` en el template y `dcTab: true` en la lógica.

## Decisiones que aplican a todas las tareas

- **Backend único en Sanic, dentro del módulo `accesos`**: lógica y rutas en
  `lkf-sanic-apps/addons/accesos`, scripts `*_sdk.py` en `sdk-modules-sanic`
  (accesos). Desde cero: el módulo viejo `addons/contratistas` de Sanic no se
  usa. En `addons` solo XML de formas/catálogos nuevos y puentes sin lógica
  para workflows; la forma y el catálogo "Contratistas" existentes no se tocan
  (los usa `produccion_pci`).
- **Clientes y Contratistas son una relación vista desde dos lados**: mismo
  componente, etiquetas espejo (`kLbl()` en el diseño).
- Componentes base se hacen una vez y se reusan: tabla y modales (F0-05),
  filtros (F0-06), panel de detalle (F0-07), uploader con IA (F0-10), revisar
  documento (F0-13), motor de matriz (F0-12).
- Todo lo de este diseño se hace desde cero; el portal WIP de septiembre no
  se usa.
