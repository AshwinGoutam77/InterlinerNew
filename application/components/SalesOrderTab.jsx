import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Colors from "../src/constants/colors";

export default function SalesOrderTab() {
    const [data] = useState([
        {
            id: "1",
            customer: "Al Mamary International L.L.C - Oman",
            contact: "Al Mamary International L.L.C - Oman",
            lastSale: "26 Aug 25",
            email: "",
            phone: "24798352 / 99347239",
        },
        {
            id: "2",
            customer: "AL NAQYAN MEN'S TAILORING LLC - AL YAHAR AL AIN",
            contact: "AL NAQYAN MEN'S TAILORING LLC - AL YAHAR AL AIN",
            lastSale: "26 Aug 25",
            email: "",
            phone: "+971 3 7210042 / 50 746 9193",
        },
        {
            id: "3",
            customer: "ABDULLAH HUSSAIN KHUNJI GENTS GARMENTS - AL AIN",
            contact: "ABDULLAH HUSSAIN KHUNJI GENTS GARMENTS - AL AIN",
            lastSale: "25 Aug 25",
            email: "",
            phone: "03 7551288",
        },
        {
            id: "4",
            customer: "GENTLEMAN TAILOR - HILLI, AL AIN",
            contact: "MD. HAFEEZ",
            lastSale: "25 Aug 25",
            email: "",
            phone: "054-4093720",
        },
        {
            id: "5",
            customer: "SHABAB AL HILI TAILORING AND GENTS TEXTILES - AL AIN",
            contact: "ABDUL LATIF / ABDUL GAFFAR",
            lastSale: "25 Aug 25",
            email: "",
            phone: "050 5353857",
        },
        {
            id: "6",
            customer: "AL ARABI AL THAHABI GENTS TAILORING ALAIN",
            contact: "AL ARABI AL THAHABI",
            lastSale: "25 Aug 25",
            email: "",
            phone: "",
        },
        {
            id: "7",
            customer: "AL MAGHREB MENS TAILORING LLC BRANCH AL AIN",
            contact: "AL MAGHREB MENS TAILORING",
            lastSale: "25 Aug 25",
            email: "",
            phone: "03-7664123 / 050 1366118",
        },
        // Add remaining rows similarly...
    ]);

    return (
        <View style={styles.container}>
            {/* <View style={styles.ledgerCard}> */}
            <View style={styles.headerSection}>
                <Text style={styles.customerName}>Sales Orders / Customer Contacts</Text>
            </View>

            <View style={styles.divider} />

            <ScrollView style={{ maxHeight: 460 }} showsVerticalScrollIndicator={false}>
                {data.map(item => (
                    <View key={item.id} style={styles.entryCard}>
                        <View style={styles.entryLeft}>
                            <Text style={styles.voucherText}>{item.customer}</Text>
                            <Text style={styles.refText}>Contact: {item.contact}</Text>
                            <Text style={styles.entryDate}>Last Sale: {item.lastSale}</Text>
                            {item.email ? <Text style={styles.refText}>Email: {item.email}</Text> : null}
                        </View>
                        <View style={styles.entryRight}>
                            <Text style={[styles.amountText, { color: Colors.primary }]}>
                                {item.phone}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
            {/* </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: 12, padding: 12 },
    ledgerCard: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
    },
    headerSection: { marginBottom: 0 },
    customerName: { fontSize: 16, fontWeight: "700", color: "#111827" },
    divider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 12 },
    entryCard: {
        flexDirection: "column",
        gap: 10,
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: "#595d645d",
    },
    entryLeft: {
        flex: 10,          // take 70% width
        paddingRight: 8,    // spacing from right column
    },
    entryRight: {
        flex: 0.1,
        flexWrap: 'wrap',          // take 30% width
        alignItems: "flex-end",
        justifyContent: "right",
    },

    voucherText: { fontWeight: "600", fontSize: 13, color: "#111" },
    entryDate: { fontSize: 12, color: "#6B7280", marginTop: 2 },
    refText: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
    // entryRight: { minWidth: 100, alignItems: "flex-end", justifyContent: "center" },
    amountText: { fontWeight: "700", fontSize: 13 },
});
