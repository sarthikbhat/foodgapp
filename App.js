import React from 'react';
import { Text, View, TouchableNativeFeedback } from 'react-native'

import Pitcher from './Components/Input/Pitcher'

export default class App extends React.Component {
  state = {
    pitcherVisible: false
  }
  togglePitcher = (pitcherVisible) => {
    this.setState({
      pitcherVisible
    })
  }
  render() {
    console.warn(this.state)
    return (
      <>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
          {
            this.state.pitcherVisible?
            <Pitcher pitcherVisible={this.state.pitcherVisible} togglePitcher={this.togglePitcher} />:null
          }
          <TouchableNativeFeedback style={{ padding: 20 }} onPress={() => { this.togglePitcher(true) }} >
            <Text>Click Image</Text>
          </TouchableNativeFeedback>
        </View>
      </>
    )
  }
}