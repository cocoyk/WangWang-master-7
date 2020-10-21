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
  Dimensions,
  ToastAndroid,
} from "react-native";
import { block, color } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

function HotRankSlide(props) {
  const win = Dimensions.get("window");
  const [productList, setProductList] = useState([]);
  const [nomore, setNomore] = useState(true);

  useEffect(() => {
    if (props.id === props.index) {
      getHotGoods();
    }
  }, [props.index]);

  useEffect(() => {
    if (props.id === props.index && props.shouldReload === true) {
      getHotGoods();
    }
  }, [props.page, props.shouldReload]);

  const getHotGoods = () => {
    props.setChildLoading(true);
    console.log(props.page);
    AsyncStorage.getItem('token').then(val=>{
      const api = "getHotGoods";
    const param = { platform: 1, type: props.id + 1, pageNo: props.page,token:val };
    request(
      api,
      param,
      function (res) {
        setProductList(res.data.data.goodsList);
        if (props.page === 1) {
          setProductList(res.data.data.goodsList);
        } else {
          let tempList = productList.concat(res.data.data.goodsList);

          setProductList(tempList);
        }
        props.setChildLoading(false);
      },
      function (err) {
        Toast.show(err.data.message,Toast.SHORT);
        props.setChildLoading(false);
      }
    );
    })
  };

  return (
    // style={{ marginTop: pxToDp(230) }}
    // eslint-disable-next-line react/no-string-refs >
    <ScrollView onScroll={props.onSlideScroll}>
      <Image
        style={{
          alignSelf: "center",
          borderRadius: pxToDp(20),
          width: win.width - pxToDp(55),
          height: 0.41 * (win.width - pxToDp(55)),
        }}
        source={{
          uri:
            "http://cdn.image.wwzg01.com/uploads/2020/0306/15834807927974.jpg",
        }}
      />
      <GoodsList typehidden={true} dataList={productList} />
    </ScrollView>
  );
}
export default HotRankSlide;
