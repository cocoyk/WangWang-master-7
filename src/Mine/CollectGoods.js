/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import pxToDp from "../util/util.js";
import ProductList from "../components/productList.js";

import LoadingActivity from "../components/loadingActivity.js";
import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import request from "../util/Request.js";
import GoodsList from "../components/goodList.js";
import CollectionList from "../components/collectionList.js";

function CollectGoods({navigation}) {
  // let theme_id = '';

  const [refreshing, setRefreshing] = useState(false);

  const [productList, setProductList] = useState([]);
  const [showloading, setShowloading] = useState(false);
  const [nodata, setNodata] = useState(false);
  const [nomore, setNomore] = useState(false);
  const [page, setPage] = useState(1);
  const [pageAdd, setPageAdd] = useState(true);

  useEffect(() => {
    getCollectionGoods();
  }, [page]);

  const getCollectionGoods = () => {
    setShowloading(true);
    AsyncStorage.getItem("token").then((val) => {
      const api = "collection_goods_list";
      const params = { token: val, pageNo: page };
      request(api, params, function (res) {
        setShowloading(false);
        if (page === 1) {
          setProductList(res.data.data.collectList);
        } else {
          let tempList = productList;
          tempList.concat(res.data.data.collectList);
          setProductList(tempList);
        }
      },function(res){
        navigation.navigate('Login');
      });
      setPageAdd(true);
    });
  };

  const onSlideScroll = async (event) => {
    let contentHeight = event.nativeEvent.contentSize.height; //内容高度
    let pageHeight = event.nativeEvent.layoutMeasurement.height; //屏幕高度
    let scrollHeight = event.nativeEvent.contentOffset.y; //滑动距离

    if (pageAdd) {
      if (
        scrollHeight + pageHeight + 20 >= contentHeight &&
        contentHeight >= pageHeight
      ) {
        setPage(page + 1);

        setPageAdd(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={onSlideScroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            progressBackgroundColor="#fff"
            // colors="#ff5186"

            colors={["#ff0000", "#ff5186", "#4AC1A4"]}
            enabled={true}
            tintColor="#ff5186"
            title="正在刷新..."
            titleColor="#eaeaef"
          />
        }
      >
        {nodata ? (
          <View style={styles.nodata}>
            <Text style={styles.nodata1}>暂无收藏商品</Text>
            <Image
              style={styles.nodata2}
              source={require("../image/search_img_none.png")}
            />
            <Text style={styles.nodata3}>去逛一逛收藏商品吧~</Text>
          </View>
        ) : productList !== "" ? (
          <CollectionList
            showload={showloading}
            nomore={nomore}
            dataList={productList}
          />
        ) : (
          <View style={{ marginTop: pxToDp(300) }}>
            <LoadingActivity />
          </View>
        )}
      </ScrollView>
      {showloading === true && (
        <View
          style={{
            padding: pxToDp(30),
            opacity: 0.6,
            marginVertical: pxToDp(520),
            marginHorizontal: pxToDp(300),
            borderRadius: pxToDp(20),
            backgroundColor: "grey",
            position: "absolute",
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <LoadingActivity />
        </View>
      )}
    </View>
  );
}
export default CollectGoods;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: pxToDp(750),
    backgroundColor: "#f5f5f9",
  },
  nodata: {
    alignItems: "center",
    backgroundColor: "#f5f5f9",
  },
  nodata1: {
    marginTop: pxToDp(170),
    marginBottom: pxToDp(40),
    fontSize: pxToDp(40),
    color: "#1d1d1f",
  },
  nodata2: {
    width: pxToDp(330),
    height: pxToDp(250),
  },
  nodata3: {
    color: "#1d1d1f",
    marginTop: pxToDp(40),
    fontSize: pxToDp(24),
  },
});
