import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Components/Home/Home';
import Camera from './Components/Camera/Camera';
import MenuScreen from './Components/MenuScreen/MenuScreen';
import { Dimensions } from 'react-native';
import RecipeScreen from './Components/FoodRecipe/RecipeScreen';
import RecipeListing from './Components/FoodRecipe/RecipeListing';

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

class FoodRecipe extends React.Component{
  render(){
    return(
      <Stack.Navigator headerMode={"none"}>
        <Stack.Screen name="RecipeList" component={RecipeListing}/>
        <Stack.Screen name="Recipe" component={RecipeScreen}/>
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
        <Drawer.Navigator 
        screenOptions={{ swipeEnabled: true }} drawerStyle={{
          width: Dimensions.get('window').width,
        }}
        drawerContent={(props) => <MenuScreen {...props} />}
        >
          <Drawer.Screen name="Home" component={HomeStack}/>
          <Drawer.Screen name="FoodRecipe" component={FoodRecipe}/>
          <Drawer.Screen name="Camera" component={CameraStack}/>
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}
export default App;