#!/bin/bash
# Levanta el MCP server de lkf-knowledge (stdio).
# Llamado por Claude Code — stdout es el canal MCP, logs van a stderr.
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Camino rápido: correr el server directo con python3 (única dependencia:
# fastmcp). Evita requerir Docker-in-Docker a quien instale el plugin.
if command -v python3 > /dev/null 2>&1; then
    if ! python3 -c "import fastmcp" > /dev/null 2>&1; then
        echo "[lkf-mcp] Instalando dependencia fastmcp..." >&2
        pip3 install --quiet --user "fastmcp>=2.0.0" >&2
    fi
    exec python3 "$SCRIPT_DIR/server.py"
fi

# Fallback: si no hay python3 disponible pero sí Docker, usar el Dockerfile.
if command -v docker > /dev/null 2>&1; then
    REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
    IMAGE="lkf-mcp-server:latest"

    if ! docker image inspect "$IMAGE" > /dev/null 2>&1; then
        echo "[lkf-mcp] Construyendo imagen Docker por primera vez..." >&2
        docker build -t "$IMAGE" "$SCRIPT_DIR" >&2
    fi

    exec docker run --rm -i \
        -v "$REPO_ROOT/knowledge:/knowledge:rw" \
        -e KNOWLEDGE_DIR=/knowledge \
        "$IMAGE"
fi

echo "[lkf-mcp] Error: se necesita python3 (con pip) o docker para correr el MCP server." >&2
exit 1
