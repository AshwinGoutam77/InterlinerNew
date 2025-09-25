import React, { useContext, useState } from 'react';
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
    I18nManager
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Colors from '../src/constants/colors';
import { CurrencyContext } from '../context/CurrencyContext';
import AddItemsModal from '../modals/AddItemsModal';
import { Modal, Portal, Button } from "react-native-paper";
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/RTLContext';
import GlobalStyles from '../src/constants/globalStyles';

const shades = ['White', 'Off White', 'Blue White', 'Cream'];
const widths = ['36 Inch', '44 Inch', '60 Inch'];
const lengths = ['25 Mtr', '50 Mtr', '100 Mtr'];

export default function ProductDetailScreen() {
    const { t } = useTranslation();
    const { isRTL } = useAppContext();
    const navigation = useNavigation();
    const currency = '$'
    const [selectedShade, setSelectedShade] = useState('White');
    const [isCut, setIsCut] = useState(false);
    const [selectedWidth, setSelectedWidth] = useState('36 Inch');
    const [selectedLength, setSelectedLength] = useState('50 Mtr');
    const [rolls, setRolls] = useState('2');
    const [remark, setRemark] = useState('');
    const [selectedProductCode, setSelectedProductCode] = useState('23666');
    const [SelectCustomSize, setSelectCustomSize] = useState('12')
    const [selectedOption, setSelectedOption] = useState('none');
    const [Visible, setVisible] = useState(false)

    const options = [
        { id: 'standard', label: 'yes' },
        { id: 'none', label: 'No' },
    ];

    const getShadeColor = (shade) => {
        switch (shade) {
            case 'White':
                return '#F3F4F6';
            case 'Off White':
                return '#F9F7F1';
            case 'Blue White':
                return '#D6E9FF';
            case 'Cream':
                return '#F1E9D3';
            default:
                return '#eee';
        }
    };

    const inchesList = ["1.5 Inch", "2 Inch", "2.5 Inch", "3 Inch", "3.5 Inch", "4 Inch", "4.5 Inch", "5 Inch", "5.5 Inch", "6 Inch", "6.5 Inch", "7 Inch", "7.5 Inch", "8 Inch"];
    const [cutRollsVisible, setCutRollsVisible] = useState(false);
    const [inchQuantities, setInchQuantities] = useState(
        inchesList.reduce((acc, inch) => ({ ...acc, [inch]: "" }), {})
    );

    const handleSaveCutRolls = () => {
        console.log("Cut Rolls Data:", inchQuantities);
        setCutRollsVisible(false);
    };

    return (
        <View style={[GlobalStyles.container, { paddingTop: 10 }]}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 160 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Product Code Dropdown */}
                <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>Choose Product Code</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={selectedProductCode}
                        onValueChange={(itemValue) => setSelectedProductCode(itemValue)}
                        style={styles.picker}
                        dropdownIconColor="#666"
                    >
                        <Picker.Item label="23666" value="23666" />
                        <Picker.Item label="23667" value="23667" />
                        <Picker.Item label="23668" value="23668" />
                    </Picker>
                </View>


                {/* Image */}
                <Image
                    source={require('../../assets/images/shirt-banner.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
                <TouchableOpacity style={styles.downloadBtn}>
                    <Text style={styles.downloadText}>Download Specs</Text>
                </TouchableOpacity>

                {/* Price */}
                <View style={[styles.rowBetween, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                    <Text style={styles.code}>23666</Text>
                    <Text style={styles.price}>{currency}28</Text>
                </View>
                <View style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>
                    <Text style={[styles.labelText, { textAlign: isRTL ? 'right' : 'left' }]}>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.</Text>
                </View>

                {/* Shade Selector */}
                <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>Shade Selector</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[styles.shadeRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
                >
                    {shades.map((shade) => (
                        <TouchableOpacity
                            key={shade}
                            style={[
                                styles.shadeBox,
                                selectedShade === shade && styles.shadeBoxSelected,
                            ]}
                            onPress={() => setSelectedShade(shade)}
                        >
                            <View style={[
                                styles.shadeSwatch,
                                { backgroundColor: getShadeColor(shade) }
                            ]} />
                            <Text
                                style={[
                                    styles.shadeText,
                                    selectedShade === shade && styles.shadeTextSelected,
                                ]}
                            >
                                {shade}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Width Selector */}
                <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>Select Width</Text>
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

                {/* Length Selector */}
                <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>Select Length</Text>
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

                {/* Number of Rolls */}
                <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>Enter Number of Uncut Rolls</Text>
                <TextInput
                    style={[styles.input, { textAlign: isRTL ? 'right' : 'left' }]}
                    keyboardType="numeric"
                    value={rolls}
                    onChangeText={setRolls}
                />

                <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>Do you want Cut Rolls</Text>
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
                            {id === "standard" ? "Yes" : "No"}
                        </Text>
                    </TouchableOpacity>
                ))}

                {/* Remark */}
                <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>Remark</Text>
                <View style={styles.remarkRow}>
                    <TextInput
                        style={[styles.remarkInput, { height: 100, textAlignVertical: 'top' }]}
                        placeholder="Enter your remark"
                        value={remark}
                        onChangeText={setRemark}
                        multiline={true}
                    />
                    <Icon name="mic-outline" size={20} color="#888" style={{ paddingTop: '12' }} />
                </View>
            </ScrollView>

            <AddItemsModal visible={Visible} onClose={() => setVisible(false)} />
            {/* Add to Cart */}
            <TouchableOpacity style={styles.cartBtn} onPress={() => setVisible(true)}>
                <Text style={styles.cartText}>Add to Cart</Text>
            </TouchableOpacity>

            <Portal>
                <Modal
                    visible={cutRollsVisible}
                    onDismiss={() => setCutRollsVisible(false)}
                    contentContainerStyle={styles.modalContainer}
                >
                    <View style={styles.inchRow}>
                        <Text style={styles.modalTitle}>Enter Pieces for Each Size</Text>
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
                            <Text style={styles.totalText}>Total: 33 Inches</Text>
                            <Text style={styles.totalText}>No. of Coils: 1</Text>
                        </View>
                        <TouchableOpacity
                            mode="contained"
                            onPress={handleSaveCutRolls}
                            style={styles.SaveBtn}
                        >
                            <Text style={styles.saveBtnText}>Save</Text>
                        </TouchableOpacity>
                    </View>
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
        paddingVertical: 18,
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
        padding: 6,
        textAlign: 'center',
    },
    totalText: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
    },
});

