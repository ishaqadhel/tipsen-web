import axios, { AxiosError } from 'axios';

import {
    ApiReturnType,
    UninterceptedApiErrorData,
} from '@/types/apis/common/type';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});

api.interceptors.request.use(function (config) {
    if (config.headers) {
        const token = localStorage.getItem('token') ?? undefined;

        config.headers.Authorization = token ? `Bearer ${token}` : '';
    }

    return config;
});

api.interceptors.response.use(
    (config) => {
        return config;
    },
    (error: AxiosError<ApiReturnType<UninterceptedApiErrorData>>) => {
        // parse error
        if (error.response?.status != 200) {
            return Promise.reject({
                ...error,
                response: {
                    ...error.response,
                    data: {
                        ...error.response?.data,
                        error:
                            typeof error.response?.data === 'string'
                                ? error.response?.data
                                : Object.values(
                                      error.response?.data?.data ?? '',
                                  )[0],
                    },
                },
            });
        }
        return Promise.reject(error);
    },
);

export default api;
