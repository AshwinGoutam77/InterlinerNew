import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For back arrow
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // For radio buttons
import i18n from '../src/i18n/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const languages = [
        { code: 'en', label: t('language.English (US)') },
        { code: 'ar', label: t('language.Arabic') },
        { code: 'hi', label: t('language.Hindi') },
        { code: 'fr', label: t('language.French') },
        { code: 'es', label: t('language.Spanish') },
        { code: 'zh', label: t('language.Mandarin') },
        { code: 'bn', label: t('language.Bengali') },
        { code: 'ru', label: t('language.Russian') },
        { code: 'id', label: t('language.Indonesian') },
    ];
    useEffect(() => {
        const loadLanguage = async () => {
            const storedLang = await AsyncStorage.getItem('APP_LANGUAGE');
            if (storedLang) {
                i18n.changeLanguage(storedLang);
                setSelectedLanguage(storedLang);
            }
        };
        loadLanguage();
    }, []);

    // const { i18n } = useTranslation();

    // const changeLang = (lang) => {
    //     i18n.changeLanguage(lang);
    //     setSelectedLanguage(lang)
    // };
    // const currentLang = i18n.language;


    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const changeLang = async (lang) => {
        try {
            await i18n.changeLanguage(lang);
            setSelectedLanguage(lang);
            await AsyncStorage.setItem('APP_LANGUAGE', lang); // ✅ Save to storage
        } catch (err) {
            console.error('Failed to change language:', err);
        }
    };
    const renderItem = (item) => (
        <TouchableOpacity
            style={styles.languageRow}
            onPress={() => changeLang(item.code)}
        >
            <Text style={styles.languageText}>{item.label}</Text>
            <MaterialIcons
                name={selectedLanguage === item.code ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={22}
                color="#000"
            />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>

            <FlatList
                data={languages}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={(item) => item.code}
            />
        </SafeAreaView>
    );
};

export default LanguageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 12,
        marginBottom: 8,
    },
    languageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    languageText: {
        fontSize: 18,
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 16,
    },
});
