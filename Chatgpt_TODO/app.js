const todoForm = document.getElementById('todo-form');
const todoText = document.getElementById('todo-text');
const dueDate = document.getElementById('due-date');
const todoList = document.getElementById('todo-list');

todoForm.addEventListener('submit', addTodo);

function addTodo(event) {
    event.preventDefault();
    const text = todoText.value.trim();
    const date = dueDate.value;
    if (text !== '') {
        const todoItem = createTodoItem(text, date);
        todoList.appendChild(todoItem);
        todoText.value = '';
        dueDate.value = '';
    }
}

function createTodoItem(text, date) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${text}</span>
        <span>${date}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
        <input type="checkbox">
    `;
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', deleteTodo);

    const editBtn = li.querySelector('.edit-btn');
    editBtn.addEventListener('click', editTodo);

    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', markAsDone);

    return li;
}

function deleteTodo() {
    const listItem = this.parentElement;
    todoList.removeChild(listItem);
}

function editTodo() {
    const listItem = this.parentElement;
    const text = listItem.querySelector('span').innerText;
    const date = listItem.querySelector('span:nth-child(2)').innerText;
    todoText.value = text;
    dueDate.value = date;
    todoList.removeChild(listItem);
}

function markAsDone() {
    const listItem = this.parentElement;
    listItem.classList.toggle('completed');
}
