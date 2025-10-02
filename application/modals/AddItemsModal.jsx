// modals/CreditInfoModal.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import Colors from '../src/constants/colors';
import { useNavigation } from '@react-navigation/native';

const AddItemsModal = ({ visible, onClose }) => {
    const { t } = useTranslation();
    const navigation = useNavigation();

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
                <View style={styles.row}>
                    <Text style={styles.label}>
                        {t("cartModal.message")}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.cartBtn} onPress={() => (navigation.navigate('CategoryScreen'), onClose())}>
                        <Text style={styles.cartText}>{t("cartModal.addMore")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cartBtn} onPress={() => (navigation.navigate('CartScreen'), onClose())}>
                        <Text style={styles.cartText}>{t("cartModal.confirmOrder")}</Text>
                    </TouchableOpacity>
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
        justifyContent: 'center',
        marginVertical: 6,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
    },
    value: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cartBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        width: '48%',
    },
    cartText: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 16,
    },
});

export default AddItemsModal;
