import LoginScreen from '../Screens/login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from '../Screens/register';
import React, {useContext} from 'react';
import HomeScreen from '../Screens/HomeScreen';
import {AuthContext} from '../context/AuthContext';
import SplashScreen from '../Screens/SplashScreen';

export default function Nav() {
  const {userInfo, splashLoading} = useContext(AuthContext);
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
        {splashLoading ? (
          <Stack.Screen name="Splash Screen" component={SplashScreen} />
        ) : userInfo ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
