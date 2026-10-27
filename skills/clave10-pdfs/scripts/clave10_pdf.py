"""
Clave 10 · Sistema de diseño para PDFs (reportes y bitácoras).

Uso mínimo:
    from clave10_pdf import Clave10PDF
    doc = Clave10PDF("salida.pdf", titulo="Bitácora de fallas", folio="9553-10")
    doc.kpis([...]); doc.seccion("Información de la falla"); doc.campos([...])
    doc.save()

Todo en puntos (1 pt = 1/72 in). Página carta por defecto.
El footer (slogan + paginación "Página X de Y") se dibuja solo al guardar.
"""
import os
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas as rl_canvas
from reportlab.lib.colors import Color, white
from reportlab.lib.utils import simpleSplit, ImageReader

HERE = os.path.dirname(os.path.abspath(__file__))
LOGO = os.path.join(HERE, "..", "assets", "logo_clave10.png")

# ───────────── Tokens ─────────────
def _c(h):
    h = h.lstrip("#"); return Color(int(h[0:2], 16)/255, int(h[2:4], 16)/255, int(h[4:6], 16)/255)

C = {
    "tinta":        _c("#1D2433"),  # texto principal, títulos, línea del header
    "marino":       _c("#1F3A6E"),  # color de marca: folio, valores destacados, barras de seguimiento
    "gris":         _c("#8B95A7"),  # etiquetas, texto secundario, paginación
    "gris_head":    _c("#5B6577"),  # encabezados de tabla
    "borde":        _c("#D9DEE6"),  # bordes de cajas y tablas
    "fondo_tabla":  _c("#F1F3F6"),  # fondo de encabezados de tabla
    "fondo_dest":   _c("#EEF4FD"),  # fondo de la tarjeta KPI destacada
    "borde_dest":   _c("#A9C3EA"),  # borde de la tarjeta KPI destacada
    "blanco":       white,
}
F, FB = "Helvetica", "Helvetica-Bold"
SLOGAN = "Operación segura."

MARGEN = 34.016          # 12 mm a cada lado
FOOTER_RESERVA = 60      # espacio libre abajo para el footer
GAP = 8                  # separación entre tarjetas / bloques
SEP_SECCION = 14         # espacio antes de un título de sección
LW = 0.75                # grosor de bordes


def draw_footer(c, page_num, total, W, H, margen=MARGEN):
    """Footer estándar. En formatos angostos (<300 pt, p. ej. pases) solo slogan centrado."""
    if W < 300:
        c.setFillColor(C["marino"]); c.setFont(FB, 6)
        c.drawCentredString(W / 2, 8, SLOGAN)
        return
    L, R = margen, W - margen
    c.setStrokeColor(C["borde"]); c.setLineWidth(LW); c.line(L, 46, R, 46)
    c.setFillColor(C["marino"]); c.setFont(FB, 9); c.drawString(L, 30, SLOGAN)
    c.setFillColor(C["gris"]); c.setFont(F, 8)
    c.drawRightString(R, 30, f"Página {page_num} de {total}")


class _NumberedCanvas(rl_canvas.Canvas):
    """Guarda las páginas y al final dibuja el footer con el total correcto."""
    def __init__(self, *a, **k):
        super().__init__(*a, **k); self._saved = []
    def showPage(self):
        self._saved.append(dict(self.__dict__)); self._startPage()
    def save(self):
        n = len(self._saved)
        W, H = self._pagesize
        for i, st in enumerate(self._saved, 1):
            self.__dict__.update(st)
            draw_footer(self, i, n, W, H)
            super().showPage()
        super().save()


class Clave10PDF:
    def __init__(self, path, titulo, folio, version=None, pagesize=letter):
        self.W, self.H = pagesize
        self.L, self.R = MARGEN, self.W - MARGEN
        self.CW = self.R - self.L
        self.c = _NumberedCanvas(path, pagesize=pagesize)
        self.c.setTitle(f"{titulo} {folio}")
        self.titulo, self.folio, self.version = titulo, folio, version
        self._header()

    # ── utilidades ──
    def _top(self, y): return self.H - y          # convierte "desde arriba" a coords PDF
    def _need(self, h):
        if self.y + h > self.H - FOOTER_RESERVA:
            self.c.showPage(); self.y = 40
    def _box(self, x, y, w, h, fill=None, stroke=None):
        c = self.c; c.setLineWidth(LW)
        if fill: c.setFillColor(fill)
        if stroke: c.setStrokeColor(stroke)
        c.rect(x, self._top(y + h), w, h, stroke=1 if stroke else 0, fill=1 if fill else 0)
    def _text(self, x, y, s, font=F, size=7.5, color="tinta", align="l"):
        c = self.c; c.setFont(font, size); c.setFillColor(C[color])
        yy = self._top(y + size * 0.8)
        {"l": c.drawString, "r": c.drawRightString, "c": c.drawCentredString}[align](x, yy, str(s))
    def _wrap(self, s, w, font=F, size=7.5):
        out = []
        for para in str(s).split("\n"):
            out += simpleSplit(para, font, size, w) or [""]
        return out

    # ── header ──
    def _header(self):
        c = self.c
        if os.path.exists(LOGO):
            c.drawImage(ImageReader(LOGO), self.L, self._top(69.2), 73.7, 28.35, mask="auto")
        self._text(self.W / 2, 46.6, self.titulo, FB, 16, "tinta", "c")
        self._text(self.R, 37.5, "FOLIO", F, 6, "gris", "r")
        self._text(self.R, 48.8, self.folio, F, 11, "marino", "r")
        if self.version:
            self._text(self.R, 62, f"VERSIÓN {self.version}", F, 5.5, "gris", "r")
        c.setStrokeColor(C["tinta"]); c.setLineWidth(1)
        c.line(self.L, self._top(73.4), self.R, self._top(73.4))
        self.y = 80.5

    # ── tarjetas KPI (fila de 4) ──
    def kpis(self, items):
        """items: [{'label','value','sub', 'destacado':bool}] · normalmente 4; el primero destacado."""
        n = len(items); w = (self.CW - GAP * (n - 1)) / n
        hv = max(len(self._wrap(i["value"], w - 14, FB, 13)) for i in items)
        h = 40 + 15 * hv
        for k, it in enumerate(items):
            x = self.L + k * (w + GAP); d = it.get("destacado", k == 0)
            self._box(x, self.y, w, h, C["fondo_dest"] if d else None, C["borde_dest"] if d else C["borde"])
            self._text(x + 7, self.y + 7, it["label"].upper(), FB if d else F, 5.5, "tinta" if d else "gris")
            for j, ln in enumerate(self._wrap(it["value"], w - 14, FB, 13)):
                self._text(x + 7, self.y + 20 + 15 * j, ln, FB, 13, "marino" if d else "tinta")
            if it.get("sub"):
                self._text(x + 7, self.y + h - 13, it["sub"], F, 5, "gris")
        self.y += h + 6

    # ── título de sección ──
    def seccion(self, titulo):
        self._need(SEP_SECCION + 50)
        self.y += 6
        self._text(self.L, self.y, titulo, FB, 9.5); self.y += 17

    # ── rejilla de campos etiqueta/valor ──
    def campos(self, filas, cols=4):
        """filas: lista de filas; cada fila lista de (ETIQUETA, valor[, span]). span = columnas que ocupa."""
        colw = self.CW / cols
        alturas = []
        for fila in filas:
            mx = 1
            for f in fila:
                span = f[2] if len(f) > 2 else 1
                mx = max(mx, len(self._wrap(f[1] or "—", colw * span - 14)))
            alturas.append(16 + 10.5 * mx + 6)
        total = sum(alturas); self._need(total)
        self._box(self.L, self.y, self.CW, total, stroke=C["borde"])
        y = self.y
        for fila, h in zip(filas, alturas):
            x = self.L
            for f in fila:
                span = f[2] if len(f) > 2 else 1
                self._text(x + 7, y + 7, f[0].upper(), F, 5.5, "gris")
                for j, ln in enumerate(self._wrap(f[1] or "—", colw * span - 14)):
                    self._text(x + 7, y + 16 + 10.5 * j, ln, F, 7.5)
                x += colw * span
            y += h
            if y < self.y + total - 1:
                self.c.setStrokeColor(C["borde"]); self.c.line(self.L, self._top(y), self.R, self._top(y))
        self.y += total + 6

    # ── tabla ──
    def tabla(self, headers, filas, anchos=None, alinear=None, negritas=None, vacio="Sin registros"):
        """anchos: fracciones (suman 1). alinear: 'l'/'c'/'r' por columna. negritas: índices de columnas en bold."""
        n = len(headers); anchos = anchos or [1 / n] * n
        ws = [a * self.CW for a in anchos]; alinear = alinear or ["l"] * n; negritas = negritas or []
        self._need(19 + 22)
        self._box(self.L, self.y, self.CW, 19, C["fondo_tabla"], C["borde"])
        x = self.L
        for h, w, a in zip(headers, ws, alinear):
            lines = self._wrap(h.upper(), w - 14, FB, 5.5)
            ox = {"l": x + 7, "c": x + w / 2, "r": x + w - 7}[a]
            for j, ln in enumerate(lines[:2]):
                self._text(ox, self.y + (7 if len(lines) == 1 else 4) + 6.5 * j, ln, FB, 5.5, "gris_head", a)
            x += w
        self.y += 19
        if not filas:
            self._box(self.L, self.y, self.CW, 20, stroke=C["borde"])
            self._text(self.L + 7, self.y + 7, vacio, F, 7, "gris"); self.y += 26; return
        for fila in filas:
            cells = [self._wrap(v if v not in (None, "") else "—", w - 14, FB if i in negritas else F, 7.5)
                     for i, (v, w) in enumerate(zip(fila, ws))]
            h = max(17, 10 + 9.5 * max(len(cl) for cl in cells))
            self._need(h)
            self._box(self.L, self.y, self.CW, h, stroke=C["borde"])
            x = self.L
            for i, (cl, w, a) in enumerate(zip(cells, ws, alinear)):
                ox = {"l": x + 7, "c": x + w / 2, "r": x + w - 7}[a]
                top = self.y + (h - 9.5 * len(cl)) / 2 + 1
                for j, ln in enumerate(cl):
                    self._text(ox, top + 9.5 * j, ln, FB if i in negritas else F, 7.5, "tinta", a)
                x += w
            self.y += h
        self.y += 6

    # ── fila de total (montos) ──
    def total(self, etiqueta, monto):
        self._need(30)
        self.c.setStrokeColor(C["marino"]); self.c.setLineWidth(1)
        self.c.line(self.L, self._top(self.y), self.R, self._top(self.y))
        self._text(self.L + 7, self.y + 11, etiqueta, FB, 5.5)
        self._text(self.R, self.y + 9, monto, FB, 12, "marino", "r"); self.y += 30

    # ── estado vacío dentro de caja ──
    def vacio(self, texto):
        self._need(24)
        self._box(self.L, self.y, self.CW, 20, stroke=C["borde"])
        self._text(self.L + 7, self.y + 7, texto, F, 6, "gris"); self.y += 26

    # ── tarjeta de seguimiento ──
    def seguimiento(self, n, titulo, fecha, tiempo, personas, fotos=None, documentos=None):
        fotos = fotos or []
        fw = 100 if len(fotos) <= 1 else 140            # columna de evidencia
        hb = 70 if fotos else 40
        hd = 0 if documentos is None else (19 + 17 * max(1, len(documentos)))
        h = 19 + hb + hd; self._need(h + 8)
        y0 = self.y
        self._box(self.L, y0, self.CW, h, stroke=C["borde"])
        self._box(self.L, y0, self.CW, 19, C["marino"])
        self._text(self.L + 7, y0 + 7, f"{n}. {titulo}", FB, 7.5, "blanco")
        y = y0 + 19; dw = self.CW - fw; cw = dw / 3
        self._box(self.L, y, dw, 18, C["fondo_tabla"])
        for k, (lab, val, b) in enumerate([("FECHA Y HORA", fecha, False), ("TIEMPO TRANSCURRIDO", tiempo, True),
                                           ("PERSONAS INVOLUCRADAS", personas, False)]):
            x = self.L + k * cw
            self._text(x + 7, y + 7, lab, FB, 5.5, "gris_head")
            for j, ln in enumerate(self._wrap(val or "—", cw - 14, FB if b else F, 7.5)[:3]):
                self._text(x + 7, y + 26 + 9.5 * j, ln, FB if b else F, 7.5)
        self.c.setStrokeColor(C["borde"]); self.c.line(self.L + dw, self._top(y), self.L + dw, self._top(y + hb))
        if fotos:
            tw = (fw - 8 - 4 * (len(fotos[:2]) - 1)) / len(fotos[:2])
            for k, ph in enumerate(fotos[:2]):
                p, cap = ph if isinstance(ph, tuple) else (ph, "Evidencia")
                x = self.L + dw + 4 + k * (tw + 4)
                self._img(p, x, y + 5, tw, hb - 20)
                self._text(x + tw / 2, y + hb - 11, cap, F, 4.5, "gris", "c")
        else:
            self._text(self.L + dw + fw / 2, y + hb / 2 - 2, "Sin evidencia", F, 5, "gris", "c")
        y += hb
        if documentos is not None:
            self._box(self.L, y, self.CW, 19, C["fondo_tabla"], C["borde"])
            self._text(self.L + 7, y + 7, f"DOCUMENTOS ({len(documentos)})", FB, 5.5, "marino"); y += 19
            for d in documentos or ["Sin documentos adjuntos."]:
                self._text(self.L + 7, y + 5, d, F, 7 if documentos else 5.5, "tinta" if documentos else "gris"); y += 17
        self.y = y0 + h + 8

    # ── galería de evidencias ──
    def evidencias(self, fotos, documentos=None):
        """fotos: [(ruta, pie)]. Rejilla de miniaturas 4 por fila."""
        if not fotos and documentos is None:
            return self.vacio("Sin evidencias registradas")
        tw, th, cap = 98, 55, 13; per = 4
        filas = [fotos[i:i + per] for i in range(0, len(fotos), per)] or [[]]
        hg = 8 + len(filas) * (th + cap + 10) if fotos else 0
        self._need(hg + 10)
        if fotos:
            self._box(self.L, self.y, self.CW, hg, stroke=C["borde"])
            for r, fila in enumerate(filas):
                for k, (p, pie) in enumerate(fila):
                    x = self.L + 5 + k * (tw + 8 + 6); y = self.y + 5 + r * (th + cap + 10)
                    self._box(x, y, tw + 4, th + cap + 4, stroke=C["borde"])
                    self._img(p, x + 2, y + 2, tw, th)
                    self._text(x + 5, y + th + 7, pie, F, 4.5, "gris")
            self.y += hg
        if documentos is not None:
            self._box(self.L, self.y, self.CW, 19, C["fondo_tabla"], C["borde"])
            self._text(self.L + 7, self.y + 7, f"DOCUMENTOS ({len(documentos)})", FB, 5.5, "marino"); self.y += 19
            for d in documentos or ["Sin documentos adjuntos."]:
                self._box(self.L, self.y, self.CW, 20, stroke=C["borde"])
                self._text(self.L + 7, self.y + 7, d, F, 7 if documentos else 5.5, "tinta" if documentos else "gris")
                self.y += 20
        self.y += 6

    def _img(self, path, x, y, w, h):
        try:
            img = ImageReader(path); iw, ih = img.getSize()
            s = max(w / iw, h / ih)  # cubrir y recortar al centro
            c = self.c; c.saveState()
            p = c.beginPath(); p.rect(x, self._top(y + h), w, h); c.clipPath(p, stroke=0)
            c.drawImage(img, x + (w - iw * s) / 2, self._top(y + h) + (h - ih * s) / 2, iw * s, ih * s)
            c.restoreState()
        except Exception:
            self._box(x, y, w, h, C["fondo_tabla"])
            self._text(x + w / 2, y + h / 2 - 3, "Imagen no disponible", F, 5, "gris", "c")

    def save(self):
        self.c.showPage(); self.c.save()
