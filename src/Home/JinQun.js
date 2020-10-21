import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import Clipboard from "@react-native-community/clipboard";
import Toast from "react-native-simple-toast";
import pxToDp from "../util/util.js";
function JinQun(params) {
  const [wchat, setWchat] = useState("wwlm008");
  return (
    <View style={styles.container}>
      <Text
        style={{ color: "white", fontSize: pxToDp(60), alignSelf: "center" }}
      >
        1V1 带你玩转旺旺团长
      </Text>
      <Image
        style={{
          marginTop: pxToDp(40),
          alignSelf: "center",
          width: pxToDp(700),
          height: pxToDp(538),
          borderRadius: pxToDp(10),
        }}
        source={require("../image/jinqun.png")}
      />
      <View
        style={{
          marginTop: pxToDp(50),
          backgroundColor: "white",
          alignSelf: "stretch",
          alignItems: "center",
          paddingVertical: pxToDp(10),
          paddingRight: pxToDp(10),
          paddingLeft: pxToDp(20),
          borderRadius: pxToDp(50),
          justifyContent: "space-between",
        }}
        flexDirection="row"
      >
        <Text>微信号：{wchat}</Text>
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString(wchat);
            Toast.show("已复制微信号到粘贴板", Toast.SHORT);
          }}
        >
          <View
            style={{
              backgroundColor: "orange",
              paddingVertical: pxToDp(10),
              paddingHorizontal: pxToDp(20),
              borderRadius: pxToDp(50),
            }}
          >
            <Text style={{ color: "white" }}>复制微信</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default JinQun;
var styles = StyleSheet.create({
  container: {
    padding: pxToDp(30),
    flex: 1,
    //alignItems: "center",
    backgroundColor: "#FB820E",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
