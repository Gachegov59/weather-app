import { ENV } from "../config/consts.js";
import { View } from "./view.js";
import { Model } from "./model.js";
import { debounce } from "../helpers/debounce.js";


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
    this.debouncedCitySearch = debounce(
      this.model.getCityesData.bind(this.model),
      ENV.INPUT_DELAY
    );
  }

  init() {
    // todo: add checkong localStorage
    // todo: add checkong cookies last request weather for repet new one for default city
    this.view.mount(this.model.activeNavElement);
  }

  /**
   * @param {string} cityStr
   */
  async inputCityChange(cityStr) {
    if (!this.varlidateInput(cityStr, "string")) return;
    
    try {
      const data = await this.debouncedCitySearch(cityStr);
      // console.log(data);
      this.view.renderInputResult(data);
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  }

  /**
   * @param {string} cityStr
   * @param {string} type
   */
  async varlidateInput(value, type) {
    // todo: check for - Searching should be done in English letters only
    if (typeof value === type) {
      return true;
    } else {
      alert("You enter wrong value");
    }
  }
}
