import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Image, StatusBar, StyleSheet, Dimensions, Animated, ScrollView, ImageBackground, Alert, ToastAndroid } from 'react-native'
import Header from '../../Reusables/Header'
import { recipes, ingredient } from '../../Constants/recipe'
import * as Animatable from 'react-native-animatable'
import { Neomorph, NeomorphFlex } from 'react-native-neomorph-shadows';
import Slider from 'react-native-slide-to-unlock';

const MIN_HEIGHT = 0.8 * Dimensions.get('window').height
const MAX_HEIGHT = Dimensions.get('window').height
const MaxBorder = 0
const MinBorder = 80,
    image = Dimensions.get('window').width / 1.8

export class RecipeScreen extends Component {

    constructor() {
        super()
        this.state = {
            scrollY: new Animated.Value(0),
            setter: 0,
            imej: [require("../../Assets/images/berger.png"), require("../../Assets/images/dosa.png"), require("../../Assets/images/paratha.png"), require("../../Assets/images/cheesepizza.png"), require("../../Assets/images/Noodles.png")],
        }
        this.spinValue = new Animated.Value(0)
    }

    poser = () => {
        // this.spinValue.setValue(0)
        Animated.timing(
            this.state.scrollY,
            {
                toValue: 300,
                duration: 200,

                useNativeDriver: false
            },
        ).start()
    }

    render() {
        // const scrollY = useRef(new Animated.Value(0)).current
        const set = this.state.setter === 0 ? recipes : ingredient
        var widthSmaller = this.state.scrollY.interpolate({
            inputRange: [0, 300],
            outputRange: [Dimensions.get('window').width / 1.8, Dimensions.get('window').width / 2.5],
            extrapolate: "clamp",
        })

        var topPositionY = this.spinValue.interpolate({
            inputRange: [0, 300],
            outputRange: [0.01 * MAX_HEIGHT, 0],
            extrapolate: "clamp",

        })

        var topPositionX = this.spinValue.interpolate({
            inputRange: [0, 300],
            outputRange: [20, 15],
            extrapolate: "clamp",

        })

        var texter = this.state.scrollY.interpolate({
            inputRange: [0, 300],
            outputRange: [30, 25],
            extrapolate: "clamp",
        })

        var sizer = this.state.scrollY.interpolate({
            inputRange: [0, 300],
            outputRange: [0, -15],
            extrapolate: "clamp",
        })

        var opX = this.state.scrollY.interpolate({
            inputRange: [0, 300],
            outputRange: [0, 110],
            extrapolate: "clamp",
        })
        var opY = this.state.scrollY.interpolate({
            inputRange: [0, 300],
            outputRange: [0, -35],
            extrapolate: "clamp",
        })

        var topPosition = this.state.scrollY.interpolate({
            inputRange: [0, 800],
            outputRange: [0.15 * MAX_HEIGHT, 0],
            extrapolate: "clamp",

        })

        var smaller = this.state.scrollY.interpolate({
            inputRange: [0, 800],
            outputRange: [3, 0],
            extrapolate: "clamp",

        })




        return (
            <View style={styles.full}>
                <StatusBar barStyle='dark-content' backgroundColor="rgba(0,0,0,0)" translucent={true} />
                <ImageBackground source={require('../../Assets/images/darkfoodgapp.png')} style={styles.outerMenu} imageStyle={styles.imageMenu}>
                    {/* <Header backgroundColor="transparent" back={true} navigation={this.props.navigation}/> */}
                    <View style={{ display: "flex", flexDirection: 'row', margin: 30, marginTop: 40 }} >
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} elevation={10} style={[styles.iconBorder, {}]}><Image source={require('../../Assets/icons/goback.png')} style={{ width: 15, height: 15, resizeMode: "contain" }} /></TouchableOpacity>
                        <Animated.View style={{ flex: 1 }} />
                        <TouchableOpacity onPress={() => ToastAndroid.show('Wishlisted', ToastAndroid.SHORT)} elevation={10} style={[styles.iconBorder, {}]} ><Image source={require('../../Assets/icons/wishlist.png')} style={{ width: 20, height: 20, resizeMode: "contain" }} /></TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: "white", width: "100%", flex: 1, marginTop: "27%", borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: "#fbfaf8" }} >
                        <View style={{ height: "40%", width: "50%", alignSelf: "center", marginTop: "-28%" }} >
                            <Image elevation={10} source={require('../../Assets/images/cheesepizza.png')} style={{ width: null, height: null, flex: 1, resizeMode: "contain" }} />
                        </View>
                        <View style={{ alignSelf: "center", margin: 10 }} >
                            <Text style={{ textAlign: 'center', fontFamily: "OpenSans-Bold", fontSize: 22, letterSpacing: -0.5, color: "#222222", lineHeight: 27 }} >Soba Soup With{'\n'}Shrimp and Greens</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", marginTop: 10 }}>
                            <View style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                <Image elevation={1} source={require('../../Assets/icons/time.png')} style={{ width: 20, height: 20, resizeMode: "contain" }} />
                                <Text style={{ fontSize: 15, fontFamily: "OpenSans-SemiBold", opacity: 0.7, marginLeft: 5, letterSpacing: -0.5 }} >50 min</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginLeft: 25 }}>
                                <Image elevation={1} source={require('../../Assets/icons/caloriered.png')} style={{ width: 20, height: 20, resizeMode: "contain" }} />
                                <Text style={{ fontSize: 15, fontFamily: "OpenSans-SemiBold", opacity: 0.7, marginLeft: 5, letterSpacing: -0.5 }} >325 kcal</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginLeft: 25 }}>
                                <Image elevation={1} source={require('../../Assets/icons/starh.png')} style={{ width: 20, height: 20, resizeMode: "contain" }} />
                                <Text style={{ fontSize: 15, fontFamily: "OpenSans-SemiBold", opacity: 0.7, marginLeft: 5, letterSpacing: -0.5 }} >4.8</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => ToastAndroid.show('Wishlisted', ToastAndroid.SHORT)}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center", margin: 20, alignSelf: "center", backgroundColor: "#ee545b", padding: 15, paddingLeft: 20, paddingRight: 20, borderRadius: 25 }} >
                                <Image elevation={1} source={require('../../Assets/icons/heart.png')} style={{ width: 20, height: 20, resizeMode: "contain", marginRight: 15 }} />
                                <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 16, color: "white" }}>Add To WishList</Text>
                            </View>
                        </TouchableOpacity>
                        <ScrollView>
                            <View style={{ marginTop: 5 }} >
                                <Text style={{ fontFamily: "OpenSans-Bold", fontSize: 17.5, color: "#222222", marginBottom: 10, marginLeft: 28 }}>Ingredients</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: 25 }} />
                                        {
                                            this.state.imej.map((elm, index) => {
                                                return <View elevation={1} style={{ padding: 15, margin: 5, marginBottom: 15, backgroundColor: 'white', alignItems: "center", minWidth: 75, minHeight: 125, borderRadius: 45, justifyContent: "center" }} >
                                                    <Image elevation={1} source={elm} style={{ width: 35, height: 35, resizeMode: "contain" }} />
                                                    <Text style={{ fontSize: 14, fontFamily: "OpenSans-SemiBold", opacity: 0.7, marginTop: 10, letterSpacing: -0.5 }} >Broccolli</Text>
                                                </View>
                                            })
                                        }
                                        <View style={{ width: 25 }} />
                                    </View>
                                </ScrollView>
                            </View>
                            {/* <NeomorphFlex inner style={{shadowRadius: 3,borderRadius: 100,backgroundColor: '#ebebeb',justifyContent: 'center',alignSelf: 'center',  padding:5,
                                backgroundColor: '#eee',
                                borderRadius: 50,
                                overflow: 'hidden',
                                width: '90%',}}> */}
                            <View style={{ width: Dimensions.get('window').width - 40, alignSelf: 'center', backgroundColor: '#eee', borderRadius: 60, padding: 10, margin: 8, paddingBottom: 5, paddingTop: 5 }}>

                                <Slider childrenContainer={{}} onEndReached={() => { this.props.navigation.navigate('ActualRecipe') }}
                                    containerStyle={{
                                        justifyContent: 'center', alignItems: 'center', marginLeft: 10,
                                        backgroundColor: '#eee',
                                        borderRadius: 50,
                                        overflow: 'hidden',
                                        width: Dimensions.get('window').width - 50, paddingLeft: 0, paddingRight: 0, alignSelf: 'center',
                                        // opacity: 0.9
                                        // elevation:4
                                    }}
                                    sliderElement={
                                        <View elevation={10} style={{
                                            justifyContent: "center", alignItems: "center", height: 60, width: 60, backgroundColor: "transparent", borderRadius: 30, overflow: 'visible', marginLeft: '-2.5%', marginBottom: 0
                                        }} >
                                            <View style={{ position: 'absolute', right: 2, width: Dimensions.get('window').width - 50, backgroundColor: '#ee545b', height: 60, justifyContent: 'center', borderRadius: 30 }}>
                                                <Text style={{ fontSize: 15, fontFamily: "OpenSans-SemiBold", letterSpacing: -0.5, textAlign: 'center', marginLeft: 15, color: '#fff', alignSelf: 'center' }}>Voila!! You have unlocked the recipe</Text>
                                            </View>
                                            <Image source={require('../../Assets/icons/next.png')} style={{ width: 20, height: 20, resizeMode: "contain" }} />
                                        </View>
                                        // <Image style={{ width: 50,margin: 4, borderRadius: 5, height: 50, backgroundColor: 'red',}}
                                        // source={{uri:'https://facebook.github.io/react-native/docs/assets/favicon.png', }} /> 
                                    }>
                                    <Text style={{ fontSize: 18, fontFamily: "OpenSans-SemiBold", opacity: 0.5, letterSpacing: -0.5, textAlign: 'center', marginLeft: 15 }}>Slide to know the full recipe</Text>
                                </Slider>
                            </View>
                        </ScrollView>
                        {/* </NeomorphFlex> */}
                    </View>
                </ImageBackground>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    full: {
        flex: 1,
    },
    half: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginTop: 45,
        borderTopLeftRadius: 75,
        borderTopRightRadius: 75,
        elevation: 10,
        padding: 25,
    },
    outerMenu: {
        display: 'flex',
        resizeMode: "cover",
        flex: 1,
        // marginTop: 30,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    imageMenu: {
        width: Dimensions.get('window').width,
        opacity: 1,
    },
    iconBorder: {
        // padding:12,
        justifyContent: "center",
        alignItems: "center",
        height: 40, width: 40,
        backgroundColor: "#fbfaf8",
        borderRadius: 25
    }
});

export default RecipeScreen
