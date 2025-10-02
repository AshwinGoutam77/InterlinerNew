import React, { useContext, useState } from 'react'; // ✅ useState added
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../src/constants/colors';
import { CurrencyContext } from '../context/CurrencyContext';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/RTLContext';
import GlobalStyles from '../src/constants/globalStyles';

const initialCartItems = [
    {
        id: '1',
        title: 'Lawson Chair',
        price: 120,
        color: 'Blue Grey',
        quantity: 1,
        image: require('../../assets/images/kandura.png'),
    },
    {
        id: '2',
        title: 'Parabolic Reflector',
        price: 170,
        color: 'Brown',
        quantity: 2,
        image: require('../../assets/images/shirt-banner.png'),
    },
    {
        id: '3',
        title: 'Mini Wooden Table',
        price: 165,
        color: 'Brown',
        quantity: 3,
        image: require('../../assets/images/jackets.png'),
    },
    {
        id: '4',
        title: 'Lawson Chair',
        price: 120,
        color: 'Blue Grey',
        quantity: 1,
        image: require('../../assets/images/kandura.png'),
    },
    {
        id: '5',
        title: 'Parabolic Reflector',
        price: 170,
        color: 'Brown',
        quantity: 2,
        image: require('../../assets/images/shirt-banner.png'),
    },
    {
        id: '6',
        title: 'Mini Wooden Table',
        price: 165,
        color: 'Brown',
        quantity: 3,
        image: require('../../assets/images/jackets.png'),
    },
];

export default function CartScreen() {
    const { t } = useTranslation();
    const { isRTL } = useAppContext();
    const navigation = useNavigation();
    const [cartItems, setCartItems] = useState(initialCartItems);
    const currency = '$'
    // const { currency } = useContext(CurrencyContext);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const increaseQuantity = (id) => {
        const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedItems);
    };

    const decreaseQuantity = (id) => {
        const updatedItems = cartItems.map(item =>
            item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        setCartItems(updatedItems);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={[styles.card, { flexDirection: isRTL ? 'row-reverse' : 'row' }]} onPress={() => navigation.navigate('ProductDetailScreen', { item })}>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <View style={styles.details}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.colorRow}>
                    <Text style={styles.colorText}>Off White | cut - 10 Rolls | UnCut - 2 Rolls | 36 Inch | 25 Meter</Text>
                </View>
                <Text style={styles.price}>{currency} {item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.rightControls}>
                <View style={styles.counter}>
                    <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                        <Text style={styles.counterBtn}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                        <Text style={styles.counterBtn}>+</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.removeBtn}>{t("cartScreen.remove")}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={GlobalStyles.container}>
            {/* Cart List */}
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 130 }}
                showsVerticalScrollIndicator={false}
            />

            {/* Footer */}
            <View style={[styles.footer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>{t("cartScreen.totalPrice")}</Text>
                    <Text style={styles.totalPrice}>{currency} {total.toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                    style={styles.checkoutBtn}
                    onPress={() => navigation.navigate('CheckoutScreen')}
                >
                    <Text style={styles.checkoutText}>{t("cartScreen.continue")}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginVertical: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
    },
    card: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        paddingVertical: 26,
        marginVertical: 10,
        marginHorizontal: 1,
        alignItems: 'center',
        shadowColor: '#ccc',
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 2,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 12,
        objectFit: 'cover',
    },
    details: {
        flex: 1,
        marginLeft: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '800',
    },
    colorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    colorDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 6,
    },
    colorText: {
        fontSize: 12,
        color: '#333',
        width: '80%',
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
    },
    rightControls: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 60,
    },
    counter: {
        backgroundColor: '#F4F4F4',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    counterBtn: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 8,
    },
    counterText: {
        fontSize: 16,
        color: Colors.black,
        fontWeight: '600',
    },
    removeBtn: {
        marginRight: 10,
        color: Colors.black,
        fontSize: 14,
        fontWeight: '600',
        marginTop: 10,
        textDecorationLine: 'underline',
        textDecorationColor: Colors.black,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.primary,
        padding: 26,
        paddingBottom: 50,
        borderRadius: 0,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 0,
        elevation: 3,
    },
    totalLabel: {
        fontSize: 14,
        color: Colors.white,
        fontWeight: '600'
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white
    },
    checkoutBtn: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        paddingVertical: 16,
        paddingHorizontal: 48,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkoutText: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: '800',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopColor: '#eee',
        borderTopWidth: 1,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    navText: {
        fontSize: 10,
        marginTop: 2,
    },
    activeNav: {
        color: '#000',
    },
});

