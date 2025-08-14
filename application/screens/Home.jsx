import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import RoleSelectorModal from './RoleSelectorModal';

export default function Home() {
    const [selectedRisk, setSelectedRisk] = useState(null);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const navigation = useNavigation();
    const { t } = useTranslation();

    const items = [t('home.step1'), t('home.step2'), t('home.step3')];

    useEffect(() => {
        const checkRole = async () => {
            const role = await AsyncStorage.getItem('userRole'); // <-- FIXED HERE
            if (!role) {
                setShowRoleModal(true); // first-time only
            } else if (role === 'patient') {
                Alert.alert(
                    'Disclaimer',
                    'This app is intended for physicians only.',
                    [{ text: 'OK' }]
                );
            }
        };
        checkRole();
    }, []);

    const handleSelectRole = async (role) => {
        await AsyncStorage.setItem('userRole', role);
        setShowRoleModal(false);

        if (role === 'patient') {
            Alert.alert(
                'Disclaimer',
                'This app is intended for physicians only.',
                [{ text: 'OK' }]
            );
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.subtitle}>{t('home.subtitle')}</Text>

                <Image
                    source={require('../../assets/images/banner.png')}
                    style={{ width: '100%', height: 240, alignSelf: 'center', borderRadius: 10 }}
                />

                <Text style={styles.sectionTitle}>{t('home.select_risk')}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.firstYearbutton}
                        onPress={() => {
                            setSelectedRisk('1-year');
                            navigation.navigate('PsA1YearRiskCalculator');
                        }}
                    >
                        <Text style={styles.buttonText}>{t('home.one_year')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.FiveYearbutton}
                        onPress={() => {
                            setSelectedRisk('5-year');
                            navigation.navigate('PsA5YearRiskCalculator');
                        }}
                    >
                        <Text style={styles.FiveYearbuttonText}>{t('home.five_year')}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.listHeading}>{t('home.how_to_use')}</Text>
                {items.map((item, index) => (
                    <View key={index} style={styles.listItem}>
                        <Text style={styles.bullet}>{'\u2022'}</Text>
                        <Text style={styles.itemText}>{item}</Text>
                    </View>
                ))}

                {/* Role selection modal */}
                <RoleSelectorModal
                    visible={showRoleModal}
                    onSelect={handleSelectRole}
                />
            </ScrollView>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdfdfd',
    },
    content: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#4B5563' },
    subtitle: { fontSize: 16, marginBottom: 20, fontFamily: 'Poppins-Regular' },
    sectionTitle: { fontSize: 18, marginTop: 20, fontWeight: '600' },
    email: { color: '#3B82F6', marginVertical: 5 },
    description: { marginTop: 10, fontSize: 16, lineHeight: 22 },
    bold: { fontWeight: 'bold', textDecorationLine: 'underline' },
    progress: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 2,
        backgroundColor: '#D1D5DB',
        marginHorizontal: 10,
    },
    buttonContainer: { flexDirection: 'row', gap: 8, marginVertical: 10 },
    firstYearbutton: {
        paddingVertical: 18,
        paddingHorizontal: 20,
        backgroundColor: '#e0ebeb',
        borderRadius: 5,
        width: '49%',
        textAlign: 'center',
        alignItems: 'center',
    },
    FiveYearbutton: {
        paddingVertical: 18,
        paddingHorizontal: 20,
        backgroundColor: '#f0c1e1',
        borderRadius: 5,
        width: '49%',
        textAlign: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#000000',
        fontWeight: '600',
        fontSize: 18, fontFamily: 'Poppins-Regular',
    },
    FiveYearbuttonText: {
        color: '#000000',
        fontWeight: '600',
        fontSize: 18, fontFamily: 'Poppins-Regular',
    },
    listContainer: {
        marginVertical: 16,
        paddingHorizontal: 20,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    bullet: {
        fontSize: 18,
        lineHeight: 24,
        marginRight: 8,
        color: '#000',
    },
    itemText: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        lineHeight: 24, fontFamily: 'Poppins-Regular',
    },
    listHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 20, fontFamily: 'Poppins-Regular',
    }
});
