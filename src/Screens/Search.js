/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from "react";
// import request from '../util/Request';
import pxToDp from "../util/util.js";
// import Navigation from './component/navigation';
import SearchModal from "../components/searchModal.js";
import GoodsList from "../components/goodList.js";
import ShopList from "../components/shopList.js";
import LoadingActivity from "../components/loadingActivity.js";
// import NavigationService from "../util/NavigationService.js";
import AsyncStorage from "@react-native-community/async-storage";

import request from "../util/Request.js";
import {
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Toast from "react-native-simple-toast";
import { set } from "react-native-reanimated";

function Search({ navigation }) {
  let from_kbn = "";
  // let key = '';
  let role = 1;
  // let havesearch = false;
  let page_add = true;

  const [typeIndex, setTypeIndex] = useState(0);
  const [clickIndex, setClickIndex] = useState(0);
  const [havesearch, setHavesearch] = useState(true);
  const [modal_visibel, setModal_visibel] = useState(false);
  const [key, setKey] = useState("");
  const [keyHistory, setKeyHistory] = useState([""]);

  const [low_price, setLow_price] = useState("");
  const [high_price, setHigh_price] = useState("");
  const [shop_type, setShop_type] = useState("");
  const [with_coupon, setWith_coupon] = useState(0);
  const [productList, setproductList] = useState([]);
  const [showloading, setShowloading] = useState(false);
  const [nodata, setNodata] = useState(false);
  const [nomore, setNomore] = useState(false);
  const [shopList, setShopList] = useState([]);
  const [page, setPage] = useState(1);
  const [sort_index, setSort_index] = useState(true);

  const scrollRef = useRef();

  useEffect(() => {
    if (key !== "") {
      getAllGoods();
    }
  }, [sort_index, clickIndex]);

  const getAllGoods = () => {
    setShowloading(true);
    const params = {
      platform: 1,
      withCoupon: with_coupon,
      keywords: key,
      pageNo: page,
      sortNow: clickIndex,
      sortIndex: sort_index === true ? 0 : 1,
    };

    const api = "getAllGoods";
    console.log("类别", clickIndex);
    console.log("排序", sort_index);

    request(
      api,
      params,
      function (res) {
        setShowloading(false);
        page_add = true;

        if (page === 1) {
          setproductList(res.data.data.goodsList);
        } else {
          var templist = res.data.data.goodsList;
          templist = productList.concat(templist);
          setproductList(templist);
        }
        if (page === 1) {
          scrollTop();
        }

        setNodata(page === 1 && res.data.data.goodsList === "");
        setNomore(page !== 1 && res.data.data.goodsList === "");
      },
      function (res) {
        setShowloading(false);
       Toast.show(res.data.message,Toast.SHORT);
      }
    );
  };
  const searchCondition = async (state) => {
    console.log("state", state);
    setPage(1);
    setLow_price(state.low_price);
    setHigh_price(state.high_price);
    setShop_type(state.shop_type);
    setWith_coupon(state.with_cupon);
    setproductList([]);

    getAllGoods();
  };

  const unique = (array, key) => {
    var result = array == "" || array == null ? [""] : array;
    var index = result.indexOf(key);
    if (index == -1 && key != "") {
      result.unshift(key);
    }
    if (index != -1) {
      result.splice(index, 1);
      result.unshift(key);
    }
    return result;
  };

  const searchClick = async () => {
    setPage(1);
    if (key != "" || key.trim() != "") {
      getAllGoods();

      setHavesearch(true);
      setKeyHistory(unique(keyHistory, key.trim()));

      let keyValuePairs = [
        ["keyHistory", keyHistory.toString()],
        ["rookie_task1", "1"],
      ];
      AsyncStorage.multiSet(keyValuePairs);
    } else {
      Toast.showWithGravity("搜索关键词不能为空", Toast.SHORT, Toast.CENTER);
    }
  };

  const onscroll = async (event) => {
    let contentHeight = event.nativeEvent.contentSize.height; //内容高度
    let pageHeight = event.nativeEvent.layoutMeasurement.height; //屏幕高度
    let scrollHeight = event.nativeEvent.contentOffset.y; //滑动距离
    if (!showloading) {
      setShowloading(true);
    }
    if (page_add) {
      if (
        scrollHeight + pageHeight + 20 >= contentHeight &&
        contentHeight >= pageHeight
      ) {
        setPage(page + 1);
        page_add = false;

        getAllGoods();
      }
    }
  };
  const scrollTop = () => {
    scrollRef.current.scrollTo({ x: 0, y: 0, animated: false });
  };

  const conditionClick = (index) => {
    setPage(1);
    setproductList([]);

    if (index === clickIndex) {
      setSort_index(!sort_index);
    } else {
      setClickIndex(index);
      setSort_index(true);
    }
  };

  const modalClose = () => {
    setModal_visibel(false);
  };

  const showSearchModal = () => {
    setModal_visibel(true);
  };

  const typeTabClick = (index) => {
    setClickIndex(0);
    setTypeIndex(index);
    setShowloading(false);
    setNomore(false);
    setNodata(false);

    // this.page = 1;
    // this.sort_type = 0;
    // if (key != '') {
    //   if (index == 0) {
    //     this.getProduct();
    //   } else {
    //     this.getShop();
    //   }
    // }
  };

  return (
    <View style={styles.container}>
      {modal_visibel && (
        <SearchModal
          low_price={low_price}
          high_price={high_price}
          with_coupon={with_coupon}
          shop_type={shop_type}
          searchCondition={searchCondition}
          hiddenModal={modalClose}
        />
      )}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backtap}
        >
          <Image
            style={{
              width: pxToDp(40),
              height: pxToDp(40),
            }}
            source={require("../image/back_navigate_theme.png")}
          />
        </TouchableOpacity>
        <View style={styles.input}>
          <TextInput
            placeholder={"搜索商品"}
            style={styles.input_area}
            onChangeText={(key) => {
              setKey(key);
            }}
            value={key}
          />
          <Image
            style={{
              position: "absolute",
              width: pxToDp(32),
              left: pxToDp(15),
              top: pxToDp(15),
              height: pxToDp(33),
            }}
            source={require("../image/search_icon.png")}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            searchClick();
          }}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: pxToDp(32),
              color: "#1d1d1f",
            }}
          >
            搜索
          </Text>
        </TouchableOpacity>
      </View>

      {havesearch ? (
        <View style={styles.condition_area}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => conditionClick(0)}
          >
            <Text
              style={[
                styles.condition,
                { color: clickIndex == 0 ? "#ff4d00" : "#3f4450" },
              ]}
            >
              综合
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => conditionClick(5)}
          >
            <Text
              style={[
                styles.condition,
                { color: clickIndex === 5 ? "#ff4d00" : "#3f4450" },
              ]}
            >
              销量
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => conditionClick(3)}
          >
            <Text
              style={[
                styles.condition,
                { color: clickIndex === 3 ? "#ff4d00" : "#3f4450" },
              ]}
            >
              价格
            </Text>
          </TouchableOpacity>

          {typeIndex === 0 && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => {
                showSearchModal();
              }}
            >
              <Text
                style={[
                  styles.condition,
                  {
                    color:
                      low_price != "" ||
                      high_price != "" ||
                      shop_type != "" ||
                      with_coupon != 0
                        ? "#ff4d00"
                        : "#3f4450",
                  },
                ]}
              >
                筛选
              </Text>
              <Image
                style={{
                  width: pxToDp(28),
                  height: pxToDp(28),
                }}
                source={require("../image/serach_icon_screen.png")}
              />
            </TouchableOpacity>
          )}
        </View>
      ) : null}
      {havesearch ? (
        <ScrollView
          // eslint-disable-next-line react/no-string-refs
          ref={scrollRef}
          onScroll={(event) => {
            onscroll(event);
          }}
        >
          {typeIndex == 0 ? (
            nodata ? (
              <View style={styles.nodata}>
                <Text style={styles.nodataup}>什么也没找到</Text>
                <Image
                  style={styles.nodatacenter}
                  source={require("../image/search_img_none.png")}
                />
                <Text style={styles.nodatadown}>
                  未找到相关商品,请换个关键词试试
                </Text>
              </View>
            ) : productList != "" ? (
              <GoodsList
                showload={showloading}
                nomore={nomore}
                dataList={productList}
              />
            ) : (
              <View style={{ marginTop: pxToDp(300) }}></View>
            )
          ) : nodata ? (
            <View style={styles.nodata}>
              <Text style={styles.nodataup}>什么也没找到</Text>
              <Image
                style={styles.nodatacenter}
                source={require("../image/common_img_store.png")}
              />
              <Text style={styles.nodatadown}>
                未找到相关店铺,请换个关键词试试
              </Text>
            </View>
          ) : shopList != "" ? (
            <ShopList
              showload={showloading}
              nomore={nomore}
              dataList={shopList}
            />
          ) : (
            <View style={{ marginTop: pxToDp(300) }}>
              <LoadingActivity />
            </View>
          )}
        </ScrollView>
      ) : (
        <ScrollView
          onScroll={(event) => {
            onscroll(event);
          }}
        >
          <View style={styles.history_area}>
            <View style={styles.title_area}>
              <Text
                style={{
                  flex: 1,
                  marginLeft: pxToDp(30),
                  paddingLeft: pxToDp(15),
                  height: pxToDp(40),
                  fontSize: pxToDp(30),
                  color: "#1d1d1f",

                  fontWeight: "bold",
                  borderLeftWidth: pxToDp(4),
                  borderLeftColor: "#ff4d00",
                }}
              >
                最近搜索
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                // onPress={this.historyClear}
              >
                <Image
                  style={{
                    width: pxToDp(50),
                    paddingLeft: pxToDp(10),
                    paddingRight: pxToDp(10),
                    paddingTop: pxToDp(10),
                    paddingBottom: pxToDp(10),
                    // right: pxToDp(30),
                    // top: pxToDp(50),
                    height: pxToDp(50),
                  }}
                  source={require("../image/search_icon_delete.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.history_key}>
              {keyHistory.map((item, index) => {
                return (
                  <View key={index}>
                    {item.trim() != "" ? (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.keySearch(item)}
                      >
                        <Text key={index} style={styles.key}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </View>
          {/* <View style={styles.recomand}>
            <Text style={styles.line} />
            <Image
              style={styles.recomandlogo}
              source={require("./image/details_icon_commodity.png")}
            />
            <Text style={styles.recomandtitle}>为你推荐</Text>
            <Text style={styles.line} />
          </View>
          <GoodsList showload={true} dataList={this.state.recomandList} /> */}
        </ScrollView>
      )}
      {showloading === true && (
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
export default Search;

// componentDidMount = async () => {
//   const self = this;
//   this.historyKey();
//   // this.getRecomandList();
//   self.from_kbn = self.props.navigation.getParam('fromKbn', '');
//   const key = self.props.navigation.getParam('key', '');
//   if (key) {
//     await self.setState({
//       key: key,
//     });
//     self.searchClick();
//   }
// };

// getRecomandList = () => {
//   const self = this;
//   const api = 'recommend_goods_list';
//   const params = {
//     channel_type: Math.floor(Math.random() * 3),
//     page: self.page,
//   };
//   request(
//     api,
//     params,
//     function (res) {
//       self.page_add = true;
//       var recomandlist;
//       if (self.page == 1) {
//         recomandlist = res.data.data;
//       } else {
//         var templist = self.state.recomandList;
//         recomandlist = templist.concat(res.data.data);
//       }
//       self.setState({
//         recomandList: recomandlist,
//       });
//     },
//     function (err) {
//       Toast.showWithGravity(err.data.msg, Toast.LONG, Toast.CENTER);
//     },
//   );
// };

// getProduct = () => {
//   const self = this;
//   const api = 'taobao_goods_list';
//   const params = {
//     keyword: self.state.key,
//     sort_type: self.sort_type,
//     page: self.page,
//     range_from: self.state.low_price,
//     range_to: self.state.high_price,
//     merchant_type: self.state.shop_type,
//     with_coupon: self.state.with_cupon,
//   };
//   request(
//     api,
//     params,
//     function (res) {
//       self.page_add = true;
//       var productlist;
//       if (self.page == 1) {
//         productlist = res.data.data;
//       } else {
//         var templist = self.state.productList;
//         productlist = templist.concat(res.data.data);
//       }
//       if (self.page == 1) {
//         self.scrollTop();
//       }
//       self.setState({
//         productList: productlist,
//         nomore: self.page != 1 && res.data.data == '',
//         nodata: self.page == 1 && res.data.data == '',
//       });
//     },
//     function (err) {
//       Toast.showWithGravity(err.data.msg, Toast.LONG, Toast.CENTER);
//     },
//   );
// };

// getShop = () => {
//   const self = this;
//   const api = 'mall_search';
//   const params = {
//     keyword: self.state.key,
//     sortType: self.sort_type,
//     page: this.page,
//   };
//   request(
//     api,
//     params,
//     async function (res) {
//       var shoplist;
//       self.page_add = true;
//       if (self.page == 1) {
//         shoplist = res.data.data;
//       } else {
//         var templist = self.state.shopList;
//         shoplist = templist.concat(res.data.data);
//       }
//       await self.setState({
//         shopList: shoplist,
//         nomore: self.page != 1 && res.data.data == '',
//         nodata: self.page == 1 && res.data.data == '',
//       });
//       if (self.page == 1) {
//         self.scrollTop();
//       }
//     },
//     function (err) {
//       Toast.showWithGravity(err.data.msg, Toast.LONG, Toast.CENTER);
//     },
//   );
// };

// historyKey = async () => {
//   const keyHistory = await AsyncStorage.getItem('keyHistory');

//   // This will switch to the App screen or Auth screen and this loading
//   // screen will be unmounted and thrown away.
//   this.setState({keyHistory: keyHistory ? keyHistory.split(',') : ['']});
// };

// backHome = () => {
//   NavigationService.pop();
// };

// keySearch = async (item) => {
//   this.page = 1;
//   await this.setState({
//     key: item,
//     havesearch: true,
//   });
//   if (this.state.typeIndex == 0) {
//     this.getProduct();
//   } else {
//     this.getShop();
//   }
//   AsyncStorage.setItem('rookie_task1', '1');
// };

// historyClear = () => {
//   this.setState({
//     keyHistory: [''],
//   });
//   AsyncStorage.setItem('keyHistory', '');
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f9",
    width: pxToDp(750),
  },
  backtap: {
    width: pxToDp(150),
    height: pxToDp(80),
    paddingRight: pxToDp(30),
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: pxToDp(750),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: pxToDp(80),
  },
  input: {
    position: "relative",
    height: pxToDp(60),
  },
  input_area: {
    width: pxToDp(460),
    // height: pxToDp(62),
    // lineHeight: pxToDp(20),
    paddingLeft: pxToDp(62),
    paddingTop: pxToDp(10),
    paddingBottom: pxToDp(10),
    fontSize: pxToDp(24),
    backgroundColor: "#eaeef0",
    borderRadius: pxToDp(10),
  },
  search_type: {
    flexDirection: "row",
    paddingLeft: pxToDp(25),
    paddingRight: pxToDp(25),
    backgroundColor: "#fff",
    justifyContent: "space-around",
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(20),
    borderBottomWidth: pxToDp(2),
    borderBottomColor: "#f5f5f9",
  },
  type: {
    fontSize: pxToDp(32),
    color: "#1d1d1f",
    paddingBottom: pxToDp(10),
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
    borderBottomWidth: pxToDp(4),
    borderBottomColor: "#fff",
  },
  type_click: {
    fontSize: pxToDp(32),
    color: "#ff4d00",
    paddingBottom: pxToDp(10),
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
    borderBottomWidth: pxToDp(4),
    borderBottomColor: "#ff4d00",
  },
  condition_area: {
    height: pxToDp(77),
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  condition: {
    fontSize: pxToDp(32),
  },
  history_area: {
    width: pxToDp(750),
    backgroundColor: "#fff",
    paddingTop: pxToDp(50),
    paddingBottom: pxToDp(30),
  },
  title_area: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: pxToDp(720),
    marginRight: pxToDp(30),
  },
  history_key: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: pxToDp(690),
    marginTop: pxToDp(20),
    marginLeft: pxToDp(30),
    marginRight: pxToDp(30),
  },
  key: {
    color: "#1d1d1f",
    backgroundColor: "#f4f4f4",
    fontSize: pxToDp(24),
    marginLeft: pxToDp(15),
    marginRight: pxToDp(15),
    marginTop: pxToDp(15),
    marginBottom: pxToDp(15),
    paddingLeft: pxToDp(25),
    paddingRight: pxToDp(25),
    paddingTop: pxToDp(15),
    paddingBottom: pxToDp(15),
    borderRadius: pxToDp(8),
  },
  recomand: {
    width: pxToDp(750),
    height: pxToDp(110),
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: pxToDp(20),
  },
  line: {
    width: pxToDp(230),
    height: pxToDp(1),
    margin: pxToDp(10),
    backgroundColor: "#ff4d00",
  },
  recomandlogo: {
    width: pxToDp(36),
    height: pxToDp(36),
    margin: pxToDp(14),
  },
  recomandtitle: {
    fontSize: pxToDp(32),
    color: "#ff4d00",
    marginRight: pxToDp(10),
  },
  nodata: {
    width: pxToDp(750),
    alignItems: "center",
  },
  nodataup: {
    margin: pxToDp(50),
    color: "#3f4450",
    fontSize: pxToDp(36),
    fontWeight: "bold",
  },
  nodatacenter: {
    width: pxToDp(300),
    height: pxToDp(249),
  },
  nodatadown: {
    margin: pxToDp(50),
    fontSize: pxToDp(24),
    color: "#3f4450",
  },
});
