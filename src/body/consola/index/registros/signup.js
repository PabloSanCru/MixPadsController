import React, {useState} from "react";
import axios from "axios";

function Signup() {
  const [newuser, setNewuser] = useState({username:"", name:"", email:"", password:""});
  const [loading, setLoading] = useState(false);

  function inputChange ({target}) {
    const {name, value} = target;
    setNewuser({...newuser,[name]:value})
  }

  async function enviarDatos(event) {
    event.preventDefault();
    setLoading(true);
    const consulta = await axios.post("https://mixpads-controller-server.onrender.com/user/signup", newuser);
    setLoading(false);
    await localStorage.setItem("session", consulta.data);
    const userSession = await localStorage.getItem("session");
    if(userSession != null){
      window.location.reload();
     }
  }

  return (
    loading === false ?
      <div id="signup">
        <h1>SignUp</h1>
        <form method="post">
          <input type="text" name="username" className="form" placeholder="Usuario" value={newuser.username} onChange={inputChange}/><br/>
          <input type="text" name="name" className="form" placeholder="Nombre" value={newuser.name} onChange={inputChange}/><br/>
          <input type="email" name="email" className="form" placeholder="Email" value={newuser.email} onChange={inputChange}/><br/>
          <input type="password" name="password" className="form" placeholder="Contraseña" value={newuser.password} onChange={inputChange}/><br/>
          <button onClick={enviarDatos}>SignUp</button>
        </form>
      </div>
    :
      <div id="signup">
        <h1>SignUp</h1>
        <p>Cargando...</p>
      </div>
  )
}

export default Signup;
