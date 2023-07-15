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

  render(){ // Renderización de las canciones del usuario en el elemento
    if(this.state.dataRead === false){
      return (
        <div id="trackList">
          <p>Cargando...</p>
        </div>
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

  render(){
    console.log(this.state.dataRead);
    console.log(this.state.dataTrack);
    if(this.state.dataRead === false){
      return (
        <p>Cargando...</p>
      )
    }else{
      if(this.state.dataTrack.length !== 0){
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
      }else{
        return (
          <p>Graba tu primer track!</p>
        )
      } 
    }   
  }

}


/* EXPORTACIONES */

export default TrackItem;