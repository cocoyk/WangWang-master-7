import React, {Component} from 'react';
import pxToDp from '../util/util.js';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

function LoadingActivity(props) {
  return (
    <View style={[styles.loadingArea, {top: props.topheight}]}>
      <ActivityIndicator size="large" color="#ff4d00" style={{flex: 1}} />
    </View>
  );
}
export default LoadingActivity;

const styles = StyleSheet.create({
  loadingArea: {
    // height: pxToDp(0),
    // position: "absolute",
    flex: 1,
    // marginTop: pxToDp(300),
    alignItems: 'center',
    // textAlign: "center",
    justifyContent: 'center',
  },
});
