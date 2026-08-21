const { Avatar, Button, Badge, Card, DataTable, KpiChip, Modal, Toast } = window.Clave10DesignSystem_b774bd;

function Info({ label, value }) {
  return <div style={{width:"100%"}}><p style={{margin:0,fontSize:"var(--font-size-sm)",color:"var(--text-subtle)"}}>{label}</p><p style={{margin:"2px 0 0",fontWeight:700}}>{value}</p></div>;
}

function TurnosScreen() {
  const [open,setOpen] = React.useState(true);
  const [confirm,setConfirm] = React.useState(false);
  const [toast,setToast] = React.useState(false);
  return (
    <div style={{display:"flex",position:"relative",minHeight:640}}>
      <aside style={{width:"25%",minWidth:300,padding:"24px",borderRight:"1px solid #F0F2F5",boxSizing:"border-box"}}>
        <div style={{display:"flex",flexDirection:"column",gap:20,marginBottom:40}}>
          <Avatar src="../../assets/imagery/profile.png" name="Ana Ruiz" size={128} style={{margin:"0 auto",boxShadow:"var(--shadow-portrait)"}} />
          <div>
            <p style={{margin:0,fontWeight:700,fontSize:"var(--font-size-xl)"}}>Ana Ruiz Delgado</p>
            <p style={{margin:"2px 0 0",fontWeight:700}}>Guardia de acceso</p>
            <p style={{margin:"2px 0 0",color:"var(--text-subtle)"}}>ana.ruiz@clave10.com</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:8,alignItems:"center"}}>
              <Badge tone="process">Supervisor</Badge><Badge tone="process">Primeros auxilios</Badge><Badge tone="neutral">+2</Badge>
            </div>
          </div>
          <Button variant="secondary" fullWidth style={{background:"#F3F4F6",border:"none",color:"#374151"}}>Cambiar Imagen</Button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:20,marginBottom:32}}>
          <div style={{display:"flex",gap:12}}><Info label="Ubicación:" value="Planta Monterrey" /><Info label="Ciudad:" value="Apodaca" /></div>
          <div style={{display:"flex",gap:12}}><Info label="Estado:" value="Nuevo León" /><Info label="Dirección:" value="Av. Industrial 1200" /></div>
          <Info label="Caseta:" value="Caseta Norte" />
          <Button fullWidth>Cambiar Caseta</Button>
          <Button fullWidth style={{background:"#7C3AED"}}>Ingresar Como Suplente</Button>
        </div>
        <div>
          <p style={{margin:"0 0 6px",color:"var(--text-subtle)"}}>Estatus de la caseta:</p>
          <Badge tone="brand" shape="square" style={{background:open?"#16A34A":"#DC2626",fontSize:"var(--font-size-base)",padding:"4px 12px"}}>{open?"Abierta":"Cerrada"}</Badge>
        </div>
      </aside>

      <section style={{flex:1,padding:32,display:"flex",flexDirection:"column",gap:24}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:24,flexWrap:"wrap"}}>
          <div>
            <p style={{margin:0,fontWeight:700,fontSize:"var(--font-size-xl)"}}>Detalles del turno</p>
            <div style={{display:"flex",gap:40,marginTop:12,alignItems:"center"}}>
              <div style={{width:128,height:128,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                border:"2px dashed #9CA3AF",boxShadow:"var(--shadow-portrait)",cursor:"pointer"}}>
                <img src="../../assets/imagery/guardia1.png" alt="Inicio de turno" style={{width:112,height:96,objectFit:"cover"}} />
                <span style={{fontSize:"var(--font-size-xs)",color:"var(--text-subtle)"}}>Inicio de turno</span>
              </div>
              <div><p style={{margin:0}}>Fecha:</p><p style={{margin:"4px 0 0"}}>31/07/2026</p></div>
              <div><p style={{margin:0}}>Hora:</p><p style={{margin:"4px 0 0"}}>07:02 AM</p></div>
              <div><p style={{margin:0}}>Estatus del Turno:</p>
                <Badge shape="square" style={{background:open?"#16A34A":"#DC2626",color:"#fff",fontSize:"var(--font-size-base)",padding:"4px 12px",marginTop:4}}>{open?"Turno abierto":"Turno cerrado"}</Badge></div>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {open
              ? <Button variant="destructive" style={{width:300}} onClick={()=>setConfirm(true)}>Cerrar Turno</Button>
              : <Button style={{width:300,background:"var(--c10-blue)"}} onClick={()=>{setOpen(true);setToast(true);}}>Iniciar Turno</Button>}
          </div>
        </div>

        <Card elevation="none" padding="0" style={{border:"none"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,flexWrap:"wrap"}}>
            <p style={{margin:0,fontWeight:700}}>Guardias de apoyo</p>
            <KpiChip value={2} />
            <KpiChip value={42} label="accesos" tone="neutral" />
            <KpiChip value={2} label="incidencias" tone="danger" />
          </div>
          <DataTable onFilterToggle={()=>{}}
            columns={[{header:"Guardia",key:"nombre"},{header:"Rol",key:"rol"},{header:"Entrada",key:"entrada"},{header:"Salida",key:"salida"}]}
            rows={[{nombre:"Luis Márquez",rol:"Apoyo",entrada:"07:10",salida:"—"},{nombre:"Iván Robles",rol:"Rondín",entrada:"07:15",salida:"11:00"}]} />
        </Card>

        <Modal open={confirm} title="Confirmación" description="¿Deseas cerrar el turno actual? Se registrará la hora de salida."
          width={420} onClose={()=>setConfirm(false)}
          footer={<><Button variant="secondary" onClick={()=>setConfirm(false)}>Cancelar</Button>
                    <Button variant="destructive" onClick={()=>{setOpen(false);setConfirm(false);setToast(true);}}>Cerrar Turno</Button></>} />

        {toast ? <div style={{position:"absolute",right:24,bottom:24}} onClick={()=>setToast(false)}>
          <Toast tone="success" title={open?"Se inició tu turno":"Se cerró tu turno"} description="Quedó registrada la evidencia fotográfica." />
        </div> : null}
      </section>
    </div>
  );
}
Object.assign(window, { TurnosScreen });
