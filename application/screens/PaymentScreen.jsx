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
    SafeAreaView,
    I18nManager
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../src/constants/colors';
import { CurrencyContext } from '../context/CurrencyContext';
import CustomerFilter from '../components/CustomerFilter';
import { RoleContext } from '../context/RoleContext';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/RTLContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import GlobalStyles from '../src/constants/globalStyles';

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
    const { t } = useTranslation();
    const { isRTL } = useAppContext();
    const { role } = useContext(RoleContext);
    const tabs = role === "sales"
        ? ["Payment records", "Pay by order", "Credit Info"]
        : ["Payment records", "Pay by order", "Make Payment"];
    const paymentType = route?.params?.paymentType ?? null;
    const currency = '$'
    const [activeTab, setActiveTab] = useState(paymentType ? 'Make Payment' : 'Payment records');
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
    const [paymentTypes, setPaymentTypes] = useState("full");
    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10, textAlign: 'center', flexDirection: 'column', alignItems: 'start', gap: 10, justifyContent: 'center' };

    const renderTab = (tab) => {
        return (
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
    };


    const orderData = [
        { id: '#2344', status: 'Pending', totalAmount: '30', AmountPaid: '20', DueAmount: '10', DueDate: '21/11/2025', paidVia: 'Cash', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum ' },
        { id: '#2344', status: 'Pending', totalAmount: '30', AmountPaid: '20', DueAmount: '10', DueDate: '21/11/2025', paidVia: 'Cash', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum ' },
    ];

    const renderTransaction = ({ item }) => (
        <View style={[styles.itemContainer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <View>
                <Text style={[GlobalStyles.title, { textAlign: isRTL ? 'right' : 'left' }]}>{item.title}</Text>
                <Text style={styles.date}>{item.date}</Text>
                {role == 'sales' && <Text style={styles.date}>Sarah Smith</Text>}
            </View>
            <View style={{ flexDirection: 'column', alignItems: isRTL ? 'flex-start' : 'flex-end' }}>
                <Text style={[styles.amount, { textAlign: isRTL ? 'left' : 'right' }]}>{currency} {item.amount}</Text>
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

    const DueByOrder = () => (
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            {orderData.map((order, index) => (
                <View key={index} style={styles.card}>
                    {role == 'sales' && <View style={[styles.orderRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                        <Text style={GlobalStyles.label}>Customer Name</Text>
                        <Text style={GlobalStyles.value}>Sarah Smith</Text>
                    </View>}
                    <View style={[styles.orderRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                        <Text style={GlobalStyles.label}>Order Date</Text>
                        <Text style={GlobalStyles.value}>{order.DueDate}</Text>
                    </View>
                    <View style={[styles.orderRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                        <Text style={GlobalStyles.label}>Order Number</Text>
                        <Text style={GlobalStyles.value}>{order.id}</Text>
                    </View>
                    <View style={[styles.orderRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                        <Text style={GlobalStyles.label}>Total Amount</Text>
                        <Text style={GlobalStyles.value}>{currency} {order.totalAmount}</Text>
                    </View>
                    <View style={[styles.orderRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                        <Text style={GlobalStyles.label}>Paid Amount</Text>
                        <Text style={GlobalStyles.value}>{currency} {order.AmountPaid}</Text>
                    </View>
                    <View style={[styles.orderRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                        <Text style={GlobalStyles.label}>Balance Due</Text>
                        <Text style={GlobalStyles.value}>{currency} {order.DueAmount}</Text>
                    </View>
                    <View style={styles.descriptionRow}>
                        <Text style={[styles.descriptionRowLabel, { textAlign: isRTL ? 'right' : 'left' }]}>Remark</Text>
                        <Text style={[styles.descriptionRowLabelValue, { textAlign: isRTL ? 'right' : 'left' }]}>{order.description}</Text>
                    </View>
                    {role === 'customer' && <TouchableOpacity style={[styles.button, { marginLeft: isRTL ? 'auto' : '0' }]} onPress={showModal}>
                        <Text style={styles.buttonText}>Pay Now</Text>
                    </TouchableOpacity>}
                </View>
            ))
            }
        </ScrollView >
    )

    const DirectPay = () => {
        return (
            <ScrollView
                style={[styles.scroll, { marginTop: 0 }]}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.duePaymentText}>Payment Due - $230</Text>
                <Text
                    style={[
                        GlobalStyles.label,
                        { marginBottom: 10 },
                        { textAlign: isRTL ? "right" : "left" },
                    ]}
                >
                    Payment Via
                </Text>
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

                <Text
                    style={[
                        GlobalStyles.label,
                        { marginBottom: 10, marginTop: 10 },
                        { textAlign: isRTL ? "right" : "left" },
                    ]}
                >
                    Payment Type
                </Text>
                <View style={styles.paymentTypeWrapper}>
                    <TouchableOpacity
                        style={[
                            styles.optionBtn,
                            paymentTypes === "full" && styles.optionBtnActive,
                        ]}
                        onPress={() => setPaymentTypes("full")}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                paymentTypes === "full" && styles.optionTextActive,
                            ]}
                        >
                            Full Payment
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.optionBtn,
                            paymentTypes === "part" && styles.optionBtnActive,
                        ]}
                        onPress={() => setPaymentTypes("part")}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                paymentTypes === "part" && styles.optionTextActive,
                            ]}
                        >
                            Part Payment
                        </Text>
                    </TouchableOpacity>
                </View>

                {paymentTypes === "full" && <Text style={styles.offerText}>Receive a 10% credit when you make full payments.</Text>}

                {paymentTypes === "part" && (
                    <>
                        <Text
                            style={[
                                GlobalStyles.label,
                                { marginBottom: 10 },
                                { textAlign: isRTL ? "right" : "left" },
                            ]}
                        >
                            Amount
                        </Text>
                        <TextInput
                            style={[styles.input, { textAlign: isRTL ? "right" : "left" }]}
                            value={complaint}
                            onChangeText={setComplaint}
                            keyboardType="numeric"
                            placeholder="Enter Amount"
                            textAlignVertical="center"
                        />
                    </>
                )}

                {/* Remark */}
                <Text
                    style={[
                        GlobalStyles.label,
                        { marginBottom: 10, marginTop: 10 },
                        { textAlign: isRTL ? "right" : "left" },
                    ]}
                >
                    Remark
                </Text>
                <TextInput
                    style={[styles.textarea, { textAlign: isRTL ? "right" : "left" }]}
                    value={complaint}
                    onChangeText={setComplaint}
                    multiline
                    numberOfLines={1}
                    placeholder="Enter Your Remark"
                    textAlignVertical="top"
                />

                {/* Submit Button */}
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={() => {
                        console.log("Payment submitted:", {
                            method: orderOptions,
                            type: paymentType,
                            amount: paymentType === "part" ? complaint : "Full Amount",
                        });
                        hideModal();
                    }}
                >
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }

    const CreditInfo = () => {
        return (
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {orderData.map((order, index) => (
                    <View key={index} style={styles.card}>
                        {role == 'sales' && <View style={[styles.orderRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                            <Text style={GlobalStyles.label}>Customer Name</Text>
                            <Text style={GlobalStyles.value}>Sarah Smith</Text>
                        </View>}
                        <View style={[styles.orderRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                            <Text style={GlobalStyles.label}>Amount Paid</Text>
                            <Text style={GlobalStyles.value}>$299</Text>
                        </View>
                        <View style={[styles.orderRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                            <Text style={GlobalStyles.label}>Amount Due</Text>
                            <Text style={GlobalStyles.value}>$20</Text>
                        </View>
                    </View>
                ))
                }
            </ScrollView >
        )
    }

    const getContentForTab = () => {
        switch (activeTab) {
            case "Payment records":
                return (
                    <FlatList
                        data={transactionData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderTransaction}
                    />
                );
            case "Pay by order":
                return <DueByOrder />;
            case "Credit Info":
                return role === "sales" ? <CreditInfo /> : null; // Only for sales
            case "Make Payment":
                return role === "customer" ? <DirectPay /> : null; // Only for customer
            default:
                return null;
        }
    };

    const handleAttachPhoto = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, (response) => {
            if (!response.didCancel && !response.errorCode) {
                console.log("Selected image:", response.assets[0].uri);
            }
        });
    };

    return (
        <View style={GlobalStyles.container}>
            {role === 'sales' && <CustomerFilter />}
            <View style={styles.tabContainer}>{tabs.map(renderTab)}</View>
            <View style={styles.contentContainer}>{getContentForTab()}</View>

            <Portal>
                <Modal visible={visible} transparent animationType="slide" contentContainerStyle={containerStyle}>
                    {/* Close Button */}
                    <TouchableOpacity onPress={hideModal} style={styles.closeIcon}>
                        <Icon name="close" size={24} color="#000" />
                    </TouchableOpacity>

                    <Text style={GlobalStyles.title}>Pay Due By Orders</Text>

                    <TouchableOpacity
                        style={[styles.attachPhotoBtn, { flexDirection: isRTL ? 'row-reverse' : 'row', marginLeft: isRTL ? 'auto' : '0' }]}
                        onPress={handleAttachPhoto}
                    >
                        <Icon name="camera" size={20} color={Colors.white} />
                        <Text style={styles.attachPhotoText}>Attach Photo</Text>
                    </TouchableOpacity>

                    {/* Order Number Dropdown */}
                    <Text style={[GlobalStyles.label, { textAlign: isRTL ? 'right' : 'left' }]}>Payment Via</Text>
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
                    <Text style={[GlobalStyles.label, { textAlign: isRTL ? 'right' : 'left' }]}>Amount</Text>
                    <TextInput
                        style={[styles.input, { textAlign: isRTL ? 'right' : 'left' }]}
                        value={complaint}
                        onChangeText={setComplaint}
                        multiline
                        numberOfLines={1}
                        placeholder="Enter Amount"
                        textAlignVertical="center"
                    />

                    <Text style={[GlobalStyles.label, { textAlign: isRTL ? 'right' : 'left' }]}>Remark</Text>
                    <TextInput
                        style={[styles.textarea, { textAlign: isRTL ? 'right' : 'left' }]}
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
        justifyContent: 'space-between'
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
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        marginVertical: 4
    },
    offerText: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.secondary,
    },
    duePaymentText: {
        fontWeight: 800,
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 20,
        color: Colors.primary
    },
    descriptionRowLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000000',
        textAlign: I18nManager.isRTL ? 'right' : 'left'
    },
    descriptionRowLabelValue: {
        fontSize: 14,
        fontWeight: '400',
        color: '#000000b4',
        textAlign: I18nManager.isRTL ? 'right' : 'left'
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
        marginLeft: I18nManager.isRTL ? 'auto' : '0'
    },
    buttonText: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: 13,
        fontWeight: '600'
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
        textAlign: I18nManager.isRTL ? 'right' : 'left'
    },
    submitBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    submitText: {
        color: Colors.white,
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
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
    },
    paymentTypeWrapper: {
        flexDirection: "row",
        marginBottom: 10,
    },
    optionBtn: {
        flex: 1,
        borderWidth: 2,
        borderColor: "#ffffffff",
        borderRadius: 8,
        padding: 12,
        alignItems: "center",
        marginHorizontal: 5,
        backgroundColor: '#F3F4F6'
    },
    optionBtnActive: {
        backgroundColor: Colors.white,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    optionText: { color: "#333", fontWeight: "500" },
    optionTextActive: { color: Colors.black },
    attachPhotoBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        gap: 10,
        marginTop: 16,
        alignSelf: 'flex-start',
    },
    attachPhotoText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: '600',
    },
});
