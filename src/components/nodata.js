import React, {Component} from 'react';
import pxToDp from '../util/util.js';
import {Image, StyleSheet} from 'react-native';

export default class nodata extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Image
        style={styles.nodata}
        source={require('../image/common_img_nothing.png')}
      />
    );
  }
}

const styles = StyleSheet.create({
  nodata: {
    width: pxToDp(330),
    height: pxToDp(258),
    margin: pxToDp(210),
  },
});
