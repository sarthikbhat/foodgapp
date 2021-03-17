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
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { LoginManager } from 'react-native-fbsdk';
import RNCalendarEvents from "react-native-calendar-events";


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
          <Stack.Screen name="After" component={AfterCamera} />
          <Stack.Screen name="Camera" component={Camera} />
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

signOut = async () => {
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
  // props.navigation.closeDrawer();
}

const DrawerContent = (props) => {

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Image
                source={{
                  uri: 'https://icons.iconarchive.com/icons/diversity-avatars/avatars/1024/batman-icon.png',
                }}
                style={{width:50,height:50}}
              />
              <View style={{marginLeft: 15, flexDirection: 'column',backgroundColor:'#fff'}}>
                <Text style={styles.title}>Fit Batman</Text>
                <Text style={styles.caption}>@night_watchman</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Text style={[styles.paragraph, styles.caption]}>
                  80
                </Text>
                <Text style={styles.caption}>Calorie Intake</Text>
              </View>
              <View style={styles.section}>
                <Text style={[styles.paragraph, styles.caption]}>
                  100
                </Text>
                <Text style={styles.caption}>Ingredient Starred</Text>
              </View>
            </View>
          </View>

          <View style={styles.drawerSection}>
            <DrawerItem 
              icon={()=>(
                <Image
                source={require('./Assets/icons/home-menu.png')}
                style={{width:25,height:25}}
                />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={()=>(
                <Image
                source={require('./Assets/icons/user-menu.png')}
                style={{width:25,height:25}}
                />
              )}
              label="Profile"
              onPress={() => {
                ToastAndroid.show('Coming Soon 😃',ToastAndroid.SHORT)
              }}
            />
            <DrawerItem
              icon={()=>(
                <Image
                source={require('./Assets/icons/bookmark-menu.png')}
                style={{width:25,height:25}}
                />
              )}
              label="Bookmarks"
              onPress={() => {
                ToastAndroid.show('Coming Soon 😃',ToastAndroid.SHORT)
              }}
            />
            <DrawerItem
             icon={()=>(
              <Image
              source={require('./Assets/icons/settings-menu.png')}
              style={{width:25,height:25}}
              />
            )}
              label="Settings"
              onPress={() => {
                ToastAndroid.show('Coming Soon 😃',ToastAndroid.SHORT);
              }}
            />
            <DrawerItem
              icon={()=>(
                <Image
                source={require('./Assets/icons/logout-menu.png')}
                style={{width:25,height:25,marginLeft:5}}
                />
              )}
              label="Sign Out"
              onPress={() => {
                signOut()
                ToastAndroid.show('Signed Out 😃',ToastAndroid.SHORT);
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
    </View>
  );
};

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
  drawerStyles: { flex: 1, width: '70%', },
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
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
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
  },
  drawerSection: {
    marginTop: 15,
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
});
export default App;
