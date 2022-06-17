import * as React from 'react';
import {Text, ScrollView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {styles} from '../commonStyles';

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

  const onSubmit = data => console.log(data);
  return (
    <ScrollView style={styles.container}>
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
    </ScrollView>
  );
}

export default LoginScreen;
