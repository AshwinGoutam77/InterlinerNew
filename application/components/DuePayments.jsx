import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../src/constants/colors";

export default function DuePayments() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("All");
    const [items, setItems] = useState([
        { label: "All", value: "All" },
        { label: "RAW MATERIALS", value: "RAW MATERIALS" },
        { label: "Oil Products", value: "Oil Products" },
        { label: "REJECTED GOODS", value: "REJECTED GOODS" },
        { label: "ACTIVE STOCK", value: "ACTIVE STOCK" },
        { label: "INACTIVE STOCK", value: "INACTIVE STOCK" },
        { label: "Packing Accessories", value: "Packing Accessories" },
        { label: "Uniform Raw Material", value: "Uniform Raw Material" },
        { label: "5555 Cream Collar", value: "5555 Cream Collar" },
        { label: "Uniform - FG", value: "Uniform - FG" },
        { label: "Reserved Group", value: "Reserved Group" },
        { label: "SBS", value: "SBS" },
    ]);

    const [data] = useState([
        {
            id: "1",
            customer: "MOIN IBRA INTERNATIONAL - IBRA, OMAN",
            amount: "AED 901",
            qty: "460",
            voucher: "SO2025-116",
            type: "RAW MATERIALS",
        },
        {
            id: "2",
            customer: "AL NAJAH ENTERPRISES",
            amount: "AED 1,275",
            qty: "220",
            voucher: "SO2025-104",
            type: "ACTIVE STOCK",
        },
        {
            id: "3",
            customer: "GENTS TAILORING LLC",
            amount: "AED 714",
            qty: "310",
            voucher: "SO2025-092",
            type: "Oil Products",
        },
    ]);

    const filteredData = useMemo(() => {
        if (value === "All") return data;
        return data.filter((item) => item.type === value);
    }, [value, data]);

    return (
        <View style={styles.container}>
            {/* Filter Dropdown */}
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select Type"
                style={styles.dropdown}
                textStyle={{ fontSize: 13 }}
                dropDownContainerStyle={{ borderColor: "#E5E7EB" }}
            />

            {/* Ledger Card */}
            <View style={styles.ledgerCard}>
                <View style={styles.headerSection}>
                    <View>
                        <Text style={styles.customerName}>Pending Sales Orders</Text>
                        <Text style={styles.yearRange}>Voucher Type: {value}</Text>
                    </View>
                    <View>
                        <Text style={styles.balanceLabel}>Total Amount</Text>
                        <Text style={[styles.balanceValue, { color: Colors.primary }]}>
                            AED {filteredData.reduce((sum, item) => sum + parseInt(item.amount.replace(/\D/g, "")), 0)}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <ScrollView style={{ maxHeight: 400 }} showsVerticalScrollIndicator={false}>
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <View key={item.id} style={styles.entryCard}>
                                <View style={styles.entryLeft}>
                                    <Text style={styles.voucherText}>{item.customer}</Text>
                                    <Text style={styles.refText}>Voucher: {item.voucher}</Text>
                                    <Text style={styles.entryDate}>Qty: {item.qty}</Text>
                                </View>
                                <View style={styles.entryRight}>
                                    <Text style={[styles.amountText, { color: Colors.primary }]}>{item.amount}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={{ textAlign: "center", marginTop: 20, color: "#6B7280" }}>
                            No records found.
                        </Text>
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: 12 },
    dropdown: {
        borderColor: "#E5E7EB",
        height: 36,
        marginBottom: 20,
    },
    ledgerCard: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
    },
    headerSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    customerName: { fontSize: 16, fontWeight: "700", color: "#111827" },
    yearRange: { fontSize: 13, color: "#6B7280", marginTop: 2 },
    balanceLabel: { fontSize: 13, color: "#6B7280", textAlign: "right" },
    balanceValue: { fontSize: 14, fontWeight: "600", textAlign: "right" },
    divider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 12 },
    entryCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: "#E5E7EB",
    },
    entryLeft: { flex: 1 },
    voucherText: { fontWeight: "600", fontSize: 13, color: "#111" },
    entryDate: { fontSize: 12, color: "#6B7280", marginTop: 2 },
    refText: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
    entryRight: { minWidth: 80, alignItems: "flex-end", justifyContent: "center" },
    amountText: { fontWeight: "700", fontSize: 13 },
});
