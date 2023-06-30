import React, { useContext } from "react";
import {View, ActivityIndicator} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Main from "../Screens/MainScreen";
import { AuthContext } from "../Context/AuthContext";
import AuthStack from "./AppStack";

const AppNav = () => {
    const {isLoading, userToken} = useContext(AuthContext);
    if(isLoading){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size={'large'}/>
        </View>
        )
       
    }
    return (
        <NavigationContainer>
            {userToken !==null? <AuthStack/> : <Main/>}
        </NavigationContainer>
    );
}

export default AppNav;