import React, { Component } from "react";
import Navigation from "../component/navigation";
import pxToDp from "../../util/util";
import Formate from "../../util/formate";
import Nodata from "../component/nodata";
import LoadingActivity from "../component/loadingActivity";
import Pagination from "../component/pagination";
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

export default class TeamOrder extends Component {
  page = 1;
  from_kbn = "";
  datelist = ["今日", "昨日", "本月", "上月"];
  typelist = ["所有", "自主", "下级", "团队", "关联总监"];
  statuslist = ["全部", "有效订单", "失效订单", "可提现"];
  sceenHeight = Dimensions.get("window").height;
  today = Formate.getToday();
  yesterday = Formate.getYesterday();
  lastFirstDay = Formate.getLastMonthFirst();
  lastEndDay = Formate.getLastMonthEnd();
  thisFirstDay = Formate.getThisMonthFirst();
  dateIndex = 2;
  typeIndex = 0;
  statusIndex = 1;

  constructor(props) {
    super(props);
    this.state = {
      nodata: false,
      dateIndex: 0,
      typeIndex: 0,
      statusIndex: 1,
      orderList: [],
      tabChange: false,
      total_page: 0,
      total_order: 0,
      total_income: 0
    };
  }

  componentDidMount = async () => {
    const self = this;
    const dateIndex = self.props.navigation.getParam("dateIndex", "");
    const typeIndex = self.props.navigation.getParam("typeIndex", "");
    self.from_kbn = self.props.navigation.getParam("fromKbn", "");
    await self.setState({
      dateIndex: dateIndex,
      typeIndex: typeIndex
    });
    self.getOrders();
  };

  getOrders() {
    const self = this;
    var api = "my_orders";
    var datefrom = self.today;
    var dateto = self.today;
    console.log("日期", self.state.dateIndex);
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
    const params = {
      page: self.page,
      start_date: datefrom,
      end_date: dateto,
      order_status: self.state.statusIndex,
      order_type: self.state.typeIndex
    };
    request(api, params, function(res) {
      self.setState({
        total_page: res.data.extra_data.total_pages,
        total_order: res.data.extra_data.total_order_count,
        total_income: res.data.extra_data.total_promotion_amount,
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
      nodata: false,
      dateIndex: id,
      orderList: [],
      total_page: 0,
      total_order: 0,
      total_income: 0,
      tabChange: true
    });
    this.getOrders();
  };

  typeChange = async id => {
    this.page = 1;
    await this.setState({
      nodata: false,
      typeIndex: id,
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
      nodata: false,
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
        <Navigation
          title="我的订单"
          refresh={true}
          refresh_page={this.from_kbn}
        />
        <View style={styles.datetab}>
          {this.datelist.map((item, index) => {
            //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                key={index}
                onPress={() => this.dateChange(index)}
              >
                <Text
                  style={[
                    styles.datechild,
                    {
                      color:
                        this.state.dateIndex == index ? "#ff5186" : "#1d1d1f"
                    }
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
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
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.statustab}>
          {this.statuslist.map((item, index) => {
            //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                key={index}
                onPress={() => this.statusChange(index)}
              >
                <Text
                  style={
                    this.state.statusIndex == index
                      ? styles.statuschild_click
                      : styles.statuschild
                  }
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.totaldata}>
          <Text style={styles.totalorder}>订单数 {this.state.total_order}</Text>
          <Text style={styles.totalincome}>
            佣金￥{this.state.total_income}
          </Text>
        </View>
        {this.state.orderList != "" ? (
          <ScrollView
            // eslint-disable-next-line react/no-string-refs
            ref="_scrollview"
          >
            <FlatList
              style={styles.orderList}
              // horizontal={true}
              // showsHorizontalScrollIndicator={false}
              data={this.state.orderList}
              renderItem={this.renderItem}
              keyExtractor={keyExtractor}
            />
            <Pagination
              onRef={this.onRef}
              pageNum={this.state.total_page}
              tabChange={this.state.tabChange}
              changePageCallBack={this.getOrder}
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

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.goodsClick(item.goods_id)}
      >
        <View style={styles.child}>
          <View style={styles.childtop}>
            <Image
              style={styles.left}
              source={{ uri: item.goods_thumbnail_url }}
            />
            <View style={styles.right}>
              <Text style={styles.righttop}>{item.goods_name}</Text>
              <View style={styles.rightdown}>
                <Image
                  style={styles.chatimg}
                  source={
                    item.avatar_url
                      ? { uri: item.avatar_url }
                      : require("../image/common_icon_head.png")
                  }
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
              <Text style={styles.promote}>
                获得佣金￥{item.total_promotion_amount}×{item.promotion_rate}=￥
                {item.promotion_amount}
              </Text>
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
