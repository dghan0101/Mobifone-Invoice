import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Ticket from '../Screens/HomeScreen';
import Code from '../Screens/CodeScreen';
import History from '../Screens/HistoryScreen';
import Account from '../Screens/AccountScreen';
import Guest from '../Screens/GuestInfo';
import View from '../Screens/ViewScreen';

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTintColor: 'black',
  headerBackTitle: 'Back',
  headerTitleAlign: 'center',
};
const Stack = createStackNavigator();





 const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Ticket"
        component={Ticket}
        options={{title: 'Quản lý hóa đơn'}}
      />
      <Stack.Screen
        name="Khách hàng"
        component={Guest}
        options={{title: 'Thông tin khách hàng'}}
      />
      <Stack.Screen
        name="PDF View"
        component={View}
        options={{title: 'Hóa đơn'}}
      />
    </Stack.Navigator>
  );
};

const CodeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Quetcode"
        component={Code}
        options={{title: 'Quét QR'}}
      />
    </Stack.Navigator>
  );
};

const HistoryNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="History"
        component={History}
        options={{title: 'Lịch sử'}}
      />
    </Stack.Navigator>
  );
};

const AccountNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Personal"
        component={Account}
        options={{title: 'Thông tin tài khoản'}}
      />
    </Stack.Navigator>
  );
};

export {HomeNavigator, CodeNavigator, HistoryNavigator, AccountNavigator};
