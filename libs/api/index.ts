import env from 'constants/env';
import axios from 'axios';

axios.defaults.withCredentials = true;

const TIMEOUT_REQUEST_DEFAULT = 5 * 60 * 1000; //300s
export const api = axios.create({
    baseURL: env.apiUrl,
    timeout: TIMEOUT_REQUEST_DEFAULT,
    headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
    },
});

api.interceptors.request.use(async function (config) {
    return config;
});

api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        return Promise.reject(error.response.data);
    },
);
