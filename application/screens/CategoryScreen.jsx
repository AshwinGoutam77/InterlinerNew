import React, { useContext } from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { CurrencyContext } from '../context/CurrencyContext';
import CustomerFilter from '../components/CustomerFilter';

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
    const { currency } = useContext(CurrencyContext);
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* <CustomerFilter show /> */}
            <View style={styles.searchBox}>
                <Icon name='search' size={24} color='#999' />
                <TextInput
                    placeholder={t('category.search_placeholder')}
                    style={styles.input}
                    placeholderTextColor="#999"
                />
            </View>

            {data.map((section, idx) => (
                <View key={idx} style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        {t(`category.categories.${section.title}`)}
                    </Text>
                    <Image
                        source={section.banner}
                        style={styles.banner}
                        resizeMode="cover"
                    />
                    <View style={styles.actionRow}>
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
                                <Text style={styles.label}>
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
        paddingTop: 20,
        padding: 20,
        // paddingBottom: 100,
        backgroundColor: '#fdfdfd',
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
        justifyContent: 'start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10',
        marginTop: 12,
    },
    input: {
        fontSize: 16,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    section: {
        marginBottom: 30,
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
        flexWrap: 'wrap',
        justifyContent: 'left',
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
        textAlign: 'center',
    },
});

export default CategoryScreen;
