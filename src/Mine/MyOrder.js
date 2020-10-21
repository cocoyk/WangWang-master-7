/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ViewBase,
  TextInput,
} from "react-native";
import pxToDp from "../util/util";
import AsyncStorage from "@react-native-community/async-storage";
import request from "../util/Request";
import Toast from "react-native-simple-toast";
import { sub } from "react-native-reanimated";
import Clipboard from "@react-native-community/clipboard";

function MyOrder({ navigation }) {
  const [orderNum, setOrderNum] = useState("");
  const [page, setPage] = useState(1);
  const [state, setState] = useState(0);
  const [subsidy, setSubsidy] = useState(0);

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Toast.show("已复制订单号到粘贴板", Toast.LONG);
  };

  const searchOder = () => {
    setPage(1);
    setSubsidy(0);
    setState(0);
    getOrderList();
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    getOrderList();
  }, []);

  const getOrderList = async () => {
    AsyncStorage.getItem("token").then((val) => {
      console.log(val);
      const api = "myOrderList";
      const params = {
        platform: 1,
        token: val,
        orderid: orderNum,
        pageNo: page,
        state: state,
        subsidy: subsidy,
      };
      // if (orderNum !== undefined) {
      //   params.orderid = orderNum;
      // }

      request(api, params, function (res) {
        console.log(res.data.data.orderlist);
        setData(res.data.data.orderlist);
        setOrderNum("");
      },function(res){
      navigation.navigate("Login");
      });
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          padding: pxToDp(20),
          marginBottom: pxToDp(30),
          backgroundColor: "white",
          marginHorizontal: pxToDp(40),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: pxToDp(20),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image style={styles.avatar} source={{ uri: item.headimgurl }} />
            <Text>{item.nick_name}</Text>
          </View>
          <Text>{item.state}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: pxToDp(40),
          }}
        >
          <Image
            style={{
              width: pxToDp(150),
              height: pxToDp(150),
              marginRight: pxToDp(20),
            }}
            source={{
              uri: item.item_img,
            }}
          />
          <View style={{ justifyContent: "space-between" }}>
            <Text>{item.item_name.slice(0, 12) + "..."}</Text>
            <View
              style={{
                width: pxToDp(450),
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: pxToDp(25), color: "grey" }}>
                {item.transaction_id}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  copyToClipboard(item.transaction_id);
                }}
              >
                <View flexDirection="row">
                  <Image
                    style={{
                      width: pxToDp(25),
                      height: pxToDp(25),
                      alignSelf: "center",
                    }}
                    source={require("../image/sheet.png")}
                  />
                  <Text> 复制</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#ff6347",
                  alignSelf: "flex-start",
                  paddingHorizontal: pxToDp(10),
                  borderRadius: pxToDp(10),
                }}
              >
                <Text style={{ color: "white", fontSize: pxToDp(25) }}>
                  {"自己" + item.percentage + "%"}
                </Text>
              </View>
              <Text style={{ fontSize: pxToDp(25), color: "grey" }}>
                {"失效:" + item.order_modify_at}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: pxToDp(2.5),
            alignSelf: "stretch",
            backgroundColor: "whitesmoke",
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            padding: pxToDp(20),
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: pxToDp(40),
                marginBottom: pxToDp(10),
              }}
            >
              {item.pay_amount}
            </Text>
            <Text style={{ color: "grey" }}>付款金额</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: pxToDp(40),
                marginBottom: pxToDp(10),
              }}
            >
              {"¥" + item.agent_amount}
            </Text>
            <Text style={{ color: "grey" }}>属于自己</Text>
          </View>
        </View>
      </View>
    );
  };
  const keyExtractor = (item, index) => index.toString();

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "white",
          marginTop: pxToDp(20),
          marginHorizontal: pxToDp(50),
          padding: pxToDp(20),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setSubsidy(0);
            getOrderList();
          }}
        >
          <View>
            <Text style={styles.mainTabText}>我的订单</Text>
            {subsidy === 0 && <View style={styles.mainTabBar} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setSubsidy(1);
            getOrderList();
          }}
        >
          <View>
            <Text style={styles.mainTabText}>关联团队订单</Text>
            {subsidy === 1 && <View style={styles.mainTabBar} />}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.searchArea}>
        <View
          style={{
            paddingLeft: pxToDp(10),
            flexDirection: "row",
            backgroundColor: "#f5f5f9",
            alignItems: "center",
            width: pxToDp(500),
            borderRadius: pxToDp(5),
          }}
        >
          <Image
            style={styles.searchlogo}
            source={require("../image/search_icon.png")}
          />
          <TextInput
            style={styles.searchbutton}
            placeholder={"搜索订单号"}
            onChangeText={(text) => {
              setOrderNum(text);
            }}
          />
        </View>
        <View style={{ alignSelf: "center" }}>
          <TouchableOpacity
            onPress={() => {
              searchOder();
            }}
          >
            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
                backgroundColor: "black",
                paddingVertical: pxToDp(20),
                paddingHorizontal: pxToDp(40),
                borderRadius: pxToDp(5),
              }}
            >
              <Text style={{ color: "white", fontSize: pxToDp(25) }}>搜索</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: pxToDp(40),
          marginHorizontal: pxToDp(30),
          paddingHorizontal: pxToDp(20),
          marginBottom: pxToDp(10),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setState(0);
            getOrderList();
          }}
        >
          <View>
            <Text style={{ fontSize: pxToDp(30) }}>全部订单</Text>
            {state === 0 && (
              <View
                style={{
                  marginTop: pxToDp(20),
                  alignSelf: "center",
                  height: pxToDp(3.5),
                  width: pxToDp(50),
                  backgroundColor: "black",
                }}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setState(2);
            getOrderList();
          }}
        >
          <View>
            <Text style={{ fontSize: pxToDp(30) }}>成功订单</Text>
            {state === 2 && (
              <View
                style={{
                  marginTop: pxToDp(20),
                  alignSelf: "center",
                  height: pxToDp(3.5),
                  width: pxToDp(50),
                  backgroundColor: "black",
                }}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setState(3);
            getOrderList();
          }}
        >
          <View>
            <Text style={{ fontSize: pxToDp(30) }}>售后订单</Text>
            {state === 3 && (
              <View
                style={{
                  marginTop: pxToDp(20),
                  alignSelf: "center",
                  height: pxToDp(3.5),
                  width: pxToDp(50),
                  backgroundColor: "black",
                }}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setState(4);
            getOrderList();
          }}
        >
          <View>
            <Text>已结算订单</Text>
            {state === 4 && (
              <View
                style={{
                  marginTop: pxToDp(20),
                  alignSelf: "center",
                  height: pxToDp(3.5),
                  width: pxToDp(50),
                  backgroundColor: "black",
                }}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: "#f5f5f9", flex: 1 }}>
        <FlatList
          contentContainerStyle={{ marginTop: pxToDp(20) }}
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </View>
  );
}
export default MyOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  mainTabText: {
    fontSize: pxToDp(34),
    color: "black",
    opacity: 0.6,
  },
  mainTabBar: {
    marginTop: pxToDp(20),
    height: pxToDp(5),
    alignSelf: "center",
    width: pxToDp(100),
    marginHorizontal: pxToDp(30),
    backgroundColor: "black",
  },
  searchArea: {
    padding: pxToDp(20),

    alignItems: "stretch",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: pxToDp(30),
  },
  searchlogo: { width: pxToDp(31), height: pxToDp(33) },
  searchbutton: {
    color: "#ABABAB",
    paddingLeft: pxToDp(10),
    fontSize: pxToDp(30),
  },
  avatar: {
    height: pxToDp(60),
    width: pxToDp(60),
    borderRadius: pxToDp(100),
    marginRight: pxToDp(20),
  },
});
