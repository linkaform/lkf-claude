#!/usr/bin/env python3
"""
lkf_workspace.py

Resuelve donde vive cada repo del ecosistema LinkaForm en la maquina de quien
esta corriendo el plugin, para que ninguna skill tenga que hardcodear rutas
como ~/lkf/addons o /Users/pacogod/lkf/addons.

Orden de resolucion, por repo:
  1. Variable de entorno propia del repo (LKF_ADDONS, LKF_API, ...).
  2. ~/.config/lkf/workspace.json -> repos.<clave> (absoluta, o relativa a root).
  3. La raiz del workspace (LKF_WORKSPACE, o workspace.json -> root) mas el
     nombre de directorio convencional del repo.
  4. Autodeteccion: se prueban los directorios convencionales colgando del cwd
     y sus ancestros, y de las raices comunes (~/lkf, ~/linkaform-app, ~).
  5. Si nada funciona, se sale con un mensaje que dice que se probo y como
     arreglarlo.

Cada candidato se valida contra un marcador (un archivo o directorio que solo
existe en ese repo), para no devolver un homonimo vacio: ~/lkf tiene addons,
addons_v1, addons_126 y addons_back colgando del mismo nivel.

Uso desde el script de una skill:

    import sys
    from pathlib import Path
    sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "lib"))
    from lkf_workspace import workspace

    ws = workspace()
    addons = ws.path("addons")                        # sale con guia si falta
    settings = ws.file("addons", "config/local_settings.py")
    front = ws.path("front", required=False)          # None si no esta

Uso como CLI, para diagnosticar:

    python3 lkf_workspace.py            # tabla de lo que resolvio y de donde
    python3 lkf_workspace.py --json
    python3 lkf_workspace.py --init     # escribe ~/.config/lkf/workspace.json
"""

import json
import os
import sys
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class RepoSpec:
    key: str
    dirname: str      # nombre convencional del directorio
    marker: str       # archivo o dir que confirma que es ese repo y no un homonimo
    what: str         # descripcion corta, sale en los mensajes de error


REPOS = {
    spec.key: spec
    for spec in (
        RepoSpec("addons", "addons", "lkf_addons",
                 "addons/apps del SDK (formas, catalogos, scripts, reportes)"),
        RepoSpec("api", "linkaform_api", "setup.py",
                 "libreria base linkaform_api"),
        RepoSpec("sanic", "lkf-sanic-apps", "app",
                 "evolucion de addons sobre python-sanic"),
        RepoSpec("front", "clave10", "next.config.ts",
                 "front end de Clave 10 (Next.js)"),
        RepoSpec("backend", "infosync-api", "lkf_settings.py",
                 "backend BaaS de LinkaForm"),
    )
}

# Raices donde se busca cuando no hay configuracion explicita.
COMMON_ROOTS = ("~/lkf", "~/linkaform-app", "~")


def config_path() -> Path:
    base = os.environ.get("XDG_CONFIG_HOME")
    return (Path(base) if base else Path.home() / ".config") / "lkf" / "workspace.json"


def _env_var(key: str) -> str:
    return "LKF_" + key.upper()


def _looks_like(path: Path, spec: RepoSpec) -> bool:
    return path.is_dir() and (path / spec.marker).exists()


class Workspace:
    """Resuelve rutas de repos. Cachea cada resolucion."""

    def __init__(self, config: dict, config_file: Path):
        self.config = config or {}
        self.config_file = config_file
        self._cache = {}

    # -- raiz declarada (opcional) -----------------------------------------

    @property
    def root(self):
        env = os.environ.get("LKF_WORKSPACE")
        if env:
            return Path(env).expanduser()
        declared = self.config.get("root")
        if declared:
            return Path(declared).expanduser()
        return None

    # -- resolucion ---------------------------------------------------------

    def _candidates(self, spec: RepoSpec):
        """Devuelve [(Path, de_donde_salio, es_explicito)] por prioridad.

        Un candidato explicito es uno que alguien escribio a proposito para
        este repo. Si no valida, se falla ahi mismo en vez de seguir buscando:
        caerse a autodeteccion cuando te dijeron una ruta exacta significa
        trabajar en silencio sobre un checkout distinto al que pidieron."""
        out = []

        env = os.environ.get(_env_var(spec.key))
        if env:
            out.append((Path(env).expanduser(), _env_var(spec.key), True))

        declared = (self.config.get("repos") or {}).get(spec.key)
        if declared:
            p = Path(declared).expanduser()
            if not p.is_absolute() and self.root:
                p = self.root / p
            out.append((p, f"{self.config_file} -> repos.{spec.key}", True))

        if self.root:
            src = "LKF_WORKSPACE" if os.environ.get("LKF_WORKSPACE") else str(self.config_file)
            out.append((self.root / spec.dirname, src + " (root)", False))

        # Autodeteccion: el cwd y sus ancestros, luego las raices comunes.
        seen = set()
        roots = list(Path.cwd().resolve().parents)
        roots.insert(0, Path.cwd().resolve())
        roots += [Path(r).expanduser() for r in COMMON_ROOTS]
        for base in roots:
            cand = base / spec.dirname
            if cand in seen:
                continue
            seen.add(cand)
            out.append((cand, "autodeteccion", False))

        return out

    def resolve(self, key: str):
        """Devuelve (Path|None, de_donde_salio, candidatos_probados)."""
        if key in self._cache:
            return self._cache[key]
        if key not in REPOS:
            raise KeyError(f"Repo desconocido '{key}'. Conocidos: {', '.join(sorted(REPOS))}")

        spec = REPOS[key]
        tried = []
        found = (None, None, tried)
        for cand, source, explicit in self._candidates(spec):
            tried.append((cand, source))
            if _looks_like(cand, spec):
                found = (cand, source, tried)
                break
            if explicit:
                sys.exit(self._bad_explicit_message(spec, cand, source))
        self._cache[key] = found
        return found

    def _bad_explicit_message(self, spec: RepoSpec, cand: Path, source: str) -> str:
        if not cand.exists():
            problem = "esa ruta no existe"
        elif not cand.is_dir():
            problem = "esa ruta no es un directorio"
        else:
            problem = f"no tiene '{spec.marker}' adentro, asi que no es el repo '{spec.key}'"
        return (
            f"{source} apunta a:\n  {cand}\n"
            f"...pero {problem}.\n\n"
            f"'{spec.key}' es {spec.what} y se valida buscando '{spec.marker}'.\n"
            f"Corrige esa ruta o quitala para volver a la autodeteccion."
        )

    # -- API para las skills ------------------------------------------------

    def path(self, key: str, required: bool = True):
        found, _source, tried = self.resolve(key)
        if found or not required:
            return found
        sys.exit(self._not_found_message(key, tried))

    def file(self, key: str, relpath: str, required: bool = True):
        base = self.path(key, required=required)
        if base is None:
            return None
        target = base / relpath
        if not target.exists():
            if not required:
                return None
            sys.exit(
                f"Encontre el repo '{key}' en {base}, pero no existe {relpath} adentro.\n"
                f"Ruta buscada: {target}"
            )
        return target

    def _not_found_message(self, key: str, tried) -> str:
        spec = REPOS[key]
        # Solo se listan los candidatos unicos, que si no son 20 lineas de ruido.
        lines, seen = [], set()
        for cand, source in tried:
            if cand in seen:
                continue
            seen.add(cand)
            lines.append(f"  {cand}  ({source})")
        return (
            f"No encontre el repo '{key}' -- {spec.what}.\n"
            f"Se valida buscando '{spec.marker}' adentro. Probe:\n"
            + "\n".join(lines)
            + "\n\nArreglalo de cualquiera de estas formas:\n"
            f"  export {_env_var(key)}=/ruta/a/{spec.dirname}\n"
            f"  export LKF_WORKSPACE=/ruta/donde/estan/todos/los/repos\n"
            f"  python3 {Path(__file__).resolve()} --init\n"
            f"     (autodetecta y escribe {self.config_file})"
        )


def load_config(path: Path = None) -> tuple:
    path = path or config_path()
    if not path.exists():
        return {}, path
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f), path
    except (json.JSONDecodeError, OSError) as exc:
        sys.exit(f"No pude leer {path}: {exc}")


_WS = None


def workspace(reload: bool = False) -> Workspace:
    """Workspace compartido del proceso. Cachea salvo reload=True."""
    global _WS
    if _WS is None or reload:
        config, path = load_config()
        _WS = Workspace(config, path)
    return _WS


# -- CLI de diagnostico ------------------------------------------------------


def _report(ws: Workspace) -> list:
    rows = []
    for key in REPOS:
        found, source, _ = ws.resolve(key)
        rows.append({
            "repo": key,
            "path": str(found) if found else None,
            "source": source,
            "what": REPOS[key].what,
        })
    return rows


def _cmd_init(ws: Workspace) -> int:
    rows = _report(ws)
    found = {r["repo"]: r["path"] for r in rows if r["path"]}
    if not found:
        print("No autodetecte ningun repo. Exporta LKF_WORKSPACE y vuelve a correr.",
              file=sys.stderr)
        return 1

    # Si todos cuelgan del mismo padre, se guarda como root y rutas relativas.
    parents = {str(Path(p).parent) for p in found.values()}
    config = {}
    if len(parents) == 1:
        config["root"] = parents.pop()
        config["repos"] = {k: Path(v).name for k, v in found.items()}
    else:
        common = max(parents, key=lambda p: sum(1 for v in found.values()
                                                if str(Path(v).parent) == p))
        config["root"] = common
        config["repos"] = {
            k: (Path(v).name if str(Path(v).parent) == common else v)
            for k, v in found.items()
        }

    dest = ws.config_file
    if dest.exists():
        print(f"Ya existe {dest}. No lo sobreescribo. Contenido propuesto:\n")
        print(json.dumps(config, ensure_ascii=False, indent=2))
        return 0

    dest.parent.mkdir(parents=True, exist_ok=True)
    with open(dest, "w", encoding="utf-8") as f:
        json.dump(config, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"Escrito {dest}:\n")
    print(json.dumps(config, ensure_ascii=False, indent=2))
    missing = [k for k in REPOS if k not in found]
    if missing:
        print(f"\nSin detectar: {', '.join(missing)}. Agregalos a mano en 'repos' "
              f"si los necesitas.")
    return 0


def main(argv) -> int:
    ws = workspace()
    if "--init" in argv:
        return _cmd_init(ws)

    rows = _report(ws)
    if "--json" in argv:
        print(json.dumps({"config_file": str(ws.config_file),
                          "root": str(ws.root) if ws.root else None,
                          "repos": rows}, ensure_ascii=False, indent=2))
        return 0

    print(f"config: {ws.config_file}" + ("" if ws.config_file.exists() else "  (no existe)"))
    print(f"root:   {ws.root or '(sin declarar, todo por autodeteccion)'}\n")
    width = max(len(r["repo"]) for r in rows)
    missing = 0
    for r in rows:
        if r["path"]:
            print(f"  {r['repo']:<{width}}  {r['path']}   [{r['source']}]")
        else:
            missing += 1
            print(f"  {r['repo']:<{width}}  NO ENCONTRADO   ({r['what']})")
    if missing:
        print(f"\n{missing} sin resolver. Corre --init, o exporta LKF_WORKSPACE.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
