#!/bin/bash
# Levanta el MCP server de lkf-knowledge (stdio).
# Llamado por Claude Code — stdout es el canal MCP, todo log va a stderr.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVER="$SCRIPT_DIR/server.py"
REQ="fastmcp>=2.0.0"

log() { echo "[lkf-mcp] $*" >&2; }

# El venv vive en la cache del usuario, no en el directorio del plugin: así
# sobrevive a las actualizaciones del plugin (que reinstalan en una ruta
# nueva por versión) y no ensucia el repo.
VENV="${XDG_CACHE_HOME:-$HOME/.cache}/lkf-claude/venv"

# Camino rápido: uv resuelve el entorno solo y es mucho más rápido.
if command -v uv > /dev/null 2>&1; then
    exec uv run --quiet --with "$REQ" python "$SERVER"
fi

if command -v python3 > /dev/null 2>&1; then
    if [ ! -x "$VENV/bin/python" ]; then
        log "Creando venv en $VENV..."
        # No usamos pip3 --user: en Debian/Ubuntu con PEP 668 el entorno del
        # sistema está "externally managed" y la instalación falla.
        if ! python3 -m venv "$VENV" >&2; then
            log "Error: no se pudo crear el venv. Instala python3-venv:"
            log "  sudo apt install python3-venv"
            exit 1
        fi
    fi

    if ! "$VENV/bin/python" -c "import fastmcp" > /dev/null 2>&1; then
        log "Instalando $REQ..."
        "$VENV/bin/pip" install --quiet --disable-pip-version-check "$REQ" >&2
    fi

    exec "$VENV/bin/python" "$SERVER"
fi

# Fallback: sin python3 pero con Docker.
if command -v docker > /dev/null 2>&1; then
    REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
    IMAGE="lkf-mcp-server:latest"

    if ! docker image inspect "$IMAGE" > /dev/null 2>&1; then
        log "Construyendo imagen Docker por primera vez..."
        docker build -t "$IMAGE" "$SCRIPT_DIR" >&2
    fi

    exec docker run --rm -i \
        -v "$REPO_ROOT/knowledge:/knowledge:rw" \
        -e KNOWLEDGE_DIR=/knowledge \
        "$IMAGE"
fi

log "Error: se necesita python3 (con el módulo venv) o docker para correr el MCP server."
exit 1
