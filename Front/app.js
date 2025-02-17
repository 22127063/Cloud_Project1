document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task");
    const taskList = document.querySelector(".tasks-list");
    const searchInput = document.getElementById("search");
    const searchButton = document.getElementById("search-btn");
    const clearButton = document.getElementById("clear");

    // Function to add a new task
    function addTask(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task"); // Pop-up error message
            return;
        }

        // Create task item
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        // Task input field
        const taskInputField = document.createElement("input");
        taskInputField.type = "text";
        taskInputField.value = taskText;
        taskInputField.readOnly = true;

        // Edit button
        const editButton = document.createElement("button");
        editButton.classList.add("edit");
        editButton.textContent = "Edit";

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.textContent = "Delete";

        // Append elements
        taskItem.appendChild(taskInputField);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        // Clear input field
        taskInput.value = "";

        // Event listeners for edit and delete
        editButton.addEventListener("click", () => editTask(editButton, taskInputField));
        deleteButton.addEventListener("click", () => deleteTask(taskItem));
    }

    // Function to edit a task
    function editTask(button, inputField) {
        if (button.textContent === "Edit") {
            inputField.readOnly = false;
            inputField.focus();
            button.textContent = "Save";
        } else {
            if (inputField.value.trim() === "") {
                alert("Task cannot be empty!"); // Pop-up error message
                return;
            }
            inputField.readOnly = true;
            button.textContent = "Edit";
        }
    }

    // Function to delete a task
    function deleteTask(taskItem) {
        taskList.removeChild(taskItem);
    }

    // Function to search tasks
    function searchTasks() {
        const searchTerm = searchInput.value.toLowerCase();
        const tasks = document.querySelectorAll(".task-item");
        let found = false;

        tasks.forEach(task => {
            const taskText = task.querySelector("input").value.toLowerCase();
            if (taskText.includes(searchTerm)) {
                task.style.display = "flex";
                found = true;
            } else {
                task.style.display = "none";
            }
        });

        if (!found) {
            alert("No matching tasks found!"); // Pop-up error message
        }
    }

    // Function to clear all tasks
    function clearTasks() {
        if (taskList.children.length === 0) {
            alert("No tasks to clear!"); // Pop-up error message
            return;
        }

        if (confirm("Are you sure you want to clear all tasks?")) {
            taskList.innerHTML = "";
        }
    }

    // Event listeners
    taskForm.addEventListener("submit", addTask);
    searchButton.addEventListener("click", searchTasks);
    clearButton.addEventListener("click", clearTasks);
});
