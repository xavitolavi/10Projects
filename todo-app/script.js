const form = document.getElementById('form');
const input = document.getElementById('input');
const todoUL = document.getElementById('todos');
const todosLS = JSON.parse(localStorage.getItem('todos'));

if (todosLS) {
    todosLS.forEach(todo => {
        addTodo(todo);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text; 
    }

    if (todoText) {
        const todoEl = document.createElement('li');
        //If the object stored in LocalStorage is completed we add the classlist
        if (todo && todo.completed) {
            todoEl.classList.add('completed');
        }
        todoEl.innerText = todoText;

        //Everytime we left click we need to update the completed status in storage
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS();
        })

        //And with right click we update the content in the array 
        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.remove();
            updateLS();
        })

        todoUL.appendChild(todoEl);

        input.value = '';
        updateLS();
    }
}

function updateLS() {
    const todosEl = document.querySelectorAll('li');
    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}