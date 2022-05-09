import { newTask, allTasks, appendTasks, createBtn } from "./website.js";
import { projectArray } from "./projects.js";
import { isBefore } from "date-fns";
import {
  createHeader,
  createLine,
  createNameLabel,
  createNameInput,
  createProjectLabel,
  createProjectInput,
  createProjectSelect,
  createPriorityLabel,
  createPriorityInput,
  createDateLabel,
  createDateInput,
  createSubmitBtn,
  createNameLabel,
  submitAddForm,
  createArchiveMain,
} from "./modalExports";

export let taskNum;

export const createModal = (id) => {
  const modal = document.createElement("div");
  modal.classList.add("modal-hide");
  modal.classList.add("modal");

  if (id === "add") {
    modal.setAttribute("id", "modal-add");
    modal.appendChild(
      createNewModal(
        "form-add",
        "form-header-add",
        "Add Task Form",
        "taskName-add",
        "select",
        "pl-add",
        "pn-add",
        "fp-add",
        "fd-add",
        "modal-add"
      )
    );
  } else if (id === "project") {
    modal.setAttribute("id", "modal-project");
    modal.appendChild(
      createNewModal(
        "form-project",
        "form-header-project",
        "Add Project Form",
        "taskName-project",
        "input",
        "pl-project",
        "pn-project",
        "fp-project",
        "fd-project",
        "modal-project"
      )
    );
  } else if (id === "remove") {
    modal.setAttribute("id", "modal-remove");
    modal.appendChild(
      createNewModal(
        "form-remove",
        "form-header-remove",
        "Remove Project Form",
        "taskName-remove",
        "input",
        "pl-remove",
        "pn-remove",
        "fp-remove",
        "fd-remove",
        "modal-remove"
      )
    );
  } else if (id === "edit") {
    modal.setAttribute("id", "modal-edit");
    modal.appendChild(
      createNewModal(
        "form-edit",
        "form-header-edit",
        "Edit Task Form",
        "name-edit",
        "input",
        "pl-edit",
        "pn-edit",
        "fp-edit",
        "fd-edit",
        "modal-edit"
      )
    );
  } else if (id === "archive") {
    modal.setAttribute("id", "modal-archive");
    modal.appendChild(
      createNewModal(
        "form-archive",
        "form-header-archive",
        "Completeed Task Arvhice",
        "na",
        "na",
        "na",
        "na",
        "na",
        "na",
        "modal-archive"
      )
    );
  }

  modal.appendChild(createExitBtn());

  return modal;
};

function createNewModal(
  id,
  headingID,
  headingText,
  taskID,
  type,
  plID,
  pnID,
  fpID,
  fdID,
  modalID
) {
  const form = document.createElement("form");
  form.setAttribute("id", id);
  form.setAttribute("class", "form-main");
  form.setAttribute("action", "");
  form.setAttribute("onsubmit", "return false");
  form.classList.add("form-left");

  if (id === "form-add") {
    form.appendChild(createHeader(headingID, headingText));
    form.appendChild(createLine());
    form.appendChild(createNameLabel(taskID));
    form.appendChild(createNameInput(taskID));
    form.appendChild(createProjectLabel(plID));
    form.appendChild(createProjectSelect(pnID));
    form.appendChild(createPriorityLabel(fpID));
    form.appendChild(createPriorityInput(fpID));
    form.appendChild(createDateLabel(fdID));
    form.appendChild(createDateInput(fdID));
    form.appendChild(createSubmitBtn(id, taskID, pnID, fpID, fdID, modalID));
  } else if (id === "form-project") {
    form.appendChild(createHeader(headingID, headingText));
    form.appendChild(createLine());
    form.appendChild(createProjectLabel(plID));
    form.appendChild(createProjectInput(pnID));
    form.appendChild(createSubmitBtn(id, taskID, pnID, fpID, fdID, modalID));
  } else if (id === "form-remove") {
    form.appendChild(createHeader(headingID, headingText));
    form.appendChild(createLine());
    form.appendChild(createProjectLabel(plID));
    form.appendChild(createProjectSelect(pnID));
    form.appendChild(createSubmitBtn(id, taskID, pnID, fpID, fdID, modalID));
  } else if (id === "form-edit") {
    form.appendChild(createHeader(headingID, headingText));
    form.appendChild(createLine());
    form.appendChild(createNameLabel(taskID));
    form.appendChild(createNameInput(taskID));
    form.appendChild(createProjectLabel(plID));
    form.appendChild(createProjectSelect(pnID));
    form.appendChild(createPriorityLabel(fpID));
    form.appendChild(createPriorityInput(fpID));
    form.appendChild(createDateLabel(fdID));
    form.appendChild(createDateInput(fdID));
    form.appendChild(createSubmitBtn(id, taskID, pnID, fpID, fdID, modalID));
  } else if (id === "form-archive") {
    form.appendChild(createHeader(headingID, headingText));
    form.appendChild(createLine());
    form.appendChild(createArchiveMain());
  } else {
    console.log("Didnt hit an ID -- createNewModal Else");
  }

  return form;
}

/////////////////////////////////////////////

export function createDropDown() {
  const formProject = document.getElementById("pn-add");
  const FP2 = document.getElementById("pn-remove");
  const FP3 = document.getElementById("pn-edit");
  const option = document.createElement("option");
  option.value = projectArray[projectArray.length - 1];
  option.textContent = projectArray[projectArray.length - 1];
  option.id = projectArray[projectArray.length - 1];
  FP2.appendChild(option);
  formProject.appendChild(option.cloneNode(true));
  FP3.appendChild(option.cloneNode(true));
}

export function editDropDown(element) {
  const formProject = document.getElementById("pn-add");
  const pnRemove = document.getElementById("pn-remove");
  const pnEdit = document.getElementById("pn-edit");

  for (let i = 0; i < projectArray.length; i++) {
    if (projectArray[i] === element.id) {
      formProject.removeChild(formProject.options[i]);
      pnRemove.removeChild(pnRemove.options[i]);
      pnEdit.removeChild(pnEdit.options[i]);
      return;
    }
  }
}

function createExitBtn() {
  const exit = document.createElement("button");
  exit.textContent = "X";
  exit.classList.add("exitBtn");
  exit.onclick = hideModal;

  return exit;
}

const hideModal = () => {
  let modalArray = [
    "modal-add",
    "modal-project",
    "modal-remove",
    "modal-edit",
    "modal-archive",
    "main",
  ];

  for (let i = 0; i < modalArray.length; i++) {
    if (modalArray[i] === "main") {
      main.classList.remove("blur");
      main.classList.remove("pointerEvent");
    } else {
      const modalElement = document.getElementById(modalArray[i]);
      modalElement.classList.add("modal-hide");
      modalElement.classList.remove("modal-show");
    }
  }
};

export const modalClickAdd = () => {
  const addPop = document.getElementById("modal-add");
  addPop.classList.remove("modal-hide");
  addPop.classList.add("modal-show");
  main.classList.add("blur");
  main.classList.add("pointerEvent");

  const taskName = document.getElementById("taskName-add");
  const taskProject = document.getElementById("pn-add");
  const taskPriority = document.getElementById("fp-add");
  const taskDate = document.getElementById("fd-add");
  taskName.value = "";
  taskProject.value = projectArray[0];
  taskPriority.value = "Low";
  taskDate.value = "";
};

export const modalClickProject = () => {
  const modalPop = document.getElementById("modal-project");
  modalPop.classList.remove("modal-hide");
  modalPop.classList.add("modal-show");
  main.classList.add("blur");
  main.classList.add("pointerEvent");

  const project = document.getElementById("pn-project");
  project.value = "";
};

export const modalClickRemove = () => {
  const removePop = document.getElementById("modal-remove");
  removePop.classList.remove("modal-hide");
  removePop.classList.add("modal-show");
  main.classList.add("blur");
  main.classList.add("pointerEvent");

  const projectRemove = document.getElementById("pn-remove");
  projectRemove.value = projectArray[0];
};

export const modalClickEdit = (name, project, priority, date, num) => {
  const editPop = document.getElementById("modal-edit");
  editPop.classList.remove("modal-hide");
  editPop.classList.add("modal-show");
  main.classList.add("blur");
  main.classList.add("pointerEvent");

  let nameEdit = document.getElementById("name-edit");
  let projectEdit = document.getElementById("pn-edit");
  let priorityEdit = document.getElementById("fp-edit");
  let dateEdit = document.getElementById("fd-edit");
  nameEdit.value = name;
  projectEdit.value = project;
  priorityEdit.value = priority;
  dateEdit.value = date;

  taskNum = num;
};

export const modalClickArchive = () => {
  const removePop = document.getElementById("modal-archive");
  removePop.classList.remove("modal-hide");
  removePop.classList.add("modal-show");
  main.classList.add("blur");
};
