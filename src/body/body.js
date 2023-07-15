/* IMPORTACIONES */

import MixPads from "./mixPads/mixPads";
import Consola from "./consola/consola";


/* FUNCIÓN */

function Body() {
  return ([ // Impresion de los componentes "MixPads" y "Consola"
    <MixPads />,
    <Consola />
  ])
}


/* EXPORTACIONES */

export default Body;
