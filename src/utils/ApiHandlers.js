import axios from 'axios';

/**
 * Fetches data from the given URL endpoint.
 * @param {string} url - The API endpoint to fetch data from.
 * @returns {Promise<any>} - The data fetched from the API.
 */
export const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data: ' + error.message);
  }
};
