window.addEventListener("load", principal, false);
var misAlumnos = [];
function principal(e) {
    document.getElementById("btnBuscar").addEventListener("click", funcionBuscar);
}

function funcionBuscar(e) {
    let parametros = recogerParametros();
    let miXHR = new XMLHttpRequest();
    miXHR.onreadystatechange = miXHRCambiaEstado;
    let miURL = "../servidor/alumnos_json.php?nocache=" + Math.random() + "&";
    //Importante con colocarlo con la ruta relativa, 
    // que al ser un js pegado en el index pk es su script, esta en el mismo nivel en cuanto a estructura de carpetas.

    let consultaCompleta = miURL + parametros; //Esta es la consulta
    //console.log(consultaCompleta);
    miXHR.open("GET", consultaCompleta); //Si es en formato POST, lo cambio aqui

    //Asigno el cabecero
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //Si es un XML en vez de un JSON, cambio esta linea
    miXHR.send(null);

}

function recogerParametros() {
    let resultado = "";
    if (document.getElementById("inNombre").value != "") {
        resultado += "nombre=" + document.getElementById("inNombre").value + "&";
    }
    if (document.getElementById("inApellidos").value != "") {
        resultado += "apellidos=" + document.getElementById("inApellidos").value + "&";
    }
    if (document.getElementById("inFecha").value != "") {
        resultado += "fecha_nacimiento=" + document.getElementById("inFecha").value + "&";
    }
    if (document.getElementById("inCurso").value != "") {
        resultado += "curso=" + document.getElementById("inCurso").value + "&";
    }
    if (document.getElementById("inNota").value != "") {
        resultado += "nota_media=" + document.getElementById("inNota").value + "&";
    }
    //console.log(resultado)
    return resultado;
}

function miXHRCambiaEstado(e) {
    // console.log(this.responseText);
    // console.warn(this.state);
    // console.error(this.readyState);
    if ((this.status === 200) && (this.readyState === 4)) {

        let alumnosLiterales = JSON.parse(this.responseText);
        //console.log(this.alumnosLiterales);
        for (let i = 0; i < alumnosLiterales.length; i++) {
            let alumnoNuevo = new Alumno(alumnosLiterales[i]);
            misAlumnos.push(alumnoNuevo);
        }
        dibujarTabla();
        console.log(misAlumnos);
    }
    //console.log(misAlumnos); si lo coloco aqui fuera, se imprime en cada cambio de estado(2,3 y 4)
}

function dibujarTabla(){
    let cuerpoTabla=document.getElementById("cuerpoTabla");
    cuerpoTabla.innerHTML=""; //para limpiar
    for (let i=0; i<misAlumnos.length; i++){
        cuerpoTabla.innerHTML+=misAlumnos[i].toTR();
    }

}




// window.addEventListener("load", principal, false);
// var misAlumnos = [];
// let misAlumnosServidor;

// function principal(elEvento) {
//     var evento = window.evento || elEvento;

//     var miXHR = new XMLHttpRequest();
//     miXHR.onreadystatechange = miXHRCambiaEstado;
//     var miURL = "../servidor/alumnos_json.php?nocache=" + Math.random() + "&";
//     //nocache="+Math.random()+"&" con esto ya no esta cacheada la respuesta

//     // /JAVASCRIPT/DWEC2526/UD07/alumnosAJAX/GET/servidor/alumnos_json.php
//     //http://localhost/JAVASCRIPT/DWEC2526/UD07/alumnosAJAX/GET/servidor/alumnos_json.php?nombre=Lorena&nota_media=7
//     var parametros = "nombre=Lorena&nota_media=4";
//     miXHR.open("GET", miURL + parametros);
//     miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     miXHR.send(null);
// }

// function miXHRCambiaEstado(elEvento) {
//     var evento = window.evento || elEvento;

//     if ((this.readyState === 4) && (this.status === 200)) //Aqui es si esta ya preparada la respuesta y el estado es 200 que esta todo correcto
//     {
//         console.log(this.responseText);
//         misAlumnosServidor = JSON.parse(this.responseText); //Aqui tengo un array con objetos literales de toda la respuesta
//         for (var i = 0; i < misAlumnosServidor.length; i++) {
//             var alumnoNuevo = new Alumno();
//             alumnoNuevo.setCodigo(misAlumnosServidor[i].codigo);
//             alumnoNuevo.setNombre(misAlumnosServidor[i].nombre);
//             alumnoNuevo.setApellidos(misAlumnosServidor[i].apellidos);
//             alumnoNuevo.setFecha_nacimiento(misAlumnosServidor[i].fecha_nacimiento);
//             alumnoNuevo.setCurso(misAlumnosServidor[i].curso);
//             alumnoNuevo.setNota_media(misAlumnosServidor[i].nota_media);
//             misAlumnos.push(alumnoNuevo);
//         }
//     }

//     for (var i = 0; i < misAlumnos.length; i++) {
//         console.log(misAlumnos[i].toString());
//     }
// }