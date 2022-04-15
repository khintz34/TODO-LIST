function createTask(name, project, priority, date) {
  return {
    name: name,
    project: project,
    priority: priority,
    date: date,
  };
}

let testing1 = createTask("name test", "proj1", "high", "4/14/22");

console.log(testing1);
