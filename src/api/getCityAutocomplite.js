import { ENV } from "../config/consts.js";

const BASE_API_URL = ENV.BASE_API_URL;
const API_KEY = ENV.API_KEY;
/**
 * @param {string} cityStr
 * @returns {Promise}
 */
export function getCityAutocomplete(cityStr) {
  const url = `${BASE_API_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${cityStr}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! response status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error while fetvhing data cityes: ", error);
    });
}
