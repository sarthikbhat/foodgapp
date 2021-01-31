import React, { Component } from 'react'
import { Text, View, Image, TextInput, StatusBar, ScrollView, Dimensions, TouchableOpacity, Animated, StyleSheet, Platform, LayoutAnimation, UIManager, ImageBackground } from 'react-native'
import Header from '../../Reusables/Header'
import * as Animatable from 'react-native-animatable'
import { recipes } from '../../Constants/recipe'
import { Neomorph ,NeomorphFlex} from 'react-native-neomorph-shadows';


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
            show: true,
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

    render() {

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
                '#444',
                '#444',
                '#ebebeb',
            ],
        });
        const dotbgColor = this.state.anim.interpolate({
            inputRange: [0, 0.001, 0.5, 0.501, 0.9, 1, 2.1],
            outputRange: [
                '#444',
                '#444',
                '#444',
                '#f6f6f7',
                '#f6f6f7',
                '#f6f6f7',
                '#444'
            ],
        });
        return (
            <View style={{  flex: 1, zIndex: 1 }}>
                <Animated.View style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: backgroundColor,
                    zIndex, position: 'absolute', top: 0, left: 0, width: Dimensions.get('window').width
                }}>
                </Animated.View>
                <StatusBar barStyle="dark-content"  backgroundColor="#ebebeb" />
                {/* <ImageBackground source={require('../../Assets/images/appbg.png')} style={styles.outerMenu} imageStyle={styles.imageMenu}> */}
                    <Header backgroundColor="transparent" user={true} navigation={this.props.navigation} />
                    <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 25, color: "#010101", textAlign: 'left',opacity:0.7,paddingLeft:25   }} >Garnish</Text>
                    <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 15, color: "#010101", textAlign: 'left',opacity:0.5,paddingLeft:25   }} >Your delectable platter</Text>
                    <View>
                        <View style={{ padding: 20 }}>

                            <Animatable.View
                                animation="zoomIn"
                                delay={50}
                                duration={500}
                                elevation={10}
                                useNativeDriver style={{  display: 'flex', flexDirection: "row", padding: 12, alignItems: "center", borderRadius: 50, marginTop: 5,backgroundColor:'#f6f6f7' }} >
                                <Image source={require('../../Assets/icons/search.png')} style={{ width: 15, height: 15, marginLeft: 10 }} resizeMode="contain" />
                                <TextInput style={{ flex: 1, padding: 0, marginLeft: 20 }} placeholder="Seach for an ingredient" />
                            </Animatable.View>
                        </View>
                        <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 25, color: "#010101", textAlign: 'center',opacity:0.7,   }} >Matched Ingredients</Text>
                        <ScrollView horizontal={true} style={{}}>
                            {
                                recipes.map((recipe, index) => {
                                    return (
                                        <>
                                            <View style={{ width: 15 }} />
                                            <Animatable.View style={{ height: 120, width: 120, borderRadius: 25, backgroundColor: '#f6f6f7', alignItems: 'center', padding: 15, marginRight: 25, elevation: 10, marginBottom: 15, marginTop: 15 }} >
                                            <View style={{ height: 65, width: 65, borderRadius: 35, backgroundColor: '#ebebeb', alignItems: 'center',  justifyContent:'center'}} >
                                                <Image source={require('../../Assets/images/l5.jpg')} style={{ width: 50, height: 50, borderRadius: 25 }} />
                                                </View>
                                                <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 15, color: "#010101", marginTop: 10, textAlign: 'center' }} >Potato</Text>
                                            </Animatable.View>
                                        </>
                                    )
                                })
                            }
                        </ScrollView>
                        {/* <View style={{ flex: 1, display: "flex", flexDirection: "row", flexWrap: "wrap", }}> */}
                        {/* <View style={{
                                        // backgroundColor:'#000',
                                        marginTop: 10, padding: 15
                                    }}> */}
                        <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 25, color: "#010101", textAlign: 'center', margin: 15,marginBottom:5 }} >Add Some Mix of Your Taste</Text>
                        <ScrollView style={{ padding: 15, marginBottom: 20, height: Dimensions.get('window').height / 2 }}>
                            <Animated.View style={{ flex: 1, display: "flex", flexDirection: "row", flexWrap: "wrap", marginBottom: 20, justifyContent: 'center' }}>
                                {
                                    [1,2,3,4,5,6].map((recipe, index) => {
                                        return (
                                            // <View style={{
                                            //     // backgroundColor:'#000',
                                            //     marginTop: 10, padding: 15
                                            // }}>
                                            <NeomorphFlex swapShadows style={{shadowRadius: 4,backgroundColor: "#ebebeb", display: 'flex', flexDirection: "row", padding: 14, alignItems: "center", borderRadius: 50, margin: 10, width: Dimensions.get('window').width / 2.3 - 20, justifyContent: 'center' }}>
                                            {/* <Animatable.View
                                                animation="zoomIn"
                                                delay={50}
                                                duration={500}
                                                useNativeDriver elevation={1} style={{ backgroundColor: "#f6f6f5", display: 'flex', flexDirection: "row", padding: 14, alignItems: "center", borderRadius: 50, margin: 10, width: Dimensions.get('window').width / 2.3 - 20, justifyContent: 'center' }} > */}
                                                <Image source={require('../../Assets/images/l5.jpg')} style={{ width: 30, height: 30, borderRadius: 30 }} />
                                                <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 15, color: "#624e30", textAlign: 'center', flex: 1 }} >Some Ingredient</Text>
                                                <Image source={require('../../Assets/icons/plus.png')} style={{ width: 15, height: 15, borderRadius: 30 }} />
                                            {/* </Animatable.View> */}
                                            </NeomorphFlex>
                                        )
                                    })

                                }
                            </Animated.View>
                        </ScrollView>
                        {/* </View> */}
                        {/* </View> */}
                    </View>

                    {/* </ImageBackground> */}
                    <View style={{
                        backgroundColor: 'transparent', width: Dimensions.get('window').width, height: Dimensions.get('window').width / 8,
                        borderRadius: Dimensions.get('window').width / 10, position: 'absolute', bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 100
                    }}>

                        <Animated.View style={{
                            backgroundColor: dotbgColor, width: Dimensions.get('window').width / 8, height: Dimensions.get('window').width / 8,
                            borderRadius: Dimensions.get('window').width / 10,
                            transform: [{ perspective: 200 }, { rotateY }, { scale }, { translateX }]
                        }}>
                            <TouchableOpacity onPress={() => this.animater()} style={{
                                width: Dimensions.get('window').width / 8, height: Dimensions.get('window').width / 8
                                , borderRadius: Dimensions.get('window').width / 10, alignItems: 'center', backgroundColor: 'transparent', justifyContent: 'center'
                            }}>
                                <Image source={require('../../Assets/icons/right.png')}
                                    style={{
                                        width: 20, resizeMode: "contain",
                                        height: 20
                                    }}
                                />
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
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
