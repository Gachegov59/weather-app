import { View } from "./view.js";
import { Model } from "./model.js";
/**
 * @class Controller
 * Controller for aplication
 */
export class Controller {
  /**
   * @param {View} view
   * @param {Model} model
   */
  constructor(view, model) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.view.mount(this.model.activeNavElement);


  }
}
