let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const newTaskText = taskInput.value.trim();
  if (newTaskText === "") return;

  const newTask = {
    id: Date.now(),
    text: newTaskText,
    isDone: false
  };

  tasks.push(newTask);
  taskInput.value = '';
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function toggleTaskStatus(id) {
  const task = tasks.find(task => task.id === id);
  task.isDone = !task.isDone;
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.textContent = task.text;
    if (task.isDone) {
      taskItem.classList.add('done');
    }

    const toggleButton = document.createElement('button');
    toggleButton.classList.add('done');
    toggleButton.innerHTML = task.isDone ? '<i class="fa fa-undo"></i> Undo' : '<i class="fa fa-check"></i> Done';
    toggleButton.onclick = () => toggleTaskStatus(task.id);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa fa-trash"></i> Delete';
    deleteButton.onclick = () => deleteTask(task.id);

    taskItem.appendChild(toggleButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  });
}

document.addEventListener('DOMContentLoaded', renderTasks);
