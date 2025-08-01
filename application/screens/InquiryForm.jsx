import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    Alert,
} from 'react-native';
import { Modal, Portal, PaperProvider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export default function FormScreen() {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedback: '',
    });

    const [modalVisible, setModalVisible] = useState(false);

    const updateFormData = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        const { name, email, feedback } = formData;

        if (!name || !email || !feedback) {
            Alert.alert('Missing Fields', 'Please fill out all fields.');
            return;
        }

        // const state = 'navigator.onLine' ? { isConnected: navigator.onLine } : { isConnected: true };
        // if (!state.isConnected) {
        //     Alert.alert('No Internet', 'Please check your internet connection and try again.');
        //     return;
        // }

        // Simulate API call or risk calculation logic
        setModalVisible(true);
        setFormData({
            name: '',
            email: '',
            feedback: '',
        })
    };

    const renderTextInput = (label, value, key, placeholder, multiline = false) => (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}*</Text>
            <TextInput
                style={[styles.textInput, multiline && { height: 120, textAlignVertical: 'top' }]}
                value={value}
                onChangeText={text => updateFormData(key, text)}
                placeholder={placeholder}
                multiline={multiline}
                placeholderTextColor="#C7C7CC"
            />
        </View>
    );

    return (
        <PaperProvider>
            <Portal>
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView
                        style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>{t('feedback.title')}</Text>
                            <Text style={styles.headerDescription}>{t('feedback.description')}</Text>
                        </View>

                        <View style={styles.formContainer}>
                            {renderTextInput(t('feedback.name'), formData.name, 'name', t('feedback.namePlaceholder'))}
                            {renderTextInput(t('feedback.email'), formData.email, 'email', t('feedback.emailPlaceholder'))}
                            {renderTextInput(t('feedback.feedback'), formData.feedback, 'feedback', t('feedback.feedbackPlaceholder'), true)}

                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                <Text style={styles.submitButtonText}>{t('feedback.submit')}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                    {/* Modal for Success */}
                    <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalContainer}>
                        <View style={styles.resultBox}>
                            <Text style={styles.resultTitle}>{t('feedback.thankYou')}</Text>
                            <Text style={styles.resultValue}>{t('feedback.successMessage')}</Text>
                            <TouchableOpacity style={styles.resultCloseButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.resultCloseText}>{t('feedback.close')}</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </SafeAreaView>
            </Portal>
        </PaperProvider>
    );
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 8, fontFamily: 'Poppins-Regular',
    },
    headerDescription: {
        fontSize: 15,
        fontWeight: '500',
        color: '#000000',
        marginBottom: 8, fontFamily: 'Poppins-Regular',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#8E8E93',
        lineHeight: 22,
    },
    scrollView: {
        flex: 1,
    },
    formContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    inputContainer: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 8, fontFamily: 'Poppins-Regular',
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#000000',
        borderWidth: 1,
        borderColor: '#E5E5EA', fontFamily: 'Poppins-Regular',
    },
    dropdownContainer: {
        marginBottom: 24,
    },
    dropdown: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5EA',
    },
    dropdownText: {
        fontSize: 16,
        color: '#000000',
    },
    placeholder: {
        color: '#C7C7CC',
    },
    radioContainer: {
        marginBottom: 24,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#E5E5EA',
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#6851a4',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    radioButtonSelected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#6851a4',
    },
    radioText: {
        fontSize: 16,
        color: '#000000',
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        margin: 20,
        borderRadius: 20,
        padding: 10,
        maxHeight: '80%',
    },

    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
    },
    closeButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    closeButtonText: {
        fontSize: 16,
        color: '#6851a4',
        fontWeight: '600',
    },
    modalOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F7',
    },
    modalOptionText: {
        fontSize: 16,
        color: '#000000',
    },
    submitButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingHorizontal: 20,
    },
    submitButton: {
        backgroundColor: '#6851a4',
        borderRadius: 5,
        paddingVertical: 16,
        paddingHorizontal: 45,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#6851a4',
        marginBottom: 20,
    },

    resetButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#6851a4',
        borderRadius: 5,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        width: '50%',
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    resultOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    resultBox: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        width: '100%',
    },
    resultTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 12,
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
    resultValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#6851a4',
        marginBottom: 16,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
    resultCloseButton: {
        backgroundColor: '#6851a4',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 24,
    },
    resultCloseText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    modalContainer: {
        margin: 20,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
});