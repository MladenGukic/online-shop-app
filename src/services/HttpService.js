import axios from 'axios';

const BASE_URL =  axios.defaults.baseURL = 'http://localhost:8000/api/'

 export class HttpService {
    constructor() {
        this.configureAxios(
            BASE_URL, { 
            accept:'application/json', 
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        )
        this.axios = axios
    }

    configureAxios(baseUrl, headers = {}) {
        axios.defaults.baseURL = baseUrl
        this.setHeaders(headers)
    }

    setHeaders(headers) {
        axios.defaults.headers = headers
    }
 }
