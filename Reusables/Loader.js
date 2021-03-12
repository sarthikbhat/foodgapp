import React, { Component,useEffect } from 'react';
import CustomStatusBar from '../../assets/Constants/CustomStatusBar'
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Dimensions,
  Image
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
      <CustomStatusBar backgroundColor="#00000040" barStyle="light-content" />
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
            color="#000000"
            size="large"
            />
        </View>
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