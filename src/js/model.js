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

  getCityesData(city) {
    console.log("getCityesData--***", city);
  }
}
