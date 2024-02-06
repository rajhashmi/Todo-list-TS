const todoInput:HTMLInputElement = document.querySelector(".todo-input")!;
const todoButton: HTMLButtonElement = document.querySelector(".todo-button")!;
const todoList: HTMLUListElement = document.querySelector(".todo-list")!;
const filterOption:HTMLSelectElement = document.querySelector('.filter-todo')!;

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
filterOption.addEventListener("click",filterTodo);

function addTodo(e:Event):void{
    e.preventDefault();
    const value: string | undefined = todoInput.value
    if(!value) return;

    const todoDiv: HTMLDivElement = document.createElement("div");
    todoDiv.classList?.add("todo");

    const newTodo: HTMLLIElement = document.createElement("li");
    newTodo.innerText = value;

    saveLocalTodo(value);
    newTodo.classList?.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    const completedButton: HTMLButtonElement = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList?.add('complete-btn');
    todoDiv.appendChild(completedButton);

    const trashButton: HTMLButtonElement = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
}
function deleteTodo(e: Event): void {
    const item: HTMLElement = (e.target as HTMLElement)

    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement as HTMLDivElement;
        todo.classList?.add("fall");

       removeLocalTodos(todo)
        todo.addEventListener("transitionend", (e:Event)=>{
            todo.remove();
        });
    }

    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement as HTMLDivElement;
        todo.classList.toggle("completed");        
    }
};

function filterTodo(e:MouseEvent):void{
    const todos: ChildNode[] = [];
    for(let i: number = 0; i < todoList.childNodes.length; i++){
        todos.push(todoList.childNodes[i]);
    }
    const filterType: string | undefined = (e.target as HTMLInputElement)?.value;
    todos?.forEach(function(todo: ChildNode){
        if (todo instanceof HTMLElement) {
            switch (filterType) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            }
        }
    });
}
function saveLocalTodo(todo: string): void {
    let todos: string[] = [];
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos !== null) {
        todos = JSON.parse(storedTodos) as string[];
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo: HTMLElement): void {
 let todos: string[] = [];
 const storedTodos = localStorage.getItem("todos");
 if(storedTodos !== null){
    todos = JSON.parse(storedTodos);
 }
 const todoText = todo.children[0]?.textContent?.trim()!;
 todos.splice(todos.indexOf(todoText), 1);
 localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos():void{
    let todos: string[] = [];
    const storedTodo: string | null = localStorage.getItem("todos");
    if(storedTodo !== null){
        todos = JSON.parse(storedTodo)
    }
    todos.forEach(function (todo:string){
        const todoDiv: HTMLDivElement = document.createElement("div");
        todoDiv.classList?.add("todo");

        const newTodo: HTMLLIElement = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList?.add("todo-item");
        todoDiv.appendChild(newTodo);
        todoInput.value = "";

        const completedButton: HTMLButtonElement = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList?.add("completed-btn");

        const trashButton: HTMLButtonElement = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");

        todoDiv.appendChild(completedButton);
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    })
}