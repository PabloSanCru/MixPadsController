/* IMPORTACIONES */

import React, {useState, useEffect} from "react";
import axios from "axios"; // Módulo para la conexión y envío de peticiones


/* ELEMENTOS */

const userSession = localStorage.getItem("session"); // Recepción de la información de logueo del usuario
let trackRecording = []; // Secuencia de sonidos tecleados


/* FUNCIONES */

function Controles() { // Función para el boton de grabación de canciones de la web
    const [rec, setRec] = useState(false); // Elemento para el estado de grabación

    async function enviarGrabacion(){ // Envío de secuencia de sonidos tecleados al servidor, convirtiendo la secuencia en un string para poder ser registrada como texto. Posteriormente se recarga la página para actualizar el contenido de la web
        const track = JSON.stringify(trackRecording);
        const recordData = {userSession, track};
        const consulta = await axios.post("https://mixpads-controller-server.onrender.com/track/record", recordData);
        if (consulta.data === true){window.location.reload()};
        trackRecording = [];
    }

    function grabar(){ // Función toggle para el estado de grabación de las seciencias, y al final la grabación ejecuta la función de envío si hay algún sonido tecleado
        if(rec === false){
            setRec(true);
            trackRecording = [];
        }else{
            setRec(false);
            console.log(trackRecording.length);
            if (trackRecording.length >= 1){enviarGrabacion()};
        }
    }

    return ( // Impresion del articulo "controles" con el botón de grabación, que solo se muestra al estar logueado
        <article id="controles" className={rec === true ? "recording" : "no-recording"}>
            {userSession ? <button name="recBoton" id="recBoton" onClick={grabar}>REC</button> : <div id="recBoton"></div> }
        </article>
    )
    
}

function Pads() { // Función para los pads de sonidos de la web
    async function playSonidoKey(e){ // Reproducción de los sonidos al evento del tecleo de teclas físicas
        if(e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4" || e.key === "q" || e.key === "w" || e.key === "e" || e.key === "r" || e.key === "a" || e.key === "s" || e.key === "d" || e.key === "f" || e.key === "z" || e.key === "x" || e.key === "c" || e.key === "v"){
            let audio = new Audio("./mp3/pad-"+e.key+".mp3"); // Creación del audio según la tecla
            audio.play(); // Reproducción del audio
            trackRecording.push("./mp3/pad-"+e.key+".mp3"); // Elemento añadido al array de secuencia de sonidos tecleados
        }
    }
    
    useEffect(() => {
        window.addEventListener("keydown", playSonidoKey);
    }, []);

    async function playSonido(e){ // Reproducción de los sonidos al evento del click en el pad digital
        let audio = new Audio("./mp3/"+e.target.dataset.id+".mp3"); // Creación del audio según el pad
        audio.play(); // Reproducción del audio
        trackRecording.push("./mp3/"+e.target.dataset.id+".mp3"); // Elemento añadido al array de secuencia de sonidos tecleados
    }

    return ( // Impresión de los pads digitales con asignación de las teclas físicas
    <article id="pads" className={userSession != null ? "on" : "off"}>
        <button data-id="pad-1" className="pad" onClick={playSonido}>1</button>
        <button data-id="pad-2" className="pad" onClick={playSonido}>2</button>
        <button data-id="pad-3" className="pad" onClick={playSonido}>3</button>
        <button data-id="pad-4" className="pad" onClick={playSonido}>4</button>
        <button data-id="pad-q" className="pad" onClick={playSonido}>Q</button>
        <button data-id="pad-w" className="pad" onClick={playSonido}>W</button>
        <button data-id="pad-e" className="pad" onClick={playSonido}>E</button>
        <button data-id="pad-r" className="pad" onClick={playSonido}>R</button>
        <button data-id="pad-a" className="pad" onClick={playSonido}>A</button>
        <button data-id="pad-s" className="pad" onClick={playSonido}>S</button>
        <button data-id="pad-d" className="pad" onClick={playSonido}>D</button>
        <button data-id="pad-f" className="pad" onClick={playSonido}>F</button>
        <button data-id="pad-z" className="pad" onClick={playSonido}>Z</button>
        <button data-id="pad-x" className="pad" onClick={playSonido}>X</button>
        <button data-id="pad-c" className="pad" onClick={playSonido}>C</button>
        <button data-id="pad-v" className="pad" onClick={playSonido}>V</button>
    </article>
    )
}

function MixPads() { // Función para la sección de Mix de Pads de la web
    return ( // Impresión de los componentes "controles" y "pads" dentro de la sección "mixPads" 
        <section id="mixPads">
            <Controles />
            <Pads />
        </section>
    )
  
}


/* EXPORTACIONES */

export default MixPads;