import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import { Modal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const orderData = [
    { id: '#2344', status: 'Pending', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: '#2344', status: 'Complete', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: '#2344', status: 'Complete', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.' }
];

export default function RaiseComplainScreen({ navigation }) {
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [orderId, setOrderId] = useState(null);
    const [complaint, setComplaint] = useState('');
    const [open, setOpen] = useState(false);
    const [orderOptions, setOrderOptions] = useState([
        { label: '#2344', value: '2344' },
        { label: '#2345', value: '2345' },
        { label: '#2346', value: '2346' },
    ]);

    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10, textAlign: 'center', flexDirection: 'column', alignItems: 'start', gap: 10, justifyContent: 'center', flexDirection: 'column' };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={showModal}>
                <Text style={styles.buttonText}>Raise a Complain</Text>
            </TouchableOpacity>
            <ScrollView style={styles.scroll}>
                {orderData.map((order, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.orderRow}>
                            <Text style={styles.label}>Ticket ID</Text>
                            <Text style={styles.value}>{order.id}</Text>
                        </View>
                        <View style={styles.orderRow}>
                            <Text style={styles.label}>Status</Text>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: order.status === 'Complete' ? 'green' : 'red'
                            }}>{order.status}</Text>
                        </View>
                        <View style={styles.descriptionRow}>
                            <Text style={styles.descriptionRowLabel}>Description</Text>
                            <Text style={styles.descriptionRowLabelValue}>{order.description}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
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
                    // Handle complaint submission logic here
                    console.log('Complaint submitted:', { orderId, complaint });
                    hideModal();
                }}>
                    <Text style={styles.submitText}>Submit Complaint</Text>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingHorizontal: 20
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
        // paddingHorizontal: 16,
        // marginBottom: 70
        marginTop: 10,
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
        fontWeight: '600',
        color: '#000000'
    },
    descriptionRowLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000000'
    },
    value: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000'
    },
    descriptionRowLabelValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000'
    },
    buttonGrid: {
        marginTop: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    button: {
        width: '48%',
        backgroundColor: '#002F87',
        paddingVertical: 10,
        borderRadius: 6,
        marginVertical: 4,
        // marginLeft: 'auto'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 13
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
        backgroundColor: '#1E3A8A',
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
