import { newTask, allTasks, appendTasks, createBtn } from "./website.js";
import { projectArray } from "./projects.js";
import { editTaskfromModal } from "./task.js";
import { formatDistance, isBefore } from "date-fns";

let taskNum;

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
  } else if (mode === "remove") {
    modal.setAttribute("id", "modal-remove");
    modal.appendChild(createRemoveModal());
  } else if (mode === "edit") {
    modal.setAttribute("id", "modal-edit");
    modal.appendChild(createEditModal());
  } else if (mode === "archive") {
    modal.setAttribute("id", "modal-archive");
    modal.appendChild(createArchiveModal());
  }

  modal.appendChild(createExitBtn());

  return modal;
};

///ADD MODAL //////////////////
/////////////////////////////

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
  formName.setAttribute("placeholder", "Task Name");
  formName.setAttribute("maxlength", 16);
  formName.classList.add("form-margin");
  formName.setAttribute("id", "taskName-add");
  form.appendChild(formName);

  const projectLabel = document.createElement("label");
  projectLabel.setAttribute("id", "pl-add");
  projectLabel.textContent = "Project Name: ";
  projectLabel.classList.add("form-item");
  projectLabel.classList.add("form-margin");
  form.appendChild(projectLabel);

  const formProject = document.createElement("select");
  formProject.setAttribute("id", "pn-add");
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

  form.appendChild(formProject);

  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Priority Level: ";
  priorityLabel.classList.add("form-item");
  priorityLabel.classList.add("form-margin");
  form.appendChild(priorityLabel);

  const formPriority = document.createElement("select");
  formPriority.setAttribute("id", "fp-add");
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
  form.appendChild(formPriority);

  const dateLabel = document.createElement("label");
  dateLabel.textContent = "Task Due Date: ";
  dateLabel.classList.add("form-item");
  dateLabel.classList.add("form-margin");
  form.appendChild(dateLabel);

  const formDate = document.createElement("input");
  formDate.setAttribute("type", "date");
  formDate.setAttribute("name", "date");
  formDate.setAttribute("placeholder", "DD/MM/YYYY");
  formDate.setAttribute("id", "fd-add");
  formDate.classList.add("form-margin");
  form.appendChild(formDate);

  const formSubmit = document.createElement("button");
  formSubmit.classList.add("full-width");
  formSubmit.classList.add("form-margin");
  formSubmit.classList.add("form-submit");
  formSubmit.textContent = "Submit";

  formSubmit.onclick = () => {
    const split = formDate.value.split("-");

    if (
      formName.value === "" ||
      formProject.value === "" ||
      formPriority.value === "" ||
      formDate.value === ""
    ) {
      alert("All input fields need a value!");
    } else if (
      isBefore(new Date(split[0], split[1] - 1, split[2]), new Date())
    ) {
      alert("The Due Date should be AFTER today's date!");
    } else {
      allTasks.push(
        new newTask(
          formName.value,
          formProject.value,
          formPriority.value,
          formDate.value
        )
      );
      const addPop = document.getElementById("modal-add");
      addPop.classList.remove("modal-show");
      addPop.classList.add("modal-hide");
      main.classList.remove("blur");
      main.classList.remove("pointerEvent");
      formName.value = "";
      formProject.value = "";
      formPriority.value = "Low";
      formDate.value = "";
      appendTasks(allTasks);
    }
  };
  form.appendChild(formSubmit);

  return form;
}

///////////////////////////////////////////
/////////ADD PROJECT MODAL////////////

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
  formProject.setAttribute("maxlength", 12);
  formProject.classList.add("form-margin");

  form.appendChild(formProject);

  const formSubmit = document.createElement("button");
  formSubmit.classList.add("full-width");
  formSubmit.classList.add("form-margin");
  formSubmit.classList.add("form-submit");
  formSubmit.textContent = "Submit";

  formSubmit.onclick = () => {
    if (formProject.value === "") {
      alert("Must type a Project Name to submit");
    } else if (projectArray.length >= 4) {
      alert(
        "Maximum amount (4) of Projects reached. Remove a project to add another."
      );
      const projectPop = document.getElementById("modal-project");
      projectPop.classList.remove("modal-show");
      projectPop.classList.add("modal-hide");
      main.classList.remove("blur");
      formProject.value = "";
      main.classList.remove("pointerEvent");
    } else {
      projectArray.push(formProject.value);

      const PG = document.getElementById("project-group");
      PG.appendChild(createBtn("project", formProject.value));
      const projectPop = document.getElementById("modal-project");
      projectPop.classList.remove("modal-show");
      projectPop.classList.add("modal-hide");
      main.classList.remove("blur");
      createDropDown();
      formProject.value = "";
      main.classList.remove("pointerEvent");
    }
  };
  form.appendChild(formSubmit);

  return form;
}

///////////////////////////////////////////
///REMOVE MODAL/////////

function createRemoveModal() {
  const form = document.createElement("form");
  form.setAttribute("id", "form-remove");
  form.setAttribute("class", "form-main");
  form.setAttribute("action", "");
  form.setAttribute("onsubmit", "return false");
  form.classList.add("form-left");

  const heading = document.createElement("h2");
  heading.textContent = "Remove Project Form";
  heading.classList.add("form-item");
  heading.setAttribute("id", "form-header-remove");
  heading.classList.add("full-width");
  heading.classList.add("form-margin");
  form.appendChild(heading);

  const line = document.createElement("hr");
  line.classList.add("full-width");

  form.appendChild(line);

  const formProject = document.createElement("select");
  formProject.setAttribute("id", "pn-remove");
  formProject.setAttribute("name", "dproject");
  formProject.setAttribute("placeholder", "Project Name");
  formProject.classList.add("form-margin");

  for (let i = 0; i < projectArray.length; i++) {
    const option = document.createElement("option");
    option.value = projectArray[i];
    option.textContent = projectArray[i];
    formProject.appendChild(option);
  }

  form.appendChild(formProject);

  const formSubmit = document.createElement("button");
  formSubmit.classList.add("full-width");
  formSubmit.classList.add("form-margin");
  formSubmit.classList.add("form-submit");
  formSubmit.textContent = "Remove Project";

  formSubmit.onclick = () => {
    let elementRemove = document.getElementById(formProject.value);
    editDropDown(elementRemove);
    projectArray.splice(projectArray.indexOf(formProject.value) - 1, 1);
    elementRemove.parentNode.removeChild(elementRemove);
    const removePop = document.getElementById("modal-remove");
    removePop.classList.remove("modal-show");
    removePop.classList.add("modal-hide");
    main.classList.remove("blur");
    formProject.value = projectArray[0];
    main.classList.remove("pointerEvent");
  };
  form.appendChild(formSubmit);

  return form;
}
//////////////////////////////////////////////////
//EDIT MODAL//////////////////////

function createEditModal() {
  const form = document.createElement("form");
  form.setAttribute("id", "form-edit");
  form.setAttribute("class", "form-main");
  form.setAttribute("action", "");
  form.setAttribute("onsubmit", "return false");
  form.classList.add("form-left");

  const heading = document.createElement("h2");
  heading.textContent = "Edit Task Form";
  heading.classList.add("form-item");
  heading.setAttribute("id", "form-header-edit");
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
  formName.setAttribute("id", "name-edit");
  formName.setAttribute("type", "text");
  formName.setAttribute("name", "name");
  formName.setAttribute("label", "Project Name");
  formName.setAttribute("placeholder", "Task Name");
  formName.setAttribute("maxlength", 16);
  formName.classList.add("form-margin");
  form.appendChild(formName);

  const projectLabel = document.createElement("label");
  projectLabel.setAttribute("id", "pl-edit");
  projectLabel.textContent = "Project Name: ";
  projectLabel.classList.add("form-item");
  projectLabel.classList.add("form-margin");
  form.appendChild(projectLabel);

  const formProject = document.createElement("select");
  formProject.setAttribute("id", "pn-edit");
  formProject.setAttribute("name", "Add-project");
  formProject.setAttribute("placeholder", "Project Name");
  formProject.classList.add("form-margin");

  for (let i = 0; i < projectArray.length; i++) {
    const option = document.createElement("option");
    option.value = projectArray[i];
    option.textContent = projectArray[i];
    formProject.appendChild(option);
  }

  form.appendChild(formProject);

  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Priority Level: ";
  priorityLabel.classList.add("form-item");
  priorityLabel.classList.add("form-margin");
  form.appendChild(priorityLabel);

  const formPriority = document.createElement("select");
  formPriority.setAttribute("id", "priority-edit");
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
  formDate.setAttribute("id", "date-edit");
  formDate.setAttribute("type", "date");
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
    const split = formDate.value.split("-");
    if (
      formName.value === "" ||
      formProject.value === "" ||
      formPriority.value === "" ||
      formDate.value === ""
    ) {
      alert("All input fields need a value!");
    } else if (
      isBefore(new Date(split[0], split[1] - 1, split[2]), new Date())
    ) {
      alert("Due Date needs to be AFTER today's date!");
    } else {
      allTasks[taskNum].title = formName.value;
      allTasks[taskNum].project = formProject.value;
      allTasks[taskNum].priority = formPriority.value;
      allTasks[taskNum].date = formDate.value;

      appendTasks(allTasks);
      hideModal();
      formName.value = "";
      formProject.value = "";
      formPriority.value = "Low";
      formDate.value = "";
      main.classList.remove("pointerEvent");
    }
  };
  form.appendChild(formSubmit);

  return form;
}

/////////////////////////////////////////////
////ARCHIVE MODAL////////////

function createArchiveModal() {
  const form = document.createElement("form");
  form.setAttribute("id", "form-archive");
  form.setAttribute("class", "form-main");
  form.setAttribute("action", "");
  form.setAttribute("onsubmit", "return false");
  form.classList.add("form-left");

  const heading = document.createElement("h2");
  heading.textContent = "Completed Task Archive";
  heading.classList.add("form-item");
  heading.setAttribute("id", "form-header-arhive");
  heading.classList.add("full-width");
  heading.classList.add("form-margin");
  form.appendChild(heading);

  const line = document.createElement("hr");
  line.classList.add("full-width");
  form.appendChild(line);

  const archiveMain = document.createElement("div");
  archiveMain.setAttribute("id", "archiveMain");
  form.appendChild(archiveMain);

  return form;
}

/////////////////////////////////////////////

function createDropDown() {
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

function editDropDown(element) {
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

// const listenForClicks = (id) => {
//   // if (id === 'off') {
//   //   document.removeEventListener('click')
//   // }
//   //Need to turn on and off event listener when a modal is open / closed
//   const specifiedElement = document.getElementById(id);

//   console.log(id);

//   document.addEventListener("click", function (event) {
//     let isClickInside = specifiedElement.contains(event.target);

//     if (!isClickInside) {
//       console.log("CLICK WAS OUTSIDE");
//     }
//   });
// };

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

  // listenForClicks("modal-add");
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
  let priorityEdit = document.getElementById("priority-edit");
  let dateEdit = document.getElementById("date-edit");
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
