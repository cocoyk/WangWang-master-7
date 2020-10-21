/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
"use strict";

import React, { useEffect } from "react";
import Axios from "axios";

import pxToDp from "../util/util.js";
import { CommonActions } from "@react-navigation/native";

import {
  Alert,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-simple-toast";
import * as WeChat from "react-native-wechat-lib";
import request from "../util/Request.js";
import AsyncStorage from "@react-native-community/async-storage";

// TODO:更改图标
function Login({ navigation }) {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: "Route" }],
  });
  useEffect(() => {
    WeChat.registerApp("wxa9a9b64733462cf2", "https://pinkequan.cn/");
  }, []);

  const wechatSendAuthRequest = async () => {
    let scope = "snsapi_userinfo";
    let state = "wechat_sdk_demo";
    WeChat.isWXAppInstalled().then(async (isInstalled) => {
      if (isInstalled) {
        const responseCode = await WeChat.sendAuthRequest(scope, state);
        wechatLogin(responseCode.code);
        console.log("responseCode===>>", responseCode);
      } else {
        Toast.show("请先安装微信", Toast.SHORT);
      }
    });
  };
  const wechatLogin = (code) => {
    console.log("hello");
    const api = "applogin";
    const params = { code: code };

    Axios.get("https://jsonplaceholder.typicode.com/todos/1").then((res) => {
      console.log(res.data);
    });
    request(api, params, function (res) {
      console.log(res.data.data.token);
      AsyncStorage.setItem("token", res.data.data.token, (err) => {
        if (!err) {
          getUserInfo(res.data.data.token);
        }
      });
    });
  };

  const getUserInfo = (token) => {
    const api = "user_details";
    console.log(token);
    const params = { token: token };
    request(api, params, function (res) {
      if (res.data.code === 0) {
        var keyValuePairs = [
          ["phone", res.data.data.phone.toString()],
          ["avatar_url", res.data.data.avatar_url.toString()],
          ["wechat_id", res.data.data.wechat_id.toString()],
          ["nickname", res.data.data.nickname.toString()],
          ["agent_nickname", res.data.data.agent_nickname.toString()],
          ["agent_pid", res.data.data.agent_pid.toString()],
          ["create_time", res.data.data.create_time.toString()],
        ];
        AsyncStorage.multiSet(keyValuePairs, function (err) {
          if (!err) {
            navigation.dispatch(resetAction);
            Toast.show("登录成功", Toast.SHORT);
          }
        });
      }
      console.log(res.data.data);
    });
  };

  const wxlogin = () => {
    WechatModule.isSupported((support) => {
      if (support) {
        console.log("已安装微信");
        WechatModule.oAuth("myapplication").then((data) => {
          console.log("用户信息", data);
          //   this.wechatlogin(data.code);
        });
      } else {
        Alert.alert("微信登录失败: 未安装微信");
        console.log("未安装微信");
      }
    });
  };

  return (
    <View style={styles.loginform}>
      <StatusBar hidden={true} />
      <Image
        style={{ width: pxToDp(700), height: pxToDp(1420) }}
        source={require("../image/authorize.png")}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          wechatSendAuthRequest();
        }}
      />

      <TouchableOpacity
        style={styles.btnBack}
        onPress={() => {
          navigation.dispatch(resetAction);
        }}
      />

      {/* <Text style={styles.bottomcontent}>购省购赚 做任务赚零花</Text> */}
      {/* <View style={styles.bottomspace} /> */}
    </View>
  );
}

var styles = StyleSheet.create({
  loginform: {
    flex: 1,

    backgroundColor: "#fff",
    alignItems: "center",
  },
  loginimg: {
    width: pxToDp(234),
    height: pxToDp(263),
  },
  topspace: {
    flex: 1,
    width: pxToDp(750),
    backgroundColor: "#d3174a",
  },
  bottomspace: {
    flex: 1,
    width: pxToDp(750),
    backgroundColor: "#ffffff",
  },
  btn: {
    position: "absolute",
    top: pxToDp(610),
    width: pxToDp(680),
    height: pxToDp(100),
    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
    borderRadius: pxToDp(50),
  },

  btnBack: {
    position: "absolute",

    width: pxToDp(100),
    left: pxToDp(40),
    top: pxToDp(5),
    height: pxToDp(80),
    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
    borderRadius: pxToDp(50),
  },
  phonelogin: {
    width: pxToDp(530),
    height: pxToDp(100),
    flexDirection: "row",
    marginTop: pxToDp(33),
    borderColor: "#B0B0B0",
    borderWidth: pxToDp(2),
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: pxToDp(50),
  },
  bottomcontent: {
    color: "#A4A4A4",
    marginTop: pxToDp(90),
    marginBottom: pxToDp(60),
    fontSize: pxToDp(26),
    letterSpacing: pxToDp(20),
  },
});

export default Login;
