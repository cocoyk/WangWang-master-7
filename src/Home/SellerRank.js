/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";

import pxToDp from "../util/util.js";

import {
  Alert,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-community/async-storage";
import request from "../util/Request.js";
function SellerRank({ navigation }) {
  const getRankList = () => {
    AsyncStorage.getItem("token").then((val) => {
      const api = "SellerRank";
      const params = { platform: 99, token: val };
      request(api, params, function (res) {
        console.log(res.data.data.rankingList[0].goods_id);
        setRankData(res.data.data.rankingList);
        // for (var key in obj) {
        //   if (obj.hasOwnProperty(key)) {
        //     var value = obj[key];
        //     console.log(key, value);
        //   }
        // }
      });
    });
  };

  useEffect(() => {
    getRankList();
  }, []);

  const [rankData, setRankData] = useState([]);

  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SellerRankMore", { user_id: item.user_id });
        }}
        activeOpacity={0.9}
      >
        <View style={styles.componentContainer}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                marginTop: pxToDp(10),
                alignSelf: "flex-start",
                width: pxToDp(50),
                height: pxToDp(50),
                borderRadius: pxToDp(100),
                backgroundColor: "gold",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "grey",
                  fontSize: pxToDp(40),
                }}
              >
                {item.index + 1}
              </Text>
            </View>

            <Image
              style={{
                borderRadius: pxToDp(200),
                width: pxToDp(75),
                height: pxToDp(75),
                marginLeft: pxToDp(20),
                borderWidth: pxToDp(2),
              }}
              source={{ uri: item.headimg }}
            />
          </View>

          <View
            style={{
              width: pxToDp(500),
              marginLeft: pxToDp(20),
              backgroundColor: "#fff",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginRight: pxToDp(140),
              }}
            >
              {item.nick_name.length > 5 ? (
                <Text style={{ fontSize: pxToDp(30) }}>
                  {item.nick_name.slice(0, 5) + "..."}
                </Text>
              ) : (
                <Text style={{ fontSize: pxToDp(30) }}>{item.nick_name}</Text>
              )}

              <Text
                style={{
                  padding: pxToDp(5),
                  borderRadius: pxToDp(10),
                  color: "grey",
                  fontSize: pxToDp(25),
                }}
              >
                卖出{item.need_download}单
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingRight: pxToDp(20),
              }}
            >
              {item.goods_id.slice(0, 3).map((el, index) => {
                return (
                  <View style={{ alignItems: "center" }} key={index}>
                    <Image
                      style={{
                        marginTop: pxToDp(20),

                        height: pxToDp(100),
                        width: pxToDp(100),
                      }}
                      source={{
                        uri: el.goods_thumbnail,
                      }}
                    />
                    <Text
                      style={{
                        borderRadius: pxToDp(10),

                        padding: pxToDp(5),
                        color: "grey",
                        fontSize: pxToDp(25),
                      }}
                    >
                      {el.sale_quantity + "单"}
                    </Text>
                  </View>
                );
              })}

              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    marginTop: pxToDp(20),
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f5f5f9",
                    height: pxToDp(100),
                    width: pxToDp(100),
                  }}
                >
                  <Text style={{ fontSize: pxToDp(20), color: "grey" }}>
                    查看更多
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.thumbnail}
        source={require("../image/sellerank_banner.jpeg")}
      />
      <Text style={styles.titleTxt}>今日金牌团长榜 (0:00 -24:00)</Text>
      <View style={{ width: pxToDp(750) }}>
        <FlatList
          contentContainerStyle={{
            marginHorizontal: pxToDp(20),
            marginBottom: pxToDp(8),
            backgroundColor: "#f5f5f9",
            paddingBottom: pxToDp(2),
          }}
          style={styles.goodslist}
          // extraData={this.state}
          // eslint-disable-next-line react/prop-types
          data={rankData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
        {/* {props.showload ? (
        <View style={styles.loadingArea}>
          {props.nomore ? null : (
            <ActivityIndicator size="small" color="#ff5186" />
          )}
          <Text style={styles.loadingText}>
            {props.nomore ? '已经到底了' : '正在加载'}
          </Text>
        </View>
      ) : null} */}
      </View>
    </View>
  );
}
export default SellerRank;

var styles = StyleSheet.create({
  componentContainer: {
    padding: pxToDp(20),
    width: pxToDp(690),
    flexDirection: "row",
    marginHorizontal: pxToDp(8),
    marginBottom: pxToDp(20),
    borderRadius: pxToDp(30),
    backgroundColor: "white",
  },
  titleTxt: { margin: pxToDp(20), fontSize: pxToDp(30) },
  container: {
    flex: 1,

    backgroundColor: "#f5f5f9",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  thumbnail: {
    marginTop: pxToDp(10),
    width: pxToDp(695),
    marginLeft: pxToDp(25),
    height: pxToDp(267),
    borderRadius: pxToDp(20),
  },
});
