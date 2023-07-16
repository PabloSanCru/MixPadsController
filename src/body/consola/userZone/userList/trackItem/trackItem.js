/* IMPORTACIONES */

import React, {Component} from "react";
import axios from "axios"; // Módulo para la conexión y envío de peticiones


/* ELEMENTOS */

const userSession = localStorage.getItem("session"); // Recepción de la información de logueo del usuario


/* ELEMENTO */

class TrackItem extends Component {
  constructor(props){
      super(props)
      this.state = { // Propiedades de estado del componente TrackItem
        dataTrack: [1],
        selectedRadioInput: "",
        dataRead: "", // Recurso de carga
      }
  };
  
  async getList(){ // Consulta de seciencias de sonidos grabadas en el perfil del usuario logueado
    this.setState({dataRead : false})
    const consulta = await axios.post("https://mixpads-controller-server.onrender.com/track/readList", {userSession});
    await this.setState({dataTrack : consulta.data});
    this.setState({dataRead : true})
  }

  componentDidMount(){ // Al cargar la página, ejecuta la función de búsqueda de secuencias
    this.getList();
  }

  render(){ // Renderización de las canciones del usuario o de la respuesta del servidor en caso de no tenerlas o de haber un fallo en el servidor
    if(this.state.dataRead === false){
      return (
        <p>Cargando...</p>
      )
    }else{
      if(this.state.dataTrack === "Error en el servidor" || this.state.dataTrack === "Graba tu primer track!"){
        return (
          <p>{this.state.dataTrack}</p>
        )
      }else{
        return (
          <div id="trackList">
            {this.state.dataTrack.map((track, i) => (
              <div>
                <input type="radio" name="trackList" value={track.id}/>
                <label htmlFor={track.id}>#{i + 1}/ {track.trackName}</label>
              </div>
            ))}
          </div>
        )
      }
    }   
  }
}


/* EXPORTACIONES */

export default TrackItem;