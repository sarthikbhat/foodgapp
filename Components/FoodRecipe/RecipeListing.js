import React, { Component } from 'react'
import { Text, TouchableOpacity, View, ImageBackground, StatusBar, StyleSheet, Dimensions, Animated, ScrollView, Image, Platform, TextInput, UIManager, TouchableWithoutFeedback } from 'react-native'
import Header from '../../Reusables/Header'
import { recipes, ingredient } from '../../Constants/recipe'
import * as Animatable from 'react-native-animatable'
import { min } from 'react-native-reanimated'
import RecipeCard from './RecipeCard'
import { Neomorph ,NeomorphFlex} from 'react-native-neomorph-shadows';


const heighter = (Dimensions.get('window').width / 1.3)

// var opacity=1
// var zIndex=1

var minWidth = 180
var maxWidth = Dimensions.get("window").width - 40

export class RecipeListing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            focus: true,
            anim: new Animated.Value(0),
            index: 0,
            loop: false,
            array: [],
            count: ['All', 'South Indian', 'North Indian', 'Italian', 'Chinese']
        }
        if (
            Platform.OS === "android" &&
            UIManager.setLayoutAnimationEnabledExperimental
        ) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        // //   this.animater = this.animater.bind(this);
    }

    componentDidMount = () => {
        this.setState({ array: ingredient })
    }


    // passer=(i)=>{
    //     if((i+1)%2==0){
    //         var array =this.state.array
    //         console.log(i);
    //         array.splice(i-1,1)
    //         console.log(array.length);
    //         var temp = this.state.array[i-1]
    //         array.splice(i+1,0,temp)
    //         console.log(array.length);
    //         this.setState({array})
    //     }
    // }

    animater = () => {
        var index
        if (this.state.index == 0) {
            index = 1
        }
        else {
            index = 0
        }
        this.setState(prevState => ({ index: index, loop: this.state.loop - 1 }))
    }

    render() {

        var heightTop = this.state.anim.interpolate({
            inputRange: [0, 300],
            outputRange: [Dimensions.get('window').height / 4, Dimensions.get('window').height / 8],
            extrapolate: "clamp",
        })

        var heightDown = this.state.anim.interpolate({
            inputRange: [0, 300],
            outputRange: [Dimensions.get('window').height - Dimensions.get('window').height / 4, Dimensions.get('window').height - Dimensions.get('window').height / 8],
            extrapolate: "clamp",
        })

        var fontSize = this.state.anim.interpolate({
            inputRange: [0, 300],
            outputRange: [30, 20],
            extrapolate: "clamp",
        })
        var fontSize2 = this.state.anim.interpolate({
            inputRange: [0, 300],
            outputRange: [15, 10],
            extrapolate: "clamp",
        })

        var fontSize2 = this.state.anim.interpolate({
            inputRange: [0, 300],
            outputRange: [15, 12],
            extrapolate: "clamp",
        })

        var opacityTop = this.state.anim.interpolate({
            inputRange: [0, 50],
            outputRange: [1, 0],
            extrapolate: "clamp",
        })

        var Topper = this.state.anim.interpolate({
            inputRange: [0, 300],
            outputRange: [0, -Dimensions.get('window').height / 10],
            extrapolate: "clamp",
        })
        var Topper2 = this.state.anim.interpolate({
            inputRange: [0, 300],
            outputRange: [0, -Dimensions.get('window').height / 15],
            extrapolate: "clamp",
        })

        return (
            <View style={styles.full}>

                <StatusBar barStyle='dark-content' translucent={true} backgroundColor='#fcfcfc' />
                <ImageBackground source={require('../../Assets/images/appbg.png')} style={styles.outerMenu} imageStyle={styles.imageMenu}>
                    <Header backgroundColor="transparent" navigation={this.props.navigation} style={this.props.style} />
                    <Animated.View style={{ height: heightTop }}>
                        {/* <Animated.View
                            useNativeDriver elevation={5} style={{ width: Dimensions.get("window").width - 40, backgroundColor: "#f6f6f5", display: 'flex', flexDirection: "row", padding: 14, alignItems: "center", borderRadius: 50, marginTop: 5, alignSelf: 'center', opacity: opacityTop }} >
                            <Image source={require('../../Assets/icons/search.png')} style={{ width: 15, height: 15, marginLeft: 10 }} resizeMode="contain" />
                            <TextInput style={{ flex: 1, padding: 0, marginLeft: 20 }} placeholder="Seach for a dish name" />
                        </Animated.View> */}
                        <Animated.Text style={{ fontFamily: "OpenSans-SemiBold", fontSize:30, color: "#222222", padding: 20, margin: 10, marginBottom: 0,fontWeight:'bold',paddingTop:0
                        ,transform: [{ translateY: Topper }]
                        ,paddingBottom:2 }} >Recommendations</Animated.Text>
                        <Animated.Text style={{ fontFamily: "OpenSans-Regular", fontSize:14, color: "#222222", padding: 20,margin: 10,paddingTop:0, marginTop:0, marginBottom: 0,opacity:0.5,paddingBottom:8
                         ,transform: [{ translateY: Topper }] 
                         }} >Your favourite cuisine at your fingertips</Animated.Text>
                        <Animated.Text style={{ fontFamily: "OpenSans-SemiBoldItalic", fontSize:15, color: "#222222", padding: 20,margin: 10,paddingTop:0, marginTop:0, marginBottom: 0,opacity:0.8,
                         transform: [{ translateY: Topper }] 
                         }} >"Orange Sandwiches are delicious"</Animated.Text>
                        <Animated.View 
                        style={{ marginBottom: 0, marginTop: 0,transform: [{ translateY: Topper }]}}
                        >
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ marginBottom: 0, marginTop: 0, paddingTop: 18, }} contentContainerStyle={{ alignItems: 'center' }}>
                                {
                                    this.state.count.map((mapper, index) => {
                                        return (
                                            <>
                                                <View style={{ width: 25 }} />
                                                {/* <NeomorphFlex darkShadowColor="#FF3333"   swapShadows style={{shadowRadius: 2, backgroundColor: index == 0 ? '#fc6474' : '#ebebeb', alignSelf: 'flex-start', padding: 8, borderRadius: 15, minWidth: 50, alignItems: 'center', marginBottom: 5, flexDirection: 'row', justifyContent: 'center', }}> */}
                                                <View elevation={4} style={{ backgroundColor: index == 0 ? '#fc6474' : '#fcfcfc', borderColor:index == 0 ? 'transparent' : '#fc6474', alignSelf: 'flex-start',borderWidth:0.8, padding: 8, borderRadius: 15, minWidth: 50, alignItems: 'center', marginBottom: 25, flexDirection: 'row', justifyContent: 'center' }}>
                                                    {
                                                        index == 0
                                                            ?
                                                            <Image source={require('../../Assets/icons/all.png')} style={{ width: 10, height: 10, margin: 5 }} resizeMode="contain" />
                                                            :
                                                            null
                                                    }
                                                    <Animated.Text style={{ fontFamily: "OpenSans-Regular", fontSize: fontSize2, color: index == 0 ? '#ffffff' : '#222222', textAlign: 'center' }} >{mapper}</Animated.Text>
                                                </View>
                                                {/* </NeomorphFlex> */}
                                                <View style={{ width: 0 }} />
                                            </>
                                        )
                                    })
                                }
                            </ScrollView>
                        </Animated.View>
                    </Animated.View>
                    <Animated.View style={{ marginBottom: 50 }}>
                        <Animated.ScrollView style={{ padding: 15, height: heightDown }} 
                        scrollEventThrottle={16}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: { contentOffset: { y: this.state.anim } }
                                    }
                                ],
                                {
                                    useNativeDriver: false
                                }
                            )}
                        >
                            <View style={{ flex: 1, display: "flex", justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', marginBottom: 100 }}>
                                {
                                    this.state.array.map((recipe, index) => {
                                        return (
                                            <View style={{ marginBottom: 25 }}>
                                            {/* <NeomorphFlex 
                                            darkShadowColor="#FF3333" 
                                            lightShadowColor="#ebebeb"
                                            // lightShadowColor="#3344FF" 
                                            swapShadows style={{shadowRadius: 4,width: Dimensions.get("window").width -80, borderRadius: 25, backgroundColor: '#eeeeee', alignSelf: 'center', padding: 20, margin: 10, flexDirection: 'row', display: 'flex'}}> */}
                                                <Animated.View elevation={2} useNativeDriver style={{  width: Dimensions.get("window").width -80, borderRadius: 25, backgroundColor: '#FCFCFC', alignSelf: 'center', padding: 20, margin: 10, flexDirection: 'row', display: 'flex' }}>
                                                    <View>
                                                        <Animated.View style={{ borderRadius: 150, overflow: 'hidden', width: 100, height: 100, alignContent: 'center' }}>
                                                            <Image source={require('../../Assets/images/Noodles.png')} style={{ width: null, height: null, flex: 1 }} />
                                                        </Animated.View>
                                                    </View>
                                                        <View style={{padding:12}}>
                                                                <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 18, color: "#222222",  }} >Paneer Noodles</Text>
                                                                <View style={{flexDirection: 'row', display: 'flex',alignItems:'center',paddingTop:3}}>
                                                                <Animated.View style={{ width: 16, height: 16, borderRadius: 10, }}>
                                                                <Image source={require('../../Assets/icons/star.png')} style={{ width: null, height: null, flex: 1 }} resizeMode="contain" />
                                                                </Animated.View>
                                                                <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 15, color: "#222222", paddingLeft:5,opacity:0.6 }} >4.5</Text>
                                                                </View>
                                                                <View style={{flex:3}}/>
                                                                <View style={{flexDirection: 'row', display: 'flex',alignItems:'center',paddingTop:3}}>
                                                                <Animated.View style={{ width: 16, height: 16, borderRadius: 10, }}>
                                                                <Image source={require('../../Assets/icons/clock.png')} style={{ width: null, height: null, flex: 1 }} resizeMode="contain" />
                                                                </Animated.View>
                                                                <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 12, color: "#222222", paddingLeft:5,opacity:0.6 }} >25 min</Text>
                                                                <View style={{flex:3}}/>
                                                                <Animated.View style={{ width: 16, height: 16, borderRadius: 10, }}>
                                                                <Image source={require('../../Assets/icons/calories.png')} style={{ width: null, height: null, flex: 1 }} resizeMode="contain" />
                                                                </Animated.View>
                                                                <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 12, color: "#222222", paddingLeft:5,opacity:0.6 }} >360 kcal</Text>
                                                                </View>
                                                        </View>
                                                        <View style={{paddingLeft:10,alignItems:'center',marginTop:12,marginLeft:-2}}>
                                                        {/* <NeomorphFlex
                                                        
                                                                style={{
                                                                    shadowRadius: 3,
                                                                    borderRadius: 100,
                                                                    backgroundColor: '#ebebeb',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',width: 45, height: 45
                                                                }}
                                                                >
                                                                <NeomorphFlex
                                                                    inner
                                                                    style={{
                                                                    shadowRadius: 7,
                                                                    borderRadius: 90,
                                                                    backgroundColor: '#fc6474',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',width: 30, height: 30
                                                                    }}
                                                                >
                                                                    <NeomorphFlex
                                                                    style={{
                                                                        shadowRadius: 7,
                                                                        borderRadius: 50,
                                                                        backgroundColor: '#ebebeb',
                                                                        width: 20, height: 20, borderRadius: 10,marginTop:1,justifyContent:'center',alignItems:'center'
                                                                    }}
                                                                    > */}
                                                                    <View></View>
                                                                    <Animated.View style={{ width: 15, height: 15,alignItems:'center' }}>
                                                                    <Image source={require('../../Assets/icons/next.png')} style={{ width: null, height: null, flex: 1 }} resizeMode="contain" />
                                                        </Animated.View>
                                                                        {/* </NeomorphFlex>
                                                                </NeomorphFlex>
                                                                </NeomorphFlex> */}
                                                                                                                        
                                                            {/* <NeomorphFlex  swapShadows style={{shadowRadius: 4,backgroundColor:'#ebebeb'}}> */}
                                                        
                                                        {/* </NeomorphFlex> */}
                                                        </View>
                                                </Animated.View>
                                                {/* </NeomorphFlex> */}
                                            </View>
                                        )
                                    })

                                }
                            </View>
                        </Animated.ScrollView>
                    </Animated.View>
                </ImageBackground>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    full: {
        flex: 1,
        zIndex: 1,
        // marginTop: 30,
        backgroundColor:'#fcfcfc',
        padding: 15,
        alignItems: 'center'
    },
    half: {
        flex: 1,
        flexDirection: "row",
    },
    floater: {
        display: "flex",
        padding: 200,borderBottomLeftRadius: 150,
        marginTop: -140,
    },
    outerMenu: {
        display: 'flex',
        resizeMode: "cover",
        marginTop: 30,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    imageMenu: {
        width: Dimensions.get('window').width,
        opacity: 0.4,
    }
});

export default RecipeListing
