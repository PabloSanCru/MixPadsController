import React, {useState} from "react";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({username:"", password:""});
  //const [errors, setErrors] = useState({});

  function inputChange ({target}) {
    const {name, value} = target;
    setUser({...user,[name]:value})
  }

  async function enviarDatos (event) {
    event.preventDefault();
    //const err = validation(user);
    //setErrors(err);
    //if(err.usuario === "" && err.password === ""){
      const consulta = await axios.post("https://mixpads-controller-server.onrender.com/user/login", user);
      const setuserSession = await localStorage.setItem("session", consulta.data);
      const userSession = await localStorage.getItem("session");
      console.log(userSession);
      if(userSession != null){
        window.location.reload();
      }
    //}
  }
  return (
    <div id="login">
      <h1>Login</h1>
      <form action="" method="post">
        <input type="text" name="username" className="form" placeholder="Usuario" value={user.username} onChange={inputChange}/><br/>
        <input type="password" name="password" className="form" placeholder="Contraseña" value={user.password} onChange={inputChange}/><br/>
        <button onClick={enviarDatos}>Login</button>
      </form>
    </div>
  )
}

export default Login;