---
name: lkf-module
description: Scaffolding de un módulo nuevo del LinkaForm SDK con la estructura correcta (model.py + app.py, solo Base, self.load para otros módulos). Usar cuando el usuario pida crear/scaffoldear un módulo nuevo de linkaform_sdk / lkf_addons desde cero. Si el módulo se arma a partir de las formas, catálogos y scripts de una cuenta existente, delegar en el agente clave10-nuevo-modulo.
---

Crea un nuevo módulo de LinkaForm SDK con la estructura correcta.

**Nombre del módulo**: $ARGUMENTS

## ¿Desde cero o desde una cuenta?

- **Desde cero** (formas y catálogos por definir): sigue esta skill.
- **Desde una cuenta existente** (hay formas, catálogos o scripts que bajar con
  `lkfaddons download`, o scripts sueltos que modularizar): usa el agente
  `clave10-nuevo-modulo`. No armes el módulo a mano.

## Pasos

1. Consulta `lkf_get("new_module_checklist")` para el checklist completo
2. Consulta `lkf_get("new_module_template")` para ver el ejemplo completo
3. Consulta `lkf_get("naming")` y `lkf_get("inheritance")` para las convenciones

Verifica que el nombre no exista ya en `lkf_addons/addons/` ni en `modules/`.

Luego crea, copiando `lkf_addons/addons/_template/` como base:
- `lkf_addons/addons/<nombre>/__init__.py` con `depends = ['base']`
- `lkf_addons/addons/<nombre>/model.py` con `<Nombre>Model(Base)`: hereda **solo** de `Base`
- `lkf_addons/addons/<nombre>/app.py` con `<Nombre>(<Nombre>Model)`: hereda **solo** de `model.py`
- `lkf_addons/addons/<nombre>/report.py`
- `lkf_addons/addons/<nombre>/items/forms/__init__.py`
- `lkf_addons/addons/<nombre>/items/catalogs/__init__.py`
- `lkf_addons/addons/<nombre>/items/reports/__init__.py`
- `lkf_addons/addons/<nombre>/items/scripts/__init__.py`

Los `items/<tipo>/__init__.py` de la plantilla traen el import del `*Resource` y `install_order = []`.
Si un item referencia a otro del mismo tipo (`{{ catalog.X.id }}`, `{{ form.X.id }}`), la dependencia se
lista en `install_order` antes de quien la usa (`install_order = ['fabricantes_sync']`). El instalador
instala scripts, luego catálogos, luego formas. Ver `new_module_checklist` → "Orden de instalación".

Los scripts que corren en la plataforma no van ahí: van en
`modules/<nombre>/items/scripts/<Carpeta>/`, con un `<nombre>_utils.py`. Créalos solo si
ya hay scripts.

## Reglas

- Para usar otro módulo no se hereda: `self.load(module='Employee', **self.kwargs)` en
  `app.py` deja el objeto en `self.Employee`. Cárgalo solo si la lógica lo usa, y agrégalo
  a `depends`.
- IDs de forms, catálogos (los 3 atributos) y campos (`self.f.update({...})`) van en
  `model.py`. La lógica va en `app.py`.

En `model.py` deja comentarios `# TODO` donde se necesiten los ObjectIds reales.

Al terminar, verifica el import dentro del contenedor
(`docker exec lkf-addons python -c "from lkf_addons.addons.<nombre>.app import <Nombre>"`)
y muestra el checklist de `new_module_checklist` marcando lo que completaste.
