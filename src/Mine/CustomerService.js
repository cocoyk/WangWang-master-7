import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
// import WechatModule from '../../util/WechatSdk';
import pxToDp from '../util/util.js';

import {TouchableOpacity} from 'react-native-gesture-handler';

export default class CustomerService extends Component {
  constructor(props) {
    super(props);
  }

  // contactService = () => {
  //   WechatModule.startMiniProgram(
  //     WECHAT_MINI_KEY,
  //     '/pages/mine/mine',
  //     WECHAT_MINI_TYPE,
  //   );
  // };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={require('../image/mine_img_customerservice.png')}
        />
        <TouchableOpacity
        // onPress={this.contactService}
        >
          <Text style={styles.button}>联系客服</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  img: {
    width: pxToDp(650),
    height: pxToDp(692),
    marginTop: pxToDp(55),
    marginBottom: pxToDp(70),
  },
  button: {
    width: pxToDp(400),
    height: pxToDp(100),
    fontSize: pxToDp(36),
    marginTop: pxToDp(40),
    color: '#fefeff',
    backgroundColor: '#ff5186',
    textAlign: 'center',
    borderRadius: pxToDp(50),
    lineHeight: pxToDp(100),
  },
});
