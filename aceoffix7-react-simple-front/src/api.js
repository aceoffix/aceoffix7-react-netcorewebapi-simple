import axios from "axios";
import { AceBrowser } from "js-aceoffix";

const service = axios.create({
  baseURL: "/dev-api",
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    // Assume your token is stored in the cookie, then use this line of code. For the convenience of demonstration here, we use the constant token = "123".
    // const token = Cookies.get('token');
    const token = "123";
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; 

      // The setup code for Aceoffix starts -------------------------------------------------
      // The global configuration of Aceoffix must be defined in this interceptor.
      AceBrowser.setProxyBaseAPI("/dev-api"); // Required. Set the backend proxy. The specific attribute values should be determined according to your actual development.
      AceBrowser.setHeader("Authorization", "Bearer " + token); // Required. Set headers for requests to the Aceoffix backend. You can call setHeader() multiple times to set more values. The specific attribute names and values should be determined according to your actual development.
      /**
        Front - end token storage solutions
        Solution 1: Use Cookies
        If your token is stored in cookies, Aceoffix will support storing the token via cookies by default. Therefore, you don't need to write any additional code.
        Solution 2: Use LocalStorage or SessionStorage
        If the token is stored in LocalStorage or SessionStorage, you must call the AceBrowser.setStorage() method.
       */
      //AceBrowser.setStorage("Admin-Token",getToken());// You can call setStorage() multiple times to set more values. The specific attribute names and values should be determined according to your actual development.
      // The setup code for Aceoffix ends -------------------------------------------------
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
