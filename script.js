const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

// Save tasks in browser
function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            task.completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        // Task text
        const span = document.createElement("span");
        span.textContent = task.name;

        if (task.completed) {
            span.style.textDecoration = "line-through";
            span.style.color = "gray";
        }

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

// Add task
taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        name: taskName,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
});

// Show saved tasks when website opens
displayTasks();