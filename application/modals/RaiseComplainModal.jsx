import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Platform, PermissionsAndroid } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Modal, Portal } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import Colors from "../src/constants/colors";
import { launchImageLibrary } from "react-native-image-picker";
import AudioRecord from "react-native-audio-record";
import RNFS from 'react-native-fs';

export default function ComplaintModal({ visible, onClose, onSubmit, isRTL }) {
    const [complaint, setComplaint] = useState("");
    const [orderId, setOrderId] = useState("");
    const [audioFile, setAudioFile] = useState("");
    const [recording, setRecording] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [recordModalVisible, setRecordModalVisible] = useState(false);
    const [time, setTime] = useState(0);
    let timerRef = null;

    const handleAttachPhoto = () => {
        launchImageLibrary({ mediaType: "photo", quality: 0.7 }, (response) => {
            if (!response.didCancel && !response.errorCode) {
                console.log("Selected image:", response.assets[0].uri);
            }
        });
    };


    useEffect(() => {
        (async () => {
            await requestPermission();
            initAudioRecord();
            setIsReady(true);
        })();
    }, []);

    // Ask for microphone permission (Android only)
    const requestPermission = async () => {
        if (Platform.OS === "android") {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: "Microphone Permission",
                    message: "This app needs access to your microphone to record audio",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Microphone permission denied");
            }
        }
    };

    // Initialize AudioRecord
    const initAudioRecord = () => {
        AudioRecord.init({
            sampleRate: 16000, // default 44100
            channels: 1, // 1 or 2
            bitsPerSample: 16, // 8 or 16
            audioSource: 6, // android only
            wavFile: "test.wav",
        });
    };

    const startRecording = async () => {
        if (!isReady) return;
        setRecording(true);
        setAudioFile("");
        setTime(0);
        setRecordModalVisible(true);
        await AudioRecord.start();
        console.log("Recording started...");

        // start timer
        timerRef = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);
    };

    const stopRecording = async () => {
        if (!recording) return;
        const audioPath = await AudioRecord.stop();
        console.log("Recording stopped:", audioPath);
        setRecording(false);
        setAudioFile(audioPath);
        clearInterval(timerRef);
        setRecordModalVisible(false);
        await exportFile(audioPath);
    };

    const exportFile = async (filePath) => {
        const destPath = RNFS.DownloadDirectoryPath + '/test.wav'; // /storage/emulated/0/Download/test.wav
        await RNFS.copyFile(filePath, destPath);
        console.log('File copied to:', destPath);
    };

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.container}>
                {/* Close */}
                <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                    <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.title}>Make Complaint</Text>

                {/* Attach Photo */}
                <TouchableOpacity
                    style={[styles.attachPhotoBtn, { flexDirection: isRTL ? "row-reverse" : "row" }]}
                    onPress={handleAttachPhoto}
                >
                    <Icon name="camera" size={20} color={Colors.white} />
                    <Text style={styles.attachPhotoText}>Attach Photo</Text>
                </TouchableOpacity>

                {/* Order Picker */}
                <Text style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}>Select Order</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={orderId}
                        onValueChange={(value) => setOrderId(value)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Choose Order" value="" />
                        <Picker.Item label="23666" value="23666" />
                        <Picker.Item label="23667" value="23667" />
                    </Picker>
                </View>

                {/* Complaint text */}
                <View style={styles.orderRow}>
                    <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>Your Complaint</Text>
                    <TouchableOpacity onPress={startRecording} disabled={!isReady}>
                        <Image
                            source={require('../../assets/images/mike.png')}
                            style={{ width: 20, height: 26, borderRadius: 100 }}
                        />
                    </TouchableOpacity>

                </View>
                <TextInput
                    style={[styles.textarea, { textAlign: isRTL ? "right" : "left" }]}
                    value={complaint}
                    onChangeText={setComplaint}
                    multiline
                    numberOfLines={5}
                    placeholder="Describe your issue..."
                    textAlignVertical="top"
                />

                {/* Audio file preview */}
                {audioFile ? (
                    <View style={styles.audioResultBox}>
                        <View style={styles.audioLeft}>
                            <Icon name="sound" size={22} color={Colors.primary} />
                            <Text style={styles.audioFileName}>{audioFile.split("/").pop()}</Text>
                        </View>
                        <TouchableOpacity onPress={() => setAudioFile("")}>
                            <Icon name="delete" size={22} color="black" />
                        </TouchableOpacity>
                    </View>
                ) : null}

                {/* Submit */}
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={() => {
                        onSubmit({ orderId, complaint, audioFile });
                        onClose();
                    }}
                >
                    <Text style={styles.submitText}>Submit Complaint</Text>
                </TouchableOpacity>
            </Modal>

            <Modal
                visible={recordModalVisible}
                transparent
                animationType="fade"
                contentContainerStyle={{
                    backgroundColor: "white",
                    padding: 20,
                    margin: 40,
                    borderRadius: 12,
                    alignItems: "center",
                }}
            >
                {/* Pulsing mic */}
                <View style={{ marginBottom: 15 }}>
                    <View style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: Colors.primary,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Icon name="sound" size={36} color="white" />
                    </View>
                </View>

                {/* Timer */}
                <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
                    {String(Math.floor(time / 60)).padStart(2, "0")}:
                    {String(time % 60).padStart(2, "0")}
                </Text>

                {/* Stop button */}
                <TouchableOpacity
                    onPress={stopRecording}
                    style={{
                        backgroundColor: Colors.primary,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 8,
                    }}
                >
                    <Text style={{ color: "white", fontSize: 16 }}>Stop</Text>
                </TouchableOpacity>
            </Modal>
        </Portal>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    closeIcon: { position: "absolute", right: 15, top: 15, zIndex: 1 },
    title: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
    pickerWrapper: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginBottom: 10 },
    picker: { height: 50, width: "100%" },
    textarea: { height: 100, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10 },
    attachPhotoBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 8,
        gap: 10,
        marginBottom: 10, width: '40%',
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 5
    },
    attachPhotoText: { color: Colors.white, fontSize: 14, fontWeight: "600" },
    submitBtn: { backgroundColor: Colors.primary, padding: 14, borderRadius: 8, marginTop: 12 },
    submitText: { color: Colors.white, textAlign: "center", fontWeight: "600" },
    audioResultBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        borderWidth: 1,
        borderColor: "#ccc9",
        borderRadius: 10,
        marginTop: 12,
    },
    audioLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
    audioFileName: { fontSize: 15, fontWeight: "500" },
    orderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4
    },
});
