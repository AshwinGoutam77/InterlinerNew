/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from "../screens/Home";
import PsA5YearRiskCalculator from "../screens/PsA5YearRiskCalculator";
import PsA1YearRiskCalculator from "../screens/PsA1YearRiskCalculator";
import CustomHeader from "../components/header";
import InquiryForm from "../screens/InquiryForm";
import AboutUs from "../screens/AboutUs";
import { Pressable, TouchableWithoutFeedback, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DashboardScreen from "../screens/Dashboard";
import CategoryScreen from "../screens/CategoryScreen";
import ProductsPage from "../screens/Products";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

var styles = require("../../assets/files/Styles");

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const navigationOptions = {
    headerStyle: styles.headerStyle,
    headerBackTitle: null,
    headerTintColor: "#fff",
    headerTitleAlign: "center",
    headerTitleStyle: {
        textAlign: "center",
        alignSelf: "center",
        justifyContent: "space-between",
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    headerBackTitleVisible: false,
};

// Stack for Home Tab
function HomeStack() {
    return (
        <Stack.Navigator screenOptions={navigationOptions}>
            <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    header: () => <CustomHeader title="PRESTO-PsA" />,
                }}
            />
            <Stack.Screen
                name="CategoryScreen"
                component={CategoryScreen}
                options={{
                    header: () => <CustomHeader title="PRESTO-PsA" />,
                }}
            />
            <Stack.Screen
                name="ProductsPage"
                component={ProductsPage}
                options={{
                    header: () => <CustomHeader title="PRESTO-PsA" />,
                }}
            />
            <Stack.Screen
                name="ProductDetailScreen"
                component={ProductDetailScreen}
                options={{
                    header: () => <CustomHeader title="PRESTO-PsA" />,
                }}
            />
        </Stack.Navigator>
    );
}

function AboutStack() {
    return (
        <Stack.Navigator screenOptions={navigationOptions}>
            <Stack.Screen
                name="AboutUs"
                component={AboutUs}
                options={{
                    header: () => <CustomHeader title="PRESTO-PsA" />,
                }}
            />
        </Stack.Navigator>
    )
}

function ProfileScreen() {
    return (
        <Stack.Navigator screenOptions={navigationOptions}>
            <Stack.Screen
                name="InquiryForm"
                component={InquiryForm}
                options={{
                    header: () => <CustomHeader title="PRESTO-PsA" />,
                }}
            />
        </Stack.Navigator>
    )
}

const tabBarIcon = (route) => ({ color, size }) => {
    let iconName = route.name === 'Home'
        ? 'dashboard'
        : route?.name === 'profile'
            ? 'person-outline' : route?.name === 'payment' ? 'payment'
                : 'file-copy';
    return <Ionicons name={iconName} size={size} color={color} />;
};

export default function Logged() {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();

    const getTabBarVisibility = (route) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Dashboard';

        if ([
            'ProductDetailScreen',
        ].includes(routeName)) {
            return 'none'; // Hide tab bar
        }

        return 'flex'; // Show tab bar
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#1E3A8A',
                tabBarInactiveTintColor: 'black',
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    fontFamily: 'Poppins-Regular',
                },
                tabBarStyle: {
                    height: 60 + insets.bottom,
                    paddingBottom: 15,
                    paddingTop: 15,
                    backgroundColor: '#fff',
                    display: getTabBarVisibility(route),
                },
                tabBarIcon: tabBarIcon(route),
                tabBarButton: (props) => (
                    <Pressable
                        onPress={props.onPress}
                        style={({ pressed }) => [
                            {
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderLeftWidth: pressed ? 2 : 0,
                                borderRightWidth: pressed ? 2 : 0,
                                borderColor: pressed ? '#cccccc2b' : 'transparent',
                                backgroundColor: 'transparent',
                            },
                        ]}
                    >
                        {props.children}
                    </Pressable>
                ),
            })}
        >

            <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: t('tabs.home') }} />
            <Tab.Screen name="raise-complaint" component={HomeStack} options={{ tabBarLabel: t('tabs.raise-complaint') }} />
            <Tab.Screen name="payment" component={HomeStack} options={{ tabBarLabel: t('tabs.payment') }} />
            <Tab.Screen name="profile" component={HomeStack} options={{ tabBarLabel: t('tabs.profile') }} />
        </Tab.Navigator>
    );
}
