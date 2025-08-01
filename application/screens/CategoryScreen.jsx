import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView,
    I18nManager,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const data = [
    {
        title: 'Shirts',
        banner: require('../../assets/images/shirt-banner.png'),
        items: [
            {
                label: 'Shirt collar',
                icon: require('../../assets/images/shirt-collar.png'),
            },
            {
                label: 'Shirt cuffs',
                icon: require('../../assets/images/shirt-cuffs.png'),
            },
            {
                label: 'Shirt placket',
                icon: require('../../assets/images/shirt-placket.png'),
            },
        ],

    },
    {
        title: 'Kandura',
        banner: require('../../assets/images/kandura.png'),
        items: [
            {
                label: 'Shirt collar',
                icon: require('../../assets/images/shirt-collar.png'),
            },
            {
                label: 'Shirt cuffs',
                icon: require('../../assets/images/shirt-cuffs.png'),
            },
            {
                label: 'Shirt placket',
                icon: require('../../assets/images/shirt-placket.png'),
            },
        ],
    },
    {
        title: 'Jackets',
        banner: require('../../assets/images/jackets.png'),
        items: [
            {
                label: 'Shirt collar',
                icon: require('../../assets/images/shirt-collar.png'),
            },
            {
                label: 'Shirt cuffs',
                icon: require('../../assets/images/shirt-cuffs.png'),
            },
            {
                label: 'Shirt placket',
                icon: require('../../assets/images/shirt-placket.png'),
            },
        ],
    },
    {
        title: 'Women’s Clothes',
        banner: require('../../assets/images/women-clothing.png'),
        items: [
            {
                label: 'Shirt collar',
                icon: require('../../assets/images/shirt-collar.png'),
            },
            {
                label: 'Shirt cuffs',
                icon: require('../../assets/images/shirt-cuffs.png'),
            },
            {
                label: 'Shirt placket',
                icon: require('../../assets/images/shirt-placket.png'),
            },
        ],
    },
];

const CategoryScreen = () => {
    const navigation = useNavigation();
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Categories</Text>
            <View style={styles.searchBox}>
                <TextInput
                    placeholder="Search Products..."
                    style={styles.input}
                    placeholderTextColor="#999"
                />
            </View>

            {data.map((section, idx) => (
                <View key={idx} style={styles.section}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    <Image
                        source={section.banner}
                        style={styles.banner}
                        resizeMode="cover"
                    />
                    <View style={styles.actionRow}>
                        {section.items.map((item, i) => (
                            <TouchableOpacity key={i} style={styles.actionItem} onPress={() => navigation.navigate('ProductsPage')}>
                                <Image
                                    source={item.icon}
                                    style={styles.icon}
                                />
                                <Text style={styles.label}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
        padding: 20,
        paddingBottom: 100,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    heading: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    searchBox: {
        backgroundColor: '#f1f1f19c',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 20,
        height: 50,
        justifyContent: 'center',
    },
    input: {
        fontSize: 16,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    banner: {
        width: '100%',
        height: 190,
        borderRadius: 10,
        marginBottom: 12,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'left',
        gap: 40,
    },
    actionItem: {
        alignItems: 'center',
    },
    icon: {
        width: 60,
        height: 60,
        borderRadius: 100,
        marginBottom: 6,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    label: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default CategoryScreen;
