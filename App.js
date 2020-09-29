import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Components/Home/Home';
import Camera from './Components/Camera/Camera';
import MenuScreen from './Components/MenuScreen/MenuScreen';
import { Dimensions } from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

class HomeStack extends React.Component{
  render(){
    return(
      <Stack.Navigator headerMode={"none"}>
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
    )
  }
}

class CameraStack extends React.Component{
  render(){
    return(
      <Stack.Navigator headerMode={"none"}>
        <Stack.Screen name="Camera" component={Camera}/>
      </Stack.Navigator>
    )
  }
}

class App extends React.Component{
  render(){
    return(
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home"
        screenOptions={{ swipeEnabled: true }} drawerStyle={{
          width: Dimensions.get('window').width,
        }}
        drawerContent={(props) => <MenuScreen {...props} />}
        >
          <Drawer.Screen name="Home" component={HomeStack}/>
          <Drawer.Screen name="Camera" component={CameraStack}/>
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}
export default App;