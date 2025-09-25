/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { CurrencyContext } from '../context/CurrencyContext';
import { useAppContext } from '../context/RTLContext';
import { RoleContext } from '../context/RoleContext';
import CustomerFilter from '../components/CustomerFilter';
import GlobalStyles from '../src/constants/globalStyles';
// import CustomerFilter from '../components/CustomerFilter';

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
                label: 'collar',
                icon: require('../../assets/images/shirt-collar.png'),
            },
            {
                label: 'cuffs',
                icon: require('../../assets/images/shirt-cuffs.png'),
            },
            {
                label: 'placket',
                icon: require('../../assets/images/shirt-placket.png'),
            },
            {
                label: 'pocket',
                icon: require('../../assets/images/shirt-placket.png'),
            },
            {
                label: 'faruka',
                icon: require('../../assets/images/shirt-placket.png'),
            },
        ],
    },
    {
        title: 'Trousers',
        banner: require('../../assets/images/kandura.png'),
        items: [
            {
                label: 'waist',
                icon: require('../../assets/images/shirt-collar.png'),
            },
            {
                label: 'pocketing',
                icon: require('../../assets/images/shirt-cuffs.png'),
            },
        ],
    },
    {
        title: 'Jackets Blazer',
        banner: require('../../assets/images/jackets.png'),
        items: [
            {
                label: 'Articles',
                icon: require('../../assets/images/shirt-collar.png'),
            },
            {
                label: 'essentials',
                icon: require('../../assets/images/shirt-cuffs.png'),
            },
        ],
    },
    {
        title: 'Women’s Clothes',
        banner: require('../../assets/images/women-clothing.png'),
        items: [
            {
                label: 'Dresses',
                icon: require('../../assets/images/shirt-collar.png'),
            },
            {
                label: 'Shirt',
                icon: require('../../assets/images/shirt-cuffs.png'),
            },
            {
                label: 'Jackets',
                icon: require('../../assets/images/shirt-placket.png'),
            },
            {
                label: 'Skirts ',
                icon: require('../../assets/images/shirt-placket.png'),
            },
        ],
    },
    {
        title: 'T-Shirt & Hoodies',
        banner: require('../../assets/images/t-shirts-and-hoodies.jpg'),
        items: [],
    },
    {
        title: 'Non-woven',
        banner: require('../../assets/images/non-woven.jpg'),
        items: [],
    },
];

const CategoryScreen = () => {
    const { t } = useTranslation();
    const { isRTL } = useAppContext();
    const navigation = useNavigation();
    const { role } = useContext(RoleContext);

    return (
        <ScrollView style={styles.container}>
            {role == 'sales' && <CustomerFilter show />}
            <View style={[
                styles.searchBox,
                { flexDirection: isRTL ? 'row-reverse' : 'row' }
            ]}>
                <Icon name='search' size={24} color='#999' />
                <TextInput
                    placeholder={t('category.search_placeholder')}
                    style={[styles.input, { textAlign: isRTL ? 'right' : 'left' }]}
                    placeholderTextColor="#999"
                />
            </View>

            {data.map((section, idx) => (
                <View key={idx} style={styles.section}>
                    <Text style={[
                        styles.sectionTitle,
                        { textAlign: isRTL ? 'right' : 'left' }
                    ]}>
                        {t(`category.categories.${section.title}`)}
                    </Text>

                    <Image
                        source={section.banner}
                        style={styles.banner}
                        resizeMode="cover"
                    />

                    <View style={[
                        styles.actionRow,
                        { flexDirection: isRTL ? 'row-reverse' : 'row' }
                    ]}>
                        {section.items.map((item, i) => (
                            <TouchableOpacity
                                key={i}
                                style={styles.actionItem}
                                onPress={() => navigation.navigate('ProductsPage')}
                            >
                                <Image
                                    source={item.icon}
                                    style={styles.icon}
                                />
                                <Text style={[
                                    styles.label,
                                    { textAlign: isRTL ? 'right' : 'center' }
                                ]}>
                                    {t(`category.categories.${item.label}`)}
                                </Text>
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
        flex: 1,
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 20
    },
    searchBox: {
        backgroundColor: '#f1f1f19c',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 20,
        height: 50,
        alignItems: 'center',
        marginTop: 20,
        gap: 10,
    },
    input: {
        fontSize: 16,
        flex: 1,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    banner: {
        width: '100%',
        height: 190,
        borderRadius: 10,
        marginBottom: 12,
    },
    actionRow: {
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: 40,
        rowGap: 20,
        borderBottomWidth: 1,
        borderColor: '#0000003d',
        paddingBottom: 30
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
    },
});

export default CategoryScreen;
