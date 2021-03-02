import React, { Component } from 'react'
import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView, Animated, StyleSheet, ToastAndroid } from 'react-native'
import { Neomorph ,NeomorphFlex} from 'react-native-neomorph-shadows';
import Header from '../../Reusables/Header'

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

    signUp = () => {
        const { email, password, name } = this.state
        if (email != undefined && password != undefined && name != undefined && email.trim().length != 0 && name.trim().length != 0 && password.trim().length != 0) {
            fetch(`http://192.168.0.104:5000/signUp?email=${email}&password=${password}&name=${name}`).then(res => {
                res.json().then(res => {
                    if (res != false) {
                        // asyncstorage baaki chhe
                        ToastAndroid.show('SignUp Successful', ToastAndroid.SHORT)
                        this.props.navigation.goBack()
                        this.props.navigation.goBack()
                    }else{
                        ToastAndroid.show('Email Id already exists', ToastAndroid.SHORT)
                    }
                })
            })

        }
        else {
            ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT)
        }
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
                        ...StyleSheet.absoluteFill, flex: 1, backgroundColor: "#ebebeb", borderTopLeftRadius: 50, borderTopRightRadius: 50, overflow: "hidden", paddingTop: 35, opacity: opaqueOp, transform: [{
                            translateY: translationOp
                        },], zIndex: indexOp
                    }} >
                        <Header backgroundColor="transparent" back={true} navigation={this.props.navigation} />
                         <View style={{alignItems:'center'}}>
                                <Image source={require("../../Assets/images/login.png")} style={{ width: 120, height: 120, }} />
                                </View>
                        <Text style={{ fontSize: 35, textAlign: 'center', margin: 5, fontFamily: 'OpenSans-Bold',fontWeight:'800',letterSpacing:-1,color:'#3c3c3c',opacity: 1}}>Create Account</Text>
                        <Text style={{ fontSize: 17, textAlign: 'center', fontWeight: '100', opacity: 0.5, fontFamily: 'OpenSans-Regular' }}>Dive into the journey of healthy park</Text>
                        <View style={{ alignItems: 'center', paddingTop: 30 }}>
                        <NeomorphFlex  swapShadows style={{shadowRadius: 4,borderRadius: 25,backgroundColor: '#ebebeb',marginBottom: 15  ,paddingLeft: 20, maxWidth: 500, minWidth: Math.min(0.65 * Dimensions.get('window').width, 400),alignSelf:'center', color: "#000", borderColor: "#dddddd",borderWidth:1,display:'flex',flexDirection:'row' }}>
                                <Image source={require("../../Assets/icons/user.png")} style={{ width: 25, height: 25,opacity:0.5,alignSelf:'center'}} />
                                <TextInput placeholder="Name" onChangeText={(name) => this.setState({ name })}  placeholderTextColor="rgba(0,0,0,0.5)" style={{ fontFamily: "OpenSans-Regular", padding: 14, paddingLeft: 20, borderColor: "#dddddd", borderRadius: 0, borderBottomWidth: 0, maxWidth: 500, minWidth: Math.min(0.65 * Dimensions.get('window').width, 400),alignSelf:'center', color: "#000", }} />
                                </NeomorphFlex>
                                <NeomorphFlex  swapShadows style={{shadowRadius: 4,borderRadius: 25,backgroundColor: '#ebebeb',marginBottom: 15  ,paddingLeft: 20, maxWidth: 500, minWidth: Math.min(0.65 * Dimensions.get('window').width, 400),alignSelf:'center', color: "#000", borderColor: "#dddddd",borderWidth:1,display:'flex',flexDirection:'row' }}>
                                <Image source={require("../../Assets/icons/email.png")} style={{ width: 25, height: 25,opacity:0.5,alignSelf:'center'}} />
                                <TextInput placeholder="Email" onChangeText={(email) => this.setState({ email })}  placeholderTextColor="rgba(0,0,0,0.5)" style={{ fontFamily: "OpenSans-Regular", padding: 14, paddingLeft: 20, borderColor: "#dddddd", borderRadius: 0, borderBottomWidth: 0, maxWidth: 500, minWidth: Math.min(0.65 * Dimensions.get('window').width, 400),alignSelf:'center', color: "#000", }} />
                                </NeomorphFlex>
                                <NeomorphFlex  swapShadows style={{shadowRadius: 4,borderRadius: 25,backgroundColor: '#ebebeb',marginBottom: 15  ,paddingLeft: 20, maxWidth: 500, minWidth: Math.min(0.65 * Dimensions.get('window').width, 400),alignSelf:'center', color: "#000", borderColor: "#dddddd",borderWidth:1,display:'flex',flexDirection:'row'  }}>
                                <Image source={require("../../Assets/icons/password.png")} style={{ width: 25, height: 25,opacity:0.5,alignSelf:'center'}} />
                                <TextInput placeholder="Password" onChangeText={(password) => this.setState({ password })}  placeholderTextColor="rgba(0,0,0,0.5)" style={{ fontFamily: "OpenSans-Regular",  borderColor: "#dddddd", padding: 14, paddingLeft: 20, borderRadius: 0, bordeBottomrWidth: 2, maxWidth: 500, minWidth: Math.min(0.65 * Dimensions.get('window').width, 400),alignSelf:'center', color: "#000" }} />
                                </NeomorphFlex>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        
                            <TouchableOpacity onPress={()=>{this.signUp()}}
                                >
                                <NeomorphFlex swapShadows style={{shadowRadius: 5,borderRadius: 15,backgroundColor: '#fc6474',padding:18, alignSelf: 'center', justifyContent: 'center', flexDirection: 'row',width:Dimensions.get('window').width-100}}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', opacity: 0.8, fontFamily: 'OpenSans-Regular', color: '#fff' }}>Continue</Text>
                                    {/* <Image source={require("../../Assets/icons/r2.png")}
                                        style={{ width: 20, height: 20 }} /> */}
                            </NeomorphFlex>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            
                            <Text style={{ fontSize: 17, fontWeight: 'bold', opacity: 0.8, fontFamily: 'OpenSans-Regular', color: '#000000', paddingRight: 10, textDecorationLine: 'underline' }}>Forgot Password?</Text>
                        </View> */}
                        <View style={{ flexDirection: 'row', marginTop: 40,justifyContent:"center" }}>
                                <Text  style={{ fontSize: 17, fontWeight: 'bold', opacity: 0.5, fontFamily: 'OpenSans-Regular', color: '#000000', paddingRight: 4 }}>Already Have a account?</Text>
                                <Text onPress={() => this.props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'Authentication' }],
                            })} style={{ fontSize: 17, fontWeight: 'bold', fontFamily: 'OpenSans-Regular', color: '#fc6474', paddingRight: 0 }}>Signin</Text>
                            </View>
                        <View style={{ marginTop: 30 }}>
                            <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: '100', opacity: 0.4, fontFamily: 'OpenSans-Regular' }}>Or Continue With</Text>
                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 30 }}>
                                <View style={{ borderWidth: 0.5, borderRadius: 50, width: 45, height: 45, padding: 10 }}>
                                    <Image source={require("../../Assets/icons/google.png")}
                                        style={{ width: null, height: null, flex: 1 }} />
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={{ backgroundColor: '#4267b2', borderRadius: 50, width: 45, height: 45, padding: 10 }}>
                                    <Image source={require("../../Assets/icons/fb.png")}
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
                            <Image source={require('../../Assets/icons/right.png')}
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
