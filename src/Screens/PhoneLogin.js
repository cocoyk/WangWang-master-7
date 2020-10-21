import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import pxToDp from '../util/util';
import Navigation from '../components/navigation.js';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {request} from '../util/Request.js';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

function PhoneLogin({navigation}) {
  let interval;

  const [phone, setPhone] = useState('');
  const [linecolor1, setLinecolor1] = useState(false);
  const [linecolor2, setLinecolor2] = useState(false);
  const [canGetCode, setCanGetCode] = useState(true);
  const [code, setCode] = useState('');
  const [secretType, setSecretType] = useState(true);
  const [leftTime, setLeftTime] = useState('0');

  const changetype = () => {
    console.log('换个方式登录');
    let inittype = secretType;

    setSecretType(!inittype);
  };

  const getCode = () => {
    if (phone === '') {
      Toast.showWithGravity('手机号不能为空', Toast.SHORT, Toast.CENTER);
    } else {
      const api = 'send_captcha_new';
      const params = {phone: phone};
      if (canGetCode) {
        request(
          api,
          params,
          function () {
            getTimeLeft();
            setCanGetCode(false);
          },
          function (res) {
            Toast.showWithGravity(res.data.msg, Toast.SHORT, Toast.CENTER);
          },
        );
      }
    }
  };

  const getTimeLeft = () => {
    var leftTime1 = leftTime;
    interval = setInterval(function () {
      setLeftTime(leftTime1 - 1);
      leftTime1--;
      if (leftTime1 <= 0) {
        clearInterval(interval);
        setLeftTime(60);
        setCanGetCode(true);
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailinfo}>
        <View
          style={[
            styles.childinfo,
            {
              borderBottomColor: linecolor1 ? '#ff5186' : '#A3A9B9',
            },
          ]}>
          <Text style={styles.title}>手机号</Text>
          <TextInput
            style={styles.input_area}
            onChangeText={(newPhone) => setPhone(newPhone)}
            value={phone}
            placeholder="手机号"
            onFocus={() => setLinecolor1(true)}
            onBlur={() => setLinecolor1(false)}
            placeholderTextColor="#7f7f85"
          />
        </View>
        {secretType ? (
          <View
            style={[
              styles.childinfo,
              {
                borderBottomColor: linecolor2 ? '#ff5186' : '#A3A9B9',
              },
            ]}>
            <Text style={styles.title}>密码</Text>
            <TextInput
              style={[styles.input_area, {paddingLeft: pxToDp(100)}]}
              onChangeText={(newCode) => setCode(newCode)}
              value={code}
              placeholder="密码"
              onFocus={() => setLinecolor2(true)}
              onBlur={() => setLinecolor2(false)}
              placeholderTextColor="#7f7f85"
            />
          </View>
        ) : (
          <View
            style={[
              styles.childinfo,
              {
                borderBottomColor: linecolor2 ? '#ff5186' : '#A3A9B9',
              },
            ]}>
            <Text style={styles.title}>验证码</Text>
            <TextInput
              style={[styles.input_area, {width: pxToDp(360)}]}
              onChangeText={(newCode) => setCode(newCode)}
              value={code}
              placeholder="验证码"
              onFocus={() => setLinecolor2(true)}
              onBlur={() => setLinecolor2(false)}
              placeholderTextColor="#7f7f85"
            />
            <Text
              onPress={() => {
                getCode();
              }}
              style={[
                styles.title,
                {color: '#ff5186', flex: 1, textAlign: 'right'},
              ]}>
              {canGetCode ? '获取验证码' : leftTime + 'S后再获取'}
            </Text>
          </View>
        )}
        <View style={styles.changetypeback}>
          <Text
            onPress={() => {
              changetype();
            }}
            style={styles.changetype}>
            {secretType ? '忘记密码，验证码登录' : '密码登录'}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Route');
        }}>
        <Text style={styles.button}>登录</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PhoneLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  detailinfo: {
    width: pxToDp(750),
    backgroundColor: '#fff',
    borderTopWidth: pxToDp(10),
    borderTopColor: '#f5f5f9',
  },
  childinfo: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    // height: pxToDp(70),
    marginLeft: pxToDp(50),
    marginRight: pxToDp(50),
    paddingTop: pxToDp(50),
    paddingBottom: pxToDp(20),
    borderBottomWidth: pxToDp(2),
  },
  title: {
    color: '#1D1D1F',
    paddingTop: pxToDp(20),
    fontSize: pxToDp(32),
  },
  input_area: {
    width: pxToDp(500),
    height: pxToDp(70),
    // lineHeight: pxToDp(70),
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(0),
    paddingLeft: pxToDp(62),
    fontSize: pxToDp(32),
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: '#fff',
  },
  button: {
    width: pxToDp(560),
    height: pxToDp(90),
    fontSize: pxToDp(38),
    marginTop: pxToDp(110),
    color: '#fff',
    backgroundColor: '#ff5186',
    textAlign: 'center',
    borderRadius: pxToDp(45),
    lineHeight: pxToDp(90),
  },
  changetypeback: {
    width: pxToDp(650),
    marginTop: pxToDp(50),
    marginLeft: pxToDp(50),
    alignItems: 'flex-end',
  },
  changetype: {
    fontSize: pxToDp(32),
    textDecorationLine: 'underline',
    color: '#ff5186',
  },
});
