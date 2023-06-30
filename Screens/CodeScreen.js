import React, { Component } from "react";
import { View, Text, Button, StyleSheet, Alert } from 'react-native'

export default class Code extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>QR Screen</Text>
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