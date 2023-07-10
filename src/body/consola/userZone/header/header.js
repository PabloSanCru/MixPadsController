import Logout from "./logout";
const userSession = localStorage.getItem("session");

function Header(){

    return(
        <header id="header">
            <div id="cabecera">
                <h2>{userSession}</h2>
                <h5>/TRACKLIST</h5>
            </div>
            <Logout />
        </header>
    )
}

export default Header;