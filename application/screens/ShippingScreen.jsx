import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../src/constants/colors';

const addresses = [
    { label: 'Home', address: '61480 Sunbrook Park, PC 5679', default: true },
    { label: 'Office', address: '6993 Meadow Valley Terra, PC 3637' },
];

export default function ShippingScreen() {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(0);
    const [modalVisible, setModalVisible] = useState(true);
    const [form, setForm] = useState({ label: '', address: '' });

    const handleSave = () => {
        // handle adding new address
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Shipping Address</Text> */}
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 20 }}>
                {addresses.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.card(selected === index)}
                        onPress={() => setSelected(index)}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.iconCircle}>
                                <Icon name="location" size={20} color="#ffff" />
                            </View>
                            <View style={{ marginLeft: 10, flex: 1 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.label}>{item.label}</Text>
                                    {item.default && <Text style={styles.defaultTag}>Default</Text>}
                                </View>
                                <Text style={styles.address}>{item.address}</Text>
                            </View>
                            <View style={styles.radio(selected === index)} />
                        </View>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity
                    style={styles.addNewBtn}
                    onPress={() => navigation.navigate('AddNewAddressScreen')}
                >
                    <Text style={styles.addNewText}>Add New Address</Text>
                </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity style={styles.applyBtn} onPress={() => navigation.navigate('CheckoutScreen')}>
                <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fdfdfd'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10
    },
    card: (selected) => ({
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        paddingVertical: 26,
        marginVertical: 10,
        marginHorizontal: 1,
        alignItems: 'center',
        shadowColor: '#ccc',
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 2,
        borderWidth: selected ? 1 : 1,
        borderColor: selected ? '#ccc' : 'transparent',
    }),
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 200,
        backgroundColor: Colors.black,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    defaultTag: {
        fontSize: 12,
        backgroundColor: '#F2F2F2',
        color: Colors.black,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        marginLeft: 8
    },
    address: {
        fontSize: 14,
        color: '#000000'
    },
    radio: (selected) => ({
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.primary,
        marginLeft: 8,
        backgroundColor: selected ? Colors.primary : 'transparent'
    }),
    addNewBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 20
    },
    addNewText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff'
    },
    applyBtn: {
        backgroundColor: Colors.primary,
        padding: 18,
        fontWeight: '800',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 0
    },
    applyText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
        fontSize: 16
    },
    saveBtn: {
        backgroundColor: Colors.primary,
        padding: 16,
        borderRadius: 10,
        alignItems: 'center'
    },
    saveText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});
