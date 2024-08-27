import axios, { AxiosError, AxiosResponse } from 'axios';
import { BASE_URL, PUBLIC_BASE_URL } from './utils/consts';
import { redirect } from 'next/navigation';

export const API = axios.create({
    baseURL: '',
    withCredentials: true,
});

export const API_CLIENT = axios.create({
    baseURL: PUBLIC_BASE_URL,
    withCredentials: true,
    headers: {
        Referer: 'localhost:3030',
    },
});

export const API_SERVER = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        Referer: 'localhost:3030',
    },
});

const handleFetchResponses = (response: AxiosResponse) => {
    console.log(response.data);
    return response;
};

API_CLIENT.interceptors.response.use(handleFetchResponses);
API_SERVER.interceptors.response.use(handleFetchResponses);
