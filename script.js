const addBtn = document.querySelector('#add-task-btn');
const taskFormSection = document.querySelector('.task-form-section');
const closeFormBtn = document.querySelector('#close-form');
const form = document.querySelector('#task-form');
const taskListContainer = document.querySelector('#task-list');

const themeToggle = document.querySelector('#theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
});

let taskList = JSON.parse(localStorage.getItem('taskList')) || [];

let ui = () => {
    taskList.forEach((task) => {
        taskListContainer.innerHTML += `<div class="task-item">
                <h4>${task.taskTitle} <span class="category-tag">${task.taskCategory}</span></h4>
                <p>${task.taskDescription}</p>
                <span id="task-actions">
                    <button onClick="editTask(${taskList.indexOf(task)})" id="edit">Edit</button>
                    <button onClick="markCompleted(${taskList.indexOf(task)})" id="completed">Completed</button>
                    <button onClick="deleteTask(${taskList.indexOf(task)})" id="delete">Delete</button>
                </span>
            </div>`
    });

    taskList.forEach((task, i) => {
        if (task.completed) {
            const cards = taskListContainer.querySelectorAll('.task-item');
            cards[i].style.background = 'rgba(99, 153, 34, 0.12)';
            cards[i].style.borderColor = '#c0dd97';
        }
    });
};

addBtn.addEventListener('click', () => {
    taskFormSection.classList.remove('hidden');
});

closeFormBtn.addEventListener('click', () => {
    taskFormSection.classList.add('hidden');
});

let editTask = (index) => {
    let task = taskList[index];
    taskFormSection.classList.remove('hidden');

    form[0].value = task.taskTitle;
    form[1].value = task.taskDescription;
    form[2].value = task.taskCategory;
    taskList.splice(index, 1);

    localStorage.setItem('taskList', JSON.stringify(taskList));

    taskListContainer.innerHTML = '';
    ui();
};


let markCompleted = (index) => {
    taskList[index].completed = true;
    localStorage.setItem('taskList', JSON.stringify(taskList));
    const cards = taskListContainer.querySelectorAll('.task-item');
    cards[index].style.background = 'rgba(99, 153, 34, 0.12)';
    cards[index].style.borderColor = '#c0dd97';
};

let deleteTask = (index) => {
    taskList.splice(index, 1);

    localStorage.setItem('taskList', JSON.stringify(taskList));

    taskListContainer.innerHTML = '';
    ui();
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Handle form submission logic here
    let taskTitle = e.target[0].value;
    let taskDescription = e.target[1].value;
    let taskCategory = e.target[2].value;

    let taskObject = {
        taskTitle,
        taskDescription,
        taskCategory
    };

    if (taskTitle === '' || taskDescription === '' || taskCategory === '') {
        alert('Please fill all the fields');
        return;
    }

    if (taskList.some(task => task.taskTitle === taskTitle)) {
        alert('Task with this title already exists');
        return;
    }

    taskList.push(taskObject);
    localStorage.setItem('taskList', JSON.stringify(taskList));

    taskFormSection.classList.add('hidden');
    form.reset();

    taskListContainer.innerHTML = '';
    ui();
});

ui();
