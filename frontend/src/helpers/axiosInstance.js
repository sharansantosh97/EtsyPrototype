import axios from "axios";

export default (history = null) => {
  const baseURL = "http://localhost:3001"
  // const baseURL =
  //   "https://beea-2600-1700-65aa-d910-6abc-c43c-445c-9e63.ngrok.io";
  // // const baseURL = "https://56a5-2607-f380-828-fb00-00-d903.ngrok.io"
  let headers = {};

  if (localStorage.token) {
    headers.Authorization = `${localStorage.token}`;
  }

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
  });

  axiosInstance.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
      if (error.response.status === 403) {
        localStorage.removeItem("token");
        if (history) {
          history.push("/login");
        } else {
          window.location = "/login";
        }
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return axiosInstance;
};
