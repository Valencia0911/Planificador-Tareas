class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    addTask(nombre, descripcion, fechaInicio, fechaFinalizacion, nota, color, estado) {
        this.currentId++
        this.tasks.push({
            id: this.currentId,
            nombre: nombre,
            descripcion: descripcion,
            fechaInicio: fechaInicio,
            fechaFinalizacion: fechaFinalizacion,
            nota: nota,
            color: color,
            estado: estado
        })
    }
}