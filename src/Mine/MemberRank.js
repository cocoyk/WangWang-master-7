import React, { Component } from "react";
import Navigation from "../component/navigation";
import pxToDp from "../../util/util";
import Pagination from "../component/pagination";
import Nodata from "../component/nodata";
import LoadingActivity from "../component/loadingActivity";
import Formate from "../../util/formate.js";
import LinearGradient from "react-native-linear-gradient";
import NavigationService from "../../util/NavigationService.js";
import request from "../../util/Request";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity
} from "react-native";

export default class MemberRank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeIndex: 0,
      nodata: false,
      nomore: false,
      memberList: []
    };
    this.typeIndex = 0;
    this.typelist = ["昨日", "前七日", "上月"];
    this.page = 1;
    // this.today = Formate.getToday(); //今天
    // this.weekago = Formate.getWeekday(); //一周前
    // this.yesterday = Formate.getYesterday(); //昨日
    // this.monthfirst = Formate.getThisMonthFirst(); //本月初
    // this.date_from = this.today;
    // this.date_to = this.today;
  }

  componentDidMount() {
    this.getTeamRank();
  }

  getTeamRank() {
    const self = this;
    const api = "my_apprentice_contribution";
    const params = {
      page: self.page,
      data_type: self.typeIndex
      // start_date: self.date_from,
      // end_date: self.date_to
    };
    request(api, params, function(res) {
      console.log(api, res);
      if (params.data_type == self.typeIndex) {
        var memberlist;
        if (params.page == 1) {
          memberlist = res.data.data;
        } else {
          var templist = self.state.memberList;
          memberlist = templist.concat(res.data.data);
        }
        self.setState({
          memberList: memberlist,
          nodata: params.page == 1 && res.data.data == "",
          nomore: params.page != 1 && res.data.data == ""
        });
      }
    });
  }

  //   getmember = page => {
  //     console.log("当前页码", page);
  //     this.page = page;
  //     this.getTeamRank();
  //   };

  typeChange = id => {
    const self = this;
    if (self.typeIndex != id) {
      self.page = 1;
      self.typeIndex = id;
      self.getTeamRank();
      self.setState({
        nodata: false,
        nomore: false,
        memberList: [],
        typeIndex: id
      });
    }
  };

  //   dateChange = async id => {
  //     this.page = 1;
  //     await this.setState({
  //       nodata: false,
  //       dateIndex: id,
  //       memberList: [],
  //       tabChange: true
  //     });
  //     this.getTeamRank();
  //   };

  //   onRef = ref => {
  //     this.child = ref;
  //   };

  //   click = () => {
  //     this.child.initData();
  //   };

  toMemberDetail = data => {
    NavigationService.push("MemberInfo", {
      user_id: data.pid
    });
  };

  reachedBottom = () => {
    this.page++;
    this.getTeamRank();
  };

  renderFooter = () => {
    return (
      <View style={styles.loadingArea}>
        {this.state.nomore ? null : (
          <ActivityIndicator size="small" color="#ff5186" />
        )}
        <Text style={styles.loadingText}>
          {this.state.nomore ? "已加载完毕" : "正在加载"}
        </Text>
      </View>
    );
  };

  render() {
    const keyExtractor = (item, index) => index.toString();
    return (
      <View style={styles.container}>
        <Navigation title="贡献榜" refresh={true} refresh_page="Mine" />
        <Text style={styles.toptitle}>
          师傅可以提徒弟任务的20%提成，提徒孙任务的10%提成
        </Text>
        <View style={styles.typetab}>
          {this.typelist.map((item, index) => {
            //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                key={index}
                style={styles.typechildback}
                onPress={() => this.typeChange(index)}
              >
                <Text
                  style={[
                    this.state.typeIndex == index
                      ? styles.typechild_click
                      : styles.typechild,
                    { borderRightWidth: index != 2 ? pxToDp(2) : pxToDp(0) }
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {this.state.nodata ? (
          <Nodata />
        ) : (
          <FlatList
            style={styles.memberList}
            extraData={this.state}
            // horizontal={true}
            // showsHorizontalScrollIndicator={false}
            onEndReached={() => this.reachedBottom()}
            onEndReachedThreshold={1}
            ListFooterComponent={this.renderFooter}
            data={this.state.memberList}
            renderItem={this.renderItem}
            keyExtractor={keyExtractor}
          />
        )}
      </View>
    );
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.child}
        onPress={() => this.toMemberDetail(item)}
      >
        <Image
          style={{ width: pxToDp(90), height: pxToDp(90) }}
          source={{ uri: item.avatar_url }}
        ></Image>
        <Text
          style={{
            maxWidth: pxToDp(290),
            fontSize: pxToDp(36),
            marginLeft: pxToDp(15),
            marginRight: pxToDp(15),
            color: "#212121",
            fontWeight: "500"
          }}
          numberOfLines={1}
        >
          {item.nickname}
        </Text>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={
            item.level == "徒弟"
              ? ["#FF5186", "#FF8387"]
              : ["#FA8566", "#FFA87A"]
          }
          style={styles.roleback}
        >
          <Text
            style={{ fontSize: pxToDp(26), color: "#fff", fontWeight: "500" }}
          >
            {item.level}
          </Text>
        </LinearGradient>
        <Text
          style={{
            flex: 1,
            textAlign: "right",
            fontSize: pxToDp(36),
            color: "#656565"
          }}
        >
          {item.contribution}金币
        </Text>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  toptitle: {
    width: pxToDp(750),
    height: pxToDp(54),
    lineHeight: pxToDp(54),
    fontSize: pxToDp(24),
    color: "#343434",
    textAlign: "center",
    backgroundColor: "#FFDEB3"
  },
  typetab: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: pxToDp(750),
    borderBottomColor: "#E4E4E4",
    borderBottomWidth: pxToDp(1),
    justifyContent: "space-around"
  },
  typechildback: {
    width: pxToDp(248),
    height: pxToDp(80)
  },
  typechild: {
    width: pxToDp(248),
    textAlign: "center",
    marginTop: pxToDp(20),
    marginBottom: pxToDp(20),
    lineHeight: pxToDp(40),
    fontSize: pxToDp(32),
    fontWeight: "500",
    color: "#3F4450",
    borderRightColor: "#EAEAEF"
  },
  typechild_click: {
    width: pxToDp(248),
    textAlign: "center",
    marginTop: pxToDp(20),
    marginBottom: pxToDp(20),
    lineHeight: pxToDp(40),
    fontSize: pxToDp(32),
    fontWeight: "bold",
    color: "#ff5186",
    borderRightColor: "#EAEAEF"
  },
  child: {
    width: pxToDp(720),
    height: pxToDp(170),
    flexDirection: "row",
    alignItems: "center",
    marginLeft: pxToDp(30),
    paddingRight: pxToDp(30),
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: pxToDp(2)
  },
  roleback: {
    width: pxToDp(79),
    height: pxToDp(37),
    borderRadius: pxToDp(8),
    alignItems: "center",
    justifyContent: "center"
  },
  loadingArea: {
    height: pxToDp(100),
    marginTop: pxToDp(30),
    marginBottom: pxToDp(30),
    alignItems: "center",
    textAlign: "center"
  },
  loadingText: {
    color: "#848a99",
    marginTop: pxToDp(10)
  }
});
