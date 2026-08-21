---
name: clave10-prod-update
description: Actualiza el contenedor Docker de producción de una o varias cuentas de Clave10 usando el comando ./lkf update prod <id>. Úsala cuando Paco pida "actualizar producción", "actualizar el contenedor de la cuenta X", "correr ./lkf update prod", o dé una lista de account IDs para actualizar en cadena (ej. "actualiza 10, 126 y 100"). Distinta de clave10-account-scripts-sync: esa actualiza SCRIPTS por cuenta dentro del contenedor lkf-addons; esta actualiza el CONTENEDOR de producción completo de la cuenta (jala imagen nueva y reinicia), corriendo ./lkf desde la raíz del proyecto addons, sin entrar a ningún contenedor.
---

# Actualización de contenedores de producción (./lkf update prod)

## Qué hace

Cada cuenta de Clave10 corre en su propio contenedor Docker en producción. El comando:

```bash
./lkf update prod <account_id>
```

corrido desde la raíz del proyecto addons, jala la imagen actualizada y reinicia el
contenedor de esa cuenta específica. **No pide confirmación** — corre directo, igual
que hacerlo a mano. Paco normalmente encadena varias cuentas seguidas:

```bash
./lkf update prod 10 && ./lkf update prod 126 && ./lkf update prod 100
```

Esta skill automatiza exactamente ese patrón (secuencial, se detiene si una falla,
igual que el `&&` a mano) sin agregar ninguna confirmación extra — Paco pidió
explícitamente que corra directo, sin capas de dry-run ni de doble verificación.

## Cómo usarla

0. **Etapa inicial (solo si la cuenta que Paco pide todavía no está en el registro):**
   esta skill resuelve nombres de cuenta contra `~/.config/clave10/accounts.json`, el
   mismo registro personal que usa `clave10-account-scripts-sync` — **no tiene, ni
   debe tener, su propia copia** de ese registro ni del catálogo de cuentas Clave10
   (tener dos catálogos separados es justo lo que se quiere evitar). Si Paco da un
   nombre de cuenta que no aparece ahí, **no asumir el `account_id` ni sacarlo a mano
   de `local_settings.py`** — correr el bootstrap de la skill hermana, ubicando su
   carpeta junto a esta (mismo directorio `skills/`) y corriendo:
   ```bash
   python3 ../clave10-account-scripts-sync/scripts/bootstrap_accounts.py
   ```
   Ese script solo puede rellenar cuentas que ya estén en
   `clave10-account-scripts-sync/references/accounts.template.json` (versionado). Si
   la cuenta tampoco está ahí, no es un problema de esta skill: significa que esa
   cuenta todavía no está dada de alta como Clave10 en el template (un cambio
   deliberado, aparte, no algo que se resuelva sobre la marcha). Esto existe porque
   `local_settings.py` mezcla cuentas de Clave10 con cuentas de otros productos que NO
   deben actualizarse con `./lkf update prod` — meter mal un `account_id` ahí
   actualizaría el contenedor equivocado. Si Paco ya trae el `account_id` numérico
   directo (ej. "actualiza el 100"), se puede usar `--ids` sin pasar por el registro
   y este paso no aplica.
1. Confirmar con Paco la **lista de account IDs** a actualizar (o nombres de cuenta si
   prefiere usar las keys de `~/.config/clave10/accounts.json`, que ya tienen el
   `account_id` mapeado).
2. Correr:
   ```bash
   python3 scripts/prod_update.py --ids 10,126,100
   ```
   o, usando nombres de cuenta en vez de IDs crudos:
   ```bash
   python3 scripts/prod_update.py --accounts seguridad,josepato --accounts-file ~/.config/clave10/accounts.json
   ```
3. El script corre `./lkf update prod <id>` uno por uno, en orden, mostrando el output
   real de cada corrida. **Por default se detiene en el primer error** (mismo
   comportamiento que el `&&` que Paco usa a mano) — no sigue con las cuentas
   restantes salvo que se pase `--continue-on-error`.
4. Pegar a Paco el log real de cada cuenta conforme va corriendo (no solo un resumen
   al final) — mismo criterio que en `clave10-account-scripts-sync`.
5. Al terminar (o al detenerse por error), mostrar un resumen tipo:
   ```
   ✅ 10  - OK
   ✅ 126 - OK
   ❌ 100 - ERROR (se detuvo aquí, no se corrieron las cuentas restantes)
   ```

## Configuración pendiente (placeholder)

`--lkf-path` (ruta a la raíz del proyecto addons donde vive el ejecutable `./lkf`)
tiene como default `/Users/pacogod/lkf/addons` (esta Mac). Si en algún momento el
ejecutable vive en otra ruta o en otra máquina, pasar `--lkf-path` explícito.

## Seguridad

- Esta skill **modifica producción real** sin capa de confirmación propia — es
  intencional, así lo pidió Paco. No agregar dry-run ni confirmaciones extra a menos
  que él lo pida explícitamente en el futuro.
- No hay secretos que manejar aquí directamente (el `./lkf` ya usa sus propias
  credenciales internas), pero si `--accounts-file` se usa para resolver IDs desde
  `accounts.json`, nunca imprimir el contenido de ese archivo — solo los IDs
  resueltos.
- **Nunca** resolver un `account_id` para esta skill leyendo `local_settings.py`
  directamente (a mano o por script) — ese archivo mezcla cuentas de Clave10 con
  cuentas de otros productos sin el módulo instalado. El único camino es el
  `account_id` que ya esté en `accounts.template.json` (versionado, dado de alta ahí
  a mano y aparte) más el `accounts.json` personal que rellena `bootstrap_accounts.py`
  (ver Etapa inicial arriba).
- Si `./lkf update prod <id>` pidiera en algún momento una confirmación (cambio de
  comportamiento del comando), la skill NO debe intentar auto-responderla sin que
  Paco lo pida — hay que avisarle y detenerse, para no automatizar una confirmación
  que él quería ver de verdad.

## Archivos de esta skill

- `scripts/prod_update.py` — script principal (ver `--help`).
