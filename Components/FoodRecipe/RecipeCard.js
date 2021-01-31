import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Image, StatusBar, StyleSheet, Dimensions, Animated, ScrollView, ImageBackground, Platform, LayoutAnimation, UIManager, TouchableWithoutFeedback } from 'react-native'
import Header from '../../Reusables/Header'
import { recipes, ingredient } from '../../Constants/recipe'
import * as Animatable from 'react-native-animatable'
import { min } from 'react-native-reanimated'

const heighter = (Dimensions.get('window').width / 1.3)
var minWidth = Dimensions.get("window").width - 120
var maxWidth = Dimensions.get("window").width -40

export class RecipeCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            focus: true,
            anim: new Animated.Value(0),
            index: 0,
            loop: false
        }
        if (
            Platform.OS === "android" &&
            UIManager.setLayoutAnimationEnabledExperimental
        ) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
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
        console.log(this.state.index);
        Animated.sequence([

            Animated.timing(this.state.anim, {
                toValue: index,
                duration: 500,
                useNativeDriver: false
            }),
        ]).start();

    }

    presser=()=>{
        this.animater()
        // this.props.passer(this.props.index)
    }

    render() {
        const width = this.state.anim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [minWidth, maxWidth / 1.5, maxWidth]
        })

        var topPositionY = this.state.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0],
            extrapolate: "clamp",

        })

        var topPositionX = this.state.anim.interpolate({
            inputRange: [0, 0.4, 1],
            outputRange: [0, 0, -(maxWidth - 280)],
            extrapolate: "clamp",

        })
        var shower = this.state.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],

        })
        var fontSize = this.state.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 15],
            extrapolate: "clamp",
        })
        var marginLeft = this.state.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 15],
            extrapolate: "clamp",
        })

        return (
                        <TouchableWithoutFeedback onPress={() => this.presser()}>
                            <Animated.View useNativeDriver style={{ height: 250, width, borderRadius: 25, backgroundColor: this.props.backgroundColor, alignSelf: 'center', padding: 20,margin:5,flexDirection: 'row' 
                        ,
                        display:'flex',
                        justifyContent:"center"
                        }}>
                                <View>
                                    <Animated.View style={{ borderRadius: 150, overflow: 'hidden', width: 180, height: 150,transform:[{
                                translateX:topPositionX
                        }],alignSelf:'center'  }}>
                                        <Image source={require('../../Assets/images/PaneerNoodle.png')} style={{ width: null, height: null, flex: 1 }} />
                                    </Animated.View>
                                    <Animated.Text style={{ fontFamily: "OpenSans-SemiBold", fontSize, color: "#624e30" ,transform:[{
                                translateX:topPositionX
                                    }],marginLeft,textAlign:'center'}}>Some Recipe</Animated.Text>
                                    <Animated.View style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginTop: 15,transform:[{
                                translateX:topPositionX
                        }] }}>
                                        <View style={{ width: 50, height: 20, backgroundColor: "white", borderRadius: 10, alignSelf: "flex-start", display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                            <Image source={require('../../Assets/icons/star.png')} style={{ width: 12, height: 12 }} resizeMode="contain" />
                                            <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 10, marginLeft: 4, marginRight: 5 }} >8.5</Text>
                                        </View>
                                        <View style={{ flex: 1 }} />
                                        <Animated.View style={{ width: 50, height: 20, backgroundColor: "white", borderRadius: 10, alignSelf: "flex-start", display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                            <Image source={require('../../Assets/icons/veg.png')} style={{ width: 12, height: 12 }} resizeMode="contain" />
                                            <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 10, marginLeft: 4, marginRight: 5 }} >Veg</Text>
                                        </Animated.View>
                                    </Animated.View>
                                </View>
                            </Animated.View>
                        </TouchableWithoutFeedback>
        )
    }
}



const styles = StyleSheet.create({
    full: {
        flex: 1,
        backgroundColor: '#E6F0F5',

        zIndex: 1

        // padding:25
    },
    half: {
        flex: 1,
        // padding: 15,
        // display: "flex",
        flexDirection: "row",
        // flexWrap: "wrap",
        // width:Dimensions.get('window').width
    },
    floater: {
        display: "flex",
        padding: 200,
        // flexDirection: "row",

        borderBottomLeftRadius: 150,
        marginTop: -140,
    },
});

export default RecipeCard
