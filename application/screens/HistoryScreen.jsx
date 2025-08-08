import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../src/constants/colors';

const orderData = [
    { id: '#2344', paid: 24, due: 2, total: 26 },
    { id: '#2344', paid: 24, due: 2, total: 26 },
    { id: '#2344', paid: 24, due: 2, total: 26 }
];

export default function HistoryScreen({ navigation }) {
    const [visible, setVisible] = React.useState(false);
    const [visiblePay, setVisiblePay] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    const showModalPay = () => setVisiblePay(true);
    const hideModalPay = () => setVisiblePay(false);

    const [orderId, setOrderId] = useState(null);
    const [complaint, setComplaint] = useState('');
    const [Amount, setAmount] = useState("")
    const [Remark, setRemark] = useState('')
    const [open, setOpen] = useState(false);
    const [orderOptions, setOrderOptions] = useState([
        { label: '#2344', value: '2344' },
        { label: '#2345', value: '2345' },
        { label: '#2346', value: '2346' },
    ]);

    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10, textAlign: 'center', flexDirection: 'column', alignItems: 'start', gap: 10, justifyContent: 'center' };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                {orderData.map((order, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.orderRow}>
                            <Text style={styles.label}>Order Date</Text>
                            <Text style={styles.value}>{order.date}</Text>
                        </View>
                        <View style={styles.orderRow}>
                            <Text style={styles.label}>Order ID</Text>
                            <Text style={styles.value}>{order.id}</Text>
                        </View>
                        <View style={styles.orderRow}>
                            <Text style={styles.label}>Total Amount</Text>
                            <Text style={styles.value}>${order.paid.toFixed(2)}</Text>
                        </View>
                        <View style={styles.orderRow}>
                            <Text style={styles.label}>Paid Amount</Text>
                            <Text style={styles.value}>${order.due.toFixed(2)}</Text>
                        </View>
                        <View style={styles.orderRow}>
                            <Text style={styles.label}>Balance Due</Text>
                            <Text style={styles.value}>${order.total.toFixed(2)}</Text>
                        </View>

                        <View style={styles.buttonGrid}>
                            <TouchableOpacity style={styles.button} onPress={showModal}>
                                <Text style={styles.buttonText}>Complain</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TrackOrderScreen')}>
                                <Text style={styles.buttonText}>Track Order</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={showModalPay}>
                                <Text style={styles.buttonText}>Pay Due Payments</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OrderDetailsScreen')}>
                                <Text style={styles.buttonText}>View Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Direct pay */}
            <Portal>
                <Modal visible={visible} transparent animationType="slide" contentContainerStyle={containerStyle}>
                    {/* Close Button */}
                    <TouchableOpacity onPress={hideModal} style={styles.closeIcon}>
                        <Icon name="close" size={24} color="#000" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Raise a Complaint</Text>

                    {/* Order ID Dropdown */}
                    <Text style={styles.label}>Select Order ID</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={orderOptions}
                            onValueChange={(itemValue) => setOrderOptions(itemValue)}
                            style={styles.picker}
                            dropdownIconColor="#666"
                        >
                            <Picker.Item label="Choose Order" value="" />
                            <Picker.Item label="23666" value="23666" />
                            <Picker.Item label="23667" value="23667" />
                            <Picker.Item label="23668" value="23668" />
                            {/* Add more as needed */}
                        </Picker>
                    </View>


                    {/* Complaint Textarea */}
                    <Text style={styles.label}>Your Complaint</Text>
                    <TextInput
                        style={styles.textarea}
                        value={complaint}
                        onChangeText={setComplaint}
                        multiline
                        numberOfLines={5}
                        placeholder="Describe your issue..."
                        textAlignVertical="top"
                    />

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.submitBtn} onPress={() => {
                        console.log('Complaint submitted:', { orderId, complaint });
                        hideModal();
                    }}>
                        <Text style={styles.submitText}>Submit Complaint</Text>
                    </TouchableOpacity>
                </Modal>
            </Portal>

            {/* pay due modal */}
            <Portal>
                <Modal visible={visiblePay} transparent animationType="slide" contentContainerStyle={containerStyle}>
                    {/* Close Button */}
                    <TouchableOpacity onPress={hideModalPay} style={styles.closeIcon}>
                        <Icon name="close" size={24} color="#000" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Pay Due By Orders</Text>

                    {/* Order ID Dropdown */}
                    <Text style={styles.label}>Payment Via</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={orderOptions}
                            onValueChange={(itemValue) => setOrderOptions(itemValue)}
                            style={styles.picker}
                            dropdownIconColor="#666"
                        >
                            <Picker.Item label="Choose Method" value="" />
                            <Picker.Item label="Cash" value="Cash" />
                            <Picker.Item label="Cheque" value="Cheque" />
                            <Picker.Item label="Card" value="Card" />
                            {/* Add more as needed */}
                        </Picker>
                    </View>


                    {/* Complaint Textarea */}
                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                        style={styles.input}
                        value={Amount}
                        onChangeText={setAmount}
                        multiline
                        numberOfLines={1}
                        placeholder="Enter Amount"
                        textAlignVertical="center"
                    />

                    <Text style={styles.label}>Remark</Text>
                    <TextInput
                        style={styles.textarea}
                        value={Remark}
                        onChangeText={setRemark}
                        multiline
                        numberOfLines={1}
                        placeholder="Enter Your Remark"
                        textAlignVertical="top"
                    />

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.submitBtn} onPress={() => {
                        // Handle complaint submission logic here
                        console.log('Complaint submitted:', { orderId, complaint });
                        hideModalPay();
                    }}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </Modal>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    scroll: {
        paddingHorizontal: 16,
        // marginBottom: 70
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 20
    },
    orderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4
    },
    label: {
        fontSize: 15,
        color: '#333'
    },
    value: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000'
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        backgroundColor: '#f9f9f9',
    },
    buttonGrid: {
        marginTop: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    button: {
        width: '48%',
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        borderRadius: 6,
        marginVertical: 4
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 13,
        fontWeight: '600'
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        height: 60,
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    navIcon: {
        alignItems: 'center'
    },
    descriptionRowLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000000'
    },
    descriptionRowLabelValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000'
    },
    dropdown: {
        marginBottom: 10,
        borderColor: '#ccc',
    },
    textarea: {
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        backgroundColor: '#f9f9f9',
    },
    submitBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingHorizontal: 20,
    },
    closeIcon: {
        position: 'absolute',
        right: 15,
        top: 15,
        zIndex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'left',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
    },

    picker: {
        height: 50,
        width: '100%',
        color: '#333',
    },

});
