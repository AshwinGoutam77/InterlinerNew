/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { Picker } from '@react-native-picker/picker';
import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet,
    TextInput,
    SafeAreaView
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../src/constants/colors';
import { CurrencyContext } from '../context/CurrencyContext';
import CustomerFilter from '../components/CustomerFilter';

const tabs = ['Payment records', 'Pay by order', 'Direct Payment',];

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

export default function PaymentScreen({ route }) {
    const { role } = route || {}; // safe destructuring
    console.log("Role:", route);

    const paymentType = route?.params?.paymentType ?? null;
    const { currency } = useContext(CurrencyContext);
    const [activeTab, setActiveTab] = useState(paymentType ? 'Direct Payment' : 'Payment records');
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [orderId, setOrderId] = useState(null);
    const [complaint, setComplaint] = useState('');
    const [open, setOpen] = useState(false);
    const [orderOptions, setOrderOptions] = useState([
        { label: '#2344', value: '2344' },
        { label: '#2345', value: '2345' },
        { label: '#2346', value: '2346' },
    ]);

    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10, textAlign: 'center', flexDirection: 'column', alignItems: 'start', gap: 10, justifyContent: 'center' };

    const renderTab = (tab) => (
        <TouchableOpacity
            key={tab}
            style={[
                styles.tabButton,
                activeTab === tab && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab)}
        >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
            </Text>
        </TouchableOpacity>
    );

    const renderTransaction = ({ item }) => (
        <View style={styles.itemContainer}>
            {/* <Image source={item.icon} style={styles.icon} /> */}
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.date}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.amount}>{currency} {item.amount}</Text>
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
    );

    const orderData = [
        { id: '#2344', status: 'Pending', totalAmount: '30', AmountPaid: '20', DueAmount: '10', DueDate: '21/11/2025', paidVia: 'Cash', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum ' },
        { id: '#2344', status: 'Pending', totalAmount: '30', AmountPaid: '20', DueAmount: '10', DueDate: '21/11/2025', paidVia: 'Cash', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum ' },
    ];

    const DueByOrder = () => (
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            {orderData.map((order, index) => (
                <View key={index} style={styles.card}>
                    <View style={styles.orderRow}>
                        <Text style={styles.label}>Order Date</Text>
                        <Text style={styles.value}>{order.DueDate}</Text>
                    </View>
                    <View style={styles.orderRow}>
                        <Text style={styles.label}>Order Number</Text>
                        <Text style={styles.value}>{order.id}</Text>
                    </View>
                    <View style={styles.orderRow}>
                        <Text style={styles.label}>Total Amount</Text>
                        <Text style={styles.value}>{currency} {order.totalAmount}</Text>
                    </View>
                    <View style={styles.orderRow}>
                        <Text style={styles.label}>Paid Amount</Text>
                        <Text style={styles.value}>{currency} {order.AmountPaid}</Text>
                    </View>
                    <View style={styles.orderRow}>
                        <Text style={styles.label}>Balance Due</Text>
                        <Text style={styles.value}>{currency} {order.DueAmount}</Text>
                    </View>
                    <View style={styles.descriptionRow}>
                        <Text style={styles.descriptionRowLabel}>Remark</Text>
                        <Text style={styles.descriptionRowLabelValue}>{order.description}</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={showModal}>
                        <Text style={styles.buttonText}>Pay Now</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    )

    const DirectPay = () => {
        return (
            <ScrollView style={[styles.scroll, { marginTop: 20 }]} showsVerticalScrollIndicator={false}>
                <Text style={[styles.label, { marginBottom: 10 }]}>Payment Via</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={orderOptions}
                        onValueChange={(itemValue) => setOrderOptions(itemValue)}
                        style={styles.picker}
                        dropdownIconColor="#666"
                    >
                        <Picker.Item label="Choose Method" value="" />
                        <Picker.Item label="Cash" value="Cash" />
                        <Picker.Item label="Cheque" value="Cheque" />
                        <Picker.Item label="Card" value="Card" />
                    </Picker>
                </View>


                {/* Complaint Textarea */}
                <Text style={[styles.label, { marginBottom: 10 }]}>Amount</Text>
                <TextInput
                    style={styles.input}
                    value={complaint}
                    onChangeText={setComplaint}
                    multiline
                    numberOfLines={1}
                    placeholder="Enter Amount"
                    textAlignVertical="center"
                />

                <Text style={[styles.label, { marginBottom: 10, marginTop: 10 }]}>Remark</Text>
                <TextInput
                    style={styles.textarea}
                    value={complaint}
                    onChangeText={setComplaint}
                    multiline
                    numberOfLines={1}
                    placeholder="Enter Your Remark"
                    textAlignVertical="top"
                />

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitBtn} onPress={() => {
                    // Handle complaint submission logic here
                    console.log('Complaint submitted:', { orderId, complaint });
                    hideModal();
                }}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }

    const getContentForTab = () => {
        switch (activeTab) {
            case 'Payment records':
                return <FlatList data={transactionData} keyExtractor={(item) => item.id.toString()} renderItem={renderTransaction} />;
            case 'Pay by order':
                return <DueByOrder />;
            case 'Direct Payment':
                return <DirectPay />
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {/* <CustomerFilter /> */}
            <View style={styles.tabContainer}>{tabs.map(renderTab)}</View>
            <View style={styles.contentContainer}>{getContentForTab()}</View>

            <Portal>
                <Modal visible={visible} transparent animationType="slide" contentContainerStyle={containerStyle}>
                    {/* Close Button */}
                    <TouchableOpacity onPress={hideModal} style={styles.closeIcon}>
                        <Icon name="close" size={24} color="#000" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Pay Due By Orders</Text>

                    {/* Order Number Dropdown */}
                    <Text style={styles.label}>Payment Via</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={orderOptions}
                            onValueChange={(itemValue) => setOrderOptions(itemValue)}
                            style={styles.picker}
                            dropdownIconColor="#666"
                        >
                            <Picker.Item label="Choose Method" value="" />
                            <Picker.Item label="Cash" value="Cash" />
                            <Picker.Item label="Cheque" value="Cheque" />
                            <Picker.Item label="Card" value="Card" />
                            {/* Add more as needed */}
                        </Picker>
                    </View>


                    {/* Complaint Textarea */}
                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                        style={styles.input}
                        value={complaint}
                        onChangeText={setComplaint}
                        multiline
                        numberOfLines={1}
                        placeholder="Enter Amount"
                        textAlignVertical="center"
                    />

                    <Text style={styles.label}>Remark</Text>
                    <TextInput
                        style={styles.textarea}
                        value={complaint}
                        onChangeText={setComplaint}
                        multiline
                        numberOfLines={1}
                        placeholder="Enter Your Remark"
                        textAlignVertical="top"
                    />

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.submitBtn} onPress={() => {
                        // Handle complaint submission logic here
                        console.log('Complaint submitted:', { orderId, complaint });
                        hideModal();
                    }}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </Modal>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdfdfd', paddingHorizontal: 20
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        marginVertical: 20,
        overflow: 'hidden',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
    },
    activeTabButton: {
        backgroundColor: Colors.primary,
    },
    tabText: {
        fontSize: 14,
        color: '#111827',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#fff',
        fontWeight: '600',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        alignItems: 'center',
    },
    icon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    date: {
        fontSize: 12,
        color: '#6B7280',
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
    placeholder: {
        marginTop: 40,
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
    },

    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 20,
        width: '100%',
    },
    orderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000000'
    },
    descriptionRowLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000000'
    },
    value: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000'
    },
    descriptionRowLabelValue: {
        fontSize: 14,
        fontWeight: '400',
        color: '#000000b4'
    },
    buttonGrid: {
        marginTop: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    button: {
        width: '38%',
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        borderRadius: 6,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 13
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        height: 60,
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    navIcon: {
        alignItems: 'center'
    },
    dropdown: {
        marginBottom: 10,
        borderColor: '#ccc',
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

    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        backgroundColor: '#f9f9f9',
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
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
    },

    picker: {
        height: 50,
        width: '100%',
        color: '#333',
        flexDirection: 'row',
        alignItems: 'center',
    },

});
