/* IMPORTACIONES */

import React, {useState} from "react";
import axios from "axios"; // Módulo para la conexión y envío de peticiones
import TrackItem from "./trackItem/trackItem";


/* FUNCIÓN */

function UserList(){
  const [trackitem, setTrackitem] = useState(); // Recurso de input seleccionado

  function setValue(event){ // Configuración del recurso con el valor del input seleccionado
    setTrackitem(event.target.value);
  }

  async function playTrackArray(array){ // Función de reprodución de un array de sonidos (secuencia). Cada sonido de la secuencia se reproduce en un intervalo de 400ms 
    let i = 0;
    let audio = JSON.parse(array);
    let intervalo =	setInterval(() => {
      if(i < audio.length){
        let musica = new Audio(audio[i]);
        musica.play();
        i++;
      }else{
        clearInterval(intervalo);
        i = 0;
      }
    }, 400);
  }

  async function editTrack(event) { // Edición del track seleccionado del formulario
    event.preventDefault();
    if(trackitem != null){ // Si hay un track selecionado, emite una ventana emergenet donde introducir el nuevo nombre
      const newTrack = prompt("Nuevo nombre del track");
      if(newTrack != null){ // Si se ha introducido un nuevo nombre, realiza una consulta para cambiar el nombre en la base de datos y recarga la página par imprimir las actualizaciones
        const newTrackData = {trackitem, newTrack};
        const consulta = await axios.post("https://mixpads-controller-server.onrender.com/track/update", newTrackData);
        if(consulta.data === true){window.location.reload()}
      }
    }
  }
  
  async function playTrack(event) { // Reproducción del track seleccionado del formulario
    event.preventDefault();
    if(trackitem != null){ // Si hay un track selecionado, realiza una consulta para recuperar dicha secuencia de la base de datos y ejecuta la función de reproducción de array de sonidos
      const consulta = await axios.post("https://mixpads-controller-server.onrender.com/track/play", {data: trackitem});
      if(consulta.data !== false){playTrackArray(consulta.data[0].track)}
    }
  }

  async function deleteTrack(event) { // Borrado del track seleccionado del formulario
    event.preventDefault();
    if(trackitem != null){ // Si hay un track selecionado, realiza una consulta para eliminar dicho track de la base de datos y posteriormente recarga la página para imprimir la lista de tracks actualizada
      const consulta = await axios.post("https://mixpads-controller-server.onrender.com/track/delete", {data: trackitem});
      if(consulta.data === true){window.location.reload()}
    }
  }

  return ( // Impresión del componente "TrackItem" (elementos input del formulario) junto con los 3 botones para las distintas funciones del formulario (editar, reproducir y borrar)
    <form method="post" id="trackController" onChange={setValue}>
      <TrackItem/>
      <div id="trackSettings">
        <button type="button" value="editTrack" onClick={editTrack}>
          <img id="editicon" src="img/edit_w.svg" alt="Editar track"/>
        </button>
        <button type="submit" value="playTrack" onClick={playTrack} >
          <img id="playicon" src="img/play_w.svg" alt="Reproducir track"/>
        </button>
        <button type="button" value="deleteTrack" onClick={deleteTrack}>
          <img id="deleteicon" src="img/delete_w.svg" alt="Borrar track"/>
        </button>
      </div>
    </form>
  )
}


/* EXPORTACIONES */

export default UserList;