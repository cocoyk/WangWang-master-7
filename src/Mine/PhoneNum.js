import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import Toast from 'react-native-simple-toast';
// import request from '../../util/Request';
import pxToDp from '../util/util.js';
// import Navigation from '../component/navigation';
// import NavigationService from '../../util/NavigationService.js';
// import AsyncStorage from '@react-native-community/async-storage';

function PhoneNum(params) {
  const [phone, setPhone] = useState('');
  const [canGetCode, setCanGetCode] = useState(true);
  const [code, setCode] = useState('');
  const [leftTime, setLeftTime] = useState(60);

  return (
    <View style={styles.container}>
      <View style={styles.detailinfo}>
        <View style={styles.childinfo}>
          <Text style={styles.title}>手机号</Text>
          <TextInput
            style={styles.input_area}
            onChangeText={(newPhone) => setPhone(newPhone)}
            value={phone}
            placeholder="手机号"
            placeholderTextColor="#7f7f85"
          />
        </View>
        <View style={styles.childinfo}>
          <Text style={styles.title}>验证码</Text>
          <TextInput
            style={[styles.input_area, {width: pxToDp(380)}]}
            onChangeText={(newCode) => setCode(newCode)}
            value={code}
            placeholderTextColor="#7f7f85"
          />
          <TouchableOpacity
          // onPress={this.getCode}
          >
            <Text style={styles.code}>
              {canGetCode ? '获取验证码' : leftTime + 'S后再获取'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
      // onPress={this.savePhone}
      >
        <Text style={styles.button}>保存</Text>
      </TouchableOpacity>
    </View>
  );
}
export default PhoneNum;

// changePhone() {
//   const self = this;
//   const api = 'bind_phone';
//   const params = {phone: self.state.phone, code: self.state.code};
//   request(api, params, function () {
//     AsyncStorage.setItem('phone', self.state.phone);
//     DeviceEventEmitter.emit('refreshPage');
//     //   self.props.navigation.getParam("refreshData", "");
//     //   self.props.route.params.refreshData();
//     NavigationService.pop();
//   });
// }

// componentDidMount() {
//   // this.getChatId();
// }

// getPhone = async () => {
//   const phone = await AsyncStorage.getItem('phone');
//   this.setState({
//     phone: phone,
//   });
// };

// getCode = () => {
//   if (this.state.phone == '') {
//     Toast.showWithGravity('手机号不能为空', Toast.SHORT, Toast.CENTER);
//   } else {
//     const self = this;
//     const api = 'user_details_send_captcha';
//     const params = {phone: self.state.phone};
//     if (self.state.canGetCode) {
//       request(api, params, function () {
//         self.getTimeLeft();
//         self.setState({
//           canGetCode: false,
//         });
//       });
//     }
//   }
// };

// getTimeLeft = () => {
//   let self = this;
//   var leftTime = self.state.leftTime;
//   var interval = setInterval(function () {
//     self.setState({
//       leftTime: leftTime - 1,
//     });
//     leftTime--;
//     if (leftTime <= 0) {
//       clearInterval(interval);
//       self.setState({
//         leftTime: 60,
//         canGetCode: true,
//       });
//     }
//   }, 1000);
// };

// savePhone = () => {
//   if (this.state.code == '') {
//     Toast.showWithGravity('验证码不能为空', Toast.SHORT, Toast.CENTER);
//   } else {
//     this.changePhone();
//   }
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  detailinfo: {
    width: pxToDp(750),
    backgroundColor: '#fff',
    marginTop: pxToDp(10),
    paddingBottom: pxToDp(30),
  },
  childinfo: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    marginLeft: pxToDp(40),
    marginRight: pxToDp(40),
    paddingTop: pxToDp(10),
    paddingBottom: pxToDp(10),
    borderBottomColor: '#eaeaef',
    borderBottomWidth: pxToDp(2),
  },
  title: {
    color: '#1D1D1F',
    fontSize: pxToDp(32),
  },
  input_area: {
    width: pxToDp(500),
    // height: pxToDp(50),
    // lineHeight: pxToDp(50),
    paddingLeft: pxToDp(62),
    fontSize: pxToDp(32),
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: '#fff',
  },
  code: {
    width: pxToDp(185),
    height: pxToDp(57),
    fontSize: pxToDp(28),
    color: '#ff5186',
    borderRadius: pxToDp(29),
    borderColor: '#ff5186',
    borderWidth: pxToDp(2),
    textAlign: 'center',
    lineHeight: pxToDp(56),
  },
  button: {
    width: pxToDp(600),
    height: pxToDp(90),
    fontSize: pxToDp(36),
    marginTop: pxToDp(40),
    color: '#fefeff',
    backgroundColor: '#ff5186',
    textAlign: 'center',
    borderRadius: pxToDp(10),
    lineHeight: pxToDp(90),
  },
});
