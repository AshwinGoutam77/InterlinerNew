/* eslint-disable react-native/no-inline-styles */
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
import { Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../src/constants/colors';
import CustomerFilter from '../components/CustomerFilter';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const orderData = [
    { id: '#2344', order: "#233344", createdDate: "02/07/025", status: 'Pending', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: '#2344', status: 'Complete', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: '#2344', status: 'Complete', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.' }
];

export default function RaiseComplainScreen({ navigation }) {
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [orderId, setOrderId] = useState(null);
    const [complaint, setComplaint] = useState('');
    const [orderOptions, setOrderOptions] = useState([
        { label: '#2344', value: '2344' },
        { label: '#2345', value: '2345' },
        { label: '#2346', value: '2346' },
    ]);

    const [feedbackVisible, setFeedbackVisible] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [feedbackRating, setFeedbackRating] = useState(5);
    const handleAttachPhoto = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, (response) => {
            if (!response.didCancel && !response.errorCode) {
                console.log("Selected image:", response.assets[0].uri);
                // You can store the URI in state if you want to preview it
            }
        });
    };


    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10, textAlign: 'center', flexDirection: 'column', alignItems: 'start', gap: 10, justifyContent: 'center' };
    return (
        <View style={styles.container}>
            {/* <CustomerFilter /> */}
            <TouchableOpacity style={styles.button} onPress={showModal}>
                <Icon name='plus' size={24} />
                <Text style={styles.buttonText}>Make complain</Text>
            </TouchableOpacity>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {orderData.map((order, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.orderRow}>
                            <Text style={styles.label}>Order</Text>
                            <Text style={styles.value}>{order.order}</Text>
                        </View>
                        <View style={styles.orderRow}>
                            <Text style={styles.label}>Created Date</Text>
                            <Text style={styles.value}>{order.createdDate}</Text>
                        </View>
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
                        <TouchableOpacity
                            style={[styles.submitBtn, { marginTop: 10 }]}
                            onPress={() => setFeedbackVisible(true)}
                        >
                            <Text style={styles.submitText}>Give Feedback</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <Portal>
                <Modal visible={visible} transparent animationType="slide" contentContainerStyle={containerStyle}>
                    {/* Close Button */}
                    <TouchableOpacity onPress={hideModal} style={styles.closeIcon}>
                        <Icon name="close" size={24} color="#000" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Make complain</Text>

                    <TouchableOpacity
                        style={styles.attachPhotoBtn}
                        onPress={handleAttachPhoto}
                    >
                        <Icon name="camera" size={20} color="#ffffffff" />
                        <Text style={styles.attachPhotoText}>Attach Photo</Text>
                    </TouchableOpacity>

                    {/* Order Number Dropdown */}
                    <Text style={styles.label}>Select Order Number</Text>
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
                    <TouchableOpacity style={styles.ModalsubmitBtn} onPress={() => {
                        // Handle complaint submission logic here
                        console.log('Complaint submitted:', { orderId, complaint });
                        hideModal();
                    }}>
                        <Text style={styles.ModalsubmitText}>Submit Complaint</Text>
                    </TouchableOpacity>
                </Modal>
            </Portal>

            {/* Feedback Modal */}
            <Portal>
                <Modal
                    visible={feedbackVisible}
                    transparent
                    animationType="slide"
                    contentContainerStyle={containerStyle}
                >
                    {/* Close */}
                    <TouchableOpacity onPress={() => setFeedbackVisible(false)} style={styles.closeIcon}>
                        <Icon name="close" size={24} color="#000" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Feedback</Text>

                    {/* Message */}
                    <Text style={styles.label}>Message</Text>
                    <TextInput
                        style={styles.textarea}
                        value={feedbackMessage}
                        onChangeText={setFeedbackMessage}
                        multiline
                        numberOfLines={4}
                        placeholder="Enter your feedback..."
                        textAlignVertical="top"
                    />

                    {/* Rating */}
                    <Text style={styles.label}>Rating</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'start', gap: 10, marginBottom: 10 }}>
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <TouchableOpacity
                                key={rating}
                                style={{
                                    backgroundColor: feedbackRating === rating ? Colors.primary : '#eee',
                                    padding: 10,
                                    borderRadius: 6,
                                    width: 45,
                                    alignItems: 'center',
                                }}
                                onPress={() => setFeedbackRating(rating)}
                            >
                                <Text style={{ color: feedbackRating === rating ? '#fff' : '#000' }}>{rating}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        style={[styles.ModalsubmitBtn, { marginTop: 2 }]}
                        onPress={() => {
                            console.log('Feedback:', { feedbackMessage, feedbackRating });
                            setFeedbackVisible(false);
                            setFeedbackMessage('');
                            setFeedbackRating(5);
                        }}
                    >
                        <Text style={styles.ModalsubmitText}>Submit Feedback</Text>
                    </TouchableOpacity>
                </Modal>
            </Portal>

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdfdfd',
        // paddingTop: 20,
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
        fontWeight: '400',
        color: '#000000ff'
    },
    buttonGrid: {
        marginTop: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    ModalsubmitBtn: {
        width: '48%',
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        borderRadius: 6,
        marginVertical: 4,
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
    },
    ModalsubmitText: {
        color: '#ffffffff',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
    },
    button: {
        // width: '48%',
        // backgroundColor: Colors.primary,
        paddingVertical: 0,
        borderRadius: 6,
        marginVertical: 4,
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        marginTop: 20,
    },
    buttonText: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
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
        // backgroundColor: Colors.primary,
        borderRadius: 8,
        padding: 0,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 'auto',
    },
    submitText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '600',
        textDecorationLine: 'underline',
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
    attachPhotoBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        gap: 10,
        marginTop: 8,
        alignSelf: 'flex-start'
    },
    attachPhotoText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
});
