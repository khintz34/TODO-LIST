import { allTasks, appendTasks, createBtn, newTask } from "./website";
import { projectArray } from "./projects";
import { createDropDown, taskNum, editDropDown } from "./modals";
import { isBefore } from "date-fns";

export function createForm(id) {
  const form = document.createElement("form");
  form.setAttribute("id", id);
  form.setAttribute("class", "form-main");
  form.setAttribute("action", "");
  form.setAttribute("onsubmit", "return false");
  form.classList.add("form-left");

  return form;
}

export function createHeader(headingID, headingText) {
  const heading = document.createElement("h2");
  heading.textContent = headingText;
  heading.classList.add("form-item");
  heading.setAttribute("id", headingID);
  heading.classList.add("full-width");
  heading.classList.add("form-margin");

  return heading;
}

export function createLine() {
  const line = document.createElement("hr");
  line.classList.add("full-width");

  return line;
}

export function createNameLabel(taskID) {
  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Task Name: ";
  nameLabel.classList.add("form-item");
  nameLabel.classList.add("form-margin");
  nameLabel.setAttribute("id", taskID + "label");

  return nameLabel;
}

export function createNameInput(taskID) {
  const formName = document.createElement("input");
  formName.setAttribute("type", "text");
  formName.setAttribute("name", "dname");
  formName.setAttribute("placeholder", "Task Name");
  formName.setAttribute("maxlength", 16);
  formName.classList.add("form-margin");
  formName.setAttribute("id", taskID);

  return formName;
}

export function createProjectLabel(plID) {
  const projectLabel = document.createElement("label");
  projectLabel.setAttribute("id", plID);
  projectLabel.textContent = "Project Name: ";
  projectLabel.classList.add("form-item");
  projectLabel.classList.add("form-margin");

  return projectLabel;
}

export function createProjectInput(pnID) {
  const formProject = document.createElement("input");
  formProject.setAttribute("id", pnID);
  formProject.setAttribute("name", "Add-project");
  formProject.setAttribute("placeholder", "Project Name");
  formProject.classList.add("form-margin");

  return formProject;
}

export function createProjectSelect(pnID) {
  const formProject = document.createElement("select");
  formProject.setAttribute("id", pnID);
  formProject.setAttribute("name", "Add-project");
  formProject.setAttribute("placeholder", "Project Name");
  formProject.classList.add("form-margin");

  for (let i = 0; i < projectArray.length; i++) {
    const option = document.createElement("option");
    option.value = projectArray[i];
    option.textContent = projectArray[i];
    if (i === 0) {
      option.setAttribute("selected", "selected");
    }
    formProject.appendChild(option);
  }

  return formProject;
}

export function createPriorityLabel(fpID) {
  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Priority Level: ";
  priorityLabel.classList.add("form-item");
  priorityLabel.classList.add("form-margin");
  priorityLabel.setAttribute("id", fpID + "label");

  return priorityLabel;
}

export function createPriorityInput(fpID) {
  const formPriority = document.createElement("select");
  formPriority.setAttribute("id", fpID);
  formPriority.classList.add("form-margin");
  let option1 = document.createElement("option");
  option1.value = "Low";
  option1.textContent = "Low";
  option1.selected = "selected";
  let option2 = document.createElement("option");
  option2.value = "Medium";
  option2.textContent = "Medium";
  let option3 = document.createElement("option");
  option3.value = "High";
  option3.textContent = "High";
  formPriority.appendChild(option1);
  formPriority.appendChild(option2);
  formPriority.appendChild(option3);

  return formPriority;
}

export function createDateLabel(fdID) {
  const dateLabel = document.createElement("label");
  dateLabel.textContent = "Task Due Date: ";
  dateLabel.classList.add("form-item");
  dateLabel.classList.add("form-margin");
  dateLabel.setAttribute("id", fdID + "label");

  return dateLabel;
}

export function createDateInput(fdID) {
  const formDate = document.createElement("input");
  formDate.setAttribute("type", "date");
  formDate.setAttribute("name", "date");
  formDate.setAttribute("placeholder", "DD/MM/YYYY");
  formDate.setAttribute("id", fdID);
  formDate.classList.add("form-margin");

  return formDate;
}

export function createArchiveMain() {
  const archiveMain = document.createElement("div");
  archiveMain.setAttribute("id", "archiveMain");
  archiveMain.textContent = "";

  return archiveMain;
}

export function createSubmitBtn(id, name, project, priority, date, modalID) {
  const formSubmit = document.createElement("button");
  formSubmit.classList.add("full-width");
  formSubmit.classList.add("form-margin");
  formSubmit.classList.add("form-submit");
  formSubmit.textContent = "Submit";
  formSubmit.setAttribute("id", id + "btn");

  const input1 = id;
  const input2 = name;
  const input3 = project;
  const input4 = priority;
  const input5 = date;
  const input6 = modalID;

  formSubmit.onclick = (input1, input2, input3, input4, input5, input6) => {
    if (formSubmit.id === "form-addbtn") {
      submitAddForm(id, name, project, priority, date, modalID);
    } else if (id === "form-project") {
      submitProjectForm(id, project, modalID);
    } else if (id === "form-remove") {
      submitRemoveForm(id, project, modalID);
    } else if (id === "form-edit") {
      submitEditForm(id, name, project, priority, date, modalID);
    }
  };

  return formSubmit;
}

function updateModalClasses(modalID) {
  const modal = document.getElementById(modalID);
  modal.classList.remove("modal-show");
  modal.classList.add("modal-hide");
  main.classList.remove("blur");
  main.classList.remove("pointerEvent");

  return modal;
}

export const submitAddForm = (id, name, project, priority, date, modalID) => {
  const modalAdd = document.getElementById(id);
  const nameValue = document.getElementById(name);
  const projectValue = document.getElementById(project);
  const priorityValue = document.getElementById(priority);
  const dateValue = document.getElementById(date);

  const split = dateValue.value.split("-");

  if (
    nameValue.value === "" ||
    projectValue.value === "" ||
    priorityValue.value === "" ||
    dateValue.value === ""
  ) {
    alert("All input fields need a value!");
  } else if (isBefore(new Date(split[0], split[1] - 1, split[2]), new Date())) {
    alert("The Due Date should be AFTER today's date!");
  } else {
    allTasks.push(
      new newTask(
        nameValue.value,
        projectValue.value,
        priorityValue.value,
        dateValue.value
      )
    );
    window.localStorage.setItem("task", "test");
  }
  updateModalClasses(modalID);
  nameValue.value = "";
  projectValue.value = "";
  priorityValue.value = "";
  dateValue.value = "";
  appendTasks(allTasks);
};

function submitProjectForm(id, project, modalID) {
  const modalAdd = document.getElementById(id);
  const projectValue = document.getElementById(project);

  if (projectValue.value === "") {
    alert("Must type a Project Name to submit");
  } else if (projectArray.length >= 4) {
    alert(
      "Maximum amount (4) of Projects reached. Remove a project to add another."
    );
    updateModalClasses(modalID);
  } else {
    projectArray.push(projectValue.value);

    const PG = document.getElementById("project-group");
    PG.appendChild(createBtn("project", projectValue.value));
    projectValue.value = "";
    updateModalClasses(modalID);
    createDropDown();
  }
}

function submitEditForm(id, name, project, priority, date, modalID) {
  const modalAdd = document.getElementById(id);
  const nameValue = document.getElementById(name);
  const projectValue = document.getElementById(project);
  const priorityValue = document.getElementById(priority);
  const dateValue = document.getElementById(date);

  const split = dateValue.value.split("-");
  if (
    nameValue.value === "" ||
    projectValue.value === "" ||
    priorityValue.value === "" ||
    dateValue.value === ""
  ) {
    alert("All input fields need a value!");
  } else if (isBefore(new Date(split[0], split[1] - 1, split[2]), new Date())) {
    alert("Due Date needs to be AFTER today's date!");
  } else {
    allTasks[taskNum].title = nameValue.value;
    allTasks[taskNum].project = projectValue.value;
    allTasks[taskNum].priority = priorityValue.value;
    allTasks[taskNum].date = dateValue.value;

    updateModalClasses(modalID);
    nameValue.value = "";
    projectValue.value = "";
    priorityValue.value = "";
    dateValue.value = "";
    appendTasks(allTasks);
  }
}

function submitRemoveForm(id, project, modalID) {
  const modalAdd = document.getElementById(id);
  const projectValue = document.getElementById(project);
  let elementRemove = document.getElementById(projectValue.value);
  editDropDown(elementRemove);
  projectArray.splice(projectArray.indexOf(projectValue.value) - 1, 1);
  elementRemove.parentNode.removeChild(elementRemove);
  projectValue.value = projectArray[0];
  updateModalClasses(modalID);
}

export function updateLS() {
  let values = [];
  let keys = Object.keys(localStorage);
  let i = keys.length;
  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }
  document.getElementById("test").textContent = values;
}
