// context/CurrencyContext.jsx
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState({
        currency: "US Dollar",
        code: "USD",
        symbol: "$",
    });

    useEffect(() => {
        const loadCurrency = async () => {
            try {
                const savedCurrency = await AsyncStorage.getItem("currency");
                if (savedCurrency) {
                    setCurrency(JSON.parse(savedCurrency)); // ✅ Parse JSON
                }
            } catch (error) {
                console.log("Error loading currency:", error);
            }
        };
        loadCurrency();
    }, []);

    const changeCurrency = async (newCurrency) => {
        try {
            setCurrency(newCurrency);
            await AsyncStorage.setItem("currency", JSON.stringify(newCurrency)); // ✅ Store as JSON
        } catch (error) {
            console.log("Error saving currency:", error);
        }
    };

    return (
        <CurrencyContext.Provider value={{ currency, changeCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};
