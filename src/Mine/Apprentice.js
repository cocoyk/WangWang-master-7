import React, { Component } from "react";
import request from "../../util/Request";
import pxToDp from "../../util/util";
import Navigation from "../component/navigation";
import LinearGradient from "react-native-linear-gradient";
import NavigationService from "../../util/NavigationService.js";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-simple-toast";
import WechatModule from "../../util/WechatSdk";
import {
  View,
  Image,
  Text,
  ScrollView,
  Platform,
  Clipboard,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import {
  APP_BASE_URL
} from "../../AppConfig"

class Apprentice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: "*月**日",
      end_date: "*月**日",
      total_num: 0,
      valid_num: 0,
      get_money: 0,
      my_rank: "",
      on_passage_money: 0,
      top_ten: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      top_three: [],
      award_list: []
    };
    this.pid;
    this.navigationEvent;
    this.datainit();
  }

  datainit = async () => {
    this.pid = global.pid;
  };

  componentDidMount = async () => {
    const self = this;
    self.navigationEvent = self.props.navigation.addListener(
      "didFocus",
      self.refreshData
    );
  };

  componentWillUnmount() {
    if (this.navigationEvent) {
      this.navigationEvent.remove();
    }
  }

  refreshData = () => {
    console.log("Apprentice Focus");
    this.getApprenticeInfo();
    this.getAwardList();
    this.getMineAward();
  };

  getApprenticeInfo = () => {
    const self = this;
    const api = "share_recruit";
    const params = {};
    request(api, params, function(res) {
      let result = res.data;
      self.setState({
        start_date: self.getMonthDay(result.start_time),
        end_date: self.getMonthDay(result.end_time),
        valid_num: result.my_valid_num,
        my_rank: result.my_rankings,
        top_three: result.top_three
      });
    });
  };

  getMineAward = () => {
    const self = this;
    const api = "share_activity_user_data";
    const params = {};
    request(api, params, function(res) {
      let result = res.data;
      self.setState({
        total_num: result.invite_count,
        get_money: result.total_get_award,
        on_passage_money: result.on_passage_money
      });
    });
  };

  getAwardList = () => {
    const self = this;
    const api = "share_recruit_award_list";
    const params = {};
    request(api, params, function(res) {
      let result = res.data;
      console.log(
        "奖励",
        result.data[0],
        Object.values(result.data[0]).toString()
      );
      self.setState({
        award_list: result.data
      });
    });
  };

  toApprenticeList = () => {
    NavigationService.push("ApprenticeList");
  };

  shareUrlToWechat = id => {
    const self = this;
    if (id == 0) {
      const phone_type = Platform.OS === "android" ? 1 : 2;
      console.log(
        APP_BASE_URL + "/api/app_luodiye/" + self.pid + "/" + phone_type + "/"
      );
      const share_title =
        "推荐大家下载这个APP，购物不仅能省钱，还有佣金拿💰，除此之外还有APP任务可以接，几分钟就能做完任务，有奖励，可以提现，在家就能赚零花😘";
      Clipboard.setString(share_title);
      Toast.showWithGravity("文案复制成功", Toast.SHORT, Toast.CENTER);
      WechatModule.shareWebToWx(
        id,
        "http://alicliimg.clewm.net/817/944/1944817/155842976171952fc2dea1a2cbbc56b036c298ef4ee1d1558429755.jpg",
        APP_BASE_URL + "/api/app_luodiye/" + self.pid + "/" + phone_type + "/",
        "速来领取你的任务！",
        "这个APP购物能省钱，还能接任务赚零花，可提现，推荐给你"
      ).then(data => {
        console.log("data", data);
      });
    } else {
      WechatModule.shareBmpToWx(1, self.props.shareQrcodeImage);
    }
  };

  getMonthDay = time => {
    if (time) {
      var array = time.split(" ");
      var temp = array[0].split("-");
      var month = temp[1];
      var day = temp[2];
      if (month.substr(0, 1) == 0) {
        month = month.substr(1, 1);
      }
      if (day.substr(0, 1) == 0) {
        day = day.substr(1, 1);
      }
      return month + "月" + day + "日";
      // console.log(new Date(), new Date(time));
      // var month = new Date().getMonth();
      // return month;
    } else {
      return "*月**日";
    }
  };

  render() {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={["#FE3B3B", "#FEBF6E"]}
        style={styles.container}
      >
        <Navigation title="邀请好友" />
        <ScrollView style={styles.scrollarea}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.activitytime}>
              活动时间:{this.state.start_date}—{this.state.end_date}
            </Text>
            <Image
              style={{ width: pxToDp(750), height: pxToDp(357) }}
              source={require("../image/invite_img_title_old.png")}
            />
            <View style={styles.incomearea}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#FFFFFF", "#FA711D"]}
                  style={{
                    width: pxToDp(53),
                    height: pxToDp(2),
                    margin: pxToDp(4)
                  }}
                />
                <Text
                  style={{
                    fontSize: pxToDp(40),
                    fontWeight: "bold",
                    marginLeft: pxToDp(10),
                    marginRight: pxToDp(10),
                    color: "#1D1D1F",
                    lineHeight: pxToDp(70)
                  }}
                >
                  我的收益
                </Text>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#FA711D", "#FFFFFF"]}
                  style={{
                    width: pxToDp(53),
                    height: pxToDp(2),
                    margin: pxToDp(4)
                  }}
                />
              </View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={this.toApprenticeList}
                style={styles.friendareaback}
              >
                <Text style={styles.friendarea}>好友列表</Text>
              </TouchableOpacity>
              <View style={styles.incomedetail}>
                <View style={styles.incomechild}>
                  <Text style={styles.childtitle}>已邀请好友</Text>
                  <Text style={styles.childnum}>{this.state.total_num}个</Text>
                </View>
                <View style={styles.incomechild}>
                  <Text style={styles.childtitle}>已到账赏金</Text>
                  <Text style={styles.childnum}>{this.state.get_money}元</Text>
                </View>
                <View style={styles.incomechild}>
                  <Text style={styles.childtitle}>在途赏金</Text>
                  <Text style={styles.childnum}>
                    {this.state.on_passage_money}元
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.describearea}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#FFFFFF", "#FA711D"]}
                  style={{
                    width: pxToDp(53),
                    height: pxToDp(2),
                    margin: pxToDp(4)
                  }}
                />
                <Text
                  style={{
                    fontSize: pxToDp(40),
                    fontWeight: "bold",
                    marginLeft: pxToDp(10),
                    marginRight: pxToDp(10),
                    color: "#1D1D1F",
                    lineHeight: pxToDp(70)
                  }}
                >
                  邀请榜单
                </Text>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#FA711D", "#FFFFFF"]}
                  style={{
                    width: pxToDp(53),
                    height: pxToDp(2),
                    margin: pxToDp(4)
                  }}
                />
              </View>
              <View style={styles.ranklist}>
                <View style={[styles.rankchild, { marginTop: pxToDp(60) }]}>
                  <Image
                    style={styles.imgback}
                    source={require("../image/invite_img_rahmen.png")}
                  />
                  <Image
                    style={styles.redpacket}
                    source={require("../image/invite_img_rb.png")}
                  />
                  <Image
                    style={styles.chatimg}
                    source={
                      this.state.top_three[1]
                        ? { uri: this.state.top_three[1].avatar_url }
                        : require("../image/defalut_people.png")
                    }
                  />
                  <Text style={styles.toprank}>第二名</Text>
                  <Text style={styles.topname}>
                    {this.state.top_three[1]
                      ? Array.from(this.state.top_three[1].nickname)[0] + "****"
                      : "暂无"}
                  </Text>
                  <Text style={styles.topinvite}>
                    邀请
                    {this.state.top_three[1]
                      ? this.state.top_three[1].top_user_valid_num
                      : 0}
                    人
                  </Text>
                </View>
                <View style={styles.rankchild}>
                  <Image
                    style={styles.imgback}
                    source={require("../image/invite_img_rahmen.png")}
                  />
                  <Image
                    style={styles.redpacket}
                    source={require("../image/invite_img_rb.png")}
                  />
                  <Image
                    style={styles.chatimg}
                    source={
                      this.state.top_three[0]
                        ? { uri: this.state.top_three[0].avatar_url }
                        : require("../image/defalut_people.png")
                    }
                  />
                  <Text style={styles.toprank}>第一名</Text>
                  <Text style={styles.topname}>
                    {this.state.top_three[0]
                      ? Array.from(this.state.top_three[0].nickname)[0] + "****"
                      : "暂无"}
                  </Text>
                  <Text style={styles.topinvite}>
                    邀请
                    {this.state.top_three[0]
                      ? this.state.top_three[0].top_user_valid_num
                      : 0}
                    人
                  </Text>
                </View>
                <View style={[styles.rankchild, { marginTop: pxToDp(60) }]}>
                  <Image
                    style={styles.imgback}
                    source={require("../image/invite_img_rahmen.png")}
                  />
                  <Image
                    style={styles.redpacket}
                    source={require("../image/invite_img_rb.png")}
                  />
                  <Image
                    style={styles.chatimg}
                    source={
                      this.state.top_three[2]
                        ? { uri: this.state.top_three[2].avatar_url }
                        : require("../image/defalut_people.png")
                    }
                  />
                  <Text style={styles.toprank}>第三名</Text>
                  <Text style={styles.topname}>
                    {this.state.top_three[2]
                      ? Array.from(this.state.top_three[2].nickname)[0] + "****"
                      : "暂无"}
                  </Text>
                  <Text style={styles.topinvite}>
                    邀请
                    {this.state.top_three[2]
                      ? this.state.top_three[2].top_user_valid_num
                      : 0}
                    人
                  </Text>
                </View>
              </View>

              {this.state.top_ten.map((item, index) => {
                //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
                return (
                  <View key={index} style={styles.awardtitle}>
                    <Text
                      style={[
                        styles.childrank,
                        {
                          borderTopLeftRadius: index == 0 ? pxToDp(10) : 0,
                          borderBottomLeftRadius: index == 9 ? pxToDp(10) : 0
                        }
                      ]}
                    >
                      第{index + 1}名
                    </Text>
                    <Text
                      style={[
                        styles.childname,
                        { marginLeft: pxToDp(2), marginRight: pxToDp(2) }
                      ]}
                    >
                      {this.state.top_three[index]
                        ? Array.from(this.state.top_three[index].nickname)[0] +
                          "****"
                        : "暂无"}
                    </Text>
                    <Text
                      style={[
                        styles.childinvitenum,
                        { marginRight: pxToDp(2) }
                      ]}
                    >
                      邀请
                      {this.state.top_three[index]
                        ? this.state.top_three[index].top_user_valid_num
                        : 0}
                      人
                    </Text>
                    <View
                      style={[
                        styles.childaward,
                        {
                          borderTopRightRadius: index == 0 ? pxToDp(10) : 0,
                          borderBottomRightRadius: index == 9 ? pxToDp(10) : 0
                        }
                      ]}
                    >
                      <Image
                        style={{ width: pxToDp(31), height: pxToDp(36) }}
                        source={require("../image/invite_img_rb.png")}
                      />
                      <Text style={{ marginLeft: pxToDp(10) }}>
                        {this.state.award_list[index]
                          ? Object.values(
                              this.state.award_list[index]
                            ).toString()
                          : 0}
                        元红包
                      </Text>
                    </View>
                  </View>
                );
              })}

              <Text style={styles.inviteamount}>
                我的邀请人数为{" "}
                <Text style={styles.invitenum}>{this.state.valid_num}</Text>{" "}
                人，当前排名：{this.state.my_rank}
              </Text>
              <Text
                style={{
                  fontSize: pxToDp(24),
                  color: "#9A9A9A"
                }}
              >
                红包在活动结束后发放
              </Text>
            </View>
            <View style={[styles.describearea, { height: pxToDp(860) }]}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#FFFFFF", "#FA711D"]}
                  style={{
                    width: pxToDp(53),
                    height: pxToDp(2),
                    margin: pxToDp(4)
                  }}
                />
                <Text
                  style={{
                    fontSize: pxToDp(40),
                    fontWeight: "bold",
                    marginLeft: pxToDp(10),
                    marginRight: pxToDp(10),
                    color: "#1D1D1F",
                    lineHeight: pxToDp(70)
                  }}
                >
                  怎么邀请好友
                </Text>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#FA711D", "#FFFFFF"]}
                  style={{
                    width: pxToDp(53),
                    height: pxToDp(2),
                    margin: pxToDp(4)
                  }}
                />
              </View>
              <Text style={styles.describetitle}>看下面流程，非常简单</Text>
              <View style={{ width: pxToDp(600), alignItems: "center" }}>
                <Image
                  style={styles.describeimg}
                  resizeMode="contain"
                  source={require("../image/invite_img_phone.png")}
                />
              </View>
              <View style={styles.describeinfo}>
                <Text style={styles.infochild}>点击按钮{"\n"}分享给好友</Text>
                <Text style={styles.infochild}>好友打开链接{"\n"}下载安装</Text>
                <Text style={styles.infochild}>
                  好友赚3W金币{"\n"}您获得赏金
                </Text>
              </View>
              <Text style={styles.specialdesc}>
                特别说明：好友需为逍遥团长新用户，之前未登录过逍遥团长小程序和APP，并在活动期间内累计获得3W金币，方可获得奖励
              </Text>
              <Text
                style={{
                  width: pxToDp(710),
                  height: pxToDp(1),
                  backgroundColor: "#F0F0F0"
                }}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#FFFFFF", "#FA711D"]}
                  style={{
                    width: pxToDp(53),
                    height: pxToDp(2),
                    margin: pxToDp(4)
                  }}
                />
                <Text
                  style={{
                    fontSize: pxToDp(40),
                    fontWeight: "bold",
                    marginLeft: pxToDp(10),
                    marginRight: pxToDp(10),
                    color: "#1D1D1F",
                    lineHeight: pxToDp(70)
                  }}
                >
                  邀请小技巧
                </Text>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#FA711D", "#FFFFFF"]}
                  style={{
                    width: pxToDp(53),
                    height: pxToDp(2),
                    margin: pxToDp(4)
                  }}
                />
              </View>
              <Text
                style={[styles.describetitle, { marginBottom: pxToDp(40) }]}
              >
                成功率提升200%
              </Text>
              <View style={styles.skill}>
                <Text style={styles.skillindex}>1</Text>
                <Text style={styles.skilltext}>
                  邀请您的家人、朋友、同学、同事成功率高
                </Text>
              </View>
              <View style={styles.skill}>
                <Text style={styles.skillindex}>2</Text>
                <Text style={styles.skilltext}>
                  分享到3个以上微信群，成功邀请的几率提升200%
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.sharecontent}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.shareUrlToWechat(0)}
            style={styles.sharechild}
          >
            <Image
              style={styles.shareimg}
              source={require("../image/invite_icon_wechat.png")}
            />
            <Text style={styles.sharetitle}>微信邀请</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.shareUrlToWechat(1)}
            style={styles.sharechild}
          >
            <Image
              style={styles.shareimg}
              source={require("../image/invite_icon_wechatmoments.png")}
            />
            <Text style={styles.sharetitle}>朋友圈邀请</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: pxToDp(750),
    alignItems: "center"
  },
  activitytime: {
    position: "absolute",
    width: pxToDp(500),
    height: pxToDp(66),
    top: pxToDp(20),
    borderRadius: pxToDp(33),
    fontSize: pxToDp(32),
    color: "#FFF",
    lineHeight: pxToDp(66),
    textAlign: "center",
    fontWeight: "bold",
    borderColor: "#FF806D",
    borderWidth: pxToDp(2),
    zIndex: 5
  },
  scrollarea: {
    flex: 1,
    width: pxToDp(750)
  },
  incomearea: {
    width: pxToDp(710),
    padding: pxToDp(20),
    marginTop: pxToDp(8),
    backgroundColor: "#FFF",
    alignItems: "center",
    borderRadius: pxToDp(20)
  },
  friendareaback: {
    position: "absolute",
    top: pxToDp(20),
    right: pxToDp(13),
    width: pxToDp(150),
    height: pxToDp(75),
    alignItems: "center",
    justifyContent: "center"
  },
  friendarea: {
    width: pxToDp(144),
    height: pxToDp(55),
    backgroundColor: "#FF4E4E",
    borderRadius: pxToDp(27),
    textAlign: "center",
    lineHeight: pxToDp(55),
    color: "#fff",
    fontWeight: "bold",
    fontSize: pxToDp(26)
  },
  incomedetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: pxToDp(670),
    marginTop: pxToDp(20)
  },
  incomechild: {
    width: pxToDp(210),
    height: pxToDp(180),
    alignItems: "center",
    paddingTop: pxToDp(10),
    borderRadius: pxToDp(12),
    backgroundColor: "#FFF",
    elevation: 3
  },
  childtitle: {
    width: pxToDp(170),
    textAlign: "center",
    lineHeight: pxToDp(60),
    color: "#656565",
    fontSize: pxToDp(28),
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: pxToDp(1)
  },
  childnum: {
    fontSize: pxToDp(44),
    fontWeight: "bold",
    color: "#656565",
    lineHeight: pxToDp(100)
  },
  describearea: {
    width: pxToDp(710),
    margin: pxToDp(20),
    padding: pxToDp(20),
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: pxToDp(20)
  },
  ranklist: {
    width: pxToDp(670),
    flexDirection: "row",
    marginTop: pxToDp(20),
    marginBottom: pxToDp(40),
    justifyContent: "space-around"
  },
  rankchild: {
    width: pxToDp(200),
    alignItems: "center"
  },
  chatimg: {
    position: "absolute",
    width: pxToDp(121),
    height: pxToDp(121),
    top: pxToDp(26),
    borderRadius: pxToDp(60),
    right: pxToDp(40),
    zIndex: 6
  },
  imgback: {
    width: pxToDp(152),
    height: pxToDp(175),
    position: "absolute",
    top: pxToDp(0),
    right: pxToDp(24),
    zIndex: 12
  },
  redpacket: {
    position: "absolute",
    width: pxToDp(31),
    height: pxToDp(36),
    top: pxToDp(25),
    right: pxToDp(40),
    zIndex: 15
  },
  toprank: {
    position: "absolute",
    top: pxToDp(132),
    fontSize: pxToDp(26),
    textAlign: "center",
    lineHeight: pxToDp(45),
    color: "#FF903E",
    fontWeight: "bold",
    right: pxToDp(60),
    zIndex: 15
  },
  topname: {
    color: "#656565",
    marginTop: pxToDp(180),
    fontSize: pxToDp(28),
    lineHeight: pxToDp(45),
    fontWeight: "bold"
  },
  topinvite: {
    color: "#9A9A9A",
    fontSize: pxToDp(26)
  },
  awardtitle: {
    width: pxToDp(650),
    flexDirection: "row",
    marginBottom: pxToDp(2)
  },
  childrank: {
    width: pxToDp(120),
    height: pxToDp(90),
    fontSize: pxToDp(28),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#656565",
    backgroundColor: "#F9EFE8",
    textAlign: "center",
    lineHeight: pxToDp(90)
  },
  childname: {
    width: pxToDp(120),
    height: pxToDp(90),
    fontSize: pxToDp(28),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#656565",
    backgroundColor: "#F9EFE8",
    textAlign: "center",
    lineHeight: pxToDp(90)
  },
  childinvitenum: {
    width: pxToDp(180),
    height: pxToDp(90),
    fontSize: pxToDp(28),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#656565",
    backgroundColor: "#F9EFE8",
    textAlign: "center",
    lineHeight: pxToDp(90)
  },
  childaward: {
    width: pxToDp(224),
    height: pxToDp(90),
    fontSize: pxToDp(28),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#656565",
    backgroundColor: "#F9EFE8"
  },
  inviteamount: {
    fontSize: pxToDp(28),
    color: "#656565",
    lineHeight: pxToDp(80)
  },
  invitenum: {
    fontSize: pxToDp(28),
    color: "#FF2A2A",
    fontWeight: "bold"
  },
  describetitle: {
    fontSize: pxToDp(28),
    lineHeight: pxToDp(40),
    marginBottom: pxToDp(70),
    color: "#9A9A9A"
  },
  describeimg: {
    width: pxToDp(552),
    height: pxToDp(120)
  },
  describeinfo: {
    width: pxToDp(660),
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: pxToDp(15)
  },
  infochild: {
    width: pxToDp(180),
    textAlign: "center",
    color: "#656565",
    fontWeight: "bold",
    fontSize: pxToDp(26)
  },
  specialdesc: {
    color: "#656565",
    fontSize: pxToDp(22),
    lineHeight: pxToDp(30),
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
    paddingTop: pxToDp(30),
    paddingBottom: pxToDp(30)
  },
  skill: {
    width: pxToDp(670),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: pxToDp(10)
  },
  skillindex: {
    width: pxToDp(32),
    height: pxToDp(32),
    borderRadius: pxToDp(16),
    backgroundColor: "#FF4E4E",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: pxToDp(26),
    textAlign: "center",
    lineHeight: pxToDp(32)
  },
  skilltext: {
    color: "#656565",
    fontSize: pxToDp(26),
    fontWeight: "500",
    marginLeft: pxToDp(12)
  },
  sharecontent: {
    width: pxToDp(750),
    height: pxToDp(160),
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 4
  },
  sharechild: {
    alignItems: "center"
  },
  shareimg: {
    width: pxToDp(90),
    height: pxToDp(90)
  },
  sharetitle: {
    fontSize: pxToDp(24),
    color: "#1D1D1F",
    marginTop: pxToDp(10)
  }
});

const mapStateToProps = state => {
  const { shareQrcodeImage } = state;
  return {
    shareQrcodeImage
  };
};
export default connect(mapStateToProps)(Apprentice);
