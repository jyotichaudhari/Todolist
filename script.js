

document.addEventListener('DOMContentLoaded', () => {
     const taskInput = document.getElementById('input-box');
     const addTaskBtn = document.getElementById('addTask');
     const taskList = document.getElementById('list-task');
 
     // Load tasks from local storage
     const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
 
     function renderTasks() {
         taskList.innerHTML = '';
         tasks.forEach((task, index) => {
             const li = document.createElement('li');
             li.innerHTML = `
                 <span>${task.text}</span>
                 <div class="actions">
                 <button class="edit"><i class="bi bi-pencil-square"></i></button> 
                 <button class="delete"><i class="bi bi-trash"></i> </button>
             </div>
             `;
 
             // Edit task
             li.querySelector('.edit').addEventListener('click', () => {
                 const newText = prompt('Edit task:', task.text);
                 if (newText !== null) {
                     tasks[index].text = newText;
                     saveTasks();
                     renderTasks();
                 }
             });
 
 
             // Delete task
             li.querySelector('.delete').addEventListener('click', () => {
                 tasks.splice(index, 1);
                 saveTasks();
                 renderTasks();
             });
 
             // Add task to the list
             taskList.appendChild(li);
         });
     }
 
     function saveTasks() {
         localStorage.setItem('tasks', JSON.stringify(tasks));
     }
 
     addTaskBtn.addEventListener('click', () => {
         const taskText = taskInput.value.trim();
         if (taskText !== '') {
             tasks.push({ text: taskText, });
             taskInput.value = '';
             saveTasks();
             renderTasks();
         }
     });
 
     renderTasks();
 });