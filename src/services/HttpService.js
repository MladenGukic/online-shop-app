import axios from 'axios';

const BASE_URL =  axios.defaults.baseURL = 'http://localhost:8000/api/'

 export class HttpService {
    constructor() {
        this.configureAxios(
            BASE_URL, { 
            accept:'application/json', 
            authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        )
        this.axios = axios
    }

    configureAxios(baseUrl) {

        axios.defaults.baseURL = baseUrl
    }

    setHeaders(headers) {
        axios.defaults.authorization = headers
    }
 }
