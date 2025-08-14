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
                const rtlValue = storedRTL === 'true';
                setIsRTL(rtlValue);
                I18nManager.allowRTL(rtlValue);
                I18nManager.forceRTL(rtlValue);
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

        I18nManager.allowRTL(shouldBeRTL);
        I18nManager.forceRTL(shouldBeRTL);
        // Might need to restart app here for layout to take effect
    };

    const toggleRTL = async () => {
        const newRTL = !isRTL;
        setIsRTL(newRTL);
        await AsyncStorage.setItem('appRTL', newRTL.toString());

        I18nManager.allowRTL(newRTL);
        I18nManager.forceRTL(newRTL);
        // Might need to restart app here as well
    };

    return (
        <AppContext.Provider value={{ language, changeLanguage, isRTL, toggleRTL }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
