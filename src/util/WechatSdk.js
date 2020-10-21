import {NativeModules} from 'react-native';

// 导出微信sdk
export default NativeModules.WechatModule;

// WechatModule.isSupported((support) => {
//   if (support) {
//     Alert.alert('提示', '已安装微信');
//   } else {
//     Alert.alert('提示', '没有安装微信');
//   }
// });
// WechatModule.isSupported2().then((data) => {
//   if (data.support == true) {
//     Alert.alert('提示', '已安装微信');
//   } else {
//     Alert.alert('提示', '没有安装微信');
//   }
// });
// WechatModule.oAuth('ttttt').then((data) => {
//   console.log('MyApplication====>data=' + JSON.stringify(data));
//   runOnUIThread(() => {
//     console.log('MyApplication====>data------');
//     Alert.alert('提示', '已安装微信');
//   });
//   console.log('MyApplication====>over!!!');
// });
// WechatModule.shareBmpToWx(
//   0,
//   'http://pic44.nipic.com/20140723/19276212_171901262000_2.jpg',
// );
// var order = {};
// order.appid = WECHAT_KEY;
// order.partnerid = '1459720802';
// order.prepayid = 'wx18123426315960731132d1d32770252468';
// order.noncestr = 'jsaioKonsnOCXZM&jmx213Dj';
// order.timestamp = '1552883666';
// order.package = 'Sign=WXPay';
// order.sign = 'A81AE19997DDCE2AEF627E9D3CD7317C';
// console.log('==MyApplication==' + order);
// WechatModule.pay(order).then((data) => {
//   console.log('MyApplication====>data=' + JSON.stringify(data));
//   console.log('MyApplication====>over!!!');
// });
export class WechatSdk {
  static isSupported(cb) {
    NativeModules.WechatModule.isSupported(cb);
  }
}
