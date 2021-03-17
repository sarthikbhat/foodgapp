import React from 'react';
import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, TextInput, LayoutAnimation,UIManager } from 'react-native';
import { url, ingredients } from '../../Reusables/constants'
import * as Animatable from 'react-native-animatable'


export default class Ingredients extends React.Component {
    constructor(props){
        super(props);
        this.state={
            ingr:['Potato','Tomato','Chilli'],
            text:''
        }
        if (
            Platform.OS === "android" &&
            UIManager.setLayoutAnimationEnabledExperimental
        ) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    searchIngr = (text) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ text })

    }
    render() {
        const matched = this.state.ingr // asyncstorage

        var regex = new RegExp(this.state.text.toLowerCase(), 'g');

        let answer = Object.keys(ingredients).filter(elm => {
            return elm.toLowerCase().match(regex) != null;
        })

        const unmatched = answer.map((elm, index) => {
            if (this.state.ingr.indexOf(elm) == -1)
                return <TouchableOpacity onPress={() => { LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);this.setState({ ingr: [elm, ...this.state.ingr], text: '' }) }} ><View elevation={2} style={{ padding: 15, margin: 5, marginBottom: 15, backgroundColor: 'white', alignItems: "center", minWidth: 85, minHeight: 125, borderRadius: 45, justifyContent: "center" }} >
                    <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#337f33', padding: 8, borderRadius: 50, paddingBottom: 1, paddingTop: 0 }}>
                        <Text style={{ fontSize: 20, color: "#fff" }}>+</Text>
                    </View>
                    <Image elevation={5} source={{ uri: ingredients[elm] }} style={{ width: 35, height: 35, resizeMode: "contain" }} />
                    <Text style={{ fontSize: 14, fontFamily: "OpenSans-SemiBold", opacity: 0.7, marginTop: 10, letterSpacing: -0.5 }} >{elm}</Text>
                </View></TouchableOpacity>
        })
        return (
            <ScrollView>
                <View>
                    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset='100' >
                        <View style={{ marginTop: 25 }} >
                            <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 17.5, color: "#222222", marginBottom: 10, marginLeft: 28 }}>List of Ingredients to BUY</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: 25 }} />
                                    {
                                        matched.length==0?<Text style={{paddingTop:30,paddingBottom:30}} >Empty List</Text>:
                                        matched.map((elm, index) => {
                                            return <TouchableOpacity onPress={() => { var ingr = this.state.ingr; ingr.splice(index, 1); LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); this.setState({ ingr }) }} ><View elevation={2} style={{ padding: 15, margin: 5, marginBottom: 15, backgroundColor: 'white', alignItems: "center", minWidth: 85, minHeight: 125, borderRadius: 45, justifyContent: "center" }} >
                                                <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#fc6474', padding: 10, borderRadius: 50, paddingBottom: 1, paddingTop: 0 }}>
                                                    <Text style={{ fontSize: 22, lineHeight: 25, color: "#fff" }}>-</Text>
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
                            <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 17.5, color: "#222222", marginBottom: 10, marginLeft: 28 }}>Search for Ingredients</Text>
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
            </ScrollView>
        )
    }
}