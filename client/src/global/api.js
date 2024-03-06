import axios from "axios";
import { ENDPOINT } from "./globals";

import { useHistory } from "react-router-dom";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: ENDPOINT,
});

// Define a function to set the access token in the interceptor
export function setAccessToken(accessToken) {
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

// Define a function to remove the access token from the interceptor
export function removeAccessToken() {
  api.defaults.headers.common.Authorization = undefined;
}

api.interceptors.response.use(
  (response) => {
    // Do something with the response data
    return response;
  },
  (error) => {
    // Check if the error status is 401 (unauthorized)
    if (error.response && error.response.status === 401) {
      // Redirect to the sign-in page
      let history = useHistory();
      history.push('/signin');
    }

    if (error.response && error.response.status === 403) {
      // Redirect to the sign-in page
      let history = useHistory();
      history.push('/PageNotFound');
    }

    // Do something with response error
    return Promise.reject(error);
  }
);

export default api;
