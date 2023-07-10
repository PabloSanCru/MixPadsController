import Index from "./index/index";
import UserZone from "./userZone/userZone";
const userSession = localStorage.getItem("session");

function Consola() {
  return(
    <section id="pantalla">
      {userSession != null ? <UserZone /> : <Index />}
    </section>
  )
}

export default Consola;
