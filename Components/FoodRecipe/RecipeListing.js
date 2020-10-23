import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Image, StatusBar, StyleSheet, Dimensions, Animated, ScrollView, FlatList,Platform,LayoutAnimation,UIManager } from 'react-native'
import Header from '../../Reusables/Header'
import { recipes, ingredient } from '../../Constants/recipe'
import * as Animatable from 'react-native-animatable'

const heighter =(Dimensions.get('window').width / 1.3)

// var opacity=1
// var zIndex=1

export class RecipeListing extends Component {
    constructor(props){
        super(props)
        this.state = {
            focus: true,
            anim: new Animated.Value(1),
            index: 0,
            loop: false
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
        this.animater()
        // setTimeout(() => {
        //     opacity=0
        //     zIndex=-10
        // }, 4000);
    }

    animater = () => {
        this.setState(prevState => ({ index: !prevState.index, loop: this.state.loop - 1 }))
            Animated.sequence([
        
                Animated.timing(this.state.anim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false
                }),
            ]).start();
        
    }

    render() {

        const rotateY = this.state.anim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ["0deg", "-90deg", "-180deg"]
        })

        const scale = this.state.anim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 9, 1]
        })

        const translateX = this.state.anim.interpolate({
            inputRange: [0, 0.5, 1],
            // outputRange: ['0%','50%','0%']
            outputRange: [0, 10, 0]
        })

        const zIndex = this.state.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [10,0]
        })
        const opacity = this.state.anim.interpolate({
            inputRange: [0,0.99,1],
            outputRange: [0,1,1]
        })
        // const opacityOp = this.state.anim.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [1,0]
        // })

        const backgroundColor = this.state.anim.interpolate({
            inputRange: [0, 0.001, 0.5, 0.501, 1],
            outputRange: [
                '#fff',
                '#fff',
                '#fff',
                '#444',
                '#444',
            ],
        });
        const dotbgColor = this.state.anim.interpolate({
            inputRange: [0, 0.001, 0.5, 0.501, 0.9, 1],
            outputRange: [
                '#444',
                '#444',
                '#444',
                '#fff',
                '#fff',
                '#fff',
            ],
        });
        
        return (
            <View style={styles.full}>
              
                <StatusBar barStyle='dark-content' backgroundColor='#E6F0F5' />
                    <Header backgroundColor="#E6F0F5" navigation={this.props.navigation} style={this.props.style} />
                    {/* <Animated.View style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: backgroundColor,
                     position: 'absolute', top: 0, left: 0, width: Dimensions.get('window').width,
                     zIndex,opacity
                }}>
                </Animated.View> */}

                <ScrollView>
                    <View style={{ 
                    // padding: 25,
                    marginBottom:30,                     
                    }}>
                    {recipes.map(recipes=>{
                        return(
<View style={{

                                backgroundColor: '#fff', width: Dimensions.get('window').width - 80, height: Dimensions.get('window').width / 1.3, borderRadius: 35, alignSelf: 'center',
                                margin: 20,
                            }}>
                                <Image source={require('../../assets/Images/sp.jpg')}
                                    style={{
                                        width: null,
                                        height: null,
                                        flex: 1,
                                        borderRadius: 25,
                                    }}
                                />
                                <View style={{ display: 'flex', flexDirection: 'row', }}>
                                    <Text style={{ fontSize: 25, fontFamily: 'PatrickHand-Regular', padding: 25, paddingTop: 10, paddingBottom: 10 }}>Some Dish</Text>
                                    <View style={{ flex: 1 }} />
                                    <View style={{ padding: 15, paddingRight: 20 }}>
                                        <Image source={require('../../assets/Icons/wish.png')}
                                            style={{
                                                width: 25,
                                                height: 25,
                                                marginBottom: 10
                                            }}
                                        />

                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', padding: 25, paddingTop: 0 }}>

                                    <View style={{ display: 'flex', flexDirection: "row", }}>
                                        <Image source={require('../../assets/Icons/clock.png')}
                                            style={{
                                                width: 15,
                                                height: 15,
                                            }}
                                        />
                                        <Text style={{ fontSize: 12, alignSelf: 'center', paddingLeft: 2 }}>10 minutes</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: "row", marginLeft: 4 }}>
                                        <Image source={require('../../assets/Icons/calories.png')}
                                            style={{
                                                width: 15,
                                                height: 15,
                                            }}
                                        />
                                        <Text style={{ fontSize: 12, alignSelf: 'center', paddingLeft: 3 }}>252 cal</Text>
                                    </View>
                                    <View style={{ flex: 1 }} />
                                    <View style={{ marginLeft: 0, paddingLeft: 0 }}>
                                        <Image source={require('../../assets/Icons/veg.png')}
                                            style={{
                                                width: 15,
                                                height: 15,
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={{
                                    position: "absolute",
                                    right: 5,
                                    top: 6,
                                    backgroundColor: 'rgba(256,256,256,0.5)',
                                    borderRadius: 25,
                                    padding: 5
                                }}>
                                    <View
                                        style={{ display: 'flex', flexDirection: 'row' }}
                                    >
                                        <Text style={{ fontSize: 15, alignSelf: 'center', paddingRight: 5, color: '#fff' }}>4.5</Text>
                                        <Image source={require('../../assets/Icons/star.png')}
                                            style={{
                                                height: 1 * 20, width: 1 * 20, resizeMode: "contain",
                                            }} />
                                    </View>
                                </View>
                            </View>

                        )
                    })}
                            
                        
                </View>
                </ScrollView>
                {/* <Animated.View style={{
                    backgroundColor: 'transparent', width: Dimensions.get('window').width, height: Dimensions.get('window').width / 8,
                    borderRadius: Dimensions.get('window').width / 10, position: 'absolute', bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 100,
                    opacity
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
                            <Image source={require('../../assets/Icons/right.png')}
                                style={{
                                    width: 20, resizeMode: "contain",
                                    height: 20
                                }}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View> */}
            </View>
        )
    }
}



const styles = StyleSheet.create({
    full: {
        flex: 1,
        backgroundColor: '#E6F0F5',

        zIndex:1

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
      
        borderBottomLeftRadius:150,
        marginTop:-140,
    },
});

export default RecipeListing
