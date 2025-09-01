import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Modal, Portal } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import Colors from "../src/constants/colors";

const FeedbackModal = ({
    visible,
    hideModal,
    isRTL,
    feedbackMessage,
    setFeedbackMessage,
    feedbackRating,
    setFeedbackRating,
    onSubmit,
}) => {
    const containerStyle = {
        backgroundColor: "white",
        padding: 20,
        margin: 20,
        borderRadius: 10,
    };

    return (
        <Portal>
            <Modal
                visible={visible}
                transparent
                animationType="slide"
                contentContainerStyle={containerStyle}
            >
                {/* Close */}
                <TouchableOpacity onPress={hideModal} style={{ position: "absolute", right: 15, top: 15 }}>
                    <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
                    Feedback
                </Text>

                {/* Message */}
                <Text style={{ marginBottom: 5 }}>Message</Text>
                <TextInput
                    style={{
                        height: 100,
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 8,
                        padding: 10,
                        fontSize: 14,
                        backgroundColor: "#f9f9f9",
                        marginBottom: 15,
                        textAlign: isRTL ? "right" : "left",
                    }}
                    value={feedbackMessage}
                    onChangeText={setFeedbackMessage}
                    multiline
                    numberOfLines={4}
                    placeholder="Enter your feedback..."
                    textAlignVertical="top"
                />

                {/* Rating */}
                <Text style={{ marginBottom: 5 }}>Rating</Text>
                <View
                    style={{
                        flexDirection: isRTL ? "row-reverse" : "row",
                        gap: 10,
                        marginBottom: 10,
                    }}
                >
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <TouchableOpacity
                            key={rating}
                            style={{
                                backgroundColor: feedbackRating === rating ? Colors.primary : "#eee",
                                padding: 10,
                                borderRadius: 6,
                                width: 45,
                                alignItems: "center",
                            }}
                            onPress={() => setFeedbackRating(rating)}
                        >
                            <Text
                                style={{
                                    color: feedbackRating === rating ? Colors.white : "#000",
                                    fontWeight: "600",
                                }}
                            >
                                {rating}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Submit */}
                <TouchableOpacity
                    style={{
                        backgroundColor: Colors.primary,
                        paddingVertical: 14,
                        borderRadius: 6,
                        alignItems: "center",
                    }}
                    onPress={() => {
                        onSubmit && onSubmit({ feedbackMessage, feedbackRating });
                        hideModal();
                    }}
                >
                    <Text style={{ color: Colors.white, fontWeight: "600" }}>
                        Submit Feedback
                    </Text>
                </TouchableOpacity>
            </Modal>
        </Portal>
    );
};

export default FeedbackModal;
