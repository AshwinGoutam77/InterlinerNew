// application/src/i18n/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en.json';
import fr from './locales/fr.json';

const LANG_KEY = 'APP_LANG';

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: async (cb) => {
        const savedLang = await AsyncStorage.getItem(LANG_KEY);
        const fallback = RNLocalize.getLocales()[0]?.languageCode || 'en';
        cb(savedLang || fallback);
    },
    init: () => { },
    cacheUserLanguage: (lang) => AsyncStorage.setItem(LANG_KEY, lang),
};

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        compatibilityJSON: 'v3',
        resources: {
            en: { translation: en },
            fr: { translation: fr },
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
