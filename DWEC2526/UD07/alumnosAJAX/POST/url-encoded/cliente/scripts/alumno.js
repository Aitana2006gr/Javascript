//// CONSTRUCTOR
function Alumno()
{
    this._codigo;
    this._nombre;
    this._apellidos;
    this._fecha_macimiento;
    this._curso;
    this._nota_media;
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

//// FIN - MÉTODOS