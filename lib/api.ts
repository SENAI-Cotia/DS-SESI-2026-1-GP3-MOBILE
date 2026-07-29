import axios from 'axios';
declare const require: any;
let storage: { getItemAsync: (k: string) => Promise<string | null>; deleteItemAsync: (k: string) => Promise<void> };
try {
    const mod = require('./storage');
    storage = mod.storage ?? mod.default ?? mod;
} catch (e) {
    storage = {
        getItemAsync: async () => null,
        deleteItemAsync: async () => {},
    };
}

export const API_BASE_URL = 'http://10.92.199.16:3000';
export const TOKEN_KEY = 'kor_token';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
    const token = await storage.getItemAsync(TOKEN_KEY);
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let onUnauthorized: (() => void) | null = null;
export function setOnUnauthorized(fn: () => void) {
    onUnauthorized = fn;
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await storage.deleteItemAsync(TOKEN_KEY);
            onUnauthorized?.();
        }
        return Promise.reject(error);
    }
);
