import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Repos} from '../Components/Repos';

const HomeScreen = () => {
  const {userInfo, logout} = useContext(AuthContext);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <View>
        <View style={styles.top}>
          <Text style={styles.welcome}>Welcome {userInfo.user.fullName} </Text>
          <Button title="Logout" color="red" onPress={logout} />
        </View>
        <Repos />
      </View>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  welcome: {
    color: '#000',
    fontSize: 25,
    marginRight: 100,
  },
  top: {
    padding: 15,
    flexDirection: 'row',
  },
});

export default HomeScreen;
