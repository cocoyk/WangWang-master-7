import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import pxToDp from "../util/util";
import AsyncStorage from "@react-native-community/async-storage";
import request from "../util/Request.js";
import LoadingActivity from "../components/loadingActivity";
import Clipboard from "@react-native-community/clipboard";
import Toast from "react-native-simple-toast";

function MyFriendsDetail({ navigation }) {
  const [userList, setUserList] = useState();

  useEffect(() => {
    getUserList();
  }, []);

  const copyToClipboard = (text, state) => {
    Clipboard.setString(text);
    if (state === 0) {
      Toast.show("已复制微信号到粘贴板", Toast.SHORT);
    } else {
      Toast.show("已复制手机号到粘贴板", Toast.SHORT);
    }
  };
  const getUserList = () => {
    AsyncStorage.getItem("token").then((val) => {
      console.log(val);
      const api = "myUserList";
      const params = { token: val };

      request(api, params, function (res) {
        setUserList(res.data.data);
      },function(res){
        navigation.navigate('Login');
      });
    });
  };

  return (
    <View style={styles.container}>
      {userList !== undefined ? (
        <React.Fragment>
          <Text style={styles.titleTxt}>我的好友</Text>

          {userList.upper_user_id === 0 ? (
            <View
              style={{
                alignSelf: "stretch",
                backgroundColor: "#f5f5f9",
                marginHorizontal: pxToDp(35),
                paddingTop: pxToDp(40),
                paddingBottom: pxToDp(20),
                paddingHorizontal: pxToDp(20),
                borderRadius: pxToDp(10),
                marginBottom: pxToDp(20),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: pxToDp(20),
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={styles.avatar}
                    source={{ uri: userList.toastInfo.upper_headimg }}
                  />
                  <View style={{ justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.nameText}>
                        {userList.toastInfo.upper_nick_name}
                      </Text>
                      <View
                        style={{
                          backgroundColor: "black",
                          paddingHorizontal: pxToDp(10),
                          borderRadius: pxToDp(10),
                        }}
                      >
                        {userList !== undefined && (
                          <Text
                            style={{ color: "white", fontSize: pxToDp(25) }}
                          >
                            {userList.toastInfo.role_name}
                          </Text>
                        )}
                      </View>
                    </View>
                    <Text style={styles.dateText}>
                      {userList.toastInfo.upper_user_id}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      console.log("hello");
                      copyToClipboard(userList.toastInfo.upper_wechat, 0);
                    }}
                  >
                    <Image
                      style={{
                        height: pxToDp(46) * 1.5,
                        width: pxToDp(52) * 1.5,
                        tintColor: "grey",
                      }}
                      source={require("../image/login2_img_wechat.png")}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      width: pxToDp(2.5),
                      height: pxToDp(50),
                      marginHorizontal: pxToDp(30),
                      marginVertical: pxToDp(7.5),
                      alignSelf: "stretch",
                      backgroundColor: "#E1E1E1",
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      copyToClipboard(userList.toastInfo.upper_mobile, 1);
                    }}
                  >
                    <Image
                      style={{
                        height: pxToDp(46) * 1.5,
                        width: pxToDp(52) * 1.5,
                        tintColor: "grey",
                      }}
                      source={require("../image/phone.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  alignSelf: "stretch",
                  height: pxToDp(2.5),
                  backgroundColor: "#E1E1E1",
                  marginTop: pxToDp(20),
                  marginBottom: pxToDp(20),
                }}
              />

              <Text
                style={{
                  color: "grey",
                  marginBottom: pxToDp(10),
                  fontSize: pxToDp(25),
                }}
              >
                {"注册:" + userList.toastInfo.register_time_show}
              </Text>
            </View>
          ) : (
            <Text
              style={{
                backgroundColor: "#f5f5f9",
                textAlign: "center",
                marginRight: pxToDp(30),
                fontSize: pxToDp(40),
                marginVertical: pxToDp(50),
                marginLeft: pxToDp(30),
              }}
            >
              暂无上级
            </Text>
          )}

          <TouchableOpacity
            onPress={() => {
              console.log(userList.userList.toastInfo);
              navigation.navigate("MyFriends", {
                friendsList: userList.userList,
              });
            }}
          >
            <View
              style={{
                alignSelf: "stretch",
                backgroundColor: "#f5f5f9",
                marginHorizontal: pxToDp(35),
                paddingTop: pxToDp(40),
                paddingBottom: pxToDp(20),
                paddingHorizontal: pxToDp(20),
                borderRadius: pxToDp(10),
                marginBottom: pxToDp(20),
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: pxToDp(275),
                  height: pxToDp(275),
                  borderWidth: pxToDp(20),
                  paddingVertical: pxToDp(20),
                  borderRadius: pxToDp(1000),
                  borderColor: "#D5AB3D",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={{ fontSize: pxToDp(32) }}>好友</Text>

                <Text style={{ fontSize: pxToDp(32) }}>
                  {userList.usertotal["0"] + "人"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={{
              marginTop: pxToDp(60),
              alignSelf: "stretch",
              //backgroundColor: "#f5f5f9",
              marginHorizontal: pxToDp(35),
              padding: pxToDp(30),
              borderRadius: pxToDp(10),
              marginBottom: pxToDp(20),
              alignItems: "center",
              backgroundColor: "#171d22",
            }}
          >
            <Text style={{ fontSize: pxToDp(30), color: "white" }}>
              {"我的微信号: " + userList.toastInfo.upper_wechat}
            </Text>
          </View>
        </React.Fragment>
      ) : (
        <LoadingActivity />
      )}
    </View>
  );
}
export default MyFriendsDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "stretch",
    paddingTop: pxToDp(20),
  },
  titleTxt: {
    marginLeft: pxToDp(30),
    fontSize: pxToDp(40),
    marginBottom: pxToDp(40),
  },
  avatar: {
    height: pxToDp(80),
    width: pxToDp(80),
    borderRadius: pxToDp(100),
    marginRight: pxToDp(20),
  },
  dateText: {
    fontSize: pxToDp(25),
    color: "grey",
  },
  idText: {
    color: "grey",
  },
  nameText: {
    width: pxToDp(175),

    marginRight: pxToDp(20),
    fontSize: pxToDp(28),
    fontWeight: "bold",
  },
});
