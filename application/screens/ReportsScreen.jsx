import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import Colors from "../src/constants/colors";
import OutstandingReports from "../components/OutstandingReports";
import DuePayments from "../components/DuePayments";
import SalesOrderTab from "../components/SalesOrderTab";

const reportTabs = [
  { key: "outstanding", label: "Customer Outstanding" },
  { key: "followup", label: "Follow-up Customers" },
  { key: "duePayments", label: "Due for Payment" },
  { key: "inactive", label: "Inactive Customers" },
  { key: "summary", label: "Sales Summary" },
];

export default function ReportScreen() {
  const [activeTab, setActiveTab] = useState(reportTabs[0].key);

  const renderOutstandingReport = () => {
    const data = [
      {
        id: "1",
        voucher: "IL2025-4774",
        date: "19 Aug 25",
        type: "Sales",
        ref: "Ref # AS-25/1381",
        amount: "AED 5,634",
        isCredit: false,
      },
      {
        id: "2",
        voucher: "IL2025-3307",
        date: "27 May 25",
        type: "Receipt",
        ref: "Ref # AS-25/1375",
        amount: "AED 714",
        isCredit: true,
      },
    ];

    return (
      <View style={styles.ledgerCard}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View>
            <Text style={styles.customerName}>007 GENTS TAILOR</Text>
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

        {/* Ledger Entries */}
        <ScrollView style={{ maxHeight: 400 }} showsVerticalScrollIndicator={false}>
          {data.map((item) => (
            <View key={item.id} style={styles.entryCard}>
              <View style={styles.entryLeft}>
                <Text style={styles.voucherText}>{item.voucher}</Text>
                <View style={styles.row}>
                  <Text style={styles.entryDate}>{item.date}</Text>
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
          ))}
        </ScrollView>

        <View style={styles.divider} />

        {/* Closing Balance */}
        <View style={styles.closingSection}>
          <Text style={styles.closingLabel}>Closing Balance</Text>
          <Text style={[styles.closingValue, { color: "#15803D" }]}>
            AED 1,428
          </Text>
        </View>
      </View>
    );
  };

  const renderDuePayments = () => {
    const data = [
      {
        id: "1",
        customer: "MOIN IBRA INTERNATIONAL - IBRA, OMAN",
        amount: "AED 901",
        qty: "460",
        voucher: "SO2025-116",
      },
      {
        id: "2",
        customer: "AL NAJAH ENTERPRISES",
        amount: "AED 1,275",
        qty: "220",
        voucher: "SO2025-104",
      },
      {
        id: "3",
        customer: "GENTS TAILORING LLC",
        amount: "AED 714",
        qty: "310",
        voucher: "SO2025-092",
      },
    ];

    return (
      <View style={styles.ledgerCard}>
        <View style={styles.headerSection}>
          <View>
            <Text style={styles.customerName}>Pending Sales Orders</Text>
            <Text style={styles.yearRange}>Voucher Type: All</Text>
          </View>
          <View>
            <Text style={styles.balanceLabel}>Total Amount</Text>
            <Text style={[styles.balanceValue, { color: Colors.primary }]}>
              AED 2,890
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <ScrollView style={{ maxHeight: 400 }} showsVerticalScrollIndicator={false}>
          {data.map((item) => (
            <View key={item.id} style={styles.entryCard}>
              <View style={styles.entryLeft}>
                <Text style={styles.voucherText}>{item.customer}</Text>
                <Text style={styles.refText}>Voucher: {item.voucher}</Text>
                <Text style={styles.entryDate}>Qty: {item.qty}</Text>
              </View>
              <View style={styles.entryRight}>
                <Text style={[styles.amountText, { color: Colors.primary }]}>
                  {item.amount}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderInactiveCustomers = () => {
    const data = [
      {
        id: "1",
        name: "AL SAFA TAILORING LLC",
        lastOrder: "15 Mar 2024",
        totalOrders: "12",
        totalValue: "AED 8,450",
      },
      {
        id: "2",
        name: "CITY MENS TAILOR",
        lastOrder: "27 Feb 2024",
        totalOrders: "9",
        totalValue: "AED 5,620",
      },
      {
        id: "3",
        name: "ROYAL CLASSIC GARMENTS",
        lastOrder: "10 Jan 2024",
        totalOrders: "5",
        totalValue: "AED 3,275",
      },
    ];

    return (
      <View style={styles.ledgerCard}>
        <View style={styles.headerSection}>
          <View>
            <Text style={styles.customerName}>Inactive Customers</Text>
            <Text style={styles.yearRange}>No orders since Apr 2024</Text>
          </View>
          <View>
            <Text style={styles.balanceLabel}>Total Inactive</Text>
            <Text style={[styles.balanceValue, { color: Colors.primary }]}>
              {data.length}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <ScrollView style={{ maxHeight: 400 }} showsVerticalScrollIndicator={false}>
          {data.map((item) => (
            <View key={item.id} style={styles.entryCard}>
              <View style={styles.entryLeft}>
                <Text style={styles.voucherText}>{item.name}</Text>
                <Text style={styles.entryDate}>Last Order: {item.lastOrder}</Text>
                <Text style={styles.refText}>
                  Orders: {item.totalOrders} | Value: {item.totalValue}
                </Text>
              </View>
              <View style={styles.entryRight}>
                <View style={[styles.typeBadge, { backgroundColor: "#FEF9C3" }]}>
                  <Text style={[styles.typeText, { color: "#92400E" }]}>Inactive</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };


  const renderContent = () => {
    switch (activeTab) {
      case "outstanding":
        return <OutstandingReports />;
      case "followup":
        return <Text style={styles.content}>Follow-up Customers Report</Text>;
      case "duePayments":
        return <DuePayments />;
      case "inactive":
        return renderInactiveCustomers()
      case "summary":
        return <SalesOrderTab />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Tabs */}
        <FlatList
          data={reportTabs}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === item.key && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab(item.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === item.key && styles.activeTabText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Content */}
        <View style={styles.contentContainer}>{renderContent()}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#fdfdfd",
    padding: 16,
    height: "100%",
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
    marginRight: 8,
  },
  activeTabButton: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 13,
    color: Colors.black,
    fontWeight: "500",
  },
  activeTabText: {
    color: Colors.white,
  },
  contentContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },

  ledgerCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
    // elevation: 3,
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
  entryLeft: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  voucherText: {
    fontWeight: "600",
    fontSize: 13,
    color: "#111",
  },
  entryDate: {
    fontSize: 12,
    color: "#6B7280",
    marginRight: 8,
  },
  refText: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
  typeBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  typeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  entryRight: {
    minWidth: 80,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  amountText: {
    fontWeight: "700",
    fontSize: 13,
  },
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
  content: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
});
