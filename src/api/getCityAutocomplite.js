import { ENV } from "../config/consts.js";

const BASE_API_URL = ENV.BASE_API_URL;
const API_KEY = ENV.API_KEY;
/**
 * @param {string} query
 * @returns {Promise}
 */
export function getCityAutocomplete(query) {
  const baseUrl = `${BASE_API_URL}/locations/v1/cities/autocomplete`;
  // TODO: fix base url ?`;
  const url = new URL(baseUrl);
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("q", query);
  console.log("getCityAutocomplete--", url);
  // return
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
