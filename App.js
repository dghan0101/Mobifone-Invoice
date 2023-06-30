import React, { Component } from 'react';
import { AuthProvider } from './Context/AuthContext';
import AppNav from './Navigations/AppNav';

export default class App extends Component {
    render() {
        return (
                <AuthProvider>
                    <AppNav /> 
                </AuthProvider>
        )
    }
}