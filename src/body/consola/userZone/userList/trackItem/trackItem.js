import React, {Component} from "react";
import axios from "axios";
const userSession = localStorage.getItem("session");

class TrackItem extends Component {
  constructor(props){
      super(props)
      this.state = {
        dataTrack: [],
        selectedRadioInput: "",
        dataRead: false
      }
  };
  
  async getList(){
    const consulta = await axios.post("https://mixpads-controller-server.onrender.com/track/readList", {userSession});
    console.log(this.state.dataRead);
    let response = consulta.data;
    response != null ? this.setState({dataRead : true}) : "";
    console.log(this.state.dataRead);
    this.setState({dataTrack : response});
  }

  componentDidMount(){
    this.getList();
  }

  render(){
    return (
      this.state.dataRead === false ? 
        <p>Cargando...</p>
      :
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

export default TrackItem;