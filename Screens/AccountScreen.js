import React, { Component } from "react";
import { View, Text, Button, StyleSheet, } from 'react-native'

export default class Account extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Account Screen</Text>
                <Button title="Click here"
                    onPress={() => alert('Button Clicked!')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})