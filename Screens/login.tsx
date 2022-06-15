import * as React from 'react';
import {Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';

function LoginScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          color: 'black',
        }}>
        loginScreen!
      </Text>
    </View>
  );
}

export default LoginScreen;
