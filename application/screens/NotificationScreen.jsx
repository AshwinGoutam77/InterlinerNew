// NotificationScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';

const notifications = [
    {
        id: '1',
        title: '30% Special Discount!',
        subtitle: 'Special promotion only valid today',
        icon: require('../../assets/images/bell-icon.png'),
    },
    {
        id: '2',
        title: 'Top up E-wallet successful',
        subtitle: 'You have to top up your wallet',
        icon: require('../../assets/images/bell-icon.png'),
    },
    {
        id: '3',
        title: 'New service Available',
        subtitle: 'Now you can track orders',
        icon: require('../../assets/images/bell-icon.png'),
    },
    {
        id: '4',
        title: 'Credit card connected!',
        subtitle: 'Credit card has been linked!',
        icon: require('../../assets/images/bell-icon.png'),
    },
    {
        id: '5',
        title: 'Account setup successful!',
        subtitle: 'Your account has been created!',
        icon: require('../../assets/images/bell-icon.png'),
    },
];

const NotificationScreen = () => {
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <Image source={item.icon} style={styles.icon} resizeMode="contain" />
            </View>
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 14,
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        marginBottom: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        elevation: 2,
    },
    icon: {
        width: 24,
        height: 24,
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 13,
        color: '#777',
    },
});

export default NotificationScreen;
