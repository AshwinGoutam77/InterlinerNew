// modals/CreditInfoModal.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

const CreditInfoModal = ({ visible, onClose }) => {
    const { t } = useTranslation();

    const containerStyle = {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    };

    return (
        <Portal>
            <Modal
                visible={visible}
                transparent
                animationType="slide"
                contentContainerStyle={containerStyle}
            >
                {/* Close Button */}
                <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                    <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.title}>{t('dashboard.creditLimit')}</Text>

                <View>
                    <View style={styles.row}>
                        <Text style={styles.label}>{t('dashboard.creditAvailable')}</Text>
                        <Text style={styles.value}>4000</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>{t('dashboard.creditUsed')}</Text>
                        <Text style={styles.value}>2000</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>{t('dashboard.creditPeriod')}</Text>
                        <Text style={styles.value}>10 Days</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>{t('dashboard.dueDate')}</Text>
                        <Text style={styles.value}>24/8/2025</Text>
                    </View>
                </View>
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'left',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 6,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
    },
    value: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default CreditInfoModal;
