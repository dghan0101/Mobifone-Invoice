import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { AuthContext } from '../Context/AuthContext';

const CustomDrawer = (props) => {
  const { logout, userInfo } = useContext(AuthContext);
  const displayName =
    userInfo && (userInfo.username || userInfo.email)
      ? userInfo.username || userInfo.email
      : 'Hân';

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#8200d6' }}
      >
        <ImageBackground
          source={require('../Images/menu-bg.jpg')}
          style={{ padding: 20 }}
        >
          <Image
            source={require('../Images/user.jpg')}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}
          >
            {displayName}
          </Text>
        </ImageBackground>
        <View
          style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}
      >
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../Images/log-in-outline.png')}
              resizeMode="contain"
              style={{ width: 22, height: 22 }}
            />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;