import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../src/constants/colors';

const AddNewAddressScreen = () => {
    const navigation = useNavigation();
    const [label, setLabel] = useState('');
    const [address, setAddress] = useState('');

    const handleSave = () => {
        if (!label || !address) return;
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View>
                    <Text style={styles.label}>Address Name</Text>
                    <TextInput
                        placeholder=""
                        value={label}
                        onChangeText={setLabel}
                        style={styles.input}
                    />
                </View>
                <Text style={styles.label}>Address Line 1 (street, house/building no.)</Text>
                <TextInput
                    placeholder=""
                    value={label}
                    onChangeText={setLabel}
                    style={styles.input}
                />
                <Text style={styles.label}>Address Line 2</Text>
                <TextInput
                    placeholder=""
                    value={label}
                    onChangeText={setLabel}
                    style={styles.input}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '48%' }}>
                        <Text style={styles.label}>City</Text>
                        <TextInput
                            placeholder=""
                            value={label}
                            onChangeText={setLabel}
                            style={styles.input}
                        />
                    </View>
                    <View style={{ width: '48%' }}>
                        <Text style={styles.label}>State / Region</Text>
                        <TextInput
                            placeholder=""
                            value={label}
                            onChangeText={setLabel}
                            style={styles.input}
                        />
                    </View>
                </View>

                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '48%' }}>
                        <Text style={styles.label}>Postal / Zip Code</Text>
                        <TextInput
                            placeholder=""
                            value={label}
                            onChangeText={setLabel}
                            style={styles.input}
                        />
                    </View>
                    <View style={{ width: '48%' }}>
                        <Text style={styles.label}>Country</Text>
                        <TextInput
                            placeholder=""
                            value={label}
                            onChangeText={setLabel}
                            style={styles.input}
                        />
                    </View>
                </View> */}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderColor: '#ddd', paddingTop: 20 }}>
                    <View style={{ width: '48%' }}>
                        <Text style={styles.label}>Address Name</Text>
                        <TextInput
                            placeholder=""
                            value={label}
                            onChangeText={setLabel}
                            style={styles.input}
                        />
                    </View>
                    <View style={{ width: '48%' }}>
                        <Text style={styles.label}>Contact Number</Text>
                        <TextInput
                            placeholder=""
                            value={label}
                            onChangeText={setLabel}
                            style={styles.input}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.navigate('ShippingScreen')}>
                    <Text style={styles.saveText}>Save Address</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddNewAddressScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fdfdfd',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        marginBottom: 6,
        fontWeight: '400',
        color: '#474646ff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 16,
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
        color: '#000000ff',
        fontSize: 16,
        fontWeight: '600',
    },
});
