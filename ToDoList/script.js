document.addEventListener("DOMContentLoaded", loadTasks);

        function addTask() {
            let taskInput = document.getElementById("todo-input");
            let descInput = document.getElementById("desc-input");
            let taskText = taskInput.value.trim();
            let descText = descInput.value.trim();
            if (taskText === "") return;

            let li = document.createElement("li");
            li.innerHTML = `
                <strong onclick="toggleComplete(this)">${taskText}</strong>
                <p>${descText}</p>
                <div class="task-buttons">
                    <button class="edit-btn" onclick="editTask(this)">Edit</button>
                    <button class="delete-btn" onclick="removeTask(this)">Delete</button>
                    <button class="move-btn" onclick="moveToTop(this)">Move to Top</button>
                </div>
            `;
            document.getElementById("todo-list").appendChild(li);
            saveTasks();
            taskInput.value = "";
            descInput.value = "";
        }

        function removeTask(button) {
            button.closest("li").remove();
            saveTasks();
        }

        function editTask(button) {
            let taskItem = button.closest("li");
            let taskText = taskItem.querySelector("strong");
            let descText = taskItem.querySelector("p");
            let newTask = prompt("Edit your task:", taskText.textContent);
            let newDesc = prompt("Edit your description:", descText.textContent);
            if (newTask !== null && newTask.trim() !== "") {
                taskText.textContent = newTask;
            }
            if (newDesc !== null) {
                descText.textContent = newDesc;
            }
            saveTasks();
        }

        function moveToTop(button) {
            let taskItem = button.closest("li");
            let list = document.getElementById("todo-list");
            list.prepend(taskItem);
            saveTasks();
        }

        function toggleComplete(span) {
            span.classList.toggle("completed");
            saveTasks();
        }

        function clearAllTasks() {
            document.getElementById("todo-list").innerHTML = "";
            localStorage.removeItem("tasks");
        }

        function saveTasks() {
            let tasks = [];
            document.querySelectorAll("#todo-list li").forEach(li => {
                let taskText = li.querySelector("strong").textContent;
                let descText = li.querySelector("p").textContent;
                let completed = li.querySelector("strong").classList.contains("completed");
                tasks.push({ text: taskText, description: descText, completed });
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

        function loadTasks() {
            let savedTasks = localStorage.getItem("tasks");
            if (savedTasks) {
                JSON.parse(savedTasks).forEach(task => addTask(task.text, task.description, task.completed));
            }
        }