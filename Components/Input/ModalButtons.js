import React from 'react'
import {Text,View,Modal} from 'react-native'


export default class ModalButtons extends React.Commponent{
    render(){

        return(
            <Modal visible={this.props.visible} 
                // onRequestClose={() => { this.props.togglePitcher(false) }}
                animationType="slide" transparent={true} >
                    <View style={{height:100,bottom:0,backgroundColor:"red"}} >

                    </View>
                </Modal>
        )
    }
}