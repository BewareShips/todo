//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);



//functions
function addTodo(event){
    //Prevent form from submiting
    event.preventDefault();
    console.log('hello');
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    //Cleat Todo INPUT VALUE
    todoInput.value="";
}


function deleteCheck(event){
    const item = event.target;
    //DELETE TODO
    //У иконки есть свой класс и когда на нее нажимаем если класс совпадает срабатывает условие
    if (item.classList[0] === 'trash-btn'){ 
        const todo = item.parentElement;
    //Константе todo приравнием родительский элемент 
        todo.classList.add("fall");
        todo.addEventListener("transitionend",function() {   //добавляем событие "transitioned" где после окончания анимации  вызовется функция которая удалит
            todo.remove();
        });
    }

    //CHECK MARK
    if (item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    // Не имеет значение создавали ли мы этот класс через classlist.add достаточно создать любой в css
    }
}


function filterTodo(e){
    const todos = todoList.childNodes;
    //возвращает коллекцию дочерних элементов данного элемента
    todos.forEach(function(todo){
        switch (e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }else{
                    todo.style.display ="none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;

        }
    });
}



function saveLocalTodos(todo){
    //CHECK ---HEY do i already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}