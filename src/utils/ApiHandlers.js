import apiClient from './AxiosConfig';

/**
 * Fetches data from the given URL endpoint.
 * 
 * @param {string} url - The API endpoint to fetch data from.
 * @returns {Promise<any>} - The data fetched from the API.
 */
export const fetchData = async (url) => {
  try {
    const response = await apiClient(url);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch data: ' + error.message);
  }
};


/**
 * To post request with request body
 * 
 * @param {*} url 
 * @param {*} request 
 * @returns 
 */
export const postData = async (url, request) => {
  try {
    const response = await apiClient.post(url, request);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch data: ' + error.message);
  }
};
