#!/bin/bash
# Sincroniza memoria auto-generada (MEMORY.md + archivos de memoria) y
# preferencias (~/.claude/settings.json) entre este repo privado y la
# instalación local de Claude Code.
#
# Uso:
#   sync-memory.sh push [path-del-proyecto]   # de ~/.claude/ hacia este repo
#   sync-memory.sh pull [path-del-proyecto]   # de este repo hacia ~/.claude/
#
# Sin path-del-proyecto, usa el directorio actual.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/lib.sh"

ACTION="${1:-}"
PROJECT_ARG="${2:-}"

if [ "$ACTION" != "push" ] && [ "$ACTION" != "pull" ]; then
    echo "Uso: $0 push|pull [path-del-proyecto]" >&2
    exit 1
fi

PROJECT_PATH="$(resolve_project_path "$PROJECT_ARG")"
HASH="$(path_to_hash "$PROJECT_PATH")"
NAME="$(project_name_from_path "$PROJECT_PATH")"

LOCAL_MEMORY_DIR="$CLAUDE_DIR/projects/$HASH/memory"
REPO_MEMORY_DIR="$REPO_DIR/memory/$HASH"
LOCAL_SETTINGS="$CLAUDE_DIR/settings.json"
REPO_SETTINGS="$REPO_DIR/settings.json"

if [ "$ACTION" = "push" ]; then
    echo "push: $PROJECT_PATH ($NAME) -> $REPO_DIR"

    if [ -d "$LOCAL_MEMORY_DIR" ]; then
        mkdir -p "$REPO_MEMORY_DIR"
        cp -a "$LOCAL_MEMORY_DIR"/. "$REPO_MEMORY_DIR"/
        echo "  memoria: $LOCAL_MEMORY_DIR -> $REPO_MEMORY_DIR"
    else
        echo "  (sin memoria local todavía para este proyecto, se omite)"
    fi

    if [ -f "$LOCAL_SETTINGS" ]; then
        cp "$LOCAL_SETTINGS" "$REPO_SETTINGS"
        echo "  settings.json copiado"
    fi

    cd "$REPO_DIR"
    git add -A
    if git diff --cached --quiet; then
        echo "  nada nuevo que commitear"
    else
        git commit -m "sync from $(hostname) $(date +%F)" >/dev/null
        echo "  commit creado. Corre 'git push' desde $REPO_DIR cuando quieras subirlo."
    fi

elif [ "$ACTION" = "pull" ]; then
    echo "pull: $REPO_DIR -> $PROJECT_PATH ($NAME)"

    if [ -d "$REPO_MEMORY_DIR" ]; then
        mkdir -p "$LOCAL_MEMORY_DIR"
        cp -a "$REPO_MEMORY_DIR"/. "$LOCAL_MEMORY_DIR"/
        echo "  memoria: $REPO_MEMORY_DIR -> $LOCAL_MEMORY_DIR"
    else
        echo "  (no hay memoria guardada en el repo para $HASH, se omite)"
    fi

    if [ -f "$REPO_SETTINGS" ]; then
        if [ -f "$LOCAL_SETTINGS" ]; then
            cp "$LOCAL_SETTINGS" "$LOCAL_SETTINGS.bak"
            echo "  backup de settings.json local en $LOCAL_SETTINGS.bak"
        fi
        cp "$REPO_SETTINGS" "$LOCAL_SETTINGS"
        echo "  settings.json restaurado (revisa que no pise algo específico de esta máquina)"
    fi
fi
