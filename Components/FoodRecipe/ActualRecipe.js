import React, { Component } from 'react'
import { Text, TouchableOpacity, View, ImageBackground, StatusBar, StyleSheet, Dimensions, Animated, ScrollView, Image, Platform, TextInput,UIManager, ToastAndroid } from 'react-native'
import Header from '../../Reusables/Header'
import { max, min } from 'react-native-reanimated'
import { Neomorph, NeomorphFlex } from 'react-native-neomorph-shadows';
import { ShadowFlex } from 'react-native-neomorph-shadows';
import { recipes, ingredient } from '../../Constants/recipe'
import LinearGradient from 'react-native-linear-gradient';

const MIN_HEIGHT = 0.8 * Dimensions.get('window').height
const MAX_HEIGHT = Dimensions.get('window').height

export class ActualRecipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
           scrollY:new Animated.Value(0),
           scrollY2:new Animated.Value(0),
        }
        if (
            Platform.OS === "android" &&
            UIManager.setLayoutAnimationEnabledExperimental
        ) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentDidMount = () => {
    }

    render() {
        
        const height = this.state.scrollY.interpolate({
            inputRange: [0,800],
            // outputRange: ['0%','50%','0%'],
            outputRange: [ Dimensions.get('window').height/2, 0],
            extrapolate: "clamp",
        })
        const opacity = this.state.scrollY.interpolate({
            inputRange: [0,100],
            // outputRange: ['0%','50%','0%'],
            outputRange: [ 1, 0],
            extrapolate: "clamp",
        })
        const opacity2 = this.state.scrollY.interpolate({
            inputRange: [0,550],
            // outputRange: ['0%','50%','0%'],
            outputRange: [ 1, 0],
            extrapolate: "clamp",
        })
        const rev = this.state.scrollY.interpolate({
            inputRange: [0,300],
            // outputRange: ['0%','50%','0%'],
            outputRange: [ 0, 1],
            extrapolate: "clamp",
        })
        const height2 = this.state.scrollY.interpolate({
            inputRange: [0,800],
            // outputRange: ['0%','50%','0%'],
            outputRange: [ Dimensions.get('window').height/2, 0],
            extrapolate: "clamp",
        })
        var topPosition = this.state.scrollY.interpolate({
            inputRange: [0, 800],
            outputRange: [0,-50],
            extrapolate: "clamp",
        })
        var scale = this.state.scrollY.interpolate({
            inputRange: [0, 800],
            outputRange: [1.2,0.8],
            extrapolate: "clamp",
        })
        var bg = this.state.scrollY.interpolate({
            inputRange: [0, 0,200],
            outputRange: ['transparent','transparent','#fff'],
            extrapolate: "clamp",
        })
        return (
            <View style={styles.full}>

                <StatusBar barStyle='light-content' translucent={true} backgroundColor='rgba(0,0,0,0)' />
                
                <Animated.View style={{ display: "flex", flexDirection: 'row', margin: 30, marginTop: 40,position:'absolute',
               
            }}
                 >
                     <TouchableOpacity onPress={()=>this.props.navigation.goBack()} elevation={10} style={[styles.iconBorder,{}]}><Image source={require('../../Assets/icons/goback.png')} style={{ width: 15, height: 15, resizeMode: "contain" }} /></TouchableOpacity>
                        <Animated.View style={{ flex: 1 }} />
                        <TouchableOpacity onPress={()=>ToastAndroid.show('Wishlisted',ToastAndroid.SHORT)} elevation={10} style={[styles.iconBorder,{}]} ><Image source={require('../../Assets/icons/wishlist.png')} style={{ width: 20, height: 20, resizeMode: "contain" }} /></TouchableOpacity>
                    </Animated.View>
                      <Animated.View style={{position:'absolute',top:0,height: Dimensions.get('window').height/2,opacity:opacity2,width: Dimensions.get('window').width,
                     transform: [{
                        scale
                    }],
                    }}>
                        <Image source={require('../../Assets/images/l2.jpg')} style={{width: null, height:null, resizeMode:'cover',flex:1}} resizeMode="contain" />
                        </Animated.View>
                        <Animated.View style={{position:'absolute', marginTop: 0,alignItems:'center',width:'100%',zIndex:25,backgroundColor:bg,padding:40,opacity:rev
                }}>
                <Animated.Text style={{fontFamily:"OpenSans-SemiBold", fontSize:25,color:"black",textAlign:'center',letterSpacing:0,opacity:1 }}>Your Cuisine</Animated.Text>
                    </Animated.View>
                     <Animated.ScrollView showsVerticalScrollIndicator={false} ref={ref => this.myref = ref} style={{backgroundColor:''}}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: { contentOffset: { y: this.state.scrollY } }
                                }
                            ],
                            {
                                useNativeDriver: false
                            },
                            )
                        
                        }
                    >
                  
                    <Animated.View style={{width: Dimensions.get('window').width,height:Dimensions.get('window').height/2
                //   ,transform:[{
                //     translateX
                // }]   
                }}     
                    >
                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)', '#fff']} style={styles.linearGradient}>
                </LinearGradient>
                    </Animated.View>
                    
                {/* <View> */}
                <Animated.View style={{
                    // flex: 1,
                    // // backgroundColor: '#ffffff',
                    // position:'absolute',
                    // bottom:0,
                    // left:0,
                    // height:MAX_HEIGHT*0.55,
                    // width:Dimensions.get('window').width,
                    // // marginTop: 45,
                    // // // elevation: 10,
                    // // padding: 25,
                    // transform: [{
                    //     translateY: topPosition
                    // }],
                    backgroundColor:'#fff'
                    // // paddingBottom:100
                    
                }}>
               <Animated.View style={{opacity
                }}>
                <Animated.Text style={{fontFamily:"OpenSans-SemiBold", fontSize:25,color:"black",textAlign:'center',letterSpacing:0,opacity:1 }}>Your Cuisine</Animated.Text>
                    </Animated.View>
                <Animated.ScrollView showsVerticalScrollIndicator={false} ref={ref => this.myref = ref} style={{padding:15,marginBottom:15,}}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: { contentOffset: { y: this.state.scrollY } }
                                }
                            ],
                            {
                                useNativeDriver: false
                            }
                            )
                        
                        }
                        
                    >
                {
                    recipes.map((recipe,index) => {
                        return (
                            <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 20 }} key={index}>
                                        <View style={{ justifyContent: 'flex-start', flex: 0.1 }}>
                                            <View
                                                style={{ width: 35, backgroundColor: '#fdc12d', padding: 8, alignItems: 'center', borderRadius: 20, justifyContent: 'center',marginTop:10 }}
                                                >
                                                <Animated.Text style={{ fontSize: 15,color:'white',fontFamily:"OpenSans-Regular",}}>{index+1}</Animated.Text>
                                            </View>
                                        </View>
                                        <Animated.Text style={{ fontSize: 16, padding: 2, flex: 1,fontFamily:"OpenSans-Regular",lineHeight:25,letterSpacing:0 ,marginLeft:20,}}>{recipe}</Animated.Text>
                                    </View>
                                )
                                
                            })
                        }
                        </Animated.ScrollView>
                </Animated.View>
                {/* </View> */}
                        </Animated.ScrollView>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    full: {
        flex: 1,
        // zIndex: 1,
        // marginTop: 30,
        backgroundColor: '#fcfcfc',
        // padding: 15,
        // alignItems: 'center'
    },
    linearGradient: {
        // paddingLeft: 15,
        // paddingRight: 15,
        // borderRadius: 5,
        height: Dimensions.get('window').height/2,
        // zIndex:-1,
        width: Dimensions.get('window').width,
        position:'absolute'
      },
    outerMenu: {
        display: 'flex',
        resizeMode: "cover",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    imageMenu: {
        width: Dimensions.get('window').width,
        opacity: 0.4,
    },
    iconBorder: {
        // padding:12,
        justifyContent: "center",
        alignItems: "center",
        height: 40, width: 40,
        backgroundColor: "#fbfaf8",
        borderRadius: 25,
        zIndex:78
        
    }
});

export default ActualRecipe