import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import Colors from "../src/constants/colors";

const reportTabs = [
  { key: "outstanding", label: "Customer Outstanding" },
  { key: "followup", label: "Follow-up Customers" },
  { key: "duePayments", label: "Due for Payment" },
  { key: "inactive", label: "Inactive Customers" },
  { key: "summary", label: "Sales Summary" },
];

export default function ReportScreen() {
  const [activeTab, setActiveTab] = useState(reportTabs[0].key);

  const renderContent = () => {
    switch (activeTab) {
      case "outstanding":
        return <Text style={styles.content}>Customer Outstanding Report</Text>;
      case "followup":
        return <Text style={styles.content}>Follow-up Customers Report</Text>;
      case "duePayments":
        return <Text style={styles.content}>Customers Due for Payment</Text>;
      case "inactive":
        return <Text style={styles.content}>Inactive Customers Report</Text>;
      case "summary":
        return <Text style={styles.content}>Sales Summary Report</Text>;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
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

        <View style={styles.contentContainer}>{renderContent()}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
    backgroundColor: "#fdfdfd",
    padding: 16,
    height: '100%'
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
    marginRight: 10,
    alignSelf: "flex-start",
  },
  activeTabButton: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: "500",
  },
  activeTabText: {
    color: Colors.white,
  },
  contentContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
  },
  content: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
});
