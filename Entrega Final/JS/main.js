/* SISTEMA DE GESTION DE UN RESTAURANTE */

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
const { DateTime } = luxon;

class Reserva {
    constructor(nombre, cantidadPersonas, cantidadInfante, fecha, numeroContacto) {
        this.nombre = nombre;
        this.cantidadPersonas = cantidadPersonas;
        this.cantidadInfante = cantidadInfante;
        this.fecha = DateTime.fromISO(fecha).toISODate();;
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

function busquedaConFecha(fecha) {
    const fechaISO = DateTime.fromISO(fecha).toISODate();
    const busqueda = reservas.filter(el => el.fecha === fechaISO);
    if (busqueda.length === 0) {
        return -1;
    }
    return busqueda;
}

function validarFecha(fecha) {
    const fechaReservada = DateTime.fromISO(fecha);
    const hoy = DateTime.local().startOf('day');

    if (fechaReservada < hoy) {
        return false;
    }

    return true;
}

function agregarReserva(e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const numeroContacto = document.getElementById("contacto").value;
    const fecha = document.getElementById("fecha").value;
    const cantidadPersonas = document.getElementById("personas").value;
    const cantidadInfante = document.getElementById("infantes").value;


    if (nombre === "" || cantidadPersonas === "" || cantidadInfante === "" || fecha === "" || numeroContacto === "") {
        Toastify({
            text: "Todos los campos son obligatorios",
            duration: 3000,
            style: {
                background: "red",
            },
            close: true,
        }).showToast();
        return;
    }

    if (!validarFecha(fecha)) {
        Toastify({
            text: "Fecha inválida",
            duration: 3000,
            style: {
                background: "red",
            },
            close: true,
        }).showToast();
        return;
    }

    if (cantidadPersonas <= 0) {
        Toastify({
            text: "La cantidad de personas debe ser mayor a 0",
            duration: 3000,
            style: {
                background: "red",
            },
            close: true,
        }).showToast();
        return;
    }

    if (cantidadInfante >= cantidadPersonas) {
        Toastify({
            text: "La cantidad de niños debe ser menor a la cantidad de personas",
            duration: 3000,
            style: {
                background: "red",
            },
            close: true,
        }).showToast();
        return;
    }

    let reserva = new Reserva(nombre, cantidadPersonas, cantidadInfante, fecha, numeroContacto);
    reservas.push(reserva);
    guardarEnLocalStorage();

    Toastify({
        text: "Reserva cargada con éxito",
        duration: 3000,
        style: {
            background: "green",
        },
        close: true,
    }).showToast();

    formulario.classList.remove("muestra");
    formulario.classList.add("desaparece");
}


function consultarReserva(nombre) {
    const reserva = busquedaConNombre(nombre);

    if (reserva === -1) {
        Swal.fire({
            title: 'No se encontró reserva con ese nombre',
            icon: 'error'
        });
        return;
    } else {
        imprimirReserva(reserva, formulario);
        formulario.innerHTML +=
            `
            <h3>¿Qué desea hacer con esta reserva?</h3>
            <button class ="btn" id="btn-modificar">Modificar</button>
            <button class ="btn" id="btn-cancelar">Cancelar</button>
        `;

        const btnModificar = document.getElementById("btn-modificar");
        const btnCancelar = document.getElementById("btn-cancelar");

        btnModificar.addEventListener("click", () => { modificarReserva(reserva) });
        btnCancelar.addEventListener("click", () => { cancelarReserva(reserva) });

        formulario.classList.remove("desaparece");
        formulario.classList.add("muestra");
    }

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
        Toastify({
            text: "Nombre modificado con éxito",
            duration: 3000,
            style: {
                background: "green",
            },
            close: true,
        }).showToast();

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

        if (!validarFecha(nuevaFecha)) {
            Toastify({
                text: "La fecha no puede ser en el pasado",
                duration: 3000,
                style: {
                    background: "red",
                },
                close: true,
            }).showToast();
            return;
        }

        reserva.fecha = nuevaFecha;
        guardarEnLocalStorage();

        Toastify({
            text: "Fecha modificada con éxito",
            duration: 3000,
            style: {
                background: "green",
            },
            close: true,
        }).showToast();

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

            Toastify({
                text: "Cantidad de personas modificada con éxito",
                duration: 3000,
                style: {
                    background: "green",
                },
                close: true,
            }).showToast();
        }
        else {
            Toastify({
                text: "La cantidad de personas debe ser mayor a 0",
                duration: 3000,
                style: {
                    background: "red",
                },
                close: true,
            }).showToast();
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

            Toastify({
                text: "Cantidad de niños modificada con éxito",
                duration: 3000,
                style: {
                    background: "green",
                },
                close: true,
            }).showToast();
        }
        else {
            Toastify({
                text: "La cantidad de niños debe ser menor a la cantidad de personas",
                duration: 3000,
                style: {
                    background: "red",
                },
                close: true,
            }).showToast();
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

        Toastify({
            text: "Número de contacto modificado con éxito",
            duration: 3000,
            style: {
                background: "green",
            },
            close: true,
        }).showToast();

        formulario.classList.remove("muestra");
        formulario.classList.add("desaparece");
    });
}

function modificarReserva(reserva) {
    formulario.innerHTML = `<h2>Modificar reserva</h2>`

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


function cancelarReserva(reserva) {

    if (reserva === -1) {
        Toastify({
            text: `No se encuentra una reserva a nombre de ${nombre}`,
            duration: 3000,
            style: {
                background: "red",
            },
            close: true,
        }).showToast();

        formulario.classList.remove("muestra");
        formulario.classList.add("desaparece");
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

            Toastify({
                text: "Reserva cancelada con éxito",
                duration: 3000,
                style: {
                    background: "green",
                },
                close: true,
            }).showToast();

            formulario.classList.remove("muestra");
            formulario.classList.add("desaparece");
        });

        btnDenegar.addEventListener("click", () => {
            Toastify({
                text: "La reserva no fue cancelada",
                duration: 3000,
                style: {
                    background: "gray",
                },
                close: true,
            }).showToast();

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
    container.innerHTML = `<p>Cargando reservas...</p>`;

    setTimeout(() => {
        container.innerHTML = ``;
        if (Array.isArray(reservas)) {
            container.innerHTML = ``;
            reservas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
            reservas.forEach(reserva => { imprimirReserva(reserva, container); });
        } else {
            imprimirReserva(reservas, container);
        }
    }, 2000);
};


function imprimirProveedor(proveedor) {
    container.innerHTML +=
        `
            <div class="tarjeta">
                <p>Nombre completo: ${proveedor.nombre} ${proveedor.apellido}</p>
                <p>Teléfono: ${proveedor.telefono}</p>
                <p>Provee: ${proveedor.provee}</p>
                <p>Días de entrega: ${proveedor.entrega}</p>
            </div>
        `;
}


function mostrarProveedores() {
    container.innerHTML = `<p>Cargando proveedores...</p>`;

    setTimeout(() => {
        container.innerHTML = ``;
        fetch("JSON/proveedores.json")
            .then(response => response.json())
            .then(data => {
                const proveedores = data;
                proveedores.forEach((el) => { imprimirProveedor(el); })
            })
            .catch(err => {
                console.error(err)
                Toastify({
                    text: "Se produjo un error al obtener los proveedores",
                    duration: 3000,
                    style: {
                        background: "red",
                    },
                    close: true,
                }).showToast();
            })
    }, 2000);
}

const formulario = document.getElementById("formulario");
const container = document.getElementById("container");
const btnNuevaReserva = document.getElementById("btn-nueva-reserva");
const btnConsultarReserva = document.getElementById("btn-consultar-reserva");
const btnMostrarReservas = document.getElementById("btn-mostrar-reservas");
const btnProveedores = document.getElementById("btn-proveedores");


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


btnConsultarReserva.addEventListener("click", () => {
    if (reservas.length === 0) {
        Toastify({
            text: "No hay reservas",
            duration: 3000,
            style: {
                background: "red",
            },
            close: true,
        }).showToast();
    } else {
        formulario.innerHTML = ``
        formulario.classList.remove("desaparece");
        formulario.classList.add("muestra");
        container.classList.remove("muestra");
        container.classList.add("desaparece");
        async function buscarReserva() {
            const { value: buscar } = await Swal.fire({
                title: "Seleccione cómo quiere buscar...",
                input: "select",
                inputOptions: {
                    nombre: "Nombre",
                    fecha: "Fecha",
                },
                inputPlaceholder: "Seleccione una opción",
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'Debe seleccionar una opción';
                    }
                }
            });

            if (buscar) {
                if (buscar === "nombre") {
                    const { value: nombre } = await Swal.fire({
                        title: 'Ingrese el nombre de la reserva',
                        input: 'text',
                        inputPlaceholder: 'Nombre de la reserva',
                        showCancelButton: true,
                    });

                    if (nombre) {
                        consultarReserva(nombre);
                    }
                } else if (buscar === "fecha") {
                    const { value: fecha } = await Swal.fire({
                        title: 'Ingrese la fecha de la reserva',
                        input: 'date',
                        showCancelButton: true,
                    });

                    if (fecha) {
                        const fechaISO = DateTime.fromISO(fecha).toISODate();
                        const reservasPorFecha = busquedaConFecha(fechaISO);
                        if (reservasPorFecha !== -1) {
                            container.innerHTML = ``;
                            formulario.classList.remove("muestra");
                            formulario.classList.add("desaparece");
                            container.classList.remove("desaparece");
                            container.classList.add("muestra");
                            mostrarReservas(reservasPorFecha);
                        } else {
                            Swal.fire({
                                title: 'No se encontró ninguna reserva para esta fecha',
                                icon: 'error'
                            });
                        }
                    }
                }
            }
        }

        buscarReserva();
    };
});


btnMostrarReservas.addEventListener("click", () => {
    if (reservas.length === 0) {
        Toastify({
            text: "No hay reservas",
            duration: 3000,
            style: {
                background: "red",
            },
            close: true,
        }).showToast();
    } else {
        formulario.innerHTML = ``
        formulario.classList.remove("muestra");
        formulario.classList.add("desaparece");
        container.classList.remove("desaparece");
        container.classList.add("muestra");
        mostrarReservas(reservas);
    };
});

btnProveedores.addEventListener("click", () => {
    formulario.innerHTML = ``
    container.innerHTML = ``
    formulario.classList.remove("muestra");
    formulario.classList.add("desaparece");
    container.classList.remove("desaparece");
    container.classList.add("muestra");
    mostrarProveedores();
});