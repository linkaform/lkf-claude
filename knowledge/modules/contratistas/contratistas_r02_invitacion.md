# R-02 · Contratistas · Invitar contratista

> Ficha de diseño de la tarea R-02 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** invitar cliente/contratista: individual (con vista previa del
correo) y masiva por Excel/CSV, aceptar invitación.
**Tipo:** full-stack · **Depende de:** R-01, F0-10 (uploader).

## Dónde está en el diseño

Archivo: `diseno/plataforma/plataforma.dc.html`. Para verla en el navegador:
mega menú Contratistas → pestaña **Contratistas** (o Cumplimiento /
Asignación de requerimientos) → botón flotante verde "Invitar Contratista".

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Modal (elegir tipo, individual, masiva) | 3361–3383 | `{{ invOpen }}` |
| Botón flotante | 3384 | `{{ invShow }}` |
| Lógica del modal y validaciones | 5760–5786 | `invVals()` |
| Condición del botón (`invShow`, `invGo`) | 8837 | `invShow` |
| Invitados que aparecen en Asignación de requerimientos | 5787–5813 | `crqVals`, `st.invited` |
| Acción "Invitar Contratista" / "Invitar Cliente" en el mega menú | 4953, 4977, 4986 | `action`, `mail: true` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

1. **Elegir tipo** (título "Invitar contratista"): dos tarjetas, "Invitación
   individual" ("Captura los datos de contacto...") e "Invitación masiva"
   ("Carga un archivo Excel o CSV..."). Botón Cancelar / Continuar.
2. **Individual**: campos Razón social*, Correo* y Teléfono (prefijo +52, 10
   dígitos, opcional). Mensaje opcional ("Mensaje opcional que acompañará la invitación"). **Vista previa** del correo: "Invitación
   para contratista", "{empresa} te invita a unirte como contratista en la
   plataforma Clave 10", el mensaje capturado, botón "Aceptar Invitación" y
   "Si no esperabas este correo, puedes ignorarlo". Validación al enviar:
   obligatorios ("Este campo es obligatorio"), correo ("Escribe un correo
   válido") y teléfono ("Escribe 10 dígitos"). Botón "Enviar Invitación";
   toast "Se envió la invitación a {correo}".
3. **Masiva**: zona de arrastre "Arrastra aquí el archivo de contratistas"
   (Excel o CSV, máximo 50 MB) y "Seleccionar archivo". Mientras lee: "Leyendo
   archivo…". Resumen "N invitaciones listas · N omitidas" y tabla Razón social,
   Correo, Estatus: **Lista**, **Correo inválido** (se omite), **Ya registrado**
   (se omite). Quitar archivo con el bote. "Descargar Plantilla" (CSV con
   Razón social, RFC, Nombre de contacto, Correo, Teléfono). Botón "Enviar N
   Invitaciones", deshabilitado sin filas válidas; toast "Se enviaron N
   invitaciones".
4. Tras enviar, los invitados aparecen en la matriz de Asignación de
   requerimientos (MX-05) con marca de invitación pendiente ("Invitación enviada a
   {correo} el {fecha}", "aún no acepta la invitación"), sin RFC y sin abrir
   detalle. No aparecen en la lista de Contratistas (R-04).

**Espejo (cliente / contratista)**: el mega menú de Clientes trae la acción
"Invitar Cliente", pero el modal y el botón flotante solo existen para
Contratistas y todos sus textos dicen "contratista" fijo (no usan `kLbl`).
El botón se oculta con `ctrKind === "cli"`. Hay que hacer el modal espejo.

**No está en el diseño**
- Aceptar la invitación: solo existe el botón "Aceptar Invitación" del correo.
  La pantalla de destino sería el login / wizard de registro
  (`registro.dc.html`, RG-02), que no menciona invitaciones ni precarga datos.
- El flujo del lado de quien recibe como cliente.
- Las columnas RFC y Nombre de contacto de la plantilla no se capturan en el
  formulario individual ni se leen en la tabla masiva.
- Reenviar o cancelar una invitación pendiente.

## Qué reusa (no rehacer)

- Modales y toast: F0-05 · Subida de archivo: F0-10
- Etiquetas espejo: F0-03

## Fuera de esta tarea

- Modelo y backend de relaciones: R-01
- Wizard de registro y login: RG-02, RG-01
- Lista de Clientes/Contratistas: R-04
