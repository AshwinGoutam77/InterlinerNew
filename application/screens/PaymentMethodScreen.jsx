/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    I18nManager,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Modal, Portal } from 'react-native-paper';
import { t } from 'i18next';
import Colors from '../src/constants/colors';
import { CurrencyContext } from '../context/CurrencyContext';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/RTLContext';
import GlobalStyles from '../src/constants/globalStyles';


const paymentMethods = [
    {
        title: 'Cheque',
        icon: require('../../assets/images/cheque.png'),
        color: '#E3F2FD' // Light Blue
    },
    {
        title: 'Bank Transfer',
        icon: require('../../assets/images/bank-transfer.png'),
        color: '#E8F5E9' // Light Green
    },
    {
        title: 'My Wallet',
        subtitle: '$9,379',
        icon: require('../../assets/images/wallet.png'),
        color: '#FFF3E0' // Light Orange
    },
    {
        title: 'Buy now pay later',
        subtitle: 'Your Credit Balance: $9,379',
        icon: require('../../assets/images/buy-now.png'),
        color: '#F3E5F5' // Light Purple
    },
    {
        title: 'Full Payment',
        icon: require('../../assets/images/cash.png'),
        color: '#E0F7FA' // Light Teal
    },
    {
        title: 'Part Payment',
        icon: require('../../assets/images/partial-payment.png'),
        color: '#FFFDE7' // Light Yellow
    },
    {
        title: 'Online Link',
        icon: require('../../assets/images/payment-link.png'),
        color: '#FCE4EC' // Light Pink
    },
];


export default function PaymentMethodScreen() {
    const { t } = useTranslation();
    const { isRTL } = useAppContext();
    const navigation = useNavigation();
    const currency = '$'
    const [selected, setSelected] = useState(0);
    const [visible, setVisible] = React.useState(false);
    const [showBankModal, setShowBankModal] = useState(false);
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');

    const showModal = () => setVisible(true);
    const hideModal = () => {
        setVisible(false);
        navigation.navigate('Dashboard');
    };

    const TrackOrder = () => {
        setVisible(false);
        navigation.navigate('TrackOrderScreen');
    };

    const ContinueShopping = () => {
        setVisible(false);
        navigation.navigate('CategoryScreen');
    };

    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10, textAlign: 'center', flexDirection: 'column', alignItems: 'center', gap: 10, justifyContent: 'center' };
    const handleConfirmPayment = () => {
        const selectedMethod = paymentMethods[selected].title;

        if (selectedMethod === 'Cheque' || selectedMethod === 'Bank Transfer') {
            setShowBankModal(true); // ask for bank details
        } else {
            showModal(); // show thank you modal
        }
    };
    const submitBankDetails = () => {
        if (!accountNumber || !ifscCode) {
            alert('Please enter all bank details.');
            return;
        }
        setShowBankModal(false);
        showModal(); // proceed to thank you modal
    };

    return (
        <View style={[GlobalStyles.container, { paddingTop: 10 }]}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.paymentRow}>
                <View>
                    <Text style={[styles.totalText, { textAlign: isRTL ? 'right' : 'left' }]}>Total Payment: {currency} 3000</Text>
                </View>
                <View style={[styles.cardsWrapper, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                    {paymentMethods.map((method, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.card(selected === index, method.color)}
                            onPress={() => setSelected(index)}
                        >
                            <View style={styles.row}>
                                <View style={styles.iconCircle}>
                                    <Image
                                        source={method.icon}
                                        style={{ width: 26, height: 26, resizeMode: 'cover' }}
                                    />
                                </View>
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text style={styles.titleText}>{method.title}</Text>
                                    {method.subtitle && (
                                        <Text style={styles.descText}>{method.subtitle}</Text>
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}

                    <View>
                        <Text style={[styles.totalText, { marginTop: 20 }]}>You will receive
                            <Text style={{ color: '#00a753cc' }}> 10% discount </Text>
                            on making a full payment!</Text>
                    </View>
                </View>
            </ScrollView>

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Image
                        source={require('../../assets/images/check.png')}
                        style={{ width: 100, height: 100, resizeMode: 'contain', margin: 'auto' }}
                    />
                    <Text style={{ textAlign: 'center', fontSize: 18 }}>Thank you for shopping with us.</Text>
                    <TouchableOpacity
                        style={styles.confirmBtn}
                        // onPress={() => navigation.navigate('CategoryScreen')}
                        onPress={ContinueShopping}
                    >
                        <Text style={styles.confirmText}>Continue Shopping</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.confirmBtn}
                        onPress={TrackOrder}
                    >
                        <Text style={styles.confirmText}>Track Order</Text>
                    </TouchableOpacity>
                </Modal>

                {/* bank modal */}
                <Modal visible={showBankModal} onDismiss={() => setShowBankModal(false)}
                    contentContainerStyle={[containerStyle, { textAlign: 'left', alignItems: 'start' }]}
                >
                    <View style={GlobalStyles.flexRow}>
                        <Text style={GlobalStyles.title}>Enter Bank Details</Text>
                        <TouchableOpacity onPress={() => setShowBankModal(false)}>
                            <Icon name="close" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <Text style={GlobalStyles.label}>Account Number</Text>
                    <TextInput
                        value={accountNumber}
                        onChangeText={setAccountNumber}
                        placeholder="Enter Account Number"
                        style={styles.input}
                    />

                    <Text style={GlobalStyles.label}>IFSC Code</Text>
                    <TextInput
                        value={ifscCode}
                        onChangeText={setIfscCode}
                        placeholder="Enter IFSC Code"
                        style={styles.input}
                    />

                    <TouchableOpacity style={[styles.confirmBtn]} onPress={submitBankDetails}>
                        <Text style={styles.confirmText}>Submit Details</Text>
                    </TouchableOpacity>
                </Modal>
            </Portal>
            {/* <TouchableOpacity
                style={[styles.confirmBtn, { marginTop: 10, marginBottom: 40 }]}
                onPress={showModal}
            >
                <Text style={styles.confirmText}>Confirm Payment</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
                style={[styles.confirmBtn, { marginTop: 10, marginBottom: 40 }]}
                onPress={handleConfirmPayment}
            >
                <Text style={styles.confirmText}>Confirm Payment</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#00000',
        marginBottom: 16
    },
    paymentRow: {
        paddingTop: 10
    },
    cardsWrapper: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    card: (active, bgColor) => ({
        backgroundColor: bgColor,
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 16,
        marginBottom: 12,
        width: '48%',
        shadowColor: '#ccc',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
        borderWidth: 1.5,
        borderColor: active ? Colors.primary : 'transparent'
    }),

    row: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    iconCircle: {
        width: 50,
        height: 50,
        borderRadius: 20,
        // backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    descText: {
        fontSize: 13,
        color: '#000000ff',
        textAlign: 'center'
    },
    radio: (selected) => ({
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: selected ? '#000' : 'transparent',
        marginLeft: 10
    }),
    confirmBtn: {
        backgroundColor: Colors.primary,
        padding: 16,
        alignItems: 'center',
        borderRadius: 8,
        width: '100%',
    },
    confirmText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16
    },
    totalText: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 20,
        textAlign: I18nManager.isRTL ? 'right' : 'left'
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 12
    },

});
