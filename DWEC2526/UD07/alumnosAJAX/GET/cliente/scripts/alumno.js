//// CONSTRUCTOR
//function Alumno()
function Alumno(alumnoNuevo)
{
    this._codigo=alumnoNuevo.codigo || ""; // las comillas es que si no se introduce valor, es el por defecto
    this._nombre =alumnoNuevo.nombre || "";
    this._apellidos= alumnoNuevo.apellidos || "";
    this._fecha_nacimiento=alumnoNuevo.fecha_nacimiento || "" ; //El campo es fecha_nacimiento
    this._curso =alumnoNuevo.curso || ""; 
    this._nota_media=alumnoNuevo.nota_media || ""; //El campo es nota_media
}

//// FIN - CONSTRUCTOR

//// SETTERS Y GETTERS

Alumno.prototype.setCodigo = function(codigo)
{
    this._codigo = codigo;
};

Alumno.prototype.getCodigo = function()
{
    return this._codigo;
};

Alumno.prototype.setNombre = function(nombre)
{
    this._nombre = nombre;
};

Alumno.prototype.getNombre = function()
{
    return this._nombre;
};

Alumno.prototype.setApellidos = function(apellidos)
{
    this._apellidos = apellidos;
};

Alumno.prototype.getApellidos = function()
{
    return this._apellidos;
};

Alumno.prototype.setFecha_nacimiento = function(fecha)
{
    this._fecha_nacimiento = fecha;
};

Alumno.prototype.getFecha_nacimiento = function()
{
    return this._fecha_nacimiento;
};

Alumno.prototype.getCurso = function()
{
    return this._curso;
};

Alumno.prototype.setCurso = function(curso)
{
    this._curso = curso;
};

Alumno.prototype.setNota_media = function(nota) 
{
    this._nota_media = nota;
};

Alumno.prototype.getNota_media = function() 
{
    return this._nota_media;
};

//// FIN - SETTERS Y GETTERS

//// MÉTODOS

Alumno.prototype.toString = function()
{
    return this._nombre + " " + this._apellidos;
}

Alumno.prototype.toTR= function()
{
    let resultado="<tr>";
    resultado+="<td>"+this._codigo+"</td>";
    resultado+="<td>"+this._apellidos+"</td>";
    resultado+="<td>"+this._nombre+"</td>";
    resultado+="<td>"+this._fecha_nacimiento+"</td>";
    resultado+="<td>"+this._curso+"</td>";
    resultado+="<td>"+this._nota_media+"</td>";
    resultado+="</tr>";
    return resultado;
}

//Añadir distintos métodos de ordenación


//// FIN - MÉTODOS