/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import pxToDp from "../util/util";
import LinearGradient from "react-native-linear-gradient";
import { FlatList } from "react-native-gesture-handler";
import request from "../util/Request";
import Clipboard from "@react-native-community/clipboard";
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-community/async-storage";
import LoadingActivity from "../components/loadingActivity.js";
import * as WeChat from "react-native-wechat-lib";

function Explore({ navigation }) {
  const [pageAdd, setPageAdd] = useState(true);
  const [exploreList, setExploreList] = useState([]);
  const [page, setPage] = useState(1);
  const [showLoading, setShowLoading] = useState(false);

  const openApp = () => {
    Linking.canOpenURL("weixin://")
      .then((supported) => {
        if (!supported) {
          console.log("无法打开");
        } else {
          return Linking.openURL("weixin://");
        }
      })
      .catch((err) => {
        console.log(err);
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

  const getPromotionUrl = (id) => {
    console.log(id);
    AsyncStorage.getItem("token").then((val) => {
      const api = "goodspromotionurl";
      const params = { goodsId: id, platform: 1, token: val };
      request(
        api,
        params,
        function (res) {
          let text =
            res.data.data.shareTemplateArr[0] +
            res.data.data.shareTemplateArr[1] +
            res.data.data.shareTemplateArr[2] +
            res.data.data.shareTemplateArr[3] +
            res.data.data.shareTemplateArr[4] +
            res.data.data.shareTemplateArr[99];
          console.log(text);
          Clipboard.setString(text);
          Toast.show("已复制分享链接到粘贴板", Toast.SHORT);
        },
        function (res) {
          navigation.navigate('Login');
        }
      );
    });
  };

  useEffect(() => {
    WeChat.registerApp("wxa9a9b64733462cf2", "https://pinkequan.cn/");
  }, []);

  const share = (id) => {
    AsyncStorage.getItem("token").then((value) => {
      const api = "goodspromotionurl";

      const params = { platform: 99, goodsId: id, token: value };
      request(api, params, function (res) {
        WeChat.shareImage({
          imageUrl: res.data.data.share_img,
          scene: 0,
        });
      });
    });
  };

  useEffect(() => {
    getVideoList();
  }, [page]);

  const getVideoList = () => {
    setShowLoading(true);
    const api = "getVideoList";
    const params = { platform: 99, pageNo: page, my: 0 };
    request(
      api,
      params,
      function (res) {
        setShowLoading(false);
        if (page === 1) {
          setExploreList(res.data.data.tuijianList);
        } else {
          let tempList = exploreList.concat(res.data.data.tuijianList);

          setExploreList(tempList);
          console.log("内容", exploreList.length);
        }
      },
      function (res) {
       Toast.show('网络错误',Toast.SHORT);
      }
    );
    setPageAdd(true);
  };

  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.9}>
        <View style={styles.itemContainer}>
          <Image
            style={{
              width: pxToDp(50),
              height: pxToDp(50),
              alignSelf: "flex-start",
            }}
            source={require("../image/pinduoduo.png")}
          />
          <View style={{ flex: 1, marginLeft: pxToDp(20) }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>精选商品</Text>
              <Text
                style={{
                  opacity: 0.6,
                  fontSize: pxToDp(26),
                }}
              >
                {item.add_time2}
              </Text>
            </View>
            <View style={{ marginVertical: pxToDp(20) }}>
              <Text>{item.title}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Image
                style={{
                  height: pxToDp(375),
                  width: pxToDp(375),
                  borderRadius: pxToDp(5),
                }}
                source={{ uri: item.goods_gallery_urls[0] }}
              />
              <View>
                <Image
                  style={{
                    height: pxToDp(175),
                    width: pxToDp(175),
                    borderRadius: pxToDp(5),
                    marginBottom: pxToDp(25),
                  }}
                  source={{ uri: item.goods_gallery_urls[1] }}
                />
                <Image
                  style={{
                    height: pxToDp(175),
                    width: pxToDp(175),
                    borderRadius: pxToDp(5),
                  }}
                  source={{ uri: item.goods_gallery_urls[2] }}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (item.coupon_remain_quantity !== 0) {
                  navigation.navigate("Detail", { item: item });
                }
              }}
            >
              <LinearGradient
                style={{
                  marginTop: pxToDp(25),
                  borderRadius: pxToDp(10),
                }}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 0.8, y: 0 }}
                colors={
                  item.coupon_remain_quantity !== 0
                    ? ["#FD8B11", "#ff4d00"]
                    : ["#999999", "#747373"]
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      flex: 3,
                      padding: pxToDp(20),
                      borderStyle: "dotted",
                      borderTopRightRadius: 1,
                      borderBottomRightRadius: 1,
                      borderRightWidth: 1.5,
                      borderColor: "white",
                      borderRightColor: "red",
                    }}
                  >
                    <Text style={{ color: "white", fontSize: pxToDp(25) }}>
                      {item.coupon_discount + "元优惠券"}
                    </Text>
                    <Text style={{ color: "white", fontSize: pxToDp(25) }}>
                      {item.coupon_end_time + "前使用"}
                    </Text>
                  </View>
                  {item.coupon_remain_quantity !== 0 ? (
                    <View
                      style={{
                        alignItems: "center",
                        flex: 2,
                        padding: pxToDp(20),
                      }}
                    >
                      <Text style={{ color: "white", fontSize: pxToDp(25) }}>
                        立即领券
                      </Text>
                      <Text style={{ color: "white", fontSize: pxToDp(25) }}>
                        {"剩余" + item.coupon_remain_quantity + "张券"}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 2,
                        padding: pxToDp(20),
                      }}
                    >
                      <Text style={{ color: "white", fontSize: pxToDp(30) }}>
                        券已抢完
                      </Text>
                    </View>
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: pxToDp(20),
              }}
            >
              <Image
                style={{
                  alignSelf: "center",
                  height: pxToDp(45),
                  width: pxToDp(45),
                  borderRadius: pxToDp(100),
                  marginRight: pxToDp(10),
                }}
                source={{ uri: item.share_img[0] }}
              />
              <Image
                style={{
                  alignSelf: "center",
                  height: pxToDp(45),
                  width: pxToDp(45),
                  borderRadius: pxToDp(100),
                  marginRight: pxToDp(10),
                }}
                source={{ uri: item.share_img[1] }}
              />
              <Image
                style={{
                  alignSelf: "center",
                  height: pxToDp(45),
                  width: pxToDp(45),
                  borderRadius: pxToDp(100),
                  marginRight: pxToDp(10),
                }}
                source={{ uri: item.share_img[2] }}
              />
              <Text style={{ color: "grey", fontSize: pxToDp(25) }}>
                {"等" + item.share_num + "人已抢到"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: pxToDp(20),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  getPromotionUrl(item.goods_id);
                }}
                style={{ marginRight: pxToDp(30) }}
              >
                <View
                  style={{
                    width: pxToDp(150),
                    height: pxToDp(50),
                    borderRadius: pxToDp(100),
                    backgroundColor: "#FD8B11",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: pxToDp(25),
                    }}
                  >
                    一键保存
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  getPromotionUrl(item.goods_id);
                  openApp();
                }}
              >
                <View
                  style={{
                    width: pxToDp(150),
                    height: pxToDp(50),
                    borderRadius: pxToDp(100),
                    backgroundColor: "#ff4d00",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: pxToDp(25),
                    }}
                  >
                    分享
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          alignSelf: 'stretch',
          justifyContent: 'space-evenly',
        }}>
        <Text style={styles.platformLabel}>拼多多</Text>
        <Text style={styles.platformLabel}>淘宝</Text>
        <Text style={styles.platformLabel}>营销素材</Text>
      </View> */}

      <View
        style={{ alignContent: "center", justifyContent: "center", flex: 1 }}
      >
        <ScrollView onScroll={onSlideScroll}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: pxToDp(690),
                height: pxToDp(294),
                marginHorizontal: pxToDp(20),
                marginBottom: pxToDp(20),

                borderRadius: pxToDp(20),
              }}
              source={require("../image/exolore_banner.jpeg")}
            />
          </View>
          <FlatList
            contentContainerStyle={{
              marginHorizontal: pxToDp(20),
              marginBottom: pxToDp(8),
              backgroundColor: "#f5f5f9",
              paddingBottom: pxToDp(2),
            }}
            style={{ alignSelf: "center" }}
            data={exploreList}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
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
export default Explore;

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    padding: pxToDp(25),
    width: pxToDp(690),
    flexDirection: "row",
    marginHorizontal: pxToDp(8),
    marginBottom: pxToDp(20),
    borderRadius: pxToDp(30),
    backgroundColor: "white",
  },

  container: {
    flex: 1,

    backgroundColor: "#f5f5f9",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  platformLabel: {
    fontSize: pxToDp(32),
    marginVertical: pxToDp(15),
    color: "grey",
  },
  typeLabel: {
    backgroundColor: "white",
    fontSize: pxToDp(30),
    color: "grey",
    paddingHorizontal: pxToDp(35),
    borderRadius: pxToDp(100),
    marginHorizontal: pxToDp(20),
  },
});
