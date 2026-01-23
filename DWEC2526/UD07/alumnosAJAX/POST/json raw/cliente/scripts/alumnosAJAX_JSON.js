window.addEventListener("load",principal,false);
var misAlumnos = [];

function principal(elEvento)
{
    var evento = window.evento ||elEvento;

    var miXHR = new XMLHttpRequest();
    miXHR.onreadystatechange = miXHRCambiaEstado;
    var miURL = "../servidor/alumnos_json.php?nocache="+Math.random();
    var parametros = JSON.stringify({nombre: "Lorena", nota_media: 4});
    miXHR.open("POST",miURL+parametros);
    miXHR.setRequestHeader("Content-type","application/json");             // Ojo con el header 
    miXHR.send(parametros);
}

function miXHRCambiaEstado(elEvento)
{
    var evento = window.evento ||elEvento;
    
    if((this.readyState === 4) && (this.status === 200))
    {
        console.log(this.responseText);
        var misAlumnosServidor = JSON.parse(this.responseText);
        
        for(var i=0; i<misAlumnosServidor.length; i++)
        {
            var alumnoNuevo = new Alumno();
            alumnoNuevo.setCodigo(misAlumnosServidor[i].codigo);
            alumnoNuevo.setNombre(misAlumnosServidor[i].nombre);
            alumnoNuevo.setApellidos(misAlumnosServidor[i].apellidos);
            alumnoNuevo.setFecha_nacimiento(misAlumnosServidor[i].fecha_nacimiento);
            alumnoNuevo.setCurso(misAlumnosServidor[i].curso);
            alumnoNuevo.setNota_media(misAlumnosServidor[i].nota_media);
            misAlumnos.push(alumnoNuevo);
        }
    }

    for(var i=0; i<misAlumnos.length; i++)
    {
        console.log(misAlumnos[i].toString());
    }
}