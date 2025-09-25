/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../context/RTLContext";
import Colors from "../src/constants/colors";
import { useTranslation } from "react-i18next";
import SupportModal from "../modals/SupportModal";
import CreditInfoModal from "../modals/CreditInfoModal";
import { RoleContext } from "../context/RoleContext";
import GlobalStyles from "../src/constants/globalStyles";

const { width } = Dimensions.get("window");

const DashboardScreen = () => {
    const navigation = useNavigation();
    const { role } = useContext(RoleContext);
    const { isRTL } = useAppContext();
    const { t } = useTranslation();
    const [creditModalVisible, setCreditModalVisible] = useState(false);
    const [supportModalVisible, setSupportModalVisible] = useState(false);

    const quickActions = [
        {
            key: "startOrder",
            icon: "add-circle-outline",
            label: t("dashboard.startNewOrder"),
            screen: "CategoryScreen",
        },
        {
            key: "previousOrders",
            icon: "file-tray-full-outline",
            label: t("dashboard.previousOrders"),
            screen: "HistoryScreen",
        },
        {
            key: "trackOrder",
            icon: "locate-outline",
            label: t("dashboard.trackOrder"),
            screen: "TrackOrderListingScreen",
        },
        {
            key: "creditInfo",
            icon: "card-outline",
            label: t("dashboard.creditInfo"),
            screen: "",
        },
        {
            key: "payment",
            icon: "cash-outline",
            label: t("dashboard.payment"),
            screen: "PaymentScreen",
        },
        {
            key: "complain",
            icon: "alert-circle-outline",
            label: t("dashboard.complain"),
            screen: "RaiseComplainScreen",
        },
        {
            key: "incentive",
            icon: "alert-circle-outline",
            label: t("dashboard.incentive"),
            screen: "ReportsScreen",
        },
    ];

    return (
        <View style={GlobalStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Swiper Banner */}
                <View style={styles.swiperContainer}>
                    <Swiper
                        autoplay
                        autoplayTimeout={5}
                        autoplaySpeed={1000}
                        dotStyle={styles.dot}
                        activeDotStyle={styles.activeDot}
                        paginationStyle={{ bottom: 10 }}
                        height={180}
                    >
                        <TouchableOpacity style={styles.slide}>
                            <Image
                                source={require("../../assets/images/banner-add-1.png")}
                                style={styles.bannerImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.slide}>
                            <Image
                                source={require("../../assets/images/banner-add-2.png")}
                                style={styles.bannerImage}
                            />
                        </TouchableOpacity>
                    </Swiper>
                </View>

                {/* Quick Actions */}
                <Text
                    style={[
                        styles.quickActionHeading,
                        { textAlign: isRTL ? "right" : "left" },
                    ]}
                >
                    {t("dashboard.quickActions")}
                </Text>

                <View
                    style={[
                        styles.quickGrid,
                        { flexDirection: isRTL ? "row-reverse" : "row" },
                    ]}
                >
                    {quickActions.map((action, index) => {
                        if (
                            (action.key === "incentive" && role !== "sales") ||
                            (action.key === "creditInfo" && role === "sales")
                        ) {
                            return null;
                        }
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.quickItem,
                                    { alignItems: isRTL ? "flex-end" : "flex-start" },
                                ]}
                                onPress={() => {
                                    if (action.key === "creditInfo") {
                                        setCreditModalVisible(true);
                                    } else if (action.key === "support") {
                                        setSupportModalVisible(true);
                                    } else {
                                        navigation.navigate(action.screen);
                                    }
                                }}
                            >
                                <Icon name={action.icon} size={28} color={Colors.white} />
                                <Text
                                    style={[
                                        styles.quickLabel,
                                        { textAlign: isRTL ? "right" : "left" },
                                    ]}
                                >
                                    {action.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            {/* Modals */}
            <CreditInfoModal
                visible={creditModalVisible}
                onClose={() => setCreditModalVisible(false)}
            />
            <SupportModal
                visible={supportModalVisible}
                hideModal={() => setSupportModalVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContent: { paddingBottom: 10, paddingTop: 20 },
    swiperContainer: { marginTop: 0, height: 190 },
    slide: {
        borderRadius: 12,
        height: 190,
        padding: 0,
    },
    bannerImage: {
        width: "100%",
        height: 190,
        borderRadius: 12,
    },
    dot: { backgroundColor: "#ccc", width: 8, height: 8, borderRadius: 4 },
    activeDot: { backgroundColor: "#fff", width: 8, height: 8, borderRadius: 4 },
    quickActionHeading: {
        fontSize: 24,
        fontWeight: "700",
        marginVertical: 20,
        fontFamily: "Poppins-Regular",
    },
    quickGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    quickItem: {
        width: "47%",
        backgroundColor: Colors.primary,
        borderRadius: 12,
        padding: 26,
        marginBottom: 16,
        alignItems: "center",
    },
    quickLabel: {
        color: Colors.white,
        marginTop: 12,
        textAlign: "center",
        fontWeight: "700",
        fontSize: 16,
        fontFamily: "Poppins-bold",
    },
});

export default DashboardScreen;
