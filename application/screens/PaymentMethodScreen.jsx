import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Modal, Portal } from 'react-native-paper';
import { t } from 'i18next';
import Colors from '../src/constants/colors';


const paymentMethods = [
    {
        title: 'My Wallet',
        subtitle: '$9,379',
        icon: require('../../assets/images/wallet.png')
    },
    {
        title: 'Bank Transfer',
        icon: require('../../assets/images/bank-transfer.png')
    },
    {
        title: 'Buy now pay later',
        subtitle: 'Your Credit Balance: $9,379',
        icon: require('../../assets/images/buy-now.png')
    },
    {
        title: 'Part Payment',
        icon: require('../../assets/images/partial-payment.png')
    },
    {
        title: 'Full Payment',
        icon: require('../../assets/images/cash.png')
    },
    {
        title: 'Online Link',
        icon: require('../../assets/images/payment-link.png')
    },
    {
        title: 'Cheque',
        icon: require('../../assets/images/cheque.png')
    },
];

export default function PaymentMethodScreen() {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(0);
    const [visible, setVisible] = React.useState(false);

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


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.paymentRow}>
                <View style={styles.cardsWrapper}>
                    {paymentMethods.map((method, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.card(selected === index)}
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
            </Portal>


            <TouchableOpacity
                style={styles.confirmBtn}
                // onPress={() => navigation.navigate('CheckoutScreen')}
                onPress={showModal}
            >
                <Text style={styles.confirmText}>Confirm Payment</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    card: (active) => ({
        backgroundColor: '#fff',
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
        color: '#777',
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
        padding: 18,
        alignItems: 'center',
        borderRadius: 12,
        width: '100%',
    },
    confirmText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});
