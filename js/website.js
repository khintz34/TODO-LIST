import addTask from "./task.js";
import { createModal, modalClickAdd, modalClickProject } from "./modals.js";
import { projectArray, initailizeProjectArray } from "./projects.js";

const createContainer = () => {
  const container = document.createElement("div");
  container.setAttribute("id", "container");
  container.classList.add("container-bg");

  container.appendChild(createMain());
  container.appendChild(createModal("add"));
  container.appendChild(createModal("project"));

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
  console.log("left bar ran");
  const leftBar = document.createElement("div");
  leftBar.setAttribute("id", "left-bar");
  leftBar.textContent = "";
  leftBar.appendChild(createGroup("home-group"));
  leftBar.appendChild(createGroup("project-group"));
  leftBar.appendChild(createGroup("add-group"));

  return leftBar;
}

function createGroup(id) {
  const group = document.createElement("div");
  group.classList.add("group");
  group.setAttribute("id", id);

  if (id === "home-group") {
    group.appendChild(createBtn("home", "Home"));
    group.appendChild(createBtn("today", "Today"));
    group.appendChild(createBtn("week", "Week"));
    group.appendChild(createBtn("month", "Month"));
  } else if (id === "project-group") {
    const projectList = document.createElement("h3");
    projectList.textContent = "Project List";
    projectList.setAttribute("id", "project-list");
    group.appendChild(projectList);

    console.log(projectArray.length);

    for (let i = 0; i < projectArray.length; i++) {
      console.log(projectArray[i]);
      group.appendChild(createBtn("project", projectArray[i]));
    }
  } else if (id === "add-group") {
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
  console.log(`${id} is the ID.   ${content} is the content`);
  const btn = document.createElement("button");
  btn.textContent = content;
  btn.addEventListener("click", (e) => {
    chooseID(id);
  });

  if (id === "project") {
    console.log("project was the id");
    btn.classList.add("project");
    let projectCounter = 1;
    btn.setAttribute("id", "project" + projectCounter);
    projectCounter++;
  } else {
    btn.setAttribute("id", id);
  }

  return btn;
}

function chooseID(id) {
  const taskArea = document.getElementById("task-area");
  if (id === "add-task") {
    modalClickAdd();
  } else if (id === "add-project") {
    modalClickProject();
  } else {
    console.log("dlicked on something other than add task");
  }
}

export const allTasks = [];

function createTaskArea() {
  const taskArea = document.createElement("div");
  taskArea.setAttribute("id", "task-area");

  allTasks.push(new newTask("Name", "Project", "Priority", "Date", 0));

  taskArea.appendChild(addTask("Name", "Project", "Priority", "Date", 0));

  return taskArea;
}

export function appendTasks() {
  const taskArea = document.getElementById("task-area");
  taskArea.textContent = "";

  for (let i = 0; i <= allTasks.length; i++) {
    taskArea.appendChild(
      addTask(
        allTasks[i].title,
        allTasks[i].project,
        allTasks[i].priority,
        allTasks[i].date,
        1
      )
    );
  }
}

export const newTask = function (title, project, priority, date, num) {
  this.title = title;
  this.project = project;
  this.priority = priority;
  this.date = date;
  this.num = num;
};

function initializeToDoList() {
  const content = document.getElementById("content");
  content.appendChild(createContainer());
}

export default initializeToDoList;
