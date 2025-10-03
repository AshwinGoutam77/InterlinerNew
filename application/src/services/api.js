// src/services/api.js
import axios from "axios";
import { getToken } from "../../context/authToken";

const apiClient = axios.create({
    baseURL: "https://myclientwebsite.com/interliner/api",
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const API = {
    createCustomer: (data) => apiClient.post("/create-customer", data),
    loginCustomer: (data) => apiClient.post("/login-customer", data),

    getCategories: () => apiClient.get("/categories"),
    getCategoriesById: (id) => apiClient.get(`/categories/${id}`),
    getGroups: (id) => apiClient.get(`/groups/${id}`),
};

export default API;
