from fastmcp import FastMCP
from pathlib import Path
import json
import os
import re

# La base de conocimiento tiene dos niveles.
#
#   bundled — el knowledge/ que viaja con el plugin. Es el conocimiento curado
#             del equipo y se versiona en git. Al instalar desde el marketplace
#             queda en una ruta con la versión (…/lkf-claude/1.1.0/knowledge),
#             o sea que se reemplaza entero en cada update: escribir ahí pierde
#             lo que se guarde.
#   local   — el knowledge/ de quien está usando el plugin. Sobrevive a las
#             actualizaciones y es donde lkf_add guarda por default.
#
# En las lecturas se mezclan los dos, y ante un nombre repetido gana local:
# tu versión de un patrón le gana a la que trae el release.

BUNDLED_DIR = Path(os.environ.get("KNOWLEDGE_DIR", Path(__file__).parent.parent / "knowledge"))


def _local_dir() -> Path:
    override = os.environ.get("LKF_KNOWLEDGE_DIR")
    if override:
        return Path(override).expanduser()
    base = os.environ.get("XDG_CONFIG_HOME")
    return (Path(base) if base else Path.home() / ".config") / "lkf" / "knowledge"


LOCAL_DIR = _local_dir()

# El bundled solo se puede editar cuando el plugin corre desde su checkout de
# git; en una copia instalada no tiene caso ofrecerlo.
BUNDLED_IS_CHECKOUT = (BUNDLED_DIR.parent / ".git").exists()

VALID_CATEGORIES = ["patterns", "modules", "conventions", "examples", "schemas"]

mcp = FastMCP(
    "lkf-knowledge",
    instructions=(
        "Base de conocimiento del LinkaForm SDK. Úsala para buscar patrones, "
        "convenciones y ejemplos antes de escribir código para módulos de LinkaForm."
    ),
)


def _excerpt(content: str, query: str, window: int = 300) -> str:
    idx = content.lower().find(query.lower())
    if idx == -1:
        return content[:window]
    start = max(0, idx - 80)
    end = min(len(content), idx + window)
    return content[start:end].strip()


def _entries():
    """Todos los .md de los dos niveles, con local ganando ante nombre repetido.

    Devuelve [(nivel, Path, categoría, nombre)] ordenado por categoría/nombre."""
    by_name = {}
    # El bundled va primero para que el local lo pise al escribirse encima.
    for tier, root in (("bundled", BUNDLED_DIR), ("local", LOCAL_DIR)):
        if not root.exists():
            continue
        for file in root.rglob("*.md"):
            by_name[file.stem] = (tier, file, file.parent.name, file.stem)
    return sorted(by_name.values(), key=lambda e: (e[2], e[3]))


@mcp.tool()
def lkf_search(query: str) -> str:
    """Busca en toda la base de conocimiento del LinkaForm SDK.

    Args:
        query: Término a buscar (ej: 'aggregate', 'patch', 'catalogo', 'self.f')
    """
    results = []
    for tier, file, category, stem in _entries():
        content = file.read_text(encoding="utf-8")
        if query.lower() in content.lower():
            results.append({
                "name": stem,
                "category": category,
                "tier": tier,
                "path": str(file),
                "excerpt": _excerpt(content, query),
            })
    if not results:
        return f"Sin resultados para '{query}'. Prueba lkf_list() para ver qué existe."
    return json.dumps(results, ensure_ascii=False, indent=2)


@mcp.tool()
def lkf_get(name: str) -> str:
    """Obtiene el contenido completo de un patrón, convención o ejemplo por nombre.

    Args:
        name: Nombre del archivo sin extensión (ej: 'mongodb_aggregate', 'anti_patterns')
    """
    wanted = {name, name.replace("-", "_")}
    entries = _entries()
    for tier, file, _category, stem in entries:
        if stem in wanted:
            note = "" if tier == "bundled" else f"<!-- knowledge local: {file} -->\n\n"
            return note + file.read_text(encoding="utf-8")
    available = sorted(e[3] for e in entries)
    return f"'{name}' no encontrado. Disponibles: {', '.join(available)}"


@mcp.tool()
def lkf_list(category: str = "") -> str:
    """Lista las entradas de conocimiento disponibles.

    Args:
        category: Filtrar por categoría: patterns, modules, conventions, examples.
                  Vacío = listar todo.
    """
    all_entries = _entries()
    cats = sorted({e[2] for e in all_entries})
    if category and category not in cats:
        return f"Categoría '{category}' no existe. Disponibles: {', '.join(cats)}"

    entries: dict[str, list[str]] = {}
    for tier, _file, cat, stem in all_entries:
        if category and cat != category:
            continue
        # Se marca lo que solo existe en tu copia, para distinguirlo de lo que
        # ya está curado en el repo del equipo.
        entries.setdefault(cat, []).append(stem if tier == "bundled" else f"{stem} (local)")
    return json.dumps({
        "entries": entries,
        "bundled_dir": str(BUNDLED_DIR),
        "local_dir": str(LOCAL_DIR) + ("" if LOCAL_DIR.exists() else " (aún sin usar)"),
    }, ensure_ascii=False, indent=2)


@mcp.tool()
def lkf_add(name: str, category: str, content: str, description: str = "",
            shared: bool = False) -> str:
    """Agrega un nuevo patrón, convención o ejemplo a la base de conocimiento.

    Args:
        name: Nombre corto en snake_case (ej: 'patch_multi_record')
        category: Una de: patterns, modules, conventions, examples, schemas
        content: Contenido en Markdown con código de ejemplo
        description: Descripción en una línea de lo que cubre
        shared: False (default) guarda en tu knowledge local, que sobrevive a
                las actualizaciones del plugin. True lo escribe en el knowledge
                del repo para commitearlo y compartirlo con el equipo; solo
                funciona si el plugin corre desde su checkout de git.
    """
    if category not in VALID_CATEGORIES:
        return f"Categoría inválida '{category}'. Debe ser una de: {', '.join(VALID_CATEGORIES)}"

    if shared and not BUNDLED_IS_CHECKOUT:
        return (
            f"No puedo guardar como compartido: el plugin está corriendo desde una copia "
            f"instalada ({BUNDLED_DIR}), no desde un checkout de git. Lo que escriba ahí se "
            f"pierde en el próximo update.\n\n"
            f"Vuelve a llamar sin shared=True para guardarlo en tu knowledge local, y si lo "
            f"quieres compartir, cópialo después al repo lkf-claude y mándalo en un PR."
        )

    root = BUNDLED_DIR if shared else LOCAL_DIR
    safe_name = re.sub(r"[^a-z0-9_]", "_", name.lower().replace("-", "_"))
    category_dir = root / category
    category_dir.mkdir(parents=True, exist_ok=True)
    file = category_dir / f"{safe_name}.md"
    existed = file.exists()

    header = f"# {name.replace('_', ' ').title()}\n\n"
    if description:
        header += f"> {description}\n\n"

    file.write_text(header + content, encoding="utf-8")

    verb = "Actualizado" if existed else "Guardado"
    if shared:
        return f"{verb} en el repo: {file}\nHaz commit para compartirlo con el equipo."

    tail = ""
    # Se consulta el bundle directo: _entries() ya viene deduplicado con local
    # ganando, asi que despues de escribir nunca reportaria la colision.
    shadowed = BUNDLED_DIR.exists() and any(
        f.stem == safe_name for f in BUNDLED_DIR.rglob("*.md")
    )
    if shadowed:
        tail = ("\nOjo: tapa a la entrada del mismo nombre que trae el plugin. "
                "Tu versión es la que van a devolver lkf_get y lkf_search.")
    if BUNDLED_IS_CHECKOUT:
        tail += ("\nComo estás en el checkout del plugin, puedes repetir con shared=True "
                 "para dejarlo en el repo y commitearlo.")
    else:
        tail += ("\nSobrevive a las actualizaciones del plugin. Para compartirlo con el "
                 "equipo, cópialo al repo lkf-claude y mándalo en un PR.")
    return f"{verb} en tu knowledge local: {file}{tail}"


@mcp.tool()
def lkf_validate(code: str) -> str:
    """Verifica código del LinkaForm SDK contra anti-patrones y convenciones.

    Args:
        code: Código Python a revisar
    """
    issues = []

    hardcoded = re.findall(r"['\"]([0-9a-f]{24})['\"]", code)
    if hardcoded:
        issues.append(
            f"HARD_IDS: {len(hardcoded)} ObjectId(s) hardcodeado(s). "
            "Usa self.f['campo'] o self.mf['campo'] en su lugar."
        )

    if re.search(r"from linkaform_api(\.base)? import LKF_Base", code):
        issues.append(
            "IMPORT: No importar LKF_Base directamente. "
            "Usa: from lkf_addons.addons.base.app import Base"
        )

    for match in re.finditer(r"self\.cr\.find\((\{[^)]*)\)", code):
        if "deleted_at" not in match.group(1):
            issues.append(
                "SOFT_DELETE: self.cr.find() sin filtro deleted_at incluye registros borrados. "
                "Agrega 'deleted_at': {'$exists': False}"
            )

    if re.search(r"return\s*\{[^}]*(error|msg|message)[^}]*\}", code):
        issues.append(
            "EXCEPTIONS: No retornes dicts de error. "
            "Usa self.LKFException({'msg': '...', 'status_code': 400})"
        )

    if not re.search(r"super\(\)\.__init__", code) and "class " in code and "(Base)" in code:
        issues.append(
            "SUPER: Clase hereda de Base pero no llama super().__init__(). "
            "El primer statement del __init__ debe ser super().__init__(...)"
        )

    if not issues:
        return "Sin problemas. El código sigue las convenciones del LinkaForm SDK."
    return "Problemas encontrados:\n" + "\n".join(f"  - {i}" for i in issues)


if __name__ == "__main__":
    mcp.run()
