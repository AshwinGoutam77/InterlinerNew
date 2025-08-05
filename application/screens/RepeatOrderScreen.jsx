import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../src/constants/colors';

const trackingSteps = [
    {
        title: 'Order In Transit',
        date: 'Dec 17',
        time: '15:20 PM',
        location: '32 Manchester Ave. Ringgold, GA 30736',
    },
    {
        title: 'Order ... Customs Port',
        date: 'Dec 16',
        time: '14:40 PM',
        location: '4 Evergreen Street Lake Zurich, IL 60047',
    },
    {
        title: 'Orders are ... Shipped',
        date: 'Dec 15',
        time: '11:30 AM',
        location: '9177 Hillcrest Street Wheeling, WV 26003',
    },
    {
        title: 'Order is in Packing',
        date: 'Dec 15',
        time: '10:25 AM',
        location: '891 Glen Ridge St. Gainesville, VA 20155',
    },
    {
        title: 'Verified Payments',
        date: 'Dec 15',
        time: '10:04 AM',
        location: '55 Summerhouse Dr. Apopka, FL 32703',
    },
];

export default function RepeatOrderScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
                {/* Product Card */}
                <View style={styles.card} >
                    <View style={styles.repeatOrderBox}>
                        <Image
                            source={require('../../assets/images/kandura.png')}
                            style={styles.productImage}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.productTitle}>Lawson Chair</Text>
                            <Text style={styles.productInfo}>● Blue Grey   |   Qty = 1</Text>
                            <Text style={styles.productPrice}>$120.00</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.repeatOrderBtn} onPress={() => navigation.navigate('CartScreen')}>
                        <Text style={styles.repeatOrderBtnText}>Repeat Order</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.card} >
                    <View style={styles.repeatOrderBox}>
                        <Image
                            source={require('../../assets/images/kandura.png')}
                            style={styles.productImage}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.productTitle}>Lawson Chair</Text>
                            <Text style={styles.productInfo}>● Blue Grey   |   Qty = 1</Text>
                            <Text style={styles.productPrice}>$120.00</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.repeatOrderBtn}>
                        <Text style={styles.repeatOrderBtnText}>Repeat Order</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.card} >
                    <View style={styles.repeatOrderBox}>
                        <Image
                            source={require('../../assets/images/kandura.png')}
                            style={styles.productImage}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.productTitle}>Lawson Chair</Text>
                            <Text style={styles.productInfo}>● Blue Grey   |   Qty = 1</Text>
                            <Text style={styles.productPrice}>$120.00</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.repeatOrderBtn}>
                        <Text style={styles.repeatOrderBtnText}>Repeat Order</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fefefe',
        flex: 1,
        paddingHorizontal: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        paddingVertical: 26,
        marginVertical: 10,
        marginHorizontal: 1,
        shadowColor: '#ccc',
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 2,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#FAFAFA'
    },
    repeatOrderBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 12,
        borderRadius: 8
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    productInfo: {
        fontSize: 14,
        color: '#666',
        marginVertical: 4
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    repeatOrderBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        width: '45%',
    },
    repeatOrderBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
        margin: 'auto'
    },
});
