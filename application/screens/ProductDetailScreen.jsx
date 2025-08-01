import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

const shades = ['White', 'Off White', 'Blue White', 'Cream'];
const widths = ['36 Inch', '44 Inch', '60 Inch'];
const lengths = ['25 Mtr', '50 Mtr', '100 Mtr'];

export default function ProductDetailScreen({ navigation }) {
    const [selectedShade, setSelectedShade] = useState('White');
    const [isCut, setIsCut] = useState(false);
    const [selectedWidth, setSelectedWidth] = useState('36 Inch');
    const [selectedLength, setSelectedLength] = useState('50 Mtr');
    const [rolls, setRolls] = useState('2');
    const [remark, setRemark] = useState('');
    const [selectedProductCode, setSelectedProductCode] = useState('23666');

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
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
                        {/* Add more product codes as needed */}
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
                    <Text style={styles.price}>$28</Text>
                </View>

                {/* Shade Selector */}
                <Text style={styles.label}>Shade Selector</Text>
                <View style={styles.optionsRow}>
                    {shades.map((shade) => (
                        <TouchableOpacity
                            key={shade}
                            style={[
                                styles.optionBox,
                                selectedShade === shade && styles.selectedOption,
                            ]}
                            onPress={() => setSelectedShade(shade)}
                        >
                            <Text style={[selectedShade === shade && styles.selectedOptionText,]}>{shade}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Cut / Un-Cut */}
                <View style={styles.rowBetween}>
                    <Text style={styles.label}> </Text>
                    <View style={styles.cutGroup}>
                        <TouchableOpacity onPress={() => setIsCut(true)}>
                            <Text style={[styles.radioText, isCut && styles.boldText]}>Cut</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsCut(false)}>
                            <Text style={[styles.radioText, !isCut && styles.boldText]}>Un-Cut</Text>
                        </TouchableOpacity>
                    </View>
                </View>

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

                {/* Remark */}
                <Text style={styles.label}>Remark</Text>
                <View style={styles.remarkRow}>
                    <TextInput
                        style={styles.remarkInput}
                        placeholder="Enter your remark"
                        value={remark}
                        onChangeText={setRemark}
                    />
                    <Icon name="mic-outline" size={20} color="#888" />
                </View>
            </ScrollView>

            {/* Add to Cart */}
            <TouchableOpacity style={styles.cartBtn}>
                <Text style={styles.cartText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
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
        top: 225,
        right: 16,
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        elevation: 2,
    },
    downloadText: {
        fontSize: 12,
        color: '#007bff',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        alignItems: 'center',
    },
    code: {
        fontSize: 16,
        fontWeight: '500',
    },
    price: {
        fontSize: 16,
        color: '#007bff',
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
        backgroundColor: '#1E3A8A',
        borderColor: '#1E3A8A',
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
    },
    boldText: {
        fontWeight: '600',
        color: '#000',
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginTop: 6,
    },
    remarkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
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
        backgroundColor: '#1E3A8A',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    cartText: {
        color: '#fff',
        fontWeight: '600',
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

});
