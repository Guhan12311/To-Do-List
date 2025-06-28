const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => createTask(task.text, task.completed));
};

function createTask(text, completed = false) {
  const li = document.createElement('li');
  li.className = 'task';
  if (completed) li.classList.add('completed');

  const span = document.createElement('span');
  span.textContent = text;

  span.onclick = () => {
    li.classList.toggle('completed');
    saveTasks();
  };

  const delBtn = document.createElement('button');
  delBtn.innerHTML = '🗑️';
  delBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);

  saveTasks();
}

addBtn.onclick = () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    createTask(taskText);
    taskInput.value = '';
  }
};

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task').forEach(task => {
    tasks.push({
      text: task.querySelector('span').textContent,
      completed: task.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
