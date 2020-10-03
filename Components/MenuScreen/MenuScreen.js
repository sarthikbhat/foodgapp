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
            <View style={{flex:1,backgroundColor:'#E6F0F5'}}>
                {/* <ImageBackground source={require('../../assets/Icons/bg2.jpg')} style={styles.outerMenu} imageStyle={styles.imageMenu}> */}
                <View style={{backgroundColor:'#E6F0F5'}}>
                {
                useIsDrawerOpen()?
                <TouchableOpacity 
                 style={{padding:30,alignSelf:'flex-end',marginRight:-10}}
                    onPress={() => { props.navigation.closeDrawer()}} >
                    <Animatable.Image
                    animation='slideInLeft'
                      duration={1200}
                    source={ require('../../assets/Icons/close.png')}
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
                //  style={{flex:1,justifyContent:'center',marginTop:50}}
                >
                <Animatable.Text animation="slideInLeft" duration={800} style={{fontSize:35,textAlign:'center',padding:20,fontFamily:'KaushanScript-Regular',color:'#000'}}>Food Gapp</Animatable.Text>
                    <Animatable.Text animation="slideInLeft" duration={800} style={{fontSize:20,textAlign:'center',padding:20,fontFamily:'KaushanScript-Regular',color:'#000',marginTop:25}}>Home</Animatable.Text>
                    <Animatable.Text animation="slideInLeft" duration={800} delay={200} style={{fontSize:20,textAlign:'center',padding:20,fontFamily:'KaushanScript-Regular',color:'#000'}}>Camera</Animatable.Text>
                    <Animatable.Text animation="slideInLeft" duration={800} delay={200} style={{fontSize:20,textAlign:'center',padding:20,fontFamily:'KaushanScript-Regular',color:'#000'}}>My Cart</Animatable.Text>
                    <Animatable.Text animation="slideInLeft" duration={800} delay={200} style={{fontSize:20,textAlign:'center',padding:20,fontFamily:'KaushanScript-Regular',color:'#000'}}>Favourites</Animatable.Text>
                    <Animatable.Text animation="slideInLeft" duration={800} delay={200} style={{fontSize:20,textAlign:'center',padding:20,fontFamily:'KaushanScript-Regular',color:'#000'}}>Sign In</Animatable.Text>
                </View>
                :null
                }
                </View>
                {/* </ImageBackground> */}
                
            </View>
        )
}

const styles = StyleSheet.create({
    full:{

    },
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
