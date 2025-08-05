import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, I18nManager } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../src/constants/colors';

const EditProfileScreen = () => {
    const navigation = useNavigation();
    const [dob, setDob] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const isRTL = I18nManager.isRTL;

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) setDob(selectedDate.toDateString());
    };

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.profileContainer}>
                <Image
                    source={require('../../assets/images/user.jpg')}
                    style={styles.profileImage}
                />
                <TouchableOpacity style={styles.editIcon}>
                    <Icon name="edit" size={16} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Form */}
            <View style={styles.form}>
                <TextInput placeholder="Full Name" style={styles.input} placeholderTextColor="#999" />

                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputRow}>
                    <Text style={styles.dateText}>{dob || 'Date of Birth'}</Text>
                    <Icon name="calendar-today" size={20} color="#888" />
                </TouchableOpacity>
                {/* {showDatePicker && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="default"
                        onChange={onDateChange}
                    />
                )} */}

                <View style={styles.inputRow}>
                    <TextInput placeholder="Email" style={styles.inputField} placeholderTextColor="#999" keyboardType="email-address" />
                    <Icon name="mail-outline" size={20} color="#888" />
                </View>

                <View style={styles.inputRow}>
                    <Image source={{ uri: 'https://flagcdn.com/w320/us.png' }} style={styles.flag} />
                    <TextInput placeholder="Phone Number" style={styles.inputField} keyboardType="phone-pad" placeholderTextColor="#999" />
                </View>

                <View style={styles.inputRow}>
                    <TextInput placeholder="Gender" style={styles.inputField} placeholderTextColor="#999" />
                    <Icon name="arrow-drop-down" size={24} color="#888" />
                </View>
            </View>

            {/* Continue Button */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfileScreen')}>
                <Text style={styles.buttonText}>Save Details</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 12,
        color: '#000',
    },
    profileContainer: {
        alignSelf: 'center',
        position: 'relative',
        marginBottom: 30,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#eee',
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#000',
        padding: 6,
        borderRadius: 12,
    },
    form: {
        gap: 16,
    },
    input: {
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        padding: 16,
        fontSize: 16,
        color: '#000',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        paddingHorizontal: 16,
        height: 56,
        justifyContent: 'space-between',
    },
    inputField: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    dateText: {
        fontSize: 16,
        color: '#888',
    },
    flag: {
        width: 24,
        height: 18,
        marginRight: 12,
    },
    button: {
        backgroundColor: Colors.primary,
        marginTop: 30,
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
