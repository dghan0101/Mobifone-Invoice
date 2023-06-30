import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { BASE_URL } from '../Config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = (username, password, taxCode) => {
    setIsLoading(true);

    // Xác định mã số thuế từ URL
    const url = 'https://demohoadon123.mobifoneinvoice.vn/'; // Thay đổi URL tại đây nếu cần
    const urlTaxCode = url.substring(url.indexOf('://') + 3, url.indexOf('.mobifoneinvoice'));
    
    if (urlTaxCode === taxCode) {
      // Gọi API login
      axios
        .post(`${BASE_URL}/Account/Login`, {
          username,
          password,
          taxCode,
        })
        .then(res => {
          let userInfo = res.data;
          if (userInfo && userInfo.token) {
            setUserInfo(userInfo);
            setUserToken(userInfo.token);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            AsyncStorage.setItem('userToken', userInfo.token);
            console.log(userInfo);
            console.log('User Token: ' + userInfo.token);
          } else {
            console.log(`Login error: ${res.data.message}`);
            alert('Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại');
          }
        })
        .catch(e => {
          console.log(`Login error ${e}`);
          alert('Đăng nhập thất bại. Vui lòng thử lại.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      alert('Mã số thuế không đúng. Vui lòng thử lại.');
    }
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    setIsLoading(false);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, userToken, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};