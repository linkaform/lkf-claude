# Plantilla: memoria personal portátil entre máquinas

Claude Code guarda tres cosas **fuera de este repo**, en tu `~/.claude/`
local, indexadas por el path absoluto del proyecto en el que trabajas:

- **Memoria auto-generada** (`~/.claude/projects/<hash>/memory/`) — lo que
  Claude va aprendiendo sobre cómo trabajas.
- **Historial de sesiones** (`~/.claude/projects/<hash>/*.jsonl`) —
  transcripciones completas de tus conversaciones.
- **Preferencias** (`~/.claude/settings.json`) — tema, plugins habilitados.

Nada de esto se comparte solo porque instales el plugin `lkf-claude` en otra
máquina — cada máquina empieza de cero. Si quieres llevar **tu propia**
memoria de una máquina a otra (laptop nueva, otra workstation), esta carpeta
es una plantilla para armar tu propio repo **privado** con ese fin.

Esto es personal, no de equipo: cada quien arma el suyo con sus propios
datos. `knowledge/` (el conocimiento del SDK) sigue siendo aparte, público,
y se comparte vía PR a este repo normalmente.

## Cómo usarla

1. Copia esta carpeta a un repo nuevo y privado tuyo:
   ```bash
   cp -r docs/personal-memory-template ~/mi-memoria-personal
   cd ~/mi-memoria-personal && rm -f README.md   # o edítalo a tu gusto
   git init && git add -A && git commit -m "scaffold"
   # crea un repo privado en GitHub/GitLab y haz git remote add + push
   ```
2. Desde cualquier proyecto (ej. parado en tu checkout de `lkf-claude`):
   ```bash
   ~/mi-memoria-personal/scripts/sync-memory.sh push   # sube memoria + settings.json
   ~/mi-memoria-personal/scripts/export-sessions.sh    # snapshot .tar.gz del historial
   ```
3. En la máquina nueva, clona tu repo privado y corre:
   ```bash
   ~/mi-memoria-personal/scripts/sync-memory.sh pull
   ~/mi-memoria-personal/scripts/import-sessions.sh <archivo.tar.gz>
   ```

## Qué NO va aquí, nunca

`~/.claude.json` y `~/.claude/.credentials.json` tienen tokens de cuenta
(OAuth) — nunca los metas a un repo git, ni privado. Cada máquina se
autentica con su propio login normal de Claude Code.

## Notas si usas Docker (`docker/claude-code/`)

Si tu repo de memoria personal vive dentro de la misma carpeta que montas
al contenedor (`LKF_HOST_PATH`), los scripts funcionan igual adentro sin
configuración extra — solo necesitas correrlos apuntando al path del
proyecto dentro del contenedor.

El historial de sesiones (`sessions/*.tar.gz` en tu repo personal) se deja
fuera de git a propósito — son transcripciones grandes que no diffean bien
y pueden crecer el repo sin límite. Muévelos entre máquinas como prefieras
(scp, USB, drive).
