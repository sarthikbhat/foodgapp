import React, { Component } from 'react'
import { Text, View, Image, Dimensions, StyleSheet, Animated, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput } from 'react-native'
import { Neomorph ,NeomorphFlex} from 'react-native-neomorph-shadows';
import Header from '../../Reusables/Header'
// import Animated from 'react-native-reanimated'

export default class SignIn extends Component {

    state = {
        anim: new Animated.Value(0)
    }

componentDidMount=()=>{
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
            inputRange: [0, 100],
            outputRange: [1, 0],
            extrapolate: "clamp",
        })

        var translation = this.state.anim.interpolate({
            inputRange: [0, 300],
            outputRange: [0, 200],
            extrapolate: "clamp",
        })

        var translationOp = this.state.anim.interpolate({
            inputRange: [0,200],
            outputRange: [180,0],
            extrapolate: "clamp",
        })

        var translationImg = this.state.anim.interpolate({
            inputRange: [0,150, 300],
            outputRange: [0,-50,-100],
            extrapolate: "clamp",
        })

        var opaqueOp = this.state.anim.interpolate({
            inputRange: [0, 150,300],
            outputRange: [0,0.5,1],
            extrapolate: "clamp",
        })
        var indexOp = this.state.anim.interpolate({
            inputRange: [0, 300],
            outputRange: [7,10],
            extrapolate: "clamp",
        })

        return (
            <>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                   
                        {/* This if after button press */}
                        <Animated.View style={{ ...StyleSheet.absoluteFill,flex: 1, backgroundColor: "#ebebeb", borderTopLeftRadius: 50, borderTopRightRadius: 50, overflow: "hidden",paddingTop: 35,opacity:opaqueOp,transform: [{
                            translateY: translationOp
                        },],zIndex:indexOp }} >
                            <Header backgroundColor="transparent" back={true} navigation={this.props.navigation} />
                            <View style={{alignItems:'center'}}>
                                <Image source={require("../../Assets/images/login.png")} style={{ width: 150, height: 150, }} />
                                </View>
                            <Text onPress={() => this.poser()} style={{ fontSize: 35, textAlign: 'center', margin: 5, fontFamily: 'OpenSans-Regular',fontWeight:'800',letterSpacing:-1,color:'#3c3c3c',opacity: 1 }}>Welcome back,</Text>
                            <Text style={{ fontSize: 17, textAlign: 'center', fontWeight: '100', opacity: 0.5, fontFamily: 'OpenSans-Regular' }}>Sign in to continue</Text>
                            <View style={{ paddingTop: 30 ,marginBottom:10}}>
                            <NeomorphFlex  swapShadows style={{shadowRadius: 4,borderRadius: 25,backgroundColor: '#ebebeb',marginBottom: 15  ,paddingLeft: 20, maxWidth: 500, minWidth: Math.min(0.65 * Dimensions.get('window').width, 400),alignSelf:'center', color: "#000", borderColor: "#dddddd",borderWidth:1,display:'flex',flexDirection:'row' }}>
                                <Image source={require("../../Assets/icons/email.png")} style={{ width: 25, height: 25,opacity:0.5,alignSelf:'center'}} />
                                <TextInput placeholder="Email" placeholderTextColor="rgba(0,0,0,0.5)" style={{ fontFamily: "OpenSans-Regular", padding: 14, paddingLeft: 20, borderColor: "#dddddd", borderRadius: 0, borderBottomWidth: 0, maxWidth: 500, minWidth: Math.min(0.65 * Dimensions.get('window').width, 400),alignSelf:'center', color: "#000", }} />
                                </NeomorphFlex>
                                <NeomorphFlex  swapShadows style={{shadowRadius: 4,borderRadius: 25,backgroundColor: '#ebebeb',marginBottom: 15  ,paddingLeft: 20, maxWidth: 500, minWidth: Math.min(0.65 * Dimensions.get('window').width, 400),alignSelf:'center', color: "#000", borderColor: "#dddddd",borderWidth:1,display:'flex',flexDirection:'row'  }}>
                                <Image source={require("../../Assets/icons/password.png")} style={{ width: 25, height: 25,opacity:0.5,alignSelf:'center'}} />
                                <TextInput placeholder="Password" placeholderTextColor="rgba(0,0,0,0.5)" style={{ fontFamily: "OpenSans-Regular",  borderColor: "#dddddd", padding: 14, paddingLeft: 20, borderRadius: 0, bordeBottomrWidth: 2, maxWidth: 500, minWidth: Math.min(0.65 * Dimensions.get('window').width, 400),alignSelf:'center', color: "#000" }} />
                                </NeomorphFlex>
                                <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }} />
                                
                            <Text style={{ fontSize: 14, fontWeight: 'bold', opacity: 0.8, fontFamily: 'OpenSans-Regular', color: '#000000',opacity: 0.5, paddingRight:25 ,marginBottom:5}}>Forgot Password?</Text>
                            </View>
                            </View>
                            {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}> */}
                                <TouchableOpacity onPress={()=>{console.log('nue')}}
                                >
                                <NeomorphFlex swapShadows style={{shadowRadius: 5,borderRadius: 15,backgroundColor: '#fc6474',padding:18, alignSelf: 'center', justifyContent: 'center', flexDirection: 'row',width:Dimensions.get('window').width-100}}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', opacity: 0.8, fontFamily: 'OpenSans-Regular', color: '#fff' }}>Continue</Text>
                                    {/* <Image source={require("../../Assets/icons/r2.png")}
                                        style={{ width: 20, height: 20 }} /> */}
                            </NeomorphFlex>
                            </TouchableOpacity>
                            {/* </View> */}
                            
                            <View style={{ flexDirection: 'row', marginTop: 40,justifyContent:"center" }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', opacity: 0.5, fontFamily: 'OpenSans-Regular', color: '#000000', paddingRight: 10 }}>New User?</Text>
                                <Text onPress={() => this.props.navigation.navigate('Signup',{translationImg,translationOp,opaqueOp,indexOp})} style={{ fontSize: 17, fontWeight: 'bold', fontFamily: 'OpenSans-Regular', color: '#fc6474', paddingRight: 10 }}>Signup</Text>
                            </View>
                                {/* <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: '100', opacity: 0.4, fontFamily: 'OpenSans-Regular' }}>Or</Text> */}
                            <View style={{marginTop:15  }}>
                                <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: '100', opacity: 0.4, fontFamily: 'OpenSans-Regular' }}>Or Continue With</Text>
                                <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 30 }}>
                                    {/* <View style={{  }}> */}
                                    <NeomorphFlex swapShadows style={{shadowRadius: 10,borderRadius: 50,backgroundColor: '#ebebeb',  width: 45, height: 45, padding: 10 }}>
                                        <Image source={require("../../Assets/icons/google.png")}
                                            style={{ width: null, height: null, flex: 1 }} />
                                            </NeomorphFlex>
                                    {/* </View> */}
                                    <View style={{ flex: 0.1 }} />
                                    {/* <View style={{ backgroundColor: '#4267b2', borderRadius: 50, width: 45, height: 45, padding: 10 }}> */}
                                    <NeomorphFlex swapShadows style={{shadowRadius: 10,borderRadius: 50,backgroundColor: '#3b5998',  width: 45, height: 45, padding: 10 }}>
                                        <Image source={require("../../Assets/icons/fb.png")}
                                            style={{ width: null, height: null, flex: 1 }} />
                                            </NeomorphFlex>
                                    {/* </View> */}
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
                            onPress={() => { this.props.navigation.goBack() }} >
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
            </>
        )
    }
}
