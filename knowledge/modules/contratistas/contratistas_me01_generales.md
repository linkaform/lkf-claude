# ME-01 · Mi Empresa · Generales

> Ficha de diseño de la tarea ME-01 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** datos fiscales, REPSE con vigencia y aviso, actividades STPS, acta
constitutiva, trabajadores registrados y contactos (alta, edición, borrado).
**Tipo:** full-stack · **Depende de:** F0-02 (forms y catálogos).

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
Mi empresa → pestaña **Generales** (es la pestaña por defecto).

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Pantalla completa de la pestaña | 2457–2619 | `{{ empIsGen }}` |
| Información de la empresa (datos fiscales, REPSE, actividad, acta, trabajadores) | 2458–2497 | `{{ empView }}` / `{{ empEditing }}` |
| Contactos (lista, edición en línea, alta) | 2498–2545 | `{{ ctCount }}`, `{{ ctAdding }}` |
| Panel lateral "Cumplimiento documental" y documentos pendientes | 2546–2618 | `{{ pendAny }}` |
| Lógica de la pantalla | 8474–8547 | `empresaVals()` |
| Actividades STPS, acta, contactos y pendientes semilla | 4784–4787 | `EMP_ACT`, `EMP_ACTA`, `EMP_CONTACTOS`, `EMP_PEND` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

**Información de la empresa**
- Datos fiscales: razón social, RFC, tipo de persona, régimen fiscal, domicilio
  fiscal (con copiar al portapapeles).
- Registro REPSE: estatus Vigente / Por vencer, folio de ingreso, aviso de
  registro, rango de vigencia, barra "Transcurrido N%" y días o meses
  restantes. Si faltan 60 días o menos: estatus "Por vencer" y aviso "Tu
  registro REPSE vence el …, solicita la renovación en la plataforma de la STPS".
- Actividad económica: objeto social, actividad preponderante y actividades
  autorizadas ante la STPS (nombre y clave). Nota fija: solo se pueden celebrar
  contratos dentro de esas actividades (art. 12 LFT, subcontratación prohibida).
- Acta constitutiva: número de escritura, fecha de protocolización, notario,
  número de notaría y entidad. Sin acta cargada muestra "---" y el aviso "Sube
  el acta constitutiva para completar estos datos automáticamente".
- Trabajadores registrados: "N trabajadores" (viene del registro patronal
  IMSS; "---" si no está cargado); al tocarlo abre la pestaña Empleados.
- Editar / Guardar: solo se editan **razón social, RFC, objeto social y
  domicilio fiscal**. El resto es solo lectura. Toast "Se guardó la información
  de la empresa"; el RFC se guarda en mayúsculas.

**Contactos**
- Tarjeta por contacto: iniciales, nombre, rol, teléfono, correo (copiar).
- Alta y edición en línea. Obligatorios: nombre completo (mínimo 3 caracteres),
  teléfono (mínimo 10 dígitos) y correo con formato válido; cargo es opcional
  (por defecto "Contacto"). El botón se atenúa hasta que sea válido.
- Borrado con confirmación "¿Eliminar contacto?" (no se puede deshacer).

**Panel lateral de pendientes** (se puede colapsar a una cinta)
- Cumplimiento global en anillo: Empresa, Empleados, Acuses del año.
- "N documentos pendientes" agrupados (Identidad, Legal, Fiscal, STPS,
  Seguridad social); cada uno acepta arrastrar o seleccionar archivo (PDF o
  XML, máximo 10 MB) con el flujo del uploader con IA: subiendo, "Analizando
  con IA", error con Reintentar, inconsistencias con Reemplazar.
- Sin pendientes: "Expediente completo".

## Qué reusa (no rehacer)

- Modales de confirmar, toast, inputs: F0-05 · Uploader con IA: F0-10
- Cumplimiento y pendientes de acuses: ME-07 · Documentos del expediente: ME-06

## Fuera de esta tarea

- Alta y edición de actividades STPS y alta del REPSE: no están en el diseño
  (solo lectura); los datos llegan por el wizard de registro (RG-02, RG-03).
- La vigencia REPSE del diseño es calculada con datos de ejemplo; no hay regla
  de negocio definida más allá del umbral de 60 días.
- Versión de solo lectura para el detalle de contratista/cliente: R-05.
- Botón "Enviar Notificación" del panel (solo aparece al ver un contratista):
  MX-03.
