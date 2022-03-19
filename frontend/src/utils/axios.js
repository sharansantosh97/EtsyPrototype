import axios from "axios"

const baseURL = "https://385b-2600-1700-65aa-d910-5759-c888-9b26-60ca.ngrok.io";
//const baseURL = 'https://beea-2600-1700-65aa-d910-6abc-c43c-445c-9e63.ngrok.io';
let headers = {}

if (localStorage.token) {
  headers.Authorization = `${localStorage.token}`
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers,
})

export default axiosInstance
