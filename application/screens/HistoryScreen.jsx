/* eslint-disable react-native/no-inline-styles */
import { Picker } from '@react-native-picker/picker';
import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../src/constants/colors';
import { RoleContext } from '../context/RoleContext';
import CustomerFilter from '../components/CustomerFilter';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/RTLContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ComplaintModal from '../modals/RaiseComplainModal';
import PayDuePayments from '../modals/PayDuePayments';
import GlobalStyles from '../src/constants/globalStyles';

const orderData = [
    { id: '#2344', paid: 24, due: 2, total: 26, date: '24/09/25' },
    { id: '#2344', paid: 24, due: 2, total: 26, date: '24/09/25' },
    { id: '#2344', paid: 24, due: 2, total: 26, date: '24/09/25' }
];

export default function HistoryScreen({ navigation }) {
    const { t } = useTranslation();
    const { isRTL } = useAppContext();
    const { role } = useContext(RoleContext);
    const [RepeatOrder, setRepeatOrder] = useState(false)
    const showRepeat = () => setRepeatOrder(true);
    const hideRepeat = () => setRepeatOrder(false);
    const [complaintVisible, setComplaintVisible] = useState(false);
    const [PayDueVisible, setPayDueVisible] = useState(false);
    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10, textAlign: 'center', flexDirection: 'column', alignItems: 'start', gap: 10, justifyContent: 'center' };

    return (
        <View style={GlobalStyles.container}>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={{ marginBottom: 20 }}>
                    {role == 'sales' && <CustomerFilter />}
                </View>
                {orderData.map((order, index) => (
                    <View key={index} style={styles.card}>
                        {role === 'sales' && <View style={[GlobalStyles.flexRow, { marginVertical: 4, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                            <Text style={styles.label}>Customer Name</Text>
                            <Text style={styles.value}>Sarah Smith</Text>
                        </View>}
                        <View style={[GlobalStyles.flexRow, { marginVertical: 4, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                            <Text style={styles.label}>Order Date</Text>
                            <Text style={styles.value}>{order.date}</Text>
                        </View>
                        <TouchableOpacity style={[GlobalStyles.flexRow, { marginVertical: 4, flexDirection: isRTL ? 'row-reverse' : 'row' }]} onPress={() => navigation.navigate('OrderDetailsScreen')}>
                            <Text style={[styles.label, { color: Colors.primary, fontWeight: '600' }]}>Order Number</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.value, { color: Colors.primary }]}>{order.id}</Text>
                                <Icon name='chevron-right' size={20} />
                            </View>
                        </TouchableOpacity>
                        <View style={[GlobalStyles.flexRow, { marginVertical: 4, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                            <Text style={styles.label}>Total Amount</Text>
                            <Text style={styles.value}>${order.paid.toFixed(2)}</Text>
                        </View>
                        <View style={[GlobalStyles.flexRow, { marginVertical: 4, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                            <Text style={styles.label}>Paid Amount</Text>
                            <Text style={styles.value}>${order.due.toFixed(2)}</Text>
                        </View>
                        <View style={[GlobalStyles.flexRow, { marginVertical: 4, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                            <Text style={styles.label}>Balance Due</Text>
                            <Text style={styles.value}>${order.total.toFixed(2)}</Text>
                        </View>

                        <View style={[styles.buttonGrid, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                            {role === 'customer' && <TouchableOpacity style={styles.button} onPress={() => setPayDueVisible(true)}>
                                <Text style={styles.buttonText}>Pay Due Payments</Text>
                            </TouchableOpacity>}
                            <TouchableOpacity style={styles.button} onPress={showRepeat}>
                                <Text style={styles.buttonText}>Repeat Order</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Download Recipet</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Download Invoice</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setComplaintVisible(true)}>
                                <Text style={styles.buttonText}>Complain</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HelpCenterScreen')}>
                                <Text style={styles.buttonText}>Support</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Direct pay */}
            <ComplaintModal
                visible={complaintVisible}
                onClose={() => setComplaintVisible(false)}
                onSubmit={(data) => console.log("Complaint submitted:", data)}
                isRTL={false}
            />

            <PayDuePayments
                PayDueVisible={PayDueVisible}
                onClose={() => setPayDueVisible(false)}
                onSubmit={(data) => console.log("payment submitted:", data)}
                isRTL={false}
            />

            {/* repeat order */}
            <Portal>
                <Modal visible={RepeatOrder} transparent animationType="slide" contentContainerStyle={containerStyle}>
                    {/* Close Button */}
                    <TouchableOpacity onPress={hideRepeat} style={styles.closeIcon}>
                        <Icon name="close" size={24} color="#000" />
                    </TouchableOpacity>

                    <Text style={styles.RepeatTitle}>Please confirm if you would like to proceed with placing this same order again.</Text>
                    <View style={styles.RepeatButtonGrid}>
                        <TouchableOpacity style={styles.RepeatSubmitBtn} onPress={() => { navigation.navigate('CartScreen'), hideRepeat() }}>
                            <Text style={styles.submitText}>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 20,
    },
    label: {
        fontSize: 15,
        color: '#333',
    },
    value: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonGrid: {
        marginTop: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    button: {
        width: '48%',
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        borderRadius: 6,
        marginVertical: 4,
    },
    buttonText: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: 13,
        fontWeight: '600',
    },
    closeIcon: {
        position: 'absolute',
        right: 15,
        top: 15,
        zIndex: 1,
    },
    RepeatTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 30,
    },
    RepeatButtonGrid: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    RepeatSubmitBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        width: '48%',
    },
    submitText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
});

