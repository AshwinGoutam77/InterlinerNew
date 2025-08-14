import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CurrencyContext } from '../context/CurrencyContext';
import CustomerFilter from '../components/CustomerFilter';

export default function TrackOrderListingScreen({ navigation }) {
    const { currency } = useContext(CurrencyContext);
    return (
        <View style={styles.container}>
            {/* <CustomerFilter /> */}
            <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
                {/* Product Card */}
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TrackOrderScreen')} >
                    <Image
                        source={require('../../assets/images/kandura.png')}
                        style={styles.productImage}
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.productTitle}>Lawson Chair</Text>
                        <Text style={styles.productInfo}>● Off White | Qty = 1 | Cut | 36 Inch | 25 Meter</Text>
                        <Text style={styles.productPrice}>{currency}120.00</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TrackOrderScreen')} >
                    <Image
                        source={require('../../assets/images/kandura.png')}
                        style={styles.productImage}
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.productTitle}>Lawson Chair</Text>
                        <Text style={styles.productInfo}>● Off White | Qty = 1 | Cut | 36 Inch | 25 Meter</Text>
                        <Text style={styles.productPrice}>{currency} 120.00</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TrackOrderScreen')} >
                    <Image
                        source={require('../../assets/images/kandura.png')}
                        style={styles.productImage}
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.productTitle}>Lawson Chair</Text>
                        <Text style={styles.productInfo}>● Off White | Qty = 1 | Cut | 36 Inch | 25 Meter</Text>
                        <Text style={styles.productPrice}>{currency} 120.00</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TrackOrderScreen')} >
                    <Image
                        source={require('../../assets/images/kandura.png')}
                        style={styles.productImage}
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.productTitle}>Lawson Chair</Text>
                        <Text style={styles.productInfo}>● Off White | Qty = 1 | Cut | 36 Inch | 25 Meter</Text>
                        <Text style={styles.productPrice}>{currency} 120.00</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fdfdfd',
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
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        paddingVertical: 26,
        marginVertical: 10,
        marginHorizontal: 1,
        alignItems: 'center',
        shadowColor: '#ccc',
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 2,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#FAFAFA'
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
    iconsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        alignItems: 'center',
        marginBottom: 8
    },
    iconStep: {
        flex: 1,
        alignItems: 'center',
        position: 'relative'
    },
    stepIcon: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 6
    },
    dottedLine: {
        position: 'absolute',
        top: 13,
        right: -20,
        width: 40,
        height: 2,
        borderStyle: 'dotted',
        borderWidth: 1,
        borderColor: '#aaa'
    },
    deliveryText: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 20
    },
    divider: {
        borderBottomWidth: 1,
        borderColor: '#eee',
        marginBottom: 16
    },
    statusHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20
    },
    statusItem: {
        flexDirection: 'row',
        marginBottom: 20
    },
    statusIconContainer: {
        alignItems: 'center',
        marginRight: 10
    },
    circleOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#1E3A8A',
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#000'
    },
    verticalLine: {
        width: 2,
        flex: 1,
        backgroundColor: '#ccc',
        marginTop: 4
    },
    statusDetails: {
        flex: 1
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    statusTitle: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    statusTime: {
        fontSize: 12,
        color: '#555'
    },
    statusLocation: {
        fontSize: 13,
        color: '#777',
        marginTop: 4
    }
});
