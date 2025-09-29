import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppContext } from '../context/RTLContext';
import { useNavigation } from '@react-navigation/native';
import Colors from '../src/constants/colors';
import { useTranslation } from 'react-i18next';
import GlobalStyles from '../src/constants/globalStyles';

export default function ProfilePage() {
    const { t } = useTranslation();
    const { isRTL, language } = useAppContext();
    const navigation = useNavigation();
    const currency = '$'
    return (
        <View style={GlobalStyles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Profile Image and Info */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={require('../../assets/images/user.jpg')}
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
                            <Icon name="edit" size={14} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.name}>Andrew Ainsley</Text>
                    <Text style={styles.phone}>+1 111 467 378 399</Text>
                </View>

                <View>
                    {renderOption('edit', t('profile.editProfile'), 'EditProfile', null, isRTL, navigation)}
                    {renderOption('public', t('profile.language'), 'LanguageScreen', language, isRTL, navigation)}
                    {renderOption('money', t('profile.currency'), 'CurrencyScreen', currency, isRTL, navigation)}
                    {renderOption('pin', t('profile.address'), 'ShippingScreen', null, isRTL, navigation)}
                    {renderOption('notifications', t('profile.notification'), 'NotificationScreen', null, isRTL, navigation)}
                    {renderOption('lock', t('profile.privacy'), 'PrivacyScreen', null, isRTL, navigation)}
                    {renderOption('logout', t('profile.logout'), 'Login', null, isRTL, navigation)}
                </View>
            </ScrollView >
        </View >
    );
}

function renderOption(icon, title, link, value = null, isRTL = false, navigation) {
    return (
        <TouchableOpacity
            style={[
                styles.option,
                isRTL && { flexDirection: 'row-reverse' }
            ]}
            onPress={() => navigation.navigate(link)}
        >
            <View style={[styles.left, isRTL && { flexDirection: 'row-reverse' }]}>
                <Icon
                    name={icon}
                    size={18}
                    color="#ffffff"
                    style={[styles.optionIcon, isRTL && { marginLeft: 12, marginRight: 0 }]}
                />
                <Text style={styles.optionText}>{title}</Text>
            </View>
            <View style={[styles.right, isRTL && { flexDirection: 'row-reverse' }]}>
                {value && <Text style={[styles.optionValue, { marginRight: title !== 'RTL' ? '8' : '0' }]}>{value}</Text>}
                {title !== 'RTL' && title !== 'Logout' && <Icon name="chevron-right" size={20} color="#9CA3AF" />}
            </View>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 100,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 24,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 12,
    },
    avatar: {
        width: 92,
        height: 92,
        borderRadius: 46,
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#111827',
        padding: 10,
        borderRadius: 100,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    phone: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    option: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionIcon: {
        marginRight: 12,
        backgroundColor: Colors.primary,
        padding: 8,
        borderRadius: 8,
    },
    optionText: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionValue: {
        fontSize: 14,
        color: '#6B7280',
        marginRight: 8,
    },
    logout: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EF4444',
        marginLeft: 10,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopColor: '#E5E7EB',
        borderTopWidth: 1,
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
    },
    tab: {
        alignItems: 'center',
    },
    tabLabel: {
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 4,
    },
});
