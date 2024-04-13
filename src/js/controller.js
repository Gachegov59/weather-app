import { View } from "./view.js";
import { Model } from "./model.js";
import { debounce } from "../helpers/debounce.js";
// import types from "../types/types.js";

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
    // todo: add checkong localStorage
    // todo: add checkong cookies last request weather for repet new one for default city
    this.view.mount(this.model.activeNavElement);
  }

  /**
   * @param {string} cityStr
   */
  inputCityChange(cityStr) {
    if (!this.varlidateInput(cityStr, "string")) return
    const debauncedInput = debounce(this.model.getCityesData, 500);
    debauncedInput(cityStr)
  }

  /**
   * @param {string} cityStr
   * @param {string} type
   */
  varlidateInput(value, type) {
    // todo: check for - Searching should be done in English letters only
    // console.log("🚀~ varlidateInput:");
    if (typeof value === type) {
      return true;
    } else {
      alert("You enter wrong value");
    }
  }
}
