import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Modal, Portal } from 'react-native-paper';
import { I18nManager } from 'react-native';
import { useAppContext } from '../context/RTLContext';
import Colors from '../src/constants/colors';
import { useTranslation } from 'react-i18next';
import SupportModal from '../modals/SupportModal';
import CreditInfoModal from '../modals/CreditInfoModal';

const { width } = Dimensions.get('window');



const DashboardScreen = () => {
    const navigation = useNavigation();
    const { isRTL } = useAppContext();
    const { t } = useTranslation();

    const quickActions = [
        { key: 'startOrder', icon: 'add-circle-outline', label: t('dashboard.startNewOrder'), screen: 'CategoryScreen' },
        { key: 'previousOrders', icon: 'file-tray-full-outline', label: t('dashboard.previousOrders'), screen: 'HistoryScreen' },
        { key: 'trackOrder', icon: 'locate-outline', label: t('dashboard.trackOrder'), screen: 'TrackOrderListingScreen' },
        { key: 'repeatOrder', icon: 'repeat', label: t('dashboard.repeatOrder'), screen: 'RepeatOrderScreen' },
        { key: 'creditInfo', icon: 'card-outline', label: t('dashboard.creditInfo'), screen: '' },
        { key: 'payment', icon: 'cash-outline', label: t('dashboard.payment'), screen: 'PaymentScreen' },
        { key: 'complain', icon: 'alert-circle-outline', label: t('dashboard.complain'), screen: 'RaiseComplainScreen' },
        { key: 'support', icon: 'call-outline', label: t('dashboard.support'), screen: '' },
    ];


    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [creditModalVisible, setCreditModalVisible] = useState(false);
    const [supportModalVisible, setSupportModalVisible] = useState(false);

    const [orderId, setOrderId] = useState(null);
    const [complaint, setComplaint] = useState('');
    const [orderOptions, setOrderOptions] = useState([
        { label: '#2344', value: '2344' },
        { label: '#2345', value: '2345' },
        { label: '#2346', value: '2346' },
    ]);

    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10, textAlign: 'center', flexDirection: 'column', alignItems: 'start', gap: 10, justifyContent: 'center' };
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Swiper Banner */}
                <View style={styles.swiperContainer}>
                    <Swiper
                        autoplay
                        autoplayTimeout={5}
                        dotStyle={styles.dot}
                        activeDotStyle={styles.activeDot}
                        paginationStyle={{ bottom: 10 }}
                        height={180}
                    >
                        <View style={styles.slide}>
                            <View style={styles.slideContent}>
                                <Image
                                    source={require('../../assets/images/banner-add-1.png')}
                                    style={{ width: '100%', height: 180, borderRadius: 12 }}
                                />
                            </View>
                        </View>
                        <View style={styles.slide}>
                            <View style={styles.slideContent}>
                                <Image
                                    source={require('../../assets/images/banner-add-2.png')}
                                    style={{ width: '100%', height: 180, borderRadius: 12 }}
                                />
                            </View>
                        </View>
                    </Swiper>
                </View>

                {/* Quick Actions */}
                {/* <Text style={[styles.quickActionHeading, { textAlign: isRTL ? 'right' : 'left' }]}>Quick Actions</Text> */}
                <Text style={[styles.quickActionHeading, { textAlign: isRTL ? 'right' : 'left' }]}>
                    {t('dashboard.quickActions')}
                </Text>

                <View
                    style={[
                        styles.quickGrid,
                        { flexDirection: isRTL ? 'row-reverse' : 'row' } // ⬅️ Dynamic override
                    ]}
                >
                    {quickActions.map((action, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.quickItem,
                                { alignItems: isRTL ? 'flex-end' : 'flex-start' } // 👈 Direction fix
                            ]}
                            onPress={() => {
                                if (action.key === 'creditInfo') {
                                    setCreditModalVisible(true);
                                } else if (action.key === 'support') {
                                    setSupportModalVisible(true);
                                } else {
                                    navigation.navigate(action.screen);
                                }
                            }}
                        >
                            <Icon name={action.icon} size={28} color="#fff" />
                            <Text
                                style={[
                                    styles.quickLabel,
                                    { textAlign: isRTL ? 'right' : 'left' } // ⬅️ Text direction
                                ]}
                            >
                                {action.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <CreditInfoModal visible={creditModalVisible} onClose={() => setCreditModalVisible(false)} />
            <SupportModal visible={supportModalVisible} hideModal={() => setSupportModalVisible(false)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingTop: 20 },
    scrollContent: { paddingBottom: 10 },
    logo: { fontSize: 20, fontWeight: '700', color: Colors.primary },
    headerIcons: { flexDirection: 'row', alignItems: 'center' },
    icon: { marginRight: 12 },
    lang: { fontSize: 16, marginRight: 12 },
    profile: { width: 32, height: 32, borderRadius: 16 },
    swiperContainer: { marginTop: 0, height: 180 },
    slide: {
        backgroundColor: Colors.primary,
        borderRadius: 12,
        marginHorizontal: 16,
        height: 180,
        padding: 0,
    },
    slideContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    saleTitle: { color: '#fff', fontSize: 22, fontWeight: '700' },
    saleSubtitle: { color: '#fff', fontSize: 16 },
    saleSmall: { color: '#fff', fontSize: 12, marginTop: 8 },
    saleImage: { width: 100, height: 100, resizeMode: 'contain' },
    dot: { backgroundColor: '#ccc', width: 8, height: 8, borderRadius: 4 },
    activeDot: { backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4 },
    quickActionHeading: {
        fontSize: 24,
        fontWeight: '700',
        marginHorizontal: 20,
        marginVertical: 20,
        fontFamily: 'Poppins-Regular',
    },
    quickGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
    quickItem: {
        width: '47%',
        backgroundColor: Colors.primary,
        borderRadius: 12,
        padding: 26,
        marginBottom: 16,
        alignItems: 'center',
    },
    quickLabel: {
        color: '#fff',
        marginTop: 10,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
        fontFamily: 'Poppins-bold',
    },
    tabBar: {
        position: 'absolute',
        bottom: 0,
        width,
        height: 60,
        backgroundColor: '#fff',
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
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
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 20
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
        fontWeight: 'bold',
        color: '#000'
    },
    buttonGrid: {
        marginTop: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    button: {
        width: '48%',
        backgroundColor: '#002F87',
        paddingVertical: 10,
        borderRadius: 6,
        marginVertical: 4,
        marginLeft: 'auto'
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
    submitBtn: {
        backgroundColor: '#1E3A8A',
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
});


export default DashboardScreen;
