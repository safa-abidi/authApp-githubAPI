import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = async (fullName, email, password) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/sign-up`, {
        fullName,
        email,
        password,
      });
      console.log('this is res.data', res.data);
      if (res.data.success) {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      } else {
        const e = res.data.message;
        setRegisterError(e);
        setIsLoading(false);
        console.log(e);
      }
    } catch (e) {
      console.log(`register error ${e}`);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      if (res.data.success) {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      } else {
        const e = res.data.message;
        setAuthError(e);
        setIsLoading(false);
        console.log(res.data.message);
      }
    } catch (e) {
      console.log(`login error ${e}`);
    }
  };

  const logout = () => {
    setIsLoading(true);

    try {
      AsyncStorage.removeItem('userInfo');
      setUserInfo('');
      setIsLoading(false);
    } catch (e) {
      console.log(`logout error ${e}`);
      setIsLoading(false);
    }
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        authError,
        registerError,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
