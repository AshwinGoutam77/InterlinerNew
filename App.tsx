/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Logged from './application/navigations/Logged';
import WalkthroughScreen from './application/screens/WalkthroughScreen';
import './application/src/i18n/i18n';
import { AppProvider } from './application/context/RTLContext';
import LoginScreen from './application/screens/LoginScreen';
import RegisterScreen from './application/screens/RegisterScreen';
import { I18nextProvider } from 'react-i18next';
import i18n from './application/src/i18n/i18n';
import { CurrencyProvider } from './application/context/CurrencyContext';
import ForgotPassword from './application/screens/ForgotPassword';
import { UserProvider } from './application/context/UserContext';
import { RoleProvider } from './application/context/RoleContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, View } from 'react-native';
import { getToken } from './application/context/authToken';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const RootStack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<'Walkthrough' | 'Login' | 'MainApp'>('Walkthrough');
  const queryClient = new QueryClient();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // const token = await AsyncStorage.getItem('authToken');
        const token = await getToken();
        console.log('==', token);

        const hasSeenWalkthrough = await AsyncStorage.getItem('hasSeenWalkthrough');

        if (token) {
          setInitialRoute('MainApp');
        } else if (hasSeenWalkthrough) {
          // Skip walkthrough if already seen
          setInitialRoute('Login');
        } else {
          // First-time user
          setInitialRoute('Walkthrough');
        }
      } catch (error) {
        console.log('Error checking auth:', error);
        setInitialRoute('Login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer ref={navigationRef}>
          <PaperProvider>
            <AppProvider>
              <CurrencyProvider>
                <UserProvider>
                  <RoleProvider>
                    <CartProvider>
                      <I18nextProvider i18n={i18n}>
                        <RootStack.Navigator
                          initialRouteName={initialRoute}
                          screenOptions={{ headerShown: false }}
                        >
                          <RootStack.Screen name="Walkthrough" component={WalkthroughScreen} />
                          <RootStack.Screen name="Login" component={LoginScreen} />
                          <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
                          <RootStack.Screen name="Register" component={RegisterScreen} />
                          <RootStack.Screen name="MainApp" component={Logged} />
                        </RootStack.Navigator>
                      </I18nextProvider>
                    </CartProvider>
                  </RoleProvider>
                </UserProvider>
              </CurrencyProvider>
            </AppProvider>
          </PaperProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

import { StyleSheet } from 'react-native';
import { navigationRef } from './application/RootNavigation';
import { CartProvider } from './application/context/CartContext';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
