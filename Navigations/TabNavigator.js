import {View, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AccountNavigator,
  HistoryNavigator,
  HomeNavigator,
  CodeNavigator,
  GuestNavigator,
} from './StackNavigator';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarHideOnKeyboard: true
   }}>
      <Tab.Screen
        name="Hóa đơn"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../Images/ticket.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'black' : 'black',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Quét QR"
        component={CodeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../Images/qr.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'black' : 'black',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Lịch sử"
        component={HistoryNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../Images/history.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'black' : 'black',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cài đặt"
        component={AccountNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../Images/setting.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'black' : 'black',
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
