import { navComponent } from "../components/nav.js";
// import { Controller } from "./controller";
/**
 * class View
 * Manages the user interface / communicates with the controller
 */
export class View {
  // /**
  //  * @param {Controller} controller
  //  * @param {Model} model
  //  */
  ELEMENT_SELECTORS = {
    NAV_BUTTONS: "[data-nav]",
  };
  headerEl = document.querySelector(".header");

  constructor() {
    this.pageRendeMethods = {
      favoritesPage: () => this.renderFavoritesPage(),
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
        this.pageRendeMethods[e.target.dataset.nav]();
      });
    });
  }
  renderFavoritesPage() {
    document.title = "weather - favorites";
  }
  renderHomePage() {
    document.title = "weather - home";
  }
}
