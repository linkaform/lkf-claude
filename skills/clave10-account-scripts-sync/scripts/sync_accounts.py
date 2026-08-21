#!/usr/bin/env python3
"""
sync_accounts.py

Automatiza el ciclo:
  1. Antes de tocar nada, tomar un snapshot de tu config/local_settings.py
     ACTUAL (tu cuenta personal activa) y guardarlo en
     ~/.config/clave10/local_settings_backup.py (auto-generado por este
     script, no depende de que tu ya lo tengas creado).
  2. Regenerar config/local_settings.py con las credenciales de UNA cuenta.
  3. Correr `lkfaddons install -m <modulo> -i scripts` dentro del contenedor
     lkf-addons, confirmando los dos prompts "y" automaticamente.
  4. Repetir para cada cuenta de la lista (batch).
  5. Al terminar, restaurar config/local_settings.py desde el snapshot del
     paso 1, para no dejar activa la ultima cuenta del batch.
     Desactivar con --no-restore.

Uso (local-settings-path se busca solo, accounts-file y module ya traen default):
  python3 sync_accounts.py --accounts seguridad,gfh,hlmando

  # Modo seguro para probar sin ejecutar nada real:
  python3 sync_accounts.py --accounts seguridad,gfh,hlmando --dry-run

  # Override manual si algo cambia:
  python3 sync_accounts.py \
    --local-settings-path /ruta/host/al/addons/config/local_settings.py \
    --accounts-file /ruta/a/accounts.json \
    --module transportistas \
    --accounts seguridad,gfh,hlmando \
    --container lkf-addons

Formato de accounts.json: ver references/accounts.example.json
"""

import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path

CREATING_SCRIPT_RE = re.compile(r"^Creating script:\s*(\S+)", re.MULTILINE)
UPDATING_SCRIPT_RE = re.compile(r"^Updating script:\s*(\S+)", re.MULTILINE)


def find_local_settings_path() -> Path:
    """Busca config/local_settings.py sin asumir el usuario/maquina de nadie en
    particular. Orden: variable de entorno explicita, luego la convencion mas
    comun de checkout (~/lkf/addons/...). Si no aparece en ninguna, se le pide
    a quien esta corriendo esto que pase --local-settings-path a mano."""
    env_path = os.environ.get("CLAVE10_LOCAL_SETTINGS_PATH")
    candidates = []
    if env_path:
        candidates.append(Path(env_path))
    candidates.append(Path.home() / "lkf" / "addons" / "config" / "local_settings.py")

    for candidate in candidates:
        if candidate.exists():
            return candidate

    tried = "\n".join(f"  - {c}" for c in candidates)
    sys.exit(
        f"No encontre config/local_settings.py automaticamente. Probe:\n{tried}\n"
        f"Pasa --local-settings-path con tu ruta real, o exporta "
        f"CLAVE10_LOCAL_SETTINGS_PATH."
    )


def extract_touched_scripts(output: str) -> tuple:
    created = CREATING_SCRIPT_RE.findall(output or "")
    updated = UPDATING_SCRIPT_RE.findall(output or "")
    return created, updated

TEMPLATE = '''# coding: utf-8
# >>> Archivo generado automaticamente por sync_accounts.py <<<
# >>> Cuenta activa: {account_key} <<<
from settings import *
from uts import update_settings

config.update({{
    'USERNAME': {username!r},
    'APIKEY': {apikey!r},
{openrouter_line}
    'ACCOUNT_ID': {account_id!r},
}})

config.update({{
{couch_lines}
}})

settings.config.update(config)
settings = update_settings(settings)
'''


def mask(secret: str) -> str:
    if not secret or len(secret) < 8:
        return "****"
    return f"{secret[:4]}...{secret[-4:]}"


SENSITIVE_KEYS = ("apikey", "openrouter_api_key", "couch_password")


def masked_account(acct: dict) -> dict:
    masked = dict(acct)
    for key in SENSITIVE_KEYS:
        if masked.get(key):
            masked[key] = mask(masked[key])
    return masked


def load_accounts(accounts_file: Path) -> dict:
    if not accounts_file.exists():
        sys.exit(
            f"No encuentro {accounts_file}. Crea tu accounts.json primero "
            f"(ver references/accounts.example.json para el formato)."
        )
    with open(accounts_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    data.pop("_comment", None)
    return data


def render_local_settings(account_key: str, acct: dict) -> str:
    openrouter_line = ""
    if acct.get("openrouter_api_key"):
        openrouter_line = f"    'OPENROUTER_API_KEY': {acct['openrouter_api_key']!r},"

    couch_lines_parts = []
    if acct.get("couch_user"):
        couch_lines_parts.append(f"    'COUCH_USER': {acct['couch_user']!r},")
    if acct.get("couch_password"):
        couch_lines_parts.append(f"    'COUCH_PASSWORD': {acct['couch_password']!r},")
    couch_lines = "\n".join(couch_lines_parts)

    return TEMPLATE.format(
        account_key=account_key,
        username=acct["username"],
        apikey=acct["apikey"],
        account_id=acct["account_id"],
        openrouter_line=openrouter_line,
        couch_lines=couch_lines,
    )


def run_lkfaddons(container: str, module: str, dry_run: bool) -> tuple[bool, str]:
    cmd = [
        "docker", "exec", "-i", container,
        "bash", "-c",
        f"cd /srv/scripts/addons && lkfaddons install -m {module} -i scripts",
    ]
    if dry_run:
        return True, f"[dry-run] correria: {' '.join(cmd)} (con 'y\\ny\\n' en stdin)"

    try:
        proc = subprocess.run(
            cmd,
            input="y\ny\n",
            capture_output=True,
            text=True,
            timeout=300,
        )
    except subprocess.TimeoutExpired:
        return False, "Timeout esperando respuesta del contenedor (5 min)."

    output = (proc.stdout or "") + (proc.stderr or "")
    if proc.returncode != 0:
        return False, output.strip()
    return True, output.strip()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--local-settings-path",
        default=None,
        help="Ruta EN EL HOST hacia TU config/local_settings.py (volumen montado al contenedor). "
             "Sin este flag se busca sola (CLAVE10_LOCAL_SETTINGS_PATH, luego "
             "~/lkf/addons/config/local_settings.py); si no la encuentra, pasala explicita.",
    )
    parser.add_argument(
        "--accounts-file",
        default=str(Path.home() / ".config/clave10/accounts.json"),
        help="Ruta a tu accounts.json (fuera de cualquier repo, ver references/accounts.example.json). "
             "Default: ~/.config/clave10/accounts.json",
    )
    parser.add_argument(
        "--module", default="accesos",
        help="Modulo a instalar, ej. accesos, transportistas. Default: accesos",
    )
    parser.add_argument(
        "--accounts", required=True,
        help="Lista de cuentas separadas por coma (keys de accounts.json), o 'all' para todas.",
    )
    parser.add_argument("--container", default="lkf-addons", help="Nombre del contenedor Docker.")
    parser.add_argument(
        "--dry-run", action="store_true",
        help="No escribe local_settings.py real ni ejecuta docker exec; solo muestra que haria.",
    )
    parser.add_argument(
        "--restore-backup", default=None,
        help="Ruta donde guardar/leer el snapshot de tu local_settings.py personal. "
             "Default: ~/.config/clave10/local_settings_backup.py (auto-generado por "
             "este script al inicio del batch, no requiere que exista de antemano).",
    )
    parser.add_argument(
        "--no-restore", action="store_true",
        help="No restaurar ningun local_settings.py al terminar; deja activa la ultima cuenta procesada.",
    )
    args = parser.parse_args()

    local_settings_path = Path(args.local_settings_path) if args.local_settings_path else find_local_settings_path()
    accounts_file = Path(args.accounts_file)
    restore_path = (
        Path(args.restore_backup) if args.restore_backup
        else Path.home() / ".config/clave10/local_settings_backup.py"
    )

    all_accounts = load_accounts(accounts_file)

    if args.accounts.strip().lower() == "all":
        target_keys = list(all_accounts.keys())
    else:
        target_keys = [a.strip() for a in args.accounts.split(",") if a.strip()]

    unknown = [k for k in target_keys if k not in all_accounts]
    if unknown:
        sys.exit(f"Estas cuentas no existen en {accounts_file}: {', '.join(unknown)}")

    no_apikey = [k for k in target_keys if not all_accounts[k].get("apikey")]
    if no_apikey:
        sys.exit(
            f"Estas cuentas estan en {accounts_file} pero sin apikey (no las tienes "
            f"en tu local_settings.py todavia): {', '.join(no_apikey)}. "
            f"Corre bootstrap_accounts.py despues de tener sus credenciales en tu "
            f"local_settings.py, o pide que te las compartan."
        )

    print(f"Modulo: {args.module}")
    print(f"Contenedor: {args.container}")
    print(f"Cuentas a procesar ({len(target_keys)}): {', '.join(target_keys)}")
    if args.dry_run:
        print("*** DRY RUN: no se escribira nada ni se ejecutara docker exec ***")

    if not args.no_restore:
        if args.dry_run:
            print(f"[dry-run] Se tomaria snapshot de {local_settings_path} -> {restore_path}")
        elif local_settings_path.exists():
            restore_path.parent.mkdir(parents=True, exist_ok=True)
            restore_path.write_text(local_settings_path.read_text(encoding="utf-8"), encoding="utf-8")
            print(f"Snapshot de tu config personal guardado <- {local_settings_path} -> {restore_path}")
        else:
            print(f"(No tome snapshot: no encontre {local_settings_path} todavia)")
    print()

    results = []
    for key in target_keys:
        acct = all_accounts[key]
        print(f"--- {key} ({acct['username']}, apikey {mask(acct['apikey'])}) ---")

        if args.dry_run:
            print("[dry-run] local_settings.py que se generaria (secretos enmascarados):")
            print(render_local_settings(key, masked_account(acct)))
        else:
            content = render_local_settings(key, acct)
            local_settings_path.parent.mkdir(parents=True, exist_ok=True)
            local_settings_path.write_text(content, encoding="utf-8")
            print(f"local_settings.py actualizado -> {local_settings_path}")

        ok, output = run_lkfaddons(args.container, args.module, args.dry_run)
        if output:
            print(output)

        if args.dry_run:
            created, updated = [], []
            print(f"[dry-run] Scripts que se tocarian en {key}: (no se sabe hasta correr real)")
        else:
            created, updated = extract_touched_scripts(output)
            touched = created + updated
            if touched:
                parts = []
                if created:
                    parts.append(f"creados: {', '.join(created)}")
                if updated:
                    parts.append(f"actualizados: {', '.join(updated)}")
                print(f"Scripts modificados en {key} ({len(touched)}): {'; '.join(parts)}")
            else:
                print(f"Scripts modificados en {key}: ninguno (ya estaban al dia)")

        results.append((key, ok, created + updated))
        print()

    print("=== Resumen ===")
    for key, ok, touched in results:
        status = "OK" if ok else "ERROR"
        icon = "\u2705" if ok else "\u274c"
        detail = f"{len(touched)} script(s) modificados: {', '.join(touched)}" if touched else "sin cambios"
        print(f"{icon} {key:15s} - {status} - {detail}")

    if not args.no_restore:
        if not restore_path.exists():
            print(f"(No se restauro nada: no encontre {restore_path})")
        elif args.dry_run:
            print(f"[dry-run] Al terminar se restauraria {local_settings_path} <- {restore_path}")
        else:
            local_settings_path.write_text(restore_path.read_text(encoding="utf-8"), encoding="utf-8")
            print(f"local_settings.py restaurado a tu config personal <- {restore_path}")

    if any(not ok for _, ok, _ in results):
        sys.exit(1)


if __name__ == "__main__":
    main()
