/* IMPORTACIONES */

import React, { useEffect, useState } from 'react';
import Body from './body/body';


/* FUNCIÓN */

function Main(){
  function screenSize(){ // Reconocimiento del tamaño de la ventana
    const { innerWidth: width, innerHeight: height } = window; // Registro de las medidas
    if(width > height){
      return(true);
    }else{
      return(false);
    }
  };
  const [responsive, setResponsive] = useState(screenSize()); // Registro del elemento para el responsive con la medida de la ventana

  useEffect(() => { // Función de reconocimiento de las medidas de la ventana al redimensionar
    function handleResize() {
      setResponsive(screenSize());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return ( // Impresión del contenedor diseñado para el responsive, con cabecera de la página web y componente "Body"
    <main className={responsive === true ? "desktopSize" : "mobileSize"}>
      <section id="marca">
        <h1>MixPads<span>Controller</span></h1>
      </section>
      <React.StrictMode>
        <Body/>
      </React.StrictMode>
    </main>
  )
}


/* EXPORTACIONES */

export default Main;
