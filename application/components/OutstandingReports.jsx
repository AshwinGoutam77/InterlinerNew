import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Platform,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../src/constants/colors";

export default function OutstandingReports() {
    // Dropdown states
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]); // array for multiple selection
    const [items, setItems] = useState([
        { label: "007 GENTS TAILOR", value: "007 GENTS TAILOR" },
        { label: "CITY MENS TAILOR", value: "CITY MENS TAILOR" },
        { label: "ROYAL CLASSIC GARMENTS", value: "ROYAL CLASSIC GARMENTS" },
    ]);

    // Date picker states
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [showPicker, setShowPicker] = useState({ show: false, type: "" });

    // Ledger data
    const [data] = useState([
        {
            id: "1",
            customer: "007 GENTS TAILOR",
            voucher: "IL2025-4774",
            date: "2025-08-19",
            type: "Sales",
            ref: "Ref # AS-25/1381",
            amount: "AED 5,634",
            isCredit: false,
        },
        {
            id: "2",
            customer: "CITY MENS TAILOR",
            voucher: "IL2025-3307",
            date: "2025-05-27",
            type: "Receipt",
            ref: "Ref # AS-25/1375",
            amount: "AED 714",
            isCredit: true,
        },
        {
            id: "3",
            customer: "ROYAL CLASSIC GARMENTS",
            voucher: "IL2025-3201",
            date: "2025-04-15",
            type: "Sales",
            ref: "Ref # AS-25/1360",
            amount: "AED 1,200",
            isCredit: false,
        },
    ]);

    // Filtered data (memoized)
    const filteredData = useMemo(() => {
        return data.filter((item) => {
            // Customer filter (supports multiple selection)
            const matchesCustomer =
                value.length > 0 ? value.includes(item.customer) : true;

            // Date filter
            const itemDate = new Date(item.date);
            const matchesFromDate = fromDate ? itemDate >= fromDate : true;
            const matchesToDate = toDate ? itemDate <= toDate : true;

            return matchesCustomer && matchesFromDate && matchesToDate;
        });
    }, [data, value, fromDate, toDate]);

    const handleFilterClick = () => {
        console.log("Filtering:", { value, fromDate, toDate });
        // All filtering is already done in `filteredData`
    };

    return (
        <View style={styles.container}>
            {/* Filter Section */}
            <View style={styles.filterContainer}>
                {/* Customer Dropdown */}
                <DropDownPicker
                    multiple={true}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Select Customer"
                    style={styles.dropdown}
                    textStyle={{ fontSize: 13 }}
                    dropDownContainerStyle={{ borderColor: "#E5E7EB" }}
                    zIndex={1000}
                />

                {/* Date Filters */}
                <View style={styles.dateRow}>
                    <TouchableOpacity
                        style={styles.dateInput}
                        onPress={() => setShowPicker({ show: true, type: "from" })}
                    >
                        <Text style={styles.dateText}>
                            {fromDate ? fromDate.toLocaleDateString() : "From Date"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.dateInput}
                        onPress={() => setShowPicker({ show: true, type: "to" })}
                    >
                        <Text style={styles.dateText}>
                            {toDate ? toDate.toLocaleDateString() : "To Date"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.filterBtn} onPress={handleFilterClick}>
                        <Text style={styles.filterText}>Filter</Text>
                    </TouchableOpacity>
                </View>

                {showPicker.show && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowPicker({ show: false, type: "" });
                            if (selectedDate) {
                                showPicker.type === "from"
                                    ? setFromDate(selectedDate)
                                    : setToDate(selectedDate);
                            }
                        }}
                    />
                )}
            </View>

            {/* Ledger Section */}
            <View style={styles.ledgerCard}>
                <View style={styles.headerSection}>
                    <View>
                        <Text style={styles.customerName}>Customer Ledger</Text>
                        <Text style={styles.yearRange}>01 Apr 25 - 31 Mar 26</Text>
                    </View>
                    <View>
                        <Text style={styles.balanceLabel}>Opening Balance</Text>
                        <Text style={[styles.balanceValue, { color: Colors.red }]}>
                            AED 5,634
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <ScrollView style={{ maxHeight: 400 }} showsVerticalScrollIndicator={false}>
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <View key={item.id} style={styles.entryCard}>
                                <View style={styles.entryLeft}>
                                    <Text style={styles.voucherText}>{item.voucher}</Text>
                                    <View style={styles.row}>
                                        <Text style={styles.entryDate}>
                                            {new Date(item.date).toLocaleDateString()}
                                        </Text>
                                        <View
                                            style={[
                                                styles.typeBadge,
                                                { backgroundColor: item.isCredit ? "#DCFCE7" : "#FEE2E2" },
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.typeText,
                                                    { color: item.isCredit ? "#15803D" : "#B91C1C" },
                                                ]}
                                            >
                                                {item.type}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={styles.refText}>{item.ref}</Text>
                                </View>
                                <View style={styles.entryRight}>
                                    <Text
                                        style={[
                                            styles.amountText,
                                            { color: item.isCredit ? "#15803D" : "#B91C1C" },
                                        ]}
                                    >
                                        {item.amount}
                                    </Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={{ textAlign: "center", marginTop: 20, color: "#6B7280" }}>
                            No records found.
                        </Text>
                    )}
                </ScrollView>

                <View style={styles.divider} />

                <View style={styles.closingSection}>
                    <Text style={styles.closingLabel}>Closing Balance</Text>
                    <Text style={[styles.closingValue, { color: "#15803D" }]}>
                        AED 1,428
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
    },
    filterContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        borderBottomWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: 0,
        paddingBottom: 30,
    },
    dropdown: {
        borderColor: "#E5E7EB",
        height: 36,
        marginBottom: 20,
    },
    dateRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    dateInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    dateText: {
        color: "#111827",
        fontSize: 13,
    },
    filterBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    filterText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 13,
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
    customerName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
    },
    yearRange: {
        fontSize: 13,
        color: "#6B7280",
        marginTop: 2,
    },
    balanceLabel: {
        fontSize: 13,
        color: "#6B7280",
        textAlign: "right",
    },
    balanceValue: {
        fontSize: 14,
        fontWeight: "600",
        textAlign: "right",
    },
    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 12,
    },
    entryCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: "#E5E7EB",
    },
    entryLeft: { flex: 1 },
    row: { flexDirection: "row", alignItems: "center", marginTop: 2 },
    voucherText: { fontWeight: "600", fontSize: 13, color: "#111" },
    entryDate: { fontSize: 12, color: "#6B7280", marginRight: 8 },
    refText: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
    typeBadge: { paddingVertical: 2, paddingHorizontal: 8, borderRadius: 10 },
    typeText: { fontSize: 11, fontWeight: "600" },
    entryRight: {
        minWidth: 80,
        alignItems: "flex-end",
        justifyContent: "center",
    },
    amountText: { fontWeight: "700", fontSize: 13 },
    closingSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 8,
    },
    closingLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#111827",
    },
    closingValue: {
        fontSize: 14,
        fontWeight: "700",
    },
});
