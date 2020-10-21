import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import pxToDp from '../util/util.js';
// import Navigation from '../component/navigation';
// import NavigationService from '../../util/NavigationService.js';

function WithdrawComplete({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require('../image/common_icon_success.png')}
      />
      <Text style={styles.title}>提现成功</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text style={styles.button}>确定</Text>
      </TouchableOpacity>
    </View>
  );
}
export default WithdrawComplete;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: pxToDp(250),
    height: pxToDp(250),
    marginTop: pxToDp(80),
    marginBottom: pxToDp(80),
  },
  title: {
    color: '#3f4450',
    fontSize: pxToDp(56),
  },
  button: {
    width: pxToDp(600),
    height: pxToDp(90),
    textAlign: 'center',
    lineHeight: pxToDp(90),
    backgroundColor: '#ff5186',
    borderRadius: pxToDp(10),
    marginTop: pxToDp(60),
    color: '#fefeff',
    fontSize: pxToDp(36),
  },
});
