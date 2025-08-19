/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    I18nManager,
} from 'react-native';

const { width } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import Colors from '../src/constants/colors';
import { CurrencyContext } from '../context/CurrencyContext';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/RTLContext';

const categories = [
    { id: '1', label: 'Collar', icon: require('../../assets/images/shirt-collar.png') },
    { id: '2', label: 'Pocket', icon: require('../../assets/images/shirt-collar.png') },
    { id: '3', label: 'Faduka', icon: require('../../assets/images/shirt-cuffs.png') },
    { id: '4', label: 'Chest pieces', icon: require('../../assets/images/shirt-collar.png') },
    { id: '5', label: 'Pre-cut collars', icon: require('../../assets/images/shirt-collar.png') },
];

const products = [
    { id: '1', title: 'PANTONE', name: '23666', price: '28', image: require('../../assets/images/product-1.png') },
    { id: '2', title: 'PANTONE', name: '3223H', price: '12', image: require('../../assets/images/product-1.png') },
    { id: '3', title: 'PANTONE', name: '2777', price: '20', image: require('../../assets/images/product-1.png') },
    { id: '4', title: 'PANTONE', name: '3093', price: '15', image: require('../../assets/images/product-1.png') },
    { id: '5', title: 'PANTONE', name: '23666', price: '28', image: require('../../assets/images/product-1.png') },
    { id: '6', title: 'PANTONE', name: '3223H', price: '12', image: require('../../assets/images/product-1.png') },
    { id: '7', title: 'PANTONE', name: '2777', price: '20', image: require('../../assets/images/product-1.png') },
    { id: '8', title: 'PANTONE', name: '3093', price: '15', image: require('../../assets/images/product-1.png') },
];

const ProductsPage = () => {
    const currency = '$'
    const navigation = useNavigation();
    const { t } = useTranslation();
    const { isRTL } = useAppContext();

    const renderCategory = ({ item }) => (
        <TouchableOpacity style={styles.categoryItem}>
            <Image
                source={item.icon}
                style={[
                    styles.categoryImage,
                    { borderWidth: item?.id == 1 ? 2 : 0, borderColor: Colors.primary }
                ]}
            />
            <Text
                style={[
                    styles.categoryLabel,
                    {
                        color: item?.id == 1 ? Colors.primary : "#000000",
                        textAlign: isRTL ? 'right' : 'left'
                    }
                ]}
            >
                {item.label}
            </Text>
        </TouchableOpacity>
    );

    const renderProduct = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetailScreen')}>
            <View style={styles.productCard}>
                <Image source={item.image} style={styles.productImage} />
                <View style={[styles.productDescription]}>
                    <Text style={styles.productName}>{item.title}</Text>
                    <Text style={styles.productSubName}>{item.name}</Text>
                    <Text style={styles.productPrice}>{currency} {item.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <FlatList
                horizontal
                inverted={I18nManager.isRTL}
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
            />

            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={[
                    styles.columnWrapper,
                    { flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }
                ]}
                contentContainerStyle={styles.productList}
                scrollEnabled={false}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fdfdfd',
    },
    backText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
        marginVertical: 16,
        textAlign: I18nManager.isRTL ? 'right' : 'left'
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
        marginBottom: 12,
        textAlign: I18nManager.isRTL ? 'right' : 'left'
    },
    categoryList: {
        marginBottom: 24,
    },
    categoryItem: {
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 10
    },
    categoryImage: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#F3F3F3',
        marginBottom: 6,
    },
    categoryLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    productList: {
        paddingBottom: 100,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    productCard: {
        width: (width - 50) / 2,
        backgroundColor: '#fff',
        borderRadius: 0,
        padding: 10,
        paddingVertical: 12,
        elevation: 2,
        shadowColor: '#dadadaff',
        shadowOpacity: 1
    },
    productImage: {
        width: '100%',
        height: 160,
        borderRadius: 0,
        resizeMode: 'cover',
        marginBottom: 10
    },
    productName: {
        fontSize: 16,
        color: '#000',
        fontWeight: '600',
        textAlign: I18nManager.isRTL ? 'right' : 'left'
    },
    productSubName: {
        fontSize: 14,
        color: '#000',
        fontWeight: '600',
        textAlign: I18nManager.isRTL ? 'right' : 'left'
    },
    productDescription: {
        // flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        alignItems: 'left',
        justifyContent: 'start',
        paddingHorizontal: 5
    },
    productPrice: {
        fontSize: 14,
        fontWeight: '800',
        color: Colors.black,
    },
});

export default ProductsPage;
