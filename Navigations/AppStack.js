import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, Image, StyleSheet} from 'react-native';

import CustomDrawer from '../Components/CustomDrawer';


import TabNavigator from './TabNavigator';

import Ticket from '../Screens/HomeScreen';
import History from '../Screens/HistoryScreen';
import Account from '../Screens/AccountScreen';
import Code from '../Screens/CodeScreen';

const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
 
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Vé"
        component={TabNavigator}
        options={{
          drawerIcon: ({focused, color, size}) => (
            <Image
              source={require('../Images/ticket.png')}
              resizeMode="contain"
              style={{
                width: size,
                height: size,
                tintColor: focused ? 'black' : 'gray',
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="QR"
        component={Code}
        options={{
          drawerIcon: ({focused, color, size}) => (
            <Image
              source={require('../Images/qr.png')}
              resizeMode="contain"
              style={{
                width: size,
                height: size,
                tintColor: focused ? 'black' : 'gray',
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Lịch sử"
        component={History}
        options={{
          drawerIcon: ({focused, color, size}) => (
            <Image
              source={require('../Images/history.png')}
              resizeMode="contain"
              style={{
                width: size,
                height: size,
                tintColor: focused ? 'black' : 'gray',
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Tài khoản"
        component={Account}
        options={{
          drawerIcon: ({focused, color, size}) => (
            <Image
              source={require('../Images/account.png')}
              resizeMode="contain"
              style={{
                width: size,
                height: size,
                tintColor: focused ? 'black' : 'gray',
              }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AuthStack;
