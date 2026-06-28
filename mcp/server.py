from fastmcp import FastMCP
from pathlib import Path
import json
import os
import re

KNOWLEDGE_DIR = Path(os.environ.get("KNOWLEDGE_DIR", Path(__file__).parent.parent / "knowledge"))

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


@mcp.tool()
def lkf_search(query: str) -> str:
    """Busca en toda la base de conocimiento del LinkaForm SDK.

    Args:
        query: Término a buscar (ej: 'aggregate', 'patch', 'catalogo', 'self.f')
    """
    results = []
    for file in sorted(KNOWLEDGE_DIR.rglob("*.md")):
        content = file.read_text(encoding="utf-8")
        if query.lower() in content.lower():
            results.append({
                "name": file.stem,
                "category": file.parent.name,
                "path": str(file.relative_to(KNOWLEDGE_DIR)),
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
    for file in KNOWLEDGE_DIR.rglob("*.md"):
        if file.stem == name or file.stem == name.replace("-", "_"):
            return file.read_text(encoding="utf-8")
    available = [f.stem for f in KNOWLEDGE_DIR.rglob("*.md")]
    return f"'{name}' no encontrado. Disponibles: {', '.join(sorted(available))}"


@mcp.tool()
def lkf_list(category: str = "") -> str:
    """Lista las entradas de conocimiento disponibles.

    Args:
        category: Filtrar por categoría: patterns, modules, conventions, examples.
                  Vacío = listar todo.
    """
    base = KNOWLEDGE_DIR / category if category else KNOWLEDGE_DIR
    if not base.exists():
        cats = [d.name for d in KNOWLEDGE_DIR.iterdir() if d.is_dir()]
        return f"Categoría '{category}' no existe. Disponibles: {', '.join(cats)}"
    entries: dict[str, list[str]] = {}
    for file in sorted(base.rglob("*.md")):
        cat = file.parent.name
        entries.setdefault(cat, []).append(file.stem)
    return json.dumps(entries, ensure_ascii=False, indent=2)


@mcp.tool()
def lkf_add(name: str, category: str, content: str, description: str = "") -> str:
    """Agrega un nuevo patrón, convención o ejemplo a la base de conocimiento.

    Args:
        name: Nombre corto en snake_case (ej: 'patch_multi_record')
        category: Una de: patterns, modules, conventions, examples
        content: Contenido en Markdown con código de ejemplo
        description: Descripción en una línea de lo que cubre
    """
    valid = ["patterns", "modules", "conventions", "examples"]
    if category not in valid:
        return f"Categoría inválida '{category}'. Debe ser una de: {', '.join(valid)}"

    safe_name = re.sub(r"[^a-z0-9_]", "_", name.lower().replace("-", "_"))
    category_dir = KNOWLEDGE_DIR / category
    category_dir.mkdir(parents=True, exist_ok=True)
    file = category_dir / f"{safe_name}.md"

    header = f"# {name.replace('_', ' ').title()}\n\n"
    if description:
        header += f"> {description}\n\n"

    file.write_text(header + content, encoding="utf-8")
    return f"Guardado: knowledge/{category}/{safe_name}.md — haz commit para compartirlo con el equipo."


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
