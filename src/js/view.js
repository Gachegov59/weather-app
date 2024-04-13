import { ENV } from "../config/consts.js";
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
  bodyEl = document.querySelector("body");
  /**
   * @param {Controller} controller
   */
  constructor(controller) {
    this.controller = controller;
    this.pageRendeMethods = {
      favoritePage: () => this.renderFavoritePage(),
      homePage: () => this.renderHomePage(),
    };
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
    // todo: pageNames to const
    document.title = ENV.PAGES_TITLES.FAVORITES;
    this.sectionEl.innerHTML = "";
  }
  renderHomePage() {
    document.title = ENV.PAGES_TITLES.HOME;
    this.sectionEl.innerHTML = searchWheaterComponent;
    const inputSeacrh = this.sectionEl.querySelector(
      this.ELEMENT_SELECTORS.INPUT_SEARCH
    );
    inputSeacrh.addEventListener("input", (e) =>
      this.controller.inputCityChange(e.target.value.trim())
    );
  }
  renderInputResult(sityesArray) {
    console.log(sityesArray);
    const inputResultEl = this.createElemet({
      tag: "div",
      className: "input-result",
    });

    sityesArray.forEach((sity) => {
      const cityItemEl = this.createElemet({
        tag: "div",
        className: "input-result__item",
      });

      const cityCountryEl = this.createElemet({
        tag: "div",
        className: "input-result__country",
        innerHTML: `${sity.Country.LocalizedName}`,
      });

      const cityNameEl = this.createElemet({
        tag: "div",
        className: "input-result__city",
        innerHTML: `${sity.LocalizedName}`,
      });

      cityItemEl.appendChild(cityCountryEl);
      cityItemEl.appendChild(cityNameEl);
      inputResultEl.appendChild(cityItemEl);

      cityItemEl.addEventListener("click", () => {
        this.controller.getCityWheater(Number(sity.Key), 5);
      });
    });
    this.sectionEl.querySelector(".input-group").appendChild(inputResultEl);

    this.bodyEl.addEventListener("click", (e) => {
      const inputGroupEl = this.sectionEl.querySelector(".input-group");
      const inputEl = this.sectionEl.querySelector(".input");
      if (inputGroupEl.contains(inputResultEl))
        inputGroupEl.removeChild(inputResultEl);
      inputEl.value = "";
    });
  }

  /**
   * @param {{tag: string, className: string, innerHTML: string, attr?: {attrName: string, attrContent: string}}} options
   * @returns {HTMLElement}
   */
  createElemet(options) {
    const { tag, className, innerHTML, attr: attr } = options;
    const el = document.createElement(tag);
    el.classList.add(className);
    el.textContent = innerHTML;
    if (attr) el.setAttribute(attr.attrName, attr.attrContent);
    return el;
  }
}
