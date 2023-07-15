/* IMPORTACIONES */

import React, {useState} from "react";
import axios from "axios"; // Módulo para la conexión y envío de peticiones


/* FUNCIÓN */

function Login() {
  const [user, setUser] = useState({username:"", password:""}); // Registro de los datos del usuario
  const [loading, setLoading] = useState(false); // Recurso de carga

  function inputChange ({target}) { // Configuración de los datos del usuario con los datos introducidos en el formulario
    const {name, value} = target;
    setUser({...user,[name]:value})
  }

  async function enviarDatos (event) { // Envío de datos al servidor para el inicio de la sesión
    event.preventDefault();
    setLoading(true); // Configuración del recurso de carga mientras se procesa el registro
    const consulta = await axios.post("https://mixpads-controller-server.onrender.com/user/login", user);
    if(consulta.status === 200){
      await localStorage.setItem("session", consulta.data);
      const userSession = await localStorage.getItem("session");
      if(userSession != null){
      window.location.reload();
      }else{
        setLoading(false);
      }
    }else{
      setLoading(false);
    }
  }

  return ( // Impresión del formulario de inicio de sesión
    <div id="login">
      <h1>Login</h1>
      <form action="" method="post">
        <input type="text" name="username" className="form" placeholder="Usuario" value={user.username} onChange={inputChange}/><br/>
        <input type="password" name="password" className="form" placeholder="Contraseña" value={user.password} onChange={inputChange}/><br/>
        { loading === false ?
          <button onClick={enviarDatos}>Login</button>
        :
          <p>Cargando...</p>
        }
      </form>
    </div>
  )
}


/* EXPORTACIONES */

export default Login;