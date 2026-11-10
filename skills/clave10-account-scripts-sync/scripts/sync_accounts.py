#!/usr/bin/env python3
"""
sync_accounts.py

Desde que `./lkf workwith <dominio>` / `./lkf workon <env>` existen, cambiar de
cuenta activa ya NO es editar config/local_settings.py: ese archivo ahora es un
loader dinamico que lee secrets/accounts.ini + secrets/current_domain solo. El
batch de esta skill automatiza:

  1. Fijar el environment del batch (./lkf workon <env>, default prod) UNA sola
     vez -- es ortogonal a la cuenta.
  2. Guardar que cuenta/environment estaban activos ANTES del batch
     (secrets/current_domain, secrets/current_env), para restaurarlos al final.
  3. Para cada cuenta de la lista:
     a. `./lkf workwith <dominio>` en el HOST (raiz de addons) -- cambia las
        credenciales activas Y deja modules/ en la rama de ese cliente
        (mergea origin/master a favor de la rama del cliente si hace falta).
     b. `lkfaddons install -m <modulo> -i scripts` dentro del contenedor
        lkf-addons, confirmando los dos prompts "y" automaticamente.
  4. Al terminar, vuelve a correr `./lkf workwith <dominio_original>` /
     `./lkf workon <env_original>` para dejarte exactamente como estabas.
     Desactivar con --no-restore.

El nombre de dominio que se le pasa a `./lkf workwith` es la KEY de accounts.json,
salvo que la cuenta traiga "workwith_domain" explicito -- usalo solo si esa cuenta
existe en secrets/accounts.ini con OTRO nombre de seccion. Si una cuenta no tiene
seccion en accounts.ini todavia (sin rama de cliente), workwith fallara limpio y
el batch la reporta como ERROR con el motivo.

La lista de cuentas sale de tu accounts.json personal si existe
(~/.config/clave10/accounts.json); si no, del catalogo versionado
references/accounts.template.json (sin secretos). workwith toma las credenciales
de secrets/accounts.ini, asi que aqui no hace falta ninguna apikey.

Uso (lkf-path, accounts-file y module ya traen default):
  python3 sync_accounts.py --accounts seguridad,gfh,hlmando

  # Modo seguro para probar sin ejecutar nada real:
  python3 sync_accounts.py --accounts seguridad,gfh,hlmando --dry-run

  # Override manual si algo cambia:
  python3 sync_accounts.py \\
    --lkf-path /ruta/host/al/addons \\
    --accounts-file /ruta/a/accounts.json \\
    --module transportistas \\
    --env preprod \\
    --accounts seguridad,gfh,hlmando \\
    --container lkf-addons

Formato de accounts.json: ver references/accounts.example.json
"""

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

# El resolver de workspace vive en lib/ del plugin, no junto a la skill.
sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "lib"))
from lkf_workspace import workspace

PERSONAL_ACCOUNTS = Path.home() / ".config/clave10/accounts.json"
TEMPLATE_ACCOUNTS = Path(__file__).resolve().parents[1] / "references" / "accounts.template.json"

CREATING_SCRIPT_RE = re.compile(r"^Creating script:\s*(\S+)", re.MULTILINE)
UPDATING_SCRIPT_RE = re.compile(r"^Updating script:\s*(\S+)", re.MULTILINE)

DIRTY_BRANCH_HINT = "cambio(s) sin commitear"
MISSING_BRANCH_HINT = "no existe ni local ni en origin"
NOT_IN_CATALOG_HINT = "no esta en"


def extract_touched_scripts(output: str) -> tuple:
    created = CREATING_SCRIPT_RE.findall(output or "")
    updated = UPDATING_SCRIPT_RE.findall(output or "")
    return created, updated


def mask(secret: str) -> str:
    if not secret or len(secret) < 8:
        return "****"
    return f"{secret[:4]}...{secret[-4:]}"


def load_accounts(accounts_file: Path) -> dict:
    if not accounts_file.exists():
        sys.exit(
            f"No encuentro {accounts_file}. Pasa --accounts-file o usa el default "
            f"(tu accounts.json, o references/accounts.template.json si no lo tienes)."
        )
    with open(accounts_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    data.pop("_comment", None)
    return data


def read_pointer(lkf_path: Path, name: str) -> str:
    p = lkf_path / "secrets" / name
    return p.read_text(encoding="utf-8").strip() if p.exists() else ""


def run(cmd, cwd=None, input_text=None, timeout=300):
    try:
        proc = subprocess.run(
            cmd, cwd=cwd, input=input_text, capture_output=True, text=True, timeout=timeout,
        )
        return proc.returncode, (proc.stdout or "") + (proc.stderr or "")
    except subprocess.TimeoutExpired:
        return 1, f"Timeout esperando respuesta ({timeout}s)."


def classify_workwith_error(output: str) -> str:
    if DIRTY_BRANCH_HINT in output:
        return "modules/ tiene cambios sin commitear -- requiere stash/commit manual antes de reintentar"
    if MISSING_BRANCH_HINT in output:
        return "la rama de esta cuenta no existe ni local ni en origin -- correr ./lkf branches create"
    if NOT_IN_CATALOG_HINT in output:
        return "el dominio no esta en secrets/accounts.ini -- agregalo ahi primero"
    return "workwith fallo (ver log arriba)"


def workwith(lkf_path: Path, domain: str, dry_run: bool) -> tuple:
    cmd = [str(lkf_path / "lkf"), "workwith", domain]
    if dry_run:
        return True, f"[dry-run] correria: {' '.join(cmd)}  (cwd={lkf_path})"
    code, output = run(cmd, cwd=str(lkf_path))
    return code == 0, output.strip()


def workon(lkf_path: Path, env: str, dry_run: bool) -> tuple:
    cmd = [str(lkf_path / "lkf"), "workon", env]
    if dry_run:
        return True, f"[dry-run] correria: {' '.join(cmd)}  (cwd={lkf_path})"
    code, output = run(cmd, cwd=str(lkf_path))
    return code == 0, output.strip()


def run_lkfaddons(container: str, module: str, dry_run: bool, items: str = "scripts") -> tuple:
    cmd = [
        "docker", "exec", "-i", container,
        "bash", "-c",
        f"cd /srv/scripts/addons && lkfaddons install -m {module} -i {items}",
    ]
    if dry_run:
        return True, f"[dry-run] correria: {' '.join(cmd)} (con 'y' en stdin)"
    # Cada tipo de item puede pedir su propia confirmacion: se mandan de sobra
    code, output = run(cmd, input_text="y\n" * 10)
    return code == 0, output.strip()


def main():
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "--lkf-path",
        default=None,
        help="Raiz del proyecto addons donde vive ./lkf (workwith/workon corren en el HOST ahi). "
             "Por default se resuelve con lkf_workspace (LKF_ADDONS, "
             "~/.config/lkf/workspace.json, autodeteccion).",
    )
    parser.add_argument(
        "--accounts-file",
        default=None,
        help="Ruta a tu accounts.json. Default: ~/.config/clave10/accounts.json si existe, "
             "si no references/accounts.template.json.",
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
        "--items", default="scripts",
        help='Tipos de item para lkfaddons -i, separados por espacio (ej. "scripts reports").',
    )
    parser.add_argument(
        "--env", default="prod", choices=("local", "preprod", "prod"),
        help="Environment a fijar con ./lkf workon antes del batch (una sola vez, no por cuenta). Default: prod.",
    )
    parser.add_argument(
        "--dry-run", action="store_true",
        help="No ejecuta workwith/workon/docker exec reales; solo muestra los comandos.",
    )
    parser.add_argument(
        "--continue-on-error", action="store_true",
        help="Seguir con las cuentas restantes aunque una falle (por default se detiene en la primera).",
    )
    parser.add_argument(
        "--no-restore", action="store_true",
        help="No restaurar la cuenta/environment activos al terminar; deja activa la ultima cuenta procesada.",
    )
    args = parser.parse_args()

    lkf_path = Path(args.lkf_path) if args.lkf_path else workspace().path("addons")
    if args.accounts_file:
        accounts_file = Path(args.accounts_file)
    else:
        accounts_file = PERSONAL_ACCOUNTS if PERSONAL_ACCOUNTS.exists() else TEMPLATE_ACCOUNTS
    all_accounts = load_accounts(accounts_file)

    if args.accounts.strip().lower() == "all":
        target_keys = list(all_accounts.keys())
    else:
        target_keys = [a.strip() for a in args.accounts.split(",") if a.strip()]

    unknown = [k for k in target_keys if k not in all_accounts]
    if unknown:
        sys.exit(f"Estas cuentas no existen en {accounts_file}: {', '.join(unknown)}")

    original_domain = read_pointer(lkf_path, "current_domain")
    original_env = read_pointer(lkf_path, "current_env")

    print(f"Modulo: {args.module}")
    print(f"Contenedor: {args.container}")
    print(f"lkf-path: {lkf_path}")
    print(f"Cuentas desde: {accounts_file}")
    print(f"Environment del batch: {args.env}")
    print(f"Cuentas a procesar ({len(target_keys)}): {', '.join(target_keys)}")
    print(f"Cuenta/environment activos antes del batch: "
          f"{original_domain or '(ninguna)'} / {original_env or '(ninguno)'}")
    if args.dry_run:
        print("*** DRY RUN: no se ejecutara nada real ***")
    print()

    ok, output = workon(lkf_path, args.env, args.dry_run)
    print(f"--- workon {args.env} ---")
    print(output)
    print()
    if not ok:
        sys.exit(f"No se pudo fijar el environment {args.env}, abortando batch.")

    results = []
    stopped_early = False
    for key in target_keys:
        acct = all_accounts[key]
        domain = acct.get("workwith_domain", key)
        apikey = f", apikey {mask(acct['apikey'])}" if acct.get("apikey") else ""
        print(f"--- {key} ({acct.get('username', '?')}{apikey}, workwith domain: {domain}) ---")

        ww_ok, ww_output = workwith(lkf_path, domain, args.dry_run)
        print(ww_output)

        if not ww_ok:
            reason = classify_workwith_error(ww_output)
            print(f"ERROR en {key}: {reason}")
            results.append((key, False, []))
            print()
            if not args.continue_on_error:
                stopped_early = True
                break
            continue

        la_ok, la_output = run_lkfaddons(args.container, args.module, args.dry_run, args.items)
        if la_output:
            print(la_output)

        if args.dry_run:
            created, updated = [], []
            print(f"[dry-run] Scripts que se tocarian en {key}: (no se sabe hasta correr real)")
        else:
            created, updated = extract_touched_scripts(la_output)
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

        results.append((key, la_ok, created + updated))
        print()
        if not la_ok and not args.continue_on_error:
            stopped_early = True
            break

    print("=== Resumen ===")
    for key, ok_, touched in results:
        status = "OK" if ok_ else "ERROR"
        icon = "✅" if ok_ else "❌"
        detail = f"{len(touched)} script(s) modificados: {', '.join(touched)}" if touched else "sin cambios"
        print(f"{icon} {key:15s} - {status} - {detail}")

    processed_keys = {k for k, _, _ in results}
    skipped = [k for k in target_keys if k not in processed_keys]
    if skipped and stopped_early:
        print(f"\n(El batch se detuvo antes de llegar a: {', '.join(skipped)})")

    if not args.no_restore:
        print()
        if original_domain:
            print(f"--- restaurando cuenta activa: {original_domain} ---")
            _, r_output = workwith(lkf_path, original_domain, args.dry_run)
            print(r_output)
        else:
            print("(No habia cuenta activa antes del batch, no se restaura ninguna)")
        if original_env and original_env != args.env:
            print(f"--- restaurando environment: {original_env} ---")
            _, r_output = workon(lkf_path, original_env, args.dry_run)
            print(r_output)

    if any(not ok_ for _, ok_, _ in results) or skipped:
        sys.exit(1)


if __name__ == "__main__":
    main()
