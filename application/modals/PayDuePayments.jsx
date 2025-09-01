import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../src/constants/colors';
import { Picker } from '@react-native-picker/picker';

function PayDuePayments({ PayDueVisible, onClose, isRTL }) {
    const [orderId, setOrderId] = useState(null);
    const [Amount, setAmount] = useState("")
    const [Remark, setRemark] = useState('')

    const containerStyle = { 
        backgroundColor: 'white', 
        padding: 20, 
        margin: 20, 
        borderRadius: 10 
    };

    return (
        <Portal>
            <Modal visible={PayDueVisible} onDismiss={onClose} contentContainerStyle={containerStyle}>
                {/* Close Button */}
                <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                    <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.title}>Pay Due By Orders</Text>

                {/* Payment Method Dropdown */}
                <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>Payment Via</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={orderId}
                        onValueChange={(itemValue) => setOrderId(itemValue)}
                        style={styles.picker}
                        dropdownIconColor="#666"
                    >
                        <Picker.Item label="Choose Method" value="" />
                        <Picker.Item label="Cash" value="Cash" />
                        <Picker.Item label="Bank Transfer" value="Bank Transfer" />
                        <Picker.Item label="Wallet" value="Wallet" />
                        <Picker.Item label="Online Link" value="Online Link" />
                    </Picker>
                </View>

                {/* Payment Buttons */}
                <View style={[styles.PaymentButtonGrid, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                    <TouchableOpacity style={styles.paymentBtn}>
                        <Text style={styles.buttonText}>Full Payment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.paymentBtn}>
                        <Text style={styles.buttonText}>Partial Payment</Text>
                    </TouchableOpacity>
                </View>

                {/* Amount Input */}
                <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>Amount</Text>
                <TextInput
                    style={[styles.input, { textAlign: isRTL ? 'right' : 'left' }]}
                    value={Amount}
                    onChangeText={setAmount}
                    placeholder="Enter Amount"
                />

                {/* Remark Input */}
                <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>Remark</Text>
                <TextInput
                    style={[styles.textarea, { textAlign: isRTL ? 'right' : 'left' }]}
                    value={Remark}
                    onChangeText={setRemark}
                    multiline
                    placeholder="Enter Your Remark"
                    textAlignVertical="top"
                />

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitBtn} onPress={onClose}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </Modal>
        </Portal>
    )
}

export default PayDuePayments;

const styles = StyleSheet.create({
    label: {
        fontSize: 15,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
    },
    textarea: {
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
    },
    submitBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    submitText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
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
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
    },
    picker: {
        height: 50,
        width: '100%',
        color: '#333',
    },
    PaymentButtonGrid: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    paymentBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: '600',
    },
});
