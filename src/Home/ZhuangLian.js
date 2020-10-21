/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";

import pxToDp from "../util/util.js";

import {
  Alert,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Linking,
} from "react-native";
import Toast from "react-native-simple-toast";
import LinearGradient from "react-native-linear-gradient";
import Clipboard from "@react-native-community/clipboard";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-community/async-storage";
import request from "../util/Request.js";
import LoadingActivity from "../components/loadingActivity.js";

function ZhuangLian({ navigation }) {
  const [urlInput, setUrlInput] = useState("");
  const [newURL, setNewURL] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const openApp = () => {
    Linking.canOpenURL("weixin://")
      .then((supported) => {
        if (!supported) {
          console.log("无法打开");
        } else {
          return Linking.openURL("weixin://");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeURl = () => {
    setShowLoading(true);
    AsyncStorage.getItem("token").then((val) => {
      console.log(val);
      if (val !== null) {
        const api = "changeurl";
        const params = { platform: 1, oldlink: urlInput, token: val };
        request(
          api,
          params,
          function (res) {
            console.log(res.data.data);
            setNewURL(res.data.data.mylink);
            Toast.show("转链成功", Toast.SHORT);
            setShowLoading(false);
          },
          function (err) {
            Toast.show("转链失败，请重新尝试", Toast.SHORT);
            setShowLoading(false);
          }
        );
      } else {
        navigation.navigate("Login");
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.zhuangLianContainerTop}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: pxToDp(20),
            paddingBottom: pxToDp(20),
            borderBottomColor: "whitesmoke",
            borderBottomWidth: pxToDp(2),
          }}
        >
          <View
            style={{
              borderLeftWidth: pxToDp(6),
              borderLeftColor: "#CCB374",
              paddingLeft: pxToDp(10),
            }}
          >
            <Text style={{ fontWeight: "bold" }}>转链前</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setUrlInput("");
            }}
          >
            <View flexDirection="row" alignItems="center">
              <Image
                style={{
                  width: pxToDp(30),
                  height: pxToDp(30),
                  tintColor: "grey",
                }}
                source={require("../image/dustbin.png")}
              />
              <Text style={{ fontWeight: "bold", color: "grey" }}>清空</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TextInput
          value={urlInput}
          onChangeText={(e) => {
            setUrlInput(e);
          }}
          multiline={true}
          style={{
            justifyContent: "flex-start",
          }}
          placeholder="请输入文案..."
        ></TextInput>
        <View
          style={{
            marginTop: pxToDp(80),
            borderBottomColor: "whitesmoke",
            borderBottomWidth: pxToDp(2),
            paddingBottom: pxToDp(10),
          }}
        >
          <Text style={{ color: "grey" }}>
            请粘贴您需要转换的
            <Text style={{ color: "black", fontWeight: "bold" }}>
              （文案+淘口令）/（文案+链接）/商品URL
            </Text>
            到这里，支持淘宝/京东/拼多多/苏宁/唯品会/的平台链接转换。
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            changeURl();
          }}
        >
          <View
            style={{
              marginTop: pxToDp(30),
              backgroundColor: "#E95660",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingVertical: pxToDp(20),
              borderRadius: pxToDp(10),
            }}
          >
            <Text style={{ color: "white" }}>转换成我的推广链接</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.zhuangLianContainerBottom}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: pxToDp(20),
            paddingBottom: pxToDp(20),
            borderBottomColor: "whitesmoke",
            borderBottomWidth: pxToDp(2),
          }}
        >
          <View
            style={{
              borderLeftWidth: pxToDp(6),
              borderLeftColor: "#CCB374",
              paddingLeft: pxToDp(10),
            }}
          >
            <Text style={{ fontWeight: "bold" }}>转链后</Text>
          </View>
        </View>
        <Image
          style={{
            width: pxToDp(300),
            height: pxToDp(300),
            alignSelf: "center",
          }}
          source={require("../image/zhuanglian.png")}
        />
        <View flexDirection="row" justifyContent="space-evenly">
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(newURL);
              Toast.show("已复制新的连接到粘贴板", Toast.SHORT);
            }}
          >
            <View
              style={{
                backgroundColor: "#f5f5f9",
                paddingHorizontal: pxToDp(60),
                paddingVertical: pxToDp(20),
                borderRadius: pxToDp(10),
              }}
            >
              <Text>一键复制</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(newURL);
              openApp();
            }}
          >
            <View
              style={{
                backgroundColor: "#E95660",
                paddingHorizontal: pxToDp(60),
                paddingVertical: pxToDp(20),
                borderRadius: pxToDp(10),
              }}
            >
              <Text style={{ color: "white" }}>分享好友</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {showLoading === true && (
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              opacity: 0.6,
              width: pxToDp(150),
              height: pxToDp(150),
              borderRadius: pxToDp(20),
              backgroundColor: "grey",
            }}
          >
            <LoadingActivity />
          </View>
        </View>
      )}
    </View>
  );
}
export default ZhuangLian;

var styles = StyleSheet.create({
  zhuangLianContainerTop: {
    flex: 1,
    alignSelf: "stretch",
    margin: pxToDp(30),
    backgroundColor: "white",
    borderRadius: pxToDp(10),
    padding: pxToDp(20),
  },
  zhuangLianContainerBottom: {
    justifyContent: "space-between",
    flex: 1,
    alignSelf: "stretch",
    marginHorizontal: pxToDp(30),
    marginBottom: pxToDp(30),
    backgroundColor: "white",
    borderRadius: pxToDp(10),
    padding: pxToDp(20),
  },
  container: {
    flex: 1,

    backgroundColor: "#f5f5f9",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  thumbnail: {
    marginTop: pxToDp(10),
    width: pxToDp(695),
    marginLeft: pxToDp(25),
    height: pxToDp(267),
    borderRadius: pxToDp(20),
  },
});
