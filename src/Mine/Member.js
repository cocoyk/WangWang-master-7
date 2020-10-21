import React, { Component } from "react";
import Navigation from "../component/navigation";
import pxToDp from "../../util/util";
import Pagination from "../component/pagination";
import Nodata from "../component/nodata";
import LoadingActivity from "../component/loadingActivity";
import request from "../../util/Request";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native";

export default class Member extends Component {
  page = 1;
  typelist = ["我的邀请", "下级邀请", "团队邀请"];
  rolelist = ["所有", "经理团长", "总监团长"];

  constructor(props) {
    super(props);
    this.state = {
      nodata: false,
      typeIndex: 0,
      roleIndex: 0,
      memberList: [],
      acountList: [],
      tabChange: false,
      total_page: 0,
      total_my_member: 0,
      total_lower_member: 0,
      total_team_member: 0
    };
  }

  componentDidMount() {
    this.getMyMember();
    this.getLowerMember();
    this.getTeamMember();
  }

  getMyMember() {
    const self = this;
    var api = "my_agents";
    const params = {
      page: self.page,
      role: self.state.roleIndex == 0 ? "" : self.state.roleIndex + 1
    };
    request(api, params, function(res) {
      self.setState({
        acountList: [],
        total_page: res.data.page.total_page,
        total_my_member: res.data.page.total_count,
        memberList: res.data.data,
        nodata: res.data.data == ""
      });
    });
  }

  getLowerMember() {
    const self = this;
    var api = "lower_agents";
    const params = {
      page: self.page,
      role: self.state.roleIndex == 0 ? "" : self.state.roleIndex + 1
    };
    request(api, params, function(res) {
      if (self.state.typeIndex == 0) {
        self.setState({
          total_lower_member: res.data.page.total_count
        });
      } else {
        self.setState({
          acountList: [],
          total_page: res.data.page.total_page,
          total_lower_member: res.data.page.total_count,
          memberList: res.data.data,
          nodata: res.data.data == ""
        });
      }
    });
  }

  getTeamMember() {
    const self = this;
    var api = "team_agents";
    const params = {
      page: self.page,
      role: self.state.roleIndex == 0 ? "" : self.state.roleIndex + 1
    };
    request(api, params, function(res) {
      if (self.state.typeIndex == 0) {
        self.setState({
          total_team_member: res.data.page.total_count
        });
      } else {
        self.setState({
          acountList: [],
          total_page: res.data.page.total_page,
          total_team_member: res.data.page.total_count,
          memberList: res.data.data,
          nodata: res.data.data == ""
        });
      }
    });
  }

  getmember = page => {
    console.log("当前页码", page);
    this.page = page;
    if (this.state.typeIndex == 0) {
      this.getMyMember();
    } else if (this.state.typeIndex == 1) {
      this.getLowerMember();
    } else {
      this.getTeamMember();
    }
  };

  typeChange = async id => {
    this.page = 1;
    await this.setState({
      nodata: false,
      typeIndex: id,
      memberList: [],
      tabChange: true
    });
    if (this.state.typeIndex == 0) {
      this.getMyMember();
    } else if (this.state.typeIndex == 1) {
      this.getLowerMember();
    } else {
      this.getTeamMember();
    }
  };

  roleChange = async id => {
    this.page = 1;
    await this.setState({
      nodata: false,
      roleIndex: id,
      memberList: [],
      tabChange: true
    });
    if (this.state.typeIndex == 0) {
      this.getMyMember();
    } else if (this.state.typeIndex == 1) {
      this.getLowerMember();
    } else {
      this.getTeamMember();
    }
  };

  watchAgent = (data, index) => {
    const self = this;
    const pid = data.pid;
    var api = "direct_agent_count";
    const params = {
      pid: pid
    };
    request(api, params, function(res) {
      let array = self.state.acountList;
      array[index] = res.data.data;
      self.setState({
        acountList: array
      });
    });
  };

  onRef = ref => {
    this.child = ref;
  };

  click = () => {
    this.child.initData();
  };

  render() {
    const keyExtractor = (item, index) => index.toString();
    return (
      <View style={styles.container}>
        <Navigation title="我的成员" refresh={true} refresh_page="Mine" />
        <View style={styles.typetab}>
          {this.typelist.map((item, index) => {
            //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                key={index}
                onPress={() => this.typeChange(index)}
              >
                <Text
                  style={
                    this.state.typeIndex == index
                      ? styles.typechild_click
                      : styles.typechild
                  }
                >
                  {item}(
                  {index == 0
                    ? this.state.total_my_member
                    : index == 1
                    ? this.state.total_lower_member
                    : this.state.total_team_member}
                  )
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.roletab}>
          {this.rolelist.map((item, index) => {
            //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                key={index}
                onPress={() => this.roleChange(index)}
              >
                <Text
                  style={
                    this.state.roleIndex == index
                      ? styles.rolechild_click
                      : styles.rolechild
                  }
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {this.state.memberList != "" ? (
          <ScrollView>
            <FlatList
              style={styles.memberList}
              extraData={this.state}
              // horizontal={true}
              // showsHorizontalScrollIndicator={false}
              data={this.state.memberList}
              renderItem={this.renderItem}
              keyExtractor={keyExtractor}
            />
            <Pagination
              onRef={this.onRef}
              pageNum={this.state.total_page}
              tabChange={this.state.tabChange}
              changePageCallBack={this.getmember}
            />
          </ScrollView>
        ) : this.state.nodata ? (
          <Nodata />
        ) : (
          <LoadingActivity />
        )}
      </View>
    );
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.child}>
        <View style={styles.left}>
          <Image style={styles.chatimg} source={{ uri: item.avatar_url }} />
          <Text numberOfLines={1} style={styles.nickname}>
            {item.nickname}
          </Text>
        </View>

        <View style={styles.right}>
          <Text style={styles.info}>ID : {item.pid}</Text>
          <Text style={styles.info}>
            等级:{" "}
            {item.role == 2
              ? "经理团长"
              : item.role == 1
              ? "实习团长"
              : "总监团长"}
          </Text>
          <Text style={styles.info}>
            注册: {item.create_time.split(" ")[0]}
          </Text>
          {this.state.acountList[index] == undefined ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this.watchAgent(item, index)}
            >
              <Text style={styles.info}>
                直属:
                <Text style={styles.watch}>查看</Text>
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.info}>
              直属: {this.state.acountList[index]}
            </Text>
          )}
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f9",
    alignItems: "center"
  },
  typetab: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: pxToDp(750),
    paddingTop: pxToDp(20),
    borderBottomColor: "#eaeaef",
    borderBottomWidth: pxToDp(2),
    justifyContent: "space-around",
    borderTopColor: "#eaeaef",
    borderTopWidth: pxToDp(2)
  },
  typechild: {
    fontSize: pxToDp(28),
    paddingBottom: pxToDp(20),
    paddingLeft: pxToDp(15),
    paddingRight: pxToDp(15),
    borderBottomColor: "#fff",
    borderBottomWidth: pxToDp(2)
  },
  typechild_click: {
    fontSize: pxToDp(28),
    paddingBottom: pxToDp(20),
    paddingLeft: pxToDp(15),
    paddingRight: pxToDp(15),
    color: "#ff5186",
    borderBottomColor: "#ff5186",
    borderBottomWidth: pxToDp(2)
  },
  roletab: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: pxToDp(750),
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(20),
    justifyContent: "space-around",
    borderBottomColor: "#eaeaef",
    borderBottomWidth: pxToDp(2)
  },
  rolechild: {
    width: pxToDp(130),
    height: pxToDp(50),
    textAlign: "center",
    lineHeight: pxToDp(50),
    fontSize: pxToDp(24),
    borderRadius: pxToDp(50),
    color: "#848a99",
    borderColor: "#848a99",
    borderWidth: pxToDp(2)
  },
  rolechild_click: {
    width: pxToDp(130),
    height: pxToDp(50),
    textAlign: "center",
    lineHeight: pxToDp(50),
    fontSize: pxToDp(24),
    borderRadius: pxToDp(50),
    color: "#fff",
    backgroundColor: "#ff5186",
    borderColor: "#ff5186",
    borderWidth: pxToDp(2)
  },
  memberList: {
    marginTop: pxToDp(10)
  },
  child: {
    width: pxToDp(710),
    height: pxToDp(195),
    backgroundColor: "#fff",
    flexDirection: "row",
    marginLeft: pxToDp(20),
    borderRadius: pxToDp(20),
    marginBottom: pxToDp(10)
  },
  left: {
    //   flexDirection:'row',
    width: pxToDp(300),
    justifyContent: "center",
    alignItems: "center"
  },
  chatimg: {
    width: pxToDp(90),
    height: pxToDp(90),
    borderRadius: pxToDp(45)
  },
  nickname: {
    width: pxToDp(250),
    textAlign: "center",
    fontSize: pxToDp(28),
    color: "#1d1d1f",
    marginTop: pxToDp(20)
  },
  right: {
    marginLeft: pxToDp(80),
    justifyContent: "center",
    alignItems: "center"
  },
  info: {
    width: pxToDp(330),
    lineHeight: pxToDp(36),
    fontSize: pxToDp(24),
    color: "#848a99"
  },
  watch: {
    width: pxToDp(100),
    lineHeight: pxToDp(36),
    fontSize: pxToDp(24),
    color: "#ff5186",
    textDecorationLine: "underline"
  }
});
