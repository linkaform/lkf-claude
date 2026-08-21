const { AppHeader } = window.Clave10DesignSystem_b774bd;
const { LoginScreen, InicioScreen, PasesScreen, TurnosScreen, BitacorasScreen } = window;

const NAV = [
  {label:"Accesos", sections:[{title:"Accesos",links:["Bitácora de entradas y salidas","Personal","Vehículos"]}]},
  {label:"Pases de entrada", sections:[
    {title:"Pases de entrada",links:["Nuevo pase","Activos","Por autorizar","En proceso","Todos"]},
    {title:"Transportistas",links:["Nuevo pase transportista"]}]},
  {label:"Caseta", sections:[{title:"Caseta",links:["Turnos","Rondines","Inspecciones"]}]},
  {label:"Seguridad", sections:[{title:"Seguridad",links:["Bitácoras","Incidencias","Fallas"]}]},
  {label:"Activos", sections:[{title:"Activos",links:["Artículos perdidos","Paquetería","Concesionados"]}]},
  {label:"Ubicaciones"},
];

const ROUTES = {
  "Bitácora de entradas y salidas":"Pases","Pases de entrada":"Pases","Todos":"Pases","Activos":"Pases",
  "Por autorizar":"Pases","En proceso":"Pases","Nuevo pase":"Pases","Personal":"Pases","Vehículos":"Pases",
  "Caseta":"Turnos","Turnos":"Turnos",
  "Seguridad":"Bitácoras","Bitácoras":"Bitácoras","Incidencias":"Bitácoras","Fallas":"Bitácoras",
  "Accesos":"Pases",
};

function App() {
  const [auth,setAuth] = React.useState(false);
  const [screen,setScreen] = React.useState("Inicio");
  const [active,setActive] = React.useState("Accesos");
  if (!auth) return <LoginScreen onLogin={()=>setAuth(true)} />;
  const go = (label) => {
    const next = ROUTES[label];
    if (next) { setScreen(next); setActive(label === "Ubicaciones" ? active : (NAV.find(n=>n.label===label) ? label : active)); }
  };
  return (
    <div style={{minHeight:"100%",background:"var(--surface-app)"}}>
      <AppHeader logoSrc="../../assets/logo.png" location="Planta Monterrey" items={NAV} activeItem={active}
        notificationCount={3} onSelect={go}
        user={{name:"Emiliano Zapata",avatar:"../../assets/imagery/profile.png"}} />
      {screen === "Inicio"
        ? <InicioScreen onOpen={(id)=>{
            const map = {pases:"Pases",turnos:"Turnos",bitacoras:"Bitácoras"};
            if (map[id]) { setScreen(map[id]); setActive(id==="pases"?"Pases de entrada":id==="turnos"?"Caseta":"Seguridad"); }
          }} />
        : screen === "Pases" ? <PasesScreen />
        : screen === "Turnos" ? <TurnosScreen />
        : <BitacorasScreen />}
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
