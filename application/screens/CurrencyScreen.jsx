import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CurrencyScreen = () => {
    const [selectedCurrency, setSelectedCurrency] = useState('USD');

    const languageCurrencyMap = [
        { language: 'English (US)', currency: 'US Dollar', code: 'USD' },
        { language: 'Arabic', currency: 'Saudi Riyal', code: 'SAR' },
        { language: 'Hindi', currency: 'Indian Rupee', code: 'INR' },
        { language: 'French', currency: 'Euro', code: 'EUR' },
    ];

    const renderItem = (item) => (
        <TouchableOpacity
            style={styles.languageRow}
            onPress={() => setSelectedCurrency(item.code)}
        >
            <Text style={styles.languageText}>{item.code}</Text>
            <MaterialIcons
                name={selectedCurrency === item.code ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={22}
                color="#000"
            />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={languageCurrencyMap}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={(item) => item.code}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default CurrencyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    languageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    languageText: {
        fontSize: 18,
    },
});
