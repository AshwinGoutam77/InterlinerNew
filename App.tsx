import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Logged from './application/navigations/Logged';
import WalkthroughScreen from './application/screens/WalkthroughScreen'; // Adjust path as needed
import './application/src/i18n/i18n';
import { RTLProvider } from './application/context/RTLContext';

const RootStack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [showWalkthrough, setShowWalkthrough] = useState(true);

  // useEffect(() => {
  //   const checkWalkthrough = async () => {
  //     const value = await AsyncStorage.getItem('hasSeenWalkthrough');
  //     if (value === 'true') {
  //       setShowWalkthrough(false);
  //     }
  //   };
  //   checkWalkthrough();
  // }, []);

  return (
    <NavigationContainer>
      <PaperProvider>
        <RTLProvider>
          {/* <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {showWalkthrough ? (
            <RootStack.Screen name="Walkthrough" component={WalkthroughScreen} />
          ) : (
            <RootStack.Screen name="MainApp" component={Logged} />
          )}
        </RootStack.Navigator> */}
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen
              name="Walkthrough"
              component={WalkthroughScreen}
            />
            <RootStack.Screen name="MainApp" component={Logged} />
          </RootStack.Navigator>
        </RTLProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}
export default App;
