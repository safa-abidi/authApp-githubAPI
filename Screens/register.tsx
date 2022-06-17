import * as React from 'react';
import {Text, ScrollView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {styles} from '../commonStyles';

function RegisterScreen() {
  const {
    watch,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const password = watch('password', '');

  const onSubmit = data => console.log(data);
  return (
    <ScrollView style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
          maxLength: 50,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            label="Full name"
            placeholder="Full Name"
            right={<TextInput.Affix text="/50" />}
            activeOutlineColor="#008080"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="fullName"
      />
      {errors.fullName && errors.fullName.type === 'required' && (
        <Text style={styles.erreur}>Name is required</Text>
      )}
      {errors.fullName && errors.fullName.type === 'minLength' && (
        <Text style={styles.erreur}>Name is at least 3 chars long</Text>
      )}
      {errors.fullName && errors.fullName.type === 'maxLength' && (
        <Text style={styles.erreur}>Maximum name length is 50 chars</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
      {errors.email && errors.email.type === 'required' && (
        <Text style={styles.erreur}>Email is required</Text>
      )}
      {errors.email && errors.email.type === 'pattern' && (
        <Text style={styles.erreur}>Email is not valid</Text>
      )}
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 6,
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
      {errors.password && errors.password.type === 'required' && (
        <Text style={styles.erreur}>Password is required</Text>
      )}
      {errors.password && errors.password.type === 'minLength' && (
        <Text style={styles.erreur}>Password is at least 6 chars long</Text>
      )}
      <Controller
        control={control}
        rules={{
          required: true,
          validate: value => value === password,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            label="Confirm password"
            placeholder="Confirm password"
            activeOutlineColor="#008080"
            mode="outlined"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && errors.confirmPassword.type === 'required' && (
        <Text style={styles.erreur}>Confirm password is required</Text>
      )}
      {errors.confirmPassword && errors.confirmPassword.type === 'validate' && (
        <Text style={styles.erreur}>Passwords do not match</Text>
      )}
      <Button
        style={styles.button}
        mode="contained"
        color="#008080"
        onPress={handleSubmit(onSubmit)}>
        Create account
      </Button>
    </ScrollView>
  );
}

export default RegisterScreen;
