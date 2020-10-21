import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
} from "react-native";
// import request from '../../util/Request';
// import Navigation from '../component/navigation';
import pxToDp from "../util/util.js";
import AsyncStorage from "@react-native-community/async-storage";
// import NavigationService from '../../util/NavigationService.js';
// import AsyncStorage from '@react-native-community/async-storage';
// import {CHANNEL} from '../../AppConfig';

import { CommonActions } from "@react-navigation/native";

function Personal({ navigation, route }) {
  let subscription = "";
  let pid;
  const [userInfo, setUserInfo] = useState({});
  const [phonenum, setPhonenum] = useState("");

  const { details } = route.params;
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: "Route" }],
  });

  const formatePhone = (num) => {
    let str = String(num);
    return str.replace(str.substring(3, 7), "****");
  };

  useEffect(() => {
    getUserInfo().then((res) => {
      setUserInfo(res);
    });
  }, []);

  const getUserInfo = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    let temp = {};

    result.forEach((el) => {
      temp[el[0]] = el[1];
    });

    return temp;
  };

  const clearAllData = () => {
    AsyncStorage.getAllKeys().then((keys) => AsyncStorage.multiRemove(keys));
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailinfo}>
        <View style={[styles.childinfo, styles.topchild]}>
          <Text style={styles.title}>头像</Text>
          <Image style={styles.chatimg} source={{ uri: details.headimg }} />
        </View>
        <View style={[styles.childinfo, styles.topborder]}>
          <Text style={styles.title}>ID</Text>
          <Text style={styles.infodetail}>{details.user_id}</Text>
        </View>
        <View style={[styles.childinfo, styles.topborder]}>
          <Text style={styles.title}>昵称</Text>
          <Text style={styles.infodetail}>{details.nick_name}</Text>
        </View>
        <View style={[styles.childinfo, styles.topborder]}>
          <Text style={styles.title}>注册时间</Text>
          <Text style={styles.infodetail}>{userInfo.create_time}</Text>
        </View>
        <View style={[styles.childinfo, styles.topborder]}>
          <Text style={styles.title}>微信号</Text>
          {userInfo.wechat_id ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ChatId");
              }}
              style={styles.operation}
            >
              <Text style={styles.infodetail}>{userInfo.wechat_id}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ChatId");
              }}
              style={styles.operation}
            >
              <Text style={styles.write}>填写</Text>
              <Image
                style={styles.helpimg}
                source={require("../image/mine_icon_tixian.png")}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.childinfo, styles.topborder]}>
          <Text style={styles.title}>手机号码</Text>
          {details.mobile ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PhoneNum");
              }}
              style={styles.operation}
            >
              <Text style={styles.infodetail}>
                {formatePhone(details.mobile)}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PhoneNum");
              }}
              style={styles.operation}
            >
              <Text style={styles.write}>填写</Text>
              <Image
                style={styles.helpimg}
                source={require("../image/mine_icon_tixian.png")}
              />
            </TouchableOpacity>
          )}
        </View>
        {userInfo.agent_pid && (
          <View style={[styles.childinfo, styles.topborder]}>
            <Text style={styles.title}>邀请人</Text>
            <Text style={styles.infodetail}>
              {userInfo.agent_nickname}({userInfo.agent_pid})
            </Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          clearAllData();
          navigation.dispatch(resetAction);
        }}
      >
        <Text style={styles.logout}>退出登录</Text>
      </TouchableOpacity>
    </View>
  );
}

// getUserDetail() {
//   const self = this;
//   const api = 'user_details';
//   const params = {};
//   request(api, params, function (res) {
//     self.setState({
//       userInfo: res.data.data,
//       phonenum: res.data.data.phone,
//       // phonenum: null
//     });
//     if (res.data.data.wechat_id != null) {
//       AsyncStorage.setItem('chatid', res.data.data.wechat_id);
//     }
//     if (res.data.data.phone != null) {
//       AsyncStorage.setItem('phone', res.data.data.phone);
//     }
//   });
// }

// refreshData = () => {
//   const self = this;
//   const api = 'user_details';
//   const params = {};
//   request(api, params, function (res) {
//     console.log('self', self);
//     self.setState({
//       userInfo: res.data.data,
//     });
//   });
// };

// componentDidMount = async () => {
//   this.pid = await AsyncStorage.getItem('pid');
//   this.getUserDetail();
//   this.subscription = DeviceEventEmitter.addListener(
//     'refreshPage',
//     this.refreshData,
//   );
// };

// componentWillUnmount() {
//   this.subscription.remove();
// }

// writeChatId = () => {
//   NavigationService.push('ChatId');
// };

// writePhone = () => {
//   NavigationService.push('PhoneNum');
// };

// logout = async () => {
//   // const left_time = await AsyncStorage.getItem("get_time");
//   global.userToken = '';
//   AsyncStorage.multiSet([
//     ['ChannelName', CHANNEL],
//     ['token', ''],
//   ]);
//   // AsyncStorage.clear(function(error) {
//   //   if (!error) {
//   //     AsyncStorage.setItem("ChannelName", CHANNEL);
//   //     AsyncStorage.setItem("get_time", left_time);
//   //   }
//   // });
//   NavigationService.reset('Login');
// };

export default Personal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  detailinfo: {
    backgroundColor: "#fff",
    marginTop: pxToDp(10),
  },
  childinfo: {
    flexDirection: "row",
    position: "relative",
    marginLeft: pxToDp(40),
    marginRight: pxToDp(40),
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(20),
  },
  topchild: {
    height: pxToDp(170),
    alignItems: "center",
  },
  topborder: {
    borderTopColor: "#EAEAEF",
    borderTopWidth: pxToDp(2),
    paddingTop: pxToDp(40),
    paddingBottom: pxToDp(40),
  },
  title: {
    color: "#1D1D1F",
    fontSize: pxToDp(32),
  },
  chatimg: {
    position: "absolute",
    right: 0,
    width: pxToDp(130),
    height: pxToDp(130),
  },
  infodetail: {
    flex: 1,
    textAlign: "right",
    color: "#848A99",
    fontSize: pxToDp(32),
  },
  operation: {
    flex: 1,
    justifyContent: "flex-end",
    marginRight: pxToDp(5),
    flexDirection: "row",
    alignItems: "center",
  },
  helpimg: {
    width: pxToDp(12),
    height: pxToDp(22),
    marginLeft: pxToDp(6),
  },
  write: {
    color: "#848A99",
    fontSize: pxToDp(32),
  },
  logout: {
    marginTop: pxToDp(20),
    backgroundColor: "#fff",
    width: pxToDp(750),
    height: pxToDp(130),
    fontSize: pxToDp(36),
    color: "black",
    textAlign: "center",
    lineHeight: pxToDp(130),
  },
});
