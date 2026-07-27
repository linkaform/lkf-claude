#!/bin/bash
# Restaura un .tar.gz generado por export-sessions.sh. Como cada sesión se
# nombra por UUID, extraer sobre un directorio existente es una UNIÓN, no
# un reemplazo -- no borra sesiones locales que no estén en el tar.
#
# Uso: import-sessions.sh <archivo.tar.gz> [path-del-proyecto]
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/lib.sh"

ARCHIVE="${1:-}"
PROJECT_ARG="${2:-}"

if [ -z "$ARCHIVE" ] || [ ! -f "$ARCHIVE" ]; then
    echo "Uso: $0 <archivo.tar.gz> [path-del-proyecto]" >&2
    exit 1
fi

PROJECT_PATH="$(resolve_project_path "$PROJECT_ARG")"
HASH="$(path_to_hash "$PROJECT_PATH")"

DEST_DIR="$CLAUDE_DIR/projects/$HASH"
mkdir -p "$DEST_DIR"

tar xzf "$ARCHIVE" -C "$DEST_DIR"

echo "Importado en: $DEST_DIR"
