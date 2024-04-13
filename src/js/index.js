import { Controller } from "./controller.js";
import { Model } from "./model.js";
import { View } from "./view.js";

const model = new Model();
const dummyView = {};
const controller = new Controller(dummyView, model);

const view = new View(controller);
controller.view = view;

document.addEventListener("DOMContentLoaded", () => {
  controller.init();
});
