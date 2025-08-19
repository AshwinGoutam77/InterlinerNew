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

const RootStack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [showWalkthrough, setShowWalkthrough] = useState(true);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PaperProvider>
          <AppProvider>
            <CurrencyProvider>
              <UserProvider>
                <RoleProvider>
                  <I18nextProvider i18n={i18n}>
                    <RootStack.Navigator screenOptions={{ headerShown: false }}>
                      <RootStack.Screen name="Walkthrough" component={WalkthroughScreen} />
                      <RootStack.Screen name="Login" component={LoginScreen} />
                      <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
                      <RootStack.Screen name="Register" component={RegisterScreen} />
                      <RootStack.Screen name="MainApp" component={Logged} />
                    </RootStack.Navigator>
                  </I18nextProvider>
                </RoleProvider>
              </UserProvider>
            </CurrencyProvider>
          </AppProvider>
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default App;
