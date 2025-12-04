//AITANA GÓNZÁLEZ RODRÍGUEZ
//EJERCICIO 3:
//Define una aplicación que genere una colección aleatoria de instancias mediante objetos
//literales de Personas. Cada una de estas instancias deberá tener: nombre, apellidos, fecha de
//nacimiento, id y email.
//Además, tendrá:
//• toString: función que devuelve todos los parámetros con su nombre y valor en una
//nueva línea
//• concatenar: función que devolverá todos los valores de los parámetros separados
//por la cadena de texto indicada como argumento de entrada de la función.

//Asigno la función principal para que se ejecute cuando la página cargue
window.onload = principal;

//Función crearPersona que devuelve un objeto con datos aleatorios y un id específico
function crearPersona(id) {
    //Coloco datos en los arrays para elegir al azar
    const nombres = ["Ana", "Luis", "María", "Carlos", "Lucía", "Carmen", "Gabriel", "Fernanda"];
    const apellidos = ["Pérez", "Gómez", "López", "Martínez", "Sánchez", "Gallán", "González", "García"];

    //Selecciono un nombre y un apellido al azar del array
    //Math.random() genera un número entre 0 y 1, que se multiplica por la longitud del array
    //Math.floor() redondea hacia abajo para obtener un índice entero válido
    const nombreElegido = nombres[Math.floor(Math.random() * nombres.length)];
    const apellidoElegido = apellidos[Math.floor(Math.random() * apellidos.length)];

    //Utilizo las tres primeras letras del nombre y el apellido con .substring(0, 3) o .slice(0, 3) para generar un gmail
    const inicioNombre = nombreElegido.substring(0, 3).toLowerCase();
    const inicioApellido = apellidoElegido.substring(0, 3).toLowerCase();

    //Creo el nuevo email usando también el id para asegurar que sea único
    const nuevoEmail = `${inicioNombre}${inicioApellido}${id}@gmail.com`;

    //Defino el objeto persona
    let persona = {
        //Propiedades de la persona
        nombre: nombreElegido,
        apellidos: apellidoElegido,
        fecha: generarFechaAleatoria(), //Llamo a la función auxiliar para obtener una fecha de nacimiento
        id: id,
        email: nuevoEmail, //Asigno el email generado

        //Método toString personalizado que devuelve una cadena con los datos y saltos de línea
        toString() {
            return (
                `Nombre: ${this.nombre}\n` +
                `Apellidos: ${this.apellidos}\n` +
                `Fecha: ${this.fecha}\n` +
                `ID: ${this.id}\n` +
                `Email: ${this.email}`
            );
        },

        //Método concatenar(separador) que devuelve una sola cadena uniendo todos los datos de la persona con el separador
        concatenar(separador) {
            //Creo un arrray con todas las propiedades y uso el método join para unirlas mediante el separador
            return [this.nombre, this.apellidos, this.fecha, this.id, this.email].join(separador);
        }
    };

    return persona;
}

//Función generarFechaAleatoria que genera una cadena de fecha aleatoria en formato YYYY-MM-DD
function generarFechaAleatoria() {
    //Genero un año entre 1945 y 2006, un rango de 62 años
    const año = 1945 + Math.floor(Math.random() * 62);
    //Genero un mes, lo convierto a string y uso el padstart para asegurar que siempre tiene 0 dígitos
    const mes = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
    //Genero un día del 1 a 28, para evitar problemas con los meses 
    const dia = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');
    return `${año}-${mes}-${dia}`;
}

//Función principal que se ejecuta al cargar la página, crea las personas y muestra los resultados en el DOM
function principal() {
    const salida = document.getElementById("salida");
    salida.innerHTML = "";

    //Creo 5 personas aleatorias
    const personas = [];
    for (let i = 1; i <= 5; i++) {
        personas.push(crearPersona(i));
    }

    //Muestro cada persona
    salida.innerHTML += `<h3>Personas generadas:</h3>`;
    personas.forEach(p => {
        salida.innerHTML += `<pre>${p.toString()}</pre>`;
        salida.innerHTML += `<p>Concatenado con "-": ${p.concatenar(" - ")}</p><hr>`;
    });
}
