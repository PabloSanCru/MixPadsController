/* IMPORTACIONES */

import Header from "./header/header";
import UserList from "./userList/userList";


/* FUNCIÓN */

function UserZone(){
    return ( // Impresión de los componentes "Header" y "UserList" dentro de la sección "UserZone"
        [<Header />, <UserList />]
    )
}


/* EXPORTACIONES */

export default UserZone;