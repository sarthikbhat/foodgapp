import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import * as Animatable from "react-native-animatable";

class Header extends React.Component {
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
                                <Image source={require('../assets/Icons/back.png')}
                                    style={{
                                        width: 20, resizeMode: "contain",
                                        height: 20
                                    }}
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.headerIcon}
                                onPress={() => { this.props.navigation.openDrawer() }} >
                                <Image source={require('../assets/Icons/menu.png')}
                                    style={{
                                        width: 20, resizeMode: "contain",
                                        height: 20
                                    }}
                                />
                            </TouchableOpacity>
                    }
                    <View style={{flex:1}}/>
                    {
                         this.props.user ?
                         <TouchableOpacity style={styles.headerIcon}
                             onPress={() => { this.props.navigation.goBack() }} >
                             <Image source={require('../assets/Icons/user.png')}
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
        flexDirection: "row"
    },
    headerIcon: {
        padding: 10
    },
})


export default Header;