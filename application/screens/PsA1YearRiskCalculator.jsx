import React, { useState } from 'react';
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


const titleOptions = Array.from({ length: 72 }, (_, i) => ({
  label: `${i + 1}`,
  value: `${i + 1}`,
}));

const yesNoOptions = [
  { label: 'Yes', value: '1' },
  { label: 'No', value: '0' },
];

const sexOption = [
  { label: 'Male', value: '1' },
  { label: 'Female', value: '0' },
];

const GlobalHealth = [
  { label: 'Good/Very Good', value: '1' },
  { label: 'Fair/Poor/Very poor', value: '0' },
];

const PainLevel = [
  { label: 'Mild/Moderate/Severe', value: '1' },
  { label: 'None', value: '0' },
];

export default function FormScreen() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    sex: '',
    age: '',
    familyHistory: '',
    morningStiffness: '',
    nailLesions: '',
    stiffnessLevel: '',
    facitScore: '',
    systemicTreatment: '',
    biologicTherapy: '',
    globalHealth: '',
    painLevel: '',
    psoriasisDuration: '',
  });


  const [showPasiDropdown, setShowPasiDropdown] = useState(false);
  const [riskResult, setRiskResult] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const defaultFormData = {
    sex: '',
    age: '',
    familyHistory: '',
    morningStiffness: '',
    nailLesions: '',
    stiffnessLevel: '',
    facitScore: '',
    systemicTreatment: '',
    biologicTherapy: '',
    globalHealth: '',
    painLevel: '',
    psoriasisDuration: '',
  };

  const showModal = () => setVisible(true);
  const hideModal = () => { setVisible(false); };

  const calculateRisk = (inputs) => {
    const {
      sex,
      age,
      familyHistory,
      backStiffness,
      nailPitting,
      stiffnessLevel,
      biologicTherapy,
      globalHealth,
      painLevel,
      psoriasisDuration,
    } = inputs;
    if (!sex || !age || !familyHistory || !backStiffness || !nailPitting || !biologicTherapy || !globalHealth || !painLevel || !psoriasisDuration) {
      Alert.alert(t('form.missingData'), t('form.missingFields'));
      return;
    }

    // Convert all inputs to numbers (defensively)
    const gender = Number(sex);
    const ageNum = Number(age);
    const family = Number(familyHistory);
    const stiffness = Number(backStiffness);
    const nails = Number(nailPitting);
    const stiffnessVAS = Number(stiffnessLevel);
    const biologic = Number(biologicTherapy);
    const health = Number(globalHealth);
    const pain = Number(painLevel);
    const duration = Number(psoriasisDuration);

    // Log each input type to be safe
    console.log('Parsed values =>', {
      gender, ageNum, family, stiffness, nails,
      stiffnessVAS, biologic, health, pain, duration
    });

    // Check for any NaN before proceeding
    const inputsArray = [gender, ageNum, family, stiffness, nails, stiffnessVAS, biologic, health, pain, duration];
    const hasNaN = inputsArray.some(val => isNaN(val));

    if (hasNaN) {
      console.warn('❌ One or more inputs are invalid numbers');
      return null;
    }

    // RS formula
    const RS =
      -4.6946 +
      0.1786 * gender +
      -0.0081 * ageNum +
      0.209 * family +
      0.6187 * stiffness +
      0.6081 * nails +
      0.0358 * (stiffnessVAS / 10) +
      0.1695 * biologic +
      -0.1676 * health +
      0.6455 * pain +
      0.0225 * duration;

    console.log('RS value:', RS);

    const riskResult = (Math.exp(RS) / (1 + Math.exp(RS))) * 100;
    console.log('riskResult:', riskResult);
    showModal();
    setRiskResult(riskResult);

    return riskResult;
  };



  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const renderTextInput = (label, value, key, placeholder) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}*</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={text => updateFormData(key, text)}
        placeholder={placeholder}
        placeholderTextColor="#C7C7CC"
        keyboardType="number-pad" // <--- force number pad for numeric inputs
        returnKeyType="done"
        blurOnSubmit={true}
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

  return (
    <>
      <PaperProvider>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
          >
            <Portal>
              <SafeAreaView style={styles.safeArea}>
                <ScrollView
                  style={styles.scrollView}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  nestedScrollEnabled={true} // allow FlatList inside modal
                >
                  <View style={styles.header}>
                    <Text style={styles.headerTitle}>{t('form.title')}</Text>
                    {/* <Text style={styles.headerSubtitle}>
                                    5-year Risk of Developing Psoriatic Arthritis
                                </Text> */}
                  </View>

                  <View style={styles.formContainer}>
                    {renderRadioGroup(t('form.sex'), 'sex', [
                      { label: t('form.male'), value: '1' },
                      { label: t('form.female'), value: '0' },
                    ])}

                    {renderTextInput(
                      t('form.age'),
                      formData.age,
                      'age',
                      t('form.agePlaceholder')
                    )}

                    {renderRadioGroup(t('form.familyHistory'), 'familyHistory', [
                      { label: t('form.yes'), value: '1' },
                      { label: t('form.no'), value: '0' },
                    ])}

                    {renderRadioGroup(t('form.morningStiffness'), 'backStiffness', [
                      { label: t('form.yes'), value: '1' },
                      { label: t('form.no'), value: '0' },
                    ])}

                    {renderRadioGroup(t('form.nailPitting'), 'nailPitting', [
                      { label: t('form.yes'), value: '1' },
                      { label: t('form.no'), value: '0' },
                    ])}

                    {renderTextInput(
                      t('form.stiffnessLevel'),
                      formData.stiffnessLevel,
                      'stiffnessLevel',
                      '0–10'
                    )}

                    {renderRadioGroup(t('form.biologicTherapy'), 'biologicTherapy', [
                      { label: t('form.yes'), value: '1' },
                      { label: t('form.no'), value: '0' },
                    ])}

                    {renderRadioGroup(t('form.globalHealth'), 'globalHealth', [
                      { label: t('form.goodHealth'), value: '1' },
                      { label: t('form.poorHealth'), value: '0' },
                    ])}

                    {renderRadioGroup(t('form.painLevel'), 'painLevel', [
                      { label: t('form.pain'), value: '1' },
                      { label: t('form.noPain'), value: '0' },
                    ])}

                    {renderTextInput(
                      t('form.psoriasisDuration'),
                      formData.psoriasisDuration,
                      'psoriasisDuration',
                      t('form.durationPlaceholder')
                    )}
                  </View>

                </ScrollView>
                <View style={styles.submitButtonContainer}>
                  <TouchableOpacity
                    style={styles.submitButton}
                    activeOpacity={0.8}
                    onPress={() => {
                      calculateRisk(formData, setRiskResult, showModal);
                    }}

                  >
                    <Text style={styles.submitButtonText}>{t('form.submit')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.resetButton}
                    activeOpacity={0.8}
                    onPress={() => {
                      setFormData(defaultFormData);
                    }}
                  >
                    <Text style={styles.resetButtonText}>{t('form.reset')}</Text>
                  </TouchableOpacity>
                </View>


                {/* Result Modal */}
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                  <View style={styles.resultBox}>
                    <Text style={styles.resultTitle}>{t('form.resultTitle')}</Text>
                    <Text style={styles.resultValue}>
                      {typeof riskResult === 'number' && !isNaN(riskResult)
                        ? `${riskResult.toFixed(2)}%`
                        : 'N/A'}
                    </Text>



                    <View style={styles.submitButtonContainer}>
                      <TouchableOpacity
                        style={styles.resultCloseButton}
                        onPress={hideModal}
                      >
                        <Text style={styles.resultCloseText}>{t('form.close')}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.resultCloseButton}
                        onPress={hideModal}
                      >
                        <Text style={styles.resultCloseText}>{t('form.download')}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </SafeAreaView>
            </Portal>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </PaperProvider >
    </>
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