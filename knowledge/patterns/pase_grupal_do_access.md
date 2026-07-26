# Pase Grupal Do Access

> Cómo extender una función de validación pesada (`do_access`) para dar acceso a un grupo de pases juntos, sin repetir validaciones que no varían por pase.

## El problema

`Accesos.do_access(qr_code, location, area, data)` (accesos/app.py) valida en
cascada un solo pase (estatus, día permitido, límite de entradas, fecha de
caducidad, tolerancia de horario, ubicación, si ya está dentro) antes de
llamar a `_do_access` (crea el registro de entrada). Para un **pase grupal**
(un pase padre con `acompanantes_grupo`, cada acompañante con su propio pase
hijo vía `url_hijo`/`url_padre`, ver `create_multiple_pass_threads` en el
mismo archivo), dar acceso a los N pases del grupo llamando `do_access` N
veces por separado repetiría validaciones que son **compartidas** (todos los
hijos son copia del padre en fecha/ubicación/estatus/config) y sería lento
(N llamadas secuenciales a la API).

## El patrón aplicado

1. **Validar una sola vez** contra el pase escaneado (el que dispara la
   llamada) — es el representativo del grupo.
2. **Extraer a un helper** la única validación que SÍ varía por pase
   individual (el límite de entradas, porque el conteo es propio de cada
   `qr_code` aunque el `limite_de_acceso` configurado sea el mismo):

```python
def _pase_alcanzo_limite_entradas(self, total_entradas, limite_acceso):
    if len(total_entradas) > 0 and limite_acceso and int(limite_acceso) > 0:
        return total_entradas['total_records'] >= int(limite_acceso)
    return False
```

3. **Nuevo parámetro opcional** (`data['selected_passes']`, lista de
   qr_codes de acompañantes) sin romper compatibilidad — si no viene, el
   comportamiento es idéntico al de siempre:

```python
selected_passes = data.get('selected_passes', [])
if selected_passes:
    return self._do_access_grupo(access_pass, qr_code, location, area, data, selected_passes)
res = self._do_access(access_pass, location, area, data)
return res
```

4. **Un acompañante que falla su propia validación se omite, no aborta el
   grupo** — se reporta como error individual y el resto sigue:

```python
resultados.append({'qr_code': companion_qr, 'status': 'error', 'msg': '...'})
continue   # no se agrega a la lista de pases a procesar
```

5. **Threads para el batch final** — mismo patrón `ThreadPoolExecutor` +
   `as_completed` que ya usa `create_multiple_pass_threads` en este archivo
   (es el único lugar del SDK con threading manual real, no es un patrón
   nuevo):

```python
with ThreadPoolExecutor(max_workers=10) as executor:
    futures = {executor.submit(self._do_access, pase, location, area, data): qr for qr, pase in pases_a_procesar}
    for future in as_completed(futures):
        qr = futures[future]
        try:
            resultados.append({'qr_code': qr, 'status': 'success', 'response': future.result()})
        except Exception as e:
            resultados.append({'qr_code': qr, 'status': 'error', 'msg': str(e)})
```

6. **Respuesta agregada** `{'accesos': [{'qr_code', 'status', 'response'|'msg'}, ...]}`
   cuando hay grupo, respuesta original (dict de `_do_access`) cuando no —
   el front distingue por la forma de la respuesta, no por un flag extra.

## Por qué importa

Es la forma correcta de agregar "hacer esto para un batch" a una función de
validación ya compleja sin: (a) duplicar la cascada de validaciones N
veces, (b) arriesgar que un fallo de un miembro tumbe a todo el grupo, (c)
romper a los llamadores existentes que no mandan el parámetro nuevo.

## Ver también
- `conventions/anti_patterns.md` — mismo espíritu de no repetir trabajo por miembro cuando es compartido.
- El propio `create_multiple_pass_threads` (accesos/app.py) — pase padre/hijo, `url_hijo`/`url_padre`, y de dónde sale el patrón de threading reusado aquí.
