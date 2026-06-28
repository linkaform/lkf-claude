# MongoDB Aggregate

> Patrón estándar para consultar registros en form_answer usando self.cr

## Patrón base

```python
match_query = {
    'form_id': self.MI_FORM,
    'deleted_at': {'$exists': False},       # siempre — soft delete
    f'answers.{self.f["campo"]}': 'valor',  # filtro por campo
}
pipeline = [
    {'$match': match_query},
    {'$limit': 100},
    {'$project': self._project_format({
        'campo':      self.f['campo'],
        'otro_campo': self.f['otro_campo'],
    })},
]
resultados = self.format_cr(self.cr.aggregate(pipeline))
```

## Con sort y lookup

```python
pipeline = [
    {'$match': match_query},
    {'$sort': {f'answers.{self.f["fecha"]}': -1}},
    {'$lookup': {
        'from': 'form_answer',
        'let': {'folio': f'$answers.{self.f["folio"]}'},
        'pipeline': [
            {'$match': {'$expr': {'$eq': ['$$folio', f'$answers.{self.f_otro["folio"]}']}}},
        ],
        'as': 'relacionados',
    }},
    {'$limit': 50},
]
```

## Reglas
- **SIEMPRE** incluir `'deleted_at': {'$exists': False}` en el `$match`
- Usar `self._project_format({...})` para proyectar — maneja el formato de field paths
- Usar `self.format_cr(cursor)` para convertir el cursor a lista de dicts legibles
- Los field paths en `$match` son `f'answers.{self.f["campo"]}'` (con f-string)
