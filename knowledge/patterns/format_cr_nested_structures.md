# format_cr() reetiqueta y aplana estructuras anidadas sin ids_label_dct

> Por qué un campo embebido (catálogo, sub-dict) sale con el nombre de OTRO
> módulo, o por qué `answers` de un sub-registro sale `null` al leerlo de
> vuelta — sin ningún error visible.

## El problema

`format_cr()` usa `_labels()` para traducir field-IDs a nombres legibles.
Si no le pasas `ids_label_dct` explícito, `_labels()` cae al default:

```python
if not ids_label_dct:
    ids_label_dct = self.f   # el dict de la CUENTA completa, no el de esta estructura
```

Esto tiene dos efectos peligrosos sobre datos con estructuras anidadas
(catálogos embebidos, sub-dicts que no se proyectaron campo por campo antes
de llegar a `format_cr`):

1. **Reetiqueta con el módulo equivocado**: un field-ID embebido dentro de un
   catálogo puede tener un alias distinto en `self.f` de la cuenta completa
   (porque ese mismo ID lo usa otro módulo con otro nombre). El resultado
   sale con el nombre de ESE otro módulo, no el real.
2. **Aplana y descarta la llave wrapper**: si la estructura anidada es, por
   ejemplo, `{"answers": {...}}`, `_labels()` puede aplanar hacia el nivel
   superior y perder la llave `answers` por completo — el campo sale `null`.

## Cómo se manifiesta

- Un valor de catálogo embebido (ubicación, área, etc.) sale con un nombre
  que no tiene sentido para ese contexto (ej. `"incidente_location"` en vez
  de la ubicación real, porque el módulo de Incidencias registra ese mismo
  ID bajo ese alias).
- Un sub-registro leído de vuelta trae `answers: null` en vez del dict de
  respuestas real — sin excepción, sin log.

## El fix

No pases datos crudos con estructuras anidadas por `format_cr()` sin
proyectar antes. Dos alternativas:

```python
# MAL — deja que format_cr use el self.f global sobre un doc con anidados
data = self.format_cr(self.cr.aggregate(pipeline))

# BIEN — trae el documento crudo cuando necesitas la estructura anidada intacta
data = list(self.cr.aggregate(pipeline))

# BIEN — o pásale explícitamente el mapa de campos correcto para ESA estructura
data = self._labels(raw_data, ids_label_dct=fields_de_esta_estructura)
```

Si además necesitas las conversiones que `format_cr` hace gratis
(`_id` ObjectId→str, `created_at` datetime→str), replícalas a mano en la
rama que evita `format_cr`.

## Casos reales encontrados (transportistas, cuenta 10)

- `get_formas_inspeccion`: guardaba el arreglo `filas` crudo (catálogo
  embebido sin proyectar) y lo pasaba por `format_cr()` — reetiquetaba los
  field-IDs anidados con lo que significan en CUALQUIER OTRO módulo de la
  cuenta. Fix: `list(self.cr.aggregate(query))` directo.
- `get_inspeccion_record`: al leer un sub-registro con forma custom,
  `answers` salía `null` — `_labels()` aplanaba y perdía esa llave. Fix:
  mismo patrón, con `self._labels()` explícito solo en la rama que sí tiene
  el mapa de campos correcto.

## Ver también
- `patterns/self_f_label_collision.md` — otra forma en que el reverse-map
  de `self.f`/`self.mf` compartido causa datos silenciosamente incorrectos.
