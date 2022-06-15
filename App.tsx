import * as React from 'react';
import LoginScreen from './Screens/login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from './Screens/register';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'teal',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{
            title: 'Log In',
          }}
        />
        <Stack.Screen
          name="register"
          component={RegisterScreen}
          options={{
            title: 'Create account',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
