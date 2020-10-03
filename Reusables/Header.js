import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import * as Animatable from "react-native-animatable";
import Animated  from 'react-native-reanimated';

class Header extends React.Component {
    // componentDidMount=()=>{
    //     console.log(this.props.navigation.canGoBack());
    // }
    render() {
        return (
            <Animatable.View
                animation="slideInUp"
                duration={500}
                useNativeDriver>
                <View elevation={this.props.elevation} style={[styles.header, { backgroundColor: this.props.backgroundColor || null }]} >
                    {
                        this.props.back ?
                            <TouchableOpacity style={styles.headerIcon}
                                onPress={() => { this.props.navigation.goBack() }} >
                                <Image source={require('../Assets/icons/back.png')}
                                    style={{
                                        width: 20, resizeMode: "contain",
                                        height: 20
                                    }}
                                />
                            </TouchableOpacity>
                            :
                            
                            <TouchableOpacity style={styles.headerIcon}
                                onPress={() => { this.props.navigation.openDrawer() }} >
                                <Image source={require('../Assets/icons/menu.png')}
                                    style={{
                                        width: 20, resizeMode: "contain",
                                        height: 20
                                    }}
                                />
                            </TouchableOpacity>
                    }
                </View>
            </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        flexDirection: "row"
    },
    headerIcon: {
        padding: 10
    },
})


export default Header;