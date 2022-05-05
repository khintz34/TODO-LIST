import { allTasks, appendArchives, archiveTasks, newTask } from "./website.js";
import { projectArray } from "./projects.js";
import { modalClickEdit } from "./modals.js";

let taskCounter = 0;

export function addTask(title, project, priority, date, num) {
  const task = document.createElement("div");
  task.classList.add("task");
  task.setAttribute("id", "task" + taskCounter);

  task.appendChild(addTaskName(title));
  task.appendChild(addTaskProject(project));
  task.appendChild(addTaskPriority(priority));
  task.appendChild(addTaskDate(date));
  task.appendChild(addTaskComplete(num));
  task.appendChild(addTaskEdit(num));
  task.appendChild(addTaskDelete(num));

  taskCounter++;

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

  taskEdit = document.createElement("button");
  taskEdit.classList.add("btn-todo");
  taskEdit.classList.add("icon-edit");
  taskEdit.innerHTML = '<span class="material-icons-outlined">edit</span>';
  taskEdit.addEventListener("click", (e) => {
    if (num === undefined) {
      num = 0;
    }
    modalClickEdit(
      allTasks[num].title,
      allTasks[num].project,
      allTasks[num].priority,
      allTasks[num].date,
      num
    );
  });
  taskEdit.classList.add("task-item");

  return taskEdit;
}

export function editTaskfromModal() {
  // const taskID = document.getElementById(e.target.parentNode.parentNode.id);
  // let newTitle = prompt("new name?", allTasks[num].title);
  // allTasks[num].title = newTitle;
  // taskID.firstChild.textContent = newTitle;
}

function addTaskDelete(num) {
  let taskDelete;

  taskDelete = document.createElement("button");
  taskDelete.classList.add("btn-todo");
  taskDelete.classList.add("icon-edit");
  taskDelete.innerHTML = '<span class="material-icons-outlined">delete</span>';
  taskDelete.addEventListener("click", (e) => {
    const taskID = document.getElementById(e.target.parentNode.parentNode.id);

    const taskArea = document.getElementById("task-area");

    taskArea.removeChild(taskID);

    if (num === undefined) {
      num = 0;
      allTasks.splice(num, 1);
    } else {
      allTasks.splice(num, 1);
    }
  });

  taskDelete.classList.add("task-item");

  return taskDelete;
}

function addTaskComplete(num) {
  let taskComplete;
  taskComplete = document.createElement("button");
  taskComplete.classList.add("btn-todo");
  taskComplete.classList.add("icon-complete");
  taskComplete.innerHTML =
    '<span class="material-symbols-outlined">check_circle</span>';
  taskComplete.addEventListener("click", (e) => {
    const taskID = document.getElementById(e.target.parentNode.parentNode.id);
    const taskArea = document.getElementById("task-area");

    taskArea.removeChild(taskID);

    let titleTest = taskID.firstChild.textContent;
    let projectTest = taskID.firstChild.nextSibling.textContent;
    let priorityTest = taskID.firstChild.nextSibling.nextSibling.textContent;
    let dateTest =
      taskID.firstChild.nextSibling.nextSibling.nextSibling.textContent;

    allTasks.map(function (obj, index) {
      if (
        obj.title === titleTest &&
        obj.project === projectTest &&
        obj.priority === priorityTest &&
        obj.date === dateTest
      ) {
        archiveTasks.push(
          new newTask(titleTest, projectTest, priorityTest, dateTest)
        );
        allTasks.splice(index, 1);
      }
    });

    appendArchives();
  });

  taskComplete.classList.add("task-item");

  return taskComplete;
}

export function addArchiveTask(title, project, priority, date, num) {
  const task = document.createElement("div");
  task.classList.add("archive");
  task.setAttribute("id", "archive" + taskCounter);

  task.appendChild(addTaskName(title));
  task.appendChild(addTaskProject(project));
  task.appendChild(addTaskPriority(priority));
  task.appendChild(addTaskDate(date));

  taskCounter++;

  return task;
}

// export default addTask;
