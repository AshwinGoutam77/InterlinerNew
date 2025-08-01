// components/RoleSelectorModal.js
import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

export default function RoleSelectorModal({ visible, onSelect }) {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Select your role</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onSelect('physician')}
                    >
                        <Text style={styles.buttonText}>Physician</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onSelect('patient')}
                    >
                        <Text style={styles.buttonText}>Patient</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        marginBottom: 16,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: '#6851a4',
        borderRadius: 5,
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
        fontFamily: 'Poppins-Regular',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
