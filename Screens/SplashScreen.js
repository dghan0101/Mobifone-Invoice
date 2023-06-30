import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {timer: 0};
    setInterval(() => {
      this.setState({timer: this.state.timer + 1});
    }, 1000);
  }
  render() {
    return (
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../Images/Logo.jpg')}></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ' #ffffff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titles: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: 250,
    height: 50,
  },
});
