import React, { Component } from 'react'
import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView, Animated, StyleSheet } from 'react-native'

export default class SignUp extends Component {
    state = {
        anim: new Animated.Value(0)
    }

    componentDidMount = () => {
        this.poser()
    }

    poser = () => {
        // this.spinValue.setValue(0)
        Animated.timing(
            this.state.anim,
            {
                toValue: 300,
                duration: 800,

                useNativeDriver: false
            },
        ).start()
    }
    render() {

        var opaque = this.state.anim.interpolate({
            inputRange: [0, 300],
            outputRange: [1, 0],
            extrapolate: "clamp",
        })

        var translation = this.state.anim.interpolate({
            inputRange: [0, 300],
            outputRange: [0, 200],
            extrapolate: "clamp",
        })

        var translationOp = this.state.anim.interpolate({
            inputRange: [0, 200],
            outputRange: [180, 0],
            extrapolate: "clamp",
        })

        var translationImg = this.state.anim.interpolate({
            inputRange: [0, 150, 300],
            outputRange: [0, -50, -100],
            extrapolate: "clamp",
        })

        var opaqueOp = this.state.anim.interpolate({
            inputRange: [0, 150, 300],
            outputRange: [0, 0.5, 1],
            extrapolate: "clamp",
        })
        var indexOp = this.state.anim.interpolate({
            inputRange: [0, 300],
            outputRange: [9, 10],
            extrapolate: "clamp",
        })
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Animated.View style={{
                        ...StyleSheet.absoluteFill, transform: [{
                            translateY: translationImg
                        },]
                    }} >
                        <Image source={require("../../assets/Images/login.jpg")} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, }} />
                    </Animated.View>
                    {/* <Animated.View style={{
                            height: Dimensions.get('window').height / 3, alignItems: 'center',  opacity: opaque, transform: [{
                                translateY: translation
                            },],zIndex:8
                        }}>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.poser()} style={{ padding: 15, backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 25, width: Dimensions.get('window').width / 1.5 }}>
                                <Text style={{ textAlign: 'center', fontSize: 20 }}>Sign In</Text>
                            </TouchableOpacity>
                        </Animated.View> */}
                    {/* This if after button press */}
                    <Animated.View style={{
                        ...StyleSheet.absoluteFill, top: null, flex: 1, backgroundColor: "#ffffff", borderTopLeftRadius: 50, borderTopRightRadius: 50, overflow: "hidden", padding: 25, opacity: opaqueOp, transform: [{
                            translateY: translationOp
                        },], zIndex: indexOp
                    }} >
                        <Text style={{ fontSize: 40, textAlign: 'center', margin: 5, fontFamily: 'PatrickHand-Regular' }}>Food Gapp</Text>
                        <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: '100', opacity: 0.4, fontFamily: 'Roboto' }}>Login to your Account</Text>
                        <View style={{ alignItems: 'center', paddingTop: 30 }}>
                            <TextInput placeholder="Name" placeholderTextColor="#000000" style={{ fontFamily: "Roboto", marginBottom: 10, padding: 14, paddingLeft: 20, borderColor: "#ebebeb", borderRadius: 25, borderWidth: 1, maxWidth: 500, minWidth: Math.min(0.85 * Dimensions.get('window').width, 400), color: "#000" }} />
                            <TextInput placeholder="Email" placeholderTextColor="#000000" style={{ fontFamily: "Roboto", marginBottom: 10, padding: 14, paddingLeft: 20, borderColor: "#ebebeb", borderRadius: 25, borderWidth: 1, maxWidth: 500, minWidth: Math.min(0.85 * Dimensions.get('window').width, 400), color: "#000" }} />
                            <TextInput placeholder="Password" placeholderTextColor="#000000" style={{ fontFamily: "Roboto", marginBottom: 10, padding: 14, paddingLeft: 20, borderColor: "#ebebeb", borderRadius: 25, borderWidth: 1, maxWidth: 500, minWidth: Math.min(0.85 * Dimensions.get('window').width, 400), color: "#000" }} />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text onPress={() => this.props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'Authentication' }],
                            })} style={{ fontSize: 17, fontWeight: 'bold', opacity: 0.8, fontFamily: 'Roboto', color: '#000000', padding: 14, textDecorationLine: 'underline' }}>Sign In</Text>
                            <View style={{ flex: 1 }} />
                            <View style={{ flex: 2 }} />
                            <TouchableOpacity
                                style={{ backgroundColor: '#E6F0F5', padding: 18, alignItems: 'center', borderRadius: 100, justifyContent: 'center', flexDirection: 'row' }}
                            >
                                <Text style={{ fontSize: 18, fontWeight: 'bold', opacity: 0.8, fontFamily: 'Roboto', color: '#000000', paddingRight: 25 }}>Create</Text>
                                <Image source={require("../../assets/Icons/r2.png")}
                                    style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            
                            <Text style={{ fontSize: 17, fontWeight: 'bold', opacity: 0.8, fontFamily: 'Roboto', color: '#000000', paddingRight: 10, textDecorationLine: 'underline' }}>Forgot Password?</Text>
                        </View> */}
                        <View style={{ marginTop: 30 }}>
                            <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: '100', opacity: 0.4, fontFamily: 'Roboto' }}>Or Continue With</Text>
                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 30 }}>
                                <View style={{ borderWidth: 0.5, borderRadius: 50, width: 45, height: 45, padding: 10 }}>
                                    <Image source={require("../../assets/Icons/gog.png")}
                                        style={{ width: null, height: null, flex: 1 }} />
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={{ backgroundColor: '#4267b2', borderRadius: 50, width: 45, height: 45, padding: 10 }}>
                                    <Image source={require("../../assets/Icons/fb.png")}
                                        style={{ width: null, height: null, flex: 1 }} />
                                </View>
                            </View>
                        </View>
                    </Animated.View>

                </View>

                {/* <View style={{
                        position: "absolute", display: "flex",
                        flexDirection: "row", margin: 25, marginTop: Platform.OS == "ios" ? 50 : 25
                    }}
                    >
                        <TouchableOpacity style={{ padding: 10 }}
                            onPress={() => {  .goBack() }} >
                            <Image source={require('../../assets/Icons/right.png')}
                                style={{
                                    width: 20, resizeMode: "contain",
                                    height: 20
                                }}
                            />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                    </Animated.View > */}
            </KeyboardAvoidingView>
        )
    }
}
