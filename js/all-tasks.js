"use strict";

let map = new Map(Object.entries(JSON.parse(localStorage.getItem('tasks'))));
let h = document.getElementsByTagName("h2")[0];
let tasks = document.querySelector("#tasks");
let removeBtn = document.getElementsByTagName("button")[0];
let removesTasks = [];

function showTasksList(arr) {
    for (let task of arr) {
        h.innerText = "список задач";

        let newTask = document.createElement("div");
        newTask.classList.add("task");
        newTask.setAttribute("id", task.id)
    
        let title = document.createElement("h4");
        title.innerText = task.title;
    
        let description = document.createElement("p");
        description.innerText = task.description;
    
        let date = document.createElement("span");
        date.innerText = `выполнить к: ${task.date.slice(0, 10).replaceAll("-", ".").split(".").reverse().join(".")}`;
        
        let time = document.createElement("span");
        time.innerText = task.date.slice(11);
        
        document.body.append(tasks);
        tasks.append(newTask);
        newTask.append(title, description, date, time);
    };
}

let showEmptyList = () => {
    h.innerText = "список задач пуст";

    let p = document.createElement("p");
    p.innerText = "Добавьте первую задачу.";

    document.body.append(tasks);
    tasks.append(p);
    removeBtn.className = "hide";
}

function showTasks() {
    if (localStorage.tasks && localStorage.tasks.length !== 2) showTasksList(map.values());
    else showEmptyList();
}

function showBtn() {
    if (document.querySelectorAll(".highlight").length > 0) {
        removeBtn.className = "show";
    } else {
        removeBtn.className = "hide";
    }
}

function highlightTask() {
    document.querySelectorAll(".task").forEach((task) => {
        task.addEventListener('click', () => {
            task.classList.toggle("highlight");
            
            showBtn();
            
            if (task.classList.contains("highlight")) {
                removesTasks.push(task); 
            } else {
                removesTasks.splice(removesTasks.indexOf(task, 0), 1);
            }
        })
    });
}

function removeTask() {
    removesTasks.forEach(task => map.delete(task.getAttribute("id")))
    localStorage.setItem('tasks', JSON.stringify(Object.fromEntries(map)));
    document.querySelectorAll(".task").forEach(task => task.remove());
}

removeBtn.addEventListener('click', () => {
    removeTask()
    showBtn();
    showTasks();
    highlightTask();
});

showTasks();
highlightTask();

console.log(map);