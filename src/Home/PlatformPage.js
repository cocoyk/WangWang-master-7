// 淘宝 etc。。。
import React, { useState, useEffect, useCallback } from "react";
import GoodsList from "../components/goodList.js";
import pxToDp from "../util/util.js";

import {
  Alert,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Button,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-simple-toast";
import request from "../util/Request.js";
import LoadingActivity from "../components/loadingActivity.js";

function PlatformPage({ navigation, route }) {
  let page_add = true;
  const [showLoading, setShowLoading] = useState(false);

  const [count, setCount] = useState(0);
  const [currenIndex, setCurrenIndex] = useState(0);
  const [productList, setProductList] = useState([
    // {
    //   item_id: 1,
    //   coupon_id: 2,
    //   pict_url:
    //     "https://i.picsum.photos/id/321/200/300.jpg?hmac=1hjkl5WdcOOj525LK78s0QQQkN0b_qb1_xSacNQfMSk",
    //   goods_thumbnail_url:
    //     "https://i.picsum.photos/id/321/200/300.jpg?hmac=1hjkl5WdcOOj525LK78s0QQQkN0b_qb1_xSacNQfMSk",
    //   merchant_type: 3,
    //   mall_name: "淘宝",
    //   title: "测试 测试 测试 测试 测试 测试",
    //   coupon_amount: 0.28,
    //   volume: 100,
    //   zk_final_price: 12,
    //   min_group_price: 0.01,
    // },
    // {
    //   item_id: 1,
    //   coupon_id: 2,
    //   pict_url:
    //     "https://i.picsum.photos/id/321/200/300.jpg?hmac=1hjkl5WdcOOj525LK78s0QQQkN0b_qb1_xSacNQfMSk",
    //   goods_thumbnail_url:
    //     "https://i.picsum.photos/id/321/200/300.jpg?hmac=1hjkl5WdcOOj525LK78s0QQQkN0b_qb1_xSacNQfMSk",
    //   merchant_type: 3,
    //   mall_name: "淘宝",
    //   title: "测试 测试 测试 测试 测试 测试",
    //   coupon_amount: 1,
    //   volume: 100,
    //   zk_final_price: 12,
    //   min_group_price: 0.01,
    // },
    // {
    //   item_id: 1,
    //   coupon_id: 2,
    //   pict_url:
    //     "https://i.picsum.photos/id/321/200/300.jpg?hmac=1hjkl5WdcOOj525LK78s0QQQkN0b_qb1_xSacNQfMSk",
    //   goods_thumbnail_url:
    //     "https://i.picsum.photos/id/321/200/300.jpg?hmac=1hjkl5WdcOOj525LK78s0QQQkN0b_qb1_xSacNQfMSk",
    //   merchant_type: 3,
    //   mall_name: "淘宝",
    //   title: "测试 测试 测试 测试 测试 测试",
    //   coupon_amount: 1,
    //   volume: 100,
    //   zk_final_price: 12,
    //   min_group_price: 0.01,
    // },
    // {
    //   item_id: 1,
    //   coupon_id: 2,
    //   pict_url:
    //     "https://i.picsum.photos/id/321/200/300.jpg?hmac=1hjkl5WdcOOj525LK78s0QQQkN0b_qb1_xSacNQfMSk",
    //   goods_thumbnail_url:
    //     "https://i.picsum.photos/id/321/200/300.jpg?hmac=1hjkl5WdcOOj525LK78s0QQQkN0b_qb1_xSacNQfMSk",
    //   merchant_type: 3,
    //   mall_name: "淘宝",
    //   title: "测试 测试 测试 测试 测试 测试",
    //   coupon_amount: 1,
    //   volume: 100,
    //   zk_final_price: 12,
    //   min_group_price: 0.01,
    // },
    // {
    //   item_id: 1,
    //   coupon_id: 2,
    //   pict_url:
    //     "https://i.picsum.photos/id/321/200/300.jpg?hmac=1hjkl5WdcOOj525LK78s0QQQkN0b_qb1_xSacNQfMSk",
    //   goods_thumbnail_url:
    //     "https://i.picsum.photos/id/321/200/300.jpg?hmac=1hjkl5WdcOOj525LK78s0QQQkN0b_qb1_xSacNQfMSk",
    //   merchant_type: 3,
    //   mall_name: "淘宝",
    //   title: "测试 测试 测试 测试 测试 测试",
    //   coupon_amount: 1,
    //   volume: 100,
    //   zk_final_price: 12,
    //   min_group_price: 0.01,
    // },
    // {
    //   item_id: 1,
    //   coupon_id: 2,
    //   pict_url:
    //     "https://i.picsum.photos/id/321/200/300.jpg?hmac=1hjkl5WdcOOj525LK78s0QQQkN0b_qb1_xSacNQfMSk",
    //   goods_thumbnail_url:
    //     "https://i.picsum.photos/id/321/200/300.jpg?hmac=1hjkl5WdcOOj525LK78s0QQQkN0b_qb1_xSacNQfMSk",
    //   merchant_type: 3,
    //   mall_name: "淘宝",
    //   title: "测试 测试 测试 测试 测试 测试",
    //   coupon_amount: 1,
    //   volume: 100,
    //   zk_final_price: 12,
    //   min_group_price: 0.01,
    // },
  ]);
  const [sort_type,setSort_type] = useState(0);

  const { platform } = route.params; // platform	char	平台 1拼多多 2淘宝（21天猫） 3京东 99 全部平台
  const [optId,setOptId] = useState(0); // optId	int	分类ID 默认0
  const [coptId, setCoptId] = useState(0); // coptId	int	子分类ID 默认0
  const [withCoupon, setWithCoupon] = useState(0); // withCoupon	int	是否只返回有券商品 默认0
  const [keywords, setKeywords] = useState(""); // keywords	string	关键字
  //const [priceMin, setPriceMin] = useState(0); // priceMin	float	最小价格
  //const [priceMax, setPriceMax] = useState(0); // priceMax	float	最大价格
  //const [shopType, setShopType] = useState(0); // shopType	int	 3旗舰店 4专卖店 5专营店
  const [isBrandGoods, setIsBrandGoods] = useState(0);    // isBrandGoods	int	是否只返回品牌商品 默认0 
  const [pageNo, setPageNo] = useState(1); // pageNo	int	页码
  const [sortNow, setSortNow] = useState(0); // sortNow	int	排序方式 待定 默认0 综合排序
  const [listId, setListId] = useState(""); // listId	string	扩展参数
  const [type, setType] = useState(0); // type	int	0商品 1店铺

  const [fadeAnimationVal, setFadeAnimationVal] = useState(
    new Animated.Value(0)
  );

  const getAllGoods = () => {
    setShowLoading(true);
    AsyncStorage.getItem("token").then((val) => {
      const api = "getAllGoods";
      const param = {
        platform,
        pageNo,
        sortNow,
        token:val
      };

      request(
        api,
        param,
        function (res) {
          setShowLoading(false);
          let goodList = res.data.data.goodsList || [];
          setProductList(goodList);
        },
        function (res) {
          setShowLoading(false);
          Toast.show("网络错误", Toast.SHORT);
        }
      );
    });
  };

  useEffect(() => {
    if (currenIndex < 5) {
      navigation.setOptions({
        headerTintColor: "white",
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,

          backgroundColor: "#ff4200",
        },
        headerTitle: "淘宝天猫",
        headerTitleStyle: { alignSelf: "center" },
        headerRight: () => <View></View>,
      });
    } else {
      navigation.setOptions({
        headerTintColor: "black",
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,

          backgroundColor: "white",
        },
        headerTitle: "淘宝天猫",
        headerTitleStyle: { alignSelf: "center" },
        headerRight: () => <View></View>,
      });
    }
  }, [currenIndex]);

  useEffect(() => {
    getAllGoods();
  }, [sortNow,sort_type]);

  const setPageAddToTrue = () => {
    page_add = true;
  };

  const onScroll = async (event) => {
    let contentHeight = event.nativeEvent.contentSize.height; //内容高度
    let pageHeight = event.nativeEvent.layoutMeasurement.height; //屏幕高度
    let scrollHeight = event.nativeEvent.contentOffset.y; //滑动距离

    console.log(scrollHeight)
    setCurrenIndex(scrollHeight);

    if (page_add) {
      if (
        scrollHeight + pageHeight + 20 >= contentHeight &&
        contentHeight >= pageHeight
      ) {
        setPage(page + 1);
        page_add = false;
      }
    }
  };

  const MemoGoodsList = React.memo(({ productList }) => {
    console.log("rendered");
    return (
      <GoodsList
        //   showload={showLoading}
        //   nomore={noMore}
        dataList={productList}
      />
    );
  });

  //价格排序
  const sortCondition = ()=>{
    //如果当前选中的不是价格 则选中价格
    if(sortNow!==3){
      setSortNow(3);
    }else{
      //如果当前选中的是价格 切换价格正序倒叙排序
      if(sort_type===0){
        setSort_type(3);
      }else{
        setSort_type(0);
      }
    }
  }

  return (
    <View style={styles.container}>
      {currenIndex < 5 && (
        <View
          style={{
            flex: 1,
            backgroundColor: "#ff4200",
            alignSelf: "stretch",
            justifyContent: "flex-end",
            paddingVertical: pxToDp(40),
          }}
        >
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Search");
              }}
            >
              <View
                style={{
                  borderRadius: pxToDp(100),
                  margin: pxToDp(20),
                  flexDirection: "row",
                  backgroundColor: "white",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", margin: pxToDp(20) }}>
                  <Image
                    style={styles.searchlogo}
                    source={require("../image/search_icon.png")}
                  />
                  <Text style={{ color: "grey" }}>复制标题 搜索优惠券</Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    borderTopRightRadius: pxToDp(100),
                    borderBottomRightRadius: pxToDp(100),
                    paddingHorizontal: pxToDp(30),
                    alignItems: "center",
                    backgroundColor: "gold",
                  }}
                >
                  <Text style={{ color: "white" }}>搜商品</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View
        style={{
          flex: 4,

          alignSelf: "stretch",
        }}
      >
        <View style={styles.condition_area}>
          <TouchableOpacity activeOpacity={0.8} onPress={()=>{setSortNow(0)}}>
            <Text
              style={[
                styles.condition,
                {
                  color: sortNow === 0 ? "#ff5186" : "#3f4450",
                },
              ]}
            >
              综合
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={()=>{setSortNow(2)}}>
            <Text
              style={[
                styles.condition,
                {
                  color: sortNow === 2 ? "#ff5186" : "#3f4450",
                },
              ]}
            >
              销量
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={()=>sortCondition()}
          >
            <Text
              style={[
                styles.condition,
                {
                  color: sortNow === 3 ? "#ff5186" : "#3f4450",
                },
              ]}
            >
              价格
            </Text>
            <Image
              style={{
                width: pxToDp(28),
                height: pxToDp(28),
              }}
              source={
                sortNow === 3
                  ? sort_type === 3
                    ? require("../image/price_up.png")
                    : require("../image/price_down.png")
                  : require("../image/price_normal.png")
              }
            />
          </TouchableOpacity>
        </View>

        <ScrollView onScroll={onScroll}>
          <MemoGoodsList productList={productList} />
        </ScrollView>
      </View>
      {showLoading === true && (
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              opacity: 0.6,
              width: pxToDp(150),
              height: pxToDp(150),
              borderRadius: pxToDp(20),
              backgroundColor: "grey",
            }}
          >
            <LoadingActivity />
          </View>
        </View>
      )}
    </View>
  );
}
export default PlatformPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#f5f5f9",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  searchlogo: {
    // position: "absolute",
    marginRight: pxToDp(15),
    width: pxToDp(33),
    height: pxToDp(33),
    // left: pxToDp(50)
  },
  condition_area: {
    height: pxToDp(80),
    paddingTop: pxToDp(-2),
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  condition: {
    fontSize: pxToDp(32),
  },
});
