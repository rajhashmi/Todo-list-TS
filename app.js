var todoInput = document.querySelector(".todo-input");
var todoButton = document.querySelector(".todo-button");
var todoList = document.querySelector(".todo-list");
var filterOption = document.querySelector('.filter-todo');
// document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
// filterOption.addEventListener("click",filterTodo);
function addTodo(e) {
    var _a;
    e.preventDefault();
    var value = todoInput.value;
    if (!value)
        return;
    var todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    var newTodo = document.createElement("li");
    newTodo.innerText = value;
    // saveLocalTodo(value);
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    var completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class=\"fas fa-check\"></i>";
    (_a = completedButton.classList) === null || _a === void 0 ? void 0 : _a.add('complete-btn');
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
        // remoeLocalTodos(todo)
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
