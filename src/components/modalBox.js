import React, {Component} from 'react';
import pxToDp from '../util/util.js';
import {
  Text,
  View,
  Image,
  Modal,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class modalBox extends Component {
  sceenHeight = Dimensions.get('window').height; //屏幕高度

  constructor(props) {
    super(props);
  }

  modalClose = () => {
    const self = this;
    self.props.hiddenModal();
  };

  render() {
    const self = this;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={self.props.visible}
        onRequestClose={() => self.modalClose()}>
        <Text
          onPress={self.modalClose}
          style={[styles.modalback, {height: self.sceenHeight}]}
        />
        <View style={styles.content}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.modalimg}
            onPress={self.modalClose}>
            <Image
              style={styles.closeimg}
              source={require('../image/common_btn_close.png')}
            />
          </TouchableOpacity>
          <Text style={styles.modaltitle}>{self.props.modaltitle}</Text>
          {self.props.modalContent.map((item, index) => {
            //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
            return (
              <Text key={index} style={styles.modaltext}>
                {item}
              </Text>
            );
          })}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  nodata: {
    width: pxToDp(750),
    fontSize: pxToDp(36),
    textAlign: 'center',
  },
  modalback: {
    width: pxToDp(750),
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d1d1f',
    zIndex: 50,
  },
  content: {
    position: 'absolute',
    width: pxToDp(600),
    top: pxToDp(350),
    left: pxToDp(75),
    padding: pxToDp(30),
    marginBottom: pxToDp(50),
    borderRadius: pxToDp(20),
    opacity: 1,
    backgroundColor: '#fff',
    zIndex: 100,
  },
  modalimg: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: pxToDp(120),
    paddingLeft: pxToDp(40),
    paddingBottom: pxToDp(40),
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToDp(120),
  },
  closeimg: {
    width: pxToDp(60),
    height: pxToDp(60),
  },
  modaltitle: {
    width: pxToDp(300),
    paddingLeft: pxToDp(20),
    fontSize: pxToDp(32),
    color: '#ff5186',
    fontWeight: 'bold',
  },
  modaltext: {
    fontSize: pxToDp(28),
    marginTop: pxToDp(20),
    color: '#3f4450',
  },
});
