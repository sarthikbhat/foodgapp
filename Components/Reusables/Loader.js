import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Dimensions
} from 'react-native';

const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;


  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
            color="#000000"
            size="large"
            />
        </View>
        {/* <View style={styles.activityIndicatorWrapper}>
          <FastImage
            style={{
              height: 50,
              width:70
              //  resizeMode: "contain"
            }}
            source={require("../../assets/Icons/loaderFinal.gif")}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View> */}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: 'rgba(0,0,0,0)',
    height: Dimensions.get('window').height / 8,
    width: Dimensions.get('window').width / 4,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loader;