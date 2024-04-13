import { ENV } from "../config/consts.js";
import { getCityAutocomplete } from "../api/getCityAutocomplite.js";
import { mockLocationsData } from "../mocks/apiLcations.js";
import { Controller } from "./controller.js";
/**
 * @class Model
 * Menages the data for the application / communicates with the controller
 */
export class Model {
  /**
   * @param {Controller} Controller
   */
  NAV = {
    ACTIVE: "home",
  };

  constructor(controller) {
    this.controller = controller;
  }
  /**
   * @returns {'home' | 'favorites'}
   */
  get activeNavElement() {
    return this.NAV.ACTIVE;
  }
  /**
   * @returns {object}
   */
  async getCityesData(city) {
    console.log("getCityesData--***", city);

    if (ENV.DEVELOPER_MODE) {
      return mockLocationsData;
    }
    try {
      const data = await getCityAutocomplete(city);
      // console.log(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  }
}
