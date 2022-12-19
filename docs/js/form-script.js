const todoList = document.getElementsByClassName("todo-list")[0];
const todoInput = document.getElementsByClassName("crypto-form")[0];
let arr = [];


todoInput.addEventListener("submit", function (e){
    e.preventDefault();
    const formData = new FormData(todoInput);
    let crypto = formData.get("crypto");
    let amount = formData.get("crypto-count");
    if (crypto === "" || amount === ""){
        alert("");
    }
    else {
        const todo = {
            crypto: crypto,
            amount: amount,
            done: false,
            id: String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now()
        };
        arr.push(todo);
        todoInput.reset();
        store(arr);
    }
});

function store(arr){
    localStorage.setItem("todoItem", JSON.stringify(arr));
    displayTodoList(arr);
}

function getFromStorage(){
    const ref = localStorage.getItem("todoItem");
    if (ref){
        arr = JSON.parse(ref);
        displayTodoList(arr);
    }
}

function clearAll(){
    localStorage.removeItem("todoItem");
    arr.splice(0, arr.length);
    displayTodoList(arr);
}

function displayTodoList(arr){
    todoList.innerHTML = '';
    arr.forEach(function (todo) {
        const template = document.querySelector("#template");
        const item = template.content.cloneNode(true);
        const item2 = item.querySelector(".todo-item");
        const done = todo.done ? "checked" : null;
        item2.setAttribute("id", todo.id);
        item.querySelector('input').setAttribute(done, done);
        item2.querySelector("span").textContent = todo.crypto + " " + todo.amount;
        todoList.append(item);
    })
}

function clear(id){
    arr = arr.filter(function (todo) {
        return todo.id !== id;
    });
    store(arr);
}

function toggle(id){
    for (let i = 0; i < arr.length; i++){
        if (arr[i].id === id){
            arr[i].done = !arr[i].done;
        }
    }
    store(arr);
}

getFromStorage();

todoList.addEventListener('click', (event) => {
    const isButton = event.target.classList.contains("clear-button");
    const isCheckBox = event.target.classList.contains("checkbox");
    if (isButton){
        clear(event.target.parentElement.id);
    }

    if(isCheckBox){
        toggle(event.target.parentElement.id);
    }
})