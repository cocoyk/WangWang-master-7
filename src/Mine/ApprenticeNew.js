import React, { Component } from "react";
import request from "../../util/Request";
import pxToDp from "../../util/util";
import Navigation from "../component/navigation";
import LinearGradient from "react-native-linear-gradient";
import ModalInvite from "../component/modalInvite";
import NavigationService from "../../util/NavigationService.js";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-simple-toast";
import WechatModule from "../../util/WechatSdk";
import {
  View,
  Image,
  Text,
  ScrollView,
  RefreshControl,
  Platform,
  Clipboard,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import {
  APP_BASE_URL
} from "../../AppConfig"

class ApprenticeNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid_num: 0,
      total_num: 0,
      get_money: 0,
      on_passage_money: 0,
      my_rank: "",
      top_ten: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      top_three: [],
      icon_img: "",
      total_income: "*",
      activity_peroid: "*",
      task_income: "*",
      level_list: [],
      share_modal: false,
      refreshing: false
    };
    this.pid;
    this.datainit();
    this.activity_list = null;
  }

  datainit = () => {
    this.pid = global.pid;
  };

  componentDidMount = () => {
    const self = this;

    self.getApprenticeInfo();
    self.getMineAward();
  };

  componentDidUpdate(newProps, newState) {
    console.log("componentDidUpdate: ", newProps);
    const self = this
    const { activity_list } = self.props;
    if (activity_list && activity_list != self.activity_list) {
      self.activity_list = activity_list;
      self.setState({
        icon_img: activity_list.image,
        total_income: activity_list.total_award,
        activity_peroid: activity_list.apprentice_duration,
        task_income: activity_list.fanli_award,
        level_list: activity_list.level_list
      });
    }
  }

  getApprenticeInfo = () => {
    const self = this;
    const api = "share_recruit";
    const params = {};
    request(api, params, function(res) {
      let result = res.data;
      self.setState({
        // icon_img: result.image,
        // total_income: result.total_award,
        // task_income: result.fanli_award,
        // level_list: result.level_list,
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

  toInvite = () => {
    this.setState({
      share_modal: true
    });
  };

  closeShareModal = () => {
    this.setState({
      share_modal: false
    });
  };

  toApprenticeList = () => {
    const self = this;
    if (self.state.total_income != "*") {
      console.log("state", self.state);
      NavigationService.push("ApprenticeListNew", {
        userinfo_list: {
          total_num: self.state.total_num,
          get_money: self.state.get_money,
          on_passage_money: self.state.on_passage_money,
          total_award: self.state.total_income,
          activity_peroid: self.state.activity_peroid
        }
      });
    } else {
      Toast.showWithGravity("操作过快，请稍候", Toast.SHORT, Toast.CENTER);
    }
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

  onRefresh = () => {
    const self = this;
    self.setState({
      refreshing: true
    });
    self.getApprenticeInfo();
    self.getMineAward();
    setTimeout(() => {
      this.setState({
        refreshing: false
      });
    }, 1000);
  };

  render() {
    return (
      <View style={styles.container}>
        <Navigation title="邀请好友" />
        {this.state.share_modal && (
          <ModalInvite
            hiddenModal={this.closeShareModal}
            share_img={this.props.shareQrcodeImage}
            pid={this.pid}
          />
        )}
        <ScrollView
          style={styles.scrollarea}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              progressBackgroundColor="#fff"
              // colors="#ff5186"
              onRefresh={this.onRefresh}
              colors={["#ff0000", "#ff5186", "#4AC1A4"]}
              enabled={true}
              tintColor="#ff5186"
              title="正在刷新..."
              titleColor="#eaeaef"
            />
          }
        >
          <Image
            style={{ width: pxToDp(750), height: pxToDp(600) }}
            source={
              this.state.icon_img
                ? { uri: this.state.icon_img }
                : require("../image/invite_img_title.png")
            }
          />
          <View style={styles.activitytitle}>
            <Text onPress={this.toInvite} style={styles.activityshare}>
              立即邀请赚钱
            </Text>
            <Text onPress={this.toApprenticeList} style={styles.activityresult}>
              查看我的收徒
            </Text>
          </View>
          <View style={{ padding: pxToDp(20) }}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: pxToDp(10),
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  width: pxToDp(6),
                  height: pxToDp(37),
                  borderRadius: pxToDp(4),
                  backgroundColor: "#FF6E11"
                }}
              ></Text>
              <Text
                style={{
                  fontSize: pxToDp(36),
                  fontWeight: "bold",
                  color: "#333333",
                  marginLeft: pxToDp(6)
                }}
              >
                如何拿到{this.state.total_income}元
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: pxToDp(28),
                marginBottom: pxToDp(28),
                marginLeft: pxToDp(10),
                marginRight: pxToDp(10)
              }}
            >
              {[1, 2, 3].map(index => {
                //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
                return (
                  <View key={index} style={styles.awardcondition}>
                    <Text style={styles.conditionone}>
                      好友累计获得
                      {this.state.level_list[index - 1]
                        ? Math.round(
                            Object.keys(this.state.level_list[index - 1]) /
                              10000
                          )
                        : "*"}
                      W金币
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        width: pxToDp(150),
                        marginLeft: pxToDp(6),
                        justifyContent: "space-evenly"
                      }}
                    >
                      {[1, 2, 3, 4, 5].map(index => {
                        //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
                        return (
                          <Text
                            key={index}
                            style={{
                              width: pxToDp(20),
                              height: pxToDp(2),
                              backgroundColor: "#F9D47C"
                            }}
                          ></Text>
                        );
                      })}
                    </View>
                    <Text style={styles.circleleft}></Text>
                    <Text style={styles.circleright}></Text>
                    <Text style={styles.conditiontwo}>
                      奖励
                      <Text style={styles.conditionaward}>
                        {this.state.level_list[index - 1]
                          ? Object.values(this.state.level_list[index - 1])
                          : "*"}
                      </Text>
                      元
                    </Text>
                  </View>
                );
              })}
              <View style={styles.awardcondition}>
                <Text style={styles.conditionone}>好友做任务</Text>
                <View
                  style={{
                    flexDirection: "row",
                    width: pxToDp(150),
                    marginLeft: pxToDp(6),
                    justifyContent: "space-evenly"
                  }}
                >
                  {[1, 2, 3, 4, 5].map(index => {
                    //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
                    return (
                      <Text
                        key={index}
                        style={{
                          width: pxToDp(20),
                          height: pxToDp(2),
                          backgroundColor: "#F9D47C"
                        }}
                      ></Text>
                    );
                  })}
                </View>
                <Text style={styles.circleleft}></Text>
                <Text style={styles.circleright}></Text>
                <Text style={styles.conditiontwo}>
                  奖励
                  <Text style={styles.conditionaward}>
                    {this.state.task_income}
                  </Text>
                  元
                </Text>
              </View>
            </View>
          </View>
          <View style={{ padding: pxToDp(20) }}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: pxToDp(10),
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  width: pxToDp(6),
                  height: pxToDp(37),
                  borderRadius: pxToDp(4),
                  backgroundColor: "#FF6E11"
                }}
              ></Text>
              <Text
                style={{
                  fontSize: pxToDp(36),
                  fontWeight: "bold",
                  color: "#333333",
                  marginLeft: pxToDp(6)
                }}
              >
                我的赏金
              </Text>
              <Text
                style={{
                  fontSize: pxToDp(26),
                  color: "#9A9A9A",
                  marginLeft: pxToDp(20),
                  lineHeight: pxToDp(37)
                }}
              >
                仅显示{this.state.activity_peroid}日内邀请的徒弟
              </Text>
            </View>
            <View style={styles.incomedetail}>
              <View style={styles.incomechild}>
                <Text style={styles.childtitle}>已邀请好友</Text>
                <Text style={styles.childnum}>
                  {this.state.total_num}
                  <Text style={styles.childunit}>个</Text>
                </Text>
              </View>
              <Text
                style={{
                  width: pxToDp(1),
                  height: pxToDp(48),
                  backgroundColor: "#9B771F"
                }}
              ></Text>
              <View style={styles.incomechild}>
                <Text style={styles.childtitle}>已到账赏金</Text>
                <Text style={styles.childnum}>
                  {this.state.get_money.toFixed(2)}
                  <Text style={styles.childunit}>元</Text>
                </Text>
              </View>
              <Text
                style={{
                  width: pxToDp(1),
                  height: pxToDp(48),
                  backgroundColor: "#9B771F"
                }}
              ></Text>
              <View style={styles.incomechild}>
                <Text style={styles.childtitle}>在途赏金</Text>
                <Text style={styles.childnum}>
                  {this.state.on_passage_money.toFixed(2)}
                  <Text style={styles.childunit}>元</Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.describearea}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: pxToDp(10),
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  width: pxToDp(6),
                  height: pxToDp(37),
                  borderRadius: pxToDp(4),
                  backgroundColor: "#FF6E11"
                }}
              ></Text>
              <Text
                style={{
                  fontSize: pxToDp(36),
                  fontWeight: "bold",
                  color: "#333333",
                  marginLeft: pxToDp(6)
                }}
              >
                邀请榜单
              </Text>
            </View>
            <View style={styles.ranklist}>
              <View style={[styles.rankchild, { marginTop: pxToDp(60) }]}>
                <Image
                  style={styles.imgback}
                  source={require("../image/invite_img_rahmen.png")}
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
            <Text style={styles.inviteamount}>
              我的邀请人数为
              <Text style={styles.invitenum}>{this.state.valid_num}</Text>
              人，当前排名：{this.state.my_rank}
            </Text>
          </View>
          <View style={{ padding: pxToDp(20) }}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: pxToDp(10),
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  width: pxToDp(6),
                  height: pxToDp(37),
                  borderRadius: pxToDp(4),
                  backgroundColor: "#FF6E11"
                }}
              ></Text>
              <Text
                style={{
                  fontSize: pxToDp(36),
                  fontWeight: "bold",
                  color: "#333333",
                  marginLeft: pxToDp(6)
                }}
              >
                规则说明
              </Text>
            </View>
            <Text style={[styles.textchild, { marginTop: pxToDp(20) }]}>
              1．分享给好友，让好友通过你的分享链接下载注册；
            </Text>
            <Text style={styles.textchild}>
              2．好友做任务、阅读、玩游戏获得金币，你可以获得 20%金币提成；
            </Text>
            <Text style={styles.textchild}>
              3．好友累计获得
              {this.state.level_list[0]
                ? Math.round(Object.keys(this.state.level_list[0]) / 10000)
                : "*"}
              W金币，你可以获得
              {this.state.level_list[0]
                ? Object.values(this.state.level_list[0])
                : "*"}
              W金币；
            </Text>
            <Text style={styles.textchild}>
              4．好友累计获得
              {this.state.level_list[1]
                ? Math.round(Object.keys(this.state.level_list[1]) / 10000)
                : "*"}
              W金币，你可以获得
              {this.state.level_list[1]
                ? Object.values(this.state.level_list[1])
                : "*"}
              W金币；
            </Text>
            <Text style={styles.textchild}>
              5．好友累计获得
              {this.state.level_list[2]
                ? Math.round(Object.keys(this.state.level_list[2]) / 10000)
                : "*"}
              W金币，你可以获得
              {this.state.level_list[2]
                ? Object.values(this.state.level_list[2])
                : "*"}
              W金币。
            </Text>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: pxToDp(750),
    backgroundColor: "#fff",
    alignItems: "center"
  },
  activitytitle: {
    position: "absolute",
    width: pxToDp(750),
    top: pxToDp(390),
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5
  },
  awardcondition: {
    width: pxToDp(166),
    backgroundColor: "#FFF7EC",
    borderRadius: pxToDp(6),
    borderColor: "#F9D47C",
    borderWidth: pxToDp(2)
  },
  conditionone: {
    width: pxToDp(166),
    height: pxToDp(109),
    paddingLeft: pxToDp(12),
    paddingRight: pxToDp(12),
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(20),
    fontSize: pxToDp(26),
    color: "#9B771F"
  },
  circleleft: {
    position: "absolute",
    width: pxToDp(10),
    height: pxToDp(20),
    top: pxToDp(99),
    left: pxToDp(-3),
    borderBottomWidth: pxToDp(2),
    borderLeftWidth: pxToDp(0),
    borderRightWidth: pxToDp(2),
    borderTopWidth: pxToDp(2),
    borderRightColor: "#F9D47C",
    borderTopColor: "#F9D47C",
    borderBottomColor: "#F9D47C",
    borderLeftColor: "#FFF",
    backgroundColor: "#fff",
    borderTopRightRadius: pxToDp(10),
    borderBottomRightRadius: pxToDp(10),
    zIndex: 5
  },
  circleright: {
    position: "absolute",
    width: pxToDp(10),
    height: pxToDp(20),
    top: pxToDp(99),
    right: pxToDp(-2),
    borderBottomWidth: pxToDp(2),
    borderLeftWidth: pxToDp(2),
    borderRightWidth: pxToDp(0),
    borderTopWidth: pxToDp(2),
    borderBottomColor: "#F9D47C",
    borderLeftColor: "#F9D47C",
    borderTopColor: "#F9D47C",
    borderRightColor: "#fff",
    backgroundColor: "#fff",
    borderTopLeftRadius: pxToDp(10),
    borderBottomLeftRadius: pxToDp(10),
    zIndex: 5
  },
  conditiontwo: {
    width: pxToDp(166),
    height: pxToDp(109),
    lineHeight: pxToDp(69),
    paddingLeft: pxToDp(12),
    paddingRight: pxToDp(12),
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(20),
    fontSize: pxToDp(26),
    color: "#9B771F"
  },
  conditionaward: {
    fontSize: pxToDp(56),
    letterSpacing: pxToDp(10),
    color: "#FF6E11",
    lineHeight: pxToDp(69)
  },
  activityshare: {
    width: pxToDp(403),
    height: pxToDp(85),
    backgroundColor: "#FEDC01",
    lineHeight: pxToDp(85),
    textAlign: "center",
    fontSize: pxToDp(39),
    color: "#9A483D",
    borderRadius: pxToDp(43)
  },
  activityresult: {
    paddingTop: pxToDp(30),
    lineHeight: pxToDp(40),
    fontSize: pxToDp(28),
    color: "#fff",
    borderBottomColor: "#fff",
    borderBottomWidth: pxToDp(1)
  },
  scrollarea: {
    flex: 1,
    width: pxToDp(750)
  },
  incomedetail: {
    marginTop: pxToDp(20),
    marginLeft: pxToDp(10),
    flexDirection: "row",
    justifyContent: "space-between",
    width: pxToDp(690),
    height: pxToDp(151),
    backgroundColor: "#FFF7EC",
    borderColor: "#F9D47C",
    borderWidth: pxToDp(2),
    borderRadius: pxToDp(10),
    alignItems: "center"
  },
  incomechild: {
    width: pxToDp(225),
    alignItems: "center"
  },
  childtitle: {
    lineHeight: pxToDp(37),
    color: "#9B771F",
    fontSize: pxToDp(26)
  },
  childnum: {
    fontSize: pxToDp(36),
    fontWeight: "bold",
    color: "#FF6E11",
    marginTop: pxToDp(16),
    lineHeight: pxToDp(50)
  },
  childunit: {
    fontSize: pxToDp(20),
    fontWeight: "500",
    color: "#FF6E11",
    lineHeight: pxToDp(50)
  },
  describearea: {
    width: pxToDp(750),
    padding: pxToDp(20)
  },
  ranklist: {
    width: pxToDp(710),
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
    width: pxToDp(710),
    justifyContent: "center",
    flexDirection: "row"
  },
  childrank: {
    width: pxToDp(130),
    height: pxToDp(90),
    fontSize: pxToDp(28),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#656565",
    borderTopColor: "#F9D47C",
    borderLeftWidth: pxToDp(2),
    borderLeftColor: "#F9D47C",
    borderRightWidth: pxToDp(2),
    borderRightColor: "#F9D47C",
    borderBottomWidth: pxToDp(2),
    borderBottomColor: "#F9D47C",
    backgroundColor: "#FFF7EC",
    textAlign: "center",
    lineHeight: pxToDp(90)
  },
  childname: {
    width: pxToDp(160),
    height: pxToDp(90),
    fontSize: pxToDp(28),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#656565",
    borderTopColor: "#F9D47C",
    backgroundColor: "#FFF7EC",
    borderBottomWidth: pxToDp(2),
    borderBottomColor: "#F9D47C",
    textAlign: "center",
    lineHeight: pxToDp(90)
  },
  childinvitenum: {
    width: pxToDp(200),
    height: pxToDp(90),
    fontSize: pxToDp(28),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#656565",
    borderTopColor: "#F9D47C",
    borderLeftWidth: pxToDp(2),
    borderLeftColor: "#F9D47C",
    borderRightWidth: pxToDp(2),
    borderRightColor: "#F9D47C",
    borderBottomWidth: pxToDp(2),
    borderBottomColor: "#F9D47C",
    backgroundColor: "#FFF7EC",
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
    borderTopColor: "#F9D47C",
    borderRightWidth: pxToDp(2),
    borderRightColor: "#F9D47C",
    borderBottomWidth: pxToDp(2),
    borderBottomColor: "#F9D47C",
    color: "#656565",
    backgroundColor: "#FFF7EC"
  },
  inviteamount: {
    width: pxToDp(710),
    textAlign: "center",
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
  textchild: {
    lineHeight: pxToDp(40),
    marginBottom: pxToDp(25),
    marginLeft: pxToDp(30),
    marginRight: pxToDp(30),
    fontSize: pxToDp(28),
    color: "#333333"
  },
  sharecontent: {
    width: pxToDp(750),
    height: pxToDp(180),
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    elevation: 10
  },
  sharechild: {
    width: pxToDp(150),
    justifyContent: "center",
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

const mapStatToProps = state => {
  const { activitySettings, shareQrcodeImage } = state;
  const { activity_list } = activitySettings;
  return {
    activity_list,
    shareQrcodeImage
  };
};

export default connect(mapStatToProps)(ApprenticeNew);
