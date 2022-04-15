import { container } from "webpack";
import addTask from "./task";
import constants from "./task";

const createContainer = () => {
  const container = document.createElement("div");
  container.setAttribute("id", "container");

  container.appendChild(createMain());

  return container;
};

function createMain() {
  const main = document.createElement("div");
  main.setAttribute("id", "main");

  main.appendChild(createHeader());
  main.appendChild(createLeftBar());
  main.appendChild(createTaskArea());
  main.appendChild(createPopOuts());

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

function createLeftBar() {
  const leftBar = document.createElement("div");
  leftBar.setAttribute("id", "left-bar");

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
    group.appendChild(createBtn("project", "Project1"));
    group.appendChild(createBtn("project", "Project2"));
    group.appendChild(createBtn("project", "Project3"));
    group.appendChild(createBtn("project", "Project4"));
  } else if (id === "add-group") {
    group.appendChild(createBtn("add-task", "Add Task"));
    group.appendChild(createBtn("add-project", "Add Project"));
    group.appendChild(createBtn("remove-project", "Remove Project"));
    group.appendChild(createBtn("archive", "Project Archive"));
  } else {
    console.log("error in group if statement");
  }

  return group;
}

function createBtn(id, content) {
  const btn = document.createElement("button");
  btn.textContent = content;
  btn.addEventListener("click", (e) => {
    chooseID(id);
  });

  if (id === "project") {
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
    appendTasks("Test", "Testers", "Test1", "4/1/22", 1);
  } else {
    console.log("dlicked on something other than add task");
  }
}

export const allTasks = [];

function createTaskArea() {
  const taskArea = document.createElement("div");
  taskArea.setAttribute("id", "task-area");

  //   allTasks.push(createTaskArray("Name", "Project", "Priority", "Date", 0));

  allTasks.push(new newTask("Name", "Project", "Priority", "Date", 0));

  taskArea.appendChild(addTask("Name", "Project", "Priority", "Date", 0));

  return taskArea;
}

function appendTasks(title, b, c, d, e) {
  allTasks.push(new newTask(title, b, c, d, e));

  console.log(allTasks);

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

const newTask = function (title, project, priority, date, num) {
  this.title = title;
  this.project = project;
  this.priority = priority;
  this.date = date;
  this.num = num;
};

// function createTaskArray(title, project, priority, date, num) {
//   return {
//     title: title,
//     project: project,
//     priority: priority,
//     date: date,
//     num: num,
//   };
// }

function createPopOuts() {
  console.log("????");
  const addPop = document.createElement("div");
  addPop.classList.add("modal-hide");
  addPop.classList.add("modal");
  addPop.setAttribute("id", "modal-add");

  const container = document.getElementById("container");
  container.classList.add("blur");

  return addPop;
}

function initializeToDoList() {
  const content = document.getElementById("content");
  content.appendChild(createContainer());
}

export default initializeToDoList;
