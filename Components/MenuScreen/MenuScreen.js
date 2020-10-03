import React, { Component } from 'react'
import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native'

export default class SignIn extends Component {
    render() {
        return (
            <>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                // keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ width: "100%", height: 0.5 * Dimensions.get('window').height }} >
                            <Image source={require("../../Assets/images/l5.jpg")} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width - 120, }} />
                        </View>
                        <View style={{ flex: 1, backgroundColor: "#ffffff", marginTop: -0.2 * Dimensions.get('window').height, borderTopLeftRadius: 50, borderTopRightRadius: 50, overflow: "hidden", padding: 25 }} >
                            <Text style={{ fontSize: 40, textAlign: 'center', margin: 5, fontFamily: 'PatrickHand-Regular' }}>Food Gapp</Text>
                            <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: '100', opacity: 0.4, fontFamily: 'Roboto' }}>Login to your Account</Text>
                            <View style={{ alignItems: 'center', paddingTop: 30 }}>
                                <TextInput placeholder="Email" placeholderTextColor="#000000" style={{ fontFamily: "Roboto", marginBottom: 10, padding: 14, paddingLeft: 20, borderColor: "#ebebeb", borderRadius: 25, borderWidth: 1, maxWidth: 500, minWidth: Math.min(0.85 * Dimensions.get('window').width, 400), color: "#000" }} />
                                <TextInput placeholder="Password" placeholderTextColor="#000000" style={{ fontFamily: "Roboto", marginBottom: 10, padding: 14, paddingLeft: 20, borderColor: "#ebebeb", borderRadius: 25, borderWidth: 1, maxWidth: 500, minWidth: Math.min(0.85 * Dimensions.get('window').width, 400), color: "#000" }} />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                                <View style={{ flex: 2 }} />
                                <TouchableOpacity
                                    style={{ backgroundColor: '#E6F0F5', padding: 18, alignItems: 'center', borderRadius: 100, justifyContent: 'center', flexDirection: 'row' }}
                                >
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', opacity: 0.8, fontFamily: 'Roboto', color: '#000000', paddingRight: 25 }}>Continue</Text>
                                    <Image source={require("../../Assets/icons/r2.png")}
                                        style={{ width: 20, height: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                <Text onPress={() => this.props.navigation.navigate('Signup')} style={{ fontSize: 17, fontWeight: 'bold', opacity: 0.8, fontFamily: 'Roboto', color: '#000000', paddingRight: 10, textDecorationLine: 'underline' }}>Sign Up</Text>
                                <View style={{ flex: 1 }} />
                                <Text style={{ fontSize: 17, fontWeight: 'bold', opacity: 0.8, fontFamily: 'Roboto', color: '#000000', paddingRight: 10, textDecorationLine: 'underline' }}>Forgot Password?</Text>
                            </View>
                        <View style={{marginTop:30}}>
                        <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: '100', opacity: 0.4, fontFamily: 'Roboto' }}>Or Continue With</Text>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 30 }}>
                            <View style={{ borderWidth: 0.5, borderRadius: 50, width: 45, height: 45, padding: 10 }}>
                                <Image source={require("../../Assets/icons/gog.png")}
                                    style={{ width: null, height: null, flex: 1 }} />
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={{ backgroundColor: '#4267b2', borderRadius: 50, width: 45, height: 45, padding: 10 }}>
                                <Image source={require("../../Assets/icons/fb.png")}
                                    style={{ width: null, height: null, flex: 1 }} />
                            </View>
                        </View>
                        </View>
                        </View>
                        
                    </View>
                    
                    <View style={{
                        position: "absolute", display: "flex",
                        flexDirection: "row", margin: 25, marginTop: Platform.OS == "ios" ? 50 : 25
                    }}
                    >
                        <TouchableOpacity style={{ padding: 10 }}
                            onPress={() => { this.props.navigation.goBack() }} >
                            <Image source={require('../../Assets/icons/right.png')}
                                style={{
                                    width: 20, resizeMode: "contain",
                                    height: 20
                                }}
                            />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                    </View >


                </KeyboardAvoidingView>
            </>
        )
    }
}
