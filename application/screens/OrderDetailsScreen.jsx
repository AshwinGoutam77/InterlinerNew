/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import Colors from '../src/constants/colors';
import { Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

const OrderDetailsScreen = () => {
    const [visible, setVisible] = React.useState(false);
    const [complaint, setComplaint] = useState('');
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10, textAlign: 'center', flexDirection: 'column', alignItems: 'start', gap: 10, justifyContent: 'center' };
    const transactionData = [
        {
            id: 1,
            title: 'Paid Directly',
            amount: '120',
            type: 'Cash',
            icon: require('../../assets/images/kandura.png'),
            date: 'Dec 15, 2024 | 10:00 AM',
            color: '#F87171',
        },
        {
            id: 2,
            title: 'Partial Payment',
            amount: '400',
            type: 'Cheque',
            icon: require('../../assets/images/kandura.png'),
            date: 'Dec 14, 2024 | 16:42 PM',
            color: '#60A5FA',
        },
        {
            id: 3,
            title: 'Full Payment',
            amount: '100',
            type: 'Card',
            icon: require('../../assets/images/kandura.png'),
            date: 'Dec 14, 2024 | 16:42 PM',
            color: '#15c55eff',
        },
    ];
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.buttonContainer}
            >
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.buttonText}>Mark as Received</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.buttonText}>Download Invoice</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={showModal}>
                    <Text style={styles.buttonText}>Complain</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Order Info */}
            <View style={styles.card}>
                <Text style={styles.label}>
                    Order Number : <Text style={styles.bold}>#1245035000</Text>
                </Text>
                <View style={styles.statusRow}>
                    <Text style={styles.date}>01 Dec, 2022</Text>
                    <Text style={styles.completed}>• Completed</Text>
                </View>
            </View>

            {/* Shipping Details */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Shipping Details</Text>
                <Text style={styles.text}>
                    <Text style={styles.label}>Address: </Text>3501 Maloy Court, East Elmhurst, New York City, NY 11369
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.label}>Phone no: </Text>+91 635 546 23098
                </Text>
            </View>

            {/* Product */}
            <View style={styles.card}>
                <View style={styles.productRow}>
                    <View style={styles.productRow}>
                        <Image
                            source={require('../../assets/images/kandura.png')}
                            style={styles.productImage}
                        />
                        <View>
                            <Text style={styles.productTitle}>Kandura</Text>
                            <Text style={styles.qty}>Qty : 2</Text>
                        </View>
                    </View>
                    <Text style={styles.productPrice}>₹24940.16</Text>
                </View>

                {/* Price Breakdown */}
                <View style={styles.priceRow}>
                    <Text style={styles.text}>Sub Total</Text>
                    <Text style={styles.text}>₹24940.16</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.text}>Shipping charge</Text>
                    <Text style={styles.text}>₹1640.80</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.text}>Promo (10%)</Text>
                    <Text style={styles.text}>₹0.00</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.priceRow}>
                    <Text style={styles.total}>Total Amount</Text>
                    <Text style={styles.total}>₹26580.96</Text>
                </View>
            </View>

            {/* Transaction History */}
            <Text style={styles.TrancactionHeading}>Transaction History</Text>
            {transactionData?.map((item, index) => {
                return (
                    <View style={styles.itemContainer} key={index}>
                        {/* <Image source={item.icon} style={styles.icon} /> */}
                        <View style={{ flex: 1 }}>
                            <Text style={styles.TrancactionTitle}>{item.title}</Text>
                            <Text style={styles.date}>{item.date}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.amount}>{"currency"} {item.amount}</Text>
                            <View style={styles.typeRow}>
                                <Text style={styles.typeText}>{item.type}</Text>
                                <View
                                    style={[
                                        styles.typeIcon,
                                        { backgroundColor: item.color },
                                    ]}
                                />
                            </View>
                        </View>
                    </View>
                )
            })}


            <Portal>
                <Modal visible={visible} transparent animationType="slide" contentContainerStyle={containerStyle}>
                    {/* Close Button */}
                    <TouchableOpacity onPress={hideModal} style={styles.closeIcon}>
                        <Icon name="close" size={24} color="#000" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Raise a Complaint</Text>

                    <Text style={styles.label}>Your Complaint</Text>
                    <TextInput
                        style={styles.textarea}
                        value={complaint}
                        onChangeText={setComplaint}
                        multiline
                        numberOfLines={1}
                        placeholder="Describe your issue..."
                        textAlignVertical="top"
                    />

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.submitBtn} onPress={() => {
                        hideModal();
                    }}>
                        <Text style={styles.submitText}>Submit Complaint</Text>
                    </TouchableOpacity>
                </Modal>
            </Portal>

        </ScrollView>
    );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        backgroundColor: '#fdfdfd',
        paddingTop: 0,
        flex: 1,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        elevation: 1,
    },
    label: {
        fontWeight: '600',
        fontSize: 14,
        color: '#333',
    },
    bold: {
        fontWeight: '700',
        color: '#000',
    },
    TrancactionHeading: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    TrancactionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    date: {
        fontSize: 13,
        color: '#888',
    },
    completed: {
        fontSize: 13,
        color: 'green',
        fontWeight: '500',
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 8,
    },
    text: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    productImage: {
        width: 60,
        height: 60,
        marginRight: 12,
        resizeMode: 'contain',
    },
    productTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
    },
    qty: {
        fontSize: 13,
        color: '#888',
    },
    productPrice: {
        fontWeight: '600',
        fontSize: 14,
        color: '#000',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 2,
    },
    total: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
        marginVertical: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        paddingVertical: 28,
    },
    actionButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 140,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'center',
    },
    historyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    historyLabel: {
        fontSize: 13,
        color: '#888',
    },
    historyText: {
        fontSize: 13,
        color: '#333',
    },
    value: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000'
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        backgroundColor: '#f9f9f9',
    },
    textarea: {
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        backgroundColor: '#f9f9f9',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingHorizontal: 20,
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
    submitBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    icon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    amount: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    typeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    typeText: {
        fontSize: 12,
        color: '#6B7280',
        marginRight: 6,
    },
    typeIcon: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
});
