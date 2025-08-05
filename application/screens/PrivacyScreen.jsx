import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';

export default function PrivacyScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingVertical: 0 }} showsVerticalScrollIndicator={false}>
                <Text style={styles.statusHeader}>1. Types of data we collect</Text>
                <Text style={styles.statusDescription}>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.</Text>

                <Text style={styles.statusHeader}>2. Use of personal data</Text>
                <Text style={styles.statusDescription}>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.</Text>

                <Text style={styles.statusHeader}>3. Disclousre of your personal data</Text>
                <Text style={styles.statusDescription}>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fefefe',
        flex: 1,
        // paddingTop: 20,
        paddingHorizontal: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        paddingVertical: 26,
        marginVertical: 10,
        marginHorizontal: 1,
        alignItems: 'center',
        shadowColor: '#ccc',
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 2,
        marginBottom: 20
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 12,
        borderRadius: 8
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    productInfo: {
        fontSize: 14,
        color: '#666',
        marginVertical: 4
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    iconsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        alignItems: 'center',
        marginBottom: 8
    },
    iconStep: {
        flex: 1,
        alignItems: 'center',
        position: 'relative'
    },
    stepIcon: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 6
    },
    dottedLine: {
        position: 'absolute',
        top: 13,
        right: -20,
        width: 40,
        height: 2,
        borderStyle: 'dotted',
        borderWidth: 1,
        borderColor: '#aaa'
    },
    deliveryText: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 20
    },
    divider: {
        borderBottomWidth: 1,
        borderColor: '#eee',
        marginBottom: 16
    },
    statusHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
    statusDescription: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 10
    },
    statusItem: {
        flexDirection: 'row',
        marginBottom: 20
    },
    statusIconContainer: {
        alignItems: 'center',
        marginRight: 10
    },
    circleOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#1E3A8A',
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#000'
    },
    verticalLine: {
        width: 2,
        flex: 1,
        backgroundColor: '#ccc',
        marginTop: 4
    },
    statusDetails: {
        flex: 1
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    statusTitle: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    statusTime: {
        fontSize: 12,
        color: '#555'
    },
    statusLocation: {
        fontSize: 13,
        color: '#777',
        marginTop: 4
    }
});
