import React from 'react'
import {
    SafeAreaView, StyleSheet, Dimensions, View, Animated,
  } from "react-native";
  import * as shape from "d3-shape";
  import Svg, { Path } from "react-native-svg";
  
  import StaticTabbar from "./StaticTabbar";
  
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);
  const width= Dimensions.get("window").width+0;
  const height = 65;
  const tabs = [
    {
      name: "Discover",
      image:require("../../Assets/icons/home.png"),
      image_selected:require("../../Assets/icons/home_white.png"),
      width:25,
      height:25
    },
    {
      name: "Ingredients",
      image:require("../../Assets/icons/cart.png"),
      image_selected:require("../../Assets/icons/cart_white.png"),
      width:25,
      height:25
    },
    {
      name: "Profile",
      image:require("../../Assets/icons/user.png"),
      image_selected:require("../../Assets/icons/user_white.png"),
      width:25,
      height:25
    },
  ];
  const tabWidth = width / tabs.length;
  const backgroundColor = "#eee"; //#ffcc7e
  
  const getPath = () => {
    const left = shape.line().x(d => d.x).y(d => d.y)([
      { x: 0, y: 0 },
      { x: width, y: 0 },
    ]);
    const tab = shape.line().x(d => d.x).y(d => d.y).curve(shape.curveBasis)([
      { x: width, y: 0 },
      { x: width + 5, y: 0 },
      { x: width + 20, y: 10 },
      { x: width + 32, y: height-15 },
      { x: width + tabWidth - 32, y: height-15 },
      { x: width + tabWidth - 20, y: 10 },
      { x: width + tabWidth - 5, y: 0 },
      { x: width + tabWidth, y: 0 },
    ]);
    const right = shape.line().x(d => d.x).y(d => d.y)([
      { x: width + tabWidth, y: 0 },
      { x: width * 2, y: 0 },
      { x: width * 2, y: height },
      { x: 0, y: height },
      { x: 0, y: 0 },
    ]);
    return `${left} ${tab} ${right}`;
  };
  const d = getPath();

  
  // eslint-disable-next-line react/prefer-stateless-function
  export default class Tabbar extends React.PureComponent {
    value = new Animated.Value(0);
  
    staticPress=(elm)=>{
      this.props.tabPress(elm)
    }

    render() {
      const { value } = this;
      const translateX = value.interpolate({
        inputRange: [0, width],
        outputRange: [-width, 0],
      });
      return (
        <>
          <View {...{ height, width }} style={{elevation:10,marginBottom:5}} >
            <AnimatedSvg width={width * 2} {...{ height }} style={{ transform: [{ translateX }] }}>
              <Path fill={backgroundColor} {...{ d }} />
            </AnimatedSvg>
            <View style={StyleSheet.absoluteFill}>
              <StaticTabbar {...{ tabs, value }} staticPress={this.staticPress} />
            </View>
          </View>
          {/* <SafeAreaView style={styles.container} /> */}
        </>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor,
      zIndex:150
    },
  });