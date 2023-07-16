function validationLog(param){
    let error = {};

    param.username === "" ? error.username = "Introduzca un usuario" : error.username = "";
    param.password === "" ? error.password = "Introduzca una contraseña" : error.password = "";

    return error;
}

export default validationLog;