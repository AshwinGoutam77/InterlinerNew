// modals/CreditInfoModal.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import Colors from '../src/constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/RTLContext';
import { RoleContext } from '../context/RoleContext';

const CreditInfoModal = ({ visible, onClose }) => {
    const { t } = useTranslation();
    const { isRTL } = useAppContext();
    const navigation = useNavigation();
    const { role } = useContext(RoleContext);

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
                    <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                        <Text style={styles.label}>{t('dashboard.creditAvailable')}</Text>
                        <Text style={styles.value}>4000</Text>
                    </View>
                    <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                        <Text style={styles.label}>{t('dashboard.creditUsed')}</Text>
                        <Text style={styles.value}>2000</Text>
                    </View>
                    <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                        <Text style={[styles.label, { color: 'red' }]}>{t('dashboard.creditAvailableAmount')}</Text>
                        <Text style={styles.value}>1000</Text>
                    </View>
                    <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                        <Text style={[styles.label]}>{t('dashboard.totalCreditPeriod')}</Text>
                        <Text style={styles.value}>10 Days</Text>
                    </View>
                    <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                        <Text style={[styles.label, { color: 'red' }]}>{t('dashboard.creditPeriod')}</Text>
                        <Text style={styles.value}>8 Days</Text>
                    </View>
                    <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                        <Text style={styles.label}>{t('dashboard.dueDate')}</Text>
                        <Text style={styles.value}>24/8/2025</Text>
                    </View>

                    {role === 'customer' && <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            onClose();
                            navigation.navigate('PaymentScreen', { paymentType: 'directPayment' });
                        }}
                    >
                        <Text style={styles.buttonText}>Make Payment</Text>
                    </TouchableOpacity>}

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
    button: {
        width: '38%',
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        borderRadius: 6,
        marginTop: 20,
    },
    buttonText: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: 13,
        fontWeight: '600'
    },
});

export default CreditInfoModal;
