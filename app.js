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
let indiceTareaEditar = null;
const filtroEstado=document.getElementById("filtroEstado");
const buscarTarea=document.getElementById("buscarTarea")
const ordenarTareas=document.getElementById("ordenarTareas")

//evento editar
nuevaTarea.addEventListener("click", () => {
    nombre.value = "";
    descripcion.value = "";
    fechaInicio.value = "";
    fechaFinalizacion.value = "";
    nota.value = "";
    color.value = "#FFFFFF";
    estado.value = "";

    indiceTareaEditar = null;
    alertaValidacion.classList.add("d-none");
});

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
    if (indiceTareaEditar !== null) {
        tareas[indiceTareaEditar] = tarea;
        indiceTareaEditar = null;
    }else{
        tareas.push(tarea);
    }
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
    let tareasFiltradas = tareas.map((tarea, i) => ({ //fuciones paq los filtros filtren jja    
    ...tarea,
    indiceOriginal: i
    }));
    if (filtroEstado.value !== "Todas") {
    tareasFiltradas = tareasFiltradas.filter(
        tarea => tarea.estado === filtroEstado.value
    );
    if (ordenarTareas.value === "recientes") {
    tareasFiltradas.reverse();
    }else{
    tareasFiltradas.sort((a, b) => a.indiceOriginal - b.indiceOriginal);
    }
}
    catalogo.innerHTML = "" //como siempre se limpia primero
    indice.innerHTML = "" //limpia la parte del indice pa mostrar tareas despues
    for (let i = 0; i < tareas.length; i++) {
        let tareaIndice = tareasFiltradas[i];
        let indiceOriginal = tareaIndice.indiceOriginal;
        //let tareaIndice = tareas[i]; //tareaIndice es la tarea actual
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
                    <div class="d-flex justify-content-end gap-2 mt-3">
                        <button type="button" class="btn btn-outline-secondary btn-sm"
                            onclick="editarTarea(${indiceOriginal})" 
                            data-bs-toggle="modal" data-bs-target="#modalTarea">
                            Editar
                        </button>
                        <button type="button" class="btn btn-outline-success btn-sm"
                            onclick="completarTarea(${indiceOriginal})">
                            Completar
                        </button>
                    </div>
                </div>
            </div>
        </div>`
        catalogo.innerHTML = catalogo.innerHTML + tarjeta;
        let tituloTarea = document.createElement("li");
        tituloTarea.textContent = tareaIndice.nombre;
        indice.appendChild(tituloTarea);
    };
}
filtroEstado.addEventListener("change", mostrarTareas);
buscarTarea.addEventListener("input", mostrarTareas);
ordenarTareas.addEventListener("change", mostrarTareas);
function editarTarea(i) {
    let tarea = tareas[i];

    nombre.value = tarea.nombre;
    descripcion.value = tarea.descripcion;
    fechaInicio.value = tarea.fechaInicio;
    fechaFinalizacion.value = tarea.fechaFinalizacion;
    nota.value = tarea.nota;
    color.value = tarea.color;
    estado.value = tarea.estado;

    indiceTareaEditar = i;
}

function completarTarea(i) {
    tareas[i].estado = "Completada";
    mostrarTareas();
}
