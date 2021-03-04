import React, { Component } from 'react'
import { Text, View, Image, TextInput, StatusBar, ScrollView, Dimensions, TouchableOpacity, Animated, StyleSheet, Platform, LayoutAnimation, UIManager, ImageBackground, KeyboardAvoidingView } from 'react-native'
import Header from '../../Reusables/Header'
import * as Animatable from 'react-native-animatable'
import { recipes } from '../../Constants/recipe'
import { Neomorph, NeomorphFlex } from 'react-native-neomorph-shadows';
import { url, ingredients } from '../../Reusables/constants'

const bgcolor = [
    'ffd18c',
    '96b3e0',

]


var zindex = -10
export default class AfterCamera extends Component {
    constructor(props) {
        super(props)
        this.state = {
            focus: true,
            anim: new Animated.Value(0),
            index: 0,
            loop: false,
            imej: [require("../../Assets/images/berger.png"), require("../../Assets/images/dosa.png"), require("../../Assets/images/paratha.png"), require("../../Assets/images/cheesepizza.png"), require("../../Assets/images/Noodles.png")],
            show: true,
            ingr: ['Potato', 'Tomato', 'Chilli'],
            text: ""
        }
        if (
            Platform.OS === "android" &&
            UIManager.setLayoutAnimationEnabledExperimental
        ) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }


    componentDidMount = () => {
        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            console.log('focus');
            this.setState({
                focus: true,
                anim: new Animated.Value(0),
                index: 0,
                loop: false,
                show: true,
            })
        })
    }
    componentWillUnmount() {
        this._unsubscribe()
    }


    animater = () => {
        Animated.sequence([
            Animated.timing(this.state.anim, {
                toValue: 2,
                duration: 1800,
                useNativeDriver: false
            }),
            // Animated.timing(this.state.anim, {
            //     toValue: 0,
            //     duration: 1000,
            //     useNativeDriver: false
            // }),
            // Animated.timing(this.state.anim, {
            //     toValue: 1,
            //     duration: 1000,
            //     useNativeDriver: false
            // }),
        ]).start();
        setTimeout(() => {
            // console.log('Hello');
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.props.navigation.navigate('FoodRecipe')
        }, 1750);
    }

    searchIngr = (text) => {

        this.setState({ text })

    }


    render() {

        const matched = this.state.ingr // this.props.navigation.params.ingredients

        var regex = new RegExp(this.state.text.toLowerCase(), 'g');

        let answer = Object.keys(ingredients).filter(elm => {
            return elm.toLowerCase().match(regex) != null;
        })

        const unmatched = answer.map((elm, index) => {
            if (this.state.ingr.indexOf(elm) == -1)
                return <TouchableOpacity onPress={() => { LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);this.setState({ ingr: [elm, ...this.state.ingr], text: '' }) }} ><View elevation={2} style={{ padding: 15, margin: 5, marginBottom: 15, backgroundColor: 'white', alignItems: "center", minWidth: 75, minHeight: 125, borderRadius: 45, justifyContent: "center" }} >
                    <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'green', padding: 8, borderRadius: 50, paddingBottom: 1, paddingTop: 0 }}>
                        <Text style={{ fontSize: 20, color: "#fff" }}>+</Text>
                    </View>
                    <Image elevation={5} source={{ uri: ingredients[elm] }} style={{ width: 35, height: 35, resizeMode: "contain" }} />
                    <Text style={{ fontSize: 14, fontFamily: "OpenSans-SemiBold", opacity: 0.7, marginTop: 10, letterSpacing: -0.5 }} >{elm}</Text>
                </View></TouchableOpacity>
        })

        const rotateY = this.state.anim.interpolate({
            inputRange: [0, 0.5, 1, 1.5, 2],
            outputRange: ["0deg", "-90deg", "-180deg", "-90deg", "0deg"]
        })

        const scale = this.state.anim.interpolate({
            inputRange: [0, 0.5, 1, 1.5, 2],
            outputRange: [1, 9, 1, 9, 1]
        })

        const translateX = this.state.anim.interpolate({
            inputRange: [0, 0.5, 1, 1.5, 2],
            // outputRange: ['0%','50%','0%']
            outputRange: [0, 10, 0, 10, 0]
        })

        const zIndex = this.state.anim.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [-10, 10, 0]
        })

        const backgroundColor = this.state.anim.interpolate({
            inputRange: [0, 0.001, 0.5, 0.501, 1, 2],
            outputRange: [
                '#ebebeb',
                '#ebebeb',
                '#ebebeb',
                '#fc6474',
                '#fc6474',
                '#ebebeb',
            ],
        });
        const dotbgColor = this.state.anim.interpolate({
            inputRange: [0, 0.001, 0.5, 0.501, 0.9, 1, 2.1],
            outputRange: [
                '#fc6474',
                '#fc6474',
                '#fc6474',
                '#f6f6f7',
                '#f6f6f7',
                '#f6f6f7',
                '#fc6474'
            ],
        });
        return (
            <View style={{ flex: 1, zIndex: 1 }}>
                <Animated.View style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: backgroundColor,
                    zIndex, position: 'absolute', top: 0, left: 0, width: Dimensions.get('window').width
                }}>
                </Animated.View>
                <StatusBar barStyle='dark-content' backgroundColor="rgba(0,0,0,0)" translucent={true} />

                {/* <StatusBar translucent={false} barStyle="dark-content" backgroundColor="#ebebeb" /> */}
                <ImageBackground source={require('../../Assets/images/appbg.png')} style={styles.outerMenu} imageStyle={styles.imageMenu}>
                    <Header backgroundColor="transparent" user={true} navigation={this.props.navigation} />
                    <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 25, color: "#010101", textAlign: 'left', opacity: 0.7, paddingLeft: 25 }} >Garnish</Text>
                    <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 15, color: "#010101", textAlign: 'left', opacity: 0.5, paddingLeft: 25 }} >Your delectable platter with</Text>

                    <ScrollView>
                        <View>
                            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset='100' >
                                <View style={{ marginTop: 25 }} >
                                    <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 17.5, color: "#222222", marginBottom: 10, marginLeft: 28 }}>Matched Ingredients</Text>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ width: 25 }} />
                                            {
                                                matched.map((elm, index) => {
                                                    return <TouchableOpacity onPress={() => { var ingr = this.state.ingr; ingr.splice(index, 1);LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);this.setState({ ingr }) }} ><View elevation={2} style={{ padding: 15, margin: 5, marginBottom: 15, backgroundColor: 'white', alignItems: "center", minWidth: 75, minHeight: 125, borderRadius: 45, justifyContent: "center" }} >
                                                        <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'red', padding: 10, borderRadius: 50, paddingBottom: 1, paddingTop: 0 }}>
                                                            <Text style={{ fontSize: 22,lineHeight:25, color: "#fff" }}>-</Text>
                                                        </View>
                                                        <Image elevation={5} source={{ uri: ingredients[elm] }} style={{ width: 35, height: 35, resizeMode: "contain" }} />
                                                        <Text style={{ fontSize: 14, fontFamily: "OpenSans-SemiBold", opacity: 0.7, marginTop: 10, letterSpacing: -0.5 }} >{elm}</Text>
                                                    </View></TouchableOpacity>
                                                })
                                            }
                                            <View style={{ width: 25 }} />
                                        </View>
                                    </ScrollView>
                                </View>
                                {/* <View style={{ flex: 1, display: "flex", flexDirection: "row", flexWrap: "wrap", }}> */}
                                {/* <View style={{
                                        // backgroundColor:'#000',
                                        marginTop: 10, padding: 15
                                    }}> */}

                                <View style={{ marginTop: 25 }} >
                                    <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 17.5, color: "#222222", marginBottom: 10, marginLeft: 28 }}>And Some Mix Of Your Taste</Text>
                                    <View style={{ padding: 20, paddingTop: 5 }}>

                                        <Animatable.View
                                            animation="zoomIn"
                                            delay={50}
                                            duration={500}
                                            elevation={10}
                                            useNativeDriver style={{ display: 'flex', flexDirection: "row", padding: 12, alignItems: "center", borderRadius: 50, marginTop: 5, backgroundColor: '#f6f6f7' }} >
                                            <Image source={require('../../Assets/icons/search.png')} style={{ width: 15, height: 15, marginLeft: 10 }} resizeMode="contain" />
                                            <TextInput style={{ flex: 1, padding: 0, marginLeft: 20 }} placeholder="Seach for an ingredient" onChangeText={(txt) => { this.searchIngr(txt) }} value={this.state.text} />
                                        </Animatable.View>
                                    </View>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ width: 25 }} />
                                            {
                                                unmatched
                                            }
                                            <View style={{ width: 25 }} />
                                        </View>
                                    </ScrollView>
                                </View>
                            </KeyboardAvoidingView>

                            {/* <View style={{ marginTop: 5 }} >
                            <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 17.5, color: "#222222", marginBottom: 10, marginLeft: 28 }}>Some commonly used ingredients</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: 25 }} />
                                    {
                                        this.state.imej.map((elm, index) => {
                                            return <View elevation={5} style={{ padding: 15, margin: 5, marginBottom: 15, backgroundColor: 'white', alignItems: "center", minWidth: 75, minHeight: 125, borderRadius: 45, justifyContent: "center" }} >
                                                <Image elevation={5} source={elm} style={{ width: 35, height: 35, resizeMode: "contain" }} />
                                                <Text style={{ fontSize: 14, fontFamily: "OpenSans-SemiBold", opacity: 0.7, marginTop: 10, letterSpacing: -0.5 }} >Broccolli</Text>
                                            </View>
                                        })
                                    }
                                    <View style={{ width: 25 }} />
                                </View>
                            </ScrollView>
                        </View> */}
                            {/* </View> */}
                            {/* </View> */}
                        </View>
                        <Animated.View style={{
                            backgroundColor: dotbgColor, padding: 10, paddingTop: 8, paddingBottom: 8, borderRadius: Dimensions.get('window').width / 10, width: (Dimensions.get('window').width) - 50
                            , justifyContent: 'space-between', alignSelf: 'center', margin: 10
                        }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('FoodRecipe')} style={{
                                // width: Dimensions.get('window').width / 8, height: Dimensions.get('window').width / 8,
                                //  alignSelf:'flex-end',
                                display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: 'row'
                            }}>
                                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../Assets/icons/cart.png')}
                                        style={{
                                            width: 30, resizeMode: "contain",
                                            height: 30,
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 2 }} />
                                <Text style={{ fontSize: 17, fontFamily: "OpenSans-SemiBold", letterSpacing: -0.5, color: 'white' }} >{this.state.ingr.length} Items in total</Text>
                                <View style={{ flex: 2 }} />
                                {/* <Text style={{ fontSize: 20, fontFamily: "OpenSans-SemiBold", letterSpacing: -0.5, color: 'white'}} >Proceed</Text> */}
                                <View style={{ flex: 1 }} />
                                <Image source={require('../../Assets/icons/next.png')}
                                    style={{
                                        width: 22, resizeMode: "contain",
                                        height: 22, marginTop: 1, marginRight: 10
                                    }}
                                />
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View style={{
                            backgroundColor: '#fdc12d', padding: 10, paddingTop: 8, paddingBottom: 8, borderRadius: Dimensions.get('window').width / 10, width: (Dimensions.get('window').width) - 50
                            , justifyContent: 'space-between', alignSelf: 'center', margin: 10, marginBottom: 40
                        }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{
                                // width: Dimensions.get('window').width / 8, height: Dimensions.get('window').width / 8,
                                //  alignSelf:'flex-end',
                                alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
                            }}>
                                <Image source={require('../../Assets/icons/prev.png')}
                                    style={{
                                        width: 22, resizeMode: "contain",
                                        height: 22, marginLeft: 15, marginTop: 1
                                    }}
                                />
                                <View style={{ flex: 1 }} />
                                <Text style={{ fontSize: 17, fontFamily: "OpenSans-SemiBold", letterSpacing: -0.5, color: 'white' }} >Re-Take picture</Text>
                                <View style={{ flex: 1 }} />
                                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../Assets/icons/camera_white.png')}
                                        style={{
                                            width: 30, resizeMode: "contain",
                                            height: 30,
                                        }}
                                    />
                                </View>
                                {/* <Text style={{ fontSize: 17, fontFamily: "OpenSans-SemiBold",  letterSpacing: -0.5,color:'white',marginLeft:15 }} >10 Items in total</Text> */}

                            </TouchableOpacity>
                        </Animated.View>
                    </ScrollView>

                </ImageBackground>

            </View>
        )
    }
}

const styles = StyleSheet.create({
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
