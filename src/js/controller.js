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
    this.debouncedDailyForecast = debounce(
      this.model.getDailyForecast.bind(this.model),
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
  // todo: create general method handling request error
  /**
   * @param {string} locationKey
   * @param {1 | 5} daysAmount
   * @returns {Promise}
   */
  async getCityWheater(locationKey, daysAmount = 5) {
    if (!this.varlidateInput(locationKey, "number")) return;
    
    try {
      const data = await this.debouncedDailyForecast(locationKey,daysAmount);
      console.log(data);
      this.view.renderWeatherResult(data);
    } catch (error) {
      console.error("Error fetching daily forecast:", error);
    }
  }

  /**
   * @param {string} cityStr
   * @param {string} type
   */
  async varlidateInput(value, type) {
    console.log("🚀   varlidateInput:", typeof value)
    // todo: check for - Searching should be done in English letters only
  
    if (typeof value === type) {
      return true;
    } else {
      console.error("Error fetching daily forecast:", typeof value);
    }
  }
}
