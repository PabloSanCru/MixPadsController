function validationSign(param){
    let error = {};

    let emailFilter = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;

    param.username === "" ? error.username = "Introduzca un usuario" : error.username = "";
    param.name === "" ? error.name = "Introduzca un nombre" : error.name = "";

    if(param.email === ""){
        error.email = "Introduzca un email";
    }else if(!emailFilter.test(param.email)){
        error.email = "Email no válido";
    }else{
        error.email = "";
    }
    param.password === "" ? error.password = "Introduzca una contraseña" : error.password = "";

    return error;
}

export default validationSign;