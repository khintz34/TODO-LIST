import { addTask, addArchiveTask } from "./task.js";
import {
  createModal,
  modalClickAdd,
  modalClickProject,
  modalClickRemove,
  modalClickEdit,
  modalClickArchive,
} from "./modals.js";
import { projectArray, runMonth, runToday, runWeek } from "./projects.js";

const createContainer = () => {
  const container = document.createElement("div");
  container.setAttribute("id", "container");
  container.classList.add("container-bg");

  container.appendChild(createMain());
  container.appendChild(createModal("add"));
  container.appendChild(createModal("project"));
  container.appendChild(createModal("remove"));
  container.appendChild(createModal("edit"));
  container.appendChild(createModal("archive"));

  return container;
};

function createMain() {
  const main = document.createElement("div");
  main.setAttribute("id", "main");
  main.classList.add("main-bg");

  main.appendChild(createHeader());
  main.appendChild(createLeftBar());
  main.appendChild(createTaskArea());

  return main;
}

function createHeader() {
  const header = document.createElement("div");
  header.setAttribute("id", "header");

  const title = document.createElement("h1");
  title.setAttribute("id", "title");
  title.textContent = "To Do Task List";

  header.appendChild(title);

  return header;
}

export function createLeftBar() {
  const leftBar = document.createElement("div");
  leftBar.setAttribute("id", "left-bar");
  leftBar.textContent = "";
  leftBar.appendChild(createGroup("home-group"));
  leftBar.appendChild(createGroup("project-group"));
  leftBar.appendChild(createGroup("add-group"));

  return leftBar;
}

export function createGroup(id) {
  const group = document.createElement("div");
  group.classList.add("group");
  group.setAttribute("id", id);

  let grpLine = document.createElement("hr");

  if (id === "home-group") {
    group.appendChild(createBtn("home", "Home"));
    group.appendChild(createBtn("today", "Today"));
    group.appendChild(createBtn("week", "Week"));
    group.appendChild(createBtn("month", "Month"));
    group.appendChild(grpLine);
  } else if (id === "project-group") {
    const projectList = document.createElement("h3");
    projectList.textContent = "Project List";
    projectList.setAttribute("id", "project-list");
    group.appendChild(projectList);

    for (let i = 0; i < projectArray.length; i++) {
      group.appendChild(createBtn("project", projectArray[i]));
    }
  } else if (id === "add-group") {
    group.appendChild(grpLine);
    group.appendChild(createBtn("add-task", "Add Task"));
    group.appendChild(createBtn("add-project", "Add Project"));
    group.appendChild(createBtn("remove-project", "Remove Project"));
    group.appendChild(createBtn("archive", "Task Archive"));
  } else {
    console.log("error in group if statement");
  }

  return group;
}

export function createBtn(id, content) {
  const btn = document.createElement("button");
  btn.textContent = content;
  btn.addEventListener("click", (e) => {
    chooseID(id, content);
  });

  if (id === "project") {
    btn.classList.add("project");
    let projectCounter = 1;
    btn.setAttribute("id", content);
    projectCounter++;
  } else {
    btn.setAttribute("id", id);
  }

  return btn;
}
export let projectMapArray = [];

function chooseID(id, content) {
  const taskArea = document.getElementById("task-area");
  if (id === "add-task") {
    modalClickAdd();
  } else if (id === "add-project") {
    modalClickProject();
  } else if (id === "remove-project") {
    if (projectArray.length === 0) {
      alert("No Projects in Project List. Add a Project!");
      return;
    } else {
      modalClickRemove();
    }
  } else if (id === "archive") {
    modalClickArchive();
  } else if (id === "home") {
    appendTasks(allTasks);
  } else if (id === "today") {
    runToday();
  } else if (id === "week") {
    runWeek();
  } else if (id === "month") {
    runMonth();
  } else {
    projectMapArray = [];
    allTasks.map(function (obj) {
      if (obj.project === content) {
        projectMapArray.push(obj);
      }
    });
    appendTasks(projectMapArray);
  }
}

export const allTasks = [];
export const archiveTasks = [];

function createTaskArea() {
  const taskArea = document.createElement("div");
  taskArea.setAttribute("id", "task-area");

  allTasks.push(new newTask("Name", "Project", "Priority", "Date"));

  taskArea.appendChild(addTask("Name", "Project", "Priority", "Date"));

  return taskArea;
}

export function appendTasks(array) {
  const taskArea = document.getElementById("task-area");
  taskArea.textContent = "";

  let num = 0;

  for (let i = 0; i < array.length; i++) {
    taskArea.appendChild(
      addTask(
        array[i].title,
        array[i].project,
        array[i].priority,
        array[i].date,
        num
      )
    );
    num++;
  }
}

export const appendArchives = () => {
  const archiveMain = document.getElementById("archiveMain");
  archiveMain.textContent = "";

  let num = 0;
  for (let i = 0; i < archiveTasks.length; i++) {
    archiveMain.appendChild(
      addArchiveTask(
        archiveTasks[i].title,
        archiveTasks[i].project,
        archiveTasks[i].priority,
        archiveTasks[i].date,
        num
      )
    );
    num++;
  }
};

export const newTask = function (title, project, priority, date) {
  this.title = title;
  this.project = project;
  this.priority = priority;
  this.date = date;
};

function initializeToDoList() {
  const content = document.getElementById("content");
  content.appendChild(createContainer());
}

export default initializeToDoList;
