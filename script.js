// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const category = document.getElementById('category').value;
  if (category === '') return alert("Please enter a task category.");

  let tasks = getTasksFromStorage();

  // Create task object and push it to tasks array
  const newTask = { id: Date.now(), category };
  tasks.push(newTask);

  // Save tasks back to localStorage
  saveTasksToStorage(tasks);

  // Clear input field
  document.getElementById('category').value = '';

  // Refresh the task table
  displayTasks();
}

function editTask(taskId) {
  let tasks = getTasksFromStorage();
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  const newCategory = prompt("Edit task category:", tasks[taskIndex].category);
  if (newCategory) {
    tasks[taskIndex].category = newCategory;

    // Save the edited task back to localStorage
    saveTasksToStorage(tasks);

    // Refresh the task table
    displayTasks();
  }
}

function deleteTask(taskId) {
  let tasks = getTasksFromStorage();

  // Filter out the task with the provided id
  tasks = tasks.filter(task => task.id !== taskId);

  // Save the updated tasks back to localStorage
  saveTasksToStorage(tasks);

  // Refresh the task table
  displayTasks();
}

function displayTasks() {
  const tasks = getTasksFromStorage();
  const tbody = document.querySelector("#taskTable tbody");
  tbody.innerHTML = '';  // Clear previous rows

  tasks.forEach(task => {
    const row = document.createElement('tr');

    // Task category
    const categoryCell = document.createElement('td');
    categoryCell.textContent = task.category;
    row.appendChild(categoryCell);

    // Edit button
    const editCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.classList.add('edit');
    editButton.onclick = () => editTask(task.id);
    editCell.appendChild(editButton);
    row.appendChild(editCell);

    // Delete button
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTask(task.id);
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    tbody.appendChild(row);
  });
}

function getTasksFromStorage() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  displayTasks();
}
