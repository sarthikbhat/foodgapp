import React, { Component } from 'react'
import { Text, Image, View, ScrollView, StatusBar, TextInput } from 'react-native'
import Tabbar from '../Tabbar/Tabbar'
import Header from '../../Reusables/Header'
import * as Animatable from 'react-native-animatable'


export class Home extends Component {
    render() {
        //e8d9db ffcc7e
        return (
            <View style={{ paddingTop: 5, flex: 1, backgroundColor: "#fff" }}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <Header backgroundColor="#fff" user={true} navigation={this.props.navigation} />
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ paddingTop: 5 }} >
                        <Animatable.View
                            animation="slideInUp"
                            duration={500}
                            useNativeDriver style={{ marginLeft: 22, marginRight: 22 }}>
                            <Text style={{ fontFamily: "OpenSans-Bold", fontSize: 25, color: "#222222" }} >Poozle</Text>
                            <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 23, color: "#222222" }} >your cravings</Text>
                            <Animatable.View
                                animation="zoomIn"
                                duration={500}
                                useNativeDriver elevation={5} style={{ backgroundColor: "#fc6474", display: 'flex', flexDirection: "row", padding: 16, alignItems: "center", justifyContent: "center", borderRadius: 50, marginTop: 20, marginBottom: 5 }} >
                                <Image source={require('../../assets/Icons/camera_white.png')} style={{ width: 20, height: 20, marginLeft: 10 }} resizeMode="contain" />
                                <Text style={{ fontFamily: "OpenSans-Regular", color: "white", fontSize: 15, marginLeft: 15 }} >Scan for ingredients</Text>
                            </Animatable.View>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 10 }}>
                                <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: "#cacaca" }} />
                                <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 15, color: "#cacaca", marginLeft: 15, marginRight: 15 }} >OR</Text>
                                <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: "#cacaca" }} />
                            </View>
                            <Animatable.View
                                animation="zoomIn"
                                delay={50}
                                duration={500}
                                useNativeDriver elevation={1} style={{ backgroundColor: "#f6f6f5", display: 'flex', flexDirection: "row", padding: 14, alignItems: "center", borderRadius: 50, marginTop: 5 }} >
                                <Image source={require('../../assets/Icons/search.png')} style={{ width: 15, height: 15, marginLeft: 10 }} resizeMode="contain" />
                                <TextInput style={{ flex: 1, padding: 0, marginLeft: 20 }} placeholder="Seach for a dish name" />
                            </Animatable.View>
                            <Text style={{ fontFamily: "OpenSans-Regular", color: "#2b2b2b", fontSize: 18, paddingTop: 25, paddingBottom: 25 }} >Trending</Text>
                        </Animatable.View>
                        <ScrollView horizontal>
                            <View style={{ width: 25 }} />
                            <Animatable.View
                                animation="zoomIn"
                                delay={100}
                                duration={500}
                                useNativeDriver elevation={1} style={{ height: 250, width: 180, borderRadius: 25, backgroundColor: "#ffd18c", alignItems: 'center', padding: 20, marginRight: 25, marginBottom:5 }} >
                                <Image source={require('../../assets/Images/Noodles.png')} style={{ marginTop: 10, width: 120, height: 120 }} resizeMode="contain" />
                                <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 13, color: "#624e30", marginTop: 20 }} >Royal Manchow Noodles</Text>
                                <View style={{ width: 50, height: 20, backgroundColor: "white", borderRadius: 10, alignSelf: "flex-start", display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                                    <Image source={require('../../assets/Icons/star.png')} style={{ width: 12, height: 12 }} resizeMode="contain" />
                                    <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 10, marginLeft: 4, marginRight: 5 }} >9.0</Text>
                                </View>
                            </Animatable.View>
                            <Animatable.View
                                animation="zoomIn"
                                delay={150}
                                duration={500}
                                useNativeDriver elevation={1} style={{ height: 250, width: 180, borderRadius: 25, backgroundColor: "#e8d9db", alignItems: 'center', padding: 20, marginRight: 25, marginBottom:5 }} >
                                <Image source={require('../../assets/Images/PaneerNoodle.png')} style={{ marginTop: 10, width: 140, height: 120 }} resizeMode="contain" />
                                <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 13, color: "#624e30", marginTop: 20 }} >Indian Paneer Noodles</Text>
                                <View style={{ width: 50, height: 20, backgroundColor: "white", borderRadius: 10, alignSelf: "flex-start", display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                                    <Image source={require('../../assets/Icons/star.png')} style={{ width: 12, height: 12 }} resizeMode="contain" />
                                    <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 10, marginLeft: 4, marginRight: 5 }} >8.5</Text>
                                </View>
                            </Animatable.View>
                        </ScrollView>
                    </ScrollView>
                    <Animatable.View
                        animation="slideInUp"
                        duration={1000}
                        useNativeDriver>
                        <Tabbar />
                    </Animatable.View>
                </View>

            </View>
        )
    }
}

export default Home
