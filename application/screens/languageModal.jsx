import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppContext } from '../context/RTLContext';
import i18n from '../src/i18n/i18n';
import { Portal, Modal, Button } from 'react-native-paper';
import Colors from '../src/constants/colors';

const LanguageModal = ({ visible, onClose }) => {
    const { t } = useTranslation();
    const { isRTL, toggleRTL } = useAppContext();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const languages = [
        { code: 'en', label: t('language.English (US)') },
        { code: 'ar', label: t('language.Arabic') },
        { code: 'hi', label: t('language.Hindi') },
        { code: 'fr', label: t('language.French') },
        // { code: 'es', label: t('language.Spanish') },
        // { code: 'zh', label: t('language.Mandarin') },
        // { code: 'bn', label: t('language.Bengali') },
        // { code: 'ru', label: t('language.Russian') },
        // { code: 'id', label: t('language.Indonesian') },
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

    const changeLang = async (lang) => {
        try {
            await i18n.changeLanguage(lang);
            setSelectedLanguage(lang);
            await AsyncStorage.setItem('APP_LANGUAGE', lang);
            if (lang === 'ar') {
                toggleRTL(true);
            } else {
                toggleRTL(false);
            }
            onClose();
        } catch (err) {
            console.error('Failed to change language:', err);
        }
    };

    const renderItem = (item) => (
        <TouchableOpacity
            style={[
                styles.languageRow,
                { flexDirection: isRTL ? 'row-reverse' : 'row' },
            ]}
            onPress={() => changeLang(item.code)}
        >
            <Text style={styles.languageText}>{item.label}</Text>
            <MaterialIcons
                name={
                    selectedLanguage === item.code
                        ? 'radio-button-checked'
                        : 'radio-button-unchecked'
                }
                size={22}
                color="#000"
            />
        </TouchableOpacity>
    );

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onClose}
                contentContainerStyle={styles.modalContent}
            >
                <Text style={styles.headerTitle}>{t('Select Language')}</Text>

                <FlatList
                    data={languages}
                    renderItem={({ item }) => renderItem(item)}
                    keyExtractor={(item) => item.code}
                    ItemSeparatorComponent={() => <View style={styles.divider} />}
                />

                {/* <Button
                    mode="contained"
                    style={styles.closeBtn}
                    onPress={onClose}
                >
                    {t('Close')}
                </Button> */}
            </Modal>
        </Portal>
    );
};

export default LanguageModal;

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'left',
    },
    languageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    languageText: {
        fontSize: 16,
    },
    divider: {
        height: 0.5,
        backgroundColor: '#cccd',
    },
    closeBtn: {
        marginTop: 20,
        borderRadius: 8,
        backgroundColor: Colors.primary,
        padding: 5
    },
});
