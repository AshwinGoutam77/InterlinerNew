import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Switch,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRTL } from '../context/RTLContext';

export default function ProfilePage() {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
    const { isRTL, toggleRTL } = useRTL();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Profile Image and Info */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={require('../../assets/images/user.jpg')}
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={styles.editButton}>
                            <Icon name="edit" size={14} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.name}>Andrew Ainsley</Text>
                    <Text style={styles.phone}>+1 111 467 378 399</Text>
                </View>

                {/* Settings Options */}
                <View style={styles.optionsList}>
                    {renderOption('edit', 'Edit Profile', null, isRTL)}
                    {renderOption('edit', 'RTL', <Switch value={isRTL} onValueChange={toggleRTL} />, isRTL)}
                    {renderOption('pin', 'Address', null, isRTL)}
                    {renderOption('notifications', 'Notification', null, isRTL)}
                    {renderOption('credit-card', 'Payment', null, isRTL)}
                    {renderOption('shield', 'Security', null, isRTL)}
                    {renderOption('arrow-right', 'Language', 'English (US)', null, isRTL)}
                    {renderOption('lock', 'Privacy Policy', null, isRTL)}
                    {renderOption('info', 'Help Center', null, isRTL)}
                </View>

                {/* Logout */}
                <TouchableOpacity style={styles.logout}>
                    <Icon name="log-out" size={20} color="#EF4444" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

function renderOption(icon, title, value = null, isRTL = false) {
    return (
        <TouchableOpacity
            style={[
                styles.option,
                isRTL && { flexDirection: 'row-reverse' }
            ]}
        >
            <View style={[styles.left, isRTL && { flexDirection: 'row-reverse' }]}>
                <Icon
                    name={icon}
                    size={18}
                    color="#111827"
                    style={[styles.optionIcon, isRTL && { marginLeft: 12, marginRight: 0 }]}
                />
                <Text style={styles.optionText}>{title}</Text>
            </View>
            <View style={[styles.right, isRTL && { flexDirection: 'row-reverse' }]}>
                {value && <Text style={styles.optionValue}>{value}</Text>}
                <Icon name="chevron-right" size={20} color="#9CA3AF" />
            </View>
        </TouchableOpacity>
    );
}


function renderDarkModeOption(enabled, toggle) {
    return (
        <View style={styles.option}>
            <View style={styles.left}>
                <Icon name="eye" size={18} color="#111827" style={styles.optionIcon} />
                <Text style={styles.optionText}>Dark Mode</Text>
            </View>
            <Switch
                value={enabled}
                onValueChange={toggle}
                thumbColor={enabled ? '#111827' : '#f4f3f4'}
                trackColor={{ false: '#D1D5DB', true: '#9CA3AF' }}
            />
        </View>
    );
}

function renderTab(icon, label, active = false) {
    return (
        <TouchableOpacity style={styles.tab}>
            <Icon name={icon} size={20} color={active ? '#111827' : '#9CA3AF'} />
            <Text style={[styles.tabLabel, active && { color: '#111827' }]}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
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
        padding: 6,
        borderRadius: 12,
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
    optionsList: {
        paddingHorizontal: 16,
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
    },
    optionText: {
        fontSize: 15,
        color: '#111827',
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
