// src/i18n/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize'; // ✅ for CLI, not Expo

import en from './locales/en.json';
import ar from './locales/ar.json';

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: async (callback) => {
        try {
            const savedLanguage = await AsyncStorage.getItem('APP_LANGUAGE');
            const fallback = RNLocalize.getLocales()?.[0]?.languageCode || 'en';
            const lng = savedLanguage || fallback;
            callback(lng);
        } catch (err) {
            console.log('Error detecting language:', err);
            callback('en');
        }
    },
    init: () => { },
    cacheUserLanguage: async (lng) => {
        try {
            await AsyncStorage.setItem('APP_LANGUAGE', lng);
        } catch (err) {
            console.log('Error saving language:', err);
        }
    },
};

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        fallbackLng: 'en',
        resources: {
            en: { translation: en },
            ar: { translation: ar },
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
