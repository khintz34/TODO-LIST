import { newTask, allTasks, appendTasks, createLeftBar } from "./website.js";
import { projectArray } from "./projects.js";

export const createModal = (mode) => {
  const modal = document.createElement("div");
  modal.classList.add("modal-hide");
  modal.classList.add("modal");

  if (mode === "add") {
    modal.setAttribute("id", "modal-add");
    modal.appendChild(createAddModal());
  } else if (mode === "project") {
    modal.setAttribute("id", "modal-project");
    modal.appendChild(createProjectModal());
  }

  return modal;
};

function createAddModal() {
  const form = document.createElement("form");
  form.setAttribute("id", "form-add");
  form.setAttribute("class", "form-main");
  form.setAttribute("action", "");
  form.setAttribute("onsubmit", "return false");
  form.classList.add("form-left");

  const heading = document.createElement("h2");
  heading.textContent = "Add Task Form";
  heading.classList.add("form-item");
  heading.setAttribute("id", "form-header-add");
  heading.classList.add("full-width");
  heading.classList.add("form-margin");
  form.appendChild(heading);

  const line = document.createElement("hr");
  line.classList.add("full-width");

  form.appendChild(line);

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Task Name: ";
  nameLabel.classList.add("form-item");
  nameLabel.classList.add("form-margin");
  form.appendChild(nameLabel);

  const formName = document.createElement("input");
  formName.setAttribute("type", "text");
  formName.setAttribute("name", "dname");
  formName.setAttribute("label", "Project Name");
  formName.setAttribute("placeholder", "Task Name");
  formName.classList.add("form-margin");
  form.appendChild(formName);

  const projectLabel = document.createElement("label");
  projectLabel.setAttribute("id", "pl-add");
  projectLabel.textContent = "Project Name: ";
  projectLabel.classList.add("form-item");
  projectLabel.classList.add("form-margin");
  form.appendChild(projectLabel);

  const formProject = document.createElement("input");
  formProject.setAttribute("id", "pn-add");
  formProject.setAttribute("type", "text");
  formProject.setAttribute("name", "dproject");
  formProject.setAttribute("placeholder", "Project Name");
  formProject.classList.add("form-margin");

  form.appendChild(formProject);

  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Priority Level: ";
  priorityLabel.classList.add("form-item");
  priorityLabel.classList.add("form-margin");
  form.appendChild(priorityLabel);

  const formPriority = document.createElement("select");
  formPriority.classList.add("form-margin");
  let option1 = document.createElement("option");
  option1.value = "Low";
  option1.textContent = "Low";
  let option2 = document.createElement("option");
  option2.value = "Medium";
  option2.textContent = "Medium";
  let option3 = document.createElement("option");
  option3.value = "High";
  option3.textContent = "High";
  formPriority.appendChild(option1);
  formPriority.appendChild(option2);
  formPriority.appendChild(option3);
  form.appendChild(formPriority);

  const dateLabel = document.createElement("label");
  dateLabel.textContent = "Task Due Date: ";
  dateLabel.classList.add("form-item");
  dateLabel.classList.add("form-margin");
  form.appendChild(dateLabel);

  const formDate = document.createElement("input");
  formDate.setAttribute("type", "text");
  formDate.setAttribute("name", "date");
  formDate.setAttribute("placeholder", "DD/MM/YYYY");
  formDate.classList.add("form-margin");
  form.appendChild(formDate);

  const formSubmit = document.createElement("button");
  formSubmit.classList.add("full-width");
  formSubmit.classList.add("form-margin");
  formSubmit.classList.add("form-submit");
  formSubmit.textContent = "Submit";

  formSubmit.onclick = () => {
    allTasks.push(
      new newTask(
        formName.value,
        formProject.value,
        formPriority.value,
        formDate.value,
        1
      )
    );
    const addPop = document.getElementById("modal-add");
    addPop.classList.remove("modal-show");
    addPop.classList.add("modal-hide");
    main.classList.remove("blur");
    formName.value = "";
    formProject.value = "";
    formPriority.value = "Low";
    formDate.value = "";
    appendTasks();
  };
  form.appendChild(formSubmit);

  return form;
}

function createProjectModal() {
  const form = document.createElement("form");
  form.setAttribute("id", "form-project");
  form.setAttribute("class", "form-main");
  form.setAttribute("action", "");
  form.setAttribute("onsubmit", "return false");
  form.classList.add("form-left");

  const heading = document.createElement("h2");
  heading.textContent = "Add Project Form";
  heading.classList.add("form-item");
  heading.setAttribute("id", "form-header-project");
  heading.classList.add("full-width");
  heading.classList.add("form-margin");
  form.appendChild(heading);

  const line = document.createElement("hr");
  line.classList.add("full-width");

  form.appendChild(line);

  const projectLabel = document.createElement("label");
  projectLabel.setAttribute("id", "pl-project");
  projectLabel.textContent = "Project Name: ";
  projectLabel.classList.add("form-item");
  projectLabel.classList.add("form-margin");
  form.appendChild(projectLabel);

  const formProject = document.createElement("input");
  formProject.setAttribute("id", "pn-project");
  formProject.setAttribute("type", "text");
  formProject.setAttribute("name", "dproject");
  formProject.setAttribute("placeholder", "Project Name");
  formProject.classList.add("form-margin");

  form.appendChild(formProject);

  const formSubmit = document.createElement("button");
  formSubmit.classList.add("full-width");
  formSubmit.classList.add("form-margin");
  formSubmit.classList.add("form-submit");
  formSubmit.textContent = "Submit";

  formSubmit.onclick = () => {
    projectArray.push(formProject.value);
    console.log(projectArray);
    createLeftBar();
    const projectPop = document.getElementById("modal-project");
    projectPop.classList.remove("modal-show");
    projectPop.classList.add("modal-hide");
    main.classList.remove("blur");
    formProject.value = "";
  };
  form.appendChild(formSubmit);

  return form;
}

export const modalClickAdd = () => {
  const addPop = document.getElementById("modal-add");
  addPop.classList.remove("modal-hide");
  addPop.classList.add("modal-show");
  main.classList.add("blur");
};

export const modalClickProject = () => {
  const modalPop = document.getElementById("modal-project");
  modalPop.classList.remove("modal-hide");
  modalPop.classList.add("modal-show");
  main.classList.add("blur");
};
