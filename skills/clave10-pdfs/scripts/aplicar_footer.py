"""
Aplica el footer estándar de Clave 10 (slogan + "Página X de Y") a un PDF ya generado.
Tapa la paginación vieja (Helvetica 9 negra en x≈469) y el slogan viejo si ya lo traía.

    python aplicar_footer.py entrada.pdf salida.pdf
"""
import io, sys, os
from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.colors import white
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from clave10_pdf import draw_footer


def aplicar(src, dst):
    r = PdfReader(src); w = PdfWriter(); n = len(r.pages)
    for i, page in enumerate(r.pages, 1):
        W, H = float(page.mediabox.width), float(page.mediabox.height)
        buf = io.BytesIO(); c = canvas.Canvas(buf, pagesize=(W, H))
        c.setFillColor(white)
        if W < 300:
            c.rect(0, 0, W, 14, stroke=0, fill=1)          # franja inferior del pase
        else:
            c.rect(0, 18, W, 34, stroke=0, fill=1)         # zona del footer (y 18–52 pt desde abajo)
        draw_footer(c, i, n, W, H)
        c.save(); buf.seek(0)
        page.merge_page(PdfReader(buf).pages[0]); w.add_page(page)
    with open(dst, "wb") as f:
        w.write(f)


if __name__ == "__main__":
    aplicar(sys.argv[1], sys.argv[2])
