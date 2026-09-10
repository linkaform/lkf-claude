# QR de vistas preview públicas codifica la URL completa, no el ID

> Por qué un escáner de QR que asume "el código trae el id/folio en texto
> plano" falla contra QRs reales de Clave10 generados para una vista
> preview pública.

## El problema

En los flujos de Clave10 que exponen una vista pública sin login por QR
(ej. preview de un pase para que un transportista/visitante externo lo vea
sin autenticarse), el QR **no codifica el id/folio en texto plano** — el
componente que genera el QR/link a compartir arma la URL completa de esa
vista pública y esa es la cadena que el QR codifica:

```
https://.../<modulo>/preview/<tipo>/{id}?p_id={accountId}
```

Un escáner que asuma texto plano (y lo use directo como `record_id` de
búsqueda) falla — el "id" que recibe en realidad es una URL entera.

## El fix: extraer el id tolerando ambos formatos

El helper de búsqueda debe aceptar tanto una URL completa (extraer el
último segmento del pathname) como el texto plano tal cual (paste manual
de un id/folio corto) — porque el mismo input box suele recibir ambos:
escaneo de cámara (URL) y tecleo/paste manual (a veces solo el folio).

```ts
function extraerIdDePase(texto: string): string {
  try {
    const url = new URL(texto);
    const segmentos = url.pathname.split('/').filter(Boolean);
    return segmentos[segmentos.length - 1] || texto;
  } catch {
    return texto;   // no era una URL válida — úsalo tal cual
  }
}
```

Aplica tanto al escaneo con cámara como a pegar/teclear la URL a mano en el
mismo buscador — un solo punto de normalización antes de llamar al backend
de búsqueda.

## No asumas el formato sin verificarlo contra el componente real que genera el QR

Este bug se coló porque la primera implementación se basó en un supuesto
razonable pero incorrecto (texto plano). Antes de integrar un escáner
nuevo contra un QR ya existente en la plataforma, localiza el componente
que arma el `file_url`/valor del QR (ej. `*-success-modal.tsx`, donde se
construye el link que se comparte) y confirma ahí qué cadena exacta se
está codificando — no lo infieras del nombre del feature.

## Ver también
- Cualquier vista `preview` pública alcanzable sin login por QR/link debe
  mantenerse de solo lectura/complementar — nunca agregar ahí una acción
  que requiera autenticación real (dar acceso, confirmar llegada, etc.);
  esa acción vive en la pantalla autenticada equivalente, no en la pública.
