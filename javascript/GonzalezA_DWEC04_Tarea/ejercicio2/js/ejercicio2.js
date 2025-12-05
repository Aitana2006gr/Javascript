//AITANA GÓNZÁLEZ RODRÍGUEZ
//Script que crea y muestra los objetos con herencia por prototipos.

//Hago el import de las funciones del ejercicio a este script principal
import { Electrodomestico, Lavadora} from "./funciones.js";

//Función para mostrar el contenido, la diferencia es que este añade el resto de los mensajes con el +=
//NOTA: Esta función se define localmente aquí para asegurar que los mensajes se concatenen
function mostrar(mensaje) {
    const salida = document.getElementById("salida");
    //Uso += para añadir el nuevo contenido
    salida.innerHTML += `<div>${mensaje}</div>`;
}

//Cuando la página HTML ha cargado completamente, se ejecuta la función principal
document.addEventListener("DOMContentLoaded", principal);

//FUNCIÓN PRINCIPAL
//Creo y testeo las instancias de Electrodomestico y Lavadora
function principal() {

    //ELECTRODOMÉSTICO
    mostrar("<hr><h3>DEMOSTRACIÓN: CLASE ELECTRODOMESTICO</h3>");
    const e = new Electrodomestico();//Creo el objeto
    mostrar("Electrodoméstico 1 creado con valores por defecto:");
    mostrar(e.toString()); //Muestro sus datos

    //Asigno valores
    e.ID = "ELEC - ABC123";
    e.Modelo = "MODELOX"; //Longitud de la cadena >= 6
    e.Consumo = 4; //Entero >= 1

    mostrar("<br>Electrodoméstico 1 actualizado:");
    mostrar(e.toString()); //Muestro los valores actualizados

    //Cálculo de consumo
    mostrar(`Consumo de 3 horas: ${e.calcularConsumo(3)} kW`);

    //Compruebo las fallidas (el objeto NO cambia)
    e.Consumo = 0.5; //No es entero >= 1
    e.Modelo = "MOD"; //Longitud de la cadena < 6
    mostrar("<br>Después de intentos:");
    mostrar(e.toString()); //El consumo y el modelo siguen siendo 4 y MODELOX

    //LAVADORA
    mostrar("<hr><h3>DEMOSTRACIÓN: CLASE LAVADORA (HERENCIA)</h3>");
    
    //Creo el objeto
    const l = new Lavadora();

    //Asigno valores del padre (Electrodomestico)
    l.ID = "ELEC - LAV01";
    l.Modelo = "LAVAMAX";
    l.Consumo = 5;

    //Asigno valores propios de Lavadora
    l.Capacidad = 8;
    l.BajoConsumo = true; //Activa el descuento del 50%
    l.TipoCarga = 1; //1 = Lateral

    mostrar("Lavadora 1 creada:");
    mostrar(l.toString()); //Llama al toString() sobrescrito
    mostrar(`Tipo de carga textual: ${l.TipoCargaTexto}`);

    //Prueba de cálculo de consumo con bajoConsumo
    const consumo_con_descuento = l.calcularConsumo(4);
    mostrar(`Consumo 4 horas (bajo consumo): ${consumo_con_descuento} kW`);

    //Prueba de cálculo de consumo sin bajoConsumo
    l.BajoConsumo = false;
    const consumo_sin_descuento = l.calcularConsumo(4);
    mostrar(`Consumo 4 horas (sin bajo consumo): ${consumo_sin_descuento} kW`);

    //Prueba de TipoCarga con error
    l.TipoCarga = 99; //Se debería reiniciar a 0
    mostrar("<br>Prueba de error:");
    mostrar(`Tipo Carga: ${l.TipoCarga} (${l.TipoCargaTexto})<hr>`);
}