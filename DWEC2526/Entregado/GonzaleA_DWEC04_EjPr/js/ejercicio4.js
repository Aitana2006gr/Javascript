//AITANA GÓNZÁLEZ RODRÍGUEZ
//EJERCICIO 4:
//Define una aplicación que genere una colección aleatoria de instancias mediante objetos
//literales de Vehículos. Cada una de estas instancias deberá tener:
//• tipo: entre coche, moto, camión, lancha ó avioneta
//• marca
//• modelo
//• matrícula
//• kilometros:con valor por defecto 0.
//Además tendrá:
//• toString: función que devuelve todos los parámetros con su nombre y valor en una
//nueva línea
//• concatenar: función que devolverá todos los valores de los parámentros separados
//por la cadena de texto indicada como argumento de entrada de la función.
//• aumentarKM: que aumentará los kilómetros de la instancia en tantos como se indique
//por argumento.
//Opcional:
//Generar todos los setters y getters de los parámetros

//Asigno la función principal para que se ejecute cuando la página cargue
window.onload = principal;

//Función generarVehiculo que crea y devuelve un objeto vehículo
function generarVehiculo() {
    //Arrays de constantes para la generación aleatoria de datos
    const tipos = ["coche", "moto", "camion", "lancha", "avioneta", "furgoneta", "autobús", "todoterreno", "velero", "helicóptero", "tractor", "dron"];
    const marcas = ["Ford", "Honda", "BMW", "Seat", "Yamaha", "Audi", "Toyota", "Tesla", "Nissan", "Ferrari", "Kawasaki", "Volvo Trucks", "Mercedes-Benz"];
    const modelos = ["A1", "X3", "Ibiza", "Corsa", "Wave", "Focus", "Civic", "Model 3", "911", "Huracán", "V-Strom", "Sprinter", "Golf", "Qashqai", "Monster"];

    //Variable interna para almacenar los kilometros. Esta solo se puede acceder o modificar a través de los getters y setters
    let km = 0;

    //Devuelve el objeto que define la estructura del vehículo
    return {
        //Propiedades con valores aleatorios
        tipo: tipos[Math.floor(Math.random() * tipos.length)],
        marca: marcas[Math.floor(Math.random() * marcas.length)],
        modelo: modelos[Math.floor(Math.random() * modelos.length)],
        //Genero una matricula con el prefijo ABC seguido de un numero de tres digitos comenzando desde el 100
        matricula: "ABC" + (Math.floor(Math.random() * 900) + 100),

        //Getters y setters
        //getter para kilometros
        get kilometros() {
            return km;
        },
        //Setter para kilometros, se puede modificar solo si pasa la validación
        set kilometros(nuevoKm) {
            if (nuevoKm >= 0) { //De esta forma, se asegura que el nuevo valor sea 0 o positivo
                km = nuevoKm;
            } else { //Lanza error por consola y aparece el texto de color rojo
                console.error("Los kilómetros no pueden ser negativos.");
            }
        },

        //Métodos
        //Función que aumenta los kilómetros
        aumentarKM(km) {
            //Se usa el setter al llamar a this.kilometros para también hacer la comprobación
            this.kilometros = this.kilometros + km;
        },

        //Función que devuelve una cadena formateada con todos los detalles
        toString() {
            //Formateo para que me devuelva un texto de varias lineas
            return `Tipo: ${this.tipo}
                    Marca: ${this.marca}
                    Modelo: ${this.modelo}
                    Matrícula: ${this.matricula}
                    Kilómetros: ${this.kilometros}`;
        },

        //Función que devuelve todos los valores separados por la cadena indicada
        concatenar(separador) {
            //Creo un array con todos los valores y uso .join() para unirlos
            return [this.tipo, this.marca, this.modelo, this.matricula, this.kilometros].join(separador);
        }
    };
}

//Función principal que es llamada al cargar la página para crear una colección de vehículos, usar sus metodos y mostrar los resultados en el DOM
function principal() {
    // Referencia al elemento de salida en el HTML.
    const salida = document.getElementById("salida");
    salida.innerHTML = "";

    const vehiculos = [];

    // Crear 3 vehículos aleatorios
    for (let i = 0; i < 3; i++) {
        vehiculos.push(generarVehiculo());
    }

    // Aumentar kilómetros al primer vehículo
    vehiculos[0].aumentarKM(150);
    // Demostrar el setter estableciendo un valor directo
    vehiculos[1].kilometros = 5000;

    salida.innerHTML += `<h3>Vehículos generados y modificados:</h3>`;

    // Iterar y mostrar los vehículos
    vehiculos.forEach((v, index) => {
        salida.innerHTML += `<h4>Vehículo ${index + 1} (${v.tipo}):</h4>`;
        // Muestra el resultado de toString()
        salida.innerHTML += `<pre>${v.toString()}</pre>`;
        // Muestra el resultado de concatenar()
        salida.innerHTML += `<p>Concatenado con '|': <b>${v.concatenar(" | ")}</b></p>`;
        salida.innerHTML += `<hr>`;
    });
}
