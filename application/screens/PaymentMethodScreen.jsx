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
import { Modal } from 'react-native-paper';
import { t } from 'i18next';


const paymentMethods = [
    {
        title: 'My Wallet',
        subtitle: '$9,379',
        icon: require('../../assets/images/wallet.png')
    },
    {
        title: 'PayPal',
        icon: require('../../assets/images/paypal.png')
    },
    {
        title: 'Google Pay',
        icon: require('../../assets/images/google-pay.png')
    },
    {
        title: 'Apple Pay',
        icon: require('../../assets/images/apple-pay.png')
    },
    {
        title: '•••• •••• •••• 4679',
        icon: require('../../assets/images/mastercard.png')
    }
];

export default function PaymentMethodScreen() {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(0);
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10, textAlign: 'center', flexDirection: 'column', alignItems: 'center', gap: 10, justifyContent: 'center' };


    return (
        <View style={styles.container}>
            {/* <Text style={styles.subtitle}>
                Select the payment method you want to use.
            </Text> */}

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 20 }}>
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
                                    style={{ width: 22, height: 22, resizeMode: 'contain' }}
                                />
                            </View>
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={styles.titleText}>{method.title}</Text>
                                {method.subtitle && (
                                    <Text style={styles.descText}>{method.subtitle}</Text>
                                )}
                            </View>
                            <View style={styles.radio(selected === index)} />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Image
                    source={require('../../assets/images/check.png')}
                    style={{ width: 100, height: 100, resizeMode: 'contain', margin: 'auto' }}
                />
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Order Successfull</Text>
                <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={() => navigation.navigate('CategoryScreen')}
                    // onPress={showModal}
                >
                    <Text style={styles.confirmText}>Continue Shopping</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={() => navigation.navigate('TrackOrderScreen')}
                    // onPress={showModal}
                >
                    <Text style={styles.confirmText}>Track Order</Text>
                </TouchableOpacity>
            </Modal>


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
        backgroundColor: '#fefefe',
        paddingHorizontal: 20,
        paddingBottom: 20
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
    card: (active) => ({
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 16,
        marginVertical: 8,
        shadowColor: '#ccc',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
        borderWidth: 1,
        borderColor: active ? '#ccc' : 'transparent'
    }),
    row: {
        flexDirection: 'row',
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
        fontWeight: 'bold'
    },
    descText: {
        fontSize: 13,
        color: '#777'
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
        backgroundColor: '#1E3A8A',
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
