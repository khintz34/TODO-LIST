import { allTasks } from "./website.js";

function addTask(title, project, priority, date, num) {
  const task = document.createElement("div");
  task.classList.add("task");

  task.appendChild(addTaskName(title));
  task.appendChild(addTaskProject(project));
  task.appendChild(addTaskPriority(priority));
  task.appendChild(addTaskDate(date));
  task.appendChild(addTaskEdit(num));
  task.appendChild(addTaskDelete(num));

  return task;
}

function addTaskName(title) {
  const taskName = document.createElement("div");
  taskName.classList.add("task-item");
  taskName.textContent = title;

  return taskName;
}

function addTaskProject(project) {
  const taskProject = document.createElement("div");
  taskProject.classList.add("task-item");
  taskProject.textContent = project;

  return taskProject;
}

function addTaskPriority(priority) {
  const taskPriority = document.createElement("div");
  taskPriority.classList.add("task-item");
  taskPriority.textContent = priority;

  return taskPriority;
}

function addTaskDate(date) {
  const taskDate = document.createElement("div");
  taskDate.classList.add("task-item");
  taskDate.textContent = date;

  return taskDate;
}

function addTaskEdit(num) {
  let taskEdit;

  if (num === 0) {
    taskEdit = document.createElement("div");
    taskEdit.textContent = "Edit";
  } else {
    taskEdit = document.createElement("button");
    taskEdit.classList.add("btn-todo");
    taskEdit.classList.add("icon-edit");
    taskEdit.innerHTML = '<span class="material-icons-outlined">edit</span>';
    taskEdit.addEventListener("click", (e) => {
      console.log("EDIT");
    });
  }

  taskEdit.classList.add("task-item");

  return taskEdit;
}

function addTaskDelete(num) {
  let taskDelete;

  if (num === 0) {
    taskDelete = document.createElement("div");
    taskDelete.textContent = "Delete";
  } else {
    taskDelete = document.createElement("button");
    taskDelete.classList.add("btn-todo");
    taskDelete.classList.add("icon-edit");
    taskDelete.innerHTML =
      '<span class="material-icons-outlined">delete</span>';
    taskDelete.addEventListener("click", (e) => {
      console.log("TRASH");
    });
  }

  taskDelete.classList.add("task-item");

  return taskDelete;
}

export default addTask;
