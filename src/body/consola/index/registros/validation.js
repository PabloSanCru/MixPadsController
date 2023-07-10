function validation(param){
    let error = {};

    const emailFilter = "/^[^\s@]+@[^\s@]+\.[^\s@]+$/";

    param.username === "" ? error.username = "Introduzca un usuario" : error.username = "";
    param.name === "" ? error.name = "Introduzca un nombre" : error.name = "";
    param.email === "" ? error.email = "Introduzca un email" : error.email = "";
    !emailFilter.test(param.email) ? error.email = "Email no válido" : error.email = "";
    param.password === "" ? error.password = "Introduzca una contraseña" : error.password = "";
}

export default validation;