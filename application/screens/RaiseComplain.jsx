/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../src/constants/colors';
import CustomerFilter from '../components/CustomerFilter';
import { RoleContext } from '../context/RoleContext';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/RTLContext';
import ComplaintModal from '../modals/RaiseComplainModal';
import GlobalStyles from '../src/constants/globalStyles';

const orderData = [
    { id: '#2344', order: "#233344", createdDate: "02/07/025", status: 'Pending', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: '#2344', order: "#233344", createdDate: "02/07/025", status: 'Complete', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: '#2344', order: "#233344", createdDate: "02/07/025", status: 'Complete', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' }
];

export default function RaiseComplainScreen({ navigation }) {
    const { t } = useTranslation();
    const { isRTL } = useAppContext();
    const { role } = useContext(RoleContext);
    const [complaintVisible, setComplaintVisible] = useState(false);
    const [feedbackVisible, setFeedbackVisible] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [feedbackRating, setFeedbackRating] = useState(5);
    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10, textAlign: 'center', flexDirection: 'column', alignItems: 'start', gap: 10, justifyContent: 'center' };

    return (
        <View style={GlobalStyles.container}>
            {role === 'sales' && <CustomerFilter />}
            {role === 'customer' && <TouchableOpacity style={styles.button} onPress={() => setComplaintVisible(true)}>
                <Icon name='plus' size={24} />
                <Text style={styles.buttonText}>Make complain</Text>
            </TouchableOpacity>}
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {orderData.map((order, index) => (
                    <View key={index} style={styles.card}>
                        {role === 'sales' && <View style={[GlobalStyles.flexRow, { marginVertical: 4, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                            <Text style={GlobalStyles?.label}>Customer Name</Text>
                            <Text style={GlobalStyles.value}>Sarah Smith</Text>
                        </View>}
                        <View style={[GlobalStyles.flexRow, { marginVertical: 4, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                            <Text style={GlobalStyles?.label}>Order</Text>
                            <Text style={GlobalStyles.value}>{order.order}</Text>
                        </View>
                        <View style={[GlobalStyles.flexRow, { marginVertical: 4, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                            <Text style={GlobalStyles?.label}>Created Date</Text>
                            <Text style={GlobalStyles.value}>{order.createdDate}</Text>
                        </View>
                        <View style={[GlobalStyles.flexRow, { marginVertical: 4, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                            <Text style={GlobalStyles?.label}>Ticket ID</Text>
                            <Text style={GlobalStyles.value}>{order.id}</Text>
                        </View>
                        <View style={[GlobalStyles.flexRow, { marginVertical: 4, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                            <Text style={GlobalStyles?.label}>Status</Text>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: order.status === 'Complete' ? 'green' : 'red'
                            }}>{order.status}</Text>
                        </View>
                        <View style={styles.descriptionRow}>
                            <Text style={[styles.descriptionRowLabel, { textAlign: isRTL ? 'right' : 'left' }]}>Description</Text>
                            <Text style={[styles.descriptionRowLabelValue, { textAlign: isRTL ? 'right' : 'left' }]}>{order.description}</Text>
                        </View>
                        {role === 'customer' && <TouchableOpacity
                            style={[styles.submitBtn, { marginTop: 10 }]}
                            onPress={() => setFeedbackVisible(true)}
                        >
                            <Text style={styles.submitText}>Give Feedback</Text>
                        </TouchableOpacity>}
                    </View>
                ))}
            </ScrollView>

            <ComplaintModal
                visible={complaintVisible}
                onClose={() => setComplaintVisible(false)}
                onSubmit={(data) => console.log("Complaint submitted:", data)}
                isRTL={false}
            />

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
                    <Text style={[GlobalStyles?.label, { textAlign: isRTL ? 'right' : 'left' }]}>Message</Text>
                    <TextInput
                        style={[styles.textarea, { textAlign: isRTL ? 'right' : 'left' }]}
                        value={feedbackMessage}
                        onChangeText={setFeedbackMessage}
                        multiline
                        numberOfLines={4}
                        placeholder="Enter your feedback..."
                        textAlignVertical="top"
                    />

                    {/* Rating */}
                    <Text style={[GlobalStyles?.label, { textAlign: isRTL ? 'right' : 'left' }]}>Rating</Text>
                    <View style={{
                        flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'start', gap: 10, marginBottom: 10
                    }}>
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
                                <Text style={{ color: feedbackRating === rating ? Colors.white : '#000', fontWeight: '600' }}>{rating}</Text>
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
    scroll: {
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
    ModalsubmitBtn: {
        width: '48%',
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        borderRadius: 6,
        marginVertical: 4,
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
    },
    ModalsubmitText: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
    },
    button: {
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
});
