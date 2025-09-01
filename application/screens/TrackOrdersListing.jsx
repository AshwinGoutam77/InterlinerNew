/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    I18nManager,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { CurrencyContext } from '../context/CurrencyContext';
import CustomerFilter from '../components/CustomerFilter';
import { RoleContext } from '../context/RoleContext';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/RTLContext';
import Colors from '../src/constants/colors';
import GlobalStyles from '../src/constants/globalStyles';

export default function TrackOrderListingScreen({ navigation }) {
    const currency = '$'
    const { role } = useContext(RoleContext);
    const { t } = useTranslation();
    const { isRTL } = useAppContext();

    const orders = [
        { id: "1", number: "#223341", total: 120, customer: "Sarah Smith" },
        { id: "2", number: "#223342", total: 220, customer: "John Doe" },
        { id: "3", number: "#223343", total: 320, customer: "Emma Brown" },
        { id: "4", number: "#223344", total: 420, customer: "David Lee" },
        { id: "5", number: "#223345", total: 520, customer: "Sophia Johnson" },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.card,
                { flexDirection: isRTL ? "row-reverse" : "row" },
            ]}
            onPress={() => navigation.navigate("TrackOrderScreen", { orderId: item.id })}
        >
            <View style={[styles.row, { flexDirection: isRTL ? "row-reverse" : "row" },]}>
                <View style={styles.productImageContainer}>
                    <Image
                        source={require("../../assets/images/orders.png")}
                        style={styles.productImage}
                    />
                </View>
                <View>
                    <Text style={[styles.productTitle, { textAlign: isRTL ? 'right' : 'left' }]}>Order Number - {item.number}</Text>
                    <Text style={[styles.productPrice, { textAlign: isRTL ? 'right' : 'left' }]}>
                        Total - {currency}
                        {item.total}.00
                    </Text>
                    {role === "sales" && (
                        <Text style={[styles.productPrice, { textAlign: isRTL ? 'right' : 'left' }]}>
                            Customer Name - {item.customer}
                        </Text>
                    )}
                </View>
            </View>
            <TouchableOpacity>
                <Icon name={isRTL ? 'chevron-left' : 'chevron-right'} size={28} color={Colors.primary} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={GlobalStyles.container}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        borderColor: '#FAFAFA',
        gap: '10'
    },
    row: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        gap: 16
    },
    productImageContainer: {
        backgroundColor: Colors.primary,
        padding: 0,
        width: 50,
        height: 50,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImage: {
        width: 26,
        height: 26,
        borderRadius: 100,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
   
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
});
