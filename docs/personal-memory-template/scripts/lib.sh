#!/bin/bash
# Helpers compartidos por los scripts de sync-memory / export-sessions / import-sessions.

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CLAUDE_DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"

# Traduce un path absoluto al nombre de carpeta que usa Claude Code bajo
# ~/.claude/projects/ (cada "/" se reemplaza por "-").
path_to_hash() {
    local path="$1"
    echo "$path" | tr '/' '-'
}

# Resuelve el path absoluto de proyecto a usar: el argumento si se dio,
# si no el directorio actual.
resolve_project_path() {
    local arg="$1"
    if [ -n "$arg" ]; then
        (cd "$arg" && pwd)
    else
        pwd
    fi
}

project_name_from_path() {
    basename "$1"
}
