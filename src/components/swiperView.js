/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import pxToDp from "../util/util.js";
import { useNavigation } from "@react-navigation/native";
import request from "../util/Request.js";
import Toast from "react-native-simple-toast";
import GoodsList from "./goodList.js";

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
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

function SwiperView(props) {
  const [clickIndex, setClickIndex] = useState(0);
  const [productList, setProductList] = useState([]);
  const [nomore, setNomore] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [sortIndex, setSortIndex] = useState(true);

  useEffect(() => {
    if (props.id === props.index) {
      getAllGoods();
    }
  }, [props.index]);

  useEffect(() => {
    if (props.id === props.index && props.shouldReload === true) {
      getAllGoods();
    }
  }, [props.page, props.shouldReload]);

  const getAllGoods = () => {
    props.setChildLoading(true);
    props.setPageAddToTrue();
    props.resetShouldReload(false);

    console.log("类别", clickIndex);
    console.log("方式", sortIndex);
   AsyncStorage.getItem('token').then(val=>{
    const param = {
      platform: 1,
      optId: props.opt_id,
      pageNo: props.page,
      sortNow: clickIndex,
      sortIndex: sortIndex === true ? 0 : 1,
      token:val
    };

    const api = "getAllGoods";

    request(
      api,
      param,
      function (res) {
        console.log(res.data.data.goodsList[0]);
        props.setChildLoading(false);
        if (props.page === 1) {
          setProductList(res.data.data.goodsList);
        } else {
          var templist = res.data.data.goodsList;
          templist = productList.concat(templist);
          setProductList(templist);
        }
      },
      function (res) {
        props.setChildLoading(false);
        Toast.show(res.data.message,Toast.SHORT);
      }
    );
   })
  };

  const conditionClick = (index) => {
    console.log(index);
    setProductList([]);
    props.resetPage();
    if (index === clickIndex) {
      console.log("测试");
      setSortIndex(!sortIndex);
    } else {
      setClickIndex(index);
      setSortIndex(true);
    }
    // getAllGoods();
  };

  return (
    <View>
      <View style={styles.condition_area}>
        <TouchableOpacity
          onPress={() => {
            conditionClick(0);
          }}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.condition,
              {
                color: clickIndex === 0 ? "#ff4d00" : "#3f4450",
              },
            ]}
          >
            综合
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            conditionClick(5);
          }}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.condition,
              {
                color: clickIndex === 5 ? "#ff4d00" : "#3f4450",
              },
            ]}
          >
            销量
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            conditionClick(3);
          }}
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              styles.condition,
              {
                color: clickIndex === 3 ? "#ff4d00" : "#3f4450",
              },
            ]}
          >
            价格
          </Text>
        </TouchableOpacity>
      </View>

      <GoodsList
        showload={showLoading}
        nomore={nomore}
        dataList={productList}
      />
    </View>
  );
}

export default SwiperView;

const styles = StyleSheet.create({
  condition_area: {
    height: pxToDp(80),
    // paddingTop: pxToDp(-2),
    marginLeft: pxToDp(30),
    marginRight: pxToDp(30),
    borderRadius: pxToDp(30),
    marginTop: pxToDp(20),
    marginBottom: pxToDp(20),
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  condition: {
    fontSize: pxToDp(28),
    opacity: 0.8,
  },
});
