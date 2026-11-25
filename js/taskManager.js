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
    //borrar tarea
    deleteTask(taskId){
       const newTasks = [];
       for(let task of this.tasks){
            if (task.id !== taskId) { //se conserva las tareas q no coinciden con la q queremos eliminar
                newTasks.push(task);
            }
        }
        this.tasks = newTasks;
    }

    //persistencia de datos
    saveTasks(){
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    loadTasks() {
        const tasksGuardadas = localStorage.getItem("tasks");
        if (tasksGuardadas !== null) {
            this.tasks = JSON.parse(tasksGuardadas);
        }
    }
}