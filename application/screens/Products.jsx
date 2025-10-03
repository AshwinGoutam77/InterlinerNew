/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
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
    ActivityIndicator,
} from 'react-native';
const { width } = Dimensions.get('window');
import { useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../src/constants/colors';
import { useAppContext } from '../context/RTLContext';
import GlobalStyles from '../src/constants/globalStyles';
import API from '../src/services/api';

const ProductsPage = () => {
    const route = useRoute();
    const currency = '$';
    const navigation = useNavigation();
    const { isRTL } = useAppContext();
    const { categoryId, subCategoryId, categoryName } = route.params;
    const [categoryData, setCategoryData] = useState(null);
    const [selectedChildId, setSelectedChildId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await API.getCategoriesById(categoryId);
                const data = res?.data?.data?.category;

                if (res.data?.status && data) {
                    setCategoryData(data);
                    // console.log(data);
                    setSelectedChildId(categoryName);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId, categoryName]);

    useEffect(() => {
        if (selectedChildId && categoryData) {
            const selectedChild = categoryData.children.find(c => c.name === selectedChildId);
            if (selectedChild) {
                navigation.setParams({ headerTitle: selectedChild.name });
            }
        }
    }, [selectedChildId, categoryData, navigation]);

    const renderCategory = ({ item }) => (
        <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => setSelectedChildId(item.name)}
        >
            <Image
                source={{ uri: item.photo }}
                style={[
                    styles.categoryImage,
                    { borderWidth: item.name === selectedChildId ? 3 : 0, borderColor: Colors.primary }
                ]}
            />
            <Text
                style={[
                    styles.categoryLabel,
                    { color: item.name === selectedChildId ? Colors.primary : '#000', textAlign: isRTL ? 'right' : 'left' }
                ]}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    const renderProduct = ({ item }) => {
        const photos = JSON.parse(item.photo ?? '[]');
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetailScreen', { productId: item.encrypted_id })}>
                <View style={styles.productCard}>
                    <Image source={{ uri: photos[0] }} style={styles.productImage} />
                    <View style={styles.productDescription}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <View style={[styles.row]}>
                            <Text style={[styles.productPrice, { textDecorationLine: "line-through", color: "#888", fontSize: 14 }]}>
                                {currency}{item.price}
                            </Text>

                            <Text style={[styles.productPrice, { color: Colors.primary }]}>
                                {currency}
                                {item.discount_type === 1
                                    ? (item.price - item.discount).toFixed(2)
                                    : (item.price - (item.price * item.discount / 100)).toFixed(2)
                                }
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const filteredProducts = categoryData?.children?.find(c => c.name === selectedChildId)?.groups ?? [];

    if (loading) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fdfdfd" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
    </View>;
    return (
        <ScrollView style={[GlobalStyles.container, { paddingTop: 20 }]}>
            <FlatList
                horizontal
                inverted={isRTL}
                data={categoryData?.children ?? []}
                renderItem={renderCategory}
                keyExtractor={(item, index) => item.name ?? index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
            />

            <FlatList
                data={filteredProducts}
                renderItem={renderProduct}
                keyExtractor={(item, index) => item.name ?? index.toString()}
                numColumns={2}
                columnWrapperStyle={[
                    styles.columnWrapper,
                    { flexDirection: isRTL ? 'row-reverse' : 'row' }
                ]}
                contentContainerStyle={styles.productList}
                scrollEnabled={false}
            />
        </ScrollView>
    );
};



const styles = StyleSheet.create({
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
        marginTop: 10,
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
        shadowOpacity: 1,
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    productPrice: {
        fontSize: 14,
        fontWeight: '800',
        color: Colors.black,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
});

export default ProductsPage;
