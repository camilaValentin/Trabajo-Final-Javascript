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
// const formulario = document.getElementById("formulario");

class Reserva {
    constructor(nombre, cantidadPersonas, cantidadInfante, fecha, numeroContacto) {
        this.nombre = nombre;
        this.cantidadPersonas = cantidadPersonas;
        this.cantidadInfante = cantidadInfante;
        this.fecha = fecha;
        this.numeroContacto = numeroContacto;
    }
}

function guardarEnLocalStorage() {
    localStorage.setItem("reservas", JSON.stringify(reservas));
}

function busquedaConNombre(nombre) {
    const busqueda = reservas.find(el => el.nombre === nombre);
    if (!busqueda) {
        return -1;
    }
    return busqueda;
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
    if (cantidadPersonas <= 0) {
        alert("La cantidad de personas debe ser mayor a 0");
        return;
    }
    if (cantidadInfante >= cantidadPersonas) {
        alert("La cantidad de niños debe ser menor a la cantidad de personas");
        return;
    }
    let reserva = new Reserva(nombre, cantidadPersonas, cantidadInfante, fecha, numeroContacto);
    reservas.push(reserva);
    guardarEnLocalStorage();
    alert("Reserva realizada con éxito");
    formulario.classList.remove("muestra");
    formulario.classList.add("desaparece");
}

function modificarNombre(reserva) {
    formulario.innerHTML =
        `
        <h2>Modificar reserva</h2>
        <h3>Nombre actual: ${reserva.nombre}<br>Ingrese el nuevo nombre</h3>
        <input placeholder="Nombre" type="text" id="nuevo-nombre">
        <button class ="btn" id="guardar-nuevo-nombre">Guardar</button>
    `;
    const btnGuardarNombre = document.getElementById('guardar-nuevo-nombre');
    btnGuardarNombre.addEventListener("click", () => {
        const nuevoNombre = document.getElementById("nuevo-nombre").value;
        reserva.nombre = nuevoNombre;
        guardarEnLocalStorage();
        alert("Nombre modificado con éxito");
        formulario.classList.remove("muestra");
        formulario.classList.add("desaparece");
    });
}

function modificarFecha(reserva) {
    formulario.innerHTML =
        `
        <h2>Modificar reserva</h2>
        <h3>Fecha actual: ${reserva.fecha}<br>Ingrese la nueva fecha</h3>
        <input placeholder="Fecha" type="date" id="nueva-fecha">
        <button class ="btn" id="guardar-nueva-fecha">Guardar</button>
    `;
    const btnGuardarFecha = document.getElementById('guardar-nueva-fecha');
    btnGuardarFecha.addEventListener("click", () => {
        const nuevaFecha = document.getElementById("nueva-fecha").value;
        reserva.fecha = nuevaFecha;
        guardarEnLocalStorage();
        alert("Fecha modificada con éxito");
        formulario.classList.remove("muestra");
        formulario.classList.add("desaparece");
    });
}

function modificarCantidad(reserva) {
    formulario.innerHTML =
        `
        <h2>Modificar reserva</h2>
        <h3>Cantidad actual: ${reserva.cantidadPersonas}<br>Ingrese la nueva cantidad</h3>
        <input placeholder="Cantidad" type="number" id="nueva-cantidad">
        <button class ="btn" id="guardar-nueva-cantidad">Guardar</button>
    `;
    const btnGuardarCantidad = document.getElementById('guardar-nueva-cantidad');
    btnGuardarCantidad.addEventListener("click", () => {
        const nuevaCantidad = document.getElementById("nueva-cantidad").value;
        if (nuevaCantidad > 0) {
            reserva.cantidadPersonas = nuevaCantidad;
            guardarEnLocalStorage();
            alert("Cantidad de personas modificada con éxito");
        }
        else {
            alert("La cantidad de personas no puede ser menor o igual a 0");
            return;
        }
        formulario.classList.remove("muestra");
        formulario.classList.add("desaparece");
    });
}

function modificarInfantes(reserva) {
    formulario.innerHTML =
        `
        <h2>Modificar reserva</h2>
        <h3>Cantidad actual de niños: ${reserva.cantidadInfante}<br>Ingrese el la nueva cantidad</h3>
        <input placeholder="Cantidad" type="number" id="nueva-cantidad-infantes">
        <button class ="btn" id="guardar-nueva-cantidad-infantes">Guardar</button>
    `;
    const btnGuardarCantidadInfantes = document.getElementById('guardar-nueva-cantidad-infantes');
    btnGuardarCantidadInfantes.addEventListener("click", () => {
        const nuevaCantidadInfantes = document.getElementById("nueva-cantidad-infantes").value;
        if (nuevaCantidadInfantes < reserva.cantidadPersonas) {
            reserva.cantidadInfante = nuevaCantidadInfantes;
            guardarEnLocalStorage();
            alert("Cantidad de niños modificada con éxito");
        }
        else {
            alert("La cantidad de niños no puede ser mayor o igual a la cantidad de personas");
            return;
        }
        formulario.classList.remove("muestra");
        formulario.classList.add("desaparece");
    });
}

function modificarContacto(reserva) {
    formulario.innerHTML =
        `
        <h2>Modificar reserva</h2>
        <h3>Contacto actual: ${reserva.numeroContacto}<br>Ingrese el nuevo número de contacto</h3>
        <input placeholder="Contacto" type="text" id="nuevo-contacto">
        <button class ="btn" id="guardar-nuevo-contacto">Guardar</button>
    `;
    const btnGuardarContacto = document.getElementById('guardar-nuevo-contacto');
    btnGuardarContacto.addEventListener("click", () => {
        const nuevoContacto = document.getElementById("nuevo-contacto").value;
        reserva.numeroContacto = nuevoContacto;
        guardarEnLocalStorage();
        alert("Número de contacto modificado con éxito");
        formulario.classList.remove("muestra");
        formulario.classList.add("desaparece");
    });
}

function modificarReserva(e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    let reserva = busquedaConNombre(nombre);
    if (reserva === -1) {
        formulario.innerHTML =
            `
                <h2>Consultar / Modificar reserva</h2>
                <p>No se encuentra una reserva a nombre de ${nombre}<p>
            `;
    } else {
        formulario.innerHTML = `<h2>Consultar / Modificar reserva</h2>`
        imprimirReserva(reserva, formulario);
        formulario.innerHTML +=
            `
                <h3>Seleccione que quiere modificar</h3>
                <section class="opciones">
                    <button class ="btn" id="btn-modificar-nombre">Nombre</button>
                    <button class ="btn" id="btn-modificar-fecha">Fecha</button>
                    <button class ="btn" id="btn-modificar-cantidad">Cantidad de personas</button>
                    <button class ="btn" id="btn-modificar-infantes">Cantidad de niños</button>
                    <button class ="btn" id="btn-modificar-contacto">Contacto</button>
                </section>
            `;

        const btnModificarNombre = document.getElementById("btn-modificar-nombre");
        const btnModificarFecha = document.getElementById("btn-modificar-fecha");
        const btnModificarCantidad = document.getElementById("btn-modificar-cantidad");
        const btnModificarInfantes = document.getElementById("btn-modificar-infantes");
        const btnModificarContacto = document.getElementById("btn-modificar-contacto");

        btnModificarNombre.addEventListener("click", () => { modificarNombre(reserva) });
        btnModificarFecha.addEventListener("click", () => { modificarFecha(reserva) });
        btnModificarCantidad.addEventListener("click", () => { modificarCantidad(reserva) });
        btnModificarInfantes.addEventListener("click", () => { modificarInfantes(reserva) });
        btnModificarContacto.addEventListener("click", () => { modificarContacto(reserva) });

    }
}

function cancelarReserva(e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    let reserva = busquedaConNombre(nombre);
    if (reserva === -1) {
        formulario.innerHTML =
            `
                <h2>Cancelar reserva</h2>
                <p>No se encuentra una reserva a nombre de ${nombre}<p>
            `;
    } else {
        formulario.innerHTML = `<h2>Cancelar reserva</h2>`
        imprimirReserva(reserva, formulario);
        formulario.innerHTML +=
            `
                <h3>Desea cancelar la reserva?</h3>
                <section class="opciones">
                    <button class ="btn" id="btn-confirmar">Si</button>
                    <button class ="btn" id="btn-denegar">No</button>
                </section>
            `;
        const btnConfirmar = document.getElementById("btn-confirmar");
        const btnDenegar = document.getElementById("btn-denegar");
        btnConfirmar.addEventListener("click", () => {
            indice = reservas.indexOf(reserva);
            reservas.splice(indice, 1);
            guardarEnLocalStorage();
            alert("Reserva cancelada con éxito");
            formulario.classList.remove("muestra");
            formulario.classList.add("desaparece");
        });
        btnDenegar.addEventListener("click", () => {
            alert("No se canceló la reserva");
            formulario.classList.remove("muestra");
            formulario.classList.add("desaparece");
        });

    }
}

function imprimirReserva(reserva, idDestino) {
    idDestino.innerHTML +=
        `
            <div class="tarjeta">
                <p>Nombre: ${reserva.nombre}</p>
                <p>Fecha: ${reserva.fecha}</p>
                <p>Cantidad de personas: ${reserva.cantidadPersonas}</p>
                <p>Cantidad de niños: ${reserva.cantidadInfante}</p>
                <p>Número de contacto: ${reserva.numeroContacto}</p>
            </div>
        `;
}

function mostrarReservas(reservas) {
    container.innerHTML = ``;
    reservas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    reservas.forEach(reserva => { imprimirReserva(reserva, container); });
};

const formulario = document.getElementById("formulario");
const container = document.getElementById("container");
const btnNuevaReserva = document.getElementById("btn-nueva-reserva");
const btnModificarReserva = document.getElementById("btn-modificar-reserva");
const btnCancelarReserva = document.getElementById("btn-cancelar-reserva");
const btnMostrarReservas = document.getElementById("btn-mostrar-reservas");


btnNuevaReserva.addEventListener("click", () => {
    formulario.innerHTML =
        `
        <h2>Agregar nueva reserva</h2>
        <form id="formulario">
            <input placeholder="Nombre" type="text" id="nombre">
            <input placeholder="Número de contacto" type="text" id="contacto">
            <input placeholder="Fecha de reserva" type="date" id="fecha">
            <input placeholder="Cantidad de personas" type="number" id="personas">
            <input placeholder="Cantidad de Niños" type="number" id="infantes">
            <input type="submit" value="Guardar reserva">
        </form>
    `;
    formulario.classList.remove("desaparece");
    formulario.classList.add("muestra");
    container.classList.remove("muestra");
    container.classList.add("desaparece");
    formulario.addEventListener("submit", agregarReserva);
});

btnModificarReserva.addEventListener("click", () => {
    if (reservas.length === 0) {
        alert("No hay reservas");
    } else {
        formulario.innerHTML =
            `
            <h2>Consultar / Modificar reserva</h2>
            <input placeholder="Ingrese el nombre de la reserva a modificar" type="text" id="nombre">
            <input type="submit" value="Buscar" id="buscar">
        `;
        const btnBuscar = document.getElementById("buscar");
        if (btnBuscar) {
            formulario.classList.remove("desaparece");
            formulario.classList.add("muestra");
            container.classList.remove("muestra");
            container.classList.add("desaparece");
            btnBuscar.addEventListener("click", modificarReserva);
        };
    };
});

btnCancelarReserva.addEventListener("click", () => {
    if (reservas.length === 0) {
        alert("No hay reservas");
    } else {
        formulario.innerHTML =
            `
        <h2>Cancelar reserva</h2>
        <input placeholder="Ingrese el nombre de la reserva a cancelar" type="text" id="nombre">
        <input type="submit" value="Buscar" id="buscar">
        `;
        const btnBuscar = document.getElementById("buscar");
        if (btnBuscar) {
            formulario.classList.remove("desaparece");
            formulario.classList.add("muestra");
            container.classList.remove("muestra");
            container.classList.add("desaparece");
            btnBuscar.addEventListener("click", cancelarReserva);
        };
    };
});

btnMostrarReservas.addEventListener("click", () => {
    if (reservas.length === 0) {
        alert("No hay reservas");
    } else {
        formulario.innerHTML = ``
        formulario.classList.remove("muestra");
        formulario.classList.add("desaparece");
        container.classList.remove("desaparece");
        container.classList.add("muestra");
        mostrarReservas(reservas);
    };
});