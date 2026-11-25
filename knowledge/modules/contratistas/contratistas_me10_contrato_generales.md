# ME-10 · Contratos · Detalle · Generales

> Ficha de diseño de la tarea ME-10 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** detalle del contrato, pestaña Generales: beneficiario, contratista
(REPSE, STPS), recursos, ubicaciones, historial de modificaciones; pausar /
reanudar y cancelar.
**Tipo:** front · **Depende de:** ME-09, ME-14.

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
Mi empresa → Contratos → botón Visualizar de cualquier fila (pestaña
**Generales**; `empMode` `cto`).

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Cabecera (regresar, objeto, punto de estatus) | 2440 | `{{ empModeCto }}` |
| Generales (datos, partes, recursos, ubicaciones) | 2929–2965 | `{{ ctoGenTab }}` |
| Rail lateral Cumplimiento documental e Historial | 2954–2963 | `{{ ctoSideOpen }}`, `{{ ctoHist }}` |
| Lógica común del contrato (estatus, pausar, cancelar) | 5550–5575 | `ctoVals(tab)` |
| Lógica de Generales | 5576–5612 | `tab === "ctoGen"` |
| Confirmar pausar / reanudar / cancelar | 3614–3629 | `{{ cfmOpen }}` |
| Pestañas del contrato | 4775 | `CTO_TABS` |
| Actividades STPS de la empresa | 4784 | `EMP_ACT` |
| Abrir detalle | 5693 | `openCto(id)` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

- **Información del contrato** `#folio`: botón "Ver contrato" (abre el PDF
  firmado) y botón de estatus (ícono power) con menú "Cambiar estatus".
- **Estatus**: Activo, Por vencer, En documentación, Vencido, Pausado,
  Cancelado; el punto junto al título lleva el color y el tooltip
  ("Contrato pausado"...).
- **Pausar / Reanudar**: confirma. Pausar suspende accesos del personal y las
  obligaciones periódicas; reanudar los restituye. **Cancelar**: confirma,
  irreversible, da de baja al personal asignado y pasa a Cancelado; con el
  contrato cancelado ambos botones quedan deshabilitados ("El contrato está
  cancelado"). Cada cambio agrega una entrada al historial.
- **Datos del contrato**: número, monto, vigencia inicio – fin con chip
  "Restan N días" / "Venció hace N días" (ámbar ≤ 30, rojo vencido) y
  descripción detallada del servicio.
- **Beneficiario**: razón social, RFC, registro patronal y dirección (RFC y
  registro con copiar).
- **Contratista**: razón social, RFC, registro REPSE con vigencia y chip
  (REPSE vigente / por vencer ≤ 90 días / vencido) y **actividades
  autorizadas ante la STPS** (nombre + clave).
- **Recursos del contrato**: tarjetas Perfiles (con cantidad), Servicios,
  Vehículos, Equipos y Herramientas (con cantidad por renglón).
- **Ubicaciones** (N): nombre, dirección, avatares de empleados (+N),
  "N empleados", subtexto (Expedientes completos / N con pendientes / Por
  asignar) y estatus (Activa, En apertura, Inactiva).
- **Rail lateral** (colapsable; en < 1100 px baja arriba): gráfica de
  Cumplimiento documental con tres anillos (Contrato, Empleados, Periódicos)
  y "Ver requerimientos" (lleva a ME-11).
- **Historial de modificaciones** (N): línea de tiempo con evento, detalle,
  fecha y autor (creación, ubicaciones, perfiles, monto, equipos, vigencia,
  estatus).
- **Espejo**: quién es beneficiario y quién contratista depende del origen.
  Si se entró desde Contratistas, el beneficiario es la empresa propia y el
  contratista es la otra parte; desde Clientes o Mi empresa es al revés. El
  REPSE mostrado es siempre el del contratista. La paleta cambia: azul
  (propia), naranja (Contratistas), morado (Clientes).

**No está en el diseño**
- Editar los datos del contrato: no hay botón de edición.
- Autor y fecha reales del historial: son datos de ejemplo.
- La barra de avance de vigencia, duración y monto mensual se calculan en
  la lógica pero no se pintan; no hay que construirlos.

## Qué reusa (no rehacer)

- Modal de confirmar y toast: F0-05
- Etiquetas espejo (`kLbl`): F0-03

## Fuera de esta tarea

- Pestañas Empleados, Requerimientos e Incidencias & Fallas: ME-11.
- Pestaña Documentos del contrato: ME-06 (la misma lista filtrada).
- Crear o editar contrato: ME-12.
- Backend: ME-14.
