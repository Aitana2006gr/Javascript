function Persona(nombre, apellidos, anio) { //A los atributos se les suele poner "_" delante del nombre
    this._nombre = nombre;
    this._apellidos = apellidos;
    this._anio = anio;
}
//El prototipo es la estructura interna
Persona.prototype.saluda = function (aAlguien) {
    console.log("Muy buenas a " + aAlguien)

}
let protPersona01 = new Persona("Ana", "Gómez Salvarey", 2004)

Object.defineProperties(Persona.prototype,
    {
        nombre: {
            set: function (nuevoNombre) {
                if (nuevoNombre.lenght > 3) {
                    this._nombre = nuevoNombre;
                }
            },
            get: function () {
                return this._nombre;
            }
        },


    }
);