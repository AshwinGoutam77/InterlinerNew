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
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Colors from '../src/constants/colors';
import { CurrencyContext } from '../context/CurrencyContext';
import AddItemsModal from '../modals/AddItemsModal';

const shades = ['White', 'Off White', 'Blue White', 'Cream'];
const widths = ['36 Inch', '44 Inch', '60 Inch'];
const lengths = ['25 Mtr', '50 Mtr', '100 Mtr'];

export default function ProductDetailScreen() {
    const navigation = useNavigation();
    const { currency } = useContext(CurrencyContext);
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
        { id: 'standard', label: 'Cut X rolls in standard collar size (12-20”)' },
        { id: 'custom', label: 'Cut collars from X rolls in customized size (charges extra)' },
        { id: 'none', label: 'None' },
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


    return (
        <View style={styles.container}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 160 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Product Code Dropdown */}
                <Text style={styles.label}>Choose Product Code</Text>
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
                <View style={styles.rowBetween}>
                    <Text style={styles.code}>23666</Text>
                    <Text style={styles.price}>{currency}28</Text>
                </View>
                <View style={styles.label}>
                    <Text>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.</Text>
                </View>

                {/* Shade Selector */}
                {/* Shade Selector */}
                <Text style={styles.label}>Shade Selector</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.shadeRow}
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


                {/* Cut / Un-Cut */}
                {/* <View style={styles.rowBetween}>
                            <Text style={styles.label}> </Text>
                            <View style={styles.cutGroup}>
                                <TouchableOpacity onPress={() => setIsCut(true)}>
                                    <Text style={[styles.radioText, isCut && styles.boldText]}>Cut</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setIsCut(false)}>
                                    <Text style={[styles.radioText, !isCut && styles.boldText]}>Un-Cut</Text>
                                </TouchableOpacity>
                            </View>
                        </View> */}

                {/* Width Selector */}
                <Text style={styles.label}>Select Width</Text>
                <View style={styles.optionsRow}>
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
                <Text style={styles.label}>Select Length</Text>
                <View style={styles.optionsRow}>
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
                <Text style={styles.label}>Enter Number of Rolls</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={rolls}
                    onChangeText={setRolls}
                />

                <Text style={styles.label}>Do you want customization</Text>
                {options.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        style={styles.radioContainer}
                        onPress={() => setSelectedOption(option.id)}
                    >
                        <View style={styles.radioCircle}>
                            {selectedOption === option.id && <View style={styles.selectedRb} />}
                        </View>
                        <Text style={styles.radioText}>{option.label}</Text>
                    </TouchableOpacity>
                ))}

                {selectedOption !== 'none' && <View>
                    <Text style={styles.label}>Choose Customised Size</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={SelectCustomSize}
                            onValueChange={(itemValue) => setSelectCustomSize(itemValue)}
                            style={styles.picker}
                            dropdownIconColor="#666"
                        >
                            <Picker.Item label="12" value="12" />
                            <Picker.Item label="15" value="15" />
                            <Picker.Item label="20" value="20" />
                        </Picker>
                    </View>
                </View>}

                {/* Remark */}
                <Text style={styles.label}>Remark</Text>
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
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 20,
        paddingTop: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        marginTop: 16,
        fontWeight: '600',
        fontSize: 16,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        marginTop: 4,
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
        flexDirection: 'row',
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
        flexDirection: 'row',
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
    },
    selectedOption: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
        borderWidth: 1,
        color: 'white',
    },
    selectedOptionText: {
        color: '#fff',
        fontWeight: '600',
    },
    cutGroup: {
        flexDirection: 'row',
        gap: 20,
    },
    radioText: {
        fontSize: 14,
        color: '#666',
        paddingRight: 20
    },
    boldText: {
        fontWeight: '600',
        color: '#000',
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        padding: 10,
        marginTop: 6,
    },
    remarkRow: {
        flexDirection: 'row',
        alignItems: 'top',
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
    cartBtn: {
        position: 'absolute',
        bottom: 20,
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
        gap: '12'
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
        flexDirection: 'row',
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
});
