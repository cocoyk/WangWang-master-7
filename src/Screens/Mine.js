/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";

import pxToDp from "../util/util";

import ModalBox from "../components/modalBox.js";
import LinearGradient from "react-native-linear-gradient";

import {
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Toast from "react-native-simple-toast";
const Swiper = require("react-native-swiper");
import AsyncStorage from "@react-native-community/async-storage";
import request from "../util/Request.js";

function Mine({ navigation }) {
  const modalContent = [
    "订单审核期是指用户确认收货后的共15天，如果用户在这期间申请了售后退款，则审核暂时中止，直到售后结束。",
    "如果用户售后退款成功，订单就会审核失败，你无法得到佣金。",
    "如果用户申请售后被驳回，那么订单会在确认收货后15天审核成功。",
    "有时会展示审核剩余0天，则你的佣金可能会在第二天审核成功，请耐心等待。",
  ];

  const [pid, setPid] = useState("");
  const [role, setRole] = useState(1);
  const [wechatImg, setWechatImg] = useState("");
  const [nickname, setNickname] = useState("团长昵称");
  const [income_today, setIncome_today] = useState(0);
  const [income_this_month, setIncome_this_month] = useState(0);
  const [income_last_month, setIncome_last_month] = useState(0);
  const [income_left, setIncome_left] = useState(0);
  const [bannerTwo, setBannerTwo] = useState([]);
  const [productList, setProductList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal] = useState(false);
  const [modaltitle, setModaltitle] = useState("");
  const [details, setDetails] = useState({});

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token !== null) {
        AsyncStorage.getItem("nickname").then((val) => {
          setNickname(val);
        });
        getDetails();
      } else {
        navigation.navigate("Login");
      }
    });
  }, []);

  const getDetails = () => {
    AsyncStorage.getItem("token").then((value) => {
      const api = "user_info";
      const params = { token: value };
      request(
        api,
        params,
        function (res) {
          console.log(res.data.data.agentInfo);
          setDetails(res.data.data.agentInfo);
        },
        function (res) {
          navigation.navigate('Login')
        }
      );
    });
  };

  const getIncomeDetails = async () => {
    AsyncStorage.getItem("token").then((val) => {
      const api = "getIncomeDetails";
      const params = { token: val, total: 1 };
      console.log(val);
      request(api, params, function (res) {
        console.log(res.data.data);
        setIncome_last_month(
          res.data.data.incomedetailList.agent_amount_estimate_lastmonth
        );
        setIncome_this_month(
          res.data.data.incomedetailList.agent_amount_estimate_thismonth
        );
        setIncome_today(
          res.data.data.incomedetailList.agent_amount_total_estimate
        );
        setIncome_left(res.data.data.incomedetailList.agent_amount_total);
      });
    }),
      function (res) {
        navigation.navigate('Login')
      };
  };

  return (
    <View style={styles.container}>
      <ScrollView
        // style={{ marginBottom: pxToDp(120) }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            progressBackgroundColor="#fff"
            colors={["#ff0000", "#ff0000", "#4AC1A4"]}
            enabled={true}
            tintColor="#ff0000"
            title="正在刷新..."
            titleColor="#eaeaef"
          />
        }
      >
        <ModalBox
          visible={modal}
          modaltitle={modaltitle}
          modalContent={modalContent}
        />
        {/* <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#FFDBDB", "#FFF8DB"]}
            style={styles.topInfo}
          >
          </LinearGradient> */}
        <LinearGradient
          style={{ borderBottomLeftRadius: 10, paddingTop: pxToDp(20) }}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 0 }}
          colors={["#FD8B11", "#ff4d00"]}
        >
          <Text
            style={{
              marginLeft: pxToDp(20),
              color: "white",
              fontSize: pxToDp(30),
              marginTop: pxToDp(20),
              marginBottom: pxToDp(40),
            }}
          >
            我的
          </Text>
          <View style={styles.topInfo}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Personal", { details: details });
              }}
              style={styles.topuserInfo}
              activeOpacity={0.9}
            >
              <Image
                style={styles.wechatImg}
                source={
                  details.headimg
                    ? { uri: details.headimg }
                    : require("../image/common_icon_head.png")
                }
              />
              <View style={{ marginLeft: pxToDp(20) }}>
                <View style={{ flexDirection: "row", width: pxToDp(500) }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      maxWidth: pxToDp(340),
                      fontSize: pxToDp(32),
                      color: "#fff",
                    }}
                  >
                    {details.nick_name}
                  </Text>
                  <Image
                    style={{
                      width: pxToDp(156),
                      height: pxToDp(40),
                      marginLeft: pxToDp(20),
                    }}
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
                <Text
                  style={{
                    fontSize: pxToDp(24),
                    color: "white",
                    marginTop: pxToDp(2),
                  }}
                >
                  邀请码：{details.invite_code}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.upwalllet}>
              <TouchableOpacity activeOpacity={0.9} style={styles.leftIncome}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      color: "#ffedc4",
                      fontSize: pxToDp(28),
                      marginRight: pxToDp(25),
                    }}
                  >
                    可提现金额
                  </Text>
                  <Text
                    style={{
                      color: "#ffedc4",
                      fontWeight: "bold",
                      fontSize: pxToDp(35),
                    }}
                  >
                    {details.agent_amount_can_draw !== undefined
                      ? "￥" + details.agent_amount_can_draw.toFixed(2)
                      : "￥0.00"}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center" }}
                ></View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Toast.show("敬请期待", Toast.SHORT);
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.withdrawl}>提现</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.detailInfo}>
          <View style={styles.downwalllet}>
            <TouchableOpacity activeOpacity={0.9}>
              <View
                style={[
                  styles.downwalllet_child,
                  {
                    borderRightWidth: pxToDp(2),
                    borderRightColor: "#eaeaef",
                  },
                ]}
              >
                <Text style={styles.income_amount}>
                  {details.agent_amount_estimate_today !== undefined
                    ? "￥" + details.agent_amount_estimate_today.toFixed(2)
                    : "￥0.00"}
                </Text>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.income_title}>今日预估</Text>
                  <Image
                    style={styles.income_help}
                    source={require("../image/mine_icon_help.png")}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9}>
              <View
                style={[
                  styles.downwalllet_child,
                  {
                    borderRightWidth: pxToDp(2),
                    borderRightColor: "#eaeaef",
                  },
                ]}
              >
                <Text style={styles.income_amount}>
                  {details.agent_amount_estimate_thismonth !== undefined
                    ? "￥" + details.agent_amount_estimate_thismonth.toFixed(2)
                    : "￥0.00"}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.income_title}>本月预估</Text>
                  <Image
                    style={styles.income_help}
                    source={require("../image/mine_icon_help.png")}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9}>
              <View style={styles.downwalllet_child}>
                <Text style={styles.income_amount}>
                  {details.agent_amount_estimate_lastmonth !== undefined
                    ? "￥" + details.agent_amount_estimate_lastmonth.toFixed(2)
                    : "￥0.00"}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.income_title}>上月预估</Text>
                  <Image
                    style={styles.income_help}
                    source={require("../image/mine_icon_help.png")}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.operation}>
            <TouchableOpacity
              onPress={() => navigation.navigate("IncomeDetail")}
              activeOpacity={0.9}
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={styles.operationImg}
                source={require("../image/gain.png")}
              />
              <Text style={styles.operationTitle}>收益详情</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate("MyOrder");
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={styles.operationImg}
                source={require("../image/orders.png")}
              />
              <Text style={styles.operationTitle}>我的订单</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MyFriendsDetail");
              }}
              activeOpacity={0.9}
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={styles.operationImg}
                source={require("../image/team.png")}
              />
              <Text style={styles.operationTitle}>我的好友</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MyRights");
            }}
          >
            <View style={styles.bannerTwo}>
              <Image
                style={styles.thumbnailTwo}
                // source={{uri: item.banners_pic}}
                source={require("../image/mine_banner.jpeg")}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.tool}>
            <Text style={styles.mineTool}>我的工具</Text>
            <View style={styles.toolDetail}>
              {/* 收藏夹*/}
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.toolBox}
                onPress={() => {
                  navigation.navigate("CollectGoods");
                }}
              >
                <Image
                  style={styles.toolImg}
                  source={require("../image/favorite.png")}
                />
                <Text style={styles.toolTitle}>收藏夹</Text>
              </TouchableOpacity>

              {/* 专属客服 */}
              <TouchableOpacity
                onPress={() => {
                  Toast.show("敬请期待", Toast.SHORT);
                }}
                activeOpacity={0.9}
                style={styles.toolBox}
              >
                <Image
                  style={styles.toolImg}
                  source={require("../image/customer_service.png")}
                />
                <Text style={styles.toolTitle}>专属客服</Text>
              </TouchableOpacity>

              {/* 我的购买 */}
              <TouchableOpacity
                onPress={() => {
                  Toast.show("敬请期待", Toast.SHORT);
                }}
                activeOpacity={0.9}
                style={styles.toolBox}
              >
                <Image
                  style={styles.toolImg}
                  source={require("../image/cloudtool.png")}
                />
                <Text style={styles.toolTitle}>云工具</Text>
              </TouchableOpacity>

              {/* 商家合作 */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Collaboration");
                }}
                activeOpacity={0.9}
                style={styles.toolBox}
              >
                <Image
                  style={styles.toolImg}
                  source={require("../image/cooperation.png")}
                />
                <Text style={styles.toolTitle}>商务合作</Text>
              </TouchableOpacity>

              {/* 帮助与反馈 */}
              <TouchableOpacity
                onPress={() => {
                  Toast.show("敬请期待", Toast.SHORT);
                }}
                activeOpacity={0.9}
                style={styles.toolBox}
              >
                <Image
                  style={styles.toolImg}
                  source={require("../image/rules.png")}
                />
                <Text style={styles.toolTitle}>推广规范</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={this.toPublicAccounts}
                  style={styles.toolBox}
                >
                  <Image
                    style={styles.toolImg}
                    source={require("./image/mine_icon_vipcn.png")}
                  />
                  <Text style={styles.toolTitle}>公众号</Text>
                </TouchableOpacity> */}

              {/* 专属客服 */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Setting");
                }}
                activeOpacity={0.9}
                style={styles.toolBox}
              >
                <Image
                  style={styles.toolImg}
                  source={require("../image/settings.png")}
                />
                <Text style={styles.toolTitle}>设置</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* <BottomTab selected_index={4} /> */}
    </View>
  );
}
export default Mine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f9",
  },
  topInfo: {
    position: "relative",
    height: pxToDp(285),
    flexDirection: "row",
    // justifyContent: 'center',
    alignItems: "center",
    paddingLeft: pxToDp(30),
    paddingBottom: pxToDp(125),
  },
  topuserInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  wechatImg: {
    borderRadius: pxToDp(100),
    borderColor: "white",
    borderWidth: pxToDp(1),
    width: pxToDp(100),
    height: pxToDp(100),
  },
  upwalllet: {
    width: pxToDp(710),
    height: pxToDp(125),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: pxToDp(20),
    position: "absolute",
    backgroundColor: "#2a3d5c",
    bottom: 0,
    borderTopLeftRadius: pxToDp(20),
    borderTopRightRadius: pxToDp(20),
  },
  leftIncome: {
    marginRight: pxToDp(260),
  },
  withdrawl: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#624439",
    fontSize: pxToDp(26),
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
    paddingTop: pxToDp(5),
    paddingBottom: pxToDp(5),
    backgroundColor: "#ffedc4",
    borderBottomLeftRadius: pxToDp(12),
    borderBottomRightRadius: pxToDp(12),
    borderTopLeftRadius: pxToDp(12),
    borderTopRightRadius: pxToDp(12),
  },
  detailInfo: {
    alignItems: "center",
    flex: 1,
  },
  downwalllet: {
    width: pxToDp(710),
    height: pxToDp(125),
    marginLeft: pxToDp(20),
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "#fff",
    top: 0,
    borderBottomLeftRadius: pxToDp(20),
    borderBottomRightRadius: pxToDp(20),
    shadowColor: "#000000",
    shadowOffset: {
      width: pxToDp(10),
      height: pxToDp(20),
    },
  },
  downwalllet_child: {
    width: pxToDp(236.6),
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: pxToDp(5),
    paddingTop: pxToDp(5),
  },
  income_amount: {
    color: "#4b4f59",
    fontSize: pxToDp(36),
    fontWeight: "bold",
  },
  income_title: {
    color: "#848a99",
    fontSize: pxToDp(22),
  },
  income_help: {
    height: pxToDp(24),
    width: pxToDp(24),
    marginLeft: pxToDp(10),
    paddingBottom: pxToDp(10),
    paddingLeft: pxToDp(10),
    paddingTop: pxToDp(10),
    paddingRight: pxToDp(10),
  },
  operation: {
    paddingVertical: pxToDp(20),
    width: pxToDp(710),
    alignItems: "center",
    marginTop: pxToDp(145),
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderBottomLeftRadius: pxToDp(20),
    borderBottomRightRadius: pxToDp(20),
    borderTopLeftRadius: pxToDp(20),
    borderTopRightRadius: pxToDp(20),
  },
  operationImg: {
    width: pxToDp(70),
    height: pxToDp(70),
  },
  operationTitle: {
    fontSize: pxToDp(22),
    color: "#575e6d",
    marginTop: pxToDp(20),
  },
  tool: {
    width: pxToDp(710),
    height: pxToDp(410),
    marginTop: pxToDp(20),
    backgroundColor: "#fff",
    borderBottomLeftRadius: pxToDp(20),
    borderBottomRightRadius: pxToDp(20),
    borderTopLeftRadius: pxToDp(20),
    borderTopRightRadius: pxToDp(20),
  },
  mineTool: {
    paddingLeft: pxToDp(40),
    paddingBottom: pxToDp(20),
    paddingTop: pxToDp(20),
    fontSize: pxToDp(26),
    color: "black",
    fontWeight: "bold",
    borderBottomColor: "#eaeaef",
    borderBottomWidth: pxToDp(2),
  },
  toolDetail: {
    width: pxToDp(710),
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(20),
    // alignItems:'center',
    justifyContent: "flex-start",
  },
  toolBox: {
    marginLeft: pxToDp(13),
    marginRight: pxToDp(13),
    alignItems: "center",
    width: pxToDp(150),
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(20),
  },
  toolImg: {
    width: pxToDp(60),
    height: pxToDp(60),
  },
  toolTitle: {
    fontSize: pxToDp(24),
    color: "#575e6d",
    marginTop: pxToDp(6),
  },

  bannerTwo: {
    width: pxToDp(710),
    height: pxToDp(150) * 1.5,
    marginTop: pxToDp(20),
    marginBottom: pxToDp(20),

    borderRadius: pxToDp(20),
  },
  dot: {
    width: pxToDp(16),
    height: pxToDp(16),
    backgroundColor: "#fff",
  },
  activedot: {
    width: pxToDp(16),
    height: pxToDp(16),
    backgroundColor: "#ff5186",
  },
  thumbnailTwo: {
    width: pxToDp(710),
    height: pxToDp(260),
    borderBottomLeftRadius: pxToDp(20),
    borderBottomRightRadius: pxToDp(20),
    borderTopLeftRadius: pxToDp(20),
    borderTopRightRadius: pxToDp(20),
  },
});
