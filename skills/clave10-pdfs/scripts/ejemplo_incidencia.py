import sys,glob; import os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from clave10_pdf import Clave10PDF
fotos=(sorted(glob.glob('fotos/*.jpg')) + ['sin_foto.jpg']*3)[:3]  # usa tus fotos o muestra el placeholder
d=Clave10PDF('ejemplo_incidencia.pdf','Bitácora de incidencias','9479-10',version=13)
d.kpis([dict(label='Gravedad',value='Crítica',sub='Abandono de vehículo robado'),dict(label='Afectación estimada',value='$100,400.00',sub='MXN · 3 conceptos'),
 dict(label='Personas involucradas',value='3',sub='1 retenido · 1 con atención médica'),dict(label='Tiempo de atención',value='10 h 32 min',sub='9 acciones de seguimiento')])
d.seccion('Información del incidente')
d.campos([[('Reporta','Emiliano Zapata'),('Fecha y hora','20/10/2026 · 08:45:00'),('Ubicación','Planta Monterrey'),('Área','Caseta Principal')],
 [('Descripción del incidente','Durante el rondín de las 08:30 el guardia detectó un vehículo estacionado frente a la Caseta Principal sin conductor, con el cristal del copiloto roto y las placas sobrepuestas. Al consultar REPUVE aparece con reporte de robo vigente.',4)]])
d.seccion('Personas involucradas')
d.tabla(['Nombre','Rol','Sexo · grupo etario','Atención médica','Retenido(a)','Observaciones'],
 [['Pedro Ramírez Soto','Testigo','Masculino','No','No','Detectó el vehículo durante el rondín de las 08:30.'],['Desconocido 1','Sospechoso','Masculino','No','Sí','Captado en cámara 3 bajando del vehículo a las 03:12.']],
 anchos=[.2,.11,.15,.12,.1,.32],alinear=['l','l','l','c','c','l'],negritas=[0])
d.seccion('Afectación patrimonial')
d.tabla(['Tipo de afectación','Descripción','Duración estimada','Monto estimado'],[['Daño a infraestructura','Daños','10 Horas','$10,000.00'],['Paro de producción','Test','12 Horas','$400.00']],anchos=[.3,.25,.2,.25],alinear=['l','l','l','r'])
d.total('Total afectación estimada','$100,400.00')
d.seccion('Seguimiento del incidente')
for i in range(1,6):
  d.seguimiento(i,'Guardia detecta el vehículo y reporta por radio.','20/10/2026 · 08:45:00','0 min','Pedro Ramírez Soto',fotos=[(fotos[i%3],'Evidencia')]*(1 if i%2 else 2) if i<4 else None, documentos=['PDF_PRUEBA1.pdf'] if i==2 else None)
d.seccion('Evidencias del incidente')
d.evidencias([(f,f'Evidencia {k+1}') for k,f in enumerate(fotos)], documentos=[])
d.save()
