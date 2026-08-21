const { SectionHeader, VIEW_MODES, DataTable, EstatusBadge, RowAction, RowActions,
  FilterPanel, FilterSection, FilterChip, Select, Pagination, PhotoCard, RecordListItem,
  Modal, Button, Field, Input, Textarea, DetailPanel, DetailSection, DetailField } = window.Clave10DesignSystem_b774bd;
const { IconEye, IconPencil, IconPrint, IconBadgeId, IconCar, IconTool, IconArrowOut, IconPin, IconUser, IconCalendar } = window;

const PASES_IMG = (n) => "../../assets/imagery/" + n;

const PASES_ROWS = [
  {folio:"8612-10",nombre:"Margarita Gomez Velazquez",empresa:"Linkaform",perfil:"Auditor de Gobierno",
   caseta:"Caseta Principal",visita:"Juan Escutia",entrada:"2026-07-31 12:14:56",salida:"",status:"Entrada",
   img:PASES_IMG("guardia1.png"),thumbs:[PASES_IMG("guardia1.png"),PASES_IMG("incidencia2.png")]},
  {folio:"8540-10",nombre:"Leyva Mabel Ivonne Castañares",empresa:"Linkaform",perfil:"Visita General",
   caseta:"Caseta Principal",visita:"Juan Escutia",entrada:"2026-07-28 12:24:12",salida:"",status:"Entrada",
   img:PASES_IMG("incidencia2.png"),thumbs:[PASES_IMG("incidencia2.png"),PASES_IMG("nota1.png")]},
  {folio:"8539-10",nombre:"José Velázquez Apolinar",empresa:"Reprsetaciones de audio",perfil:"Visita General",
   caseta:"Caseta Principal",visita:"Emiliano Zapata",entrada:"2026-07-28 12:21:13",salida:"",status:"Entrada",
   img:PASES_IMG("nota1.png"),thumbs:[PASES_IMG("nota1.png")]},
  {folio:"8538-10",nombre:"Miguel",empresa:"Lkf",perfil:"Visita General",
   caseta:"Caseta Principal",visita:"Emiliano Zapata",entrada:"2026-07-27 20:16:57",salida:"2026-07-28 18:51:01",status:"Salida",
   img:PASES_IMG("empleado1.png"),thumbs:[PASES_IMG("empleado1.png")]},
  {folio:"8537-10",nombre:"Karla Godoy Recendiz",empresa:"Lkf",perfil:"Visita General",
   caseta:"Caseta Principal",visita:"Emiliano Zapata",entrada:"2026-07-27 18:32:05",salida:"",status:"Entrada",
   img:PASES_IMG("empleado2.png"),thumbs:[PASES_IMG("empleado2.png")]},
  {folio:"8536-10",nombre:"Christopher Yosiel Ramirez Canales",empresa:"Lkf",perfil:"Visita General",
   caseta:"Caseta Principal",visita:"Emiliano Zapata",entrada:"2026-07-27 18:32:05",salida:"",status:"Entrada",
   img:PASES_IMG("empleado3.png"),thumbs:[PASES_IMG("empleado3.png")]},
];

const PASES_SUB_TABS = [{value:"personal",label:"Personal"},{value:"vehiculos",label:"Vehículos"},{value:"equipos",label:"Equipos"}];

/* La misma fila de acciones en los tres modos; en tabla va "plain", en tarjetas "circle". */
function PasesRowActions({ pase, shape, onVer }) {
  const cerrado = pase.status === "Salida";
  return (
    <RowActions>
      <RowAction label="Ver detalle" icon={<IconEye/>} shape={shape} onClick={onVer} />
      <RowAction label="Vehículo" icon={<IconCar/>} shape={shape} disabled={cerrado} />
      <RowAction label="Equipo" icon={<IconTool/>} shape={shape} disabled={cerrado} />
      <RowAction label="Identificación" icon={<IconBadgeId/>} shape={shape} disabled={cerrado} />
      <RowAction label="Imprimir" icon={<IconPrint/>} shape={shape} />
      <RowAction label="Registrar salida" icon={<IconArrowOut/>} shape={shape} tone="accent" disabled={cerrado} />
    </RowActions>
  );
}

function PasesScreen() {
  const [view,setView] = React.useState("cards");
  const [tab,setTab] = React.useState("personal");
  const [page,setPage] = React.useState(1);
  const [modal,setModal] = React.useState(false);
  const [filtros,setFiltros] = React.useState(false);
  const [detalle,setDetalle] = React.useState(null);
  const [estatus,setEstatus] = React.useState(null);
  const [perfil,setPerfil] = React.useState(null);
  const [sel,setSel] = React.useState([]);
  const activos = (estatus?1:0) + (perfil?1:0);

  const toggleSel = (folio) => setSel(s => s.includes(folio) ? s.filter(f=>f!==folio) : s.concat(folio));

  return (
    <div style={{padding:"0 24px 24px",position:"relative"}}>
      <SectionHeader title="Bitácora de Entradas & Salidas" totalRecords={715}
        subTabs={PASES_SUB_TABS} subTab={tab} onSubTabChange={setTab}
        viewModes={VIEW_MODES} viewMode={view} onViewModeChange={setView} />

      <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
        {view === "cards" ? (
          <aside style={{width:320,flexShrink:0,padding:20,boxSizing:"border-box",background:"var(--surface-card)",
            border:"1px solid var(--border-default)",borderRadius:"var(--radius-lg)",boxShadow:"var(--shadow-sm)"}}>
            <p style={{margin:"0 0 12px",fontSize:"var(--font-size-md)",fontWeight:"var(--font-weight-bold)"}}>Filtros</p>
            <div style={{borderTop:"1px solid var(--border-default)",marginBottom:20}}></div>
            <FilterSection title="Fecha">
              <Select options={["Todos","Hoy","Esta semana","Este mes"]} placeholder="Todos" />
            </FilterSection>
            <FilterSection title="Estatus">
              <FilterChip label="Entrada" count={58} selected={estatus==="Entrada"} onClick={()=>setEstatus(estatus==="Entrada"?null:"Entrada")} />
              <FilterChip label="Salida" count={0} selected={estatus==="Salida"} onClick={()=>setEstatus(estatus==="Salida"?null:"Salida")} />
            </FilterSection>
            <FilterSection title="Perfil" defaultOpen={false} />
            <FilterSection title="Visita a" defaultOpen={false} />
          </aside>
        ) : null}

        <div style={{flex:1,minWidth:0}}>
          {view === "cards" ? (
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16}}>
              {PASES_ROWS.map(p=>(
                <PhotoCard key={p.folio} image={p.img} title={p.nombre} subtitle={p.empresa}
                  folio={p.folio} estatus={p.status} perfil={p.perfil} style={{width:"auto"}}
                  details={[
                    {icon:<IconPin/>,label:"Ubicación",value:p.caseta},
                    {icon:<IconUser/>,label:"Visita a",value:p.visita},
                    {icon:<IconCalendar/>,label:"Entrada",value:p.entrada.slice(0,16)},
                  ].concat(p.salida ? [{icon:<IconCalendar/>,label:"Salida",value:p.salida.slice(0,16),tone:"danger"}] : [])}
                  actions={<PasesRowActions pase={p} shape="circle" onVer={()=>setDetalle(p)} />} />
              ))}
            </div>
          ) : view === "list" ? (
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <div style={{display:"flex",justifyContent:"flex-end",marginBottom:-4}}>
                <Button variant="secondary" size="sm" onClick={()=>setFiltros(true)}>Filtros{activos?" ("+activos+")":""}</Button>
              </div>
              {PASES_ROWS.map(p=>(
                <RecordListItem key={p.folio} image={p.img} thumbnails={p.thumbs} title={p.nombre} subtitle={p.empresa}
                  estatus={p.status} perfil={p.perfil} folio={p.folio}
                  selectable selected={sel.includes(p.folio)} onSelect={()=>toggleSel(p.folio)}
                  fields={[
                    {label:"Caseta",value:p.caseta},
                    {label:"Visita a",value:p.visita},
                    {label:"Fecha de entrada",value:p.entrada},
                    {label:"Fecha de salida",value:p.salida},
                    {label:"Gafete",value:"No asignado"},
                  ]}
                  actions={<PasesRowActions pase={p} shape="circle" onVer={()=>setDetalle(p)} />} />
              ))}
            </div>
          ) : (
            <DataTable onFilterToggle={()=>setFiltros(true)} filterOpen={filtros} filterCount={activos} rows={PASES_ROWS}
              columns={[
                {header:"Opciones",width:"190px",cell:r=><PasesRowActions pase={r} shape="plain" onVer={()=>setDetalle(r)} />},
                {header:"Folio",key:"folio",width:"80px"},
                {header:"Visitante",key:"nombre"},
                {header:"Estatus",cell:r=><EstatusBadge estatus={r.status} solid />},
                {header:"Entrada",key:"entrada"},
                {header:"Salida",cell:r=>r.salida || ""},
                {header:"Tipo",key:"perfil"},
                {header:"Empresa",key:"empresa"},
                {header:"Visita a",key:"visita"},
                {header:"Caseta entrada",key:"caseta"},
                {header:"Caseta salida",cell:r=>r.salida ? r.caseta : ""},
                {header:"Gafete",cell:()=>"---"},
                {header:"Locker",cell:()=>"---"},
                {header:"Comentarios",cell:()=>"---"},
              ]} />
          )}

          <Pagination page={page} totalPages={29} recordsOnPage={25} totalRecords={715} limit={25} onPageChange={setPage} />
        </div>
      </div>

      <DetailPanel open={!!detalle} eyebrow="Detalle del pase" title={detalle ? "#" + detalle.folio : ""}
        badge={detalle ? <EstatusBadge estatus={detalle.status} solid /> : null}
        actions={<><RowAction label="Imprimir" icon={<IconPrint/>} size={36}/><RowAction label="Identificación" icon={<IconBadgeId/>} size={36}/></>}
        storageKey="c10.pases.detalle.ancho"
        footerNote="Historial completo disponible en el expediente del visitante"
        footer={<Button variant="secondary" onClick={()=>setDetalle(null)}>Cerrar</Button>}
        onClose={()=>setDetalle(null)}>
        {detalle ? (
          <>
            <DetailSection title="Visitante">
              <div style={{display:"flex",gap:20,alignItems:"center"}}>
                <img src={detalle.img} alt="" style={{width:88,height:88,objectFit:"cover",borderRadius:"var(--radius-md)",background:"var(--surface-sunken)"}} />
                <div style={{display:"flex",gap:56,flexWrap:"wrap"}}>
                  <DetailField label="Nombre" value={detalle.nombre} />
                  <DetailField label="Empresa" value={detalle.empresa} />
                  <DetailField label="Perfil" value={detalle.perfil} />
                </div>
              </div>
            </DetailSection>
            <DetailSection title="Acceso">
              <div style={{display:"flex",gap:56,flexWrap:"wrap"}}>
                <DetailField label="Caseta entrada" value={detalle.caseta} />
                <DetailField label="Fecha de entrada" value={detalle.entrada} />
                <DetailField label="Fecha de salida" value={detalle.salida || "---"} />
                <DetailField label="Visita a" value={detalle.visita} />
              </div>
            </DetailSection>
            <DetailSection title="Artículos declarados" meta="0 línea(s)" />
            <DetailSection title="Vehículo" collapsible defaultOpen={false} />
            <DetailSection title="Seguimiento" meta="Etapa 1 de 2 · Dentro de la planta" collapsible defaultOpen={false} />
          </>
        ) : null}
      </DetailPanel>

      <FilterPanel open={filtros} activeCount={activos} onClose={()=>setFiltros(false)}
        onClear={()=>{setEstatus(null);setPerfil(null);}}>
        <FilterSection title="Fecha">
          <Select options={["Todos","Hoy","Esta semana","Este mes"]} placeholder="Todos" />
        </FilterSection>
        <FilterSection title="Estatus" count={estatus?1:0}>
          <FilterChip label="Entrada" count={58} selected={estatus==="Entrada"} onClick={()=>setEstatus("Entrada")} />
          <FilterChip label="Salida" count={0} selected={estatus==="Salida"} onClick={()=>setEstatus("Salida")} />
        </FilterSection>
        <FilterSection title="Perfil" count={perfil?1:0}>
          <FilterChip label="Visita General" count={42} selected={perfil==="Visita General"} onClick={()=>setPerfil("Visita General")} />
          <FilterChip label="Auditor de Gobierno" count={4} selected={perfil==="Auditor de Gobierno"} onClick={()=>setPerfil("Auditor de Gobierno")} />
        </FilterSection>
        <FilterSection title="Visita a" defaultOpen={false} />
      </FilterPanel>

      <Modal open={modal} title="Nuevo pase de entrada" description="Registra al visitante y la ubicación autorizada."
        onClose={()=>setModal(false)} width={520}
        footer={<><Button variant="secondary" onClick={()=>setModal(false)}>Cancelar</Button><Button onClick={()=>setModal(false)}>Generar Pase</Button></>}>
        <div>
          <Field label="Nombre del visitante" required><Input placeholder="Nombre completo" /></Field>
          <Field label="Motivo de la visita"><Textarea rows={2} placeholder="Descripción breve" /></Field>
        </div>
      </Modal>
    </div>
  );
}
Object.assign(window, { PasesScreen });
