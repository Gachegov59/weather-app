import { Controller } from "./controller.js";
import { Model } from "./model.js";
import { View } from "./view.js";
const view = new View();
const model = new Model();

const app = new Controller(view, model);

document.addEventListener("DOMContentLoaded", () => {
  app.init();
});