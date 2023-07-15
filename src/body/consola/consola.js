/* IMPORTACIONES */

import Index from "./index/index";
import UserZone from "./userZone/userZone";


/* ELEMENTOS */

const userSession = localStorage.getItem("session"); // Recepción de la información de logueo del usuario


/* FUNCIÓN */

function Consola() {
  return ( // Impresión de la pantalla con las sección de Index o de UserZone en función de si el usuario está logueado
    <section id="pantalla">
      {userSession != null ? <UserZone /> : <Index />}
    </section>
  )
}


/* EXPORTACIONES */

export default Consola;
