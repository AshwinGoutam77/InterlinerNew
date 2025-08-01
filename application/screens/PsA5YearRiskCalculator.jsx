import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Modal, Portal, Button, PaperProvider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import DisclaimerModal from './DisclaimerModal';
import AsyncStorage from '@react-native-async-storage/async-storage';


const titleOptions = Array.from({ length: 72 }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
}));

const yesNoOptions = [
    { label: 'Yes', value: '1' },
    { label: 'No', value: '0' },
];

export default function FormScreen() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        morningStiffness: '',
        pasiScore: '',
        nailLesions: '',
        facitScore: '',
        systemicTreatment: '',
        painLevel: '',
        psoriasisDuration: '',
    });

    const [showPasiDropdown, setShowPasiDropdown] = useState(false);
    const [riskResult, setRiskResult] = useState(null);
    const [visible, setVisible] = React.useState(false);
    const defaultFormData = {
        morningStiffness: '',
        pasiScore: '',
        nailLesions: '',
        facitScore: '',
        systemicTreatment: '',
        painLevel: '',
        psoriasisDuration: '',
    };

    const showModal = () => setVisible(true);
    const hideModal = () => { setVisible(false); setRiskResult(null); };
    const [showDisclaimer, setShowDisclaimer] = useState(false);

    useEffect(() => {
        const checkDisclaimer = async () => {
            const seen = await AsyncStorage.getItem('disclaimerAccepted');
            if (!seen) {
                setShowDisclaimer(true);
            }
        };
        checkDisclaimer();
    }, []);

    const handleAcceptDisclaimer = async () => {
        await AsyncStorage.setItem('disclaimerAccepted', 'true');
        setShowDisclaimer(false);
    };

    const calculateRisk = (formData, setRiskResult, showModal) => {
        const {
            morningStiffness,
            pasiScore,
            nailLesions,
            facitScore,
            systemicTreatment,
            painLevel,
            psoriasisDuration,
        } = formData;

        if (!morningStiffness || !pasiScore || !nailLesions || !facitScore || !systemicTreatment || !painLevel || !psoriasisDuration) {
            Alert.alert('Missing Data', 'Please enter all required fields.');
            return;
        }

        const PASI = parseFloat(pasiScore);
        const FACIT = parseFloat(facitScore);
        const duration = parseFloat(psoriasisDuration);

        const RS =
            -2.1500513 +
            0.0139 * parseInt(morningStiffness) +
            0.0174 * PASI +
            0.0991 * parseInt(nailLesions) -
            0.0331 * FACIT +
            0.1449 * parseInt(systemicTreatment) +
            0.3180 * parseInt(painLevel) -
            0.0011 * duration;

        const probability = (Math.exp(RS) / (1 + Math.exp(RS))) * 100;

        setRiskResult(probability);
        showModal();
    };



    const updateFormData = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const inputRefs = {
        pasiScore: useRef(null),
        facitScore: useRef(null),
        psoriasisDuration: useRef(null),
    };

    const renderTextInput = (label, value, key, placeholder, nextRefKey = null) => (
        <View style={styles.inputWrapper}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.textInput}
                value={value}
                onChangeText={(text) => setFormData({ ...formData, [key]: text })}
                placeholder={placeholder}
                keyboardType="numeric"
                returnKeyType={nextRefKey ? "next" : "done"}
                blurOnSubmit={false}
                ref={inputRefs[key]}
                onSubmitEditing={() => {
                    if (nextRefKey && inputRefs[nextRefKey]) {
                        inputRefs[nextRefKey].current?.focus();
                    } else {
                        Keyboard.dismiss();
                    }
                }}
            />
        </View>
    );


    const renderRadioGroup = (label, key, options) => (
        <View style={styles.radioContainer}>
            <Text style={styles.label}>{label}*</Text>
            {options.map(option => (
                <TouchableOpacity
                    key={option.value}
                    style={styles.radioOption}
                    onPress={() => updateFormData(key, option.value)}
                    activeOpacity={0.7}
                >
                    <View style={styles.radioButton}>
                        {formData[key] === option.value && <View style={styles.radioButtonSelected} />}
                    </View>
                    <Text style={styles.radioText}>{option.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const renderDropdown = (label, key, options, showDropdown, setShowDropdown) => {
        const selectedOption = options.find(opt => opt.value === formData[key]);

        return (
            <View style={styles.dropdownContainer}>
                <Text style={styles.label}>{label}*</Text>
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => setShowDropdown(true)}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.dropdownText, !selectedOption && styles.placeholder]}>
                        {selectedOption ? selectedOption.label : t('risk5.selectAnOption')}
                    </Text>
                    <Feather name="chevron-down" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                {/* Modal with FlatList options */}
                <Portal>
                    <Modal
                        visible={showDropdown}
                        onDismiss={() => setShowDropdown(false)}
                        contentContainerStyle={styles.modalContent}
                    >
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{label}</Text>
                            <TouchableOpacity
                                onPress={() => setShowDropdown(false)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeButtonText}>{t('risk5.done')}</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={options}
                            keyExtractor={item => String(item.value)}
                            style={{ maxHeight: 300 }}
                            renderItem={({ item }) => {
                                const isSelected = formData[key] === item.value;
                                return (
                                    <TouchableOpacity
                                        style={[
                                            styles.modalOption,
                                            isSelected && { backgroundColor: '#f0e9ff' },
                                        ]}
                                        onPress={() => {
                                            updateFormData(key, item.value);
                                            setShowDropdown(false);
                                        }}
                                    >
                                        <Text style={[
                                            styles.modalOptionText,
                                            isSelected && { color: '#6851a4', fontWeight: '600' },
                                        ]}>
                                            {item.label}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </Modal>
                </Portal>
            </View>
        );
    };

    return (
        <>
            {/* <DisclaimerModal visible={showDisclaimer} onAccept={handleAcceptDisclaimer} /> */}
            {/* {!showDisclaimer && ( */}
                <PaperProvider>
                    <Portal>
                        <KeyboardAvoidingView
                            style={{ flex: 1 }}
                            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
                        >
                            <SafeAreaView style={styles.safeArea}>
                                <ScrollView
                                    style={styles.scrollView}
                                    showsVerticalScrollIndicator={false}
                                    keyboardShouldPersistTaps="handled"
                                    contentContainerStyle={{ paddingBottom: 100 }} // so last input isn't hidden
                                >
                                    <View style={styles.header}>
                                        <Text style={styles.headerTitle}>{t('risk5.title')}</Text>
                                    </View>

                                    <View style={styles.formContainer}>
                                        {renderRadioGroup(t('risk5.morningStiffness'), 'morningStiffness', [
                                            { label: t('risk5.yes'), value: '1' },
                                            { label: t('risk5.no'), value: '0' },
                                        ])}
                                        {renderTextInput(t('risk5.pasi'), formData.pasiScore, 'pasiScore', '0-50', 'facitScore')}
                                        {renderRadioGroup(t('risk5.nailLesions'), 'nailLesions', [
                                            { label: t('risk5.yes'), value: '1' },
                                            { label: t('risk5.no'), value: '0' },
                                        ])}
                                        {renderTextInput(t('risk5.facit'), formData.facitScore, 'facitScore', '0-50', 'psoriasisDuration')}
                                        {renderRadioGroup(t('risk5.systemic'), 'systemicTreatment', [
                                            { label: t('risk5.yes'), value: '1' },
                                            { label: t('risk5.no'), value: '0' },
                                        ])}
                                        {renderRadioGroup(t('risk5.painLevel'), 'painLevel', [
                                            { label: t('risk5.yes'), value: '1' },
                                            { label: t('risk5.no'), value: '0' },
                                        ])}
                                        {renderTextInput(t('risk5.psoriasisDuration'), formData.psoriasisDuration, 'psoriasisDuration', t('risk5.durationPlaceholder'))}
                                    </View>
                                </ScrollView>

                                <View style={styles.submitButtonContainer}>
                                    <TouchableOpacity style={styles.submitButton} onPress={() => calculateRisk(formData, setRiskResult, showModal)}>
                                        <Text style={styles.submitButtonText}>{t('risk5.showMyRisk')}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.resetButton} onPress={() => setFormData(defaultFormData)}>
                                        <Text style={styles.resetButtonText}>{t('risk5.reset')}</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Result Modal */}
                                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                                    <View style={styles.resultBox}>
                                        <Text style={styles.resultTitle}>{t('risk5.resultTitle')}</Text>
                                        <Text style={styles.resultValue}>{riskResult?.toFixed(2)}%</Text>
                                        <View style={styles.submitButtonContainer}>
                                            <TouchableOpacity style={styles.resultCloseButton} onPress={hideModal}>
                                                <Text style={styles.resultCloseText}>{t('risk5.close')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.resultCloseButton} onPress={hideModal}>
                                                <Text style={styles.resultCloseText}>{t('risk5.download')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>
                            </SafeAreaView>
                        </KeyboardAvoidingView>
                    </Portal>
                </PaperProvider>
            {/* )} */}
        </>
    );
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#fff',
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
    headerSubtitle: {
        fontSize: 16,
        color: '#8E8E93',
        lineHeight: 22, fontFamily: 'Poppins-Regular',
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
        marginBottom: 24
    },
    dropdownContainer: {
        marginBottom: 24,
    },
    dropdown: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5EA',
    },
    dropdownText: {
        fontSize: 16,
        color: '#000000', fontFamily: 'Poppins-Regular',
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
        flex: 1, fontFamily: 'Poppins-Regular',
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
        margin: 'auto'
    },
    submitButton: {
        backgroundColor: '#6851a4',
        borderRadius: 5,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        width: '50%',
        borderWidth: 1,
        borderColor: '#6851a4',
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
    },
    resultValue: {
        fontSize: 32,
        fontWeight: '700',
        color: '#6851a4',
        marginBottom: 16,
    },
    resultCloseButton: {
        backgroundColor: '#6851a4',
        borderRadius: 5,
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