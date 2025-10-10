/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    I18nManager,
    ActivityIndicator,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../src/constants/colors';
import { CurrencyContext } from '../context/CurrencyContext';
import AddItemsModal from '../modals/AddItemsModal';
import { Modal, Portal, Button } from "react-native-paper";
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/RTLContext';
import GlobalStyles from '../src/constants/globalStyles';
import API from '../src/services/api';
import { useQuery } from '@tanstack/react-query';

const shades = ['White', 'Off White', 'Blue White', 'Cream'];
const widths = ['36 Inch', '44 Inch', '60 Inch'];
const lengths = ['25 Mtr', '50 Mtr', '100 Mtr'];

export default function ProductDetailScreen() {
    const route = useRoute();
    const { productId } = route.params;
    const { t } = useTranslation();
    const { isRTL } = useAppContext();
    const navigation = useNavigation();
    const currency = '$'
    const [selectedShade, setSelectedShade] = useState('White');
    const [isCut, setIsCut] = useState(false);
    const [selectedWidth, setSelectedWidth] = useState('36 Inch');
    const [selectedLength, setSelectedLength] = useState('25 Mtr');
    const [rolls, setRolls] = useState('2');
    const [remark, setRemark] = useState('');
    const [selectedProductCode, setSelectedProductCode] = useState('23666');
    const [selectedOption, setSelectedOption] = useState('none');
    const [Visible, setVisible] = useState(false)
    const [step, setStep] = useState(1);
    const [cutRollsCount, setCutRollsCount] = useState('');
    const [Loading, setLoading] = useState(true);
    // const [productData, setProductData] = useState('')
    const [Product_Child, setProduct_Child] = useState('')
    const [ProductId, setProductId] = useState('')
    const [ShadeId, setShadeId] = useState('')

    const { data: productData, isLoading, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => {
            const res = await API.getGroups(productId);
            return res.data?.data?.group;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes cache
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        console.log(productData);

        if (productData) {
            setSelectedProductCode(productData.name);
            if (productData.children?.length > 0) {
                setSelectedShade(productData.children[0].name);
                setProduct_Child(productData.children[0].items);
                setShadeId(productData.children[0].encrypted_id)
            }
            navigation.setParams({ headerTitle: productData.name });
            setLoading(false);
        }
    }, [productData, navigation]);


    useEffect(() => {
        if (productId) {
            navigation.setParams({ headerTitle: productData?.name });
        }
    }, [productId, navigation, productData?.name]);

    const inchesList = ["1.5 Inch", "2 Inch", "2.5 Inch", "3 Inch", "3.5 Inch", "4 Inch", "4.5 Inch", "5 Inch", "5.5 Inch", "6 Inch", "6.5 Inch", "7 Inch", "7.5 Inch", "8 Inch"];
    const [cutRollsVisible, setCutRollsVisible] = useState(false);
    const [inchQuantities, setInchQuantities] = useState(
        inchesList.reduce((acc, inch) => ({ ...acc, [inch]: "" }), {})
    );

    const handleSaveCutRolls = () => {
        console.log("Cut Rolls Data:", inchQuantities);
        setCutRollsVisible(false);
        setStep(1)
    };

    const handleProduct = (name, id) => {
        // console.log(name, id);
        // setSelectedLength(name);
        setProductId(id)
        setShadeId(id)
    }

    const handleAddToCart = async () => {
        try {
            const data = {
                item_id: ShadeId,
                qty: '1',
                // shade: selectedShade,
                // width: selectedWidth,
                // length: selectedLength,
                // rolls: rolls,
                // remark: remark,
                // is_cut: selectedOption === 'standard' ? 1 : 0,
            };
            console.log('data', data);
            const response = await API.addCartItem(data);
            console.log(response);
            if (response.data?.status) {
                setVisible(true);
            } else {
                Alert(response.data?.message || 'Failed to add item.');
            }
        } catch (error) {
            console.error('Add to cart error:', error);
            Alert('Something went wrong!');
        }
    };
    
    // const handleAddToCart = async () => {
    //     try {
    //         // 1️⃣ First, check product availability
    //         const checkData = {
    //             is_cut: selectedOption === "standard" ? 1 : 0,
    //             width: selectedWidth || "",
    //             length: selectedLength || "",
    //             child_group_id: ShadeId || "",
    //         };
    //         console.log("Checking product with data:", checkData)

    //         const checkResponse = await API.getProduct(ShadeId, checkData);
    //         console.log("Product check response:", checkResponse.data);

    //         if (checkResponse.data?.status) {
    //             const data = {
    //                 item_id: ShadeId,
    //                 qty: "1",
    //                 // shade: selectedShade,
    //                 // width: selectedWidth,
    //                 // length: selectedLength,
    //                 // rolls: rolls,
    //                 // remark: remark,
    //                 // is_cut: selectedOption === 'standard' ? 1 : 0,
    //             };

    //             const response = await API.addCartItem(data);
    //             console.log("Add to cart response:", response.data);

    //             if (response.data?.status) {
    //                 setVisible(true); // success modal
    //             } else {
    //                 Alert.alert("Error", response.data?.message || "Failed to add item.");
    //             }
    //         } else {
    //             // 3️⃣ Product not available
    //             Alert.alert("Unavailable", checkResponse.data?.message || "Product not available.");
    //         }
    //     } catch (error) {
    //         console.error("Add to cart error:", error);
    //         Alert.alert("Error", "Something went wrong!");
    //     }
    // };

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Failed to load product data</Text>
            </View>
        );
    }
    if (Loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fdfdfd" }}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }
    if (!productData) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>No product data found</Text>
            </View>
        );
    }

    let photos = [];
    try {
        photos = JSON.parse(productData.photo || "[]");
    } catch {
        photos = [];
    }

    return (
        <View style={[GlobalStyles.container, { paddingTop: 10 }]}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 160 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Product Code Dropdown */}
                <Text style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}>
                    {t("productDetail.chooseProductCode")}
                </Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={selectedProductCode}
                        onValueChange={(itemValue) => setSelectedProductCode(itemValue)}
                        style={styles.picker}
                        dropdownIconColor="#666"
                    >
                        <Picker.Item label={productData.name} value={productData.name} />
                        {/* If product has variations, map them here */}
                    </Picker>
                </View>


                {/* Image */}
                {photos.length > 0 && (
                    <Image
                        source={{ uri: photos[0] }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                )}
                <TouchableOpacity style={styles.downloadBtn}>
                    <Text style={styles.downloadText}>{t("productDetail.downloadSpecs")}</Text>
                </TouchableOpacity>

                {/* Price */}
                <View style={[styles.rowBetween, { flexDirection: isRTL ? "row-reverse" : "row" }]}>
                    <Text style={styles.code}>{productData.name}</Text>
                    {/* <Text style={styles.price}>
                        {currency}{productData.price}
                    </Text> */}
                    <View style={[styles.inchRow, { gap: 10 }]}>
                        <Text style={[styles.price, { textDecorationLine: "line-through", color: "#888", fontSize: 14 }]}>
                            {currency}{productData.price}
                        </Text>
                        <Text style={[styles.price, { color: Colors.primary }]}>
                            {currency}
                            {productData.discount_type === 1
                                ? (productData.price - productData.discount).toFixed(2)
                                : (productData.price - (productData.price * productData.discount / 100)).toFixed(2)
                            }
                        </Text>
                    </View>
                </View>
                <View style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}>
                    <Text style={[styles.labelText, { textAlign: isRTL ? "right" : "left" }]}>
                        {productData.description}
                    </Text>
                </View>

                {/* Shade Selector */}
                {productData.children?.length &&
                    <View> <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>
                        {t("productDetail.shadeSelector")}
                    </Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={[styles.shadeRow, { flexDirection: isRTL ? "row-reverse" : "row" }]}
                        >
                            {productData.children && productData.children?.map((child) => (
                                <TouchableOpacity
                                    key={child.encrypted_id}
                                    style={[
                                        styles.shadeBox,
                                        selectedShade === child.name && styles.shadeBoxSelected,
                                    ]}
                                    onPress={() => {
                                        setSelectedShade(child.name);
                                        setProduct_Child(child?.items);
                                        handleProduct(child?.name, child?.encrypted_id)
                                    }}
                                >
                                    <View
                                        style={[
                                            styles.shadeSwatch,
                                            { backgroundColor: child.hexcode || "#ccc" }
                                        ]}
                                    />
                                    <Text
                                        style={[
                                            styles.shadeText,
                                            selectedShade === child.name && styles.shadeTextSelected,
                                        ]}
                                    >
                                        {child.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                }

                {/* Width Selector */}
                <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>{t("productDetail.selectWidth")}</Text>
                <View style={[styles.optionsRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                    {widths.map((width) => (
                        <TouchableOpacity
                            key={width}
                            style={[
                                styles.optionBox,
                                selectedWidth === width && styles.selectedOption,
                            ]}
                            onPress={() => setSelectedWidth(width)}
                        >
                            <Text style={[selectedWidth === width && styles.selectedOptionText,]}>{width}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>{t("productDetail.selectLength")}</Text>
                <View style={[styles.optionsRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                    {lengths.map((length) => (
                        <TouchableOpacity
                            key={length}
                            style={[
                                styles.optionBox,
                                selectedLength === length && styles.selectedOption,
                            ]}
                            onPress={() => setSelectedLength(length)}
                        >
                            <Text
                                style={[selectedLength === length && styles.selectedOptionText,]}>
                                {length}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>Select Measurement</Text>
                <View style={[styles.optionsRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                    {Product_Child && Product_Child?.map((measurement, idx) => {
                        return (
                            <TouchableOpacity
                                key={idx}
                                style={[
                                    styles.optionBox,
                                    selectedLength === measurement?.name && styles.selectedOption,
                                ]}
                                // onPress={() => setSelectedLength(measurement?.name)}
                                onPress={() => handleProduct(measurement?.name, measurement?.encrypted_id)}
                            >
                                <Text
                                    style={[selectedLength === measurement?.name && styles.selectedOptionText,]}>
                                    {measurement?.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View> */}

                {/* Number of Rolls */}
                <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>
                    {t("productDetail.enterUncutRolls")}
                </Text>
                <TextInput
                    style={[styles.input, { textAlign: isRTL ? 'right' : 'left' }]}
                    keyboardType="numeric"
                    value={rolls}
                    onChangeText={setRolls}
                />

                <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>{t("productDetail.cutRollsQuestion")}</Text>
                {["standard", "none"].map((id) => (
                    <TouchableOpacity
                        key={id}
                        style={[styles.radioContainer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
                        onPress={() => {
                            setSelectedOption(id);
                            if (id === "standard") {
                                setCutRollsVisible(true);
                            }
                        }}
                    >
                        <View style={styles.radioCircle}>
                            {selectedOption === id && <View style={styles.selectedRb} />}
                        </View>
                        <Text style={styles.radioText}>
                            {id === "standard" ? t("productDetail.yes") : t("productDetail.no")}
                        </Text>
                    </TouchableOpacity>
                ))}

                {/* Remark */}
                <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>{t("productDetail.remark")}</Text>
                <View style={styles.remarkRow}>
                    <TextInput
                        style={[styles.remarkInput, { height: 100, textAlignVertical: 'top' }]}
                        placeholder={t("productDetail.remarkPlaceholder")}
                        value={remark}
                        onChangeText={setRemark}
                        multiline={true}
                    />
                    <Icon name="mic-outline" size={20} color="#888" style={{ paddingTop: '12' }} />
                </View>
            </ScrollView>

            <AddItemsModal visible={Visible} onClose={() => setVisible(false)} />
            {/* Add to Cart */}
            <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
                <Text style={styles.cartText}>{t("productDetail.addToCart")}</Text>
            </TouchableOpacity>

            <Portal>
                <Modal
                    visible={cutRollsVisible}
                    onDismiss={() => {
                        setCutRollsVisible(false);
                        setStep(1); // reset step when closing
                    }}
                    contentContainerStyle={styles.modalContainer}
                >
                    {step === 1 ? (
                        // Step 1: Ask for number of cut rolls
                        <View>
                            <View style={styles.inchRow}>
                                <Text style={styles.modalTitle}>{t("productDetail.cutRollsModal.step1Title")}</Text>
                                <TouchableOpacity onPress={() => setCutRollsVisible(false)} style={styles.closeIcon}>
                                    <Icon name="close" size={24} color="#000" />
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                style={styles.inchInput2}
                                keyboardType="numeric"
                                placeholder={t("productDetail.cutRollsModal.step1Placeholder")}
                                value={cutRollsCount}
                                onChangeText={setCutRollsCount}
                            />

                            <TouchableOpacity
                                onPress={() => {
                                    if (cutRollsCount && Number(cutRollsCount) > 0) {
                                        setStep(2);
                                    }
                                }}
                                style={styles.SaveBtn}
                            >
                                <Text style={styles.saveBtnText}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        // Step 2: Enter pieces per size
                        <View>
                            <View style={styles.inchRow}>
                                <Text style={styles.modalTitle}>{t("productDetail.cutRollsModal.step2Title")}</Text>
                                <TouchableOpacity onPress={() => setCutRollsVisible(false)} style={styles.closeIcon}>
                                    <Icon name="close" size={24} color="#000" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView style={{ maxHeight: 450 }}>
                                {inchesList.map((inch) => (
                                    <View key={inch} style={styles.inchRow}>
                                        <Text style={styles.inchLabel}>{inch}</Text>
                                        <TextInput
                                            style={styles.inchInput}
                                            keyboardType="numeric"
                                            value={inchQuantities[inch]}
                                            onChangeText={(value) =>
                                                setInchQuantities((prev) => ({
                                                    ...prev,
                                                    [inch]: value,
                                                }))
                                            }
                                        />
                                    </View>
                                ))}
                            </ScrollView>

                            <View>
                                <View style={styles.inchRow}>
                                    <Text style={styles.totalText}>{t("productDetail.totalInches")}: 33 Inches</Text>
                                    <Text style={styles.totalText}>{t("productDetail.noOfCoils")}: {cutRollsCount}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={handleSaveCutRolls}
                                    style={styles.SaveBtn}
                                >
                                    <Text style={styles.saveBtnText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Modal>
            </Portal>

        </View>
    );
}
const styles = StyleSheet.create({
    label: {
        marginTop: 16,
        fontWeight: '600',
        fontSize: 16,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    labelText: {
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginTop: 16,
    },
    downloadBtn: {
        position: 'absolute',
        top: 270,
        right: 6,
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        elevation: 2,
    },
    downloadText: {
        fontSize: 12,
        color: Colors.black,
    },
    rowBetween: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        alignItems: 'center',
    },
    code: {
        fontSize: 18,
        fontWeight: '500',
    },
    price: {
        fontSize: 18,
        color: Colors.primary,
        fontWeight: '600',
    },
    optionsRow: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        gap: 8,
    },
    optionBox: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
        marginRight: 8,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedOption: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
        borderWidth: 1,
    },
    selectedOptionText: {
        color: '#fff',
        fontWeight: '600',
    },
    radioText: {
        fontSize: 14,
        color: '#666',
        paddingRight: 20,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        padding: 10,
        marginTop: 6,
    },
    remarkRow: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        marginTop: 6,
    },
    remarkInput: {
        flex: 1,
        height: 40,
    },
    SaveBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    saveBtnText: {
        color: Colors.white,
        fontWeight: '600',
        fontSize: 16,
    },
    cartBtn: {
        position: 'absolute',
        bottom: 50,
        left: 16,
        right: 16,
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    cartText: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 16,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginTop: 6,
        marginBottom: 10,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    shadeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        gap: 12,
    },
    shadeBox: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        width: 90,
    },
    shadeBoxSelected: {
        borderColor: Colors.primary,
    },
    shadeSwatch: {
        width: 70,
        height: 50,
        borderRadius: 6,
        marginBottom: 6,
    },
    shadeText: {
        fontSize: 12,
        color: '#333',
    },
    shadeTextSelected: {
        fontWeight: '600',
        color: '#000',
    },
    radioContainer: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    radioCircle: {
        height: 14,
        width: 14,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    selectedRb: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.primary,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    inchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    inchLabel: {
        fontSize: 16,
    },
    inchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        width: 80,
        padding: 10,
        textAlign: 'center',
        // width: '100%',
        // marginBottom: 20
    },
    inchInput2: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        // width: 80,
        padding: 10,
        textAlign: 'center',
        width: '100%',
        marginVertical: 10
    },
    totalText: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
    },
});

