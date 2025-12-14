// console.log("Welcome Back!!!");

// const input = document.getElementById('input');
// const button = document.getElementById('btn');
// const listContainer = document.getElementById('list');
// const noTask = document.getElementById('no-task');


// const key = "Tasks";

// const listItems = document.createElement('li');
// const deleteLi = document.createElement('button');



// // button.addEventListener('click', () => {

// //     if (input.value === "") {
// //         return alert("Add Some task?");
// //     }

// //     let text = input.value.trim();

// //     alert(`Task added succesfully!!!`)
// //     listItems.textContent = text;
// //     deleteLi.textContent = "Delete";
// //     deleteLi.addEventListener('click', () => {
// //         confirm(`Are you sure want to remove this Task : ${text}`)
// //         listItems.remove();
// //         return noTaskMessage();
// //     })
// //     listContainer.appendChild(listItems);
// //     listItems.appendChild(deleteLi);

// //     input.value = "";

// //     noTaskMessage();
// // }
// // )
// function noTaskMessage() {
//     if (listContainer.children.length === 0) {
//         return noTask.style.display = "block";
//     } else {
//         return noTask.style.display = "none";

//     }
// }
// // function saveTask() {

// //     //Local Storage
// //     const message = [input.value.trim()];

// //     if (message) {
// //         localStorage.setItem(key, message);
// //         alert('Task added successfully!!');
// //         loadData();
// //     } else {
// //         alert('Add some task!!')
// //     }
// // }

// // 
// function saveTasksToLocalStorage() {
//     const tasks = [];
//     // Iterate over all list items currently on the screen
//     Array.from(listContainer.children).forEach(li => {
//         // Find the task text by looking at the first child node (excluding the button)
//         // A more robust method is to store the task text as a data attribute.
//         // For simplicity, we'll strip the "Delete" button text.
//         const taskText = li.firstChild.nodeValue.trim();
//         if (taskText) {
//             tasks.push(taskText);
//         }
//     });
//     // Store the array as a JSON string
//     localStorage.setItem(key, JSON.stringify(tasks));
// }


// // --- 3. Rendering: Create Single Task Element (with Delete Logic) ---
// function createTaskElement(taskText) {
//     // CRITICAL FIX: Create NEW elements every time
//     let li = document.createElement('li');
//     let deleteBtn = document.createElement('button');

//     // Set the text content (text node comes first)
//     li.textContent = taskText;

//     deleteBtn.textContent = " Delete"; // Added a space for separation
//     deleteBtn.addEventListener('click', () => {
//         if (confirm(`Are you sure you want to remove this Task: ${taskText}?`)) {
//             li.remove();
//             saveTasksToLocalStorage(); // Re-save after deletion
//             noTaskMessage();
//         }
//     });

//     // Append the delete button to the list item
//     li.appendChild(deleteBtn);
//     return li;
// }


// // --- 4. Local Storage: Load Tasks from Storage ---
// function loadData() {
//     // Clear the current list before loading
//     listContainer.innerHTML = '';

//     const storedTasksJSON = localStorage.getItem(key);

//     if (storedTasksJSON) {
//         // CRITICAL FIX: Parse the JSON string back into an array
//         const tasksArray = JSON.parse(storedTasksJSON);

//         // Loop through the array and create elements for each task
//         tasksArray.forEach(taskText => {
//             const taskElement = createTaskElement(taskText);
//             listContainer.appendChild(taskElement);
//         });

//     }

//     noTaskMessage(); // Check if list is empty after loading
// }


// // --- 5. Main Logic: Add Task Handler ---
// button.addEventListener('click', () => {
//     const text = input.value.trim();

//     if (text === "") {
//         return alert("Add Some task?");
//     }

//     // 1. Create and append the new task element
//     const newTask = createTaskElement(text);
//     listContainer.appendChild(newTask);

//     alert(`Task added successfully!!!`);

//     // 2. Save the updated list to local storage
//     saveTasksToLocalStorage();

//     // 3. Update the message and clear input
//     noTaskMessage();
//     input.value = "";
// });

// window.onload = loadData;
