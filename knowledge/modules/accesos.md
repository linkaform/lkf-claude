# Accesos

> Reglas de negocio del módulo Accesos que no son obvias leyendo el código
> de una sola función — importan para cualquier reporte/query nuevo sobre
> bitácoras y pases.

## `status_pase` vence por FECHA (cron), no por checkout

`do_out()` (checkout de un visitante) **no** toca `status_pase` del pase de
entrada asociado — solo actualiza el registro de bitácora
(`tipo_registro='salida'`, `fecha_salida`, área de salida).
`status_pase` pasa de `activo` a `vencido` por el cron
`deactivate_passes.py` (`modules/accesos/items/scripts/Accesos/
deactivate_passes.py`), que vence pases cuya `fecha_desde_hasta` ya pasó —
**sin importar si el visitante hizo o no checkout**. Los pases
normalmente tienen vigencia de un solo día.

### Por qué importa

Cualquier query que filtre bitácoras exigiendo
`answers.<PASE_ENTRADA_OBJ_ID>.status_pase == "Activo"` para calcular algo
sobre un rango de fechas **pasadas** subcuenta casi todo — para "ayer" el
pase asociado ya está `vencido` aunque el registro de bitácora (con su
salida) sea perfectamente válido.

```python
# MAL para reportes históricos — excluye visitas de días pasados cuyo
# pase ya venció, aunque el checkin/checkout haya sido normal
match_query = {
    'form_id': self.BITACORA_FORM,
    f'answers.{self.PASE_OBJ_ID}.{self.f["status_pase"]}': 'Activo',
    ...
}

# BIEN — el filtro status_pase=="Activo" solo tiene sentido para la vista
# "en vivo" (personas actualmente dentro, sin fecha explícita). En cuanto
# hay un rango de fechas explícito, quítalo — igual que get_list_bitacora,
# que nunca filtra por status_pase y por eso siempre coincide con lo que
# ve el usuario en LinkaForm.
match_query = {
    'form_id': self.BITACORA_FORM,
    f'answers.{self.f["fecha_entrada"]}': {'$gte': desde, '$lte': hasta},
}
```

Detectado en un reporte de stats: al filtrar por "Ayer",
`salidas_registradas` daba 47 contra 61 reales en LinkaForm — 14 registros
excluidos por pases ya vencidos.

## Filtros de fecha explícitos deben leer `fecha_entrada`, no `fecha_salida`

Segunda capa del mismo tipo de bug: incluso después de quitar el filtro de
`status_pase`, un conteo de "salidas registradas" en un rango de fechas
puede seguir descuadrado si filtra por `fecha_salida` cayendo en el rango
— si alguien entró "ayer" pero su checkout quedó registrado ya entrada la
medianoche ("hoy"), su `fecha_salida` no cae en "ayer" y se excluye,
aunque LinkaForm y el resto de la app (incl. `get_list_bitacora`) filtran
bitácoras por `fecha_entrada`, no por `fecha_salida`.

**Regla**: cuando hay un filtro de fecha explícito, "Entrada"/"Salida" se
leen del campo `status_visita` **sobre el conjunto ya acotado por
`fecha_entrada`** — no re-filtres por una fecha distinta (`fecha_salida`)
que puede caer fuera del rango aunque el registro sí pertenezca a ese
rango. Filtrar por `fecha_salida` (ventana `salida_floor`/`salida_ceiling`)
solo tiene sentido en la vista "Todos" (en vivo, sin fecha explícita),
donde no hay otro filtro de fecha con el que deba ser consistente.

## Ver también
- `patterns/deploy_app_py_vs_scripts_sync.md` — fixes en este tipo de query
  (viven en `accesos/app.py`) necesitan rebuild+update de prod, no solo
  sync de scripts.
