# New Module Checklist

> Checklist para crear un módulo nuevo en el SDK de LinkaForm

Si el módulo se arma a partir de una cuenta de cliente (formas, catálogos y scripts que ya
existen en la plataforma), usa el agente `clave10-nuevo-modulo`: aplica este checklist y
además baja los items y modulariza los scripts.

## Dos capas, dos carpetas

Un módulo vive en dos lugares del repo `addons`:

- **Base del módulo** → `lkf_addons/addons/<modulo>/`. Es el paquete Python y los items
  que definen el módulo: formas y catálogos.
- **Personalización** → `modules/<modulo>/items/scripts/`. Son los scripts que corren en
  la plataforma y su `<x>_utils.py`. En `modules` no van formas ni catálogos.

```
lkf_addons/addons/mi_modulo/
  __init__.py              ← depends = ['base', ...] (módulos que cargues y módulos cuyos catálogos/formas usen los XML)
  model.py                 ← MiModuloModel(Base): IDs de forms, catálogos y campos
  app.py                   ← MiModulo(MiModuloModel): lógica de negocio
  report.py
  items/
    forms/<Carpeta>/       ← XML de formas con sus _rules y _workflow
    catalogs/<Carpeta>/    ← XML de catálogos
    reports/__init__.py
    scripts/__init__.py

modules/mi_modulo/items/scripts/<Carpeta>/
  mi_modulo_utils.py       ← class MiModulo(MiModulo) importada de app.py
  <script>.py              ← arranque corto que llama a un método de la clase
```

`<Carpeta>` es la carpeta que el item tiene en la cuenta (por ejemplo `Servicios`).

## Reglas

- `model.py` hereda **solo** de `Base`. `app.py` hereda **solo** de `model.py`.
- Para usar otro módulo no se hereda: `self.load(module='Employee', **self.kwargs)` deja el
  objeto en `self.Employee`. Ver `conventions/inheritance.md`.
- No cargues un módulo que la lógica no use. `Oracle`, por ejemplo, abre una conexión al
  instanciarse.
- Los scripts no definen funciones propias ni arman `base.LKF_Base`: crean el objeto del
  módulo y llaman a un método de `app.py`.
- **Nunca IDs fijos en `app.py`.** Los IDs de formas y catálogos se registran en `model.py`
  por nombre (`self.INFORME_SERVICIO = self.lkm.form_id('informe_de_servicio','id')`,
  catálogos con los 3 atributos) y los métodos usan el atributo. Un `"form_id": 119972` o
  un `search_catalog(124722, ...)` solo funciona en una cuenta. Al portar un script,
  busca los números de 5 a 7 dígitos y conviértelos.
- **Nunca `field_id` crudos en `app.py`.** Van en `self.f['campo']`, definidos en `model.py`, con **una sola llave por ID** (dos llaves al mismo ID rompen el mapa inverso de `format_cr`; ver `patterns/self_f_label_collision.md`) y sin repetir llaves de `Base`. Excepción: la llave de un campo que selecciona un catálogo es el `obj_id` del catálogo, que es de cada cuenta: usa `self.<CAT>_OBJ_ID` (`self.CLIENTES_CAT_OBJ_ID`), no `self.f`. Si no sabes si un ID es un `field_id` o un `obj_id`, compáralo con `couch_id` en `catalogs_catalog` (BD `infosync_local`).
- `lkm` resuelve por módulos instalados en la cuenta (`LKFModules`). Si el módulo aún no
  está instalado, `form_id` devuelve `{}` y las consultas salen vacías sin error.

## Checklist de implementación

- [ ] Verificar que el nombre no exista en `lkf_addons/addons/` ni en `modules/`
- [ ] Copiar `_template/` como base: `cp -r lkf_addons/addons/_template/ lkf_addons/addons/mi_modulo/`
- [ ] `__init__.py` con `depends = ['base', ...]`. Incluye los módulos que cargues con `self.load` **y** los dueños de los catálogos y formas que los XML referencian (`{{ catalog.X.id }}`, `{{ form.X.id }}`). El instalador resuelve un solo nivel: lista también las transitivas (si dependes de `employee`, que depende de `location`, pon ambos)
- [ ] En `model.py`:
  - [ ] Clase `MiModuloModel(Base)`, la única herencia es `Base`
  - [ ] Llamar `super().__init__()` como primer statement del `__init__`
  - [ ] Setear `self.name = __class__.__name__` y `self.settings = settings`
  - [ ] Registrar forms con `self.lkm.form_id()`
  - [ ] Registrar catálogos con `self.lkm.catalog_id()` (3 vars cada uno)
  - [ ] Mapear todos los campos en `self.f.update({...})`
- [ ] En `app.py`:
  - [ ] `from .model import MiModuloModel`
  - [ ] Clase `MiModulo(MiModuloModel)`, la única herencia es `model.py`
  - [ ] `self.load(...)` solo para los módulos que la lógica use
- [ ] Crear `modules/mi_modulo/items/scripts/<Carpeta>/mi_modulo_utils.py`
- [ ] Agregar `__init__.py` en cada subcarpeta de `items/` (los de la plantilla traen el import del `*Resource` y `install_order = []`)
- [ ] Revisar las referencias entre items del módulo y llenar `install_order` en `items/catalogs/__init__.py` y `items/forms/__init__.py` (ver "Orden de instalación")
- [ ] Bajar las formas y catálogos con `lkfaddons download` y dejarlos en
      `lkf_addons/addons/mi_modulo/items/` (no en `modules`)
- [ ] Verificar el import dentro del contenedor:
      `docker exec lkf-addons python -c "from lkf_addons.addons.mi_modulo.app import MiModulo"`
- [ ] Sin restos de placeholders (`ModuleName`, `module_name`, `Name_Your_Object`)
- [ ] Agregar el módulo a `CLAUDE.md` → tabla de módulos disponibles

## Descarga de items (`lkfaddons download`)

```bash
docker exec -u 1000 lkf-addons sh -c \
  "cd /srv/scripts/addons/modules && lkfaddons.py download -m mi_modulo -i forms -id <ID>"
```

- Un ID por llamada, con `-i forms`, `-i catalogs` o `-i scripts`.
- El compose fija `user: "1000:1000"` en `lkf-addons`, así que no hace falta `-u`. Si el
  contenedor corre como uid 33 (`docker exec lkf-addons id`) falla con `PermissionError` al
  crear `items/<tipo>/_downloads`: recréalo con `docker compose up -d --no-deps lkf-addons`
  o usa `docker exec -u 1000`. `download_module.py` reporta ahora ese error con un mensaje
  claro (antes salía un `TypeError: exceptions must derive from BaseException` que lo tapaba).
- `lkfaddons.py` y `download_module.py` se montan como archivos sueltos. Si los editas y el
  editor reemplaza el archivo, el contenedor sigue con la copia vieja (`md5sum` distinto):
  reinicia el contenedor para que vuelva a enlazarlos.
- Los archivos caen en `modules/mi_modulo/items/<tipo>/_downloads/` (ignorado por git).
  Hay que moverlos a su carpeta final.
- Los IDs se buscan por nombre en la BD local:
  `select id,itype,name from items_item where deleted_at is null and owner_id=<ACCOUNT_ID>`
  en la base `infosync_local` del contenedor `psql`.
- `-i scripts` baja el `.py` de un bucket público de Backblaze. Si da `HTTP Error 404`,
  el archivo no está ahí: se pide al usuario o, con su permiso explícito, se baja de
  producción. `-e prod` por sí solo no cambia el entorno: lo define `LKF_ENV` o
  `secrets/current_env`.

## Orden de instalación (`install_order`)

El instalador (`lkfaddons install`) instala por tipo de item en este orden: **scripts, luego
catálogos, luego formas**. Así, cuando llegan las formas, las plantillas `{{ script.X.id }}`
y `{{ catalog.X.id }}` ya se pueden resolver. Dentro de un mismo tipo el orden lo define
`install_order` en `items/<tipo>/__init__.py`:

- Lo que listas se instala **primero y en ese orden**; lo que no listas se instala después,
  en el orden en que el instalador encuentre los archivos (no está garantizado).
- Lista solo lo que **otros items del mismo tipo referencian**, con las dependencias antes
  que quien las usa. No hace falta listar todo.
- Un item que referencia a otro de su mismo tipo con `{{ catalog.X.id }}`, `{{ form.X.id }}`
  o `{{ script.X.id }}` **depende** de él. Ejemplo (`servicio_maquinaria_pesada`):
  `modelos_sync` referencia a `fabricantes_sync`, así que

  ```python
  # items/catalogs/__init__.py
  from lkf_addons.items.catalog_resource import CatalogResource

  install_order = ['fabricantes_sync']
  ```

- Las referencias a items de **otros módulos** no van aquí: esas se cubren con `depends` en
  el `__init__.py` del paquete.
- El nombre es el del archivo XML sin extensión. En formas, las dependencias van por el
  nombre de la forma, no por sus `_rules` ni `_workflow`.

Cómo detectarlo: recorre los XML del módulo (también los `_rules` y `_workflow` de cada
forma) con `\{\{\s*(catalog|form|script)\.([a-z_0-9]+)\.`, descarta las referencias a sí
mismo y a otros módulos, y arma el grafo. Cada arista del mismo tipo es una dependencia.

## Template de model.py

```python
from lkf_addons.addons.base.app import Base


class MiModuloModel(Base):

    def __init__(self, settings, folio_solicitud=None, sys_argv=None, use_api=False, **kwargs):
        super().__init__(settings, sys_argv=sys_argv, use_api=use_api, **kwargs)
        self.name = __class__.__name__
        self.settings = settings

        # Forms
        self.MI_FORM = self.lkm.form_id('nombre_del_form', 'id')

        # Catálogos (siempre los 3 atributos)
        self.MI_CAT        = self.lkm.catalog_id('nombre_catalogo')
        self.MI_CAT_ID     = self.MI_CAT.get('id')
        self.MI_CAT_OBJ_ID = self.MI_CAT.get('obj_id')

        # Campos
        self.f.update({
            'campo_uno': 'OBJECTID_24_CHARS_AQUI',
            'campo_dos': 'OBJECTID_24_CHARS_AQUI',
        })
```

## Template de app.py

```python
from .model import MiModuloModel


class MiModulo(MiModuloModel):

    def __init__(self, settings, folio_solicitud=None, sys_argv=None, use_api=False, **kwargs):
        super().__init__(settings, sys_argv=sys_argv, use_api=use_api, **kwargs)
        # Dependencias laterales: solo las que la lógica use
        # self.load(module='Employee', **self.kwargs)    # → self.Employee

    def mi_metodo(self):
        ...
```

## Template de mi_modulo_utils.py y de un script

```python
# modules/mi_modulo/items/scripts/<Carpeta>/mi_modulo_utils.py
from lkf_addons.addons.mi_modulo.app import MiModulo


class MiModulo(MiModulo):

    def __init__(self, settings, sys_argv=None, use_api=False, **kwargs):
        super().__init__(settings, sys_argv=sys_argv, use_api=use_api, **kwargs)
```

```python
# modules/mi_modulo/items/scripts/<Carpeta>/mi_script.py
import sys, simplejson
from linkaform_api import settings
from account_settings import *

from mi_modulo_utils import MiModulo

if __name__ == '__main__':
    lkf_obj = MiModulo(settings, sys_argv=sys.argv)   # conserva el use_api que el script ya tenía
    lkf_obj.mi_metodo()
```

Al modularizar un script que ya existe: `lkf`, `lkf_obj` y `script_obj` pasan a `self`;
`current_record`, `lkf_api`, `cr` y `answers` pasan a `self.current_record`,
`self.lkf_api`, `self.cr` y `self.answers`; las constantes de campos pasan a `self.f`.
`LKF_Base` no tiene atributo `lkf`: es `self.current_record`, no `self.lkf.current_record`.
Si dos scripts definen una función con el mismo nombre, o una pisa un método de `Base`,
hay que renombrar antes de moverlas a la misma clase.
