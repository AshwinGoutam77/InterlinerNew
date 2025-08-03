import React, { createContext, useContext, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RTLContext = createContext();

export const RTLProvider = ({ children }) => {
    const [isRTL, setIsRTL] = useState(I18nManager.isRTL);

    useEffect(() => {
        AsyncStorage.getItem('appRTL').then(value => {
            if (value !== null) {
                const enabled = value === 'true';
                setIsRTL(enabled);
                I18nManager.allowRTL(true);
                I18nManager.forceRTL(enabled);
            }
        });
    }, []);

    const toggleRTL = async () => {
        const newValue = !isRTL;
        setIsRTL(newValue);
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(newValue);
        await AsyncStorage.setItem('appRTL', newValue.toString());
        // No app restart
    };

    return (
        <RTLContext.Provider value={{ isRTL, toggleRTL }}>
            {children}
        </RTLContext.Provider>
    );
};

export const useRTL = () => useContext(RTLContext);
