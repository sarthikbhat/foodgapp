import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView,TouchableNativeFeedback,ImageBackground,StyleSheet } from 'react-native';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import * as Animatable from 'react-native-animatable'
import {
    GoogleSignin,
  } from '@react-native-google-signin/google-signin';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Header from '../../Reusables/Header';
  // import { LoginManager } from 'react-native-fbsdk';

export default class Profile extends React.Component {

    constructor(props){
        super(props)

        this.state={
            log:false
        }
    }
    

    signOut = async () => {
        var status
        var log = await AsyncStorage.getItem('type')
        log = log != undefined && log != null ? JSON.parse(log) : undefined
        if (log === 'google') {
          await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await AsyncStorage.setItem('status', JSON.stringify(false))
            await AsyncStorage.removeItem('user')
            await AsyncStorage.removeItem('type')
        }
        else if (log === 'facebook') {
            // LoginManager.logOut()
            await AsyncStorage.setItem('status', JSON.stringify(false))
            await AsyncStorage.removeItem('user')
            await AsyncStorage.removeItem('type')
        }
        else {
            await AsyncStorage.setItem('status', JSON.stringify(false))
            await AsyncStorage.removeItem('user')
            await AsyncStorage.removeItem('type')
        }
        status=true
        this.setState({log:false})
        // props.navigation.closeDrawer();
      }

      getStatus=async()=>{
        var log = await AsyncStorage.getItem('status')
        log = log != undefined && log != null ? JSON.parse(log) : undefined
        if(log){
            this.setState({log:true})
        }
      }

      componentDidMount(){
        this.getStatus()
      }

    render() {
        return (
           this.state.log?
            <>
             <Header backgroundColor="transparent" user={true} navigation={this.props.navigation} />
            <ScrollView>
               <TouchableOpacity onPress={() => { }} elevation={1} style={{ padding: 20, backgroundColor: "#f9f9f9", borderColor: "#f6f6f6", borderRadius: 50, alignSelf: 'center', marginTop: 10 }}>
                    <Image source={require('../../Assets/icons/my_account_user.png')}
                        style={{ width: Dimensions.get('window').width / 10, resizeMode: "contain", height: Dimensions.get('window').width / 10 }} />
                </TouchableOpacity>
                <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 22, marginTop: 10, paddingTop: 25, alignSelf: "center" }}>Sanjay Nayak</Text>
                <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 16, marginTop: 0, padding: 10, alignSelf: "center", color: "rgba(0,0,0,0.6)" }}>sanjayjnayak99@gmail.com</Text>
                <View
                    style={{
                        borderBottomColor: 'rgba(0,0,0,0.05)',
                        borderBottomWidth: 0.5,
                        marginTop: 20
                    }}
                />
                <Text style={{ fontFamily: "OpenSans-Regular", color: "#2b2b2b", fontSize: 15, padding: 25, paddingBottom: 25 }} >Wishlisted Dishes</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ width: 25 }} />
                    <Animatable.View
                        animation="zoomIn"
                        delay={100}
                        duration={500}
                        useNativeDriver elevation={1} style={{ height: 250, width: 180, borderRadius: 25, backgroundColor: "#ffd18c", alignItems: 'center', padding: 20, marginRight: 25, marginBottom: 5 }} >

                        <Image source={require('../../Assets/images/Noodles.png')} style={{ marginTop: 10, width: 120, height: 120 }} resizeMode="contain" />
                        <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 13, color: "#624e30", marginTop: 20 }} >Royal Manchow Noodles</Text>
                        <View style={{ width: 50, height: 20, backgroundColor: "white", borderRadius: 10, alignSelf: "flex-start", display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                            <Image source={require('../../Assets/icons/star.png')} style={{ width: 12, height: 12 }} resizeMode="contain" />
                            <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 10, marginLeft: 4, marginRight: 5 }} >9.0</Text>
                        </View>
                    </Animatable.View>
                    <Animatable.View
                        animation="zoomIn"
                        delay={150}
                        duration={500}
                        useNativeDriver elevation={1} style={{ height: 250, width: 180, borderRadius: 25, backgroundColor: "#e8d9db", alignItems: 'center', padding: 20, marginRight: 25, marginBottom: 5 }} >

                        <Image source={require('../../Assets/images/PaneerNoodle.png')} style={{ marginTop: 10, width: 140, height: 120 }} resizeMode="contain" />
                        <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 13, color: "#624e30", marginTop: 20 }} >Indian Paneer Noodles</Text>
                        <View style={{ width: 50, height: 20, backgroundColor: "white", borderRadius: 10, alignSelf: "flex-start", display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                            <Image source={require('../../Assets/icons/star.png')} style={{ width: 12, height: 12 }} resizeMode="contain" />
                            <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 10, marginLeft: 4, marginRight: 5 }} >8.5</Text>
                        </View>
                    </Animatable.View>
                </ScrollView>
                <TouchableNativeFeedback onPress={() => this.signOut()}
                            elevation={5} style={{ backgroundColor: "#fc6474", display: 'flex', flexDirection: "row", padding: 16, alignItems: "center", justifyContent: "center", borderRadius: 50, marginTop: 20, marginBottom: 5 }}
                        >
                                    <NeomorphFlex swapShadows style={{ shadowRadius: 5, borderRadius: 15, backgroundColor: '#fc6474', padding: 18, backgroundColor: "#fc6474", display: 'flex', flexDirection: "row", padding: 16, alignItems: "center", justifyContent: "center", borderRadius: 50, marginTop: 20, marginBottom: 5,width: Dimensions.get('window').width - 80,alignSelf:'center' }}>
                                        <Image source={require('../../Assets/icons/logout.png')} style={{ width: 20, height: 20, marginLeft: 10 }} resizeMode="contain" />
                                        <Text style={{ fontFamily: "OpenSans-Regular", color: "white", fontSize: 15, marginLeft: 15 }} >Log Out</Text>
                                    </NeomorphFlex>
                                </TouchableNativeFeedback>
                                </ScrollView>
                                </>
                                :
                                <ScrollView>
                                <ImageBackground source={require('../../Assets/images/logon.jpg')} style={styles.outerMenu} blurRadius={6} imageStyle={styles.imageMenu}>
                                <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Authentication')}
                            elevation={5} style={{ backgroundColor: "#fc6474", display: 'flex', flexDirection: "row", padding: 16, alignItems: "center", justifyContent: "center", borderRadius: 50, marginTop: 20, marginBottom: 5 }}
                        >
                                    <NeomorphFlex swapShadows style={{ shadowRadius: 5, borderRadius: 15, backgroundColor: '#fc6474', padding: 18, backgroundColor: "#fc6474", display: 'flex', flexDirection: "row", padding: 16, alignItems: "center", justifyContent: "center", borderRadius: 50, marginTop: 20, marginBottom: 5,width: Dimensions.get('window').width - 80,alignSelf:'center' }}>
                                        <Image source={require('../../Assets/icons/logout.png')} style={{ width: 20, height: 20, marginLeft: 10 }} resizeMode="contain" />
                                        <Text style={{ fontFamily: "OpenSans-Regular", color: "white", fontSize: 15, marginLeft: 15 }} >Log In</Text>
                                    </NeomorphFlex>
                                </TouchableNativeFeedback>
                                </ImageBackground>
                                
            </ScrollView>
                
           
        )
    }
}

const styles = StyleSheet.create({
    outerMenu: {
    display: 'flex',
    resizeMode: "cover",
    marginTop: 30,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-100,
    justifyContent:'center'
    },
    imageMenu: {
    width: Dimensions.get('window').width,
    
    }
    });