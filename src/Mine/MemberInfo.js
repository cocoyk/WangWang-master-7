import React, { Component } from "react";
import Navigation from "../component/navigation";
import pxToDp from "../../util/util";
import Pagination from "../component/pagination";
import Nodata from "../component/nodata";
import LoadingActivity from "../component/loadingActivity";
import NavigationService from "../../util/NavigationService.js";
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

export default class MemberInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_info: {}
    };
    this.user_id = 0;
  }

  componentDidMount() {
    const self = this;
    self.user_id = self.props.navigation.getParam("user_id", "");
    self.getContrubution();
  }

  getContrubution() {
    const self = this;
    var api = "my_apprentice_data";
    const params = {
      pid: self.user_id
    };
    request(api, params, function(res) {
      self.setState({
        user_info: res.data
      });
    });
  }

  toContrubutionDetail = () => {
    NavigationService.push("ContrubutionDetail", {
      user_id: this.user_id
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Navigation title="我的徒弟" refresh={true} refresh_page="Mine" />
        <Image
          style={styles.topimg}
          source={
            this.state.user_info.avatar_url
              ? {
                  uri: this.state.user_info.avatar_url
                }
              : require("../image/defalut_people.png")
          }
        ></Image>
        <Text style={styles.topname}>{this.state.user_info.nickname}</Text>
        <View style={styles.childrow}>
          <Text style={styles.childtitle}>注册日期</Text>
          <Text style={styles.childvalue}>
            {this.state.user_info.create_time}
          </Text>
        </View>
        <View style={styles.childrow}>
          <Text style={styles.childtitle}>最后登录日期</Text>
          <Text style={styles.childvalue}>
            {this.state.user_info.last_login_time}
          </Text>
        </View>
        <View style={styles.childrow}>
          <Text style={styles.childtitle}>累计收入</Text>
          <Text style={styles.childvalue}>
            {this.state.user_info.total_gold}金币
          </Text>
        </View>
        <View style={styles.childrow}>
          <Text style={styles.childtitle}>提现成功</Text>
          <Text style={styles.childvalue}>
            {this.state.user_info.withdraw_success_gold}金币
          </Text>
        </View>
        <View style={styles.childrow}>
          <Text style={styles.childtitle}>ta的师傅</Text>
          <Text style={styles.childvalue}>{this.state.user_info.superior}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.childrow}
          onPress={this.toContrubutionDetail}
        >
          <Text style={styles.childtitle}>最近7日贡献</Text>
          <Text style={styles.childvalue}>查看</Text>
          <Image
            style={{
              width: pxToDp(18),
              height: pxToDp(32),
              marginLeft: pxToDp(10)
            }}
            source={require("../image/common_img_next3.png")}
          ></Image>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  topimg: {
    width: pxToDp(160),
    height: pxToDp(160),
    borderRadius: pxToDp(80),
    marginTop: pxToDp(80)
  },
  topname: {
    fontSize: pxToDp(40),
    color: "#212121",
    fontWeight: "bold",
    lineHeight: pxToDp(100),
    marginBottom: pxToDp(50)
  },
  childrow: {
    width: pxToDp(690),
    height: pxToDp(120),
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: pxToDp(2)
  },
  childtitle: {
    flex: 1,
    fontSize: pxToDp(32),
    fontWeight: "500",
    color: "#212121"
  },
  childvalue: {
    fontSize: pxToDp(32),
    color: "#656565"
  }
});
