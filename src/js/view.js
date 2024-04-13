import { navComponent } from "../components/navComponent.js";
import { searchWheaterComponent } from "../components/searchWheaterComponent.js";
import { Controller } from "./controller.js";
/**
 * @class View
 * Manages the user interface / communicates with the controller
 */
export class View {
  ELEMENT_SELECTORS = {
    NAV_BUTTONS: "[data-nav]",
    INPUT_SEARCH: "[data-input]",
  };
  headerEl = document.querySelector(".header");
  sectionEl = document.querySelector(".section");

  constructor() {
    this.pageRendeMethods = {
      favoritePage: () => this.renderFavoritePage(),
      homePage: () => this.renderHomePage(),
    };
  }

  setController(controller) {
    this.controller = controller;
  }
  mount(activeNavElemet) {
    this.renderNavElemetns(activeNavElemet);
  }

  renderNavElemetns(activeNavElemet) {
    this.headerEl.innerHTML = navComponent;

    let navButtons = this.headerEl.querySelectorAll(
      this.ELEMENT_SELECTORS.NAV_BUTTONS
    );

    navButtons.forEach((navButton) => {
      navButton.addEventListener("click", (e) => {
        [...navButtons].map((el) => el.classList.remove("_active"));
        e.target.classList.add("_active");
        if (e.target.dataset.nav) this.pageRendeMethods[e.target.dataset.nav]();
      });
    });
  }
  renderFavoritePage() {
    document.title = "weather - favorites";
    this.sectionEl.innerHTML = '';
  }
  renderHomePage() {
    document.title = "weather - home";
    // console.log('this.sectionEl--', this.sectionEl)
    this.sectionEl.innerHTML = searchWheaterComponent;
    const inputSeacrh = this.sectionEl.querySelector(
      this.ELEMENT_SELECTORS.INPUT_SEARCH
    );
    inputSeacrh.addEventListener("input", (e) =>
      this.controller.inputCityChange(e.target.value)
    );
  }
}
