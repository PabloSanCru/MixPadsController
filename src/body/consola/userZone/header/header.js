/* IMPORTACIONES */

import Logout from "./logout";


/* ELEMENTOS */

const userSession = localStorage.getItem("session"); // Recepción de la información de logueo del usuario


/* FUNCIÓN */

function Header(){
    return ( // Impresión de la cabecera de pantalla cuando el usuario está logueado, donde encontramos el nombre del usuario y titular de la zona donde se encuentra, y botón de "Logout"
        <header id="header">
            <div id="cabecera">
                <h2>{userSession}</h2>
                <h5>/TRACKLIST</h5>
            </div>
            <Logout />
        </header>
    )
}


/* EXPORTACIONES */

export default Header;