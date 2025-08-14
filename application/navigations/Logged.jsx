/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from "../screens/Home";
import PsA5YearRiskCalculator from "../screens/PsA5YearRiskCalculator";
import PsA1YearRiskCalculator from "../screens/PsA1YearRiskCalculator";
import CustomHeader from "../components/header";
import InquiryForm from "../screens/InquiryForm";
import AboutUs from "../screens/AboutUs";
import { Alert, I18nManager, Linking, Pressable, Text, TouchableWithoutFeedback, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DashboardScreen from "../screens/Dashboard";
import CategoryScreen from "../screens/CategoryScreen";
import ProductsPage from "../screens/Products";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import CartScreen from "../screens/Cart";
import CheckoutScreen from "../screens/CategoryScreen";
import Checkout from "../screens/Checkout";
import ShippingScreen from "../screens/ShippingScreen";
import AddNewAddressScreen from "../screens/AddNewAddressScreen ";
import AddShippingScreen from "../screens/AddShippingScreen";
import PromoCodeScreen from "../screens/PromoCode";
import PaymentMethodScreen from "../screens/PaymentMethodScreen";
import TrackOrderScreen from "../screens/TrackOrderScreen";
import HistoryScreen from "../screens/HistoryScreen";
import RaiseComplainScreen from "../screens/RaiseComplain";
import PaymentScreen from "../screens/PaymentScreen";
import ProfilePage from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfile";
import PrivacyScreen from "../screens/PrivacyScreen";
import LanguageScreen from "../screens/LanguageScreen";
import HelpCenterScreen from "../screens/HelpCenterScreen";
import NotificationScreen from "../screens/NotificationScreen";
import CurrencyScreen from "../screens/CurrencyScreen";
import TrackOrderListingScreen from "../screens/TrackOrdersListing";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import Colors from "../src/constants/colors";
import RepeatOrderScreen from "../screens/RepeatOrderScreen";

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
                    header: () => <CustomHeader title="Interliner" />,
                }}
            />
            <Stack.Screen
                name="CategoryScreen"
                component={CategoryScreen}
                options={{
                    header: () => <CustomHeader title="Categories" />,
                }}
            />
            <Stack.Screen
                name="ProductsPage"
                component={ProductsPage}
                options={{
                    header: () => <CustomHeader title="Collar" />,
                }}
            />
            <Stack.Screen
                name="ProductDetailScreen"
                component={ProductDetailScreen}
                options={({ route }) => ({
                    header: () => <CustomHeader title={route.params?.productName || 'Product Detail'} />,
                })}
            />

            <Stack.Screen
                name="CartScreen"
                component={CartScreen}
                options={{
                    header: () => <CustomHeader title="Shopping Bag" />,
                }}
            />
            <Stack.Screen
                name="CheckoutScreen"
                component={Checkout}
                options={{
                    header: () => <CustomHeader title="Checkout" />,
                }}
            />
            <Stack.Screen
                name="ShippingScreen"
                component={ShippingScreen}
                options={{
                    header: () => <CustomHeader title="Shipping Address" />,
                }}
            />
            <Stack.Screen
                name="AddNewAddressScreen"
                component={AddNewAddressScreen}
                options={{
                    header: () => <CustomHeader title="New Address" />,
                }}
            />
            <Stack.Screen
                name="AddShippingScreen"
                component={AddShippingScreen}
                options={{
                    header: () => <CustomHeader title="Choose Shipping" />,
                }}
            />
            <Stack.Screen
                name="PromoCodeScreen"
                component={PromoCodeScreen}
                options={{
                    header: () => <CustomHeader title="Promo Code" />,
                }}
            />
            <Stack.Screen
                name="PaymentMethodScreen"
                component={PaymentMethodScreen}
                options={{
                    header: () => <CustomHeader title="Payment" />,
                }}
            />
            <Stack.Screen
                name="TrackOrderListingScreen"
                component={TrackOrderListingScreen}
                options={{
                    header: () => <CustomHeader title="Track Order" />,
                }}
            />
            <Stack.Screen
                name="RepeatOrderScreen"
                component={RepeatOrderScreen}
                options={{
                    header: () => <CustomHeader title="Repeat Order" />,
                }}
            />
            <Stack.Screen
                name="TrackOrderScreen"
                component={TrackOrderScreen}
                options={{
                    header: () => <CustomHeader title="Track Order" />,
                }}
            />
            <Stack.Screen
                name="OrderDetailsScreen"
                component={OrderDetailsScreen}
                options={{
                    header: () => <CustomHeader title="Order Detail" />,
                }}
            />
            <Stack.Screen
                name="HistoryScreen"
                component={HistoryScreen}
                options={{
                    header: () => <CustomHeader title="Previous Orders" />,
                }}
            />
            <Stack.Screen
                name="RaiseComplainScreen"
                component={RaiseComplainScreen}
                options={{
                    header: () => <CustomHeader title="Complain" />,
                }}
            />
            <Stack.Screen
                name="PaymentScreen"
                component={PaymentScreen}
                options={{
                    header: () => <CustomHeader title="Payment" />,
                }}
            />
            <Stack.Screen
                name="HelpCenterScreen"
                component={HelpCenterScreen}
                options={{
                    header: () => <CustomHeader title="Help Center" />,
                }}
            />
            <Stack.Screen
                name="ProfileScreen"
                component={ProfilePage}
                options={{
                    header: () => <CustomHeader title="Profile" />,
                }}
            />
        </Stack.Navigator>
    );
}

function ProfileTab() {
    return (
        <Stack.Navigator screenOptions={navigationOptions}>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfilePage}
                options={{
                    header: () => <CustomHeader title="Profile" />,
                }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                    header: () => <CustomHeader title="Edit Profile" />,
                }}
            />

            <Stack.Screen
                name="ShippingScreen"
                component={ShippingScreen}
                options={{
                    header: () => <CustomHeader title="Shipping Address" />,
                }}
            />
            <Stack.Screen
                name="CheckoutScreen"
                component={Checkout}
                options={{
                    header: () => <CustomHeader title="Checkout" />,
                }}
            />
            <Stack.Screen
                name="CartScreen"
                component={CartScreen}
                options={{
                    header: () => <CustomHeader title="Shopping Bag" />,
                }}
            />
            <Stack.Screen
                name="AddNewAddressScreen"
                component={AddNewAddressScreen}
                options={{
                    header: () => <CustomHeader title="New Address" />,
                }}
            />
            <Stack.Screen
                name="PaymentMethodScreen"
                component={PaymentMethodScreen}
                options={{
                    header: () => <CustomHeader title="Payment" />,
                }}
            />
            <Stack.Screen
                name="PrivacyScreen"
                component={PrivacyScreen}
                options={{
                    header: () => <CustomHeader title="Privacy Policy" />,
                }}
            />
            <Stack.Screen
                name="LanguageScreen"
                component={LanguageScreen}
                options={{
                    header: () => <CustomHeader title="Language" />,
                }}
            />
            <Stack.Screen
                name="CurrencyScreen"
                component={CurrencyScreen}
                options={{
                    header: () => <CustomHeader title="Currency" />,
                }}
            />
            <Stack.Screen
                name="HelpCenterScreen"
                component={HelpCenterScreen}
                options={{
                    header: () => <CustomHeader title="Help Center" />,
                }}
            />
            <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{
                    header: () => <CustomHeader title="Notifications" />,
                }}
            />
        </Stack.Navigator>
    )
}

function CartTab() {
    return (
        <Stack.Navigator screenOptions={navigationOptions}>
            <Stack.Screen
                name="cart"
                component={CartScreen}
                options={{
                    header: () => <CustomHeader title="Shopping Bag" />,
                }}
            />
            <Stack.Screen
                name="CheckoutScreen"
                component={Checkout}
                options={{
                    header: () => <CustomHeader title="Checkout" />,
                }}
            />
            <Stack.Screen
                name="ShippingScreen"
                component={ShippingScreen}
                options={{
                    header: () => <CustomHeader title="Shipping Address" />,
                }}
            />
            <Stack.Screen
                name="AddNewAddressScreen"
                component={AddNewAddressScreen}
                options={{
                    header: () => <CustomHeader title="New Address" />,
                }}
            />
            <Stack.Screen
                name="AddShippingScreen"
                component={AddShippingScreen}
                options={{
                    header: () => <CustomHeader title="Choose Shipping" />,
                }}
            />
            <Stack.Screen
                name="PromoCodeScreen"
                component={PromoCodeScreen}
                options={{
                    header: () => <CustomHeader title="Promo Code" />,
                }}
            />
            <Stack.Screen
                name="PaymentMethodScreen"
                component={PaymentMethodScreen}
                options={{
                    header: () => <CustomHeader title="Payment" />,
                }}
            />
            <Stack.Screen
                name="TrackOrderListingScreen"
                component={TrackOrderListingScreen}
                options={{
                    header: () => <CustomHeader title="Track Order" />,
                }}
            />
            <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    header: () => <CustomHeader title="Interliner" />,
                }}
            />
            <Stack.Screen
                name="CategoryScreen"
                component={CategoryScreen}
                options={{
                    header: () => <CustomHeader title="Categories" />,
                }}
            />
        </Stack.Navigator>
    )
}

function PaymentTab() {
    return (
        <Stack.Navigator screenOptions={navigationOptions}>
            <Stack.Screen
                name="HelpCenterScreen"
                component={HelpCenterScreen}
                options={{
                    header: () => <CustomHeader title="Help Center" />,
                }}
            />
        </Stack.Navigator>
    )
}

const cartItemCount = 3;

const tabBarIcon = (route) => ({ color, size, focused }) => {
    let iconName;

    switch (route.name) {
        case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
        case 'profile':
            iconName = focused ? 'person' : 'person-outline';
            break;
        case 'payment':
            iconName = focused ? 'card' : 'card-outline';
            break;
        case 'helpCenter':
            iconName = focused ? 'call' : 'call-outline';
            break;
        case 'cart':
            iconName = focused ? 'cart' : 'cart-outline';
            break;
        case 'whatsaap':
            iconName = 'logo-whatsapp';
            break;
        default:
            iconName = focused ? 'ellipse' : 'ellipse-outline';
            break;
    }

    return (
        <View style={{ position: 'relative' }}>
            <Icon name={iconName} size={size} color={color} />
            {route.name === 'cart' && cartItemCount > 0 && (
                <View
                    style={{
                        position: 'absolute',
                        right: -7,
                        top: -3,
                        backgroundColor: Colors.primary,
                        borderRadius: 8,
                        width: 18,
                        height: 18,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                        {cartItemCount}
                    </Text>
                </View>
            )}
        </View>
    );
};


export default function Logged() {
    const insets = useSafeAreaInsets();

    const getTabBarVisibility = (route, tabName) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? tabName;

        if ([
            'ProductDetailScreen', 'CartScreen', 'cart', 'CheckoutScreen', 'ShippingScreen', 'AddNewAddressScreen', 'AddShippingScreen',
            'InquiryForm', 'AboutUs', 'PromoCodeScreen', 'PaymentMethodScreen', 'TrackOrderScreen', 'HistoryScreen', 'RaiseComplainScreen',
            'PaymentScreen', 'ProfileScreen', 'EditProfile', 'LanguageScreen', 'TrackOrderListingScreen', 'OrderDetailsScreen'
        ].includes(routeName)) {
            return 'none';
        }

        return 'flex';
    };


    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                headerShown: false,
                tabBarActiveTintColor: 'black',
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
                    display: getTabBarVisibility(route, route.name),
                    flexDirection: 'row',
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
                                borderColor: pressed ? '#0000' : 'transparent',
                                backgroundColor: 'transparent',
                            },
                        ]}
                    >
                        {props.children}
                    </Pressable>
                ),
            })}
        >

            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen
                name="whatsaap"
                component={HomeStack}
                listeners={{
                    tabPress: (e) => {
                        e.preventDefault();
                        Linking.openURL('https://wa.me/+971504775180');
                    },
                }}
            />
            <Tab.Screen name="helpCenter" component={PaymentTab} />
            <Tab.Screen name="cart" component={CartTab} />
            <Tab.Screen name="profile" component={ProfileTab} />
        </Tab.Navigator>
    );
}
