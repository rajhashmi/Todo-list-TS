const todoInput:HTMLInputElement = document.querySelector(".todo-input")!;
const todoButton: HTMLButtonElement = document.querySelector(".todo-button")!;
const todoList: HTMLUListElement = document.querySelector(".todo-list")!;
const filterOption:HTMLSelectElement = document.querySelector('.filter-todo')!;

// document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
// filterOption.addEventListener("click",filterTodo);

function addTodo(e:Event):void{
    e.preventDefault();
    const value: string | undefined = todoInput.value
    if(!value) return;

    const todoDiv: HTMLDivElement = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo: HTMLLIElement = document.createElement("li");
    newTodo.innerText = value;

    // saveLocalTodo(value);
    newTodo.classList.add("todo-item");
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

        // remoeLocalTodos(todo)
        todo.addEventListener("transitionend", (e:Event)=>{
            todo.remove();
        });
    }

    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement as HTMLDivElement;
        todo.classList.toggle("completed");        
    }
};