/* IMPORTACIONES */

import React, {useState} from "react";
import axios from "axios"; // Módulo para la conexión y envío de peticiones
import validationLog from "./validationLog"; // Módulo para la validación de formulario


/* FUNCIÓN */

function Login() {
  const [user, setUser] = useState({username:"", password:""}); // Registro de los datos del usuario
  const [loading, setLoading] = useState(false); // Recurso de carga
  const [errores, setErrores] = useState({}); // Recurso para configuración de errores

  function inputChange ({target}) { // Configuración de los datos del usuario con los datos introducidos en el formulario
    const {name, value} = target;
    setUser({...user,[name]:value})
  }

  async function enviarDatos (event) { // Envío de datos al servidor para el inicio de la sesión
    event.preventDefault();
    setLoading(true); // Configuración del recurso de carga mientras se procesa el registro
    setErrores(validationLog(user)); // Configuración de errores
    if(errores.username === "" && errores.password === ""){
      const consulta = await axios.post("https://mixpads-controller-server.onrender.com/user/login", user); // Conexión con el servidor y realización de la petición
      if(consulta.data === user.username){
        await localStorage.setItem("session", consulta.data);
        window.location.reload();
      }else{
        setErrores({server: consulta.data});
      }
    }
    setLoading(false);
  }

  return ( // Impresión del formulario de inicio de sesión y errores si los hubiese
    <div id="login">
      <h1>Login</h1>
      <form action="" method="post">
        <input type="text" name="username" className="form" placeholder="Usuario" value={user.username} onChange={inputChange}/><br/>
        {errores.username && <span className="error">{errores.username}</span>}
        <input type="password" name="password" className="form" placeholder="Contraseña" value={user.password} onChange={inputChange}/><br/>
        {errores.password && <span className="error">{errores.password}</span>}
        {errores.server && <span className="error">{errores.server}</span>}
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