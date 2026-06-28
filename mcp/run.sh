#!/bin/bash
# Levanta el MCP server de lkf-knowledge en Docker (stdio).
# Llamado por Claude Code — stdout es el canal MCP, logs van a stderr.
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
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
