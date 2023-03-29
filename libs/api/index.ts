import env from 'constants/env';
import axios from 'axios';
import { Utils } from '@utils/common/Utils';

axios.defaults.withCredentials = true;

const TIMEOUT_REQUEST_DEFAULT = 5 * 60 * 1000; //300s
export const api = axios.create({
    baseURL: env.apiUrl,
    timeout: TIMEOUT_REQUEST_DEFAULT,
    headers: {
        'content-type': 'application/json',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
    },
});

api.interceptors.request.use(async function (config: any) {
    const customHeaders: { Authorization?: string } = {};
    const accessToken = Utils.getCookie('accessToken');
    
    if (accessToken) {
        customHeaders.Authorization = accessToken;
    }

    return {
        ...config,
        headers: {
            ...customHeaders, // auto attach token
            ...config.headers, // but you can override for some requests
        },
    };
});

api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        return Promise.reject(error.response);
    },
);
