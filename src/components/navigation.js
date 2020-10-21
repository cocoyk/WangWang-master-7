import React, {useState} from 'react';
import pxToDp from '../util/util.js';
import NavigationService from '../util/NavigationService.js';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  DeviceEventEmitter,
  StyleSheet,
} from 'react-native';

function Navigation(props, {navigation}) {
  const [token, setToken] = useState('');
  const [productList, setProductList] = useState([]);

  const goBack = () => {
    if (props.is_webview) {
      props.back();
    } else {
      NavigationService.pop();
      if (props.refresh) {
        DeviceEventEmitter.emit('refresh' + props.refresh_page);
      }
    }
  };

  return (
    <View
      style={[
        Platform.OS == 'android' ? styles.andcontainer : styles.ioscontainer,
        {
          backgroundColor: props.special ? '#ff5186' : '#fff',
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.2}
        style={styles.backtap}
        onPress={goBack}>
        <Image
          style={styles.backimg}
          source={
            props.special
              ? require('../image/back_navigate_shop.png')
              : require('../image/back_navigate_theme.png')
          }
        />
      </TouchableOpacity>
      <Text style={props.special ? styles.specialpagetitle : styles.pagetitle}>
        {props.title}
      </Text>

      <StatusBar
        barStyle={props.special ? 'default' : 'dark-content'}
        backgroundColor={props.special ? '#ff5186' : '#fff'}
      />
    </View>
  );
}

// componentDidMount() {
//   const self = this;
//   console.log('系统', Platform.OS, self.props.routeName);
//   StatusBar.setBarStyle(
//     self.props.special ? 'default' : 'dark-content',
//     false,
//   );
//   StatusBar.setBackgroundColor(
//     self.props.special ? '#ff5186' : '#fff',
//     false,
//   );
// }
export default Navigation;

const styles = StyleSheet.create({
  andcontainer: {
    flexDirection: 'row',
    width: pxToDp(750),
    height: pxToDp(90),
    alignItems: 'center',
    // justifyContent: "center"
  },
  ioscontainer: {
    flexDirection: 'row',
    width: pxToDp(750),
    height: pxToDp(120),
    paddingBottom: pxToDp(20),
    alignItems: 'flex-end',
  },
  pagetitle: {
    width: pxToDp(450),
    textAlign: 'center',
    // lineHeight: pxToDp(90),
    fontSize: pxToDp(36),
    color: '#3f4450',
  },
  specialpagetitle: {
    width: pxToDp(450),
    textAlign: 'center',
    // lineHeight: pxToDp(90),
    fontSize: pxToDp(32),
    color: '#fff',
  },
  backtap: {
    width: pxToDp(150),
    height: pxToDp(40),
    paddingRight: pxToDp(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backimg: {
    // position: "absolute",
    width: pxToDp(40),
    height: pxToDp(40),
    // top: pxToDp(-35)
    // width: pxToDp(12),
    // height: pxToDp(12)
    // marginLeft: pxToDp(40)
  },
});
