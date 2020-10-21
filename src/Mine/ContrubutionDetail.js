import React, { Component } from "react";
import Navigation from "../component/navigation";
import pxToDp from "../../util/util";
import Pagination from "../component/pagination";
import Nodata from "../component/nodata";
import LoadingActivity from "../component/loadingActivity";
import LinearGradient from "react-native-linear-gradient";
import Formate from "../../util/formate.js";
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

export default class ContrubutionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodata: false,
      nomore: false,
      contrubutionList: []
    };
    this.user_id = 0;
    this.page = 1;
    this.date_to = Formate.getToday();
    this.date_from = Formate.getWeekday();
  }

  componentDidMount() {
    const self = this;
    self.user_id = self.props.navigation.getParam("user_id", "");
    self.getContrubutionDetail();
  }

  getContrubutionDetail() {
    const self = this;
    var api = "my_apprentice_recent_contribution";
    const params = {
      page: self.page,
      apprentice_pid: self.user_id,
      start_date: self.date_from,
      end_date: self.date_to
    };
    request(api, params, function(res) {
      var contrubutionlist;
      if (self.page == 1) {
        contrubutionlist = res.data.data;
      } else {
        var templist = self.state.contrubutionList;
        contrubutionlist = templist.concat(res.data.data);
      }
      self.setState({
        contrubutionList: contrubutionlist,
        nodata: self.page == 1 && res.data.data == "",
        nomore: self.page != 1 && res.data.data == ""
      });
    });
  }

  typeChange = async id => {
    this.page = 1;
    await this.setState({
      nodata: false,
      typeIndex: id
    });
    this.getTeamList();
  };

  reachedBottom = () => {
    this.page++;
    this.getContrubutionDetail();
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
        <Navigation title="收入记录" refresh={true} refresh_page="Mine" />
        {this.state.nodata ? (
          <Nodata />
        ) : (
          <FlatList
            style={styles.memberList}
            extraData={this.state}
            // horizontal={true}
            // showsHorizontalScrollIndicator={false}
            onEndReached={() => this.reachedBottom()}
            ListFooterComponent={this.renderFooter}
            data={this.state.contrubutionList}
            renderItem={this.renderItem}
            keyExtractor={keyExtractor}
          />
        )}
      </View>
    );
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.child}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: pxToDp(20)
          }}
        >
          <Image
            style={{
              width: pxToDp(60),
              height: pxToDp(60),
              borderRadius: pxToDp(30)
            }}
            source={{ uri: item.contributor_avatar_url }}
          ></Image>
          <Text
            numberOfLines={1}
            style={{
              maxWidth: pxToDp(280),
              margin: pxToDp(10),
              fontSize: pxToDp(36),
              color: "#212121",
              fontWeight: "500"
            }}
          >
            {item.contributor_nickname}
          </Text>
          {item.type && (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={
                item.type == "徒弟任务"
                  ? ["#FF5186", "#FF8387"]
                  : ["#FA8566", "#FFA87A"]
              }
              style={styles.roleback}
            >
              <Text
                style={{
                  fontSize: pxToDp(26),
                  color: "#fff",
                  fontWeight: "500"
                }}
              >
                {item.type}
              </Text>
            </LinearGradient>
          )}
          <Text
            style={{
              flex: 1,
              textAlign: "right",
              fontSize: pxToDp(32),
              fontWeight: "bold",
              color: "#ff5186"
            }}
          >
            +{item.amount}金币
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            numberOfLines={1}
            style={{
              maxWidth: pxToDp(410),
              fontSize: pxToDp(30),
              color: "#9A9A9A"
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "right",
              fontSize: pxToDp(26),
              color: "#9a9a9a"
            }}
          >
            {item.create_time}
          </Text>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  memberList: {
    borderTopColor: "#F0F0F0",
    borderTopWidth: pxToDp(2)
  },
  child: {
    width: pxToDp(720),
    height: pxToDp(190),
    justifyContent: "center",
    marginLeft: pxToDp(30),
    paddingRight: pxToDp(40),
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: pxToDp(2)
  },
  roleback: {
    width: pxToDp(127),
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
