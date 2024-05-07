import axios from 'axios';
import { BASE_URL, PUBLIC_BASE_URL } from './utils/consts';

export const API = axios.create({
    baseURL: '',
    withCredentials: true,
});

export const API_CLIENT = axios.create({
    baseURL: PUBLIC_BASE_URL,
    withCredentials: true,
    headers: {
        Referer: 'localhost:3000',
    },
});

export const API_SERVER = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        Referer: 'localhost:3000',
    },
});

API_SERVER.interceptors.response.use(async (response) => {
    console.log(response.config.url, response.status, response.data);
    return response;
});
