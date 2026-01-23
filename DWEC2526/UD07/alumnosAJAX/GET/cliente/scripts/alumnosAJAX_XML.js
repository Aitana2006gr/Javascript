window.addEventListener("load", principal, false);
var misAlumnos = [];

function principal(elEvento) {
    var evento = window.evento || elEvento;

    var miXHR = new XMLHttpRequest();
    miXHR.onreadystatechange = miXHRCambiaEstado;
    var miURL = "../servidor/alumnos_xml.php?";
    var parametros = "nombre=Lorena&nota_media=4";
    miXHR.open("GET", miURL + parametros);
    miXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    miXHR.send(null);
}

function miXHRCambiaEstado(elEvento) {
    var evento = window.evento || elEvento;

    if ((this.readyState === 4) && (this.status === 200)) {
        console.log(this.responseXML);

        var misAlumnosServidor = this.responseXML.getElementsByTagName("alumno");

        for (var i = 0; i < misAlumnosServidor.length; i++) {
            var alumnoNuevo = new Alumno();
            alumnoNuevo.setCodigo(misAlumnosServidor[i].getElementsByTagName("codigo")[0].innerHTML);
            alumnoNuevo.setNombre(misAlumnosServidor[i].getElementsByTagName("nombre")[0].innerHTML);
            alumnoNuevo.setApellidos(misAlumnosServidor[i].getElementsByTagName("apellidos")[0].innerHTML);
            alumnoNuevo.setFecha_nacimiento(misAlumnosServidor[i].getElementsByTagName("fecha_nacimiento")[0].innerHTML);
            alumnoNuevo.setCurso(misAlumnosServidor[i].getElementsByTagName("curso")[0].innerHTML);
            alumnoNuevo.setNota_media(misAlumnosServidor[i].getElementsByTagName("nota_media")[0].innerHTML);
            misAlumnos.push(alumnoNuevo);
        }
    }

    for (var i = 0; i < misAlumnos.length; i++) {
        console.log(misAlumnos[i].toString());
    }
}