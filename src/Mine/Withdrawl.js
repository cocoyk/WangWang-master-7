import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import Toast from 'react-native-simple-toast';
// import request from '../../util/Request';
// import Navigation from '../component/navigation';
import pxToDp from '../util/util.js';

import request from '../util/Request.js';
import AsyncStorage from '@react-native-community/async-storage';

function Withdrawl({navigation}) {
  const [withdrawal_income, setWithdrawal_income] = useState('*');
  const [total_income, setTotal_income] = useState('*');
  const [has_withdrawal, setHas_withdrawal] = useState('*');
  const [withdraw_date, setWithdraw_date] = useState('*');
  const [pay_rebate, setPay_rebate] = useState('*');

  useEffect(() => {
    AsyncStorage.getItem('token').then((val) => {
      const api = 'user_withdrawal_overview';
      const params = {token: val};
      request(api, params, function (res) {
        console.log(res.data.data);
        setTotal_income(res.data.data.agent_amount_total);
        setHas_withdrawal(res.data.data.withdrawal_income);
        setWithdrawal_income(res.data.data.agent_amount);
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.first}>可提现金额</Text>
        <Text style={styles.second}>￥{withdrawal_income}</Text>
        <View
          style={{
            width: pxToDp(750),
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            activeOpacity={0.9}
            // onPress={() => this.toTixian(0)}
            onPress={() => {
              navigation.navigate('WithdrawCash');
            }}>
            <Text style={styles.button}>提现到微信</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              Toast.showWithGravity('暂无可提现金额', Toast.SHORT, Toast.CENTER)
            }>
            <Text style={styles.button}>提现到支付宝</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.third}>提现时间：9:00——24:00,每次不超过5000元</Text>
      </View>
      <View style={styles.down}>
        <View style={styles.downchild}>
          <Text style={styles.childtitle}>总到账金额</Text>
          <Text style={styles.childnum}>￥{total_income}</Text>
        </View>
        <View style={styles.downchild}>
          <Text style={styles.childtitle}>已提现金额</Text>
          <Text style={styles.childnum}>￥{has_withdrawal}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('WithdrawlRecord');
            }}
            style={styles.record}>
            <Text style={styles.recordtitle}>提现记录</Text>
            <Image
              style={styles.recordimg}
              source={require('../image/mine_icon_tixian.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={{
          width: pxToDp(750),
          paddingLeft: pxToDp(115),
          paddingTop: pxToDp(50),
          fontSize: pxToDp(26),
          lineHeight: pxToDp(36),
          color: '#848a99',
          flex: 1,
          backgroundColor: '#fff',
        }}>
        1、订单确认收货15天后即可提现{'\n'}2、提现时间为每月
        {withdraw_date}日{'\n'}
        3、最低提现1元{'\n'}4、提现手续费为{pay_rebate}%
      </Text>
    </View>
  );
}
export default Withdrawl;
// getMoney() {
//   const self = this;
//   const api = 'user_withdrawal_overview';
//   const params = {};
//   request(api, params, function (res) {
//     self.setState({
//       withdrawal_income: res.data.data.withdrawal_income,
//       total_income: res.data.data.total_income,
//       has_withdrawal: res.data.data.has_withdrawal,
//     });
//   });
// }

// componentDidMount() {
//   const self = this;
//   self.navigationEvent = self.props.navigation.addListener(
//     'didFocus',
//     self.refreshData,
//   );
// }

// componentWillUnmount() {
//   if (this.navigationEvent) {
//     this.navigationEvent.remove();
//   }
//   // AdEventListener.removeEvent("TXADEVENTS");
// }

// refreshData = () => {
//   this.getMoney();
//   this.getWithdrawlPay();
// };

// toTixian = (id) => {
//   if (this.state.withdrawal_income == '*') {
//     Toast.showWithGravity('操作过快，请稍候', Toast.SHORT, Toast.CENTER);
//   } else {
//     if (this.state.withdrawal_income > 0) {
//       NavigationService.push('WithdrawCash', {
//         left_income: this.state.withdrawal_income,
//         cash_type: id,
//       });
//     } else {
//       Toast.showWithGravity('暂无可提现金额', Toast.SHORT, Toast.CENTER);
//     }
//   }
// };

// getWithdrawlPay = () => {
//   const self = this;
//   const api = 'get_setting';
//   const params = {};
//   request(api, params, function (res) {
//     global.pay_rebate = res.data.settings.withdrawal_service_charge_rate;
//     self.setState({
//       withdraw_date: res.data.settings.withdraw_date,
//       pay_rebate: res.data.settings.withdrawal_service_charge_rate,
//     });
//   });
// };

// toRecord = () => {
//   NavigationService.push('WithdrawlRecord');
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f9',
    alignItems: 'center',
  },
  top: {
    width: pxToDp(750),
    backgroundColor: '#fff',
    marginTop: pxToDp(10),
    alignItems: 'center',
    // justifyContent: "center",
  },
  first: {
    fontSize: pxToDp(32),
    color: '#1d1d1f',
    paddingTop: pxToDp(60),
    paddingBottom: pxToDp(40),
  },
  second: {
    fontSize: pxToDp(72),
    color: '#1d1d1f',
    fontWeight: 'bold',
    paddingBottom: pxToDp(50),
  },
  button: {
    width: pxToDp(300),
    height: pxToDp(90),
    fontSize: pxToDp(36),
    color: '#fefeff',
    backgroundColor: '#ff5186',
    textAlign: 'center',
    borderRadius: pxToDp(10),
    lineHeight: pxToDp(90),
  },
  third: {
    fontSize: pxToDp(24),
    color: '#848a99',
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(40),
  },
  down: {
    width: pxToDp(750),
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: pxToDp(20),
  },
  downchild: {
    width: pxToDp(375),
    borderRightColor: '#f5f5f9',
    borderRightWidth: pxToDp(2),
    marginTop: pxToDp(40),
    marginBottom: pxToDp(40),
    alignItems: 'center',
    // justifyContent: "center"
  },
  childtitle: {
    color: '#1D1D1F',
    fontSize: pxToDp(28),
    paddingBottom: pxToDp(30),
  },
  childnum: {
    color: '#1D1D1F',
    fontSize: pxToDp(48),
    fontWeight: 'bold',
    paddingBottom: pxToDp(20),
  },
  record: {
    width: pxToDp(150),
    height: pxToDp(50),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordtitle: {
    fontSize: pxToDp(24),
    color: '#848a99',
  },
  recordimg: {
    width: pxToDp(12),
    height: pxToDp(22),
  },
});
