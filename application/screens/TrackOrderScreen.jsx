import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

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

export default function TrackOrderScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 30 }}  showsVerticalScrollIndicator={false}>
                {/* Product Card */}
                <View style={styles.card}>
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

                {/* Delivery Steps Icons */}
                <View style={styles.iconsRow}>
                    {['cube', 'car', 'walk', 'gift'].map((icon, index) => (
                        <View key={index} style={styles.iconStep}>
                            <Icon
                                name={icon}
                                size={26}
                                color="#000"
                                style={styles.stepIcon}
                            />
                            {index < 3 && <View style={styles.dottedLine} />}
                        </View>
                    ))}
                </View>
                <Text style={styles.deliveryText}>Packet In Delivery</Text>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Order Status Details */}
                <Text style={styles.statusHeader}>Order Status Details</Text>

                {trackingSteps.map((step, index) => (
                    <View key={index} style={styles.statusItem}>
                        <View style={styles.statusIconContainer}>
                            <View style={styles.circleOuter}>
                                <View style={styles.circleInner} />
                            </View>
                            {index !== trackingSteps.length - 1 && (
                                <View style={styles.verticalLine} />
                            )}
                        </View>
                        <View style={styles.statusDetails}>
                            <View style={styles.statusRow}>
                                <Text style={styles.statusTitle}>
                                    {step.title} - {step.date}
                                </Text>
                                <Text style={styles.statusTime}>{step.time}</Text>
                            </View>
                            <Text style={styles.statusLocation}>{step.location}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fefefe',
        flex: 1,
        // paddingTop: 20,
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
        marginBottom: 20
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
