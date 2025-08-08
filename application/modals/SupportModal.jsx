// modals/SupportModal.js
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Linking
} from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import Colors from '../src/constants/colors';
import { useNavigation } from '@react-navigation/native';

const SupportModal = ({ visible, hideModal }) => {
    const { t } = useTranslation();
    const navigation = useNavigation()

    const containerStyle = {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        textAlign: 'center',
        justifyContent: 'center'
    };

    const openWhatsApp = () => {
        Linking.openURL('https://wa.me/+971504775180');
    };

    const makeCall = () => {
        Linking.openURL(`tel:+971504775180`);
    };

    const openHelpCenter = () => {
        hideModal()
        navigation.navigate('HelpCenterScreen')
    };

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <TouchableOpacity onPress={hideModal} style={styles.closeIcon}>
                    <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.modalTitle}>{t('dashboard.support')}</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={openWhatsApp}>
                        <Icon name="logo-whatsapp" size={20} color="#fff" />
                        <Text style={styles.buttonText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={makeCall}>
                        <Icon name="call" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Phone</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={openHelpCenter}>
                    <Icon name="help-circle" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Help Center</Text>
                </TouchableOpacity>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    closeIcon: {
        position: 'absolute',
        right: 15,
        top: 15,
        zIndex: 1,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'start',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        gap: 8,
        width: '49%'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default SupportModal;
