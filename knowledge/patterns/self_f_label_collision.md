# Colisión de reverse-label en self.f / self.mf compartido

> Por qué un campo que existía correctamente en legacy sale vacío o con el
> nombre equivocado en `lkf-sanic-apps`, sin que el código que lo lee tenga
> ningún error visible.

## El problema

`format_cr()` (en `linkaform_api/lkf_base/base.py`) usa `_labels()` para convertir
los field-IDs crudos de MongoDB en nombres legibles. `_labels()` construye un
mapa **inverso** a partir de `self.f` (o de `ids_label_dct` si se pasa explícito):

```python
_f = {v: k for k, v in ids_label_dct.items()}  # id -> nombre
```

Si **dos llaves distintas de `self.f` apuntan al mismo field-ID**, la última
insertada en el dict gana el mapeo inverso — las anteriores simplemente
desaparecen del resultado.

En **legacy**, cada script CLI tenía su propio `self.f` aislado (una instancia
nueva por invocación), así que dos alias para el mismo ID nunca colisionaban:
cada script solo veía el suyo. En **`lkf-sanic-apps`**, `self.f` es un dict
**compartido** por todos los métodos de la cuenta (el `service` es un
singleton), y el archivo de override específico de cuenta
(`app/modules/<modulo>/items/scripts/<Modulo>/<modulo>_service.py`, que se
carga con prioridad y hace su propio `self.f.update({...})` DESPUÉS de
`models.py`) puede introducir un alias para un ID que otro método legacy ya
usaba con un nombre distinto — y ese override gana silenciosamente.

## Cómo se manifiesta

Un campo que en legacy siempre traía datos reales sale como `''`, `None`, o
directamente **falta la llave** en el dict resultante — sin ningún error o
excepción, porque `dict.get('llave_perdedora', default)` simplemente no
encuentra nada.

## Cómo diagnosticarlo

1. Buscar el ID real del campo (grep el valor hardcodeado en `models.py`).
2. Grep ese mismo ID en TODO `models.py` + el override de cuenta —
   si aparece más de una vez con nombres de llave distintos, es una colisión.
3. **El orden de inserción determina quién gana** — el override de cuenta se
   carga después de `models.py` base, así que normalmente gana su alias.
4. Si el análisis estático no es concluyente, confirmar con un `print` temporal
   de `list(item.keys())` sobre el registro crudo antes de re-formatearlo
   (ver `patterns/env_comparison_testing.md`), en vez de asumir.

## El fix: lectura defensiva, no forzar un solo nombre

No se puede "arreglar" reordenando los `self.f.update()` sin verificar que no
rompe OTRO método que dependía del orden anterior (es compartido). El fix
seguro es leer **ambos alias posibles** en el punto de consumo:

```python
# MAL — asume que 'rondin_area' sobrevivió el reverse map
nombre = item.get('rondin_area', '')

# BIEN — lee cualquiera de los dos alias conocidos que mapean al mismo ID
nombre = item.get('rondin_area') or item.get('incidente_area') or ''
```

Si el campo es un **array crudo que se regresa tal cual en la respuesta**
(pasa por `format_cr` pero no se reconstruye en un dict nuevo), no basta con
leerlo defensivamente para uso interno — hay que **normalizarlo en el objeto
mismo** antes de regresarlo, o el alias perdedor sigue faltando en el JSON
final que ve el cliente:

```python
for item in data.get('areas', []):
    if 'incidente_area' in item:
        item.setdefault('rondin_area', item.pop('incidente_area'))
```

## Casos reales encontrados (accesos, cuenta 10)

| ID | Alias en `models.py` | Alias que gana (override de cuenta) |
|---|---|---|
| `663e5d44f5b8a7ce8211ed0f` | `rondin_area`, `area` | `incidente_area` |
| `6762f7b0922cc2a2f57d4044` | `tag_id_area_ubicacion` | `area_tag_id` |
| `663973809fa65cafa759eb97` | `incidencia` | `tipo_de_incidencia` |
| `681145323d9b5fa2e16e35cc` | `incidente_accion` | `incidente_comentario` |
| `663fb45992f2c5afcfe97ca8` | `nombre_area_salida` (self.mf) | `area` (self.pase_entrada_fields) |

## Ver también
- `conventions/inheritance.md` — otra fuente de colisiones por composición vs herencia.
- `patterns/env_comparison_testing.md` — cómo se confirman estos casos con datos reales.
