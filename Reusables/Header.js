import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import * as Animatable from "react-native-animatable";
import { Neomorph ,NeomorphFlex} from 'react-native-neomorph-shadows';


class Header extends React.Component {
    render() {
        return (
            <Animatable.View
                animation="slideInUp"
                duration={500}
                useNativeDriver>
                <View elevation={this.props.elevation} style={[styles.header, { backgroundColor: this.props.backgroundColor || null,zIndex: this.props.zIndex || null }]} >
                    {
                        this.props.back ?
                            <TouchableOpacity style={styles.headerIcon}
                                onPress={() => { this.props.navigation.goBack() }} >
                                     {/* <NeomorphFlex  swapShadows style={{shadowRadius: 15, backgroundColor: "#ebebeb", padding:15,borderRadius:25}}> */}
                                <Image source={require('../Assets/icons/back.png')}
                                    style={{
                                        width: 20, resizeMode: "contain",
                                        height: 20
                                    }}
                                />
                                {/* </NeomorphFlex> */}
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.headerIcon}
                                onPress={() => { this.props.navigation.openDrawer({log:'hello'}) }} >
                                    {/* <NeomorphFlex  swapShadows style={{shadowRadius: 15, backgroundColor: "#ebebeb", padding:15,borderRadius:25}}> */}
                                <Image source={require('../Assets/icons/menu.png')}
                                    style={{
                                        width: 20, resizeMode: "contain",
                                        height: 20
                                    }}
                                />
                                {/* </NeomorphFlex> */}
                            </TouchableOpacity>
                    }
                    <View style={{flex:1}}/>
                    {
                         this.props.user ?
                         <TouchableOpacity style={styles.headerIcon}
                             onPress={() => { this.props.navigation.navigate('Signin') }} >
                             <Image source={require('../Assets/icons/user.png')}
                                 style={{
                                     width: 20, resizeMode: "contain",
                                     height: 20
                                 }}
                             />
                         </TouchableOpacity>
                         :null
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
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        flexDirection: "row",
        zIndex:1
    },
    headerIcon: {
        padding: 10
    },
})


export default Header;