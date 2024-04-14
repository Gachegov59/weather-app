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
  sectionSearchEl = document.querySelector(".section", ".search");
  sectionWeatherEl = document.querySelector(".weather");
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
    document.title = ENV.PAGES_TITLES.FAVORITES;
    this.sectionSearchEl.innerHTML = "";
  }
  renderHomePage() {
    document.title = ENV.PAGES_TITLES.HOME;
    this.sectionSearchEl.innerHTML = searchWheaterComponent;
    const inputSeacrh = this.sectionSearchEl.querySelector(
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
    this.sectionSearchEl
      .querySelector(".input-group")
      .appendChild(inputResultEl);

    this.bodyEl.addEventListener("click", (e) => {
      const inputGroupEl = this.sectionSearchEl.querySelector(".input-group");
      const inputEl = this.sectionSearchEl.querySelector(".input");
      if (inputGroupEl.contains(inputResultEl))
        inputGroupEl.removeChild(inputResultEl);
      inputEl.value = "";
    });
  }
  renderWeatherResult(weatherObject) {
    const { DailyForecasts: dailyForecastsArray, Headline: headline } =
      weatherObject;

    console.log(
      "🚀 ~ View ~ renderWeatherResult ~ weatherArray:",
      weatherObject
    );
    
    const weatherItemsEl = this.createElemet({
      tag: "div",
      className: "weather-wrap",
    });

    dailyForecastsArray.forEach((dayForecast) => {

      const weatherCard = this.createElemet({
        tag: "div",
        className: "card",
      });

      const weatherDate = this.createElemet({
        tag: "div",
        className: "card__date",
        innerHTML: `${moment(dayForecast.Date).format("DD MMMM YYYY")}`,
      });

      const weatherInfo = this.createElemet({
        tag: "div",
        className: "card__info",
        innerHTML: `${dayForecast.Day.IconPhrase}`,
      });

      const weatherTemperature = this.createElemet({
        tag: "div",
        className: "card__temperature",
        innerHTML: `${dayForecast.Temperature.Maximum.Value} F`,
      });

      weatherCard.appendChild(weatherDate);
      weatherCard.appendChild(weatherInfo);
      weatherCard.appendChild(weatherTemperature);
      this.sectionWeatherEl.appendChild(weatherCard);
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
