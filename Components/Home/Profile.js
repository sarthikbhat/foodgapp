import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable'

export default class Profile extends React.Component {
    render() {
        return (
            <ScrollView>
                <TouchableOpacity onPress={() => { }} elevation={1} style={{ padding: 20, backgroundColor: "#f9f9f9", borderColor: "#f6f6f6", borderRadius: 50, alignSelf: 'center', marginTop: 10 }}>
                    <Image source={require('../../Assets/icons/my_account_user.png')}
                        style={{ width: Dimensions.get('window').width / 10, resizeMode: "contain", height: Dimensions.get('window').width / 10 }} />
                </TouchableOpacity>
                <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 22, marginTop: 10, paddingTop: 25, alignSelf: "center" }}>Sanjay Nayak</Text>
                <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 16, marginTop: 0, padding: 10, alignSelf: "center", color: "rgba(0,0,0,0.6)" }}>sanjayjnayak99@gmail.com</Text>
                <View
                    style={{
                        borderBottomColor: 'rgba(0,0,0,0.05)',
                        borderBottomWidth: 0.5,
                        marginTop: 20
                    }}
                />
                <Text style={{ fontFamily: "OpenSans-Regular", color: "#2b2b2b", fontSize: 15, padding: 25, paddingBottom: 25 }} >Wishlisted Dishes</Text>

                <ScrollView horizontal>
                    <View style={{ width: 25 }} />
                    <Animatable.View
                        animation="zoomIn"
                        delay={100}
                        duration={500}
                        useNativeDriver elevation={1} style={{ height: 250, width: 180, borderRadius: 25, backgroundColor: "#ffd18c", alignItems: 'center', padding: 20, marginRight: 25, marginBottom: 5 }} >

                        <Image source={require('../../Assets/images/Noodles.png')} style={{ marginTop: 10, width: 120, height: 120 }} resizeMode="contain" />
                        <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 13, color: "#624e30", marginTop: 20 }} >Royal Manchow Noodles</Text>
                        <View style={{ width: 50, height: 20, backgroundColor: "white", borderRadius: 10, alignSelf: "flex-start", display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                            <Image source={require('../../Assets/icons/star.png')} style={{ width: 12, height: 12 }} resizeMode="contain" />
                            <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 10, marginLeft: 4, marginRight: 5 }} >9.0</Text>
                        </View>
                    </Animatable.View>
                    <Animatable.View
                        animation="zoomIn"
                        delay={150}
                        duration={500}
                        useNativeDriver elevation={1} style={{ height: 250, width: 180, borderRadius: 25, backgroundColor: "#e8d9db", alignItems: 'center', padding: 20, marginRight: 25, marginBottom: 5 }} >

                        <Image source={require('../../Assets/images/PaneerNoodle.png')} style={{ marginTop: 10, width: 140, height: 120 }} resizeMode="contain" />
                        <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 13, color: "#624e30", marginTop: 20 }} >Indian Paneer Noodles</Text>
                        <View style={{ width: 50, height: 20, backgroundColor: "white", borderRadius: 10, alignSelf: "flex-start", display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                            <Image source={require('../../Assets/icons/star.png')} style={{ width: 12, height: 12 }} resizeMode="contain" />
                            <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 10, marginLeft: 4, marginRight: 5 }} >8.5</Text>
                        </View>
                    </Animatable.View>
                </ScrollView>
            </ScrollView>
        )
    }
}