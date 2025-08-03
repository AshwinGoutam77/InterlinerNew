import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const orderData = [
    { id: '#2344', paid: 24, due: 2, total: 26 },
    { id: '#2344', paid: 24, due: 2, total: 26 },
    { id: '#2344', paid: 24, due: 2, total: 26 }
];

export default function HistoryScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                {orderData.map((order, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.orderRow}>
                            <Text style={styles.label}>Order</Text>
                            <Text style={styles.value}>{order.id}</Text>
                        </View>
                        <View style={styles.orderRow}>
                            <Text style={styles.label}>Amount Paid</Text>
                            <Text style={styles.value}>${order.paid.toFixed(2)}</Text>
                        </View>
                        <View style={styles.orderRow}>
                            <Text style={styles.label}>Amount Due</Text>
                            <Text style={styles.value}>${order.due.toFixed(2)}</Text>
                        </View>
                        <View style={styles.orderRow}>
                            <Text style={styles.label}>Total Amount</Text>
                            <Text style={styles.value}>${order.total.toFixed(2)}</Text>
                        </View>

                        <View style={styles.buttonGrid}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RaiseComplainScreen')}>
                                <Text style={styles.buttonText}>Raise a Complain</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TrackOrderScreen')}>
                                <Text style={styles.buttonText}>Track Order</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Pay Due Payments</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Mark as Received</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    scroll: {
        paddingHorizontal: 16,
        // marginBottom: 70
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
        color: '#333'
    },
    value: {
        fontSize: 15,
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
        marginVertical: 4
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
    }
});
