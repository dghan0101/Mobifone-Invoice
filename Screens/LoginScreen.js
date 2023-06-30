import React, {Component, useContext, useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  Alert
} from 'react-native';
import {AuthContext} from '../Context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [taxCode,setTaxCode] = useState(null);

  const {login} = useContext(AuthContext);


  const handleLogin = () => {
    if (!username || !password || !taxCode) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin đăng nhập.');
      return;
    }

    login(username, password, taxCode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require('../Images/Logo.jpg')}></Image>
            </View>
            <View style={styles.infoContainer}>
              <Text style={{color: 'black'}}>Mã số thuế</Text>
              <TextInput
                style={styles.input}
                placeholder="Mã số thuế"
                placeholderTextColor={'#b3b3b3'}
                keyboardType="email-address"
                returnKeyType="next"
                autoCorrect={false}
                value={taxCode}
                onChangeText={text => setTaxCode(text)}
              />
              <Text style={{color: 'black'}}>Tài khoản</Text>
              <TextInput
                style={styles.input}
                placeholder="Tài khoản"
                placeholderTextColor={'#b3b3b3'}
                keyboardType="email-address"
                returnKeyType="next"
                autoCorrect={false}
                value={username}
                onChangeText={text => setUsername(text)}
              />
              <Text style={{color: 'black'}}>Mật khẩu</Text>
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                placeholderTextColor={'#b3b3b3'}
                returnKeyType="go"
                secureTextEntry
                autoCorrect={false}
                value={password}
                onChangeText={text => setPassword(text)}
              />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleLogin}>
                <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 50,
    margin: 30,
  },
  infoContainer: {
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: '#e6e6e6',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    backgroundColor: '#0066ff',
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
});

export default Login;
