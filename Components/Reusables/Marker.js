import React from 'react';
import { View, Text, Dimensions } from 'react-native';

class Marker extends React.Component {
    render() {
        var {elm}=this.props
        var {data}=this.props
        var width=Dimensions.get('window').width
        var height=Dimensions.get('window').height
        console.log("left"+elm.rect.x*width)
        console.log("top"+elm.rect.y*height)
        console.log("height"+elm.rect.h*height)
        console.log("width"+elm.rect.w*width)
        return (
            <React.Fragment>
                <View style={{ position: "absolute", zIndex: 99999, left: elm.rect.x*width, top: elm.rect.y*height, height: elm.rect.h*height, width: elm.rect.w*width, borderWidth:2, borderColor:"red" }} >
                    <View style={{display:"flex",flex:1}}></View>
                    <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={{backgroundColor:"red",marginTop:10,paddingLeft:5,paddingRight:5}}>{elm.detectedClass}</Text>
                    <View style={{flex:1}}/>
                    </View>
                </View>
            </React.Fragment>
        )
    }
}


export default Marker;