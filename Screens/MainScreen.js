import React, {Component} from 'react';
import Splash from './SplashScreen';
import Login from './LoginScreen';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {currentscreen: 'Splash'};
    console.log('Start doing some tasks for about 3 seconds');
    setTimeout(() => {
      console.log('Done doing some tasks for about 3 seconds');
      this.setState({currentscreen: 'Login'});
    }, 3000);
  }
  render() {
    const {currentscreen} = this.state;
    let mainScreen = currentscreen == 'Splash' ? <Splash /> : <Login />;
    return mainScreen;
  }
}

export default Main;
