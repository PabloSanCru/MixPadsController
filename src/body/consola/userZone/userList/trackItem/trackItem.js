import React, {Component} from "react";
import axios from "axios";
const userSession = localStorage.getItem("session");

class TrackItem extends Component {
    constructor(props){
        super(props)
        this.state = {
          dataTrack: [],
          selectedRadioInput: ""
        }
    };
    
    getList(){
      axios.post("https://mixpads-controller-server.onrender.com/track/readList", {userSession})
      .then(res => {
        let response = res.data;
        this.setState({dataTrack : response})
      })
    }

    componentDidMount(){
      this.getList();
    }

    render(){
      return (this.state.dataTrack.length === 0
        ? "Cargando..." :
        <div id="trackList">
            {this.state.dataTrack.map((track, i) => (
                <div>
                  <input type="radio" name="trackList" value={track.id}/>
                  <label htmlFor={track.id}>#{i + 1}/ {track.trackName}</label>
                </div>
              //<option name={track.id} value={track.id}>#{i + 1}/ {track.trackName}</option>
            ))}
        </div>
      )
    }
}

export default TrackItem;