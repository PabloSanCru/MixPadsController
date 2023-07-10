import React, {useState, useEffect} from "react";
import axios from "axios";

const userSession = localStorage.getItem("session");
let trackRecording = [];

function Controles() {
    const [rec, setRec] = useState(false);

    async function enviarGrabacion(){
        const track = JSON.stringify(trackRecording);
        const recordData = {userSession, track};
        axios.post("https://mixpads-controller-server.onrender.com/track/record", recordData)
        .then(res => (res.data === true ? window.location.reload() : ""));
        trackRecording = [];
    }

    function grabar(){
        if(rec === false){
            setRec(true);
            trackRecording = [];
        }else{
            setRec(false);
            console.log(trackRecording.length);
            if(trackRecording.length >= 1){
                enviarGrabacion();
            }
        }
    }

    return (
        <article id="controles" className={rec === true ? "recording" : "no-recording"}>
            {userSession ? <button name="recBoton" id="recBoton" onClick={grabar}>REC</button> : <div id="recBoton"></div> }
        </article>
    )
    
}

function Pads() {
    async function playSonidoKey(e){
        if(e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4" || e.key === "q" || e.key === "w" || e.key === "e" || e.key === "r" || e.key === "a" || e.key === "s" || e.key === "d" || e.key === "f" || e.key === "z" || e.key === "x" || e.key === "c" || e.key === "v"){
            let audio = new Audio("./mp3/pad-"+e.key+".mp3");
            audio.play();
            trackRecording.push("./mp3/pad-"+e.key+".mp3");
        }
    }
    
    useEffect(() => {
        if(userSession != null){
            window.addEventListener("keydown", playSonidoKey);
        }
    }, []);

    async function playSonido(e){
        let audio = new Audio("./mp3/"+e.target.dataset.id+".mp3");
        audio.play();
        trackRecording.push("./mp3/"+e.target.dataset.id+".mp3");
    }

    return (
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

function App() {

    return(
        <section id="mixPads">
            <Controles />
            <Pads />
        </section>
    )
  
}

export default App;
