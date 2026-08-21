#!/usr/bin/env python3
"""
bootstrap_accounts.py

Genera o refresca tu accounts.json PERSONAL (~/.config/clave10/accounts.json)
a partir de dos fuentes:

  1. references/accounts.template.json -- registro VERSIONADO (vive en el repo,
     sin secretos) de que cuentas son Clave10 de verdad. Esta es la UNICA lista
     de la que este script puede tomar cuentas. local_settings.py mezcla
     Clave10 con cuentas de otros productos (Servido, pruebas, etc.) que no
     deben tocarse con estas skills -- por eso nunca se usa como fuente de
     "que cuentas existen", solo como fuente de credenciales.
  2. config/local_settings.py -- tiene tus credenciales reales (comentadas o
     activas). Para cada cuenta del template, si tu local_settings.py trae su
     apikey (y opcionalmente openrouter/couch), se copia a tu accounts.json.
     Si no la tienes, el apikey se deja vacio -- simplemente significa que
     todavia no tienes acceso a esa cuenta, no es un error.

Dar de alta una cuenta Clave10 NUEVA (que aun no esta en accounts.template.json)
es un cambio deliberado al archivo versionado (un commit normal, con alguien
confirmando que esa cuenta si tiene el modulo Clave10) -- este script nunca lo
hace por su cuenta ni con un flag.

Uso:
  # Genera/actualiza tu accounts.json con lo que tengas en tu local_settings.py
  python3 bootstrap_accounts.py

  # Ver que escribiria sin tocar nada
  python3 bootstrap_accounts.py --dry-run

  # Rutas distintas (otra maquina, otro checkout)
  python3 bootstrap_accounts.py \
    --local-settings-path /ruta/a/addons/config/local_settings.py \
    --template-file /ruta/a/accounts.template.json \
    --accounts-file /ruta/a/accounts.json
"""

import argparse
import json
import os
import re
import sys
from pathlib import Path
from urllib.parse import unquote

FIELD_RE = re.compile(r"['\"]?(\w+)['\"]?\s*:\s*'([^']*)'")
SECRET_FIELDS = ("apikey", "openrouter_api_key", "couch_password")


def mask(secret: str) -> str:
    if not secret or len(secret) < 8:
        return "(vacio)" if not secret else "****"
    return f"{secret[:4]}...{secret[-4:]}"


def extract_config_update_blocks(source: str) -> list:
    blocks = []
    i = 0
    marker = "config.update("
    while True:
        start = source.find(marker, i)
        if start == -1:
            break
        open_paren = start + len(marker) - 1
        depth = 0
        j = open_paren
        while j < len(source):
            if source[j] == "(":
                depth += 1
            elif source[j] == ")":
                depth -= 1
                if depth == 0:
                    break
            j += 1
        blocks.append(source[open_paren:j + 1])
        i = j + 1
    return blocks


def parse_credential_candidates(block: str) -> tuple:
    """local_settings.py trae bloques duplicados para algunas cuentas (p.ej.
    una version vieja incompleta y otra mas nueva). Se hace merge campo por
    campo en vez de que el ultimo bloque pise al anterior. Si dos bloques
    traen el MISMO campo con valores distintos, se reporta como conflicto en
    vez de resolverlo en silencio."""
    candidates = {}
    conflicts = []
    for paragraph in re.split(r"\n\s*\n", block):
        fields = dict(FIELD_RE.findall(paragraph))
        if not fields.get("USERNAME") or not fields.get("ACCOUNT_ID"):
            continue
        acct_id = fields["ACCOUNT_ID"]
        new_fields = {
            "username": fields["USERNAME"],
            "apikey": fields.get("APIKEY", ""),
        }
        if fields.get("OPENROUTER_API_KEY"):
            new_fields["openrouter_api_key"] = fields["OPENROUTER_API_KEY"]

        existing = candidates.get(acct_id)
        if existing is None:
            candidates[acct_id] = new_fields
            continue
        for key, value in new_fields.items():
            if not value:
                continue
            if existing.get(key) and existing[key] != value:
                conflicts.append((fields["USERNAME"], acct_id, key))
            else:
                existing[key] = value
    return candidates, conflicts


def parse_couch_pairs(block: str) -> dict:
    """Devuelve {username_decodificado_lower: (couch_user_literal, couch_password)}.

    couch_user se guarda tal cual aparece en local_settings.py (p.ej. con %40 sin
    decodificar) porque asi lo espera el TEMPLATE de sync_accounts.py al reescribirlo;
    solo se decodifica una copia interna para poder cruzarlo contra el username.
    """
    by_username = {}
    for paragraph in re.split(r"\n\s*\n", block):
        fields = dict(FIELD_RE.findall(paragraph))
        user = fields.get("COUCH_USER")
        password = fields.get("COUCH_PASSWORD")
        if not user:
            continue
        by_username[unquote(user).lower()] = (user, password or "")
    return by_username


def load_local_settings_candidates(path: Path) -> tuple:
    if not path.exists():
        sys.exit(
            f"No encuentro {path}. Si tu local_settings.py vive en otro lado, "
            f"pasa --local-settings-path."
        )
    source = path.read_text(encoding="utf-8")
    blocks = extract_config_update_blocks(source)
    if not blocks:
        sys.exit(f"No encontre ningun bloque config.update({{...}}) en {path}.")

    candidates, conflicts = parse_credential_candidates(blocks[0])
    couch_by_username = parse_couch_pairs(blocks[1]) if len(blocks) > 1 else {}

    for acct in candidates.values():
        pair = couch_by_username.get(acct["username"].lower())
        if pair is not None:
            acct["couch_user"], acct["couch_password"] = pair

    return candidates, conflicts


def find_local_settings_path() -> Path:
    """Busca config/local_settings.py sin asumir el usuario/maquina de nadie en
    particular. Orden: variable de entorno explicita, luego la convencion mas
    comun de checkout (~/lkf/addons/...). Si no aparece en ninguna, se le pide
    a quien esta corriendo esto que pase --local-settings-path a mano -- nunca
    se asume un default especifico de una persona."""
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


def load_json(path: Path, required: bool) -> dict:
    if not path.exists():
        if required:
            sys.exit(f"No encuentro {path}.")
        return {}
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    data.pop("_comment", None)
    return data


def save_accounts(accounts_file: Path, accounts: dict) -> None:
    accounts_file.parent.mkdir(parents=True, exist_ok=True)
    with open(accounts_file, "w", encoding="utf-8") as f:
        json.dump(accounts, f, indent=2, ensure_ascii=False)
        f.write("\n")
    accounts_file.chmod(0o600)


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument(
        "--local-settings-path",
        default=None,
        help="Ruta a TU config/local_settings.py. Sin este flag se busca sola (variable de "
             "entorno CLAVE10_LOCAL_SETTINGS_PATH, luego ~/lkf/addons/config/local_settings.py); "
             "si no la encuentra, pide que la pases explicita -- nunca asume la ruta de nadie.",
    )
    parser.add_argument(
        "--template-file",
        default=str(Path(__file__).resolve().parent.parent / "references" / "accounts.template.json"),
        help="Registro versionado de cuentas Clave10 conocidas (username + account_id, sin secretos). "
             "Default: references/accounts.template.json de esta skill.",
    )
    parser.add_argument(
        "--accounts-file",
        default=str(Path.home() / ".config/clave10/accounts.json"),
        help="Tu accounts.json personal (con secretos, fuera de git). Default: ~/.config/clave10/accounts.json",
    )
    parser.add_argument(
        "--dry-run", action="store_true",
        help="Muestra que se escribiria sin tocar accounts.json.",
    )
    args = parser.parse_args()

    template = load_json(Path(args.template_file), required=True)
    if not template:
        sys.exit(f"{args.template_file} no tiene ninguna cuenta registrada.")

    local_settings_path = Path(args.local_settings_path) if args.local_settings_path else find_local_settings_path()
    candidates, conflicts = load_local_settings_candidates(local_settings_path)
    accounts = load_json(Path(args.accounts_file), required=False)

    if conflicts:
        conflicting_ids = {acct_id for _, acct_id, _ in conflicts}
        print(f"AVISO: {local_settings_path} tiene bloques duplicados con datos "
              f"distintos para el mismo campo -- se ignoraron para esas cuentas (revisa a mano):")
        for username, acct_id, field in conflicts:
            print(f"  - {username} (id {acct_id}): '{field}' tiene valores distintos en dos bloques.")
        print()
    else:
        conflicting_ids = set()

    filled, unchanged, skipped = [], [], []

    for key, template_acct in template.items():
        acct_id = template_acct["account_id"]
        result = {
            "username": template_acct["username"],
            "account_id": acct_id,
            "apikey": "",
        }

        if acct_id in conflicting_ids:
            skipped.append(key)
        else:
            found = candidates.get(acct_id)
            if found:
                result["apikey"] = found.get("apikey", "")
                if found.get("openrouter_api_key"):
                    result["openrouter_api_key"] = found["openrouter_api_key"]
                if found.get("couch_user"):
                    result["couch_user"] = found["couch_user"]
                    result["couch_password"] = found.get("couch_password", "")

        previous = accounts.get(key)
        if previous == result:
            unchanged.append(key)
        elif result["apikey"]:
            filled.append(key)

        accounts[key] = result

    still_empty = sum(1 for k in template if not accounts[k]["apikey"])
    print(f"Cuentas del template ({len(template)}): "
          f"{len(filled)} rellenadas desde tu local_settings.py, "
          f"{len(unchanged)} sin cambios, "
          f"{still_empty} sin apikey todavia"
          f"{f', {len(skipped)} omitidas por conflicto' if skipped else ''}.")
    print()

    for key in sorted(template):
        acct = accounts[key]
        status = (
            "conflicto en local_settings.py, omitida" if key in skipped else
            f"apikey {mask(acct['apikey'])}" if acct["apikey"] else
            "sin apikey en tu local_settings.py (la dejas vacia)"
        )
        print(f"  - {key:20s} (id {acct['account_id']:8s}) {status}")

    if args.dry_run:
        print(f"\n[dry-run] no se escribio {args.accounts_file}.")
        return

    save_accounts(Path(args.accounts_file), accounts)
    print(f"\n{args.accounts_file} actualizado.")


if __name__ == "__main__":
    main()
