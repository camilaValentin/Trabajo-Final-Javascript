/* SISTEMA DE MANEJO DE RESERVAS INTERNO DE UN RESTAURANTE */

let reservas;
if (localStorage.getItem("reservas")) {
    reservas = JSON.parse(localStorage.getItem("reservas"));
} else {
    reservas = [];
}
let opcion;
let confirmacion;
let nombre;
let indice;
let formulario = document.getElementById("formulario");

class Reserva {
    constructor(nombre, cantidadPersonas, cantidadInfante, fecha, numeroContacto) {
        this.nombre = nombre;
        this.cantidadPersonas = cantidadPersonas;
        this.cantidadInfante = cantidadInfante;
        this.fecha = fecha;
        this.numeroContacto = numeroContacto;
    }
}

function agregarReserva(e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const numeroContacto = document.getElementById("contacto").value;
    const fecha = document.getElementById("fecha").value;
    const cantidadPersonas = document.getElementById("personas").value;
    const cantidadInfante = document.getElementById("infantes").value;
    if (nombre === "" || cantidadPersonas === "" || cantidadInfante === "" || fecha === "" || numeroContacto === "") {
        alert("Todos los campos son obligatorios");
        return;
    }
    let reserva = new Reserva(nombre, cantidadPersonas, cantidadInfante, fecha, numeroContacto);
    reservas.push(reserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));
    alert("Reserva realizada con éxito");
    formulario.style.display = "none";
    formulario.reset()
}

const btnNuevaReserva = document.getElementById("btn-nueva-reserva");
btnNuevaReserva.addEventListener("click", () => {
    formulario.style.display = "block";
});

formulario.addEventListener("submit", agregarReserva);

