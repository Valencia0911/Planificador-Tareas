const nuevaTarea = document.getElementById("nuevaTarea");
const nombre = document.getElementById("nombreTarea");
const descripcion = document.getElementById("descripcionTarea");
const fechaInicio = document.getElementById("fechaInicio");
const fechaFinalizacion = document.getElementById("fechaFinalizacion");
const nota = document.getElementById("notaTarea");
const color = document.getElementById("colorTarea");
const btnGuardar = document.getElementById("guardarTarea");
const catalogo = document.getElementById("catalogoTareas");
const indice = document.getElementById("lista");
const alertaValidacion = document.getElementById("alertaValidacion")
const estado = document.getElementById("estadoTarea");
//array para poder almacenar todas las tareas
let tareas = [];

//Evento para guardar

btnGuardar.addEventListener("click", () => {
    let nombreTexto = nombre.value;
    let descripcionTexto = descripcion.value;
    let fechaInicioTexto = fechaInicio.value;
    let fechaFinalizacionTexto = fechaFinalizacion.value;
    let notaTexto = nota.value;
    let colorTexto = color.value;
    let estadoTexto = estado.value;

    // poner validaciones al terminar

    const tarea = {
        nombre: nombreTexto,
        descripcion: descripcionTexto,
        fechaInicio: fechaInicioTexto,
        fechaFinalizacion: fechaFinalizacionTexto,
        nota: notaTexto,
        color: colorTexto,
        estado: estadoTexto
    }
    if (validFormFieldInput(tarea) === false) {        // si la validacion falla se detiene todo el evento click
        alertaValidacion.classList.remove("d-none");
        return;
    } else {
        alertaValidacion.classList.add("d-none");
    }
    tareas.push(tarea)
    mostrarTareas()
});

function validFormFieldInput(tarea) {
    if (tarea.nombre.trim() === "" || tarea.descripcion.trim() === "" ||   //primero validamos q no estén vacios
        tarea.fechaInicio.trim() === "" || tarea.color.trim() === "" || tarea.estado.trim() === "") {
        return false;
    }
    if (tarea.fechaFinalizacion !== "" && tarea.fechaFinalizacion <= tarea.fechaInicio) { //fechafinalizacion sea despues pero no obligatoria
        return false;
    }
    return true

}


function mostrarTareas() {
    catalogo.innerHTML = "" //como siempre se limpia primero
    for (let i = 0; i < tareas.length; i++) {
        let tareaIndice = tareas[i]; //tareaIndice es la tarea actual
        let colorEstado;

        if (tareaIndice.estado === "Pendiente") {
            colorEstado = "text-bg-danger";
        } else if (tareaIndice.estado === "En progreso") {
            colorEstado = "text-bg-warning";
        } else if (tareaIndice.estado === "Completada") {
            colorEstado = "text-bg-success";
        }
        const tarjeta = `
        <div class="col-12 col-lg-6">
            <div class="card h-100">
                <div class="card-header" style="background-color: ${tareaIndice.color};">
                    <span class="badge ${colorEstado}">${tareaIndice.estado}</span>
                </div>

                <div class="card-body">
                    <h5 class="card-title">${tareaIndice.nombre}</h5>

                    <p class="card-text">${tareaIndice.descripcion}</p>

                    <p class="mb-2">
                        <strong>Fecha de inicio:</strong> ${tareaIndice.fechaInicio}
                    </p>

                    <p class="mb-2">
                        <strong>Finalización tentativa:</strong> ${tareaIndice.fechaFinalizacion}
                    </p>

                    <hr>

                    <p class="card-text">
                        <strong>Nota:</strong> ${tareaIndice.nota}
                    </p>
                </div>
            </div>
        </div>`
        catalogo.innerHTML = catalogo.innerHTML + tarjeta;
    };
}
