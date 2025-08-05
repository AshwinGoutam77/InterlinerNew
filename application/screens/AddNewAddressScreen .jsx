import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../src/constants/colors';

const AddNewAddressScreen = () => {
    const navigation = useNavigation();
    const [label, setLabel] = useState('');
    const [address, setAddress] = useState('');

    const handleSave = () => {
        if (!label || !address) return;
        // Here you would normally send this data to your backend or context
        navigation.goBack(); // Return to previous screen
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Add New Address</Text>

            <Text style={styles.label}>Label</Text>
            <TextInput
                placeholder="e.g. Home, Office"
                value={label}
                onChangeText={setLabel}
                style={styles.input}
            />

            <Text style={styles.label}>Full Address</Text>
            <TextInput
                placeholder="Enter complete address"
                value={address}
                onChangeText={setAddress}
                style={[styles.textarea, { height: 100 }]}
                multiline
            />

            <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.navigate('ShippingScreen')}>
                <Text style={styles.saveText}>Save Address</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default AddNewAddressScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        marginBottom: 6,
        fontWeight: '600',
        color: '#474646ff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 18,
        marginBottom: 20,
        backgroundColor: '#ffffffff',
        fontSize: 15,
    },
    textarea: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 20,
        backgroundColor: '#ffffffff',
        fontSize: 15,
        flexDirection: 'column',
        textAlignVertical: 'top',
    },
    saveBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 'auto',
    },
    saveText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
