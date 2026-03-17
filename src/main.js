import "./styles/main.css"
import {version} from "../package.json"

const inputTask = document.getElementById("input-task");
const btnInputTask = document.getElementById("btn-input-task");
const tasksWrapper = document.querySelector(".tasks");

const tasks = loadTasks();
console.log(tasks);

document.addEventListener("DOMContentLoaded", () => {
    onTasksChange()
})


function onTasksChange() {
    saveTasks()
    renderTasks()
}

function loadTasks() {
    return JSON.parse(localStorage.getItem("tasks") || "[]")
}

async function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

inputTask.addEventListener("keypress", (e) => {
    if ( e.key === "Enter") {
        addTask()
    }  
})

btnInputTask.addEventListener("click", () => {
    addTask()
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
    onTasksChange()
}

function deleteTask(id) {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        return
    }

    tasks.splice(taskIndex, 1);
    onTasksChange()

}

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

        onTasksChange()
        
    })
    
    const span = document.createElement("span");
    span.setAttribute("class", "task-text");
    span.innerText = task.title;
    if (task.isCompleted) {
        span.classList.add("completed")
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class","deleteBtn");
    deleteBtn.innerText = "x";
    deleteBtn.addEventListener("click", () => {
        deleteTask(task.id)
    })

    taskEl.appendChild(checkboxEl);
    taskEl.appendChild(span);
    taskEl.appendChild(deleteBtn)

    return taskEl
}

const appVersionEl = document.getElementById("app-version");
appVersionEl.innerText = `v${version}`
