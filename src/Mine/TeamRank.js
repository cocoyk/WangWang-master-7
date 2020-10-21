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

export default class TeamRank extends Component {
  page = 1;
  typelist = ["我的邀请", "下级邀请", "团队邀请"];
  datelist = ["昨日", "本月", "上月"];

  constructor(props) {
    super(props);
    this.state = {
      nodata: false,
      typeIndex: 0,
      dateIndex: 1,
      memberList: [],
      tabChange: false,
      total_page: 0
    };
  }

  componentDidMount() {
    this.getTeamRank();
  }

  getTeamRank() {
    const self = this;
    var api = "promotion_rank";
    const params = {
      page: self.page,
      date_type: self.state.dateIndex + 1,
      member_type: self.state.typeIndex + 1
    };
    request(api, params, function(res) {
      self.setState({
        total_page: res.data.page.total_page,
        memberList: res.data.data,
        nodata: res.data.data == ""
      });
    });
  }

  getmember = page => {
    console.log("当前页码", page);
    this.page = page;
    this.getTeamRank();
  };

  typeChange = async id => {
    this.page = 1;
    await this.setState({
      nodata: false,
      typeIndex: id,
      memberList: [],
      tabChange: true
    });
    this.getTeamRank();
  };

  dateChange = async id => {
    this.page = 1;
    await this.setState({
      nodata: false,
      dateIndex: id,
      memberList: [],
      tabChange: true
    });
    this.getTeamRank();
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
        <Navigation title="团队排行榜" refresh={true} refresh_page="Mine" />
        <View style={styles.typetab}>
          {this.typelist.map((item, index) => {
            //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
            return (
              <TouchableOpacity
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
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.datetab}>
          {this.datelist.map((item, index) => {
            //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => this.dateChange(index)}
              >
                <Text
                  style={
                    this.state.dateIndex == index
                      ? styles.datechild_click
                      : styles.datechild
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
        <Image style={styles.chatimg} source={{ uri: item.avatar_url }} />
        <View>
          <Text numberOfLines={1} style={styles.name}>
            {item.nickname}
          </Text>
          <Text style={styles.level}>
            {item.role == 2 ? "经理团长" : "总监团长"}
          </Text>
        </View>
        <Text style={styles.income}>收益:{item.rebate}</Text>
        {index == 0 && (
          <Image
            style={styles.chatimg}
            source={require("../image/rankinglist_icon_1.png")}
          />
        )}
        {index == 1 && (
          <Image
            style={styles.chatimg}
            source={require("../image/rankinglist_icon_2.png")}
          />
        )}
        {index == 2 && (
          <Image
            style={styles.chatimg}
            source={require("../image/rankinglist_icon_3.png")}
          />
        )}
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
    paddingTop: pxToDp(30),
    borderBottomColor: "#e4e4e4",
    borderBottomWidth: pxToDp(2),
    justifyContent: "space-around"
  },
  typechild: {
    fontSize: pxToDp(28),
    paddingBottom: pxToDp(20),
    paddingLeft: pxToDp(15),
    paddingRight: pxToDp(15),
    color: "#1d1d1f",
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
  datetab: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: pxToDp(750),
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(20),
    justifyContent: "space-around",
    borderBottomColor: "#eaeaef",
    borderBottomWidth: pxToDp(2)
  },
  datechild: {
    fontSize: pxToDp(28),
    color: "#1d1d1f"
  },
  datechild_click: {
    fontSize: pxToDp(28),
    color: "#ff5186"
  },
  memberList: {
    marginTop: pxToDp(20)
  },
  child: {
    width: pxToDp(750),
    padding: pxToDp(30),
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#f5f5f9",
    borderBottomWidth: pxToDp(2)
  },
  chatimg: {
    width: pxToDp(90),
    height: pxToDp(90),
    marginRight: pxToDp(20),
    borderRadius: pxToDp(45)
  },
  name: {
    width: pxToDp(280),
    fontSize: pxToDp(28),
    color: "#1d1d1f"
  },
  level: {
    fontSize: pxToDp(24),
    color: "#848a99",
    marginTop: pxToDp(8)
  },
  income: {
    fontSize: pxToDp(32),
    flex: 1,
    color: "#575e6d"
  }
});
