import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../src/constants/colors';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [userType, setUserType] = useState('individual');
    const [form, setForm] = useState({
        companyName: '',
        userName: '',
        phone: '',
        email: '',
        password: '',
        address: '',
        trn: '',
    });

    const handleInputChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleRegister = () => {
        // handle form submit
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
            keyboardVerticalOffset={80}
        >
            <ScrollView
                contentContainerStyle={[styles.container, { flexGrow: 1, paddingBottom: 40 }]}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/images/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.title}>Register to Your Account</Text>

                {/* Toggle: Individual / Company */}
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[styles.toggleButton, userType === 'individual' && styles.selectedButton]}
                        onPress={() => setUserType('individual')}
                    >
                        <Text style={[styles.toggleText, userType === 'individual' && styles.selectedText]}>
                            Individual
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleButton, userType === 'company' && styles.selectedButton]}
                        onPress={() => setUserType('company')}
                    >
                        <Text style={[styles.toggleText, userType === 'company' && styles.selectedText]}>
                            Company
                        </Text>
                    </TouchableOpacity>
                </View>

                {userType === 'company' && (
                    <TextInput
                        style={styles.input}
                        placeholder="Company Name"
                        value={form.companyName}
                        onChangeText={(text) => handleInputChange('companyName', text)}
                    />
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={form.userName}
                    onChangeText={(text) => handleInputChange('userName', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    value={form.phone}
                    onChangeText={(text) => handleInputChange('phone', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={form.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={form.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    secureTextEntry
                    value={form.password}
                    onChangeText={(text) => handleInputChange('address', text)}
                />

                {userType === 'company' && (
                    <TextInput
                        style={styles.input}
                        placeholder="TRN Number"
                        value={form.trn}
                        onChangeText={(text) => handleInputChange('trn', text)}
                    />
                )}

                <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('MainApp')}>
                    <Text style={styles.registerText}>Register</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.signUpText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fdfdfd',
        padding: 24,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        margin: 'auto'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 24,
        gap: 10,
    },
    toggleButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    selectedButton: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    toggleText: {
        color: '#000',
    },
    selectedText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#f8f8f8',
        padding: 14,
        borderRadius: 8,
        marginBottom: 14,
    },
    registerButton: {
        backgroundColor: Colors.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    registerText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16
    },
    footerText: {
        fontSize: 13,
        color: '#555',
    },
    signUpText: {
        fontSize: 13,
        color: '#000',
        fontWeight: '600',
    },
});
