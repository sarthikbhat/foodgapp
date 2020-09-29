import React, { Component } from 'react'
import { Text, TouchableOpacity, View ,Image,ImageBackground,StyleSheet, Dimensions,StatusBar} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useIsDrawerOpen } from '@react-navigation/drawer';


        

isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
};

const MenuScreen = (props) => { 
        return (
            <View style={{flex:1}}>
                <ImageBackground source={require('../../Assets/icons/bg2.jpg')} style={styles.outerMenu} imageStyle={styles.imageMenu}>
                {
                useIsDrawerOpen()?
                <TouchableOpacity 
                 style={{padding:30,alignSelf:'flex-end',marginRight:-10}}
                    onPress={() => { props.navigation.closeDrawer()}} >
                    <Animatable.Image
                    animation='slideInLeft'
                      duration={1200}
                    source={ require('../../Assets/icons/closeicon.png')}
                        style={{
                            width: 25, resizeMode: "contain",
                            height: 25
                        }}
                    />
                </TouchableOpacity>
                :null}
                {
                useIsDrawerOpen()?
                <View 
                 style={{flex:1,justifyContent:'center',marginTop:50}}
                >
                <Animatable.Text animation="slideInLeft" duration={800} style={{fontSize:35,textAlign:'center',padding:20,fontFamily:'KaushanScript-Regular',color:'#ffffff'}}>Food Gapp</Animatable.Text>
                    <Animatable.Text animation="slideInLeft" duration={800} style={{fontSize:20,textAlign:'center',padding:20,fontFamily:'KaushanScript-Regular',color:'#ffffff',marginTop:25}}>Home</Animatable.Text>
                    <Animatable.Text animation="slideInLeft" duration={800} delay={200} style={{fontSize:20,textAlign:'center',padding:20,fontFamily:'KaushanScript-Regular',color:'#ffffff'}}>Camera</Animatable.Text>
                    <Animatable.Text animation="slideInLeft" duration={800} delay={200} style={{fontSize:20,textAlign:'center',padding:20,fontFamily:'KaushanScript-Regular',color:'#ffffff'}}>My Cart</Animatable.Text>
                    <Animatable.Text animation="slideInLeft" duration={800} delay={200} style={{fontSize:20,textAlign:'center',padding:20,fontFamily:'KaushanScript-Regular',color:'#ffffff'}}>Favourites</Animatable.Text>
                    <Animatable.Text animation="slideInLeft" duration={800} delay={200} style={{fontSize:20,textAlign:'center',padding:20,fontFamily:'KaushanScript-Regular',color:'#ffffff'}}>Sign In</Animatable.Text>
                </View>
                :null
                }
                </ImageBackground>
                
            </View>
        )
}

const styles = StyleSheet.create({
    outerMenu: {
        display: 'flex',
        resizeMode: "cover",
        // width: Dimensions.get('window').width,
        // height: isPortrait() ? Dimensions.get('window').height / 1.6 : (Dimensions.get('window').height / 0.5),
        // padding: 15,
        justifyContent: 'flex-start',
        flex: 0.8,
        // overflow:'visible'
    },
    imageMenu: {
        width: Dimensions.get('window').width ,
        height: Dimensions.get('window').height,
        // marginLeft: Dimensions.get('screen').width / 1.7,
        // flex:1

    }
});

export default MenuScreen
