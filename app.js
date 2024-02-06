var todoInput = document.querySelector(".todo-input");
var todoButton = document.querySelector(".todo-button");
var todoList = document.querySelector(".todo-list");
var filterOption = document.querySelector('.filter-todo');
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
filterOption.addEventListener("click", filterTodo);
function addTodo(e) {
    var _a, _b, _c;
    e.preventDefault();
    var value = todoInput.value;
    if (!value)
        return;
    var todoDiv = document.createElement("div");
    (_a = todoDiv.classList) === null || _a === void 0 ? void 0 : _a.add("todo");
    var newTodo = document.createElement("li");
    newTodo.innerText = value;
    saveLocalTodo(value);
    (_b = newTodo.classList) === null || _b === void 0 ? void 0 : _b.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    var completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class=\"fas fa-check\"></i>";
    (_c = completedButton.classList) === null || _c === void 0 ? void 0 : _c.add('complete-btn');
    todoDiv.appendChild(completedButton);
    var trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class=\"fas fa-trash\"></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
}
function deleteTodo(e) {
    var _a;
    var item = e.target;
    if (item.classList[0] === "trash-btn") {
        var todo_1 = item.parentElement;
        (_a = todo_1.classList) === null || _a === void 0 ? void 0 : _a.add("fall");
        removeLocalTodos(todo_1);
        todo_1.addEventListener("transitionend", function (e) {
            todo_1.remove();
        });
    }
    if (item.classList[0] === "complete-btn") {
        var todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
;
function filterTodo(e) {
    var _a;
    var todos = [];
    for (var i = 0; i < todoList.childNodes.length; i++) {
        todos.push(todoList.childNodes[i]);
    }
    var filterType = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value;
    todos === null || todos === void 0 ? void 0 : todos.forEach(function (todo) {
        if (todo instanceof HTMLElement) {
            switch (filterType) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    }
                    else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    }
                    else {
                        todo.style.display = "none";
                    }
                    break;
            }
        }
    });
}
function saveLocalTodo(todo) {
    var todos = [];
    var storedTodos = localStorage.getItem("todos");
    if (storedTodos !== null) {
        todos = JSON.parse(storedTodos);
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
    var _a, _b;
    var todos = [];
    var storedTodos = localStorage.getItem("todos");
    if (storedTodos !== null) {
        todos = JSON.parse(storedTodos);
    }
    var todoText = (_b = (_a = todo.children[0]) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim();
    todos.splice(todos.indexOf(todoText), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
    var todos = [];
    var storedTodo = localStorage.getItem("todos");
    if (storedTodo !== null) {
        todos = JSON.parse(storedTodo);
    }
    todos.forEach(function (todo) {
        var _a, _b, _c;
        var todoDiv = document.createElement("div");
        (_a = todoDiv.classList) === null || _a === void 0 ? void 0 : _a.add("todo");
        var newTodo = document.createElement("li");
        newTodo.innerText = todo;
        (_b = newTodo.classList) === null || _b === void 0 ? void 0 : _b.add("todo-item");
        todoDiv.appendChild(newTodo);
        todoInput.value = "";
        var completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class=\"fas fa-check\"></i>";
        (_c = completedButton.classList) === null || _c === void 0 ? void 0 : _c.add("completed-btn");
        var trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class=\"fas fa-trash\"></i>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(completedButton);
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
    });
}
