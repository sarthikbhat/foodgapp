import React, { Component } from 'react'
import { Text, TouchableOpacity, View, ImageBackground, StatusBar, StyleSheet, Dimensions, Animated, ScrollView, Image, Platform, TextInput, UIManager, TouchableWithoutFeedback } from 'react-native'
import Header from '../../Reusables/Header'
import { recipes, ingredient } from '../../Constants/recipe'
import { url } from '../../Reusables/constants'
import * as Animatable from 'react-native-animatable'
import { min } from 'react-native-reanimated'
import { Neomorph, NeomorphFlex } from 'react-native-neomorph-shadows';
import { ShadowFlex } from 'react-native-neomorph-shadows';
import Loader from '../Reusables/Loader'


export class RecipeListing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            focus: true,
            anim: new Animated.Value(0),
            index: 0,
            loop: false,
            array: [],
            count: ['All Cuisines', 'South Indian', 'North Indian', 'Italian', 'Chinese'],
            imej: [require("../../Assets/images/berger.png"), require("../../Assets/images/dosa.png"), require("../../Assets/images/paratha.png"), require("../../Assets/images/cheesepizza.png"), require("../../Assets/images/Noodles.png")],
            loading:true,
            data:{}
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
        var ingr=this.props.route.params.ingr.toString()
        fetch(`${url}/rank?objects=${ingr}`).then(res=>{
            res.json().then(res=>{
                this.setState({data:res,loading:false})
            })
        })
    }




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
            inputRange: [0, 700],
            outputRange: [Dimensions.get('window').height / 4, Dimensions.get('window').height / 8],
            extrapolate: "clamp",
        })

        var heightDown = this.state.anim.interpolate({
            inputRange: [0, 700],
            outputRange: [Dimensions.get('window').height - Dimensions.get('window').height / 4, Dimensions.get('window').height - Dimensions.get('window').height / 8],
            extrapolate: "clamp",
        })

        var fontSize = this.state.anim.interpolate({
            inputRange: [0, 700],
            outputRange: [30, 20],
            extrapolate: "clamp",
        })

        var fontSize2 = this.state.anim.interpolate({
            inputRange: [0, 700],
            outputRange: [14, 11],
            extrapolate: "clamp",
        })

        var opacityTop = this.state.anim.interpolate({
            inputRange: [0, 200],
            outputRange: [1, 0],
            extrapolate: "clamp",
        })

        var Topper = this.state.anim.interpolate({
            inputRange: [0, 700],
            outputRange: [0, -Dimensions.get('window').height / 10],
            extrapolate: "clamp",
        })
        var Topper2 = this.state.anim.interpolate({
            inputRange: [0, 700],
            outputRange: [0, -Dimensions.get('window').height / 8],
            extrapolate: "clamp",
        })
        var translateX = this.state.anim.interpolate({
            inputRange: [0, 700],
            outputRange: [0, Dimensions.get('window').width / 8],
            extrapolate: "clamp",
        })

        return (
            <View style={styles.full}>

                <StatusBar barStyle='dark-content' translucent={true} backgroundColor='#fcfcfc' />
                <ImageBackground source={require('../../Assets/images/appbg.png')} style={styles.outerMenu} imageStyle={styles.imageMenu}>
                    <Header backgroundColor="transparent" navigation={this.props.navigation} style={[this.props.style, {}]} />
                    <Loader loading={this.state.loading} />
                    <Animated.View style={{ height: heightTop }}>
                        {/* <Animated.View
                            useNativeDriver elevation={5} style={{ width: Dimensions.get("window").width - 40, backgroundColor: "#f6f6f5", display: 'flex', flexDirection: "row", padding: 14, alignItems: "center", borderRadius: 50, marginTop: 5, alignSelf: 'center', opacity: opacityTop }} >
                            <Image source={require('../../Assets/icons/search.png')} style={{ width: 15, height: 15, marginLeft: 10 }} resizeMode="contain" />
                            <TextInput style={{ flex: 1, padding: 0, marginLeft: 20 }} placeholder="Seach for a dish name" />
                        </Animated.View> */}
                        <Animated.Text style={{
                            fontFamily: "OpenSans-SemiBold", fontSize: 30, color: "#222222", padding: 20, margin: 10, marginBottom: 0, fontWeight: 'bold', paddingTop: 0
                            , transform: [{ translateY: Topper }, { translateX }]
                            , paddingBottom: 2,
                        }} >Recommendations</Animated.Text>
                        <Animated.Text style={{
                            fontFamily: "OpenSans-Regular", fontSize: 14, color: "#222222", padding: 20, margin: 10, paddingTop: 0, marginTop: 0, marginBottom: 0, opacity: 0.5, paddingBottom: 8
                            , transform: [{ translateY: Topper }, { translateX }]
                        }} >Your favourite cuisine at your fingertips</Animated.Text>
                        <Animated.Text style={{
                            fontFamily: "OpenSans-SemiBoldItalic", fontSize: 15, color: "#222222", padding: 20, margin: 10, paddingTop: 0, marginTop: 0, marginBottom: 0, opacity: 0.8,
                            transform: [{ translateY: Topper }, { translateX }]
                        }} >"Orange Sandwiches are delicious"</Animated.Text>
                        <Animated.View
                            style={{ marginBottom: 0, marginTop: 0, transform: [{ translateY: Topper2 }],zIndex:32 }}
                        >
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ marginBottom: 0, marginTop: 0, paddingTop: 18, }} contentContainerStyle={{ alignItems: 'center' }}>
                                {
                                    this.state.count.map((mapper, index) => {
                                        return (
                                            <>
                                                <View style={{ width: 15 }} />
                                                {/* <NeomorphFlex darkShadowColor="#FF3333"   swapShadows style={{shadowRadius: 2, backgroundColor: index == 0 ? '#ee545b' : '#ebebeb', alignSelf: 'flex-start', padding: 8, borderRadius: 15, minWidth: 50, alignItems: 'center', marginBottom: 5, flexDirection: 'row', justifyContent: 'center', }}> */}
                                                <ShadowFlex
                                                    // useArt // <- set this prop to use non-native shadow on ios
                                                    style={{
                                                        shadowOffset: { width: 3, height: 3 },
                                                        shadowOpacity: 0.6,
                                                        shadowColor: index == 0 ? '#ee545b' : '#d2d2d2',
                                                        shadowRadius: 10, backgroundColor: index == 0 ? '#ee545b' : '#fcfcfc', borderColor: index == 0 ? 'transparent' : '#eee', alignSelf: 'flex-start', borderWidth: 0.8, padding: 12, paddingTop: 10, paddingBottom: 10, borderRadius: 15, minWidth: 100, alignItems: 'center', marginBottom: 25, flexDirection: 'row', justifyContent: 'center'
                                                    }}>
                                                    {
                                                        <Image source={this.state.imej[index]} style={{ width: 30, height: 30, margin: 5, marginRight: 10 }} resizeMode="contain" />
                                                    }
                                                    <Animated.Text style={{ fontFamily: "OpenSans-Regular", fontSize: fontSize2, color: index == 0 ? '#ffffff' : '#222222', textAlign: 'center' }} >{mapper}</Animated.Text>
                                                </ShadowFlex>
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
                            // scrollEventThrottle={16}
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
                                 Object.keys(this.state.data).map((key, value) => {
                                        return (
                                            <View style={{ marginBottom: 10 }}>
                                                <ShadowFlex
                                                    // useArt // <- set this prop to use non-native shadow on ios
                                                    style={{
                                                        shadowOffset: { width: 3, height: 5 },
                                                        shadowOpacity: 1,
                                                        shadowColor: "#e4e4e4",
                                                        shadowRadius: 10,
                                                        // borderRadius: 20,
                                                        backgroundColor: 'white',
                                                        // ...include most of View/Layout styles
                                                        width: Dimensions.get("window").width - 60, borderRadius: 25, backgroundColor: '#FCFCFC', alignSelf: 'center', padding: 20, margin: 10, flexDirection: 'row', display: 'flex'
                                                    }}
                                                >
                                                    {/* <Animated.View elevation={6} useNativeDriver style={{ width: Dimensions.get("window").width - 60, borderRadius: 25, backgroundColor: '#FCFCFC', alignSelf: 'center', padding: 20, margin: 10, flexDirection: 'row', display: 'flex' }}> */}
                                                    <View elevation={5} style={{ justifyContent: 'center', width:"40%", maxHeight:130, minHeight:100,overflow:'hidden',borderRadius:80,}} >
                                                        {/* <Animated.View style={{ borderRadius: 150, overflow: 'hidden', width:"100%", alignContent: 'center' }}> */}
                                                            <Image source={{uri:this.state.data[key].images}} style={{ width: '100%',height:'100%',resizeMode:'cover',}} />
                                                        {/* </Animated.View> */}
                                                    </View>
                                                    <View style={{ padding: 12, paddingTop: 0, paddingBottom: 0, paddingLeft: 15, width: "60%", }}>
                                                        <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginBottom: 5, alignItems: "center", marginTop: -2 }}>
                                                            <Text style={{ fontFamily: "OpenSans-Light", fontSize: 16, color: "#222222", paddingLeft: 5, opacity: 0.8 }} >4.5</Text>
                                                            <Animated.View style={{ width: 13.5, height: 13.5, borderRadius: 10, marginLeft: 5 }}>
                                                                <Image source={require('../../Assets/icons/star.png')} style={{ width: null, height: null, flex: 1 }} resizeMode="contain" />
                                                            </Animated.View>
                                                            <View style={{ flex: 1 }} />
                                                            <Animated.View style={{ width: 14, height: 14, borderRadius: 10, marginLeft: 5 }}>
                                                                <Image source={require('../../Assets/icons/veg.png')} style={{ width: null, height: null, flex: 1 }} resizeMode="contain" />
                                                            </Animated.View>
                                                        </View>
                                                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5 }} >
                                                            <Text style={{ fontFamily: "OpenSans-Bold", fontSize: 18, color: "#222222", letterSpacing: -0.5 }} >{key}</Text>
                                                            {/* <Animated.View style={{ width: 16, height: 16, borderRadius: 10,marginLeft:10 }}>
                                                                <Image source={require('../../Assets/icons/veg.png')} style={{ width: null, height: null, flex: 1 }} resizeMode="contain" />
                                                            </Animated.View> */}
                                                        </View>
                                                        <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 16.5, color: "#222222", opacity: 0.6, marginTop: 4, letterSpacing: -0.5 }} >Indian</Text>
                                                        {/* <View style={{ flex: 4 }} /> */}
                                                        <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', paddingTop: 4 }}>
                                                            {/* <Animated.View style={{ width: 16, height: 16, borderRadius: 10, }}>
                                                                <Image source={require('../../Assets/icons/clock.png')} style={{ width: null, height: null, flex: 1 }} resizeMode="contain" />
                                                            </Animated.View>
                                                            <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 12, color: "#222222", paddingLeft: 5, opacity: 0.6 }} >25 min</Text>
                                                            <View style={{ flex: 3 }} /> */}
                                                            {/* <Animated.View style={{ width: 15, height: 15, borderRadius: 10, }}>
                                                                <Image source={require('../../Assets/icons/calories.png')} style={{ width: null, height: null, flex: 1 }} resizeMode="contain" />
                                                            </Animated.View> */}
                                                            <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 15, color: "#222222", paddingLeft: 5, }} >45 mins</Text>
                                                            <View style={{ flex: 1 }} />
                                                            <ShadowFlex
                                                                // useArt // <- set this prop to use non-native shadow on ios
                                                                style={{
                                                                    shadowOffset: { width: 3, height: 5 },
                                                                    shadowOpacity: 0.5,
                                                                    shadowColor: "#ee545b",
                                                                    shadowRadius: 10,
                                                                    // borderRadius: 20,
                                                                    backgroundColor: 'white',
                                                                    // ...include most of View/Layout styles
                                                                    width: 35, height: 35, backgroundColor: "#ee545b", padding: 5, marginTop: 5, borderRadius: 10, justifyContent: "center", alignItems: "center"
                                                                }}>
                                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Recipe',{ingredientName:key,baakiData:this.state.data[key]})}>
                                                                    <Image source={require('../../Assets/icons/next.png')} style={{ width: 13, height: 13, }} resizeMode="contain" />
                                                                </TouchableOpacity>
                                                            </ShadowFlex>
                                                        </View>
                                                    </View>
                                                    <View style={{ paddingLeft: 10, alignItems: 'center', marginTop: 12, marginLeft: -2 }}>
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
                                                                    backgroundColor: '#ee545b',
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
                                                        {/* <View></View> */}
                                                        {/* </NeomorphFlex>
                                                                </NeomorphFlex>
                                                                </NeomorphFlex> */}

                                                        {/* <NeomorphFlex  swapShadows style={{shadowRadius: 4,backgroundColor:'#ebebeb'}}> */}

                                                        {/* </NeomorphFlex> */}
                                                    </View>
                                                    {/* </Animated.View> */}

                                                </ShadowFlex>
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
        backgroundColor: '#fcfcfc',
        padding: 15,
        alignItems: 'center'
    },
    half: {
        flex: 1,
        flexDirection: "row",
    },
    floater: {
        display: "flex",
        padding: 200, borderBottomLeftRadius: 150,
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
