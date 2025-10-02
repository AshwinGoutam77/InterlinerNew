/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
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
    I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../src/constants/colors';
import { CurrencyContext } from '../context/CurrencyContext';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/RTLContext';
import GlobalStyles from '../src/constants/globalStyles';
import { RoleContext } from '../context/RoleContext';

const Checkout = () => {
    const { t } = useTranslation();
    const { isRTL } = useAppContext();
    const navigation = useNavigation();
    const { role } = useContext(RoleContext);
    const currency = '$'
    const orderItems = [
        {
            id: 1,
            name: 'Collar-2334',
            color: 'Off White | cut - 10 Rolls | UnCut - 2 Rolls | 36 Inch | 25 Meter',
            price: 120.00,
            quantity: 1,
            image: require('../../assets/images/kandura.png'),
        },
        {
            id: 2,
            name: 'Shirt-45934',
            color: 'Off White | cut - 10 Rolls | UnCut - 2 Rolls | 36 Inch | 25 Meter',
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
            <SafeAreaView style={[GlobalStyles.container, { paddingBottom: 120 }]}>

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {/* Shipping Address */}
                    <View style={styles.section}>
                        <Text style={[GlobalStyles.title, { textAlign: isRTL ? 'right' : 'left' }]}>
                            {t("checkoutScreen.shippingAddress")}
                        </Text>
                        <View style={[styles.addressContainer, { flexDirection: isRTL ? 'row-reverse' : 'row', gap: isRTL ? '10' : '0' }]}>
                            <View style={styles.locationIcon}>
                                <Text style={styles.locationIconText}><Icon name='home' style={styles.locationIconText} /></Text>
                            </View>
                            <View style={styles.addressInfo}>
                                <Text style={styles.addressTitle}>{t("checkoutScreen.officeAddress")}</Text>
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
                        <Text style={[GlobalStyles.title, { textAlign: isRTL ? 'right' : 'left' }]}>
                            {t("checkoutScreen.orderList")}
                        </Text>
                        {orderItems.map((item) => (
                            <View key={item.id} style={[styles.orderItem, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                                <Image source={item.image} style={styles.itemImage} />
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <View style={styles.colorContainer}>
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

                    {/* Promo Code */}
                    <View style={styles.section}>
                        <Text style={[GlobalStyles.title, { textAlign: isRTL ? 'right' : 'left' }]}>
                            {t("checkoutScreen.promoCode")}
                        </Text>
                        <TouchableOpacity style={styles.promoContainer} onPress={() => navigation.navigate('PromoCodeScreen')}>
                            <View style={[styles.promoTag, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                    <Icon name='local-offer' size={20} color="#058f1aff" />
                                    <Text style={styles.promoText}>{t("checkoutScreen.discountText")}</Text>
                                </View>
                                <TouchableOpacity style={styles.removePromo}>
                                    <Text style={styles.removePromoText}>
                                        <Icon name={isRTL ? "chevron-left" : "chevron-right"} size={22} style={{ color: '#058f1aff' }} />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Order Summary */}
                    <View style={styles.summarySection}>
                        <View style={[GlobalStyles.flexRow, { marginBottom: 10, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                            <Text style={styles.summaryLabel}>{t("checkoutScreen.amount")}</Text>
                            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                        </View>
                        <View style={[GlobalStyles.flexRow, { marginBottom: 10, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                            <Text style={styles.summaryLabel}>{t("checkoutScreen.shipping")}</Text>
                            <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
                        </View>
                        <View style={[GlobalStyles.flexRow, { marginBottom: 10, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                            <Text style={styles.summaryLabel}>{t("checkoutScreen.promo")}</Text>
                            <Text style={styles.summaryValue}>-${discount.toFixed(2)}</Text>
                        </View>
                        <View style={[[GlobalStyles.flexRow, { marginBottom: 10, flexDirection: isRTL ? 'row-reverse' : 'row' }], styles.totalRow]}>
                            <Text style={styles.summaryLabel}>{t("checkoutScreen.total")}</Text>
                            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>
                            {t("checkoutScreen.remark")}
                        </Text>
                    </View>
                    <TextInput
                        style={[styles.textarea, { textAlign: isRTL ? 'right' : 'left' }]}
                        placeholder={t("checkoutScreen.remarkPlaceholder")}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                </ScrollView>
            </SafeAreaView>
            <View style={[styles.footer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <View>
                    <Text style={styles.totalLabel}>{t("checkoutScreen.totalPrice")}</Text>
                    <Text style={styles.totalPrice}>{currency}{total.toFixed(2)}</Text>
                </View>
                {role !== 'sales' && <TouchableOpacity
                    style={styles.checkoutBtn}
                    onPress={() => navigation.navigate('PaymentMethodScreen')}
                >
                    <Text style={styles.checkoutText}>{t("checkoutScreen.confirmOrder")}</Text>
                </TouchableOpacity>}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    section: {
        paddingVertical: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    addressContainer: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
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
        gap: I18nManager.isRTL ? 20 : 0,
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
    editButton: {
        padding: 5,
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
    orderItem: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
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
    promoContainer: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    },
    promoTag: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        backgroundColor: '#bef8daff',
        paddingHorizontal: 15,
        paddingVertical: 16,
        borderRadius: 8,
        width: '100%',
        justifyContent: 'space-between',
        marginRight: 10,
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
        fontSize: 16,
        fontWeight: 'bold',
    },
    summarySection: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 10,
        marginHorizontal: 1,
        shadowColor: '#ccc',
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 2,
    },
    summaryRow: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    summaryLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
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
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 50,
        backgroundColor: Colors.primary,
        padding: 26,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    totalLabel: {
        fontSize: 14,
        color: Colors.white,
        fontWeight: '600',
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white,
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
        color: '#000',
        fontSize: 16,
        fontWeight: '800',
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
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
        backgroundColor: '#fff',
        marginBottom: 20,
    },
});


export default Checkout;