import React, { Component } from 'react'
import { Text, TouchableOpacity, View ,Image} from 'react-native'
import Tabbar from '../Tabbar/Tabbar'

export class Home extends Component {
    render() {
        return (
            <View style={{padding:5,flex:1, backgroundColor:"#ea3345"}}>
                <TouchableOpacity style={{padding:10}}
                    onPress={() => { this.props.navigation.openDrawer() }} >
                    <Image source={ require('../../assets/Icons/menu.png')}
                        style={{
                            width: 25, resizeMode: "contain",
                            height: 25
                        }}
                    />
                </TouchableOpacity>
                <View style={{alignItems:'center', flex:1, justifyContent:"flex-end"}}>
                     <Tabbar/>
                </View>
                
            </View>
        )
    }
}

export default Home
