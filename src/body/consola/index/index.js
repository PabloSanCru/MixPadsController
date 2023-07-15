/* IMPORTACIONES */

import Signup from "./registros/signup";
import Login from "./registros/login";


/* FUNCIÓN */

function Index() {
  return ( // Impresión de los componentes "Login" y "Signup" dentro de la sección "Index" 
       [<Login />, <Signup />]
  )
}


/* EXPORTACIONES */

export default Index;