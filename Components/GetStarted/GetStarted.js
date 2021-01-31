import React, { Component } from 'react'
import { Dimensions, StyleSheet, Image, View, TouchableOpacity, Animated, TextInput } from 'react-native'

export default class GetStarted extends Component {
    state = {
        anim: new Animated.Value(0),
        index: 0,
        loop: false
    }

    caller = () => {

        Animated.timing(this.state.anim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        })
        // this.animater()
    }

    animater = () => {
        this.setState(prevState => ({ index: !prevState.index, loop: this.state.loop - 1 }))
        // var setter = this.state.loop
        // setter = setter-1
        // this.setState({loop:setter})
        // while(!this.state.loop){
        //     console.log('loop ->>> ',this.state.loop);
        //     this.caller()
        // }
        // else{
        //     return
        // }
        // setInterval(() => {
        //     this.setState(prevState => ({ index: !prevState.index }))
        // }, 100);

        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.anim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false
                }),
                Animated.timing(this.state.anim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false
                }),
            ]),
            { iterations: 2 },
        ).start();
    }

    render() {

        const rotateY = this.state.anim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '-90deg', '-180deg']
        })

        const scale = this.state.anim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 9, 1]
        })

        const translateX = this.state.anim.interpolate({
            inputRange: [0, 0.5, 1],
            // outputRange: ['0%','50%','0%']
            outputRange: [0, 10, 0]
        })
        const backgroundColor = this.state.anim.interpolate({
            inputRange: [0, 0.001, 0.5, 0.501, 1],
            outputRange: [
                'gold',
                'gold',
                'gold',
                '#444',
                '#444',
            ],
        });
        const dotbgColor = this.state.anim.interpolate({
            inputRange: [0, 0.001, 0.5, 0.501, 0.9, 1],
            outputRange: [
                '#444',
                '#444',
                '#444',
                'gold',
                'gold',
                'gold',
            ],
        });

        return (
            <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: backgroundColor, flex: 1, display: 'flex', alignItems: 'center' }}>
                <Animated.View style={{
                    backgroundColor: dotbgColor, width: Dimensions.get('window').width / 5, height: Dimensions.get('window').width / 5,
                    borderRadius: Dimensions.get('window').width / 10, position: 'absolute', bottom: Dimensions.get('window').width / 10, transform: [{ perspective: 200 }, { rotateY }, { scale }, { translateX }]
                }}>
                    <TouchableOpacity onPress={() => this.animater()} style={{
                        width: Dimensions.get('window').width / 5, height: Dimensions.get('window').width / 5
                        , borderRadius: Dimensions.get('window').width / 10, alignItems: 'center', backgroundColor: 'transparent', justifyContent: 'center'
                    }}>
                        {/* <Image source={require('../../Assets/icons/right.png')}
                            style={{
                                width: 30, resizeMode: "contain",
                                height: 30
                            }}
                        /> */}
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
    }
})
