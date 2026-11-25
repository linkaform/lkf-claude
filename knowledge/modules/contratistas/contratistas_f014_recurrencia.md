# F0-14 · Base · Selector de vigencia / recurrencia

> Ficha de diseño de la tarea F0-14 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** selector de vigencia / recurrencia (Requerimientos, Sesiones,
Nuevo contrato).
**Tipo:** front · **Depende de:** F0-05.

## Dónde está en el diseño

Hay **tres variantes** del mismo control, con piezas repetidas (días, semanas,
meses, "todos", frecuencia por horas). Conviene un componente con modos.

Requerimientos y Sesiones: `diseno/plataforma/plataforma.dc.html`. Nuevo
contrato: `diseno/registro-contrato/nuevo-contrato.dc.html`.

| Variante | Cómo llegar | Template | Lógica |
| --- | --- | --- | --- |
| **Requerimientos** (la más completa: documento, inspección, examen) | Mi empresa → Configuraciones → Requerimientos → Nuevo Requerimiento, paso 2 | plataforma 2390–2410 (documento 2393–2401, inspección 2402, examen 2403) | 7223–7288 (`rqVMods`, `rqPPers`, `rqGFs`, `rqERecHint`); constantes 4803, 4809 |
| **Sesiones** (estilo calendario: no se repite, cada día… personalizado, y término) | Configuraciones → Sesiones → Nueva Sesión | plataforma 2175–2210 (selector 2178, personalizado 2181–2209, término 2194) | 7567–7576 (`ssnRep`, `ssnEnd`, `ssnWhenErrTxt`) |
| **Nuevo contrato** (restringir días y horarios de trabajo) | Mi empresa → Contratos → Nuevo Contrato, sección 4 Recurrencia | nuevo-contrato 211–329 (tipo 229, por día 236, semanal 261, mensual 275, configurable 310, horario 316–328) | 4098–4150 (`nRc`); resumen 4325–4347 y 3270–3273 |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

**Requerimientos** (interruptor "Vigencia" con texto de ayuda según tipo)
- Documento: apagado = "Sin vencimiento". Encendido ofrece dos modos:
  **Por Vigencia** ("Vigente por" N + día(s), semana(s), mes(es), año(s); ayuda
  "se entrega una vez y vence N … después de su emisión") o **Periódico**.
- Periódico: periodicidad Mensual, Bimestral, Trimestral, Cuatrimestral,
  Semestral o Anual; para mensual, "Todos Los Meses" o "Seleccionar Meses"
  (con "Todos los meses"); **Plazo de entrega**: día del mes siguiente al
  periodo (por defecto 17; vencido si no se sube a más tardar ese día).
- Inspección: Diaria, Semanal, Mensual, Anual: días de la semana, día de
  cada mes, meses; "Frecuencia por horas" (cada N horas); **Tolerancia**
  ("se puede aplicar hasta N … después"); resumen textual. El template
  trae además un bloque "Quincenas" que ninguna opción activa (`rqGQui`);
  no construirlo salvo que el equipo lo confirme.
- Examen: igual que inspección más "Vigencia del resultado" (aprobado es
  válido por N unidad).
- Errores: "Selecciona una opción", "Selecciona la periodicidad", "Selecciona
  al menos un mes / día".

**Sesiones**
- Fecha y horario, "Todo el día" y selector con: No se repite, Cada día, Cada
  semana el {día}, Cada mes el día {n}, Cada mes el {primer…último} {día}, Cada
  año el {d} de {mes}, Todos los días laborables, Personalizado. Las opciones
  se calculan con la fecha de la sesión.
- Personalizado ("Vigencia personalizada"): tipo Por día, Semanal, Mensual,
  Anual o Configurable. Por día: días y frecuencia por horas. Semanal: semana
  del mes. Mensual: día del mes o ordinal, "cada N mes(es)" o meses
  seleccionados. Configurable: "Repetir cada N" día(s)/semana(s)/mes(es)/año(s).
- **Termina:** Nunca, El {fecha} (debe ser posterior a la sesión) o Después de
  N repeticiones. Errores: "Selecciona la fecha de inicio", "La fecha de fin
  debe ser igual o posterior al inicio", "La hora de fin debe ser posterior al
  inicio", "Indica el número de repeticiones".

**Nuevo contrato**
- Interruptor "Restringir días y horarios de trabajo" (opcional); al activar,
  select **Recurrencia \*** con Por día, Semanal, Mensual, Configurable.
- Por día: botones de día (por defecto lunes a viernes), "Todos los días" y
  frecuencia por horas. Semanal: semanas del mes (por defecto las cinco).
  Mensual: "Mensualmente el día {n}" o "el {ordinal} {día} del mes" (según la
  fecha de inicio), y modo "Repetir cada X meses" o "Seleccionar meses".
  Configurable: "Repetir cada N" + unidad (por defecto 1 semana(s)).
- Horario de trabajo **Desde / Hasta** (por defecto 07:00 a 16:00).
- Aparece en el resumen de confirmación, p. ej. "Por día · Lun, Mar… · 07:00
  a 16:00". Sin interruptor: "Sin restricción de días u horarios".

## Qué reusa (no rehacer)

- Switch, chips de selección, inputs numéricos, desplegables: F0-05
- Botones de día / semana / mes con "Todos": mismo patrón en las tres variantes

## Fuera de esta tarea

- Avisos de vencimiento, acuse, limitante y criterios (siguen en el paso 2
  del requerimiento): CF-01
- Calendario de sesiones y su editor completo: CF-03
- Resto de Nuevo contrato (servicios, recursos, ubicaciones): ME-12
