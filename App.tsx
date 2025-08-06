import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { RatesProvider } from './src/context/RatesContext';

// We'll create these screens later
import { ConversionScreen } from './src/screens/ConversionScreen';
import { CurrencyListScreen } from './src/screens/CurrencyListScreen';

export type RootStackParamList = {
  Conversion: undefined;
  CurrencyList: {
    isSource: boolean;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer>
      <RatesProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack.Navigator>
          <Stack.Screen 
            name="Conversion" 
            component={ConversionScreen}
            options={{ title: 'Currency Converter' }}
          />
          <Stack.Screen 
            name="CurrencyList" 
            component={CurrencyListScreen}
            options={{ title: 'Select Currency' }}
          />
        </Stack.Navigator>
      </RatesProvider>
    </NavigationContainer>
  );
}
