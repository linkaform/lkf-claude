#!/usr/bin/env python3
"""
prod_update.py

Corre `./lkf update prod <account_id>` en secuencia para una lista de cuentas,
igual que el patron manual de Paco:

    ./lkf update prod 10 && ./lkf update prod 126 && ./lkf update prod 100

Por default se detiene en el primer error (mismo comportamiento que el `&&`).
No agrega ninguna confirmacion extra: el comando corre directo.

Uso:
  # Por IDs directos
  python3 prod_update.py --ids 10,126,100

  # Por nombres de cuenta -- resuelve account_id contra tu accounts.json personal
  # si existe, y si no contra accounts.template.json (el catalogo versionado de la
  # skill hermana). Solo se necesita account_id para esto, nunca el apikey, asi que
  # el template solo ya es suficiente aunque nadie haya corrido bootstrap_accounts.py.
  python3 prod_update.py --accounts seguridad,josepato

  # Seguir aunque una cuenta falle (por default se detiene)
  python3 prod_update.py --ids 10,126,100 --continue-on-error

  # Ruta distinta al proyecto addons
  python3 prod_update.py --ids 10 --lkf-path /otra/ruta/addons
"""

import argparse
import json
import subprocess
import sys
from pathlib import Path


def load_json(path: Path) -> dict:
    if not path.exists():
        return {}
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    data.pop("_comment", None)
    return data


def resolve_ids_from_accounts(account_keys: list, accounts_file: Path, template_file: Path) -> list:
    """Solo hace falta account_id para actualizar produccion -- nunca un apikey.
    Por eso se resuelve primero contra tu accounts.json personal (si existe y trae
    la cuenta) y si no contra accounts.template.json, el catalogo versionado de la
    skill hermana clave10-account-scripts-sync. Esto funciona de una sin que nadie
    haya corrido bootstrap_accounts.py todavia."""
    personal = load_json(accounts_file)
    template = load_json(template_file)
    combined = {**template, **personal}

    if not combined:
        sys.exit(
            f"No encontre cuentas ni en {accounts_file} ni en {template_file}. "
            f"Revisa --accounts-file/--template-file, o usa --ids si ya tienes el account_id."
        )

    unknown = [k for k in account_keys if k not in combined]
    if unknown:
        sys.exit(
            f"Estas cuentas no existen ni en {accounts_file} ni en {template_file}: "
            f"{', '.join(unknown)}. Si es una cuenta Clave10 nueva, hay que darla de "
            f"alta primero en accounts.template.json (cambio aparte, deliberado)."
        )
    ids = []
    for k in account_keys:
        acct_id = combined[k].get("account_id")
        if not acct_id:
            sys.exit(f"La cuenta '{k}' no tiene account_id ni en {accounts_file} ni en {template_file}.")
        ids.append((k, acct_id))
    return ids


def run_update(lkf_path: Path, account_id: str) -> bool:
    cmd = ["./lkf", "update", "prod", str(account_id)]
    print(f"$ (cd {lkf_path} && {' '.join(cmd)})")

    proc = subprocess.Popen(
        cmd,
        cwd=str(lkf_path),
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1,
    )
    for line in proc.stdout:
        print(line, end="")
    proc.wait()
    return proc.returncode == 0


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--ids", help="Lista de account IDs separados por coma, ej. 10,126,100.")
    group.add_argument("--accounts", help="Lista de nombres de cuenta (keys de accounts.json) separados por coma.")

    parser.add_argument(
        "--accounts-file",
        default=str(Path.home() / ".config/clave10/accounts.json"),
        help="Tu accounts.json personal, solo se usa si pasas --accounts. "
             "Default: ~/.config/clave10/accounts.json (no hace falta que exista).",
    )
    parser.add_argument(
        "--template-file",
        default=str(Path(__file__).resolve().parent.parent.parent / "clave10-account-scripts-sync" / "references" / "accounts.template.json"),
        help="Catalogo versionado de cuentas Clave10 (username + account_id, sin secretos) de la "
             "skill hermana clave10-account-scripts-sync. Se usa como respaldo cuando la cuenta no "
             "esta en --accounts-file. Default: references/accounts.template.json de esa skill.",
    )
    parser.add_argument(
        "--lkf-path",
        default="/Users/pacogod/lkf/addons",
        help="Ruta a la raiz del proyecto addons donde vive el ejecutable ./lkf. Default: /Users/pacogod/lkf/addons",
    )
    parser.add_argument(
        "--continue-on-error", action="store_true",
        help="Seguir con las cuentas restantes aunque una falle (por default se detiene, como el && manual).",
    )
    args = parser.parse_args()

    lkf_path = Path(args.lkf_path)
    lkf_executable = lkf_path / "lkf"
    if not lkf_executable.exists():
        sys.exit(f"No encuentro el ejecutable ./lkf en {lkf_path}. Ajusta --lkf-path.")

    if args.ids:
        targets = [(f"id:{i.strip()}", i.strip()) for i in args.ids.split(",") if i.strip()]
    else:
        account_keys = [a.strip() for a in args.accounts.split(",") if a.strip()]
        targets = resolve_ids_from_accounts(account_keys, Path(args.accounts_file), Path(args.template_file))

    print(f"Cuentas a actualizar en produccion ({len(targets)}): "
          f"{', '.join(f'{label}->{aid}' for label, aid in targets)}")
    print()

    results = []
    for label, account_id in targets:
        print(f"--- {label} (account_id {account_id}) ---")
        ok = run_update(lkf_path, account_id)
        results.append((label, account_id, ok))
        print()
        if not ok and not args.continue_on_error:
            print(f"Se detuvo aqui por error en {label} (account_id {account_id}). "
                  f"No se corrieron las cuentas restantes.")
            break

    print("=== Resumen ===")
    processed_labels = {label for label, _, _ in results}
    for label, account_id in targets:
        if label not in processed_labels:
            print(f"\u23f8\ufe0f  {label:20s} (id {account_id}) - NO EJECUTADO (se detuvo antes de llegar aqui)")
    for label, account_id, ok in results:
        icon = "\u2705" if ok else "\u274c"
        status = "OK" if ok else "ERROR"
        print(f"{icon} {label:20s} (id {account_id}) - {status}")

    if any(not ok for _, _, ok in results):
        sys.exit(1)


if __name__ == "__main__":
    main()
