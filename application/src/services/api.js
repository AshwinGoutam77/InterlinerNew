// src/services/api.js
import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://your-api-url.com/api",
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(async (config) => {
    const token = "";
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const API = {
    // Auth
    login: (email, password) => apiClient.post("/auth/login", { email, password }),
    register: (data) => apiClient.post("/auth/register", data),

    // Products
    getProducts: () => apiClient.get("/products"),
    getProductById: (id) => apiClient.get(`/products/${id}`),

    // Cart
    getCart: () => apiClient.get("/cart"),
    addToCart: (productId, qty) => apiClient.post("/cart", { productId, qty }),
    removeFromCart: (itemId) => apiClient.delete(`/cart/${itemId}`),

    // Orders
    placeOrder: (data) => apiClient.post("/orders", data),
    getOrders: () => apiClient.get("/orders"),
};

export default API;
