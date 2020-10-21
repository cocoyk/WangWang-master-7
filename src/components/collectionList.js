import React, { useState } from "react";
import pxToDp from "../util/util.js";
import { useNavigation } from "@react-navigation/native";

import {
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { block, color } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";

function CollectionList(props) {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [role, setRole] = useState(1);
  const [productList, setProductList] = useState([]);
  const [testNomore, setTestNomore] = useState(true);

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.push("Detail", { item: item });
        }}
      >
        <View style={styles.container}>
          <Image
            resizeMode="stretch"
            source={{
              uri: item.goods_img.startsWith("https:")
                ? item.goods_img
                : "https:" + item.goods_img,
            }}
            style={styles.thumbnail}
          />
          {/* {!props.typehidden &&
            (item.merchant_type == 3 ||
              item.merchant_type == 4 ||
              item.merchant_type == 5) && (
              <Text
                style={[
                  styles.mallname,
                  {
                    backgroundColor:
                      item.merchant_type == 3
                        ? '#ff5186'
                        : item.merchant_type == 4
                        ? '#FF51B7'
                        : '#FA6D47',
                  },
                ]}>
                {item.mall_name}
              </Text>
            )} */}
          <View style={styles.goodsinfo}>
            <Text numberOfLines={2} style={styles.goodsname}>
              {item.platform == 1 ? (
                <Image
                  style={styles.platformlogo}
                  source={require("../image/pinduoduo.png")}
                />
              ) : item.platform == 2 ? (
                <Image
                  style={styles.platformlogo}
                  source={require("../image/taobao.png")}
                />
              ) : (
                <Image
                  style={styles.platformlogo}
                  source={require("../image/jingdong.png")}
                />
              )}{" "}
              {item.goods_name}
            </Text>

            <View style={styles.top}>
              <View
                style={{
                  flexDirection: "row-reverse",
                  padding: pxToDp(10),
                }}
              >
                {/* <Image
                  resizeMode="stretch"
                  source={{
                    uri: item.pict_url.startsWith('https:')
                      ? item.pict_url
                      : 'https:' + item.pict_url,
                  }}
                  style={styles.buyerImage}
                />
                <Image
                  resizeMode="stretch"
                  source={{
                    uri: item.pict_url.startsWith('https:')
                      ? item.pict_url
                      : 'https:' + item.pict_url,
                  }}
                  style={styles.buyerImage}
                />
                <Image
                  resizeMode="stretch"
                  source={{
                    uri: item.pict_url.startsWith('https:')
                      ? item.pict_url
                      : 'https:' + item.pict_url,
                  }}
                  style={styles.buyerImage}
                />
                <Image
                  resizeMode="stretch"
                  source={{
                    uri: item.pict_url.startsWith('https:')
                      ? item.pict_url
                      : 'https:' + item.pict_url,
                  }}
                  style={styles.buyerImage}
                /> */}
                <View
                  style={{
                    direction: "column",
                    width: pxToDp(370),
                  }}
                >
                  <LinearGradient
                    style={styles.coupondiscount}
                    start={{ x: 0.2, y: 0 }}
                    end={{ x: 0.8, y: 0 }}
                    colors={["#ff4d00", "#FD8B11"]}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: pxToDp(24),
                        marginLeft: pxToDp(5),
                      }}
                    >
                      {item.coupon_discount + "元券"}
                    </Text>
                  </LinearGradient>
                  <View
                    style={{
                      marginTop: pxToDp(5),
                      flexDirection: "row",
                      alignSelf: "stretch",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: "grey",
                        textDecorationLine: "line-through",
                        lineHeight: pxToDp(28),
                        fontSize: pxToDp(22),
                        marginTop: pxToDp(10),
                      }}
                    >
                      ￥原价{item.min_group_price}
                    </Text>
                    <Text style={styles.saleacount}>
                      已售{item.sold_quantity}单
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "whitesmoke",
                width: pxToDp(400),
                height: pxToDp(2),
              }}
            ></View>
            <View style={styles.down}>
              <View style={styles.price}>
                <View style={{ direction: "column" }}>
                  <Text
                    style={{
                      color: "#ff4d00",
                      // lineHeight: pxToDp(28),
                      marginBottom: pxToDp(5),
                      fontSize: pxToDp(22),
                      fontWeight: "bold",
                    }}
                  >
                    券后价
                  </Text>

                  <Text
                    style={{
                      color: "#ff4d00",
                      // lineHeight: pxToDp(28),
                      fontSize: pxToDp(30),
                      fontWeight: "bold",
                    }}
                  >
                    {"￥" + item.sale_price}
                  </Text>
                </View>

                <LinearGradient
                  style={styles.buynow}
                  start={{ x: 0.2, y: 0 }}
                  end={{ x: 0.8, y: 0 }}
                  colors={["#ff4d00", "#FD8B11"]}
                >
                  {/* <Text style={{color: 'white', fontSize: pxToDp(24)}}>
                    90元券
                  </Text> */}
                  <Text style={{ color: "white", fontSize: pxToDp(24) }}>
                    查看
                  </Text>
                </LinearGradient>
                {/* <Text
                  style={{
                    color: 'grey',
                    marginLeft: pxToDp(10),
                    textDecorationLine: 'line-through',
                    lineHeight: pxToDp(28),
                    fontSize: pxToDp(22),
                  }}>
                  ￥{(item.zk_final_price - item.coupon_amount).toFixed(2)}
                </Text> */}
              </View>
              {/* {this.state.role != 1 && 0 ? (
                <Text style={styles.promotemoney}>
                  赚￥
                  {this.state.role == 2
                    ? (item.promotion_price * 0.5).toFixed(2)
                    : item.promotion_price.toFixed(2)}
                </Text>
              ) : (
                <Text style={styles.buynow}>立即购买</Text>
              )} */}
            </View>
            <View style={styles.coupondiscount}>
              {/* <LinearGradient
                style={styles.coupon}
                start={{x: 0.2, y: 0}}
                end={{x: 0.8, y: 0}}
                colors={['#ff4d00', 'gold']}>
              </LinearGradient> */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ width: "98%" }}>
      <FlatList
        contentContainerStyle={{
          marginHorizontal: pxToDp(20),
          marginBottom: pxToDp(8),
          // backgroundColor: '#f5f5f9',
          paddingBottom: pxToDp(2),
        }}
        style={styles.goodslist}
        // extraData={this.state}
        // eslint-disable-next-line react/prop-types
        data={props.dataList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      {/* {props.showload ? (
        <View style={styles.loadingArea}>
          {props.nomore ? null : (
            <ActivityIndicator size="small" color="#ff4d00" />
          )}
          <Text style={styles.loadingText}>
            {props.nomore ? '已经到底了' : '正在加载'}
          </Text>
        </View>
      ) : null} */}
    </View>
  );
}
export default CollectionList;
const styles = StyleSheet.create({
  platformlogo: {
    width: pxToDp(26),
    height: pxToDp(26),
  },
  container: {
    alignItems: "center",
    padding: pxToDp(10),
    width: "100%",
    flexDirection: "row",
    marginLeft: pxToDp(8),
    marginBottom: pxToDp(20),
    borderRadius: pxToDp(30),
    backgroundColor: "white",
  },
  thumbnail: {
    width: pxToDp(230),
    height: pxToDp(250),
    borderRadius: pxToDp(10),
    margin: pxToDp(15),
  },
  mallname: {
    position: "absolute",
    top: pxToDp(312),
    left: pxToDp(18),
    height: pxToDp(34),
    fontSize: pxToDp(22),
    lineHeight: pxToDp(34),
    paddingLeft: pxToDp(10),
    paddingRight: pxToDp(10),
    color: "#fff",
    borderColor: "#fff",
    borderWidth: pxToDp(2),
    borderTopLeftRadius: pxToDp(8),
    borderTopRightRadius: pxToDp(8),
    opacity: 0.85,
    zIndex: 10,
  },
  goodsinfo: {
    // width: '90%',
    paddingLeft: pxToDp(10),
    borderBottomLeftRadius: pxToDp(14),
    borderBottomRightRadius: pxToDp(14),
    marginRight: pxToDp(10),
  },
  goodsname: {
    width: pxToDp(330),
    height: pxToDp(74),
    fontSize: pxToDp(26),
    // paddingRight: pxToDp(10),
    color: "#1d1d1f",
    lineHeight: pxToDp(38),
  },
  top: {
    flexDirection: "row",
    marginTop: pxToDp(16),
    alignItems: "center",
    // backgroundColor: '#fff',
  },
  coupondiscount: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: pxToDp(120),
    borderTopLeftRadius: pxToDp(10),
    borderBottomLeftRadius: pxToDp(10),
    borderTopRightRadius: pxToDp(8),
    borderBottomRightRadius: pxToDp(8),
  },
  coupon: {
    padding: pxToDp(8),
    fontSize: pxToDp(22),
    color: "#FFFFFF",
    fontWeight: "bold",
    backgroundColor: "#ff4d00",
    borderRadius: pxToDp(10),
  },
  discount: {
    paddingLeft: pxToDp(6),
    paddingRight: pxToDp(10),
    paddingBottom: pxToDp(2),
    fontSize: pxToDp(22),
    color: "#ff4d00",
    borderTopRightRadius: pxToDp(10),
    borderBottomRightRadius: pxToDp(10),
  },
  saleacount: {
    color: "grey",
    fontSize: pxToDp(22),
    marginTop: pxToDp(10),
  },
  down: {
    flexDirection: "row",
    marginTop: pxToDp(10),

    marginBottom: pxToDp(15),
    justifyContent: "space-between",
  },
  price: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: pxToDp(15),
  },
  promotemoney: {
    textAlign: "right",
    color: "#ffffff",
    backgroundColor: "#ff4d00",
    paddingLeft: pxToDp(16),
    paddingRight: pxToDp(12),
    paddingTop: pxToDp(2),
    paddingBottom: pxToDp(2),
    borderTopLeftRadius: pxToDp(30),
    borderBottomLeftRadius: pxToDp(30),
    fontSize: pxToDp(24),
  },
  buynow: {
    // borderTopLeftRadius: 10,
    // borderBottomRightRadius: 10,
    borderRadius: 5,
    marginTop: pxToDp(23),
    width: pxToDp(200),
    alignItems: "center",

    justifyContent: "center",

    backgroundColor: "#ff4d00",

    paddingTop: pxToDp(2),
    paddingBottom: pxToDp(2),

    fontSize: pxToDp(30),
  },
  nodataArea: {
    marginTop: pxToDp(30),
    textAlign: "center",
    fontSize: pxToDp(36),
  },
  loadingArea: {
    height: pxToDp(120),
    marginTop: pxToDp(30),
    marginBottom: pxToDp(30),
    alignItems: "center",
    textAlign: "center",
  },
  loadingText: {
    color: "#848a99",
    marginTop: pxToDp(10),
  },
  btn: {
    height: pxToDp(35),
    backgroundColor: "#4d796e",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: pxToDp(10),
    borderWidth: pxToDp(2),
    borderColor: "#ffffff",
  },
  goodslist: {
    marginTop: pxToDp(10),
    // backgroundColor: '#FFF',
  },
  buyerImage: {
    marginHorizontal: pxToDp(-3),
    width: pxToDp(45),
    height: pxToDp(45),
    borderRadius: 10000,
  },
});
