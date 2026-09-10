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

## Cuando puede haber más de un registro "vigente" para la misma llave lógica

Un doble-submit o condición de carrera al guardar puede dejar 2+ registros
para lo que debería ser único por llave lógica (ej. un registro de
configuración por usuario). Si eso puede pasar, **toda** función que lea
"el" registro de esa llave debe resolver el empate de la misma forma —
si una función usa `find_one` sin `$sort` (orden natural de Mongo, en la
práctica casi siempre el más antiguo) y otra sí ordena, cada una puede
devolver un registro distinto para el mismo usuario/llave, con
comportamiento inconsistente entre pantallas sin que parezca un bug obvio.

```python
# MAL — sin $sort, get_one=True regresa el primero en orden natural
# (impredecible cuál, típicamente el más antiguo — no necesariamente el vigente)
resultado = self.cr.find_one({'form_id': self.MI_FORM, 'usuario_id': uid})

# BIEN — decide explícitamente el criterio de "cuál gana" y aplícalo
# en TODAS las funciones que leen por esa llave
pipeline = [
    {'$match': {'form_id': self.MI_FORM, 'usuario_id': uid, 'deleted_at': {'$exists': False}}},
    {'$sort': {'_id': -1}},   # más reciente gana (ObjectId codifica timestamp)
    {'$limit': 1},
]
resultado = next(iter(self.cr.aggregate(pipeline)), None)
```

No borres los registros duplicados viejos como parte del fix mismo — una
vez que todas las funciones relevantes ordenan igual, quedan inofensivos
(nunca se seleccionan). Decidir si limpiarlos es una acción aparte,
deliberada, no un efecto colateral del fix de lectura.

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
