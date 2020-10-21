/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import pxToDp from "../util/util.js";

import GoodsList from "../components/goodList.js";
import request from "../util/Request.js";

import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProductList from "../components/productList.js";
import Swiper from "react-native-swiper";
import { cond, sub } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import LoadingActivity from "../components/loadingActivity.js";
import HotRankSlide from "../components/hotRankSlide.js";

function HotRank(props) {
  let page_add = true;
  const win = Dimensions.get("window");
  const [renderBox, setRenderBox] = useState(false);
  const [direction, setDirection] = useState(0);
  const tabScroll = useRef(null);
  const scrollView = useRef(null);
  const [offset, setOffset] = useState(0);
  const [type_id, setType_id] = useState(4);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [page, setPage] = useState(1);

  const [showLoading, setShowLoading] = useState(false);
  const swiperRef = useRef(null);
  const [shouldReload, setShouldReload] = useState(true);

  // const getHotGoods = () => {
  //   setShowLoading(true);

  //   console.log(page);
  //   const api = "getHotGoods";
  //   const param = { platform: 99, type: swiperIndex + 1, pageNo: page };
  //   request(
  //     api,
  //     param,
  //     function (res) {
  //       setPageAdd(true);

  //       setShowLoading(false);

  //       setProductList(res.data.data.goodsList);
  //       if (page === 1) {
  //         setProductList(res.data.data.goodsList);
  //       } else {
  //         let tempList = productList.concat(res.data.data.goodsList);

  //         setProductList(tempList);
  //       }
  //     },
  //     function (err) {
  //       setPageAdd(true);
  //     }
  //   );
  // };

  // useEffect(() => {
  //   getHotGoods();
  // }, [swiperIndex, page]);

  const resetPage = () => {
    setPage(1);
    setShouldReload(true);
  };

  const [productList, setProductList] = useState([]);

  const resetShouldReload = (state) => {
    setShouldReload(state);
  };
  const setChildLoading = (state) => {
    setShowLoading(state);
  };
  const setPageAddToTrue = () => {
    page_add = true;
  };

  const onMainTabPress = (index) => {
    if (index === 0) {
      swiperRef.current.scrollTo(0, true);
    } else if (index === 1) {
      swiperRef.current.scrollTo(1, true);
    } else {
      swiperRef.current.scrollTo(2, true);
    }
  };

  const onSlideScroll = async (event) => {
    let contentHeight = event.nativeEvent.contentSize.height; //内容高度
    let pageHeight = event.nativeEvent.layoutMeasurement.height; //屏幕高度
    let scrollHeight = event.nativeEvent.contentOffset.y; //滑动距离

    if (page_add) {
      if (
        scrollHeight + pageHeight + 20 >= contentHeight &&
        contentHeight >= pageHeight
      ) {
        setPage(page + 1);
        setShouldReload(true);
        page_add = false;
      }
    }
  };
  const [nomore, setNomore] = useState(false);

  return (
    <View style={styles.container}>
      <React.Fragment>
        <View style={styles.paginationStyle}>
          <View style={styles.mainNav}>
            <View style={styles.tab}>
              <TouchableOpacity
                onPress={() => {
                  onMainTabPress(0);
                }}
              >
                <View>
                  <Text
                    style={
                      swiperIndex === 0 ? styles.tabchildclick : styles.tabchild
                    }
                  >
                    团长热销
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onMainTabPress(1);
                }}
              >
                <View>
                  <Text
                    style={
                      swiperIndex === 1 ? styles.tabchildclick : styles.tabchild
                    }
                  >
                    平台热销
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onMainTabPress(2);
                }}
              >
                <View>
                  <Text
                    style={
                      swiperIndex === 2 ? styles.tabchildclick : styles.tabchild
                    }
                  >
                    淘宝热销
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </React.Fragment>

      <View style={{ alignItems: "center" }}></View>
      <Swiper
        onIndexChanged={(index) => {
          setProductList([]);
          setPage(1);
          setSwiperIndex(index);
        }}
        ref={swiperRef}
        loop={false}
        showsPagination={false}
        showsButtons={false}
      >
        <HotRankSlide
          resetPage={resetPage}
          id={0}
          index={swiperIndex}
          page={page}
          setPageAddToTrue={setPageAddToTrue}
          shouldReload={shouldReload}
          resetShouldReload={resetShouldReload}
          setChildLoading={setChildLoading}
          onSlideScroll={onSlideScroll}
        />
        <HotRankSlide
          resetPage={resetPage}
          id={1}
          index={swiperIndex}
          page={page}
          setPageAddToTrue={setPageAddToTrue}
          shouldReload={shouldReload}
          resetShouldReload={resetShouldReload}
          setChildLoading={setChildLoading}
          onSlideScroll={onSlideScroll}
        />
        <HotRankSlide
          resetPage={resetPage}
          id={2}
          index={swiperIndex}
          page={page}
          setPageAddToTrue={setPageAddToTrue}
          shouldReload={shouldReload}
          resetShouldReload={resetShouldReload}
          setChildLoading={setChildLoading}
          onSlideScroll={onSlideScroll}
        />
      </Swiper>

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

export default HotRank;

const styles = StyleSheet.create({
  mainNav: {
    alignSelf: "stretch",
    borderBottomLeftRadius: 25,
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: pxToDp(750),
    backgroundColor: "#f5f5f9",
  },
  tab: {
    borderBottomLeftRadius: 25,

    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-evenly",
    alignItems: "center",

    padding: 20,
  },
  subTab: {
    backgroundColor: "#f5f5f9",
    flexDirection: "row",
    alignContent: "center",
    marginBottom: pxToDp(20),
    padding: 5,
  },
  subTabBarActive: {
    borderRadius: 10,
    marginTop: 5,
    alignSelf: "center",

    width: 25,
    height: 2,
  },
  subTabBar: {
    borderRadius: 10,
    marginTop: 5,
    alignSelf: "center",
    width: 25,
    height: 2,
  },
  tabchild: {
    fontSize: pxToDp(40),
    fontWeight: "bold",
    color: "grey",
  },
  tabchildclick: {
    color: "black",
    fontSize: pxToDp(40),
    fontWeight: "bold",
  },

  subtabChild: {
    marginHorizontal: pxToDp(15),
    margin: pxToDp(10),
    // color: '#3f4450',
    color: "grey",
    fontSize: pxToDp(30),
  },
  subtabChildActive: {
    marginHorizontal: pxToDp(15),
    margin: pxToDp(10),

    fontSize: pxToDp(30),
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  paginationStyle: {
    // position: 'absolute',

    alignItems: "center",
  },
  tabBarActive: {
    borderRadius: 10,
    marginTop: 5,
    alignSelf: "center",
    backgroundColor: "white",
    width: 45,
    height: 3,
  },
  tabBar: {
    borderRadius: 10,
    marginTop: 5,
    alignSelf: "center",
    backgroundColor: "transparent",
    width: 45,
    height: 3,
  },
});
