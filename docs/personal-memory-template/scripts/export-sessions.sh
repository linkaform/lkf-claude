#!/bin/bash
# Empaqueta el historial de sesiones (.jsonl) de un proyecto en un .tar.gz
# fechado, para moverlo manualmente a otra máquina (scp, USB, drive, etc).
# No se commitea solo -- decisión deliberada para no crecer el repo git
# para siempre con transcripciones completas.
#
# Uso: export-sessions.sh [path-del-proyecto]
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/lib.sh"

PROJECT_ARG="${1:-}"
PROJECT_PATH="$(resolve_project_path "$PROJECT_ARG")"
HASH="$(path_to_hash "$PROJECT_PATH")"
NAME="$(project_name_from_path "$PROJECT_PATH")"

SRC_DIR="$CLAUDE_DIR/projects/$HASH"

if [ ! -d "$SRC_DIR" ]; then
    echo "No existe $SRC_DIR" >&2
    echo "Se tomó el proyecto a partir de: $PROJECT_PATH (${PROJECT_ARG:+arg pasado}${PROJECT_ARG:-directorio actual, pwd})" >&2
    echo "Pasa el path del proyecto explícito, ej: $0 ~/lkf/lkf-claude" >&2
    exit 1
fi

mkdir -p "$REPO_DIR/sessions"
OUT="$REPO_DIR/sessions/${NAME}_$(date +%F).tar.gz"

tar czf "$OUT" -C "$SRC_DIR" .

echo "Exportado: $OUT"
echo "Muévelo a la otra máquina y corre: import-sessions.sh $OUT [path-del-proyecto]"
