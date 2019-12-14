import axios from "axios";
import constant from "../constant";
import reactNavigationHelper from "./reactNavigationHelper";
import commonToast from "./commonToast";

const commonHttp = axios.create({
  baseURL: constant.baseUri,
  timeout: 10 * 1000
});

commonHttp.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      commonToast.show("登陆过期");
      reactNavigationHelper.navigate("Login");
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error);
  }
);

export default commonHttp;
