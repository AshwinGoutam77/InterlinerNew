import React from 'react';
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

const categories = [
    { label: 'Collar', icon: require('../../assets/images/shirt-collar.png') },
    { label: 'Pocket', icon: require('../../assets/images/shirt-collar.png') },
    { label: 'Faduka', icon: require('../../assets/images/shirt-cuffs.png') },
    { label: 'Chest pieces', icon: require('../../assets/images/shirt-collar.png') },
];

const products = [
    {
        id: '1',
        name: '23666',
        price: '$28',
        image: require('../../assets/images/product-1.png'),
    },
    {
        id: '2',
        name: '3223H',
        price: '$12',
        image: require('../../assets/images/product-1.png'),
    },
    {
        id: '3',
        name: '2777',
        price: '$20',
        image: require('../../assets/images/product-1.png'),
    },
    {
        id: '4',
        name: '3093',
        price: '$15',
        image: require('../../assets/images/product-1.png'),
    },
];

const ProductsPage = () => {
    const navigation = useNavigation();
    const renderCategory = ({ item }) => (
        <TouchableOpacity style={styles.categoryItem}>
            <Image source={item.icon} style={styles.categoryImage} />
            <Text style={styles.categoryLabel}>{item.label}</Text>
        </TouchableOpacity>
    );

    const renderProduct = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetailScreen')}>
            <View style={styles.productCard}>
                <Image source={item.image} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>

            <Text style={styles.sectionTitle}>Related Categories</Text>
            <FlatList
                horizontal
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
            />

            <Text style={styles.sectionTitle}>Collar</Text>
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
        backgroundColor: '#fff',
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
        width: (width - 60) / 2,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingTop: 8,
    },
    productImage: {
        width: '100%',
        height: 160,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    productName: {
        fontSize: 18,
        marginTop: 8,
        color: '#000',
        fontWeight: '600',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1E3A8A',
    },
});


export default ProductsPage;
