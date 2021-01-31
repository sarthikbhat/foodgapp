import React, { Component } from 'react'
import { Text, TouchableOpacity, View, ImageBackground, StatusBar, StyleSheet, Dimensions, Animated, ScrollView, Image, Platform, TextInput, UIManager, TouchableWithoutFeedback } from 'react-native'
import Header from '../../Reusables/Header'
import { recipes, ingredient } from '../../Constants/recipe'
import * as Animatable from 'react-native-animatable'
import { min } from 'react-native-reanimated'
import RecipeCard from './RecipeCard'



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
        console.log(this.state.index);
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
            outputRange: [25, 20],
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

        return (
            <View style={styles.full}>

                <StatusBar barStyle='dark-content' translucent={true} backgroundColor='#f6f6f7' />
                <ImageBackground source={require('../../assets/Images/appbg.png')} style={styles.outerMenu} imageStyle={styles.imageMenu}>
                    <Header backgroundColor="transparent" navigation={this.props.navigation} style={this.props.style} />
                    <Animated.View style={{ height: heightTop }}>
                        <Animated.View
                            useNativeDriver elevation={5} style={{ width: Dimensions.get("window").width - 40, backgroundColor: "#f6f6f5", display: 'flex', flexDirection: "row", padding: 14, alignItems: "center", borderRadius: 50, marginTop: 5, alignSelf: 'center', opacity: opacityTop }} >
                            <Image source={require('../../assets/Icons/search.png')} style={{ width: 15, height: 15, marginLeft: 10 }} resizeMode="contain" />
                            <TextInput style={{ flex: 1, padding: 0, marginLeft: 20 }} placeholder="Seach for a dish name" />
                        </Animated.View>
                        <Animated.Text style={{ fontFamily: "OpenSans-Bold", fontSize, color: "#222222", padding: 20, margin: 10, marginBottom: 0, transform: [{ translateY: Topper }] }} >Recommendations</Animated.Text>
                        <Animated.View style={{ transform: [{ translateY: Topper }] }}>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ marginBottom: 0, marginTop: 0, paddingTop: 0 }} contentContainerStyle={{ alignItems: 'center' }}>
                                {
                                    this.state.count.map((mapper, index) => {
                                        return (
                                            <>
                                                <View style={{ width: 25 }} />
                                                <View style={{ backgroundColor: index == 0 ? '#ffd18c' : '#e8cea7', alignSelf: 'flex-start', padding: 8, borderRadius: 15, minWidth: 50, alignItems: 'center', marginBottom: 25, flexDirection: 'row', justifyContent: 'center' }}>
                                                    {
                                                        index == 0
                                                            ?
                                                            <Image source={require('../../assets/Icons/all.png')} style={{ width: 10, height: 10, margin: 5 }} resizeMode="contain" />
                                                            :
                                                            null
                                                    }
                                                    <Animated.Text style={{ fontFamily: "OpenSans-Bold", fontSize: fontSize2, color: "#ffffff", textAlign: 'center' }} >{mapper}</Animated.Text>
                                                </View>
                                                <View style={{ width: 0 }} />
                                            </>
                                        )
                                    })
                                }
                            </ScrollView>
                        </Animated.View>
                    </Animated.View>
                    <Animated.View style={{ marginBottom: 50 }}>
                        <Animated.ScrollView style={{ padding: 15, height: heightDown }} scrollEventThrottle={16}
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
                                                <Animated.View useNativeDriver style={{ height: Dimensions.get("window").width / 1.8, width: Dimensions.get("window").width / 2.5, borderRadius: 25, backgroundColor: 'black', alignSelf: 'center', padding: 20, margin: 10, flexDirection: 'row', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                                                    <View>
                                                        <Animated.View style={{ borderRadius: 150, overflow: 'hidden', width: 150, height: 120, alignSelf: 'center', justifyContent: 'center' }}>
                                                            <Image source={require('../../assets/Images/PaneerNoodle.png')} style={{ width: null, height: null, flex: 1 }} />
                                                        </Animated.View>

                                                        <View style={{ backgroundColor: '#ffd18c', width: 55, height: 55, justifyContent: 'center', position: 'absolute', bottom: -65, right: -10, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center', borderColor: '#ffffff', borderWidth: 2, alignSelf: 'flex-end' }}>
                                                            <Image source={require('../../assets/Icons/right.png')}
                                                                style={{ width: 20, height: 20, }}
                                                            />
                                                        </View>
                                                    </View>
                                                </Animated.View>
                                                <Animated.View style={{
                                                    display: 'flex', flexDirection: "row", alignItems: "center", padding: 15, paddingTop: 1,
                                                }}>
                                                    <Text style={{ fontFamily: "OpenSans-Bold", fontSize: 20, color: "#222222", fontWeight: '700' }} >Paneer Chilly</Text>
                                                    <View style={{ flex: 1 }} />
                                                    <Animated.View style={{ width: 12, height: 12, borderRadius: 10, }}>
                                                        <Image source={require('../../assets/Icons/veg.png')} style={{ width: null, height: null, flex: 1 }} resizeMode="contain" />
                                                    </Animated.View>
                                                </Animated.View>

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
