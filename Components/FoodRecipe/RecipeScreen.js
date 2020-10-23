import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Image, StatusBar, StyleSheet, Dimensions, Animated, ScrollView } from 'react-native'
import Header from '../../Reusables/Header'
import { recipes ,ingredient} from '../../Constants/recipe'
import * as Animatable from 'react-native-animatable'

const MIN_HEIGHT = 0.8 * Dimensions.get('window').height
const MAX_HEIGHT = Dimensions.get('window').height
const MaxBorder = 0
const MinBorder = 80,
    image = Dimensions.get('window').width / 1.8

export class RecipeScreen extends Component {
    
    constructor () {
        super()
        this.state = {
            scrollY: new Animated.Value(0),
            setter:0
        }
        this.spinValue = new Animated.Value(0)
      }

      poser=()=>{
        // this.spinValue.setValue(0)
        Animated.timing(
          this.state.scrollY,
          {
            toValue: 300,
            duration: 200,
            
          useNativeDriver:false
          },
        ).start()
    }
    
    render() {
        // const scrollY = useRef(new Animated.Value(0)).current
        const set = this.state.setter===0?recipes:ingredient
        var widthSmaller = this.state.scrollY.interpolate({
            inputRange: [0, 300],
            outputRange: [Dimensions.get('window').width / 1.8, Dimensions.get('window').width / 2.5],
            extrapolate: "clamp",
        })

        var topPositionY = this.spinValue.interpolate({
            inputRange: [0, 300],
            outputRange: [0.01 * MAX_HEIGHT, 0],
            extrapolate: "clamp",

        })

        var topPositionX = this.spinValue.interpolate({
            inputRange: [0, 300],
            outputRange: [20, 15],
            extrapolate: "clamp",

        })

        var texter = this.state.scrollY.interpolate({
            inputRange: [0, 300],
            outputRange: [30, 25],
            extrapolate: "clamp",
        })

        var sizer = this.state.scrollY.interpolate({
            inputRange: [0, 300],
            outputRange: [0, -15],
            extrapolate: "clamp",
        })

        var opX = this.state.scrollY.interpolate({
            inputRange: [0, 300],
            outputRange: [0, 110],
            extrapolate: "clamp",
        })
        var opY = this.state.scrollY.interpolate({
            inputRange: [0, 300],
            outputRange: [0, -35],
            extrapolate: "clamp",
        })

        var topPosition = this.state.scrollY.interpolate({
            inputRange: [0, 800],
            outputRange: [0.15 * MAX_HEIGHT, 0],
            extrapolate: "clamp",

        })

        var smaller = this.state.scrollY.interpolate({
            inputRange: [0, 800],
            outputRange: [3, 0],
            extrapolate: "clamp",

        })


   

        return (
            <View style={styles.full}>
                <StatusBar barStyle='dark-content' backgroundColor='#E6F0F5' />
                <Header backgroundColor="#E6F0F5" back={true} navigation={this.props.navigation}/>
                <Animatable.View 
                animation="zoomIn"
                duration={500}
                style={{ display: 'flex', flexDirection: "row" }}>
                    <Animated.View style={{ padding: 25 
                    }}>
                        <Animated.Text  style={{ fontSize: 30, fontFamily: 'PatrickHand-Regular' }}>American Pizza</Animated.Text>
                        <Animated.View style={{ paddingTop: 25 ,transform: [{
                            translateY: sizer
                         }
                        ]}}>
                            <View style={{ display: 'flex', flexDirection: "row" }}>
                                <Image source={require('../../assets/Icons/clock.png')}
                                    style={{
                                        width: 20,
                                        height: 20,
                                    }}
                                />
                                <Animated.Text style={{ fontSize: 15, alignSelf: 'center', paddingLeft: 7 }}>10 minutes</Animated.Text>
                            </View>
                            <Animated.View style={{ display: 'flex', flexDirection: "row", paddingTop: 15 ,transform: [{
                            translateY: opY
                         },
                         {translateX:opX}
                        ]}}>
                                <Image source={require('../../assets/Icons/calories.png')}
                                    style={{
                                        width: 20,
                                        height: 20,
                                    }}
                                />
                                <Animated.Text style={{ fontSize: 15, alignSelf: 'center', paddingLeft: 7 }}>250 Cal</Animated.Text>
                            </Animated.View>
                            <Animated.View style={{ display: 'flex', flexDirection: "row", paddingTop: 15,transform: [{
                            translateY: opY
                         },
                        //  {translateX:opX}
                        ]}}>
                                <Image source={require('../../assets/Icons/veg.png')}
                                    style={{
                                        width: 18,
                                        height: 18,
                                    }}
                                />
                                <Animated.Text style={{ fontSize: 15, alignSelf: 'center', paddingLeft: 7 }}>Vegetarian</Animated.Text>
                            </Animated.View>
                        </Animated.View>
                    </Animated.View>
                    <Animated.View style={{
                        borderRadius: 150, overflow: 'hidden', width: widthSmaller, height: widthSmaller, transform: [{
                            translateX: topPositionX
                        }, { translateY: topPositionY }],
                    }}
                    >
                        <Image source={require('../../assets/Images/pizza.jpg')}
                            style={{
                                width: null,
                                height: null,
                                flex: 1
                            }}
                        />
                    </Animated.View>
                </Animatable.View>
                <Animated.View style={{
                    flex: 1,
                    backgroundColor: '#ffffff',
                    position:'absolute',
                    bottom:0,
                    left:0,
                    height:0.7*MAX_HEIGHT,
                    width:Dimensions.get('window').width,
                    marginTop: 45,
                    borderTopLeftRadius: 75,
                    borderTopRightRadius: 75,
                    // elevation: 10,
                    padding: 25,
                    transform: [{
                        translateY: topPosition
                    }],
                    paddingBottom:100
                    
                }}>
                    <Animatable.View
                    animation="zoomIn"
                    duration={500}>
                    {/* <Animated.View
                        style={{ width: Dimensions.get('window').width / 3, backgroundColor: '#e5e5e5', padding: 3, alignSelf: 'center', borderRadius: 15,marginBottom:5 }}
                    /> */}
                    <Text onPress={()=>this.poser()} style={{ fontSize: 25, fontWeight: '900', padding:10,textAlign:'center',paddingTop:2}}>{this.state.setter===0?'How To Cook':'Ingredients Required'}</Text>
                    <Animated.ScrollView showsVerticalScrollIndicator={false} ref={ref => this.myref = ref}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: { contentOffset: { y: this.state.scrollY } }
                                }
                            ],
                            {
                                useNativeDriver: false
                            }
                        )}
                    >
                        {
                            set.map((recipe,index) => {
                                return (
                                    <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 20 }} key={index}>
                                        <View style={{ justifyContent: 'center', flex: 0.1 }}>
                                            <View
                                                style={{ width: 30, backgroundColor: '#FFBB55', padding: 8, alignItems: 'center', borderRadius: 15, justifyContent: 'center' }}
                                            >
                                                <Text style={{ fontSize: 10}}>{index+1}</Text>
                                            </View>
                                        </View>
                                        <Text style={{ fontSize: 14, padding: 5, flex: 1 }}>{recipe}</Text>
                                    </View>
                                )

                            })
                        }
                        {/* <View style={{flex:1}}/> */}
                    </Animated.ScrollView>
                </Animatable.View>
                </Animated.View>
                <Animatable.View 
                animation="slideInUp"
                duration={300}
                elevation={5} style={{position:'absolute',bottom:0,left:0,display:'flex',flexDirection:'row',backgroundColor:'#fff',width:Dimensions.get('window').width,padding:10,height:50}}>
                        <TouchableOpacity style={{flex:1,alignItems:'center',borderRightWidth:1,borderColor:'#e5e5e5'}} onPress={()=>{this.myref.scrollTo({ x: 0, y: 0, animated: true });   this.setState({setter:0})}}>
                        <Image source={require('../../assets/Icons/recipe.png')}
                                    style={{
                                        width: Dimensions.get('window').width/15,
                                        height: Dimensions.get('window').width/15,
                                    }}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1,alignItems:'center'}} onPress={()=>{this.myref.scrollTo({ x: 0, y: 0, animated: true });this.setState({setter:1})}}>
                        <Image source={require('../../assets/Icons/ingredients.png')}
                                    style={{
                                        width: Dimensions.get('window').width/15,
                                        height: Dimensions.get('window').width/15,
                                    }}
                                />
                        </TouchableOpacity>
                </Animatable.View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    full: {
        // display: 'flex',
        flex: 1,
        backgroundColor: '#E6F0F5'
    },
    half: {
        // display: 'flex',
        flex: 1,
        backgroundColor: '#ffffff',
        marginTop: 45,
        borderTopLeftRadius: 75,
        borderTopRightRadius: 75,
        elevation: 10,
        padding: 25,
    }
});

export default RecipeScreen
