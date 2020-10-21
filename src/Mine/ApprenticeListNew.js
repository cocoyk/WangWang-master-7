import React, { Component } from "react";
import request from "../../util/Request";
import pxToDp from "../../util/util";
import Navigation from "../component/navigation";
import LinearGradient from "react-native-linear-gradient";
import * as Progress from "react-native-progress";
import {
  View,
  Image,
  Text,
  FlatList,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet
} from "react-native";

export default class ApprenticeListNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodata: false,
      nomore: false,
      showload: false,
      total_num: 0,
      get_money: 0,
      total_award: 100,
      activity_peroid: 0,
      on_passage_money: 0,
      apprenticesList: [],
      refreshing: false
    };
    this.page = 1;
    this.page_add = true;
  }

  componentDidMount() {
    const self = this;
    self.getApprentices();
    const userinfo_list = self.props.navigation.getParam("userinfo_list", "");
    console.log("userinfo_list", userinfo_list);
    self.setState({
      total_award: userinfo_list.total_award,
      activity_peroid: userinfo_list.activity_peroid,
      total_num: userinfo_list.total_num,
      get_money: userinfo_list.get_money,
      on_passage_money: userinfo_list.on_passage_money
    });
    // self.getApprenticeInfo();
  }

  // getApprenticeInfo = () => {
  //   const self = this;
  //   const api = "share_recruit";
  //   const params = {};
  //   request(api, params, function(res) {
  //     let result = res.data;
  //     self.setState({
  //       total_award: result.total_award,
  //       total_num: result.total_num,
  //       get_money: result.get_money,
  //       on_passage_money: result.on_passage_money
  //     });
  //   });
  // };

  getApprentices = () => {
    const self = this;
    const api = "invite_user_list";
    const params = { page: self.page };
    request(api, params, function(res) {
      self.page_add = true;
      var userlist;
      if (self.page == 1) {
        userlist = res.data.invite_data;
      } else {
        var templist = self.state.apprenticesList;
        userlist = templist.concat(res.data.invite_data);
      }
      self.setState({
        nodata: self.page == 1 && res.data.invite_data == "",
        nomore: self.page != 1 && res.data.invite_data == "",
        apprenticesList: userlist
      });
    });
  };

  reachedBottom = () => {
    this.page++;
    this.getApprentices();
  };

  onscroll = event => {
    let contentHeight = event.nativeEvent.contentSize.height; //内容高度
    let pageHeight = event.nativeEvent.layoutMeasurement.height; //屏幕高度
    let scrollHeight = event.nativeEvent.contentOffset.y; //滑动距离
    this.setState({
      showload: true
    });
    if (this.page_add) {
      if (
        scrollHeight + pageHeight + 200 >= contentHeight &&
        contentHeight >= pageHeight
      ) {
        this.page++;
        this.page_add = false;
        this.getApprentices();
      }
    }
  };

  onRefresh = () => {
    const self = this;
    self.setState({
      refreshing: true
    });
    self.page = 1;
    self.getApprentices();
    setTimeout(() => {
      this.setState({
        refreshing: false
      });
    }, 1000);
  };

  render() {
    const keyExtractor = (item, index) => index.toString();
    return (
      <View style={styles.container}>
        <Navigation title="邀请好友" />
        <ScrollView
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
          onScroll={this.onscroll}
          style={styles.scrollarea}
        >
          <View>
            <Image
              style={{ width: pxToDp(750), height: pxToDp(261) }}
              source={require("../image/invite_list_back.jpg")}
            ></Image>
            <View style={styles.ruletitle}>
              <Text
                style={{
                  flex: 1,
                  fontSize: pxToDp(36),
                  color: "#fff",
                  fontWeight: "bold",
                  lineHeight: pxToDp(50)
                }}
              >
                我的收益
              </Text>
              <Text
                style={{
                  fontSize: pxToDp(26),
                  color: "#fff",
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
                  backgroundColor: "#333333"
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
                  backgroundColor: "#333333"
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
          <Text
            style={{
              fontSize: pxToDp(36),
              fontWeight: "bold",
              color: "#333333",
              lineHeight: pxToDp(50),
              marginLeft: pxToDp(40),
              marginTop: pxToDp(20),
              marginBottom: pxToDp(40)
            }}
          >
            好友列表
          </Text>
          {this.state.nodata ? (
            <Text
              style={{
                color: "#9A9A9A",
                marginLeft: pxToDp(40),
                fontSize: pxToDp(30)
              }}
            >
              暂无邀请好友
            </Text>
          ) : (
            <FlatList
              style={styles.userlist}
              numColumns={1}
              extraData={this.state}
              data={this.state.apprenticesList}
              renderItem={item => this.renderItem(item)}
              // onEndReached={() => this.reachedBottom()}
              // onEndReachedThreshold={0.5}
              refreshing={true}
              keyExtractor={keyExtractor}
            />
          )}
          {this.state.showload ? (
            <View style={styles.loadingArea}>
              {this.state.nomore ? null : (
                <ActivityIndicator size="small" color="#ff5186" />
              )}
              <Text style={styles.loadingText}>
                {this.state.nomore ? "已经到底了" : "正在加载"}
              </Text>
            </View>
          ) : null}
        </ScrollView>
      </View>
    );
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.userdetail}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{
              width: pxToDp(65),
              height: pxToDp(65),
              borderRadius: pxToDp(32)
            }}
            source={
              item.avatar_url
                ? { uri: item.avatar_url }
                : require("../image/defalut_people.png")
            }
          ></Image>
          <Text
            style={{
              fontSize: pxToDp(32),
              color: "#333333",
              marginLeft: pxToDp(10)
            }}
          >
            {item.nickname == "" ? "匿名用户" : item.nickname}
          </Text>
        </View>
        <Progress.Bar
          marginTop={pxToDp(40)}
          width={pxToDp(544)}
          height={pxToDp(10)}
          borderRadius={pxToDp(10)}
          // size={pxToDp(170)} // 圆的直径
          progress={item.get_award / this.state.total_award} // 进度
          unfilledColor="#E7E7E9" // 剩余进度的颜色
          color="#F7494A" // 颜色
          // thickness={pxToDp(10)} // 内圆厚度
          // direction="clockwise" // 方向
          borderWidth={0} // 边框
        ></Progress.Bar>
        <Text
          style={[
            styles.haverecive,
            {
              left:
                (item.get_award / this.state.total_award) * pxToDp(544) >=
                pxToDp(374)
                  ? pxToDp(406)
                  : pxToDp(29) +
                    (item.get_award / this.state.total_award) * pxToDp(544)
            }
          ]}
        >
          已到账{item.get_award.toFixed(2)}元
        </Text>
        <Text style={styles.useraward}>
          <Text style={{ fontSize: pxToDp(36) }}>{this.state.total_award}</Text>
          元
        </Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: pxToDp(750),
    backgroundColor: "#FFF",
    alignItems: "center"
  },
  scrollarea: {
    flex: 1,
    width: pxToDp(750),
    marginTop: pxToDp(20)
  },
  incomearea: {
    width: pxToDp(750),
    marginBottom: pxToDp(20),
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderRadius: pxToDp(20)
  },
  ruletitle: {
    position: "absolute",
    width: pxToDp(670),
    top: pxToDp(26),
    left: pxToDp(40),
    flexDirection: "row",
    alignItems: "flex-end",
    zIndex: 5
  },
  linearea: {
    width: pxToDp(53),
    height: pxToDp(2),
    margin: pxToDp(4)
  },
  friendarea: {
    position: "absolute",
    top: pxToDp(30),
    right: pxToDp(20),
    width: pxToDp(144),
    height: pxToDp(55),
    borderRadius: pxToDp(27),
    justifyContent: "center",
    alignItems: "center"
  },
  incomedetail: {
    position: "absolute",
    top: pxToDp(95),
    left: pxToDp(40),
    flexDirection: "row",
    justifyContent: "space-between",
    width: pxToDp(670),
    height: pxToDp(151),
    backgroundColor: "#FFF6ED",
    borderRadius: pxToDp(10),
    alignItems: "center",
    zIndex: 5
  },
  incomechild: {
    width: pxToDp(220),
    alignItems: "center"
  },
  childtitle: {
    lineHeight: pxToDp(37),
    color: "#333333",
    fontSize: pxToDp(26)
  },
  childnum: {
    fontSize: pxToDp(36),
    fontWeight: "bold",
    color: "#FC444E",
    marginTop: pxToDp(16),
    lineHeight: pxToDp(50)
  },
  childunit: {
    fontSize: pxToDp(20),
    fontWeight: "500",
    color: "#FC444E",
    lineHeight: pxToDp(50)
  },
  userdetail: {
    width: pxToDp(670),
    height: pxToDp(185),
    marginLeft: pxToDp(40),
    marginBottom: pxToDp(20),
    paddingLeft: pxToDp(30),
    borderRadius: pxToDp(10),
    // justifyContent: "center",
    paddingTop: pxToDp(25),
    backgroundColor: "#F2F6FA"
  },
  haverecive: {
    position: "absolute",
    top: pxToDp(110),
    width: pxToDp(168),
    height: pxToDp(48),
    fontSize: pxToDp(22),
    backgroundColor: "#fff",
    textAlign: "center",
    lineHeight: pxToDp(48),
    borderRadius: pxToDp(24),
    borderColor: "#F7494A",
    borderWidth: pxToDp(1),
    color: "#F7494A",
    zIndex: 5
  },
  useraward: {
    position: "absolute",
    top: pxToDp(105),
    left: pxToDp(590),
    fontSize: pxToDp(20),
    color: "#333333",
    zIndex: 5
  },
  childtop: {
    width: pxToDp(640),
    flexDirection: "row",
    alignItems: "center"
  },
  childimg: {
    width: pxToDp(60),
    height: pxToDp(60),
    borderRadius: pxToDp(30)
  },
  nickname: {
    flex: 1,
    marginLeft: pxToDp(10),
    fontSize: pxToDp(36),
    fontWeight: "bold",
    color: "#656565"
  },
  status: {
    fontSize: pxToDp(28),
    marginLeft: pxToDp(20),
    fontWeight: "bold",
    color: "#FF4E4E"
  },
  award: {
    color: "#9A9A9A",
    fontSize: pxToDp(28),
    marginLeft: pxToDp(10),
    lineHeight: pxToDp(80),
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: pxToDp(1)
  },
  loadingArea: {
    height: pxToDp(120),
    marginBottom: pxToDp(20),
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  loadingText: {
    color: "#848a99",
    marginTop: pxToDp(10)
  }
});
