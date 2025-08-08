import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
    SafeAreaView,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../src/constants/colors';

const Checkout = () => {
    const navigation = useNavigation();
    const orderItems = [
        {
            id: 1,
            name: 'Lawson Chair',
            color: 'Blue Grey',
            price: 120.00,
            quantity: 1,
            image: require('../../assets/images/kandura.png'),
        },
        {
            id: 2,
            name: 'Parabolic Reflector',
            color: 'Brown',
            price: 170.00,
            quantity: 2,
            image: require('../../assets/images/kandura.png'),
        },
    ];

    const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 15.00;
    const discount = 193.50;
    const total = subtotal + shipping - discount;

    return (
        <>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {/* Shipping Address */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Shipping Address</Text>
                        <View style={styles.addressContainer}>
                            <View style={styles.locationIcon}>
                                <Text style={styles.locationIconText}><Icon name='home' style={styles.locationIconText} /></Text>
                            </View>
                            <View style={styles.addressInfo}>
                                <Text style={styles.addressTitle}>Home</Text>
                                <Text style={styles.addressText}>61480 Sunbrook Park, PC 5679</Text>
                            </View>
                            <TouchableOpacity style={styles.editButton}
                                onPress={() => navigation.navigate('ShippingScreen')}>
                                <Text style={styles.editIcon}><Icon name='edit' style={styles.editIcon} /></Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Order List */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Order List</Text>
                        {orderItems.map((item) => (
                            <View key={item.id} style={styles.orderItem}>
                                <Image source={item.image} style={styles.itemImage} />
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <View style={styles.colorContainer}>
                                        <View style={[styles.colorDot, { backgroundColor: item.color === 'Blue Grey' ? '#87CEEB' : '#8B4513' }]} />
                                        <Text style={styles.colorText}>{item.color}</Text>
                                    </View>
                                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                                </View>
                                <View style={styles.quantityContainer}>
                                    <Text style={styles.quantity}>{item.quantity}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Choose Shipping */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Choose Shipping</Text>
                        <View style={styles.shippingOption}>
                            <View style={styles.shippingIcon}>
                                <Text style={styles.shippingIconText}>📦</Text>
                            </View>
                            <View style={styles.shippingInfo}>
                                <Text style={styles.shippingTitle}>Regular</Text>
                                <Text style={styles.shippingDate}>Estimated ... Dec 20-22</Text>
                            </View>
                            {/* <Text style={styles.shippingPrice}>$15</Text> */}
                            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('AddShippingScreen')}>
                                <Text style={styles.editIcon}><Icon name='chevron-right' style={styles.editIcon} /></Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Promo Code */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Promo Code</Text>
                        <TouchableOpacity style={styles.promoContainer} onPress={() => navigation.navigate('PromoCodeScreen')}>
                            <View style={styles.promoTag}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                    <Icon name='local-offer' size={20} color="#058f1aff" />
                                    <Text style={styles.promoText}>Discount 30% Off</Text>
                                </View>
                                <TouchableOpacity style={styles.removePromo}>
                                    <Text style={styles.removePromoText}>
                                        <Icon name="chevron-right" size={22} style={{ color: '#058f1aff' }} />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {/* <TouchableOpacity style={styles.addPromoButton}>
                            <Text style={styles.addPromoText}>+</Text>
                        </TouchableOpacity> */}
                        </TouchableOpacity>
                    </View>

                    {/* Order Summary */}
                    <View style={styles.summarySection}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Amount</Text>
                            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Shipping</Text>
                            <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Promo</Text>
                            <Text style={styles.summaryValue}>-${discount.toFixed(2)}</Text>
                        </View>
                        <View style={[styles.summaryRow, styles.totalRow]}>
                            <Text style={styles.summaryLabel}>Total</Text>
                            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.label}>Remark</Text>
                    </View>
                    <TextInput
                        style={styles.textarea}
                        // value={feedbackMessage}
                        // onChangeText={setFeedbackMessage}
                        multiline
                        numberOfLines={4}
                        placeholder="Enter your feedback..."
                        textAlignVertical="top"
                    />
                </ScrollView>
            </SafeAreaView>
            {/* <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('PaymentMethodScreen')}>
                    <Text style={styles.continueButtonText}>Continue to Payment</Text>
                </TouchableOpacity>
            </View> */}
            <View style={styles.footer}>
                <View>
                    <Text style={styles.totalLabel}>Total price</Text>
                    <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                    style={styles.checkoutBtn}
                    onPress={() => navigation.navigate('PaymentMethodScreen')}
                >
                    <Text style={styles.checkoutText}>Confirm Order</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 20,
        paddingBottom: 120
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingHorizontal: 20,
        // paddingVertical: 15,
        borderBottomWidth: 1,
        // borderBottomColor: '#f0f0f0',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backArrow: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    menuButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuDots: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    section: {
        // paddingHorizontal: 20,
        paddingVertical: 15,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15,
    },
    addressContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 8,
        padding: 16,
        paddingVertical: 26,
        marginVertical: 10,
        marginHorizontal: 1,
        shadowColor: '#ccc',
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 2,
    },
    locationIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#000',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    locationIconText: {
        color: '#fff',
        fontSize: 20,
    },

    editIcon: {
        color: '#000',
        fontSize: 16,
    },
    addressInfo: {
        flex: 1,
    },
    addressTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    addressText: {
        fontSize: 14,
        color: '#666',
    },
    editButton: {
        padding: 5,
    },
    orderItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 8,
        padding: 16,
        paddingVertical: 26,
        marginVertical: 10,
        marginHorizontal: 1,
        shadowColor: '#ccc',
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 2,
    },
    itemImage: {
        width: 60,
        height: 60,
        objectFit: 'cover',
        borderRadius: 8,
        marginRight: 15,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    colorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    colorDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    colorText: {
        fontSize: 14,
        color: '#666',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    quantityContainer: {
        minWidth: 30,
        alignItems: 'center',
    },
    quantity: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    shippingOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 12,
    },
    shippingIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#000',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    shippingIconText: {
        color: '#fff',
        fontSize: 16,
    },
    shippingInfo: {
        flex: 1,
    },
    shippingTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    shippingDate: {
        fontSize: 14,
        color: '#666',
    },
    shippingPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 10,
    },
    promoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    promoTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#bef8daff',
        paddingHorizontal: 15,
        paddingVertical: 16,
        borderRadius: 8,
        width: '100%',
        justifyContent: 'space-between',
        marginRight: 10,
        // marginRight: 10,
    },
    promoText: {
        color: '#058f1aff',
        fontSize: 16,
        fontWeight: '800',
        marginRight: 10,
    },
    removePromo: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removePromoText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    addPromoButton: {
        width: 40,
        height: 40,
        backgroundColor: '#000',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addPromoText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    summarySection: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        // alignItems: 'center',
        borderRadius: 8,
        padding: 16,
        marginVertical: 10,
        marginHorizontal: 1,
        // alignItems: 'center',
        shadowColor: '#ccc',
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 2,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    summaryLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 15,
        marginTop: 10,
    },
    // totalLabel: {
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     color: '#000',
    // },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    buttonContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#fff',
    },
    continueButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        paddingVertical: 18,
        borderRadius: 8,
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    continueArrow: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 26,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    totalLabel: {
        fontSize: 14,
        color: '#000000',
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    checkoutBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 5,
        paddingVertical: 16,
        paddingHorizontal: 48,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkoutText: {
        color: '#fff',
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
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 8,
        marginTop: 20,
    },
    textarea: {
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
        fontSize: 14,
        backgroundColor: '#ffffffff',
        marginBottom: 20,
    },
});

export default Checkout;