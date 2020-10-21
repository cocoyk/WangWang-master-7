import React, { Component } from "react";
import Navigation from "../component/navigation";
import pxToDp from "../../util/util";
import Formate from "../../util/formate";
import Pagination from "../component/pagination";
import Nodata from "../component/nodata";
import request from "../../util/Request";
import NavigationService from "../../util/NavigationService.js";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity
} from "react-native";

export default class BargainAward extends Component {
  page = 1;
  datelist = ["今日", "昨日", "本月", "上月"];
  statuslist = ["全部", "有效订单", "失效订单", "可提现"];
  sceenHeight = Dimensions.get("window").height;
  today = Formate.getToday();
  yesterday = Formate.getYesterday();
  lastFirstDay = Formate.getLastMonthFirst();
  lastEndDay = Formate.getLastMonthEnd();
  thisFirstDay = Formate.getThisMonthFirst();
  dateIndex = 2;
  statusIndex = 1;

  constructor(props) {
    super(props);
    this.state = {
      dateIndex: 0,
      statusIndex: 1,
      orderList: [],
      nodata: false,
      tabChange: false,
      total_page: 0,
      total_order: 0,
      total_income: 0
    };
  }

  componentDidMount() {
    const self = this;
    const dateIndex = self.props.navigation.getParam("dateIndex", "");
    self.setState(
      {
        dateIndex: dateIndex
      },
      self.getOrders()
    );
  }

  getOrders() {
    const self = this;
    var api = "free_goods_activity_info";
    var datefrom = self.today;
    var dateto = self.today;
    if (self.state.dateIndex == 1) {
      datefrom = self.yesterday;
      dateto = self.yesterday;
    } else if (self.state.dateIndex == 2) {
      datefrom = self.thisFirstDay;
      dateto = self.today;
    } else if (self.state.dateIndex == 3) {
      datefrom = self.lastFirstDay;
      dateto = self.lastEndDay;
    } else {
      datefrom = self.today;
      dateto = self.today;
    }
    console.log("12", self.state.dateIndex, datefrom, dateto);
    const params = {
      start_date: datefrom,
      end_date: dateto
    };
    request(api, params, function(res) {
      self.setState({
        orderList: res.data.data,
        nodata: res.data.data == ""
      });
      if (res.data.data != "") {
        self.scrollTop();
      }
    });
  }

  getOrder = page => {
    console.log("当前页码", page);
    this.page = page;
    this.getOrders();
  };

  dateChange = async id => {
    this.page = 1;
    await this.setState({
      dateIndex: id,
      orderList: [],
      total_page: 0,
      total_order: 0,
      total_income: 0,
      tabChange: true
    });
    this.getOrders();
  };

  statusChange = async id => {
    this.page = 1;
    await this.setState({
      statusIndex: id,
      orderList: [],
      total_page: 0,
      total_order: 0,
      total_income: 0,
      tabChange: true
    });
    this.getOrders();
  };

  goodsClick = goods_id => {
    NavigationService.push("Detail", { goodsId: goods_id });
  };

  onRef = ref => {
    this.child = ref;
  };

  scrollTop = () => {
    let self = this;
    self.refs._scrollview.scrollTo({ x: 0, y: 0, animated: false });
  };

  click = () => {
    this.child.initData();
  };

  render() {
    const keyExtractor = (item, index) => index.toString();
    return (
      <View style={styles.container}>
        <Navigation title="砍价免费拿" />
        <ScrollView
          // eslint-disable-next-line react/no-string-refs
          ref="_scrollview"
        >
          {!this.state.nodata ? (
            <FlatList
              style={styles.orderList}
              // horizontal={true}
              // showsHorizontalScrollIndicator={false}
              data={this.state.orderList}
              renderItem={this.renderItem}
              keyExtractor={keyExtractor}
            />
          ) : (
            <View style={{ marginTop: pxToDp(20) }}>
              <Nodata />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.goodsClick(item.goods_id)}
      >
        <View style={styles.child}>
          <View style={styles.childtop}>
            <Image style={styles.left} source={{ uri: item.goods_image_url }} />
            <View style={styles.right}>
              <Text style={styles.righttop}>{item.goods_name}</Text>
              <View style={styles.rightdown}>
                <Image
                  style={styles.chatimg}
                  source={{ uri: item.avatar_url }}
                />
                <Text numberOfLines={1} style={styles.amount}>
                  {item.nickname}
                </Text>
                <Text style={styles.status}>{item.order_create_time}下单</Text>
              </View>
            </View>
          </View>
          <View style={styles.childdown}>
            <View style={styles.date}>
              <Text style={styles.operation}>
                {item.order_pay_time}订单金额￥{item.order_amount}
              </Text>
              <Text style={styles.promote}>预计返现￥{item.amout}</Text>
            </View>
            <Text style={styles.operation}>{item.order_status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f9",
    alignItems: "center"
  },
  datetab: {
    flexDirection: "row",
    width: pxToDp(750),
    backgroundColor: "#fff",
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(20)
  },
  datechild: {
    width: pxToDp(188),
    textAlign: "center",
    fontSize: pxToDp(28),
    borderRightColor: "#eaeaef",
    borderRightWidth: pxToDp(2)
  },
  statustab: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: pxToDp(750),
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(20),
    justifyContent: "space-around",
    borderBottomColor: "#eaeaef",
    borderBottomWidth: pxToDp(2)
  },
  statuschild: {
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
  statuschild_click: {
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
  totaldata: {
    width: pxToDp(750),
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingBottom: pxToDp(20),
    paddingTop: pxToDp(20)
  },
  totalorder: {
    color: "#707070",
    fontSize: pxToDp(26),
    marginRight: pxToDp(30)
  },
  totalincome: {
    color: "#707070",
    fontSize: pxToDp(26)
  },
  orderList: {
    marginTop: pxToDp(10)
  },
  child: {
    backgroundColor: "#fff",
    padding: pxToDp(30),
    marginBottom: pxToDp(10)
  },
  childtop: {
    flexDirection: "row",
    paddingBottom: pxToDp(20),
    borderBottomWidth: pxToDp(2),
    borderBottomColor: "#eaeaef"
  },
  left: {
    width: pxToDp(132),
    height: pxToDp(132),
    marginRight: pxToDp(20)
  },
  right: {
    width: pxToDp(536)
  },
  righttop: {
    fontSize: pxToDp(28),
    color: "#1d1d1f"
  },
  rightdown: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  chatimg: {
    width: pxToDp(40),
    height: pxToDp(40),
    marginRight: pxToDp(10),
    borderRadius: pxToDp(20)
  },
  amount: {
    flex: 1,
    fontSize: pxToDp(26),
    color: "#848a99"
  },
  status: {
    color: "#848a99",
    fontSize: pxToDp(26)
  },
  childdown: {
    flexDirection: "row",
    paddingTop: pxToDp(20),
    alignItems: "center"
  },
  date: {
    color: "#848a99",
    fontSize: pxToDp(24),
    flex: 1
  },
  promote: {
    color: "#848a99",
    fontSize: pxToDp(24)
  },
  operation: {
    color: "#848a99",
    lineHeight: pxToDp(45),
    fontSize: pxToDp(28)
  }
});
