import { Controller } from "./controller.js";
import { Model } from "./model.js";
import { View } from "./view.js";

const model = new Model();
const view = new View();
const app = new Controller(view, model);

view.setController(app)

document.addEventListener("DOMContentLoaded", () => {
  app.init();
});
