//AITANA GÓNZÁLEZ RODRÍGUEZ
//Script que crea y muestra objetos con clases

//Hago el import de las funciones del ejercicio a este script principal
import { Electrodomestico, Lavadora} from "./funciones.js";

//Función auxiliar para mostrar los mensajes por el div de salida
function mostrar(mensaje) {
    const salida = document.getElementById("salida");
    salida.innerHTML += `<div>${mensaje}</div>`;
}

//Cuando la página HTML ha cargado completamente, se ejecuta la función principal
document.addEventListener("DOMContentLoaded", principal);

//FUNCIÓN PRINCIPAL
function principal() {

    mostrar("<hr><h3>DEMOSTRACIÓN: CLASE ELECTRODOMESTICO</h3>");

    //DEMOSTRACIÓN DE ELECTRODOMESTICO
    const e = new Electrodomestico();
    mostrar("Electrodoméstico 1 creado con valores por defecto:");
    mostrar(e.toString());

    //Asigno valores
    e.ID = "ELEC - ABC321";
    e.Modelo = "MODERNOX";
    e.Consumo = 6;

    mostrar("<br>Electrodoméstico 1 actualizado:");
    mostrar(e.toString());
    mostrar(`Consumo 2 horas: ${e.calcularConsumo(2)} kW`);

    //DEMOSTRACIÓN DE LAVADORA
    mostrar("<hr><h3>DEMOSTRACIÓN: CLASE LAVADORA</h3>");

    const l = new Lavadora();

    //Asigno valores heredados
    l.ID = "ELEC - LAV02";
    l.Modelo = "LAVADORA";
    l.Consumo = 8;

    //Asigno valores propios
    l.Capacidad = 10;
    l.BajoConsumo = true;
    l.TipoCarga = 2; //2 = Superior

    mostrar("Lavadora 1 creada:");
    mostrar(l.toString());
    mostrar(`Tipo de carga textual: ${l.TipoCargaTexto}`);

    //Prueba de cálculo de consumo con BajoConsumo
    const consumo_con_descuento = l.calcularConsumo(5);
    mostrar(`Consumo 5 horas (Bajo consumo): ${consumo_con_descuento} kW`);

    //Prueba de cálculo de consumo sin BajoConsumo
    l.BajoConsumo = false;
    const consumo_sin_descuento = l.calcularConsumo(5);
    mostrar(`Consumo 5 horas (Sin bajo consumo):${consumo_sin_descuento} kW<hr>`);
}