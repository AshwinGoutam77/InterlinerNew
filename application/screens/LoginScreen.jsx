import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
    ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../src/constants/colors';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <ImageBackground
            source={require('../../assets/images/login-banner.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <LinearGradient
                colors={[
                    'rgba(226, 226, 226, 1)',
                    'rgba(183, 224, 255, 0.3)',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.container}
            >
                {/* <View style={styles.overlay} /> */}
                <SafeAreaView style={styles.container}>
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <Image
                        source={require('../../assets/images/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                        {/* <Image
                            source={require('../../assets/images/login-banner.png')}
                            style={styles.loginBanner}
                            resizeMode="contain"
                        /> */}
                        {/* <Text style={styles.heading}>Interliners</Text> */}
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>Login to Your Account</Text>

                    {/* Email Input */}
                    <View style={styles.inputWrapper}>
                        <Icon name="call-outline" size={20} color="#aaa" style={styles.inputIcon} />
                        <TextInput
                            placeholder="Phone Number"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputWrapper}>
                        <Icon name="lock-closed-outline" size={20} color="#aaa" style={styles.inputIcon} />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Icon name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#aaa" />
                        </TouchableOpacity>
                    </View>

                    {/* Remember Me */}
                    {/* <View style={styles.rememberRow}>
                <CheckBox
                    value={remember}
                    onValueChange={setRemember}
                    tintColors={{ true: '#000', false: '#aaa' }}
                />
                <Text style={styles.rememberText}>Remember me</Text>
            </View> */}

                    {/* Sign In Button */}
                    <TouchableOpacity style={styles.signInBtn} onPress={() => navigation.navigate('MainApp')}>
                        <Text style={styles.signInText}>Sign in</Text>
                    </TouchableOpacity>

                    {/* Forgot Password */}
                    <TouchableOpacity>
                        <Text style={styles.forgot}>Forgot the password?</Text>
                    </TouchableOpacity>

                    {/* Signup Prompt */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don’t have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.signUpText}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </ImageBackground>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust opacity here
    },
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        padding: 24,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    backBtn: {
        marginBottom: 12,
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 12,
    },
    logo: {
        width: 200,
        height: 200,
    },
    loginBanner: {
        width: 350,
        height: 200,
        borderRadius: 5,
        objectFit: 'cover',
    },
    heading: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '500',
        color: '#000',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        marginVertical: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 14,
    },
    inputIcon: {
        marginRight: 8,
        width: 20,
        height: 20,
    },
    input: {
        flex: 1,
        color: '#000',
        fontSize: 14,
    },
    rememberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    rememberText: {
        fontSize: 14,
        color: '#000',
        marginLeft: 8,
    },
    signInBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 18,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    signInText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    forgot: {
        textAlign: 'center',
        color: '#000',
        fontSize: 13,
        marginBottom: 20,
    },
    orRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    orText: {
        marginHorizontal: 8,
        color: '#888',
        fontSize: 13,
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },
    socialIcon: {
        width: 44,
        height: 44,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
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
