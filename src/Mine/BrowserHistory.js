import React, { Component } from "react";
import pxToDp from "../../util/util";
import request from "../../util/Request";
import ProductList from "../component/productList";
import Navigation from "../component/navigation";
import LoadingActivity from "../component/loadingActivity";
import AsyncStorage from "@react-native-community/async-storage";
import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  StyleSheet
} from "react-native";

export default class BrowserHistory extends Component {
  page = 1;
  keyHistory = "";

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      productList: [],
      showloading: false,
      nodata: false,
      nomore: false
    };
  }

  componentDidMount() {
    this.getHistory();
  }

  onscroll(event) {
    //  this.page++
    // console.log('next',event)
    let contentHeight = event.nativeEvent.contentSize.height; //内容高度
    let pageHeight = event.nativeEvent.layoutMeasurement.height; //屏幕高度
    let scrollHeight = event.nativeEvent.contentOffset.y; //滑动距离
    this.setState({
      showloading: true
    });
    if (
      scrollHeight + pageHeight + 20 >= contentHeight &&
      contentHeight >= pageHeight
    ) {
      this.page++;
      this.getProduct();
    }
  }

  getProduct = () => {
    const self = this;
    const api = "read_history";
    const params = { goods_list: self.keyHistory, page: self.page };
    request(api, params, function(res) {
      var productlist;
      if (self.page == 1) {
        productlist = res.data.data;
      } else {
        var templist = self.state.productList;
        productlist = templist.concat(res.data.data);
      }
      self.setState({
        productList: productlist,
        nodata: res.data.data == "" && self.page == 1,
        nomore: res.data.data == "" && self.page != 1
      });
    });
  };

  getHistory = async () => {
    const self = this;
    const keyHistory = await AsyncStorage.getItem("browser_history");
    if (keyHistory) {
      this.keyHistory = keyHistory;
      this.getProduct();
    } else {
      self.setState({
        nodata: true
      });
    }
  };

  onRefresh = () => {
    const self = this;
    self.page = 1;
    self.setState({
      refreshing: true
    });
    self.getHistory();
    setTimeout(() => {
      this.setState({
        refreshing: false
      });
    }, 2000);
  };

  render() {
    return (
      <View style={styles.container}>
        <Navigation title="商品收藏" refresh={true} refresh_page="Mine" />
        <ScrollView
          onScroll={event => this.onscroll(event)}
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
          {this.state.nodata ? (
            <View style={styles.nodata}>
              <Text style={styles.nodata1}>暂无浏览历史</Text>
              <Image
                style={styles.nodata2}
                source={require("../image/search_img_none.png")}
              />
              <Text style={styles.nodata3}>去逛一逛商品吧~</Text>
            </View>
          ) : this.state.productList != "" ? (
            <ProductList
              showload={this.state.showloading}
              nomore={this.state.nomore}
              dataList={this.state.productList}
            />
          ) : (
            <View style={{ marginTop: pxToDp(300) }}>
              <LoadingActivity />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: pxToDp(750),
    backgroundColor: "#f5f5f9"
  },
  nodata: {
    alignItems: "center",
    backgroundColor: "#f5f5f9"
  },
  nodata1: {
    marginTop: pxToDp(170),
    marginBottom: pxToDp(40),
    fontSize: pxToDp(40),
    color: "#1d1d1f"
  },
  nodata2: {
    width: pxToDp(330),
    height: pxToDp(250)
  },
  nodata3: {
    color: "#1d1d1f",
    marginTop: pxToDp(40),
    fontSize: pxToDp(24)
  }
});
