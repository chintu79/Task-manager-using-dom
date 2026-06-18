# Task Manager Application

A simple Task Manager built using **HTML**, **CSS**, and **Vanilla JavaScript** that allows users to create, edit, complete, and delete tasks while persisting data using **Local Storage**.

---

# Features

* Add new tasks
* Edit existing tasks
* Mark tasks as completed
* Delete tasks
* Categorize tasks
* Store data in Local Storage
* Persistent UI after page refresh
* Responsive and clean user interface

---

# Local Storage Integration

The application uses Local Storage to persist tasks.

```javascript
let taskList = JSON.parse(localStorage.getItem('taskList')) || [];
```

### Explanation

* `localStorage.getItem('taskList')` retrieves previously stored tasks.
* `JSON.parse()` converts the JSON string back into a JavaScript array.
* `|| []` provides an empty array when no tasks exist.

Example:

```javascript
[
  {
    taskTitle: "Learn JavaScript",
    taskDescription: "Study DOM manipulation",
    taskCategory: "Learning",
    completed: false
  }
]
```

---

# Rendering Tasks

The `ui()` function is responsible for displaying all tasks on the screen.

```javascript
let ui = () => {
    taskList.forEach((task) => {
        taskListContainer.innerHTML += `
            <div class="task-item">
                <h4>
                    ${task.taskTitle}
                    <span class="category-tag">
                        ${task.taskCategory}
                    </span>
                </h4>

                <p>${task.taskDescription}</p>

                <span id="task-actions">
                    <button onClick="editTask(${taskList.indexOf(task)})">
                        Edit
                    </button>

                    <button onClick="markCompleted(${taskList.indexOf(task)})">
                        Completed
                    </button>

                    <button onClick="deleteTask(${taskList.indexOf(task)})">
                        Delete
                    </button>
                </span>
            </div>
        `;
    });
};
```

### What Happens?

1. Loop through every task.
2. Create a task card dynamically.
3. Insert task details into HTML.
4. Attach action buttons.

---

# Marking Completed Tasks

```javascript
taskList.forEach((task, i) => {
    if (task.completed) {
        const cards =
            taskListContainer.querySelectorAll('.task-item');

        cards[i].style.background =
            'rgba(99, 153, 34, 0.12)';

        cards[i].style.borderColor =
            '#c0dd97';
    }
});
```

### Purpose

* Detect completed tasks.
* Apply different styling.
* Provide visual feedback.

---

# Showing and Hiding Form

### Open Form

```javascript
addBtn.addEventListener('click', () => {
    taskFormSection.classList.remove('hidden');
});
```

### Close Form

```javascript
closeFormBtn.addEventListener('click', () => {
    taskFormSection.classList.add('hidden');
});
```

### Concept Used

* Event Listeners
* Class Manipulation
* DOM Updates

---

# Editing Tasks

```javascript
let editTask = (index) => {
    let task = taskList[index];

    taskFormSection.classList.remove('hidden');

    form[0].value = task.taskTitle;
    form[1].value = task.taskDescription;
    form[2].value = task.taskCategory;

    taskList.splice(index, 1);

    localStorage.setItem(
        'taskList',
        JSON.stringify(taskList)
    );

    taskListContainer.innerHTML = '';

    ui();
};
```

### Workflow

1. Select task using index.
2. Populate form fields.
3. Remove old task temporarily.
4. Allow user to update details.
5. Save edited version again.

---

# Marking Tasks as Completed

```javascript
let markCompleted = (index) => {
    taskList[index].completed = true;

    localStorage.setItem(
        'taskList',
        JSON.stringify(taskList)
    );

    const cards =
        taskListContainer.querySelectorAll('.task-item');

    cards[index].style.background =
        'rgba(99, 153, 34, 0.12)';

    cards[index].style.borderColor =
        '#c0dd97';
};
```

### Workflow

1. Locate task.
2. Set completed property to true.
3. Update Local Storage.
4. Update UI styling.

---

# Deleting Tasks

```javascript
let deleteTask = (index) => {
    taskList.splice(index, 1);

    localStorage.setItem(
        'taskList',
        JSON.stringify(taskList)
    );

    taskListContainer.innerHTML = '';

    ui();
};
```

### Workflow

1. Remove task from array.
2. Update Local Storage.
3. Re-render UI.

---

# Form Submission

```javascript
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let taskTitle = e.target[0].value;
    let taskDescription = e.target[1].value;
    let taskCategory = e.target[2].value;

    let taskObject = {
        taskTitle,
        taskDescription,
        taskCategory
    };

    taskList.push(taskObject);

    localStorage.setItem(
        'taskList',
        JSON.stringify(taskList)
    );
});
```

---

# Validation

### Empty Field Validation

```javascript
if (
    taskTitle === '' ||
    taskDescription === '' ||
    taskCategory === ''
) {
    alert('Please fill all the fields');
    return;
}
```

### Duplicate Task Validation

```javascript
if (
    taskList.some(
        task => task.taskTitle === taskTitle
    )
) {
    alert('Task with this title already exists');
    return;
}
```

### Why Validation?

* Prevent empty submissions.
* Prevent duplicate tasks.
* Improve data quality.

---

# Concepts Used

## DOM Manipulation

```javascript
document.querySelector()
document.getElementById()
element.innerHTML
```

Used to dynamically update the page.

---

## Event Handling

```javascript
addEventListener()
```

Used for:

* Form submission
* Button clicks
* User interactions

---

## Local Storage

```javascript
localStorage.setItem()
localStorage.getItem()
```

Used to persist task data.

---

## JSON Methods

```javascript
JSON.stringify()
JSON.parse()
```

Used to convert data between:

* JavaScript Objects
* JSON Strings

---

# Browser Rendering Pipeline

The browser converts code into visual content through the following stages:

```text
HTML
 ↓
Parsing
 ↓
Tokenization
 ↓
DOM Tree
 ↓
CSSOM
 ↓
Render Tree
 ↓
Layout
 ↓
Paint
```

### Explanation

| Stage        | Description                    |
| ------------ | ------------------------------ |
| HTML         | Browser receives HTML          |
| Parsing      | Reads document structure       |
| Tokenization | Breaks content into tokens     |
| DOM Tree     | Creates document object model  |
| CSSOM        | Creates CSS object model       |
| Render Tree  | Combines DOM and CSSOM         |
| Layout       | Calculates positions and sizes |
| Paint        | Draws pixels on screen         |

---

# Event Propagation

Events travel through the DOM in three phases.

```text
Capturing
    ↓
Target
    ↓
Bubbling
```

Example:

```text
Grandparent
   ↓
Parent
   ↓
Child
   ↓
Button
```

Execution Order:

```text
Capturing: Grandparent
Capturing: Parent
Capturing: Child
Target: Button

Bubbling: Child
Bubbling: Parent
Bubbling: Grandparent
```

### Event Listener

```javascript
element.addEventListener(
    "click",
    handler,
    true
);
```

`true` enables capturing.

```javascript
element.addEventListener(
    "click",
    handler,
    false
);
```

`false` enables bubbling.

---

# HTML Attributes vs DOM Properties

### Attribute

Defined in HTML.

```html
<input value="Krishna">
```

```javascript
input.getAttribute("value");
```

Output:

```text
Krishna
```

---

### Property

Belongs to DOM object.

```javascript
input.value
```

Output:

```text
Krishna
```

---

### After Changing Property

```javascript
input.value =
    "Changed via JS Property";
```

Results:

```javascript
input.getAttribute("value");
// Krishna

input.value;
// Changed via JS Property
```

### Difference

| Attribute                    | Property                  |
| ---------------------------- | ------------------------- |
| Defined in HTML              | Defined on DOM Object     |
| Initial Value                | Current Value             |
| String Only                  | Any JavaScript Type       |
| Accessed via getAttribute()  | Accessed via dot notation |
| Doesn't automatically update | Updates dynamically       |

---

# Future Improvements

* Search Tasks
* Filter by Category
* Sort by Date
* Dark Mode Toggle
* Drag and Drop Reordering
* Due Dates
* Priority Levels
* Toast Notifications

---

# Conclusion

This project demonstrates practical usage of:

* DOM Manipulation
* Event Handling
* Form Validation
* Local Storage
* Dynamic Rendering
* Event Propagation
* Browser Rendering Pipeline
* Attributes vs Properties

A small project, but it touches many core JavaScript concepts that appear in interviews and real-world frontend development.
