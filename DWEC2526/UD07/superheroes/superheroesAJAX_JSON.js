window.addEventListener("load", principal, false);
var misSuperheroes = [];
function principal(e) {
    document.getElementById("btnBuscar").addEventListener("click", funcionBuscar);
}

function funcionBuscar(e) {
    let parametros = recogerParametros();
    let miXHR=new XMLHttpRequest();
    miXHR.onreadystatechange=miXHRCambiaEstado;
    let miURL="../servidor/alumnos_json.php=nocache="+Math.random()+"&";
    //Importante con colocarlo con la ruta relativa, 
    // que al ser un js pegado en el index pk es su script, esta en el mismo nivel en cuanto a estructura de carpetas.

    let consultaCompleta=miURL+parametros; //Esta es la consulta
    //console.log(consultaCompleta);
    miXHR.open("GET",consultaCompleta); //Si es en formato POST, lo cambio aqui

    //Asigno el cabecero
    miXHR.setRequestHeader("Content-type","application/x-www-form-urlencoded"); //Si es un XML en vez de un JSON, cambio esta linea
    miXHR.send(null);
    
}

function recogerParametros() {
    let resultado = "";
    if (document.getElementById("inNombre".value !="")) {
        resultado+="nombre="+document.getElementById("inNombre").value+"&";
    }
    if (document.getElementById("inApellidos".value !="")) {
        resultado+="apellidos="+document.getElementById("inApellidos").value+"&";
    }
    if (document.getElementById("inFecha".value !="")) {
        resultado+="fecha_nacimiento="+document.getElementById("inFecha").value+"&";
    }
    if (document.getElementById("inCurso".value !="")) {
        resultado+="curso="+document.getElementById("inCurso").value+"&";
    }
    if (document.getElementById("inNotaMedia".value !="")) {
        resultado+="nota_media="+document.getElementById("inNotaMedia").value+"&";
    }
    //console.log(resultado)
    return resultado;
}

function miXHRCambiaEstado(e){
    console.log(this.responseText);
    console.warn(this.state);
    console.error(this.readyState);
}


