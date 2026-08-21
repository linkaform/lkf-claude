const { Button, Input, Card } = window.Clave10DesignSystem_b774bd;

function LoginScreen({ onLogin }) {
  const [show, setShow] = React.useState(false);
  return (
    <div style={{display:"flex",height:"100%",alignItems:"center",justifyContent:"center",background:"#F3F4F6"}}>
      <Card elevation="md" padding="48px 40px" style={{width:440,boxSizing:"border-box",borderRadius:"var(--radius-xl)",border:"none",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <img src="../../assets/logo.png" alt="Clave 10" style={{width:174,marginBottom:40}} />
        <div style={{width:"100%",display:"flex",flexDirection:"column",gap:16}}>
          <Input size="lg" placeholder="Usuario" defaultValue="ana.ruiz" />
          <div style={{position:"relative"}}>
            <Input size="lg" placeholder="Password" type={show?"text":"password"} defaultValue="clave10" />
            <span onClick={()=>setShow(!show)} style={{position:"absolute",right:14,top:14,cursor:"pointer",color:"var(--text-placeholder)",fontSize:14}}>{show?"◎":"◉"}</span>
          </div>
        </div>
        <Button size="xl" fullWidth onClick={onLogin} style={{marginTop:24,background:"var(--c10-blue-login)",fontWeight:700}}>Iniciar Sesión</Button>
        <Button variant="link" size="sm" style={{marginTop:16,fontWeight:600}}>¿Olvidaste tu contraseña?</Button>
      </Card>
    </div>
  );
}
Object.assign(window, { LoginScreen });
