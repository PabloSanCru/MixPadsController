/* IMPORTACIONES */

import React, {useState} from "react";
import axios from "axios"; // Módulo para la conexión y envío de peticiones


/* FUNCIÓN */

function Signup() {
  const [newuser, setNewuser] = useState({username:"", name:"", email:"", password:""}); // Registro de los datos del nuevo usuario
  const [loading, setLoading] = useState(false); // Recurso de carga

  function inputChange ({target}) { // Configuración de los datos del usuario con los datos introducidos en el formulario
    const {name, value} = target;
    setNewuser({...newuser,[name]:value})
  }

  async function enviarDatos(event) { // Envío de datos al servidor para la creación de un nuevo usuario en la base de datos y realización automática de inicio de la sesión
    event.preventDefault();
    setLoading(true); // Configuración del recurso de carga mientras se procesa el registro
    const consulta = await axios.post("https://mixpads-controller-server.onrender.com/user/signup", newuser);
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

  return ( // Impresión del formulario de registro
    <div id="signup">
      <h1>SignUp</h1>
      <form method="post">
        <input type="text" name="username" className="form" placeholder="Usuario" value={newuser.username} onChange={inputChange}/><br/>
        <input type="text" name="name" className="form" placeholder="Nombre" value={newuser.name} onChange={inputChange}/><br/>
        <input type="email" name="email" className="form" placeholder="Email" value={newuser.email} onChange={inputChange}/><br/>
        <input type="password" name="password" className="form" placeholder="Contraseña" value={newuser.password} onChange={inputChange}/><br/>
        { loading === false ?
          <button onClick={enviarDatos}>SignUp</button>
        :
          <p>Cargando...</p>
        }
      </form>
    </div>
  )
}


/* EXPORTACIONES */

export default Signup;
