import React, { useContext } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { CurrencyContext } from "../context/CurrencyContext";

export default function CurrencyScreen() {
    const { currency, changeCurrency } = useContext(CurrencyContext);

    const currencyList = [
        { currency: "US Dollar", code: "USD", symbol: "$" },
        { currency: "Saudi Riyal", code: "SAR", symbol: "﷼" },
        { currency: "Indian Rupee", code: "INR", symbol: "₹" },
        { currency: "Euro", code: "EUR", symbol: "€" },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={currencyList}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => changeCurrency(item.symbol, item.currency, item.code)}
                    >
                        <Text style={styles.text}>{item.currency} ({item.symbol})</Text>
                        <MaterialIcons
                            name={currency === item.symbol ? "radio-button-checked" : "radio-button-unchecked"}
                            size={22}
                            color="#000"
                        />
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdfdfd', paddingHorizontal: 20
    },
    row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12 },
    text: { fontSize: 18 },
});
