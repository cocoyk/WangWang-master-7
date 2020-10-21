import React, { Component } from "react";
import request from "../../util/Request";
import pxToDp from "../../util/util";
import Navigation from "../component/navigation";
import LinearGradient from "react-native-linear-gradient";
import {
  View,
  Image,
  Text,
  FlatList,
  ScrollView,
  RefreshControl,
  StyleSheet
} from "react-native";

export default class ApprenticeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodata: false,
      total_num: 0,
      get_money: 0,
      on_passage_money: 0,
      apprenticesList: []
    };
    this.page = 1;
    this.page_add = true;
  }

  componentDidMount() {
    const self = this;
    self.getApprentices();
    self.getApprenticeInfo();
  }

  getApprenticeInfo = () => {
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
        apprenticesList: userlist
      });
    });
  };

  onscroll(event) {
    let self = this;
    let contentHeight = event.nativeEvent.contentSize.height; //内容高度
    let pageHeight = event.nativeEvent.layoutMeasurement.height; //屏幕高度
    let scrollHeight = event.nativeEvent.contentOffset.y; //滑动距离
    if (self.page_add) {
      if (
        scrollHeight + pageHeight + 100 >= contentHeight &&
        contentHeight >= pageHeight
      ) {
        self.page++;
        self.page_add = false;
        self.getApprentices();
      }
    }
  }

  render() {
    const keyExtractor = (item, index) => index.toString();
    return (
      <View style={styles.container}>
        <Navigation title="邀请好友" />
        <ScrollView
          style={styles.scrollarea}
          onScroll={event => this.onscroll(event)}
        >
          <View style={{ alignItems: "center" }}>
            <View style={styles.incomearea}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#FFFFFF", "#FA711D"]}
                  style={styles.linearea}
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
                  style={styles.linearea}
                />
              </View>
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
            <View style={styles.incomearea}>
              <View
                style={{
                  width: pxToDp(710),
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: pxToDp(1),
                  borderBottomColor: "#F0F0F0"
                }}
              >
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#FFFFFF", "#FA711D"]}
                  style={styles.linearea}
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
                  我的好友
                </Text>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#FA711D", "#FFFFFF"]}
                  style={styles.linearea}
                />
              </View>
              {this.state.nodata && (
                <Text
                  style={{
                    color: "#9A9A9A",
                    fontSize: pxToDp(30),
                    lineHeight: pxToDp(80)
                  }}
                >
                  暂无邀请好友
                </Text>
              )}
              <FlatList
                style={styles.userlist}
                numColumns={1}
                extraData={this.state}
                data={this.state.apprenticesList}
                renderItem={item => this.renderItem(item)}
                // onEndReached={() => this.reachedBottom()}
                onEndReachedThreshold={0.1}
                refreshing={true}
                keyExtractor={keyExtractor}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.userdetail}>
        <View style={styles.childtop}>
          <Image style={styles.childimg} source={{ uri: item.avatar_url }} />
          <Text numberOfLines={1} style={styles.nickname}>
            {item.nickname}
          </Text>
          <Text style={styles.status}>{item.status}</Text>
        </View>
        <Text style={styles.award}>{item.activity_describe}</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: pxToDp(750),
    backgroundColor: "#FF4E4E",
    alignItems: "center"
  },
  scrollarea: {
    flex: 1,
    width: pxToDp(750),
    marginTop: pxToDp(20)
  },
  incomearea: {
    width: pxToDp(710),
    padding: pxToDp(20),
    marginBottom: pxToDp(20),
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderRadius: pxToDp(20)
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
  userdetail: {
    width: pxToDp(650),
    paddingLeft: pxToDp(10),
    paddingTop: pxToDp(30)
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
  }
});
