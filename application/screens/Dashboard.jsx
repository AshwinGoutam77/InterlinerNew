import React from 'react';
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

const { width } = Dimensions.get('window');

const quickActions = [
    { icon: 'add-circle-outline', label: 'Start New Order' },
    { icon: 'file-tray-full-outline', label: 'View Previous Orders' },
    { icon: 'locate-outline', label: 'Track Order' },
    { icon: 'card-outline', label: 'Credit Info' },
    { icon: 'alert-circle-outline', label: 'Raise Complaint' },
    { icon: 'cash-outline', label: 'Payment' },
];

const DashboardScreen = () => {
    const navigation = useNavigation();
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
                <Text style={styles.quickActionHeading}>Quick Actions</Text>
                <View style={styles.quickGrid}>
                    {quickActions.map((action, index) => (
                        <TouchableOpacity style={styles.quickItem} key={index} onPress={() => navigation.navigate('CategoryScreen')}>
                            <Icon name={action.icon} size={28} color="#fff" />
                            <Text style={styles.quickLabel}>{action.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollContent: { paddingBottom: 100 },
    logo: { fontSize: 20, fontWeight: '700', color: '#0051A2' },
    headerIcons: { flexDirection: 'row', alignItems: 'center' },
    icon: { marginRight: 12 },
    lang: { fontSize: 16, marginRight: 12 },
    profile: { width: 32, height: 32, borderRadius: 16 },
    swiperContainer: { marginTop: 0, height: 180 },
    slide: {
        backgroundColor: '#1B3C85',
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
        backgroundColor: '#1B3C85',
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
});


export default DashboardScreen;
