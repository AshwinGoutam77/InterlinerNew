import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Modal, Portal } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import Colors from "../src/constants/colors";

const RecordModal = ({ visible, time, stopRecording }) => {
    return (
        <Portal>
            <Modal
                visible={visible}
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
                {/* Mic */}
                <View style={{ marginBottom: 15 }}>
                    <View
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                            backgroundColor: Colors.primary,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Icon name="sound" size={36} color="white" />
                    </View>
                </View>

                {/* Timer */}
                <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
                    {String(Math.floor(time / 60)).padStart(2, "0")}:
                    {String(time % 60).padStart(2, "0")}
                </Text>

                {/* Stop */}
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
};

export default RecordModal;
