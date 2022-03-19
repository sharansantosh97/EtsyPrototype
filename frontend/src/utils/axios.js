import axios from "axios"

const baseURL = "https://f204-2600-1700-65aa-d910-72fe-e6c-a33-e08f.ngrok.io";
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
