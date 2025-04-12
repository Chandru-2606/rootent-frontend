import axios from 'axios';
import global from '../Utils/global';

const apiClient = axios.create({
  baseURL: global.baseURL,
});

// Function to update the token dynamically
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.Authorization;
  }
};

// Initialize the token on app start
setAuthToken(localStorage.getItem('token'));

export {apiClient}
