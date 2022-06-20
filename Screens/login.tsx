import React, {useContext, useEffect} from 'react';
import {Text, ScrollView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {styles} from '../commonStyles';
import {AuthContext} from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

function LoginScreen({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {isLoading, login, authError} = useContext(AuthContext);
  const onSubmit = data => {
    login(data.email, data.password);
  };
  return (
    <ScrollView style={styles.container}>
      <Spinner visible={isLoading} />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            label="Email"
            placeholder="Email"
            activeOutlineColor="#008080"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.erreur}>Email is required</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            label="Password"
            placeholder="Password"
            activeOutlineColor="#008080"
            mode="outlined"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text style={styles.erreur}>Password is required</Text>
      )}
      <Button
        style={styles.button}
        mode="contained"
        color="#008080"
        onPress={handleSubmit(onSubmit)}>
        Login
      </Button>
      <Button
        style={styles.button}
        mode="text"
        color="#008080"
        onPress={() => navigation.navigate('register')}>
        Don't have an account?
      </Button>

      {authError ? <Text style={styles.authErreur}>{authError}</Text> : null}
    </ScrollView>
  );
}

export default LoginScreen;
