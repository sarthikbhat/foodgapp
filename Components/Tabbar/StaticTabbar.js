import React from "react";
import {
  View, StyleSheet, TouchableWithoutFeedback, Animated, Dimensions, Image, Easing, Text
} from "react-native";

const { width } = Dimensions.get("window");

export default class StaticTabbar extends React.PureComponent {

  constructor(props) {
    super(props);
    const { tabs } = this.props;
    this.values = tabs.map((tab, index) => new Animated.Value(index === 0 ? 1 : 0));
  }

  onPress = (index) => {
    const { value, tabs } = this.props;
    const tabWidth = width / tabs.length;
    Animated.sequence([
      Animated.parallel(
        this.values.map(v => Animated.timing(v, {
          toValue: 0,
          duration: 120,
          easing: Easing.in,
          useNativeDriver: true,
        })),
      ),
      Animated.parallel([
        Animated.spring(value, {
          toValue: tabWidth * index,
          easing: Easing.in,
          useNativeDriver: true,
        }),
        Animated.spring(this.values[index], {
          toValue: 1,
          easing: Easing.in,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }

  render() {
    const { onPress } = this;
    const { tabs, value } = this.props;
    return (
      <View style={styles.container}>
        {
          tabs.map((tab, key) => {
            const tabWidth = width / tabs.length;
            const cursor = tabWidth * key;
            const opacity = value.interpolate({
              inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
              outputRange: [1, 0, 1],
              extrapolate: "clamp",
            });
            const translateY = this.values[key].interpolate({
              inputRange: [0, 1],
              outputRange: [44, 0],
              extrapolate: "clamp",
            });
            const opacity1 = this.values[key].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
              extrapolate: "clamp",
            });
            return (
              <React.Fragment {...{ key }}>
                <TouchableWithoutFeedback onPress={() => onPress(key)}>
                  <Animated.View style={[styles.tab, { opacity }, {}]}>
                    <Image source={tab.image} style={{ width: tab.width-5, height: tab.height-5 }} resizeMode="contain" />
                    <Text style={{fontFamily:"OpenSans-Regular", fontSize:12.3, padding:3}} >{tab.name}</Text>
                  </Animated.View>
                </TouchableWithoutFeedback>
                <Animated.View
                  style={{
                    position: "absolute",
                    top: -8,
                    left: tabWidth * key,
                    width: tabWidth,
                    height: 64,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: opacity1,
                    transform: [{ translateY }],
                  }}
                >
                  <View style={styles.activeIcon}>
                    <Image source={tab.image_selected} style={{ width: tab.width, height: tab.height }} resizeMode="contain" />
                    {/* <Text>a</Text> */}
                  </View>
                </Animated.View>
              </React.Fragment>
            );
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 64,
  },
  activeIcon: {
    elevation:10,
    backgroundColor: "#fc6474",
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
