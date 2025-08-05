/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from "../src/constants/colors";

const CustomHeader = ({ title, canGoBack }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const { i18n } = useTranslation();

    const changeLang = (lang) => {
        i18n.changeLanguage(lang);
    };
    const currentLang = i18n.language;
    return (
        <SafeAreaView edges={['top']} style={{ backgroundColor: '#ffffffff' }}>
            <View style={[
                styles.header,
                { paddingBottom: route.name === 'Dashboard' ? 0 : 20 }
            ]}>
                {route.name == 'Dashboard' && !canGoBack ? (<Text style={{ color: Colors.black, fontSize: 24, paddingTop: 4, fontWeight: '800', fontFamily: 'Poppins-Regular' }}>Interliner</Text>) : <TouchableOpacity
                    onPress={() => route?.name == 'TrackOrderScreen' ? navigation.navigate('Dashboard') : navigation.goBack()}
                    style={styles.backButton}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name="chevron-left" size={32} color='#000000' style={{ marginRight: 4 }} />
                        <Text style={{
                            color: Colors.black,
                            fontSize: 24,

                            paddingTop: 0,
                            fontWeight: '800',
                            fontFamily: 'Poppins-Regular'
                        }}>
                            {title}
                        </Text>
                    </View>
                </TouchableOpacity>
                }
                <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                    {/* <Icon name='notifications-active' size={30} color="#1E3A8A" />
                    <Icon name='contact-support' size={32} color="#1E3A8A" /> */}
                    <TouchableOpacity>
                        <Image
                            source={require('../../assets/images/user.jpg')}
                            style={{ width: 36, height: 36, alignSelf: 'center', borderRadius: 100 }}
                        />
                    </TouchableOpacity>
                </View>
                {/* )} */}
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 30,
        paddingBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
    },
    title: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    langBtn: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        fontFamily: 'Poppins-Regular',
    },

    langBtnActive: {
        backgroundColor: '#fff',
        color: '#6851a4',
    },


});

export default CustomHeader;
