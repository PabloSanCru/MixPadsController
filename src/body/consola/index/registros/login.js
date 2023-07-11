import React, {useState} from "react";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({username:"", password:""});
  const [loading, setLoading] = useState(false);

  function inputChange ({target}) {
    const {name, value} = target;
    setUser({...user,[name]:value})
  }

  async function enviarDatos (event) {
    event.preventDefault();
    setLoading(true);
    const consulta = await axios.post("https://mixpads-controller-server.onrender.com/user/login", user);
    setLoading(false);
    await localStorage.setItem("session", consulta.data);
    const userSession = await localStorage.getItem("session");
    if(userSession != null){
     window.location.reload();
    }
  }

  return (
    loading === false ?
      <div id="login">
        <h1>Login</h1>
        <form action="" method="post">
          <input type="text" name="username" className="form" placeholder="Usuario" value={user.username} onChange={inputChange}/><br/>
          <input type="password" name="password" className="form" placeholder="Contraseña" value={user.password} onChange={inputChange}/><br/>
          <button onClick={enviarDatos}>Login</button>
        </form>
      </div>
    :
      <div id="login">
        <h1>Login</h1>
        <p>Cargando...</p>
      </div>
  )
}

export default Login;