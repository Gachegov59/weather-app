// import { View } from "./view.js";
// import { Model } from "./model.js";
/**
 * @class Model
 * Menages the data for the application / communicates with the controller
 */
export class Model {
  /**
   * @param {View} view
   * @param {Model} model
   */
  NAV = {
    ACTIVE: "home",
  };

  constructor() {}

  /**
   * @returns 'home' | 'favorites'
   */
  get activeNavElement() {
    return this.NAV.ACTIVE;
  }
}
