document.addEventListener("DOMContentLoaded", function () {
    console.log("Welcome Back!!!");

    const input = document.getElementById('input');
    const button = document.getElementById('btn');
    const listContainer = document.getElementById('list');
    const completedList = document.getElementById('completedList');
    const pending = document.getElementById('pending');
    const completed = document.getElementById('completed');
    const pendingBox = document.getElementById('pendingBox');
    const completedBox = document.getElementById('completedBox');
    const pendingNoTask = document.getElementById('pending-no-task');
    const completedNoTask = document.getElementById('completed-no-task');

    pendingBox.style.display = "block";
    completedBox.style.display = "none";

    // When clicking "Pending"
    pending.addEventListener('click', () => {
        console.log('pending button clicked');
        pendingBox.style.display = "block";
        completedBox.style.display = "none";
    });

    // When clicking "Completed"
    completed.addEventListener('click', () => {
        console.log('completed button clicked');
        pendingBox.style.display = "none";
        completedBox.style.display = "block";
    });


    const key = "Tasks";

    const noTaskMessage = () => {
        pendingNoTask.style.display = listContainer.children.length === 0 ? "block" : "none";
        completedNoTask.style.display = completedList.children.length === 0 ? "block" : "none";
    }

    const saveTasksToLocalStorage = () => {
        const tasks = [];
        //We use this to iterate over all available tasks
        Array.from(listContainer.children).forEach(li => {
            const taskText = li.dataset.task || li.textContent.trim();
            if (taskText) {
                tasks.push(taskText);
            }
        });
        localStorage.setItem(key, JSON.stringify(tasks));
    }

    const createTasksElements = (taskText) => {
        let list = document.createElement('li');
        let deleteBtn = document.createElement('button');
        let doneBtn = document.createElement('button');
        let timestampSpan = document.createElement('span');

        list.dataset.task = taskText;
        list.textContent = taskText;

        // Styling for timestamp
        timestampSpan.style.marginLeft = "10px";
        timestampSpan.style.fontSize = "0.8rem";
        timestampSpan.style.color = "#666";

        // Classes
        list.classList.add('li-task');

        // Initial timestamp when added
        timestampSpan.textContent = ` (Added: ${new Date().toLocaleString()})`;

        //Added class name for styling 
        list.classList.add('li-task');
        deleteBtn.classList.add('delete-task');
        doneBtn.classList.add('done-task');


        //Completed Tasks
        doneBtn.addEventListener('click', () => {
            alert(`Your task : "${taskText}" completed successfully!!!`)
            // Move the whole <li> into completedList
            completedList.appendChild(list);
            doneBtn.style.display = "none";
            deleteBtn.style.display = 'none';


            let reAddBtn = document.createElement('button');
            reAddBtn.classList.add('re-add');
            reAddBtn.textContent = "Re-Add";
            list.appendChild(reAddBtn);
            list.appendChild(timestampSpan);

            reAddBtn.addEventListener('click', () => {
                if (confirm(`Are you sure you want to re‑add "${taskText}" to pending?`)) {
                    listContainer.appendChild(list); // move back to pending
                    reAddBtn.remove();               // remove the re‑add button
                    doneBtn.style.display = "inline-block";   // show buttons again
                    deleteBtn.style.display = "inline-block";
                    noTaskMessage();
                }
                // Update timestamp
                timestampSpan.textContent = ` (Re‑Added: ${new Date().toLocaleString()})`;
            });
            noTaskMessage();
            // Update timestamp
            timestampSpan.textContent = ` (Completed: ${new Date().toLocaleString()})`;
        });

        doneBtn.textContent = "  Done";
        deleteBtn.textContent = " Delete"; // Added a space for separation
        deleteBtn.addEventListener('click', () => {
            if (confirm(`Are you sure you want to remove this Task: "${taskText}"?`)) {
                list.remove();
                saveTasksToLocalStorage(); // Re-save after deletion
                noTaskMessage();
            }
        });

        list.dataset.task = taskText; // store original text
        list.textContent = taskText;
        //Appending the created eliment nodes to DOM
        // listContainer.appendChild(list);
        list.appendChild(deleteBtn);
        list.appendChild(doneBtn);
        list.appendChild(timestampSpan);
        return list;
    }
    noTaskMessage();

    function loadData() {
        listContainer.innerHTML = "";

        const storedTaskJSON = localStorage.getItem(key);

        if (storedTaskJSON) {
            const arrayTasks = JSON.parse(storedTaskJSON);

            arrayTasks.forEach(tasksText => {
                const taskElement = createTasksElements(tasksText);
                listContainer.appendChild(taskElement);
            });
        }
        noTaskMessage();
    }

    // --- 5. Main Logic: Add Task Handler ---
    button.addEventListener('click', () => {
        const text = input.value.trim();

        if (text === "") {
            return alert("Add Some task?");
        }

        // 1. Create and append the new task element
        const newTask = createTasksElements(text);
        listContainer.appendChild(newTask);

        alert(`Task added successfully!!!`);

        // 2. Save the updated list to local storage
        saveTasksToLocalStorage();

        // 3. Update the message and clear input
        noTaskMessage();
        input.value = "";
    });


    window.onload = loadData;

});
