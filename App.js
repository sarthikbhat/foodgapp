import 'react-native-gesture-handler';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList, createDrawerNavigator,
  DrawerItem
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Components/Home/Home';
import Camera from './Components/Camera/Camera';
import MenuScreen from './Components/MenuScreen/MenuScreen';
import { Dimensions } from 'react-native';
import RecipeScreen from './Components/FoodRecipe/RecipeScreen';
import RecipeListing from './Components/FoodRecipe/RecipeListing';
import Animated  from 'react-native-reanimated';
import { Image, StyleSheet,View,TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { useIsDrawerOpen } from '@react-navigation/drawer';
import SignIn from './Components/Authentication/SignIn';
import SignUp from './Components/Authentication/SignUp';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

class HomeStack extends React.Component {
  render() {
    return (
      <Animated.View style={StyleSheet.flatten([styles.stack, this.props.style])}>
      <Stack.Navigator headerMode={"none"}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
      </Animated.View>
    )
  }
}

class FoodRecipe extends React.Component {
  render() {
    return (
      <Animated.View style={StyleSheet.flatten([styles.stack, this.props.style])}>
      <Stack.Navigator headerMode={"none"}>
        <Stack.Screen name="RecipeList" component={RecipeListing} />
        <Stack.Screen name="Recipe" component={RecipeScreen} />
      </Stack.Navigator>
       </Animated.View>
    )
  }
}

class CameraStack extends React.Component {
  render() {
    return (
      <Animated.View style={StyleSheet.flatten([styles.stack, this.props.style])}>
      <Stack.Navigator headerMode={"none"}>
        <Stack.Screen name="Camera" component={Camera} />
      </Stack.Navigator>
      </Animated.View>
    )
  }
}
class Authentication extends React.Component {
  render() {
    return (
      <Animated.View style={StyleSheet.flatten([styles.stack, this.props.style])}>
      <Stack.Navigator headerMode={"none"}>
        <Stack.Screen options={{
        animationEnabled: false,
      }} name="Signin" component={SignIn} />
        <Stack.Screen options={{
        animationEnabled: false,
      }}name="Signup" component={SignUp} />
      </Stack.Navigator>
      </Animated.View>
    )
  }
}

const DrawerContent = (props) => {
  return (
    // <DrawerContentScrollView {...props} contentContainerStyle={{color:'#fff',backgroundColor:'#fff',flex:1}}>
      // {/* <DrawerItemList {...props} /> */}
       <View style={{flex:1}}>
                {/* {
                useIsDrawerOpen()?
                <TouchableOpacity 
                 style={{padding:30,alignSelf:'flex-start',marginRight:-10}}
                    onPress={() => { props.navigation.closeDrawer()}} >
                    <Animatable.Image
                    animation='slideInLeft'
                      duration={1200}
                    source={ require('./Assets/icons/close.png')}
                        style={{
                            width: 25, resizeMode: "contain",
                            height: 25
                        }}
                    />
                </TouchableOpacity>
                :null} */}
                {
                useIsDrawerOpen()?
                <View 
                //  style={{flex:1,justifyContent:'center',marginTop:50}}
                >
                <Animatable.Text animation="slideInLeft" duration={800} style={{fontSize:35,textAlign:'center',padding:20,fontFamily:'KaushanScript-Regular',color:'#000'}}>Food Gapp</Animatable.Text>
                    <Animatable.Text onPress={()=>props.navigation.navigate('FoodRecipe')} animation="slideInLeft" duration={800} style={{fontSize:20,textAlign:'center',padding:20,fontFamily:'KaushanScript-Regular',color:'#000',marginTop:25}}>Recipe Screen</Animatable.Text>
                    <Animatable.Text onPress={()=>props.navigation.navigate('Home')} animation="slideInLeft" duration={800} delay={200} style={{fontSize:20,textAlign:'center',padding:20,fontFamily:'KaushanScript-Regular',color:'#000'}}>Home</Animatable.Text>
                    <Animatable.Text onPress={()=>props.navigation.navigate('Camera')}animation="slideInLeft" duration={800} delay={200} style={{fontSize:20,textAlign:'center',padding:20,fontFamily:'KaushanScript-Regular',color:'#000'}}>Camera</Animatable.Text>
                    <Animatable.Text animation="slideInLeft" duration={800} delay={200} style={{fontSize:20,textAlign:'center',padding:20,fontFamily:'KaushanScript-Regular',color:'#000'}}>My Cart</Animatable.Text>
                    <Animatable.Text animation="slideInLeft" duration={800} delay={200} style={{fontSize:20,textAlign:'center',padding:20,fontFamily:'KaushanScript-Regular',color:'#000'}}>Favourites</Animatable.Text>
                    <Animatable.Text animation="slideInLeft" duration={800} delay={200} style={{fontSize:20,textAlign:'center',padding:20,fontFamily:'KaushanScript-Regular',color:'#000'}}>Sign In</Animatable.Text>
                </View>
                :null
                }
                </View>
    // </DrawerContentScrollView>
  );
}

const App=()=> {
  const [progress,setProgress] = React.useState(new Animated.Value(0))
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });
  const animatedStyle = { borderRadius, transform: [{ scale }] };
    return (
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{ swipeEnabled: true }}
          drawerType="slide"
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={{ flex: 1 }}
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
          activeTintColor: 'white',
          inactiveTintColor: 'white',
        }}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
          drawerContent={props => {
           setProgress(props.progress);
          return <DrawerContent {...props} />;
          }
          }
        >
          <Drawer.Screen name="Authentication">
          {props => <Authentication {...props} style={animatedStyle} />}
          </Drawer.Screen>
          <Drawer.Screen name="FoodRecipe">
          {props => <FoodRecipe {...props} style={animatedStyle} />}
          </Drawer.Screen>
          <Drawer.Screen name="Home">
          {props => <HomeStack {...props} style={animatedStyle} />}
          </Drawer.Screen>
          <Drawer.Screen name="Camera">
          {props => <CameraStack {...props} style={animatedStyle} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    )
  
}

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    // overflow: 'scroll',
    // borderWidth: 1,
    // backgroundColor:'#000'
  },
  drawerStyles: { flex: 1, width: '60%', backgroundColor: 'transparent' },
  drawerItem: { alignItems: 'flex-start', marginVertical: 0,color:'#E6F0F5' },
  drawerLabel: { color: 'white', marginLeft: -16 },
  // avatar: {
  //   borderRadius: 60,
  //   marginBottom: 16,
  //   borderColor: 'white',
  //   borderWidth: StyleSheet.hairlineWidth,
  // },
});
export default App;