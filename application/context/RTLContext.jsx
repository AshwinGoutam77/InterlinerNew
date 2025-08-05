import React, { createContext, useContext, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../src/i18n/i18n';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [isRTL, setIsRTL] = useState(I18nManager.isRTL);

    useEffect(() => {
        (async () => {
            const storedLang = await AsyncStorage.getItem('appLanguage');
            const storedRTL = await AsyncStorage.getItem('appRTL');
            if (storedLang) {
                setLanguage(storedLang);
                i18n.changeLanguage(storedLang);
            }
            if (storedRTL !== null) {
                setIsRTL(storedRTL === 'true');
            }
        })();
    }, []);

    const changeLanguage = async (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang);
        await AsyncStorage.setItem('appLanguage', lang);

        const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
        const shouldBeRTL = rtlLanguages.includes(lang);
        setIsRTL(shouldBeRTL);
        await AsyncStorage.setItem('appRTL', shouldBeRTL.toString());
    };

    const toggleRTL = async () => {
        const newRTL = !isRTL;
        setIsRTL(newRTL);
        await AsyncStorage.setItem('appRTL', newRTL.toString());
    };

    return (
        <AppContext.Provider value={{ language, changeLanguage, isRTL, toggleRTL }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
