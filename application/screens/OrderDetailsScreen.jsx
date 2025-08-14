import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Colors from '../src/constants/colors';

const OrderDetailsScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Order Info */}
            <View style={styles.card}>
                <Text style={styles.label}>
                    Order Number : <Text style={styles.bold}>#1245035000</Text>
                </Text>
                <View style={styles.statusRow}>
                    <Text style={styles.date}>01 Dec, 2022</Text>
                    <Text style={styles.completed}>• Completed</Text>
                </View>
            </View>

            {/* Shipping Details */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Shipping Details</Text>
                <Text style={styles.text}>
                    <Text style={styles.label}>Address: </Text>3501 Maloy Court, East Elmhurst, New York City, NY 11369
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.label}>Phone no: </Text>+91 635 546 23098
                </Text>
            </View>

            {/* Product */}
            <View style={styles.card}>
                <View style={styles.productRow}>
                    <View style={styles.productRow}>
                        <Image
                            source={require('../../assets/images/kandura.png')} // replace with your image
                            style={styles.productImage}
                        />
                        <View>
                            <Text style={styles.productTitle}>Kandura</Text>
                            <Text style={styles.qty}>Qty : 2</Text>
                        </View>
                    </View>
                    <Text style={styles.productPrice}>₹24940.16</Text>
                </View>

                {/* Price Breakdown */}
                <View style={styles.priceRow}>
                    <Text style={styles.text}>Sub Total</Text>
                    <Text style={styles.text}>₹24940.16</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.text}>Shipping charge</Text>
                    <Text style={styles.text}>₹1640.80</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.text}>Discount (10%)</Text>
                    <Text style={styles.text}>₹0.00</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.priceRow}>
                    <Text style={styles.total}>Total Amount</Text>
                    <Text style={styles.total}>₹26580.96</Text>
                </View>
            </View>

            {/* Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.downloadButton}>
                    <Text style={styles.downloadText}>Mark as Received</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.downloadButton}>
                    <Text style={styles.downloadText}>Download Invoice</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        backgroundColor: '#fdfdfd',
        height: '100%',
        paddingTop: 20
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        elevation: 1,
    },
    label: {
        fontWeight: '600',
        fontSize: 14,
        color: '#333',
    },
    bold: {
        fontWeight: '700',
        color: '#000',
    },
    date: {
        fontSize: 13,
        color: '#888',
    },
    completed: {
        fontSize: 13,
        color: 'green',
        fontWeight: '500',
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 8,
    },
    text: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    productImage: {
        width: 60,
        height: 60,
        marginRight: 12,
        resizeMode: 'contain',
    },
    productTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
    },
    qty: {
        fontSize: 13,
        color: '#888',
    },
    productPrice: {
        fontWeight: '600',
        fontSize: 14,
        color: '#000',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 2,
    },
    total: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
        marginVertical: 8,
    },
    downloadButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 8,
        alignItems: 'center',
        width: '48%'
    },
    downloadText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});