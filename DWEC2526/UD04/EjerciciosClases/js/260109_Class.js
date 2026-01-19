class TrabajadorClase {
    constructor(nombreCompleto, salario) {
        this._nombreCompleto = nombreCompleto;
        this._salario = salario;
    }
    constructor() {
        this._nombreCompleto = "Sin nombre ni apellidos";
        this._salario = 0;
    }

    set setNombreCompleto(nombre) {
        if (this.verificarTexto(texto) == true) {
            this._nombre = nombre;
        }
    }

    get getNombreCompleto() {
        return this._nombreCompleto;
    }

    get getSalario() {
        return this._salario;
    }

    toString() {
        return cadena = "Trabajador: ", this._nombreCompleto, "Cobra: ", this._salario, " euros";
    }

    aumentarSalario(aumento) {
        if (aumento)
            return;
    }

    verificarSalario(salario) {
        return;
    }

    verificarTexto(texto) {
        if (texto.lenght > 6 && texto) {

        }
        return;
    }
}

class DirectivoClase extends TrabajadorClase{
    constructor(cargo) {
        super();
        this._cargo=cargo;
    }
    
    constructor() {
        super();
        this._cargo="Escogido a dedo";
    }
    constructor() {
        this._nombreCompleto = "Sin nombre ni apellidos";
        this._salario = 0;
    }

    set setNombreCompleto(nombre) {
        if (this.verificarTexto(texto) == true) {
            this._nombre = nombre;
        }
    }

    get getNombreCompleto() {
        return this._nombreCompleto;
    }

    get getSalario() {
        return this._salario;
    }

    toString() {
        return cadena = "Trabajador: ", this._nombreCompleto, "Cobra: ", this._salario, " euros";
    }

    aumentarSalario(aumento) {
        if (aumento)
            return;
    }

    verificarSalario(salario) {
        return;
    }

    verificarTexto(texto) {
        if (texto.lenght > 6 && texto) {

        }
        return;
    }
}