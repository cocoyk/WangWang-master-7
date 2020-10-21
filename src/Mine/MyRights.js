/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ViewBase,
  TextInput,
} from "react-native";
import pxToDp from "../util/util";
import AsyncStorage from "@react-native-community/async-storage";
import request from "../util/Request";
import Toast from "react-native-simple-toast";
import { sub } from "react-native-reanimated";
import Clipboard from "@react-native-community/clipboard";
import LinearGradient from "react-native-linear-gradient";
import * as Progress from "react-native-progress";
import LoadingActivity from "../components/loadingActivity";
import { ScrollView } from "react-native-gesture-handler";

function MyRights({ navigation }) {
  const [details, setDetails] = useState(undefined);
  const [condition, setCondition] = useState({});
  const [condition2, setCondition2] = useState({});
  useEffect(() => {
    getMyRights();
  }, []);

  const getMyRights = () => {
    AsyncStorage.getItem("token").then((val) => {
      if (val !== null) {
        const api = "myrights";
        const params = { token: val };
        request(api, params, function (res) {
          console.log(res.data.data);
          setCondition(res.data.data.condition);
          setCondition2(res.data.data.condition2);
          setDetails(res.data.data.agentInfo);
        });
      } else {
        navigation.navigate("Login");
      }
    });
  };
  return (
    <View style={styles.container}>
      {details !== undefined ? (
        <React.Fragment>
          <ScrollView>
            <LinearGradient
              style={styles.topInfo}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 0.8, y: 0 }}
              colors={["#FD8B11", "#ff4d00"]}
            >
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={styles.avatar}
                    source={
                      details
                        ? { uri: details.headimg }
                        : require("../image/common_icon_head.png")
                    }
                  />
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.nick_name}>{details.nick_name}</Text>
                      <Image
                        style={styles.badge}
                        source={
                          details.role_id === "1"
                            ? require("../image/captain_badge.png")
                            : details.role_id === "7"
                            ? require("../image/company_badge.png")
                            : require("../image/vip_badge.png")
                          // : require('../image/tuanzhang_badge.png')
                        }
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: pxToDp(10),
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "white", fontSize: pxToDp(25) }}>
                        邀请码: {details.invite_code}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          Clipboard.setString(details.invite_code);
                          Toast.show("已复制订单号到粘贴板", Toast.SHORT);
                        }}
                      >
                        <View
                          style={{
                            marginTop: pxToDp(2),
                            marginLeft: pxToDp(25),
                            borderWidth: pxToDp(2),
                            borderColor: "white",
                            paddingHorizontal: pxToDp(10),
                            borderRadius: pxToDp(100),
                          }}
                        >
                          <Text
                            style={{ color: "white", fontSize: pxToDp(20) }}
                          >
                            复制
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        marginTop: pxToDp(70),
                        color: "white",
                        fontSize: pxToDp(25),
                      }}
                    >
                      加入旺旺，累计卖货{details.pay_counts_total}件，已赚
                      {details.agent_amount_total_estimate}元
                    </Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
            <View style={styles.mainContent}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch",
                  justifyContent: "space-between",
                  marginBottom: pxToDp(40),
                }}
              >
                <LinearGradient
                  style={styles.box}
                  start={{ x: 0.2, y: 0 }}
                  end={{ x: 0.8, y: 0 }}
                  colors={["#FD8B11", "#ff4d00"]}
                >
                  <View style={{ alignItems: "center" }}>
                    <Image
                      style={{
                        tintColor: "white",
                        width: pxToDp(50),
                        height: pxToDp(50),
                        marginBottom: pxToDp(20),
                      }}
                      source={require("../image/yuan.png")}
                    />
                    <Text style={{ color: "white" }}>拼多多收入</Text>
                    <Text style={{ color: "white" }}>提高90%</Text>
                  </View>
                </LinearGradient>

                <LinearGradient
                  style={styles.box}
                  start={{ x: 0.2, y: 0 }}
                  end={{ x: 0.8, y: 0 }}
                  colors={["#FD8B11", "#ff4d00"]}
                >
                  <View style={{ alignItems: "center" }}>
                    <Image
                      style={{
                        tintColor: "white",
                        width: pxToDp(50),
                        height: pxToDp(50),
                        marginBottom: pxToDp(20),
                      }}
                      source={require("../image/share.png")}
                    />
                    {details.role_id === 1 || details.role_id === 7 ? (
                      <React.Fragment>
                        <Text style={{ color: "white" }}>享受额外</Text>
                        <Text style={{ color: "white" }}>平台分成</Text>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Text style={{ color: "white" }}>素材云工具</Text>
                        <Text style={{ color: "white" }}>免费使用</Text>
                      </React.Fragment>
                    )}
                  </View>
                </LinearGradient>
                <LinearGradient
                  style={styles.box}
                  start={{ x: 0.2, y: 0 }}
                  end={{ x: 0.8, y: 0 }}
                  colors={["#FD8B11", "#ff4d00"]}
                >
                  <View style={{ alignItems: "center" }}>
                    <Image
                      style={{
                        tintColor: "white",
                        width: pxToDp(50),
                        height: pxToDp(50),
                        marginBottom: pxToDp(20),
                      }}
                      source={require("../image/crown.png")}
                    />

                    {details.role_id === 1 || details.role_id === 7 ? (
                      <React.Fragment>
                        <Text style={{ color: "white" }}>明星团队</Text>
                        <Text style={{ color: "white" }}>倾力打造</Text>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Text style={{ color: "white" }}>老师培训运营</Text>
                        <Text style={{ color: "white" }}>解决收入瓶颈</Text>
                      </React.Fragment>
                    )}
                  </View>
                </LinearGradient>
              </View>
              {details.role_id === 1 || details.role_id === 7 ? (
                <View
                  style={{
                    backgroundColor: "white",
                    padding: pxToDp(30),
                    borderRadius: pxToDp(10),
                  }}
                >
                  <Text style={{ marginBottom: pxToDp(20) }}>分公司权益</Text>
                  <Progress.Bar
                    color="#FD8B11"
                    borderWidth={0}
                    width={pxToDp(650)}
                    unfilledColor="#f5f5f9"
                    progress={
                      details.draw_amount / condition2.draw_amount_total
                    }
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      width: pxToDp(650),
                      justifyContent: "space-between",
                      marginBottom: pxToDp(30),
                    }}
                  >
                    <Text>提现收入{details.draw_amount}</Text>
                    <Text>
                      {details.draw_amount}/{condition2.draw_amount_total}
                    </Text>
                  </View>
                  <Progress.Bar
                    borderWidth={0}
                    color="#FD8B11"
                    width={pxToDp(650)}
                    unfilledColor="#f5f5f9"
                    progress={
                      details.invite_agent1_num / condition2.invite_agent1_num
                    }
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      width: pxToDp(650),
                      justifyContent: "space-between",
                      marginBottom: pxToDp(30),
                    }}
                  >
                    <Text>我的直属团长{details.invite_agent1_num}</Text>
                    <Text>
                      {details.invite_agent1_num}/{condition2.invite_agent1_num}
                    </Text>
                  </View>

                  <Progress.Bar
                    borderWidth={0}
                    color="#FD8B11"
                    width={pxToDp(650)}
                    unfilledColor="#f5f5f9"
                    progress={
                      details.invite_agent1_num_2 /
                      condition2.invite_agent1_num_2
                    }
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      width: pxToDp(650),
                      justifyContent: "space-between",
                      marginBottom: pxToDp(30),
                    }}
                  >
                    <Text>我的间接团长{details.invite_agent1_num_2}</Text>
                    <Text>
                      {details.invite_agent1_num_2}/
                      {condition2.invite_agent1_num_2}
                    </Text>
                  </View>

                  {details.draw_amount / condition2.draw_amount_total < 1 &&
                    details.invite_agent1_num / condition2.invite_agent1_num <
                      1 &&
                    details.invite_agent1_num_2 /
                      condition2.invite_agent1_num_2 &&
                    details && (
                      <TouchableOpacity>
                        <View
                          style={{
                            marginTop: pxToDp(40),
                            alignSelf: "center",
                            paddingHorizontal: pxToDp(100),
                            paddingVertical: pxToDp(10),
                            borderRadius: pxToDp(10),
                            backgroundColor: "grey",
                            marginBottom: pxToDp(50),
                          }}
                        >
                          <Text style={{ color: "white" }}>尚未达成</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: "white",
                    padding: pxToDp(30),
                    borderRadius: pxToDp(10),
                  }}
                >
                  <Text style={{ marginBottom: pxToDp(20) }}>团长权限门槛</Text>
                  <Progress.Bar
                    color="#FD8B11"
                    borderWidth={0}
                    width={pxToDp(650)}
                    unfilledColor="#f5f5f9"
                    progress={details.draw_amount / condition.draw_amount_total}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      width: pxToDp(650),
                      justifyContent: "space-between",
                      marginBottom: pxToDp(30),
                    }}
                  >
                    <Text>提现收入{details.draw_amount}</Text>
                    <Text>
                      {details.draw_amount}/{condition.draw_amount_total}
                    </Text>
                  </View>
                  <Progress.Bar
                    borderWidth={0}
                    color="#FD8B11"
                    width={pxToDp(650)}
                    unfilledColor="#f5f5f9"
                    progress={details.active_score / condition.active_score}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      width: pxToDp(650),
                      justifyContent: "space-between",
                      marginBottom: pxToDp(30),
                    }}
                  >
                    <Text>活跃值{details.active_score}</Text>
                    <Text>
                      {details.active_score}/{condition.active_score}
                    </Text>
                  </View>

                  {details.active_score / condition.active_score < 1 &&
                    details.draw_amount / condition.draw_amount_total < 1 && (
                      <TouchableOpacity>
                        <View
                          style={{
                            marginTop: pxToDp(40),
                            alignSelf: "center",
                            paddingHorizontal: pxToDp(100),
                            paddingVertical: pxToDp(10),
                            borderRadius: pxToDp(10),
                            backgroundColor: "grey",
                            marginBottom: pxToDp(50),
                          }}
                        >
                          <Text style={{ color: "white" }}>尚未达成</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                </View>
              )}
              {details.role_id === 1 || details.role_id === 7 ? (
                <View
                  style={{
                    marginTop: pxToDp(30),
                    backgroundColor: "white",
                    padding: pxToDp(30),
                    borderRadius: pxToDp(10),
                  }}
                >
                  <Text style={{ color: "grey" }}>
                    成为平台的分公司，除了享受额外的收益补贴
                    （预计在原基础提高70%以上带货收入），平台还将为大家打造明星团队、个人IP、线上团聚、流量扶持。更多惊喜-赶紧冲刺！
                  </Text>
                  <Text style={{ color: "grey" }}>
                    {" "}
                    （如有疑问，请联系客户）
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    marginTop: pxToDp(30),
                    backgroundColor: "white",
                    padding: pxToDp(30),
                    borderRadius: pxToDp(10),
                  }}
                >
                  <Text style={{ color: "grey" }}>1.每日首次登录活跃度+5</Text>
                  <Text style={{ color: "grey" }}>2.有效会员下单活跃度+15</Text>
                  <Text style={{ color: "grey" }}>
                    3.每月活跃度和收入可以累计，不会清零。
                  </Text>
                  <Text style={{ color: "grey" }}>
                    4.完成考核目标，永不降级
                  </Text>
                  <Text style={{ color: "grey" }}>
                    {" "}
                    （如有疑问，请联系客户）
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </React.Fragment>
      ) : (
        <LoadingActivity />
      )}
    </View>
  );
}
export default MyRights;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },

  topInfo: {
    flex: 1,

    padding: pxToDp(40),
  },
  mainContent: {
    backgroundColor: "#f5f5f9",
    flex: 5,
    paddingHorizontal: pxToDp(25),
    paddingTop: pxToDp(40),
  },

  avatar: {
    height: pxToDp(110),
    width: pxToDp(110),
    borderRadius: pxToDp(100),

    marginRight: pxToDp(20),
  },

  badge: {
    width: pxToDp(156),
    height: pxToDp(40),
    marginLeft: pxToDp(50),
    marginTop: pxToDp(15),
  },
  nick_name: {
    fontSize: pxToDp(33),
    color: "white",
    marginTop: pxToDp(10),
  },

  box: {
    width: pxToDp(210),
    height: pxToDp(210),
    backgroundColor: "orange",
    borderRadius: pxToDp(20),
    alignItems: "center",
    justifyContent: "center",
  },
});
