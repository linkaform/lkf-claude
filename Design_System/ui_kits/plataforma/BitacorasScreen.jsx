const { SectionHeader, VIEW_MODES, PhotoCard, EstatusBadge, EmptyState, DataTable, RowAction, RowActions, RecordListItem, FilterPanel, FilterSection, FilterChip, Select, DetailPanel, DetailSection, DetailField, Button, KpiChip } = window.Clave10DesignSystem_b774bd;
const { IconEye, IconPencil, IconDownload, IconPrint } = window;

const BITACORAS_ROWS = [
  {folio:"R-2291",title:"Rondín nocturno — área 4",desc:"Recorrido completo sin novedades.",estatus:"Sin incidencias",tag:"Rondín",img:"../../assets/imagery/incidencia2.png",meta:["Caseta Norte · 02:14","Ana Ruiz"]},
  {folio:"I-0871",title:"Puerta de andén forzada",desc:"Se detectó cerradura dañada en el andén 3.",estatus:"Abierto",tag:"Incidencia",img:"../../assets/imagery/incidencia1.png",meta:["Andén 3 · 03:40","Luis Márquez"]},
  {folio:"F-0442",title:"Luminaria fuera de servicio",desc:"Falla reportada a mantenimiento.",estatus:"En proceso",tag:"Falla",img:"../../assets/imagery/falla1.png",meta:["Patio B · 04:05","Iván Robles"]},
];

const BITACORAS_SUB_TABS = [{value:"todos",label:"Todos"},{value:"Incidencia",label:"Incidencias"},{value:"Falla",label:"Fallas"}];

function BitacorasScreen() {
  const [view,setView] = React.useState("cards");
  const [tab,setTab] = React.useState("todos");
  const [sel,setSel] = React.useState(null);
  const [filtros,setFiltros] = React.useState(false);
  const [estatus,setEstatus] = React.useState(null);
  const [detalle,setDetalle] = React.useState(null);
  const shown = tab === "todos" ? BITACORAS_ROWS : BITACORAS_ROWS.filter(r => r.tag === tab);
  return (
    <div style={{padding:"0 24px 24px",position:"relative"}}>
      <SectionHeader title="Bitácoras" totalRecords={shown.length}
        actionLabel="Nueva Nota" onAction={()=>{}}
        subTabs={BITACORAS_SUB_TABS} subTab={tab} onSubTabChange={setTab}
        viewModes={VIEW_MODES} viewMode={view} onViewModeChange={setView} />


      <div>
          {shown.length === 0 ? (
            <EmptyState title="No se encontraron registros" description="Ajusta los filtros o el rango de fechas." />
          ) : view === "table" ? (
            <DataTable onFilterToggle={()=>setFiltros(true)} filterCount={estatus?1:0} rows={shown}
              columns={[
                {header:"Opciones",width:"120px",cell:r=>(
                  <RowActions>
                    <RowAction label="Ver detalle" icon={<IconEye/>} shape="plain" onClick={()=>setDetalle(r)}/>
                    <RowAction label="Editar" icon={<IconPencil/>} shape="plain"/>
                    <RowAction label="Descargar" icon={<IconDownload/>} shape="plain"/>
                  </RowActions>)},
                {header:"Folio",key:"folio"},{header:"Registro",key:"title"},
                {header:"Tipo",key:"tag"},{header:"Estatus",cell:r=><EstatusBadge estatus={r.estatus} solid />}]} />
          ) : view === "cards" ? (
            <div style={{display:"flex",flexWrap:"wrap",gap:16}}>
              {shown.map(r=>(
                <PhotoCard key={r.folio} image={r.img} title={r.title} subtitle={r.desc} folio={r.folio}
                  estatus={r.estatus} perfil={r.tag} selected={sel===r.folio} onClick={()=>{setSel(r.folio);setDetalle(r);}}
                  details={r.meta.map(v=>({value:v}))} style={{width:"auto"}} />
              ))}
            </div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {shown.map(r=>(
                <RecordListItem key={r.folio} image={r.img} thumbnails={[r.img]} title={r.title} subtitle={r.desc}
                  estatus={r.estatus} perfil={r.tag} folio={r.folio}
                  selected={sel===r.folio} onClick={()=>{setSel(r.folio);setDetalle(r);}}
                  fields={[
                    {label:"Caseta",value:r.meta[0].split(" · ")[0]},
                    {label:"Hora",value:r.meta[0].split(" · ")[1]},
                    {label:"Reportado por",value:r.meta[1]},
                  ]}
                  actions={<RowActions><RowAction label="Ver detalle" icon={<IconEye/>} shape="circle" onClick={()=>setDetalle(r)}/><RowAction label="Editar" icon={<IconPencil/>} shape="circle"/><RowAction label="Descargar" icon={<IconDownload/>} shape="circle"/></RowActions>} />
              ))}
            </div>
          )}
      </div>

      <DetailPanel open={!!detalle} eyebrow="Detalle del registro" title={detalle ? "#" + detalle.folio : ""}
        badge={detalle ? <EstatusBadge estatus={detalle.estatus} /> : null}
        actions={<><RowAction label="Imprimir" icon={<IconPrint/>} size={36}/><RowAction label="Descargar" icon={<IconDownload/>} size={36}/></>}
        storageKey="c10.bitacoras.detalle.ancho"
        footerNote="Bitácora completa disponible en el expediente del folio"
        footer={<Button variant="secondary" onClick={()=>setDetalle(null)}>Cerrar</Button>}
        onClose={()=>setDetalle(null)}>
        {detalle ? (
          <>
            <DetailSection title="Seguimiento" meta="Etapa 2 de 4 · En revisión de supervisión" collapsible defaultOpen={false} />
            <DetailSection title="Ubicación del registro">
              <div style={{display:"flex",gap:64,flexWrap:"wrap"}}>
                <DetailField label="Caseta" value={detalle.meta[0].split(" · ")[0]} />
                <DetailField label="Hora" value={detalle.meta[0].split(" · ")[1]} />
                <DetailField label="Reportado por" value={detalle.meta[1]} />
                <DetailField label="Tipo" value={detalle.tag} />
              </div>
            </DetailSection>
            <DetailSection title="Descripción">
              <p style={{margin:0,fontSize:"var(--font-size-base)",lineHeight:"var(--line-height-relaxed)",color:"var(--text-body)",textWrap:"pretty"}}>{detalle.desc}</p>
            </DetailSection>
            <DetailSection title="Evidencia fotográfica" meta="1 archivo" >
              <img src={detalle.img} alt="" style={{width:280,height:200,objectFit:"cover",borderRadius:"var(--radius-md)",background:"var(--surface-sunken)"}} />
            </DetailSection>
            <DetailSection title="Seguimientos" meta="2 comentarios" collapsible defaultOpen={false} />
            <DetailSection title="Responsables" meta="4 involucrados" collapsible defaultOpen={false} />
          </>
        ) : null}
      </DetailPanel>

      <FilterPanel open={filtros} activeCount={estatus?1:0} onClose={()=>setFiltros(false)} onClear={()=>setEstatus(null)}>
        <FilterSection title="Fecha">
          <Select options={["Todos","Hoy","Esta semana","Este mes"]} placeholder="Todos" />
        </FilterSection>
        <FilterSection title="Estatus" count={estatus?1:0}>
          <FilterChip label="Sin incidencias" count={1} selected={estatus==="ok"} onClick={()=>setEstatus("ok")} />
          <FilterChip label="Abierto" count={1} selected={estatus==="abierto"} onClick={()=>setEstatus("abierto")} />
          <FilterChip label="En proceso" count={1} selected={estatus==="proceso"} onClick={()=>setEstatus("proceso")} />
        </FilterSection>
        <FilterSection title="Reportado por" defaultOpen={false} />
      </FilterPanel>
    </div>
  );
}
Object.assign(window, { BitacorasScreen });
