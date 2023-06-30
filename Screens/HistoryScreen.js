import React, { Component } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native'


export default class History extends Component {
    render() {
        return (
            <SafeAreaView  style={styles.container}>
                <View>
                    <Text>History Screen</Text>
                    <Button title="Click here"
                        onPress={() => alert('Button Clicked!')}
                    />
                </View>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'

    }
})