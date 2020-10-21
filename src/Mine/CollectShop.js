import React, { Component } from "react";
import pxToDp from "../../util/util";
import request from "../../util/Request";
import Navigation from "../component/navigation";
import ShopList from "../component/shopList";
import LoadingActivity from "../component/loadingActivity";
import {
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  StyleSheet
} from "react-native";

export default class CollectShop extends Component {
  page = 1;

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      shopList: [],
      showloading: false,
      nodata: false,
      nomore: false
    };
  }

  getShop = () => {
    const self = this;
    const api = "collection_mall_list";
    const params = { page: this.page };
    request(api, params, function(res) {
      var shoplist;
      if (self.page == 1) {
        shoplist = res.data.data;
      } else {
        var templist = self.state.shopList;
        shoplist = templist.concat(res.data.data);
      }
      self.setState({
        shopList: shoplist,
        nodata: res.data.data == "" && self.page == 1,
        nomore: res.data.data == "" && self.page != 1
      });
    });
  };

  componentDidMount() {
    this.getShop();
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
      this.getShop();
    }
  }

  onRefresh = () => {
    const self = this;
    self.page = 1;
    self.setState({
      refreshing: true
    });
    self.getShop();
    setTimeout(() => {
      this.setState({
        refreshing: false
      });
    }, 2000);
  };

  render() {
    return (
      <View style={styles.container}>
        <Navigation title="店铺收藏" refresh={true} refresh_page="Mine" />
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
              <Text style={styles.nodataup}>暂无收藏店铺</Text>
              <Image
                style={styles.nodatacenter}
                source={require("../image/common_img_store.png")}
              />
              <Text style={styles.nodatadown}>去逛一逛收藏店铺吧~</Text>
            </View>
          ) : this.state.shopList != "" ? (
            <ShopList
              showload={this.state.showloading}
              dataList={this.state.shopList}
              nomore={this.state.nomore}
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
    width: pxToDp(750),
    alignItems: "center"
  },
  nodataup: {
    margin: pxToDp(50),
    color: "#3f4450",
    fontSize: pxToDp(36),
    fontWeight: "bold"
  },
  nodatacenter: {
    width: pxToDp(300),
    height: pxToDp(249)
  },
  nodatadown: {
    margin: pxToDp(50),
    fontSize: pxToDp(24),
    color: "#3f4450"
  }
});
