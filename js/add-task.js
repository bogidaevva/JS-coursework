"use strict";

// создаем шаблон объектов задач
function Task (title, description, date) {
    this.title = title;
    this.description = description; 
    this.date = date;
    this.id = `${title + Date.parse(date)}`
}

// будущий массив задач
let map = new Map();

let addTaskBtn = document.querySelector("button");
let form = document.querySelector("form");
let title = form.elements.title;
let description = form.elements.description;
let date = form.elements.datetime;
let formMessage = document.getElementsByTagName("span")[0];

function isValid() {
    formMessage.className = "form-message";
    if (this.validity.valueMissing || this.validity.tooShort || this.validity.tooLong) {
        this.nextElementSibling.innerText = `Значение должно быть в диапазоне от ${this.minLength} до ${this.maxLength} символов.`;
        this.nextElementSibling.className = "message error"
        return false
    } else {
        this.nextElementSibling.className = "message";
        return true
    }
}

// валидация даты
function isDataValid(elem) {
    if (Date.parse(elem.value) < Date.now()) {
        elem.nextElementSibling.innerText = "Дата не должна быть в прошлом.";
        elem.nextElementSibling.className = "message error"
        return false
    } 
    elem.nextElementSibling.className = "message";
    return true
}

// вешаем обработчики событий на поля, проверка в реальном времени
title.addEventListener('input', isValid);
description.addEventListener('input', isValid);   

function createTask() {
    let task = new Task(title.value.trim(), description.value.trim(), date.value);
    console.log(task.id);
    console.log(task);
    if (localStorage.tasks) {
        map = new Map(Object.entries(JSON.parse(localStorage.getItem('tasks'))));
    } 
    map.set(task.id, task);
    console.log(map);
    return true;
}

// добавляем в локальное хранилище массив задач, преобразованный в JSON-строку
function addLocalStorage() {
    let jsonMap = JSON.stringify(Object.fromEntries(map));
    console.log(jsonMap);
    localStorage.setItem('tasks', jsonMap);
    formMessage.innerText = "Задача была успешно добавлена";
    formMessage.className = "form-message show";
}

// вешаем обработчик событий на ("добавить задачу")
addTaskBtn.addEventListener('click', event => {
    event.preventDefault(); 
        if (title.validity.valid && description.validity.valid && isDataValid(date) && createTask()) {
                addLocalStorage();
                form.reset();
        }
});

