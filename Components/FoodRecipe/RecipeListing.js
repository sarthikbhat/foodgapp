import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Image, StatusBar, StyleSheet, Dimensions, Animated, ScrollView, FlatList } from 'react-native'
import Header from '../../Reusables/Header'
import { recipes, ingredient } from '../../Constants/recipe'
import * as Animatable from 'react-native-animatable'

const heighter =(Dimensions.get('window').width / 1.3)

export class RecipeListing extends Component {
    state = {
        focus: true,
    }

    componentDidMount = () => {
        this.subs = this.props.navigation.addListener('focus', async () => {
            this.setState({ focus: true })
        })
        this.subsb = this.props.navigation.addListener('blur', async () => {
            this.setState({ focus: false })
        })
    }

    componentWillUnmount = () => {
        this.subs
        this.subsb
    }
    render() {
        
        return (
            <View style={styles.full}>
                <StatusBar barStyle='dark-content' backgroundColor='#E6F0F5' />
                    <Header backgroundColor="#E6F0F5" navigation={this.props.navigation} style={this.props.style} />
                <ScrollView>
                    <View style={{ 
                    // padding: 25,
                    marginBottom:30, 
                    }}>
                    <FlatList
                        data={recipes}
                        renderItem={({ item: elm, index }) =>
                            <View style={{
                                backgroundColor: '#fff', width: Dimensions.get('window').width - 80, height: Dimensions.get('window').width / 1.3, borderRadius: 35, alignSelf: 'center',
                                margin: 20,
                            }}>
                                <Image source={require('../../Assets/images/sp.jpg')}
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
                                        <Image source={require('../../Assets/icons/wish.png')}
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
                                        <Image source={require('../../Assets/icons/clock.png')}
                                            style={{
                                                width: 15,
                                                height: 15,
                                            }}
                                        />
                                        <Text style={{ fontSize: 12, alignSelf: 'center', paddingLeft: 2 }}>10 minutes</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: "row", marginLeft: 4 }}>
                                        <Image source={require('../../Assets/icons/calories.png')}
                                            style={{
                                                width: 15,
                                                height: 15,
                                            }}
                                        />
                                        <Text style={{ fontSize: 12, alignSelf: 'center', paddingLeft: 3 }}>252 cal</Text>
                                    </View>
                                    <View style={{ flex: 1 }} />
                                    <View style={{ marginLeft: 0, paddingLeft: 0 }}>
                                        <Image source={require('../../Assets/icons/veg.png')}
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
                                        <Image source={require('../../Assets/icons/star.png')}
                                            style={{
                                                height: 1 * 20, width: 1 * 20, resizeMode: "contain",
                                            }} />
                                    </View>
                                </View>
                            </View>
                        }
                    />
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
