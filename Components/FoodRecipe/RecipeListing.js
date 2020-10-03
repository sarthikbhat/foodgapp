import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Image, StatusBar, StyleSheet, Dimensions, Animated, ScrollView } from 'react-native'
import Header from '../../Reusables/Header'
import { recipes, ingredient } from '../../Constants/recipe'
import * as Animatable from 'react-native-animatable'


export class RecipeListing extends Component {
    state = {
    }
    render() {
        return (
            <View style={styles.full}>
                <StatusBar barStyle='dark-content' backgroundColor='#E6F0F5' />
                <Header backgroundColor="#E6F0F5" navigation={this.props.navigation} />
                <ScrollView >
                    <Animatable.Text animation="zoomIn" duration={500} style={{ fontSize: 35, fontFamily: 'PatrickHand-Regular', textAlign: 'center', marginBottom: 5 }}>Bon Apetit!!</Animatable.Text>
                    <View style={styles.half}>
                        <View>
                            {
                                recipes.map((delt, index) => {
                                    return (
                                        index % 2 === 0 ?
                                            <Animatable.View
                                                animation="zoomIn"
                                                duration={300}
                                                delay={index ? ((index + 1) * 50) : 0}
                                                useNativeDriver
                                                key={index} style={{ backgroundColor: '#fff', display: 'flex', width: Dimensions.get('window').width / 2-35, 
                                                height:Math.min((index)+Dimensions.get('window').width / 2.5,Dimensions.get('window').width / 3.2), 
                                                borderRadius: 20, margin: 11 }}>
                                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Recipe') }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{flex:1,fontSize: 20, fontFamily: 'PatrickHand-Regular',padding:10,marginTop:10 }}>American Pizza</Text>
                                                        <View style={{ flex: 0.5 }} />
                                                    </View>
                                                    <View style={{
                                                        borderRadius: 50, overflow: 'hidden', position: 'absolute', right: -20, top: -15
                                                    }}
                                                    >
                                                        <Image source={require('../../assets/Images/pizza.jpg')}
                                                            style={{
                                                                width: Dimensions.get('window').width / 6,
                                                                height: Dimensions.get('window').width / 6,
                                                                resizeMode: 'contain'
                                                            }}
                                                        />
                                                    </View>
                                                    {/* <View style={{ flex: 2, padding: 8 }} /> */}
                                                    {/* <View style={{ flex: 1 }} /> */}
                                                    <View style={{ flexDirection: 'row',padding:10 }}>

                                                        <View style={{ display: 'flex', flexDirection: "row", }}>
                                                            <Image source={require('../../assets/Icons/clock.png')}
                                                                style={{
                                                                    width: 15,
                                                                    height: 15,
                                                                }}
                                                            />
                                                            <Animated.Text style={{ fontSize: 12, alignSelf: 'center', paddingLeft: 2 }}>10 minutes</Animated.Text>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: "row",marginLeft:4 }}>
                                                            <Image source={require('../../assets/Icons/calories.png')}
                                                                style={{
                                                                    width: 15,
                                                                    height: 15,
                                                                }}
                                                            />
                                                            <Animated.Text style={{ fontSize: 12, alignSelf: 'center', paddingLeft: 3 }}>252 cal</Animated.Text>
                                                        </View>

                                                    </View>
                                                </TouchableOpacity>
                                            </Animatable.View>
                                            :
                                            null
                                    )
                                })}
                        </View>
                        <View>
                            {
                                recipes.map((delt, index) => {
                                    return (
                                        index % 2 === 0 ?
                                        <Animatable.View
                                        animation="zoomIn"
                                        duration={300}
                                        delay={index ? ((index + 1) * 50) : 0}
                                        useNativeDriver
                                        key={index} style={{ backgroundColor: '#fff', display: 'flex', width: Dimensions.get('window').width / 2-35, 
                                        height:Math.min(index-Dimensions.get('window').width / 3.2,Dimensions.get('window').width / 3), 
                                        borderRadius: 20, margin: 11 }}>
                                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Recipe') }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{flex:1,fontSize: 20, fontFamily: 'PatrickHand-Regular',padding:10,marginTop:10 }}>American Pizza</Text>
                                                <View style={{ flex: 0.5 }} />
                                            </View>
                                            <View style={{
                                                borderRadius: 50, overflow: 'hidden', position: 'absolute', right: -20, top: -15
                                            }}
                                            >
                                                <Image source={require('../../assets/Images/pizza.jpg')}
                                                    style={{
                                                        width: Dimensions.get('window').width / 6,
                                                        height: Dimensions.get('window').width / 6,
                                                        resizeMode: 'contain'
                                                    }}
                                                />
                                            </View>
                                            {/* <View style={{ flex: 2, padding: 8 }} /> */}
                                            {/* <View style={{ flex: 1 }} /> */}
                                            <View style={{ flexDirection: 'row',padding:10 }}>

                                                <View style={{ display: 'flex', flexDirection: "row",  }}>
                                                    <Image source={require('../../assets/Icons/clock.png')}
                                                        style={{
                                                            width: 15,
                                                            height: 15,
                                                        }}
                                                    />
                                                    <Animated.Text style={{ fontSize: 12, alignSelf: 'center', paddingLeft: 2 }}>10 minutes</Animated.Text>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: "row",marginLeft:4 }}>
                                                    <Image source={require('../../assets/Icons/calories.png')}
                                                        style={{
                                                            width: 15,
                                                            height: 15,
                                                        }}
                                                    />
                                                    <Animated.Text style={{ fontSize: 12, alignSelf: 'center', paddingLeft: 3 }}>252 cal</Animated.Text>
                                                </View>

                                            </View>
                                        </TouchableOpacity>
                                    </Animatable.View>

                                            : null
                                    )
                                }
                                )}
                        </View>

                    </View>
                </ScrollView>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    full: {
        flex: 1,
        backgroundColor: '#E6F0F5',

    },
    half: {
        flex: 1,
        padding: 15,
        // display: "flex",
        flexDirection: "row",
        // flexWrap: "wrap",
        // width:Dimensions.get('window').width
    }
});

export default RecipeListing
