import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';

const HomeScreen = () => {
  const {userInfo, logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/*<Spinner visible={isLoading} />*/}
      <Text style={styles.welcome}>Welcome {userInfo.user.fullName} </Text>
      <Button title="Logout" color="red" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    color: '#000',
    fontSize: 18,
    marginBottom: 8,
  },
});

export default HomeScreen;
