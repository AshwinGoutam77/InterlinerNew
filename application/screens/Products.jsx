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
} from 'react-native';

const { width } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import Colors from '../src/constants/colors';
import { CurrencyContext } from '../context/CurrencyContext';

const categories = [
    { id: '1', label: 'Collar', icon: require('../../assets/images/shirt-collar.png') },
    { id: '2', label: 'Pocket', icon: require('../../assets/images/shirt-collar.png') },
    { id: '3', label: 'Faduka', icon: require('../../assets/images/shirt-cuffs.png') },
    { id: '4', label: 'Chest pieces', icon: require('../../assets/images/shirt-collar.png') },
];

const products = [
    {
        id: '1',
        name: '23666',
        description: 'Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.',
        price: '28',
        image: require('../../assets/images/product-1.png'),
    },
    {
        id: '2',
        name: '3223H',
        description: 'Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.',
        price: '12',
        image: require('../../assets/images/product-1.png'),
    },
    {
        id: '3',
        name: '2777',
        description: 'Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.',
        price: '20',
        image: require('../../assets/images/product-1.png'),
    },
    {
        id: '4',
        name: '3093',
        description: 'Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.',
        price: '15',
        image: require('../../assets/images/product-1.png'),
    },
    {
        id: '5',
        name: '23666',
        description: 'Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.',
        price: '28',
        image: require('../../assets/images/product-1.png'),
    },
    {
        id: '6',
        name: '3223H',
        description: 'Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.',
        price: '12',
        image: require('../../assets/images/product-1.png'),
    },
    {
        id: '7',
        name: '2777',
        description: 'Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.',
        price: '20',
        image: require('../../assets/images/product-1.png'),
    },
    {
        id: '8',
        name: '3093',
        description: 'Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.',
        price: '15',
        image: require('../../assets/images/product-1.png'),
    },
];

const ProductsPage = () => {
    const { currency } = useContext(CurrencyContext);
    const navigation = useNavigation();
    const renderCategory = ({ item }) => (
        <TouchableOpacity style={styles.categoryItem}>
            <Image
                source={item.icon}
                style={[
                    styles.categoryImage,
                    { borderWidth: item?.id == 1 ? 2 : 0, borderColor: Colors.primary }
                ]}
            />

            <Text style={[styles.categoryLabel, { color: item?.id == 1 ? Colors.primary : "#000000" }]}>{item.label}</Text>
        </TouchableOpacity>
    );

    const renderProduct = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetailScreen')}>
            <View style={styles.productCard}>
                <Image source={item.image} style={styles.productImage} />
                <View style={styles.productDescription}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>{currency} {item.price}</Text>
                </View>
                {/* <Text style={styles.productDescription}>{item.description}</Text> */}
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <FlatList
                horizontal
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
            />

            {/* <Text style={styles.sectionTitle}>Collar</Text> */}
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
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
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
        marginBottom: 12,
    },
    categoryList: {
        marginBottom: 24,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 30,
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
        borderRadius: 12,
        padding: 10,
        paddingVertical: 12,
        elevation: 1
    },
    productImage: {
        width: '100%',
        height: 160,
        borderRadius: 10,
        resizeMode: 'cover',
        marginBottom: 10
    },
    productName: {
        fontSize: 16,
        color: '#000',
        fontWeight: '600',
    },
    productDescription: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '800',
        color: Colors.black,
    },
});


export default ProductsPage;
