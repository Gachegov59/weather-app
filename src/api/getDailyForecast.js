import { ENV } from "../config/consts.js";

const BASE_API_URL = ENV.BASE_API_URL;
const API_KEY = ENV.API_KEY;

/**
 * @param {string} locationKey
 * @param {1 | 5} daysAmount
 * @returns {Promise}
 */
export function getDailyForecast(locationKey, daysAmount = 1) {
  const url = `${BASE_API_URL}/forecasts/v1/daily/${daysAmount}day/${locationKey}?apikey=${API_KEY}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! response status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching the weather data:", error);
    });
}
