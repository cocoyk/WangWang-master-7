import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Toast from 'react-native-simple-toast';
// import request from '../../util/Request';
import pxToDp from '../util/util.js';
// import Navigation from '../component/navigation';
// import NavigationService from '../../util/NavigationService.js';
// import AsyncStorage from '@react-native-community/async-storage';

function WithdrawCash({navigation}) {
  let interval;
  let tixian_can = true;
  const [left_income, setLeft_income] = useState(0);
  const [name, setName] = useState();
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [cash_type, setCash_type] = useState('微信钱包');
  const [visible, setVisible] = useState(false);
  const [pay_rebate, setPay_rebate] = useState('');

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => this.shareModalClose()}>
        <View style={styles.loadingback}>
          <Image
            style={{width: pxToDp(40), height: pxToDp(40)}}
            source={require('../image/loadmore.gif')}></Image>
          <Text
            style={{
              fontSize: pxToDp(30),
              color: '#fff',
              marginTop: pxToDp(20),
            }}>
            提现中，请稍候
          </Text>
        </View>
      </Modal>
      <ScrollView>
        <View style={styles.top}>
          <Text style={styles.topup}>本次提现金额</Text>
          <View style={styles.topcenter}>
            <Text style={styles.centersymbol}>￥</Text>
            <TextInput
              style={styles.input_amount}
              onChangeText={(newAmount) => setAmount(newAmount)}
              value={amount}
              placeholderTextColor="#7f7f85"
            />
          </View>
          <View style={styles.topdown}>
            <Text style={styles.downleft}>可用余额 ￥{left_income}</Text>
            <TouchableOpacity
              activeOpacity={0.9}
              // onPress={this.getAll}
            >
              <Text style={styles.downall}>全部提现</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.detailinfo}>
          <View style={styles.childinfo}>
            <Text style={styles.title}>提现到</Text>
            <Text
              style={[
                styles.input_area,
                {
                  height: pxToDp(100),
                  lineHeight: pxToDp(100),
                  color: '#1D1D1F',
                },
              ]}>
              {cash_type}
            </Text>
            {/* <Picker
              selectedValue={cash_type}
              onValueChange={itemValue =>
                this.setState({ cash_type: itemValue })
              }
              style={styles.input_area}
            >
              <Picker.Item label="微信钱包" value="微信钱包" />
              <Picker.Item label="支付宝" value="支付宝" />
            </Picker> */}
          </View>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.childinfo}>
              <Text style={styles.title}>真实姓名</Text>
              <TextInput
                style={styles.input_area}
                onChangeText={(name) => this.setState({name})}
                value={name}
                placeholder="真实姓名"
                placeholderTextColor="#7f7f85"
              />
            </View>
            {cash_type == '支付宝' && (
              <View style={styles.childinfo}>
                <Text style={styles.title}>支付宝账号</Text>
                <TextInput
                  style={styles.input_area}
                  onChangeText={(phone) => this.setState({phone})}
                  value={phone}
                  placeholder="支付宝账号"
                  placeholderTextColor="#7f7f85"
                />
              </View>
            )}
            {/* <View style={styles.childinfo}>
              <Text style={styles.title}>验证码</Text>
              <TextInput
                style={[styles.input_area, { width: pxToDp(320) }]}
                onChangeText={code => this.setState({ code })}
                value={code}
                placeholder="验证码"
                placeholderTextColor="#7f7f85"
              />
              <TouchableOpacity activeOpacity={0.9} onPress={this.getCode}>
                <Text style={styles.code}>
                  {this.state.canGetCode
                    ? "获取验证码"
                    : this.state.leftTime + "S后再获取"}
                </Text>
              </TouchableOpacity>
            </View> */}
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          // onPress={this.getCash}
          onPress={() => {
            navigation.navigate('WithdrawComplete');
          }}>
          <Text style={styles.button}>提现</Text>
        </TouchableOpacity>
        <View style={styles.helpinfo}>
          <Text style={styles.helptext}>
            1，请务必保证您填写的真实姓名与您的
            {cash_type == '支付宝' ? '支付宝' : '微信'}
            实名认证的姓名一致，否则无法提现到账
          </Text>
          <Text style={styles.helptext}>2，提现扣除手续费{pay_rebate}%</Text>
        </View>
      </ScrollView>
    </View>
  );
}
export default WithdrawCash;

// componentDidMount() {
//   let self = this;
//   const left_income = self.props.navigation.getParam('left_income', '');
//   self.cash_type = self.props.navigation.getParam('cash_type', '');
//   self.setState({
//     left_income: left_income,
//     cash_type: self.cash_type == 1 ? '支付宝' : '微信钱包',
//     pay_rebate: global.pay_rebate,
//   });
//   // self.getWithdrawlPay();
// }

// componentWillUnmount() {
//   clearInterval(this.interval);
// }

// getWithdrawlPay = () => {
//   const self = this;
//   const api = "get_setting";
//   const params = {};
//   request(api, params, function(res) {
//     self.setState({
//       pay_rebate: res.data.settings.withdrawal_service_charge_rate
//     });
//   });
// };

// getAll = () => {
//   this.setState(
//     {
//       amount: parseInt(this.state.left_income).toString(),
//     },
//     console.log('allin', this.state.amount),
//   );
// };

// getPhone = async () => {
//   const phone = await AsyncStorage.getItem('phone');
//   this.setState({
//     phone: phone,
//   });
// };

// getCode = () => {
//   if (this.state.phone == "") {
//     Toast.showWithGravity("手机号不能为空", Toast.SHORT, Toast.CENTER);
//   } else {
//     const self = this;
//     const api = "send_captcha";
//     const params = { phone: self.state.phone };
//     if (self.state.canGetCode) {
//       request(api, params, function() {
//         self.getTimeLeft();
//         self.setState({
//           canGetCode: false
//         });
//       });
//     }
//   }
// };

// getTimeLeft = () => {
//   let self = this;
//   var leftTime = self.state.leftTime;
//   self.interval = setInterval(function() {
//     self.setState({
//       leftTime: leftTime - 1
//     });
//     leftTime--;
//     if (leftTime <= 0) {
//       clearInterval(self.interval);
//       self.setState({
//         leftTime: 60,
//         canGetCode: true
//       });
//     }
//   }, 1000);
// };

// getCash = () => {
//   if (
//     this.state.name == '' ||
//     (this.cash_type == 1 && this.state.phone == '')
//   ) {
//     Toast.showWithGravity(
//       this.cash_type == 1 ? '姓名和账号不能为空' : '姓名不能为空',
//       Toast.SHORT,
//       Toast.CENTER,
//     );
//   } else {
//     const self = this;
//     const api =
//       self.cash_type == 1
//         ? 'app_shopping_zfb_withdraw'
//         : 'user_weixin_withdrawal';
//     const params =
//       self.cash_type == 1
//         ? {
//             real_name: self.state.name,
//             amount: self.state.amount,
//             alipay_account: self.state.phone,
//           }
//         : {
//             real_name: self.state.name,
//             amount: self.state.amount,
//           };
//     let reg = /^[1-9]\d*$|^0$/;
//     if (reg.test(self.state.amount)) {
//       if (self.tixian_can) {
//         self.setState({
//           visible: true,
//         });
//         self.tixian_can = false;
//         request(
//           api,
//           params,
//           function () {
//             self.setState({
//               visible: false,
//             });
//             self.tixian_can = true;
//             NavigationService.push('WithdrawComplete');
//           },
//           function (res) {
//             self.setState({
//               visible: false,
//             });
//             self.tixian_can = true;
//             Toast.showWithGravity(res.data.msg, Toast.SHORT, Toast.CENTER);
//           },
//         );
//       } else {
//         Toast.showWithGravity(
//           '操作过于频繁，请稍后再试',
//           Toast.SHORT,
//           Toast.CENTER,
//         );
//       }
//     } else {
//       Toast.showWithGravity('提现金额须为整数', Toast.SHORT, Toast.CENTER);
//     }
//   }
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  loadingback: {
    position: 'absolute',
    bottom: pxToDp(550),
    left: pxToDp(225),
    width: pxToDp(300),
    height: pxToDp(200),
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: pxToDp(20),
  },
  top: {
    width: pxToDp(750),
    marginTop: pxToDp(10),
    marginBottom: pxToDp(10),
    paddingLeft: pxToDp(40),
    paddingRight: pxToDp(40),
    backgroundColor: '#fff',
  },
  topup: {
    paddingTop: pxToDp(30),
    // paddingBottom: pxToDp(10),
    fontSize: pxToDp(32),
    color: '#4b4f59',
  },
  topcenter: {
    flexDirection: 'row',
    // paddingBottom: pxToDp(10),
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#eaeaef',
    alignItems: 'center',
  },
  centersymbol: {
    fontSize: pxToDp(50),
    color: '#3f4450',
    fontWeight: 'bold',
  },
  input_amount: {
    width: pxToDp(550),
    display: 'flex',
    fontSize: pxToDp(72),
    alignItems: 'flex-end',
  },
  topdown: {
    flexDirection: 'row',
    paddingTop: pxToDp(25),
    paddingBottom: pxToDp(25),
  },
  downleft: {
    flex: 1,
    fontSize: pxToDp(26),
    color: '#848a99',
  },
  downall: {
    fontSize: pxToDp(26),
    color: '#ff5186',
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
    width: pxToDp(200),
    fontSize: pxToDp(32),
    textAlign: 'justify',
  },
  input_area: {
    width: pxToDp(460),
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
    marginLeft: pxToDp(75),
    height: pxToDp(90),
    fontSize: pxToDp(36),
    marginTop: pxToDp(40),
    color: '#fefeff',
    backgroundColor: '#ff5186',
    textAlign: 'center',
    borderRadius: pxToDp(10),
    lineHeight: pxToDp(90),
  },
  helpinfo: {
    width: pxToDp(520),
    marginLeft: pxToDp(115),
    marginTop: pxToDp(20),
  },
  helptext: {
    fontSize: pxToDp(24),
    lineHeight: pxToDp(36),
    color: '#848a99',
  },
});
