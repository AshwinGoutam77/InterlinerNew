// src/services/api.js
import axios from "axios";
import { Alert } from "react-native";
import { getToken, clearToken } from "../../context/authToken";
import * as RootNavigation from "../../RootNavigation"; // 👈 for global navigation

const apiClient = axios.create({
    baseURL: "https://myclientwebsite.com/interliner/api",
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

// 🔹 Add token in every request
apiClient.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// 🔹 Handle 401 errors globally
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.log("⚠️ Unauthorized (401) — clearing session...");

            // Clear any stored tokens
            await clearToken();

            // Show alert to the user
            Alert.alert(
                "Session Expired",
                "Your login session has expired. Please log in again.",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            RootNavigation.navigate("Login"); // 👈 navigate to Login screen
                        },
                    },
                ],
                { cancelable: false }
            );
        }

        return Promise.reject(error);
    }
);

// 🔹 API Endpoints
const API = {
    createCustomer: (data) => apiClient.post("/create-customer", data),
    loginCustomer: (data) => apiClient.post("/login-customer", data),

    getCategories: () => apiClient.get("/categories"),
    getCategoriesById: (id) => apiClient.get(`/categories/${id}`),
    getGroups: (id) => apiClient.get(`/groups/${id}`),

    getProduct: (childGroupId, data) => apiClient.post(`/get-product/${childGroupId}`, data),

    getCart: () => apiClient.get("/get-cart"),
    addCartItem: (data) => apiClient.post("/add-cart-item", data),
    updateCartItem: (data) => apiClient.post("/update-cart-item", data),
    removeCartItem: (data) => apiClient.post("/remove-cart-item", data),
};

export default API;
