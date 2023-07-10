function Logout() {

  function logout () {
    localStorage.removeItem("session");
    window.location.reload();
  }

  return (
    <button id="logout" onClick={logout} >
      <img id="flecha" src="img/out_w.svg" alt=""/>
    </button>
  )
}

export default Logout;