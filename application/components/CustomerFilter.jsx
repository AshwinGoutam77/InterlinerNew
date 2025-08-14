/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../src/constants/colors';
import { Modal, Portal } from 'react-native-paper';

export default function CustomerFilter({ show }) {
    const [visible, setVisible] = React.useState(show ? true : false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const customers = [
        { id: "1", name: "John Doe", email: "john@example.com", avatar: require("../../assets/images/user.jpg") },
        { id: "2", name: "Sarah Smith", email: "sarah@example.com", avatar: require("../../assets/images/user.jpg") },
        { id: "3", name: "Michael Lee", email: "michael@example.com", avatar: require("../../assets/images/user.jpg") },
        { id: "4", name: "John Doe", email: "john@example.com", avatar: require("../../assets/images/user.jpg") },
        { id: "5", name: "Sarah Smith", email: "sarah@example.com", avatar: require("../../assets/images/user.jpg") },
    ];
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => hideModal(item)}>
            <Image source={item.avatar} style={styles.avatar} />
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.email}</Text>
            </View>
            <Icon name="right" size={22} color="#888" />
        </TouchableOpacity>
    );

    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10, textAlign: 'center', flexDirection: 'column', alignItems: 'start', gap: 10, justifyContent: 'center' };
    return (
        <>
            <TouchableOpacity onPress={showModal} style={styles.customerContainer}>
                <View style={styles.userBox}>
                    <Icon name='user' size={22} style={styles.userIcon}></Icon>
                    {/* <Text style={styles.userText}>Select Customer</Text> */}
                    <Text style={styles.userText}>Sarah Smith</Text>
                </View>
                <View>
                    <Icon name='right' size={20} style={styles.userIcon}></Icon>
                </View>
            </TouchableOpacity>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    {/* Header */}
                    <View style={styles.customerModalHeading}>
                        <Text style={styles.title}>Select Customer</Text>
                        <TouchableOpacity onPress={hideModal}>
                            <Icon name="close" size={24} color="#888" />
                        </TouchableOpacity>
                    </View>

                    {/* List */}
                    <FlatList
                        data={customers}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                </Modal>
            </Portal>
        </>
    )
}

const styles = StyleSheet.create({
    customerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        marginTop: 12,
    },
    userBox: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    userText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    userIcon: {
        color: Colors.white,
        fontSize: 22,
        fontWeight: '600',
    },
    customerModalHeading: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
        marginRight: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
    },
    email: {
        fontSize: 14,
        color: "#666",
    },
    separator: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 5,
    },
})
