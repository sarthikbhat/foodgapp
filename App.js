import 'react-native-gesture-handler';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
  DrawerItem,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Components/Home/Home';
import Camera from './Components/Camera/Camera';
import MenuScreen from './Components/MenuScreen/MenuScreen';
import RecipeScreen from './Components/FoodRecipe/RecipeScreen';
import RecipeListing from './Components/FoodRecipe/RecipeListing';
import Animated from 'react-native-reanimated';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import SignIn from './Components/Authentication/SignIn';
import SignUp from './Components/Authentication/SignUp';
import CheckBoxer from './Components/CheckBoxer/Checker';
import AfterCamera from './Components/AfterCamera/AfterCamera';
import ActualRecipe from './Components/FoodRecipe/ActualRecipe';
import RNCalendarEvents from "react-native-calendar-events";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

var status = false


class HomeStack extends React.Component {
  render() {
    return (
      <Animated.View
        style={StyleSheet.flatten([styles.stack, this.props.style])}>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </Animated.View>
    );
  }
}

class FoodRecipe extends React.Component {
  render() {
    return (
      <Animated.View
        style={StyleSheet.flatten([styles.stack, this.props.style])}>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen name="RecipeList" component={RecipeListing} />
          <Stack.Screen name="Recipe" component={RecipeScreen} />
          <Stack.Screen name="ActualRecipe" component={ActualRecipe} />
        </Stack.Navigator>
      </Animated.View>
    );
  }
}

class CameraStack extends React.Component {
  render() {
    return (
      <Animated.View
        style={StyleSheet.flatten([styles.stack, this.props.style])}>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="After" component={AfterCamera} />
        </Stack.Navigator>
      </Animated.View>
    );
  }
}
class Authentication extends React.Component {
  render() {
    return (
      <Animated.View
        style={StyleSheet.flatten([styles.stack, this.props.style])}>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen
            options={{
              animationEnabled: false,
            }}
            name="Signin"
            component={SignIn}
          />
          <Stack.Screen
            options={{
              animationEnabled: false,
            }}
            name="Signup"
            component={SignUp}
          />
        </Stack.Navigator>
      </Animated.View>
    );
  }
}


 class DrawerContent extends React.Component {

  state={
    login:false,
    name:'Guest',
    what:'home'
  }

  getAsynced=async()=>{
    var login = await AsyncStorage.getItem('status');
    var name = "Guest"
    login = login != undefined && login != null ? JSON.parse(login) : false
    if (login) {
        user = await AsyncStorage.getItem('user')
        user = JSON.parse(user)
        name= user.name 
    }
    this.setState({
        login,  name
    })
}

componentDidMount =  () => {
        console.log('mount')
        this.getAsynced()
}

  componentWillReceiveProps(){
    // console.log('suir')
    console.log('props')
    this.syncer()
}

signOut = async () => {
  var status
  var log = await AsyncStorage.getItem('type')
  log = log != undefined && log != null ? JSON.parse(log) : undefined
  if (log === 'google') {
    await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.setItem('status', JSON.stringify(false))
      await AsyncStorage.removeItem('user')
      await AsyncStorage.removeItem('type')
  }
  else if (log === 'facebook') {
      // LoginManager.logOut()
      await AsyncStorage.setItem('status', JSON.stringify(false))
      await AsyncStorage.removeItem('user')
      await AsyncStorage.removeItem('type')
  }
  else {
      await AsyncStorage.setItem('status', JSON.stringify(false))
      await AsyncStorage.removeItem('user')
      await AsyncStorage.removeItem('type')
  }
  status=true
  this.setState({log:false})
  // props.navigation.closeDrawer();
}



syncer = async () => {
  var login = await AsyncStorage.getItem('status');
  var name="Guest"
  login = login != undefined && login != null ? JSON.parse(login) : false
  if (login) {
      user = await AsyncStorage.getItem('user')
      user = JSON.parse(user)
      name = user.name 
  }
  this.setState({
      login,  name
  })

}
render(){
  return (
    <View style={{flex: 1}}>
      {/* <ImageBackground source={require('./Assets/images/appbg.png')} style={styles.outerMenu} imageStyle={styles.imageMenu}> */}
      <DrawerContentScrollView {...this.props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15,alignItems:'center'}}>
            <View onPress={() => { }} elevation={1} style={{ padding: 10, backgroundColor: "#f9f9f9", borderColor: "#f6f6f6", borderRadius: 50}}>
                    <Image source={require('./Assets/icons/my_account_user.png')}
                        style={{ width: Dimensions.get('window').width / 8, resizeMode: "contain", height: Dimensions.get('window').width / 8 }} />
                </View>
              <View style={{marginLeft: 15, flexDirection: 'column',backgroundColor:'#fff'}}>
                <Text style={styles.title}>{this.state.name}</Text>
                <Text style={styles.caption}>{'@'+this.state.name.toLowerCase()+'_foodgapp'}</Text>
              </View>
            </View>

            {/* <View style={styles.row}>
              <View style={styles.section}>
                <Text style={[styles.paragraph, styles.caption]}>
                  80
                </Text>
                <Text style={styles.caption}>Calorie Intake</Text>
              </View>
              <View style={styles.section}> 
                <Text style={[styles.paragraph, styles.caption]}>
                  8
                </Text>
                <Text style={styles.caption}>Ingredients Starred</Text>
              </View>
            </View> */}
          </View>

          <View style={styles.drawerSection}>
            <DrawerItem style={[this.state.what==='home'?{backgroundColor:'#fc6474'}:{},{padding:5}]}
              icon={()=>(
                <Image
                source={this.state.what!='home'?require('./Assets/icons/home-menu.png'):require('./Assets/icons/homew.png')}
                style={{width:25,height:25,marginLeft:15,marginRight:0}}
                />
              )}
              label="Home"
              labelStyle={[this.state.what==='home'?{color:'#ffffff'}:{},{fontSize:16,fontFamily:'OpenSans-Regular'}]}
              onPress={() => {
                this.setState({what:'home'})
                this.props.navigation.navigate('Home');
              }}
            />
            <DrawerItem style={[this.state.what==='profile'?{backgroundColor:'#fc6474'}:{},{padding:5}]}
              icon={()=>(
                <Image
                source={this.state.what!='profile'?require('./Assets/icons/user-menu.png'):require('./Assets/icons/userw.png')}
                style={{width:25,height:25,marginLeft:15,marginRight:0}}
                />
              )}
              label="Profile"
              labelStyle={[this.state.what==='profile'?{color:'#ffffff'}:{},{fontSize:16,fontFamily:'OpenSans-Regular'}]}
              onPress={() => {this.setState({what:'profile'})
                ToastAndroid.show('Coming Soon 😃',ToastAndroid.SHORT)
              }}
            />
            <DrawerItem style={[this.state.what==='bookmarks'?{backgroundColor:'#fc6474'}:{},{padding:5}]}
              icon={()=>(
                <Image
                source={this.state.what!='bookmarks'?require('./Assets/icons/bookmark-menu.png'):require('./Assets/icons/bookmark.png')}
                style={{width:25,height:25,marginLeft:15,marginRight:0}}
                />
              )}
              label="Bookmarks"
              labelStyle={[this.state.what==='bookmarks'?{color:'#ffffff'}:{},{fontSize:16,fontFamily:'OpenSans-Regular'}]}
              onPress={() => {
                this.setState({what:'bookmarks'})
                ToastAndroid.show('Coming Soon 😃',ToastAndroid.SHORT)
              }}
            />
            <DrawerItem style={[this.state.what==='settings'?{backgroundColor:'#fc6474'}:{},{padding:5}]}
             icon={()=>(
              <Image
              source={this.state.what!='settings'?require('./Assets/icons/settings-menu.png'):require('./Assets/icons/settings.png')}
              style={{width:25,height:25,marginLeft:15,marginRight:0}}
              />
            )}
              label="Settings"
              labelStyle={[this.state.what==='settings'?{color:'#ffffff'}:{},{fontSize:16,fontFamily:'OpenSans-Regular'}]}
              onPress={() => {
                this.setState({what:'settings'})
                ToastAndroid.show('Coming Soon 😃',ToastAndroid.SHORT);
              }}
            />
            <DrawerItem style={[this.state.what==='settings'?{backgroundColor:'#fc6474'}:{},{padding:5}]}
             icon={()=>(
              <Image
              source={this.state.what!='settings'?require('./Assets/icons/settings-menu.png'):require('./Assets/icons/settings.png')}
              style={{width:25,height:25,marginLeft:15,marginRight:0}}
              />
            )}
              label={this.state.login?'Log out':'Log In'}
              labelStyle={[this.state.what==='logout'?{color:'#ffffff'}:{},{fontSize:16,fontFamily:'OpenSans-Regular'}]}
              onPress={() => {
                this.setState({what:'logout'})
                this.state.login?this.signOut():this.props.navigation.navigate("Authentication")
              }}
            />
            
            
          </View>
          
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={()=>(
            <Image
            source={require('./Assets/icons/support-menu.png')}
            style={{width:25,height:25}}
            />
          )}
          label="Support"
          onPress={() => {
            ToastAndroid.show('Will Get Back To you Shortly 😃',ToastAndroid.SHORT)
          }}
        />
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};
 }

const App = () => {

 React.useEffect(() => {
  RNCalendarEvents.requestPermissions();
 }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator elevation={2} drawerStyle={styles.drawerStyles} drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="FoodRecipe" component={FoodRecipe} />
        <Drawer.Screen name="Authentication" component={Authentication} /> 
        <Drawer.Screen name="Camera" component={CameraStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 15.32,
    elevation: 3,
  },
  drawerStyles: { flex: 1, width: '80%', },
  drawerItem: {alignItems: 'flex-start', marginVertical: 0, color: '#E6F0F5'},
  drawerLabel: {color: 'white', marginLeft: -16},

  outerMenu: {
    display: 'flex',
    resizeMode: 'cover',
    marginTop: 30,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  imageMenu: {
    width: Dimensions.get('window').width,
    opacity: 0.4,
  },
  // dnnff
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 3,
    fontWeight: 'bold',
    marginBottom:5,
    fontFamily:'OpenSans-Regular'
  },
  caption: {
    fontSize: 14,
    fontFamily:'OpenSans-Regular'
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor:'#fff'
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
    fontFamily:'OpenSans-Regular'
  },
  drawerSection: {
    marginTop: 25,
  },
  bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: '#f4f4f4',
      borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  outerMenu: {
    display: 'flex',
    resizeMode: "cover",
    width: Dimensions.get('window').width*0.8,
    height: Dimensions.get('window').height,
    },
    imageMenu: {
    width:Dimensions.get('window').width*0.8,
    opacity: 0.4,
    }
    
});
export default App;
