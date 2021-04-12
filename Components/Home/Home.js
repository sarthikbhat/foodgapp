
import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
  ActivityIndicator,
  Button
} from 'react-native';
import Tabbar from '../Tabbar/Tabbar';
import Header from '../../Reusables/Header';
import * as Animatable from 'react-native-animatable';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {url} from '../../Reusables/constants';
import Profile from './Profile';
import Ingredients from './Ingredients';


const color = ['#ffd18c', '#e8d9db'];

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      trending: [],
      loading: true,
    };
    
    //   this.onRegister.bind(this),
    //   this.onNotif.bind(this),
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  tabPress = (index) => {
    if (this.state.index != index) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({
        index,
      });
    }
  };

  componentDidMount() {
    // console.log(this.props.route.params);
    fetch(`${url}/trending`).then((res) => {
      res.json().then((res) => {
        this.setState({trending: res, loading: false});
    });
});
}



  render() {
    //e8d9db ffcc7e
    var digits = '0123456789';
    return (
        <View style={{ paddingTop: 5, flex: 1, backgroundColor: '#ebebeb' }}>
        <StatusBar barStyle='dark-content' backgroundColor="rgba(0,0,0,0)" translucent={true} />
        <ImageBackground source={require('../../Assets/images/appbg.png')} style={styles.outerMenu} imageStyle={styles.imageMenu}>
         
            <View style={{ flex: 1 }}>

                {
                    this.state.index == 0 ?
                    <>
                       <Header backgroundColor="transparent" user={true} navigation={this.props.navigation} />

                        <ScrollView style={{ paddingTop: 5 }} >
                            <Animatable.View
                                animation="slideInUp"
                                duration={500}
                                useNativeDriver style={{ marginLeft: 22, marginRight: 22 }}>
                                <Text  style={{ fontFamily: "OpenSans-Bold", fontSize: 25, color: "#222222" }} >Poozle</Text>
                                <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 23, color: "#222222" }} >your cravings</Text>
                                {/* <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Camera')}

                                    elevation={5} style={{ backgroundColor: "#fc6474", display: 'flex', flexDirection: "row", padding: 16, alignItems: "center", justifyContent: "center", borderRadius: 50, marginTop: 20, marginBottom: 5 }}
                                > */}
                        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Camera')}
                            elevation={5} style={{ backgroundColor: "#fc6474", display: 'flex', flexDirection: "row", padding: 16, alignItems: "center", justifyContent: "center", borderRadius: 50, marginTop: 20, marginBottom: 5 }}
                        >
                                    <NeomorphFlex swapShadows style={{ shadowRadius: 5, borderRadius: 15, backgroundColor: '#fc6474', padding: 18, backgroundColor: "#fc6474", display: 'flex', flexDirection: "row", padding: 16, alignItems: "center", justifyContent: "center", borderRadius: 50, marginTop: 20, marginBottom: 5 }}>
                                        <Image source={require('../../Assets/icons/camera_white.png')} style={{ width: 20, height: 20, marginLeft: 10 }} resizeMode="contain" />
                                        <Text style={{ fontFamily: "OpenSans-Regular", color: "white", fontSize: 15, marginLeft: 15 }} >Scan for ingredients</Text>

                                    </NeomorphFlex>
                                </TouchableNativeFeedback>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 10 }}>
                                    <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: "#cacaca" }} />
                                    <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 15, color: "#cacaca", marginLeft: 15, marginRight: 15 }} >OR</Text>
                                    <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: "#cacaca" }} />
                                </View>

                                <Animatable.View
                                    animation="zoomIn"
                                    delay={50}
                                    duration={500}
                                    useNativeDriver elevation={2} style={{ display: 'flex', flexDirection: "row", alignItems: "center" }} >
                                    {/* <Image source={require('../../Assets/icons/search.png')} style={{ width: 15, height: 15, marginLeft: 10 }} resizeMode="contain" />
                            <TextInput style={{ flex: 1, padding: 0, marginLeft: 20 }} placeholder="Seach for a dish name" /> */}
                                    <NeomorphFlex swapShadows style={{ shadowRadius: 5, borderRadius: 15, backgroundColor: '#f6f6f5', display: 'flex', flexDirection: "row", padding: 14, alignItems: "center", justifyContent: "center", borderRadius: 50, marginTop: 5 }}>
                                        <Image source={require('../../Assets/icons/search.png')} style={{ width: 15, height: 15, marginLeft: 10 }} resizeMode="contain" />
                                        <TextInput style={{ flex: 1, padding: 0, marginLeft: 20 }} placeholder="Seach for a dish name" />
                                    </NeomorphFlex>
                                </Animatable.View>
                                <Text style={{ fontFamily: "OpenSans-Regular", color: "#2b2b2b", fontSize: 18, paddingTop: 25, paddingBottom: 25 }} >Trending</Text>
                            </Animatable.View>
                            {
                                this.state.loading ? <View><ActivityIndicator /></View> :
                                    <ScrollView horizontal>
                                        <View style={{ width: 25 }} />
                                        {
                                            Object.keys(this.state.trending).map((elm,index)=> {
                                                return <Animatable.View
                                                    animation="zoomIn"
                                                    delay={100}
                                                    duration={500}
                                                    useNativeDriver elevation={1} style={{ height: 250, width: 180, borderRadius: 25, backgroundColor: color[index%2], alignItems: 'center', padding: 20, marginRight: 25, marginBottom: 5 }} >

                                                    <Image source={{uri:this.state.trending[elm].images}} style={{ marginTop: 10, width: 120, height: 120 }} resizeMode="contain" />
                                                    <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 13, color: "#624e30", marginTop: 20 }} >The Royal Continental {elm}</Text>
                                                    <View style={{ width: 50, height: 20, backgroundColor: "white", borderRadius: 10, alignSelf: "flex-start", display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                                                        <Image source={require('../../Assets/icons/star.png')} style={{ width: 12, height: 12 }} resizeMode="contain" />
                                            <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 10, marginLeft: 4, marginRight: 5 }} >{digits[Math.floor(Math.random() * 10)]%6}.{digits[Math.floor(Math.random() * 10)]}</Text>
                                                    </View>
                                                </Animatable.View>
                                            })
                                        }
                                    </ScrollView>
                            }
                        </ScrollView>
                        </> :
                        this.state.index == 1 ? <Ingredients /> : <Profile navigation={this.props.navigation} />

                }
                <Animatable.View
                    animation="slideInUp"
                    duration={1000}
                    useNativeDriver>
                    <Tabbar tabPress={this.tabPress} />
                </Animatable.View>

            </View>
        </ImageBackground>
    </View>
)
}
}

const styles = StyleSheet.create({
outerMenu: {
display: 'flex',
resizeMode: "cover",
marginTop: 30,
width: Dimensions.get('window').width,
height: Dimensions.get('window').height,
},
imageMenu: {
width: Dimensions.get('window').width,
opacity: 0.4,
}
});

export default Home