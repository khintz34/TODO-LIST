import { createLeftBar, allTasks, appendTasks } from "./website.js";
import { isEqual, getWeek, getMonth } from "date-fns";

export const projectArray = ["Project1", "Project2"];
export let todayArray = [];
export let weekArray = [];
export let monthArray = [];

export function runToday() {
  todayArray = [];
  allTasks.map(function (obj) {
    if (isEqual(new Date(), new Date(obj.date))) {
      todayArray.push(obj);
    }
  });
  appendTasks(todayArray);
}

export function runWeek() {
  weekArray = [];
  let currentWeek = getWeek(new Date());
  allTasks.map(function (obj) {
    let taskWeek = getWeek(new Date(obj.date));
    if (taskWeek === currentWeek) {
      weekArray.push(obj);
    }
  });
  appendTasks(weekArray);
}

export function runMonth() {
  monthArray = [];
  let currentMonth = getMonth(new Date());
  allTasks.map(function (obj) {
    let taskMonth = getMonth(new Date(obj.date));
    if (taskMonth === currentMonth) {
      monthArray.push(obj);
    }
  });
  appendTasks(monthArray);
}
