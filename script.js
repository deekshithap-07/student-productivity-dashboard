// ---------- STUDY GOAL ----------
function setGoal() {
  const goalInput = document.getElementById("goalInput");
  const goal = goalInput.value;

  if (goal === "") return;

  localStorage.setItem("studyGoal", goal);
  document.getElementById("goalText").innerText =
    `Today's Goal: ${goal} hours`;
}

// ---------- PROGRESS BAR ----------
function updateProgress() {
  const goal = localStorage.getItem("studyGoal");
  const completedInput = document.getElementById("completedInput");
  const completed = completedInput.value;

  if (!goal || completed === "") return;

  const percent = Math.min((completed / goal) * 100, 100);

  localStorage.setItem("progressPercent", percent);

  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("progressPercent").innerText =
    `${Math.round(percent)}% completed`;
}

// ---------- TASKS ----------
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value;

  if (taskText === "") return;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push({
    text: taskText,
    completed: false
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";

  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.style.textDecoration = "line-through";
    }

    li.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };

    taskList.appendChild(li);
  });

  updateStats();
}

// ---------- TASK STATS ----------
function updateStats() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const completed = tasks.filter(task => task.completed).length;

  document.getElementById("taskStats").innerText =
    `Completed: ${completed} / ${tasks.length}`;
}

// ---------- LOAD SAVED DATA ----------
window.onload = () => {
  const goal = localStorage.getItem("studyGoal");
  const percent = localStorage.getItem("progressPercent");

  if (goal) {
    document.getElementById("goalText").innerText =
      `Today's Goal: ${goal} hours`;
  }

  if (percent) {
    document.getElementById("progressBar").style.width = percent + "%";
    document.getElementById("progressPercent").innerText =
      `${Math.round(percent)}% completed`;
  }

  renderTasks();
};
