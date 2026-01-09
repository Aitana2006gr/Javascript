class PersonaClase {
    constructor(nombre, apellidos, anio) {
        this.nombre = nombre,
        this.apellidos = apellidos,
        this.anio = anio
    }

    set nombre(nuevoNombre) {
        if (nuevoNombre > 3) {
            this._nombre = this.nombre;
        }
    }

    get nombre() {
        return this._nombre;
    }

    saluda(aAlguien) {
        console.log("Hola, " + aAlguien)
    };
}

let classPersona01 = new Persona("Luis Carlos", "González Moreno", "1973");
