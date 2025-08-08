import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Colors from '../src/constants/colors';
import { useNavigation } from '@react-navigation/native';

const previousOrders = [
    {
        id: '1',
        title: 'Veggie Pizza',
        date: 'Aug 5, 2025',
        price: '$12.99',
        image: 'https://via.placeholder.com/80',
    },
    {
        id: '2',
        title: 'Cheeseburger Meal',
        date: 'Aug 3, 2025',
        price: '$8.49',
        image: 'https://via.placeholder.com/80',
    },
    {
        id: '3',
        title: 'Veggie Pizza',
        date: 'Aug 5, 2025',
        price: '$12.99',
        image: 'https://via.placeholder.com/80',
    },
    {
        id: '4',
        title: 'Cheeseburger Meal',
        date: 'Aug 3, 2025',
        price: '$8.49',
        image: 'https://via.placeholder.com/80',
    },
    {
        id: '5',
        title: 'Veggie Pizza',
        date: 'Aug 5, 2025',
        price: '$12.99',
        image: 'https://via.placeholder.com/80',
    },
    {
        id: '6',
        title: 'Cheeseburger Meal',
        date: 'Aug 3, 2025',
        price: '$8.49',
        image: 'https://via.placeholder.com/80',
    },
];

export default function RepeatOrderScreen() {
    const navigation = useNavigation();
    const handleRepeatOrder = (orderId) => {
        console.log(`Repeating order: ${orderId}`);
    };

    const renderOrderCard = ({ item }) => (
        <View style={styles.card}>
            {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
            <View style={styles.details}>
                <Text style={styles.title}>Order ID - #23455</Text>
                <Text style={styles.price}>Total - {item.price}</Text>
                <Text style={styles.price}>Quantity - 4</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('CartScreen', { orderId: item.id })}
            >
                <Text style={styles.buttonText}>Repeat</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={previousOrders}
                renderItem={renderOrderCard}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffffff',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#eee',
        paddingHorizontal: 20,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    details: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    date: {
        fontSize: 12,
        color: '#888',
        marginVertical: 4,
    },
    price: {
        fontSize: 14,
        fontWeight: '500',
        color: '#222',
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
});
