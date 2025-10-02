/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import CustomHeader from "../components/header";
import { Alert, I18nManager, Linking, Pressable, Text, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DashboardScreen from "../screens/Dashboard";
import CategoryScreen from "../screens/CategoryScreen";
import ProductsPage from "../screens/Products";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import CartScreen from "../screens/Cart";
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
import { RoleContext } from "../context/RoleContext";
import ReportsScreen from "../screens/ReportsScreen";
import { useTranslation } from "react-i18next";

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

const getHeader = (key) => () => {
    const { t } = useTranslation();
    return <CustomHeader title={t(key)} />;
};

export function HomeStack({ navigationOptions }) {
    return (
        <Stack.Navigator screenOptions={navigationOptions}>
            <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{ header: getHeader("dashboardScreen.title") }}
            />
            <Stack.Screen
                name="CategoryScreen"
                component={CategoryScreen}
                options={{ header: getHeader("categoryScreen.title") }}
            />
            <Stack.Screen
                name="ProductsPage"
                component={ProductsPage}
                options={{ header: getHeader("products.title") }}
            />
            <Stack.Screen
                name="ProductDetailScreen"
                component={ProductDetailScreen}
                options={{ header: getHeader("products.detail") }}
            />
            <Stack.Screen
                name="CartScreen"
                component={CartScreen}
                options={{ header: getHeader("cart.title") }}
            />
            <Stack.Screen
                name="CheckoutScreen"
                component={Checkout}
                options={{ header: getHeader("checkout.title") }}
            />
            <Stack.Screen
                name="ShippingScreen"
                component={ShippingScreen}
                options={{ header: getHeader("shipping.title") }}
            />
            <Stack.Screen
                name="AddNewAddressScreen"
                component={AddNewAddressScreen}
                options={{ header: getHeader("address.new") }}
            />
            <Stack.Screen
                name="AddShippingScreen"
                component={AddShippingScreen}
                options={{ header: getHeader("shipping.choose") }}
            />
            <Stack.Screen
                name="PromoCodeScreen"
                component={PromoCodeScreen}
                options={{ header: getHeader("promo.title") }}
            />
            <Stack.Screen
                name="PaymentMethodScreen"
                component={PaymentMethodScreen}
                options={{ header: getHeader("payment.title") }}
            />
            <Stack.Screen
                name="TrackOrderListingScreen"
                component={TrackOrderListingScreen}
                options={{ header: getHeader("trackOrder.title") }}
            />
            <Stack.Screen
                name="RepeatOrderScreen"
                component={RepeatOrderScreen}
                options={{ header: getHeader("repeatOrder.title") }}
            />
            <Stack.Screen
                name="TrackOrderScreen"
                component={TrackOrderScreen}
                options={{ header: getHeader("trackOrder.title") }}
            />
            <Stack.Screen
                name="OrderDetailsScreen"
                component={OrderDetailsScreen}
                options={{ header: getHeader("orderDetail.title") }}
            />
            <Stack.Screen
                name="HistoryScreen"
                component={HistoryScreen}
                options={{ header: getHeader("history.title") }}
            />
            <Stack.Screen
                name="RaiseComplainScreen"
                component={RaiseComplainScreen}
                options={{ header: getHeader("complain.title") }}
            />
            <Stack.Screen
                name="PaymentScreen"
                component={PaymentScreen}
                options={{ header: getHeader("payment.title") }}
            />
            <Stack.Screen
                name="HelpCenterScreen"
                component={HelpCenterScreen}
                options={{ header: getHeader("help.title") }}
            />
            <Stack.Screen
                name="ProfileScreen"
                component={ProfilePage}
                options={{ header: getHeader("profile.title") }}
            />
            <Stack.Screen
                name="ReportsScreen"
                component={ReportsScreen}
                options={{ header: getHeader("reports.title") }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{ header: getHeader("profile.editProfile") }}
            />
            <Stack.Screen
                name="LanguageScreen"
                component={LanguageScreen}
                options={{ header: getHeader("profile.language") }}
            />
            <Stack.Screen
                name="CurrencyScreen"
                component={CurrencyScreen}
                options={{ header: getHeader("profile.currency") }}
            />
            <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{ header: getHeader("profile.notification") }}
            />
            <Stack.Screen
                name="PrivacyScreen"
                component={PrivacyScreen}
                options={{ header: getHeader("profile.privacy") }}
            />
        </Stack.Navigator>
    );
}

export function ProfileTab({ navigationOptions }) {
    return (
        <Stack.Navigator screenOptions={navigationOptions}>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfilePage}
                options={{ header: getHeader("profileScreen.title") }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{ header: getHeader("profileScreen.editProfile") }}
            />
            <Stack.Screen
                name="ShippingScreen"
                component={ShippingScreen}
                options={{ header: getHeader("shipping.title") }}
            />
            <Stack.Screen
                name="CheckoutScreen"
                component={Checkout}
                options={{ header: getHeader("checkout.title") }}
            />
            <Stack.Screen
                name="CartScreen"
                component={CartScreen}
                options={{ header: getHeader("cart.title") }}
            />
            <Stack.Screen
                name="AddNewAddressScreen"
                component={AddNewAddressScreen}
                options={{ header: getHeader("address.new") }}
            />
            <Stack.Screen
                name="PaymentMethodScreen"
                component={PaymentMethodScreen}
                options={{ header: getHeader("payment.title") }}
            />
            <Stack.Screen
                name="PrivacyScreen"
                component={PrivacyScreen}
                options={{ header: getHeader("profile.privacy") }}
            />
            <Stack.Screen
                name="LanguageScreen"
                component={LanguageScreen}
                options={{ header: getHeader("profile.language") }}
            />
            <Stack.Screen
                name="CurrencyScreen"
                component={CurrencyScreen}
                options={{ header: getHeader("profile.currency") }}
            />
            <Stack.Screen
                name="HelpCenterScreen"
                component={HelpCenterScreen}
                options={{ header: getHeader("help.title") }}
            />
            <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{ header: getHeader("profile.notification") }}
            />
        </Stack.Navigator>
    );
}

function CartTab() {
    return (
        <Stack.Navigator screenOptions={navigationOptions}>
            <Stack.Screen
                name="CartScreen"
                component={CartScreen}
                options={{ header: getHeader("cart.title") }}
            />
            <Stack.Screen
                name="CheckoutScreen"
                component={Checkout}
                options={{ header: getHeader("checkout.title") }}
            />
            <Stack.Screen
                name="ShippingScreen"
                component={ShippingScreen}
                options={{ header: getHeader("shipping.title") }}
            />
            <Stack.Screen
                name="AddNewAddressScreen"
                component={AddNewAddressScreen}
                options={{ header: getHeader("address.new") }}
            />
            <Stack.Screen
                name="AddShippingScreen"
                component={AddShippingScreen}
                options={{ header: getHeader("shipping.choose") }}
            />
            <Stack.Screen
                name="PromoCodeScreen"
                component={PromoCodeScreen}
                options={{ header: getHeader("promo.title") }}
            />
            <Stack.Screen
                name="PaymentMethodScreen"
                component={PaymentMethodScreen}
                options={{ header: getHeader("payment.title") }}
            />
            <Stack.Screen
                name="TrackOrderListingScreen"
                component={TrackOrderListingScreen}
                options={{ header: getHeader("trackOrder.title") }}
            />
            <Stack.Screen
                name="RepeatOrderScreen"
                component={RepeatOrderScreen}
                options={{ header: getHeader("repeatOrder.title") }}
            />
            <Stack.Screen
                name="TrackOrderScreen"
                component={TrackOrderScreen}
                options={{ header: getHeader("trackOrder.title") }}
            />
            <Stack.Screen
                name="OrderDetailsScreen"
                component={OrderDetailsScreen}
                options={{ header: getHeader("orderDetail.title") }}
            />
            <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{ header: getHeader("dashboardScreen.title") }}
            />
            <Stack.Screen
                name="CategoryScreen"
                component={CategoryScreen}
                options={{ header: getHeader("categoryScreen.title") }}
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
                // options={{
                //     header: () => <CustomHeader title="Help Center" />,
                // }}
                options={{ header: getHeader("help.title") }}
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
    const { role } = useContext(RoleContext);

    const getTabBarVisibility = (route, tabName) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? tabName;

        if ([
            'ProductDetailScreen', 'CartScreen', 'cart', 'CheckoutScreen', 'ShippingScreen', 'AddNewAddressScreen', 'AddShippingScreen',
            'PromoCodeScreen', 'PaymentMethodScreen', 'EditProfile'
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
            {role == 'customer' && <Tab.Screen name="cart" component={CartTab} />}
            <Tab.Screen name="profile" component={ProfileTab} />
        </Tab.Navigator>
    );
}
