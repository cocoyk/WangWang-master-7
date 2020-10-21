/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from "react";
import pxToDp from "../util/util";

import GoodsList from "../components/goodList.js";
// import SearchModal from './component/searchModal';
// import WechatModule from '../util/WechatSdk';
// import AsyncStorage from '@react-native-community/async-storage';
// import Nodata from './component/nodata';
import LinearGradient from "react-native-linear-gradient";
import Swiper from "react-native-swiper";
import Toast from "react-native-simple-toast";
import LoadingActivity from "../components/loadingActivity.js";

import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  RefreshControl,
  FlatList,
  Linking,
  AppState,
  Clipboard,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  Platform,
} from "react-native";

import request from "../util/Request.js";
import SwiperView from "../components/swiperView.js";
import AsyncStorage from "@react-native-community/async-storage";
// import ModalSearch from './component/modalSearch';
// import {WECHAT_MINI_KEY, WECHAT_MINI_TYPE} from '../AppConfig';

function Home({ navigation }) {
  const subscription = "";
  let page_add = true;
  const role = 1;
  const initType = "";
  const sort_type = 0;
  let scrollview = undefined;
  let flatlist = undefined;
  const category_id = 0;
  const navigationEvent = undefined;
  const fromKbn = "";
  const category_name = "推荐";

  const pageSwiperRef = useRef(null);
  const scrollRef = useRef();

  const getBanner = () => {
    AsyncStorage.getItem('token').then(val=>{
      const api = "getMainBanner";
      const param = { test: 1,token:val };
      request(
        api,
        param,
        function (res) {
          setImgList(res.data.data.bannerList);
          // console.log(res.data.data.bannerList);
        },
        function (res) {
         Toast.show("网络错误",Toast.SHORT);
        }
      );
    })
    
  };

  const getGoodCategory = () => {
    setShowLoading(true);
    AsyncStorage.getItem('token').then(val=>{
      const api = "getGoodCategory";
    const param = { platform: 1,token:val };
    request(
      api,
      param,
      function (res) {
        setShowLoading(false);
        let option_list = res.data.data.optList;
        for (var i = 0; i < option_list.length; i++) {
          option_list[i].index = i;
        }
        setTypeList(option_list);
      },
      function (res) {
       setShowLoading(false);
       Toast.show("网络错误",Toast.SHORT);
      }
    );
    })
  };

  useEffect(() => {
    getGoodCategory();
    getBanner();
  }, []);

  const [typeList, setTypeList] = useState([]);

  const [readedFlag, setReadedFlag] = useState(false);
  const [imgList, setImgList] = useState([
    { banners_pic: "https://picsum.photos/200/300" },
    { banners_pic: "https://picsum.photos/id/237/200/300" },
  ]);
  const [backTop, setBackTop] = useState(false);
  const [productList, setProductList] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [noData, setNoData] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [hiddenFlag, setHiddenFlag] = useState(true);
  const [clickIndex, setClickIndex] = useState(0);
  const [low_price, setlow_price] = useState("");
  const [highPrice, setHighPrice] = useState("");
  const [shopType, setShopType] = useState(0);
  const [withCoupon, setWithCoupon] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [haveCopy, setHaveCopy] = useState([]);
  const [copyText, setCopyText] = useState("");
  const [visible, setVisible] = useState(false);
  const [fadeAnimationVal, setFadeAnimationVal] = useState(
    new Animated.Value(0)
  );
  const [shouldReload, setShouldReload] = useState(true);
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);

  const backToTop = () => {
    scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  const resetPage = () => {
    setPage(1);
    setShouldReload(true);
  };

  const resetShouldReload = (state) => {
    setShouldReload(state);
  };
  const setChildLoading = (state) => {
    setShowLoading(state);
  };
  const setPageAddToTrue = () => {
    page_add = true;
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

  let renderSlides = typeList.map((el, slideIndex) => {
    if (slideIndex === 0) {
      return (
        <View key={slideIndex}>
          {/* 返回顶部 */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.backTop}
            onPress={() => {
              backToTop();
            }}
          >
            <Image
              style={{ width: pxToDp(40), height: pxToDp(40) }}
              source={require("../image/common_icon_top.png")}
            />
            <Text style={{ fontSize: pxToDp(24) }}>顶部</Text>
          </TouchableOpacity>

          {/* 搜索模态窗口 */}

          {/* 页面开始 */}

          <ScrollView
            onScroll={onSlideScroll}
            style={styles.scrollview}
            ref={scrollRef}
            //   onScroll={(event) => this.onscroll(event)}
            stickyHeaderIndices={[1]}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                progressBackgroundColor="#fff"
                // onRefresh={this.onRefresh}
                colors={["#ff0000", "#ff5186", "#4AC1A4"]}
                enabled={true}
                tintColor="#ff0000"
                title="正在刷新..."
                titleColor="#eaeaef"
              />
            }
          >
            <View></View>
            <View></View>

            {/* 顶部分类 category */}

            <View></View>
            <Swiper
              autoplay={true}
              autoplayTimeout={3}
              style={styles.sliders}
              paginationStyle={{ bottom: pxToDp(10) }}
              dotStyle={styles.dot}
              activeDotStyle={styles.activedot}
            >
              {imgList.map((item, index) => {
                //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
                return (
                  <TouchableOpacity activeOpacity={0.9} key={index}>
                    <Image
                      style={styles.thumbnail}
                      source={{ uri: item.img }}
                    />
                  </TouchableOpacity>
                );
              })}
            </Swiper>

            {/* banner */}
            <View style={styles.iconcontainer}>
              <View style={styles.iconarea}>
                <TouchableOpacity
                  onPress={() => {
                    Toast.show("敬请期待", Toast.SHORT);
                  }}
                  activeOpacity={0.9}
                  style={styles.iconchild}
                >
                  <Image
                    style={styles.iconlogo}
                    source={require("../image/pdd.jpg")}
                  />
                  <Text style={styles.icontitle}>拼多多</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Toast.show("敬请期待", Toast.SHORT);
                  }}
                  activeOpacity={0.9}
                  style={styles.iconchild}
                >
                  <Image
                    style={styles.iconlogo}
                    source={require("../image/tb.jpg")}
                  />
                  <Text style={styles.icontitle}>淘宝</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Toast.show("敬请期待", Toast.SHORT);
                  }}
                  activeOpacity={0.9}
                  style={styles.iconchild}
                >
                  <Image
                    style={styles.iconlogo}
                    source={require("../image/jd.jpg")}
                  />
                  <Text style={styles.icontitle}>京东</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Toast.show("敬请期待", Toast.SHORT);
                  }}
                  activeOpacity={0.9}
                  style={styles.iconchild}
                >
                  <Image
                    style={styles.iconlogo}
                    source={require("../image/wph.jpg")}
                  />
                  <Text style={styles.icontitle}>唯品会</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.iconarea}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ZhuangLian");
                  }}
                  activeOpacity={0.9}
                  style={styles.iconchild}
                >
                  <Image
                    style={styles.iconlogo}
                    source={require("../image/wang1.png")}
                  />
                  <Text style={styles.icontitle}>我要转链</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("MyRights");
                  }}
                  activeOpacity={0.9}
                  style={styles.iconchild}
                >
                  <Image
                    style={styles.iconlogo}
                    source={require("../image/wang2.png")}
                  />
                  <Text style={styles.icontitle}>我的权益</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("JinQun");
                  }}
                  activeOpacity={0.9}
                  style={styles.iconchild}
                >
                  <Image
                    style={styles.iconlogo}
                    source={require("../image/hao.png")}
                  />
                  <Text style={styles.icontitle}>我要进群</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Invite");
                  }}
                  activeOpacity={0.9}
                  style={styles.iconchild}
                >
                  <Image
                    style={styles.iconlogo}
                    source={require("../image/wu.png")}
                  />
                  <Text style={styles.icontitle}>邀请好友</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                padding: pxToDp(20),
                flexDirection: "row",
                // backgroundColor: 'white',
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SellerRank");
                }}
              >
                <View
                  style={{
                    borderRadius: pxToDp(15),
                    elevation: pxToDp(10),
                    height: pxToDp(270),
                    width: pxToDp(300),
                    // backgroundColor: 'green',
                  }}
                >
                  <Image
                    style={{
                      borderRadius: pxToDp(15),
                      elevation: pxToDp(10),
                      height: pxToDp(270),
                      width: pxToDp(300),
                      // backgroundColor: 'green',
                    }}
                    source={require("../image/seller_rank.jpg")}
                  />
                </View>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Newbie");
                  }}
                >
                  <View
                    style={{
                      borderRadius: pxToDp(15),
                      elevation: pxToDp(10),
                      marginBottom: pxToDp(20),
                      height: pxToDp(125),
                      width: pxToDp(370),
                      // backgroundColor: 'green',
                    }}
                  >
                    <Image
                      style={{
                        borderRadius: pxToDp(15),
                        elevation: pxToDp(10),
                        marginBottom: pxToDp(20),
                        height: pxToDp(125),
                        width: pxToDp(370),
                        // backgroundColor: 'green',
                      }}
                      source={require("../image/newcomer_free.jpg")}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Toast.show("敬请期待", Toast.SHORT);
                  }}
                >
                  <View
                    style={{
                      borderRadius: pxToDp(15),
                      elevation: pxToDp(10),
                      height: pxToDp(125),
                      width: pxToDp(370),
                      // backgroundColor: 'green',
                    }}
                  >
                    <Image
                      style={{
                        borderRadius: pxToDp(15),
                        elevation: pxToDp(10),
                        marginBottom: pxToDp(20),
                        height: pxToDp(125),
                        width: pxToDp(370),
                        // backgroundColor: 'green',
                      }}
                      source={require("../image/login_comission.jpg")}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <SwiperView
              resetPage={resetPage}
              opt_id={0}
              id={slideIndex}
              index={index}
              page={page}
              setPageAddToTrue={setPageAddToTrue}
              shouldReload={shouldReload}
              resetShouldReload={resetShouldReload}
              setChildLoading={setChildLoading}
            />
          </ScrollView>
        </View>
      );
    } else {
      return (
        <ScrollView onScroll={onSlideScroll} key={slideIndex}>
          <SwiperView
            resetPage={resetPage}
            id={slideIndex}
            index={index}
            opt_id={el.opt_id}
            page={page}
            setPageAddToTrue={setPageAddToTrue}
            shouldReload={shouldReload}
            resetShouldReload={resetShouldReload}
            setChildLoading={setChildLoading}
          />
        </ScrollView>
      );
    }
  });

  const keyExtractor = (item, index) => index.toString();
  const showIndex = fadeAnimationVal.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const showOpacity = fadeAnimationVal.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const renderType = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          pageSwiperRef.current.scrollTo(item.item.index);
        }}
        activeOpacity={0.8}
        style={{ alignItems: "center" }}
      >
        <LinearGradient
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.9, y: 0 }}
          style={styles.typenormal}
          colors={
            index == item.item.index
              ? ["transparent", "transparent"]
              : ["transparent", "transparent"]
          }
        >
          <Text
            style={[
              styles.typetitle,
              {
                color: index == item.item.index ? "#FFFDE7" : "#FFFDE7",
                fontWeight: index == item.item.index ? "bold" : "normal",
                fontSize: index == item.item.index ? pxToDp(40) : pxToDp(28),
              },
            ]}
          >
            {item.item.opt_name}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {/* <LinearGradient
        style={{
          borderBottomLeftRadius: 25,
          paddingHorizontal: pxToDp(10),
          paddingTop: pxToDp(10),
          paddingBottom: pxToDp(30),
        }}
        start={{x: 0.2, y: 0}}
        end={{x: 0.8, y: 0}}
        colors={['#ff4d00', '#FD8B11']}> */}
      {/* 搜索框 */}
      <View style={styles.fixedarea}>
        <Image
          style={{
            width: pxToDp(755),
            height: pxToDp(200),
            borderBottomLeftRadius: 25,
          }}
          source={require("../image/search_area.png")}
        />

        <FlatList
          style={styles.typescroll}
          data={typeList}
          contentContainerStyle={{
            alignItems: "center",
            borderTopLeftRadius: pxToDp(35),
            borderBottomLeftRadius: pxToDp(35),
          }}
          // extraData={this.state}
          renderItem={(item) => renderType(item)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={keyExtractor}
        />

        <TouchableOpacity
          style={{
            position: "absolute",
            top: pxToDp(23),
            right: pxToDp(105),
            width: pxToDp(380),
            height: pxToDp(70),

            paddingLeft: pxToDp(20),
            justifyContent: "center",
          }}
          onPress={() => {
            navigation.navigate("Search");
          }}
        >
          <Text style={{ color: "white", fontSize: pxToDp(20) }}>
            搜商品标题 领隐藏券
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: pxToDp(25),
            right: pxToDp(30),
            width: pxToDp(65),
            height: pxToDp(65),
          }}
          onPress={() => {
            Toast.show("敬请期待", Toast.SHORT);
          }}
        />

        {/* <View style={styles.topbar}>
            <Text
              style={{
                color: 'white',
                fontSize: pxToDp(50),
                marginRight: pxToDp(20),
              }}>
              旺旺团长
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate('Search');
              }}
              style={styles.searcharea}>
              <Image
                style={styles.searchlogo}
                source={require('../image/search_icon.png')}
              />
              <Text style={styles.searchbutton}>复制标题搜拼多多优惠券</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            style={styles.typescroll}
            data={typeList}
            contentContainerStyle={{
              alignItems: 'center',
              borderTopLeftRadius: pxToDp(35),
              borderBottomLeftRadius: pxToDp(35),
            }}
            // extraData={this.state}
            renderItem={(item) => renderType(item)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={keyExtractor}
          /> */}
      </View>
      {/* </LinearGradient> */}

      <Swiper
        key={typeList.length}
        ref={pageSwiperRef}
        onIndexChanged={(index) => {
          setPage(1);
          setIndex(index);
          setShouldReload(true);
        }}
        loop={false}
        showsPagination={false}
      >
        {renderSlides}
      </Swiper>

      {/* {Platform.OS == 'ios' && (
        <View
          style={{
            position: 'absolute',
            zIndex: 999,
            width: '100%',
            height: pxToDp(40),
            backgroundColor: '#fff',
          }}></View>
      )} */}

      {/* 悬浮筛选条，向上滑动到顶部显示 */}

      {/* <BottomTab selected_index={2} /> */}
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
export default Home;

//   render() {
//     const keyExtractor = (item, index) => index.toString();
//     const showIndex = this.state.fadeAnimValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 1],
//     });
//     const showOpacity = this.state.fadeAnimValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 1],
//     });
//   }
// }

const styles = StyleSheet.create({
  fixedarea: {
    width: pxToDp(750),
    height: pxToDp(200),
    // backgroundColor: '#fff',
    display: "flex",
    alignItems: "center",
  },
  scrollview: {
    elevation: 5,
  },
  navigation: {
    display: "flex",
    marginTop: 5,
    marginBottom: 5,
    width: pxToDp(750),
    padding: pxToDp(4),
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor: '#bbbbbf',
  },
  navigatetitle: {
    flex: 1,
    fontSize: pxToDp(40),
    marginLeft: pxToDp(25),
    color: "#1d1d1f",
    fontWeight: "bold",
    paddingBottom: pxToDp(2),
  },
  incomeback: {
    height: pxToDp(60),
    flexDirection: "column",
    width: "40%",
    justifyContent: "center",
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(25),
    paddingBottom: pxToDp(10),
  },
  incomeimg: {
    width: pxToDp(40),
    height: pxToDp(40),
    justifyContent: "center",
    marginTop: pxToDp(3),
    marginLeft: pxToDp(22),
    tintColor: "white",
    opacity: 0.9,
  },
  incometitle: {
    fontSize: pxToDp(25),
    marginLeft: pxToDp(4),
    color: "white",
    opacity: 0.9,
  },
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'center',
    // width: pxToDp(750),
    width: "100%",
    height: pxToDp(80),
    marginBottom: pxToDp(10),
    marginTop: pxToDp(30),
    marginLeft: pxToDp(30),
    lineHeight: pxToDp(80),
    color: "#9C9C9C",
    fontSize: pxToDp(32),
  },
  searcharea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.6,
    paddingHorizontal: pxToDp(60),
    height: pxToDp(80),
    marginBottom: pxToDp(10),
    lineHeight: pxToDp(80),
    color: "white",
    fontSize: pxToDp(32),
    backgroundColor: "#fb7b5a",
    borderRadius: pxToDp(25),
  },
  searchlogo: {
    marginTop: pxToDp(5),
    width: pxToDp(31),
    height: pxToDp(31),
    marginRight: pxToDp(5),
    tintColor: "white",
  },
  searchbutton: {
    color: "white",
    paddingLeft: pxToDp(10),
    fontSize: pxToDp(28),
  },
  iconcontainer: {
    marginTop: pxToDp(20),
    borderRadius: 10,
  },
  iconarea: {
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  iconchild: {
    width: pxToDp(145),
    height: pxToDp(160),
    alignItems: "center",
    justifyContent: "center",
  },
  iconlogo: {
    width: pxToDp(90),
    height: pxToDp(108),
  },
  icontitle: {
    fontSize: pxToDp(24),
    color: "#5C5C5C",
    fontWeight: "400",
  },

  newsback: {
    width: pxToDp(100),
    height: pxToDp(60),
    alignItems: "center",
  },
  news: {
    width: pxToDp(60),
    height: pxToDp(60),
  },
  readflag: {
    position: "absolute",
    right: pxToDp(25),
    top: pxToDp(8),
    width: pxToDp(12),
    height: pxToDp(12),
    borderColor: "#fff",
    borderWidth: pxToDp(1),
    backgroundColor: "#ff0000",
    borderRadius: pxToDp(6),
  },
  typescroll: {
    position: "absolute",
    height: pxToDp(70),
    borderTopLeftRadius: pxToDp(25),
    borderBottomLeftRadius: pxToDp(25),

    bottom: pxToDp(20),
    marginLeft: pxToDp(20),
    marginTop: pxToDp(10),
  },
  typenormal: {
    height: pxToDp(70),
    borderRadius: pxToDp(25),
    marginLeft: pxToDp(5),
    marginRight: pxToDp(5),
    marginTop: pxToDp(15),
    marginBottom: pxToDp(15),
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),

    justifyContent: "center",
  },
  typetitle: {
    fontSize: pxToDp(28),
  },
  banner: {
    // flex: 1
  },
  viewText: {
    margin: 10,
  },
  sliders: {
    // position: 'absolute',

    // backgroundColor: '#fff',
    height: pxToDp(267),
    // width: pxToDp(750),
    marginTop: pxToDp(30),
  },
  dot: {
    width: pxToDp(16),
    height: pxToDp(16),
    backgroundColor: "#fff",
  },
  activedot: {
    width: pxToDp(16),
    height: pxToDp(16),
    backgroundColor: "#ff0000",
  },
  thumbnail: {
    width: pxToDp(710),
    marginLeft: pxToDp(20),
    height: pxToDp(267),
    borderRadius: pxToDp(20),
  },
  activities: {
    width: pxToDp(750),
    // height:250,
    backgroundColor: "#fff",
    paddingLeft: pxToDp(15),
    paddingRight: pxToDp(15),
    paddingBottom: pxToDp(10),
    paddingTop: pxToDp(22),
    marginBottom: pxToDp(10),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  secondlist: {
    width: pxToDp(750),
    // minHeight: pxToDp(200),
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#FFF",
    borderTopWidth: pxToDp(1),
    borderTopColor: "#e4e4e4",
    borderBottomWidth: pxToDp(1),
    borderBottomColor: "#e4e4e4",
    paddingTop: pxToDp(10),
    paddingBottom: pxToDp(20),
  },
  secondchild: {
    alignItems: "center",
    width: pxToDp(150),
    marginTop: pxToDp(15),
    marginBottom: pxToDp(10),
  },
  childimg: {
    width: pxToDp(92),
    height: pxToDp(92),
  },
  childname: {
    color: "#70747e",
    lineHeight: pxToDp(25),
    fontSize: pxToDp(24),
    marginTop: pxToDp(20),
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f9",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  btn: {
    height: 35,
    backgroundColor: "#4d796e",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffffff",
  },
  backTop: {
    position: "absolute",
    width: pxToDp(100),
    height: pxToDp(100),
    right: pxToDp(30),
    bottom: pxToDp(300),
    backgroundColor: "#fff",
    borderColor: "#94949c",
    borderWidth: pxToDp(3),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: pxToDp(50),
    opacity: 0.9,
    zIndex: 99,
  },
  condition_area_hidden: {
    position: "absolute",
    width: pxToDp(750),
    top: Platform.OS == "ios" ? pxToDp(120) : pxToDp(80),
    height: pxToDp(80),
    paddingTop: pxToDp(-2),
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
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
