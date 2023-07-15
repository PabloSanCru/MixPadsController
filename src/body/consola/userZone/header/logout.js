/* FUNCIÓN */

function Logout() {

  function logout() { // Al ejecutar la función, borra los datos de sesión abierta y recarga la página
    localStorage.removeItem("session");
    window.location.reload();
  }

  return ( // Impresión del boton e icono del componente "Logout" 
    <button id="logout" onClick={logout} >
      <img id="flecha" src="img/out_w.svg" alt="logout"/>
    </button>
  )
}


/* EXPORTACIONES */

export default Logout;