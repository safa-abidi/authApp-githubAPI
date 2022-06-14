import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';

function RegisterScreen() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = data => console.log(data);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="First name"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && (
        <Text style={styles.erreur}>First name is required.</Text>
      )}
      <Controller
        control={control}
        rules={{
          minLength: 3,
          
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Last name"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      {errors.firstName && <Text style={styles.erreur}>Minimum length is 3</Text>}
      <Button color="#000" mode="contained" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  erreur: {
    color: 'red',
  },
  container: {
    margin: 20,
  },
});

export default RegisterScreen;
