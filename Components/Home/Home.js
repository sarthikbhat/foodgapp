import React, { Component } from 'react'
import { Text, TouchableOpacity, View ,Image} from 'react-native'

export class Home extends Component {
    render() {
        return (
            <View style={{margin:5}}>
                <TouchableOpacity style={{padding:10}}
                    onPress={() => { this.props.navigation.openDrawer() }} >
                    <Image source={ require('../../Assets/icons/menu.png')}
                        style={{
                            width: 25, resizeMode: "contain",
                            height: 25
                        }}
                    />
                </TouchableOpacity>
                <View style={{alignItems:'center'}}>
                     <Text style={{fontSize:20}}>Hello Home</Text>
                </View>
                
            </View>
        )
    }
}

export default Home
