import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import Clipboard from "@react-native-community/clipboard";
import Toast from "react-native-simple-toast";
import * as Progress from "react-native-progress";
import pxToDp from "../util/util.js";
import request from "../util/Request.js";
import AsyncStorage from "@react-native-community/async-storage";
import Modal from "react-native-modal";
import LoadingActivity from "../components/loadingActivity.js";

function Newbie({navigation}) {
  const windowWidth = Dimensions.get("window").width;
  const [data, setdata] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [showLoading, setShowLoading] = useState(false);

  const goToApp = (appurl) => {
    console.log("打开APP");
    Linking.canOpenURL(appurl)
      .then((canOpen) => {
        if (!canOpen) {
          console.log("打开web url: ");
        } else {
          console.log("打开app url: " + appurl);
          return Linking.openURL(appurl).catch((err) =>
            console.error("An error occurred", err)
          );
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };
  const getFreeGoods = () => {
    AsyncStorage.getItem("token").then((val) => {
      const api = "getFreeGoods";
      const params = { platform: 1, token: val };
      request(api, params, function (res) {
        var goodsList = res.data.data.goodsList;
        var goodsListArr = [];
        for (var key in goodsList) {
          if (goodsList.hasOwnProperty(key)) {
            goodsListArr.push(goodsList[key]);
          }
        }
        console.log(goodsListArr[2]);
        setdata(goodsListArr);
        setShowLoading(false);
      },function(res){
        navigation.navigate('Login');
      });
    });
  };

  const checkFreeGoods = (id) => {
    AsyncStorage.getItem("token").then((val) => {
      const api = "checkFreeGoods";
      const params = { platform: 1, token: val, configId: id };
      request(
        api,
        params,
        function (res) {
          setModalVisible(true);
          console.log(res.data.data);
          setShowLoading(false);
        },
        function (err) {
          Toast.show(err.data.message);
          setShowLoading(false);
        }
      );
    });
  };

  const lockFreeGoods = (id) => {
    AsyncStorage.getItem("token").then((val) => {
      const api = "lockFreeGoods";
      const params = { platform: 1, token: val, configId: id };
      request(
        api,
        params,
        function (res) {
          setModalVisible(false);
          setShowLoading(false);
        },
        function (err) {
          Toast.show(err.data.message);
          setShowLoading(false);
        }
      );
    });
  };

  useEffect(() => {
    setShowLoading(true);
    getFreeGoods();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setShowLoading(true);
          checkFreeGoods(item.id);
          setSelectedItem(item);
        }}
      >
        <View style={styles.itemContainer}>
          <Image
            resizeMode="stretch"
            source={{
              uri: item.goods_img.startsWith("https:")
                ? item.goods_img
                : "https:" + item.goods_img,
            }}
            style={styles.thumbnail}
          />
          <View style={styles.goodsinfo}>
            <Text numberOfLines={2} style={styles.goodsname}>
              {item.goods_name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: pxToDp(10),
                paddingRight: pxToDp(20),
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: pxToDp(20),
                    color: "grey",
                  }}
                >
                  原价 ¥{item.min_price}
                </Text>
                <Text style={{ color: "#D8284B" }}>
                  奖励佣金 ¥ {item.goodsInfo.promotion_amount}
                </Text>
              </View>
              <LinearGradient
                style={{
                  borderRadius: pxToDp(30),
                  backgroundColor: "orange",
                  paddingVertical: pxToDp(5),
                  paddingHorizontal: pxToDp(25),
                }}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 0.8, y: 0 }}
                colors={["#FD8B11", "#ff4d00"]}
              >
                <View>
                  <Text style={{ color: "white", fontSize: pxToDp(30) }}>
                    {item.now_price}元抢
                  </Text>
                </View>
              </LinearGradient>
            </View>
            <View
              style={{
                marginTop: pxToDp(10),
                marginBottom: pxToDp(10),
                marginRight: pxToDp(20),
                alignSelf: "stretch",
                height: pxToDp(2),
                backgroundColor: "whitesmoke",
              }}
            />
            <View
              style={{ paddingRight: pxToDp(20), paddingVertical: pxToDp(5) }}
            >
              <Progress.Bar
                color="#E71D1A"
                borderRadius={pxToDp(50)}
                borderColor="transparent"
                unfilledColor="#FB8D6D"
                progress={1 - item.return_num / item.weight}
                width={null}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingRight: pxToDp(20),
              }}
            >
              <Text style={{ color: "grey" }}>共{item.weight}单</Text>
              <Text style={{ color: "grey" }}>剩余{item.return_num}单</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        style={{ width: windowWidth, height: windowWidth * 1.22 }}
        source={require("../image/newbie_bg.jpg")}
      />
      <FlatList renderItem={renderItem} data={data} />
      <Modal isVisible={modalVisible}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              borderRadius: pxToDp(20),
              backgroundColor: "white",
              width: windowWidth - pxToDp(300),
              height: (windowWidth - pxToDp(300)) * 0.5,
              padding: pxToDp(10),
              alignItems: "center",
            }}
          >
            <Text>提示</Text>
            <Text style={{ marginTop: pxToDp(20), fontSize: pxToDp(30) }}>
              付款{selectedItem.min_price}元，补贴{selectedItem.min_price}
              元！！！
            </Text>
            <Text style={{ fontSize: pxToDp(20) }}>
              (新人限购1单，平台补贴)
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowLoading(true);
                lockFreeGoods(selectedItem.id);
                setModalVisible(false);
              }}
              style={{
                width: windowWidth - pxToDp(300),
                paddingVertical: pxToDp(10),
                borderBottomLeftRadius: pxToDp(20),
                borderBottomRightRadius: pxToDp(20),
                alignSelf: "baseline",
                bottom: 0,
                position: "absolute",
                alignItems: "center",
                backgroundColor: "red",
              }}
            >
              <LinearGradient
                style={{
                  width: windowWidth - pxToDp(300),
                  paddingVertical: pxToDp(10),
                  borderBottomLeftRadius: pxToDp(20),
                  borderBottomRightRadius: pxToDp(20),
                  alignSelf: "baseline",
                  bottom: 0,
                  position: "absolute",
                  alignItems: "center",
                  backgroundColor: "red",
                }}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 0.8, y: 0 }}
                colors={["#3B06F1", "#EA48EA"]}
              >
                <View>
                  <Text style={{ color: "white" }}>确定</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    </ScrollView>
  );
}
export default Newbie;
var styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#E7B2FF",
  },
  itemContainer: {
    borderRadius: pxToDp(20),
    marginHorizontal: pxToDp(10),
    marginBottom: pxToDp(10),
    paddingBottom: pxToDp(50),
    paddingLeft: pxToDp(20),
    paddingTop: pxToDp(20),
    paddingRight: pxToDp(20),
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderBottomColor: "#eaeaef",
    borderBottomWidth: pxToDp(1),
  },
  thumbnail: {
    width: pxToDp(210),
    height: pxToDp(210),
    borderTopLeftRadius: pxToDp(14),
    borderTopRightRadius: pxToDp(14),
  },
  goodsinfo: {
    // width: pxToDp(500),

    height: pxToDp(210),
    position: "relative",
    paddingLeft: pxToDp(20),
    backgroundColor: "#fff",
    borderBottomLeftRadius: pxToDp(14),
    borderBottomRightRadius: pxToDp(14),
  },
  goodsname: {
    width: pxToDp(480),
    fontSize: pxToDp(28),
    paddingRight: pxToDp(10),
    backgroundColor: "#fff",
  },
});
