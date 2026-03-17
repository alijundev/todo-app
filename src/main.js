import "./styles/main.css"

const inputTask = document.getElementById("input-task");
const btnInputTask = document.getElementById("btn-input-task");
const tasksWrapper = document.querySelector(".tasks");

const tasks = []

inputTask.addEventListener("keypress", (e) => {
    if ( e.key === "Enter") {
        addTask()
    }
    
})

function addTask() {
    console.log(inputTask.value);
    const task = inputTask.value.trim();
    if(task.length < 3) {
        console.log("Task minimal 3 karakter");
        return;
    }

    const newTask = {
        id: String(+new Date()),
        title: task,
        isCompleted: false
    }

    console.log(newTask);
    
    tasks.push(newTask);
    inputTask.value = ""
    renderTasks()
}

btnInputTask.addEventListener("click", () => {
    addTask()
})

function renderTasks() {
    console.log(tasks);
    
    tasksWrapper.innerHTML = "";
    if(tasks.length == 0) {
        console.log("Task masih kosong");
        return;
    }

    tasks.forEach(task => {
        const taskEl = createTaskDOM(task);
        tasksWrapper.appendChild(taskEl)
    })

}

function createTaskDOM(task) {
    const taskEl = document.createElement("div");
    taskEl.setAttribute("class", "task");
    
    const checkboxEl = document.createElement("input");
    checkboxEl.setAttribute("type", "checkbox");
    checkboxEl.checked = task.isCompleted

    checkboxEl.addEventListener("change", (e) => {
        const targetTask = tasks.find(t => t.id === task.id);
        targetTask.isCompleted = checkboxEl.checked;

        renderTasks()
        
    })
    
    const span = document.createElement("span");
    span.setAttribute("class", "task-text");
    span.innerText = task.title;
    if (task.isCompleted) {
        span.classList.add("completed")
    }


    taskEl.appendChild(checkboxEl);
    taskEl.appendChild(span);
    return taskEl
}