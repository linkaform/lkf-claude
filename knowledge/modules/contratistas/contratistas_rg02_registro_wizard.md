# RG-02 · Registro · Login y wizard

> Ficha de diseño de la tarea RG-02 del proyecto Contratistas. Índice en
> `contratistas.md`.

**Tarea:** login y wizard de registro: tipo de perfil, tipo de persona,
REPSE, CSF, datos de la cuenta y pantalla de éxito; validaciones de RFC, CURP,
contraseña y dominio.
**Tipo:** front · **Depende de:** F0-05 (UI kit). Diseño v2.

## Dónde está en el diseño

Archivo: `diseno/registro-contrato/registro.dc.html` (814 líneas, su propio
`_ds/`). Es un componente con una variable de estado `vista` que decide la
pantalla; no hay rutas. Para llegar: abrir el archivo (arranca en `login`) →
"Regístrate aquí" → paso 1. Para saltar a una pantalla, el panel de ajustes
trae el prop `pantallaInicial` (login, paso1–paso4, exito; **paso5 no está en
la lista**, se llega avanzando). El template es 34–419, la lógica
(`class Component`, `renderVals()`) 475–812.

| Bloque | Líneas | Variable |
| --- | --- | --- |
| Login | 34–47 | `{{ esLogin }}` |
| Contenedor y barra de 5 tramos | 48–67 | `{{ esWizard }}`, `tramos` |
| Paso 1 · Tipo de perfil | 68–81 | `{{ esPaso1 }}` |
| Paso 2 · Tipo de persona | 82–98 | `{{ esPaso2 }}` |
| Paso 3 · REPSE (vacío, leyendo, datos) | 99–216 | `{{ esPaso3 }}`, `ocrVacio/ocrCargando/ocrListo` |
| Paso 4 · CSF (vacío, leyendo, datos) | 217–301 | `{{ esPaso4 }}`, `csfVacio/csfCargando/csfListo` |
| Paso 5 · Datos de la cuenta | 302–~371 | `{{ esPaso5 }}` |
| Atrás / Continuar | ~372–383 | `atras`, `continuar` |
| Pantalla de éxito | 385–419 | `{{ esExito }}` |
| Catálogos (`PERFILES`, `PERSONAS`, `PASOS`, `ACTIVIDADES`) | 446–473 | — |
| Validación y habilitar Continuar | 516–535 | `reglas`, `obligatorios`, `listo` |

Las líneas son de la versión del 2026-11-13; si el diseño cambia, ubica el
bloque por su variable.

## Qué hace

- **Login:** usuario, contraseña con ojo mostrar/ocultar, "Iniciar sesión",
  "¿Olvidaste tu contraseña?" (sin destino) y "Regístrate aquí".
- **Paso 1:** elegir uno de 4 perfiles: Cliente, Contratista, Visitante,
  Transportista. El diseño no cambia los pasos según el perfil.
- **Paso 2:** Persona moral o física. Define los campos del paso 5 (RFC de 12
  o 13, CURP solo en física). Nota: se puede corregir desde configuraciones
  mientras el perfil no tenga contratos activos.
- **Pasos 3 y 4:** zona para subir PDF (máx. 10 MB), "Omitir por ahora" y
  datos extraídos editables; detalle en RG-03. Omitir REPSE salta al paso 4;
  omitir CSF salta al 5. En el éxito el REPSE omitido aparece "Pendiente".
- **Paso 5 "Datos de tu cuenta":** razón social (o nombre completo), RFC,
  representante legal (moral) o CURP (física), correo (será el usuario),
  teléfono (+52, máx. 10), dirección, dominio, contraseña y confirmación,
  checkbox de Términos y Aviso de Privacidad. Botón "Crear cuenta".
- **Validaciones (todas del lado cliente en el diseño):**
  - RFC: solo longitud exacta, 12 moral / 13 física (`maxLength` y 525–529). No
    valida formato ni homoclave.
  - CURP: longitud 18 (física). Sin formato.
  - Contraseña: mínimo 8, una mayúscula, un número, un carácter especial; se
    ve la lista de reglas en verde/gris y "Las contraseñas coinciden / no
    coinciden".
  - Dominio (obligatorio en moral): se normaliza al escribir (minúsculas,
    sin acentos ni ñ, espacios y guiones bajos a "-", solo `a-z0-9-`, sin
    guiones dobles, 724–731) y se muestra `<dominio>.clave10.com` con "Vas a
    entrar en…".
  - Correo, teléfono y dirección: solo obligatorios, sin formato.
  - "Crear cuenta" se habilita con todo lo anterior más los términos.
- **Éxito:** "¡Bienvenido a Clave 10!", resumen (razón social, número REPSE,
  correo), completitud del perfil fija en 25 % y botón "Explorar el
  dashboard".

## No está en el diseño

- Error de login, usuario duplicado o dominio ya tomado (no se consulta
  disponibilidad), código de verificación de correo, ni contraseña olvidada.
- El teléfono no exige 10 dígitos exactos, solo máximo.
- Los enlaces de destino (`Mi empresa.dc.html`, `Dashboard.dc.html`) no
  están incluidos; el índice ya lo indica.

## Qué reusa (no rehacer)

- Botones, inputs, checkbox, estados vacíos: F0-05.

## Fuera de esta tarea

- OCR real de REPSE y CSF y prellenado: RG-03.
- Backend de alta de cuenta (crear cuenta, dominio, usuario): RG-01.
- Completar el perfil de empresa después del registro: ME-01.
