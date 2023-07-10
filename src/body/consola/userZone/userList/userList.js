import React, {useState} from "react";
import axios from "axios";
import TrackItem from "./trackItem/trackItem";
//const userSession = localStorage.getItem("session");

function UserList(){
  const [trackitem, setTrackitem] = useState();

  function setValue(event){
    setTrackitem(event.target.value);
  }

  function playTrackArray(array){
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

  async function editTrack(event) {
    event.preventDefault();
    if(trackitem != null){
      const newTrack = prompt("Nuevo nombre del track");
      if(newTrack != null){
        const newTrackData = {trackitem, newTrack};
        axios.post("https://mixpads-controller-server.onrender.com/track/update", newTrackData)
        .then(res => (res.data === true ? window.location.reload() : ""))
      }
    }
  }
  
  function playTrack(event) {
    event.preventDefault();
    if(trackitem != null){
      axios.post("https://mixpads-controller-server.onrender.com/track/play", {data: trackitem})
      .then(res => {
        playTrackArray(res.data[0].track)})
    }
  }

  async function deleteTrack(event) {
    event.preventDefault();
    if(trackitem != null){
      axios.post("https://mixpads-controller-server.onrender.com/track/delete", {data: trackitem})
      .then(res => (res.data === true ? window.location.reload() : ""))
    }
  }

  return (
    <form method="post" id="trackController" onChange={setValue}>
      <TrackItem/>
      <div id="trackSettings">
        <button type="button" value="editTrack" onClick={editTrack}>
          <img id="editicon" src="img/edit_w.svg" alt="" value="deleteTrack"/>
        </button>
        <button type="submit" value="playTrack" onClick={playTrack} >
          <img id="playicon" src="img/play_w.svg" alt=""/>
        </button>
        <button type="button" value="deleteTrack" onClick={deleteTrack}>
          <img id="deleteicon" src="img/delete_w.svg" alt=""/>
        </button>
      </div>
    </form>
  )
}

export default UserList;