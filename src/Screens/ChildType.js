import React, {useState} from 'react';
import pxToDp from '../util/util.js';

import GoodsList from '../components/goodList.js';

import SearchModal from '../components/searchModal.js';
import Nodata from '../components/nodata.js';
import LoadingActivity from '../components/loadingActivity.js';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import {useGestureHandlerRef} from '@react-navigation/stack';
function ChildType(params) {
  page = 1;
  role = 1;
  type_id = '';
  type_name = '';
  initType = '';
  sort_type = 0;
  page_add = true;

  const [typeList, setTypeList] = useState([
    {id: 0, name: '精选'},
    {id: 1, name: '女装'},
    {id: 2, name: '男装'},
    {id: 3, name: '内衣'},
    {id: 4, name: '美妆'},
    {id: 5, name: '水果'},
    {id: 6, name: '母婴'},
    {id: 7, name: '百货'},
    {id: 8, name: '美食'},
    {id: 9, name: '家具'},
    {id: 10, name: '运动'},
    {id: 11, name: '鞋包'},
    {id: 12, name: '汽车'},
    {id: 13, name: '手机'},
    {id: 14, name: '家装'},
    {id: 15, name: '电器'},
    {id: 16, name: '电脑'},
    {id: 17, name: '家具'},
  ]);
  const [productList, setProductList] = useState([
    {
      item_id: 1,
      coupon_id: 2,
      pict_url:
        'https://i.picsum.photos/id/321/200/300.jpg?hmac=1hjkl5WdcOOj525LK78s0QQQkN0b_qb1_xSacNQfMSk',
      merchant_type: 3,
      mall_name: '淘宝',
      title: '测试 测试 测试 测试 测试 测试',
      coupon_amount: 0.28,
      volume: 100,
      zk_final_price: 12,
    },
    {
      item_id: 1,
      coupon_id: 2,
      pict_url:
        'https://i.picsum.photos/id/321/200/300.jpg?hmac=1hjkl5WdcOOj525LK78s0QQQkN0b_qb1_xSacNQfMSk',
      merchant_type: 3,
      mall_name: '淘宝',
      title: '测试 测试 测试 测试 测试 测试',
      coupon_amount: 1,
      volume: 100,
      zk_final_price: 12,
    },
    {
      item_id: 1,
      coupon_id: 2,
      pict_url:
        'https://i.picsum.photos/id/321/200/300.jpg?hmac=1hjkl5WdcOOj525LK78s0QQQkN0b_qb1_xSacNQfMSk',
      merchant_type: 3,
      mall_name: '淘宝',
      title: '测试 测试 测试 测试 测试 测试',
      coupon_amount: 1,
      volume: 100,
      zk_final_price: 12,
    },
    {
      item_id: 1,
      coupon_id: 2,
      pict_url:
        'https://i.picsum.photos/id/321/200/300.jpg?hmac=1hjkl5WdcOOj525LK78s0QQQkN0b_qb1_xSacNQfMSk',
      merchant_type: 3,
      mall_name: '淘宝',
      title: '测试 测试 测试 测试 测试 测试',
      coupon_amount: 1,
      volume: 100,
      zk_final_price: 12,
    },
    {
      item_id: 1,
      coupon_id: 2,
      pict_url:
        'https://i.picsum.photos/id/321/200/300.jpg?hmac=1hjkl5WdcOOj525LK78s0QQQkN0b_qb1_xSacNQfMSk',
      merchant_type: 3,
      mall_name: '淘宝',
      title: '测试 测试 测试 测试 测试 测试',
      coupon_amount: 1,
      volume: 100,
      zk_final_price: 12,
    },
    {
      item_id: 1,
      coupon_id: 2,
      pict_url:
        'https://i.picsum.photos/id/321/200/300.jpg?hmac=1hjkl5WdcOOj525LK78s0QQQkN0b_qb1_xSacNQfMSk',
      merchant_type: 3,
      mall_name: '淘宝',
      title: '测试 测试 测试 测试 测试 测试',
      coupon_amount: 1,
      volume: 100,
      zk_final_price: 12,
    },
  ]);
  const [clickIndex, setClickIndex] = useState(0);
  const [low_price, setLow_price] = useState('');
  const [high_price, setHigh_price] = useState();
  const [shop_type, setShop_type] = useState(0);
  const [with_coupon, setWith_coupon] = useState();
  const [showloading, setShowloading] = useState(false);
  const [nodata, setNodata] = useState(false);
  const [nomore, setNomore] = useState(false);
  const [visibel, setVisibel] = useState(false);
  const keyExtractor = (item, index) => index.toString();

  const renderType = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{alignItems: 'center'}}
        onPress={() => this.typeClick(item.item.id, item.index)}>
        <Text
          style={[
            styles.typenormal,
            {
              color: type_id == item.item.id ? '#ff5186' : '#3f4450',
              fontWeight: type_id == item.item.id ? 'bold' : '400',
            },
          ]}>
          {item.item.name}
        </Text>
        <Text
          style={[
            styles.row_line,
            {
              backgroundColor: type_id == item.item.id ? '#ff5186' : '#fff',
            },
          ]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.typelist}>
        <FlatList
          data={typeList}
          // style={{ flex: 0 }}
          // eslint-disable-next-line react/no-string-refs
          // ref="_flatlist"
          // extraData={this.state}
          // getItemLayout={(param, index) => (
          //     {length: pxToDp(50), offset: pxToDp(50) * index, index}
          //   )}
          renderItem={(item) => renderType(item)}
          // style={styles.typelist}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={keyExtractor}
        />
      </View>
      {visibel && (
        <SearchModal
        // conditionState={this.state}
        // searchCondition={this.searchCondition}
        // hiddenModal={this.modalClose}
        />
      )}
      {typeList.length > 0 && (
        <View style={styles.condition_area}>
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() => this.conditionClick(0)}
          >
            <Text
              style={[
                styles.condition,
                {color: clickIndex == 0 ? '#ff5186' : '#3f4450'},
              ]}>
              综合
            </Text>
          </TouchableOpacity>
          {role != 1 && (
            <TouchableOpacity
              activeOpacity={0.8}
              // onPress={() => this.conditionClick(1)}
            >
              <Text
                style={[
                  styles.condition,
                  {
                    color: clickIndex == 1 ? '#ff5186' : '#3f4450',
                  },
                ]}>
                佣金
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() => this.conditionClick(2)}
          >
            <Text
              style={[
                styles.condition,
                {color: clickIndex == 2 ? '#ff5186' : '#3f4450'},
              ]}>
              销量
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            // onPress={() => this.conditionClick(3)}
          >
            <Text
              style={[
                styles.condition,
                {
                  color: clickIndex == 3 ? '#ff5186' : '#3f4450',
                },
              ]}>
              价格
            </Text>
            <Image
              style={{
                width: pxToDp(28),
                height: pxToDp(28),
              }}
              source={
                clickIndex == 3
                  ? sort_type == 3
                    ? require('../image/price_up.png')
                    : require('../image/price_down.png')
                  : require('../image/price_normal.png')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            // onPress={this.showSearchModal}
          >
            <Text
              style={[
                styles.condition,
                {
                  color:
                    low_price != '' ||
                    high_price != '' ||
                    shop_type != 0 ||
                    with_cupon != 0
                      ? '#ff5186'
                      : '#3f4450',
                },
              ]}>
              筛选
            </Text>
            <Image
              style={{
                width: pxToDp(28),
                height: pxToDp(28),
              }}
              source={require('../image/serach_icon_screen.png')}
            />
          </TouchableOpacity>
        </View>
      )}
      <ScrollView
        // eslint-disable-next-line react/no-string-refs
        // ref="_scrollview"
        onScroll={(event) => onscroll(event)}>
        {nodata ? (
          <Nodata />
        ) : productList != '' ? (
          <GoodsList
            showload={showloading}
            nomore={nomore}
            dataList={productList}
          />
        ) : (
          <View style={{marginTop: pxToDp(300)}}>
            <LoadingActivity />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default ChildType;

// getProduct = (type_id) => {
//   const self = this;
//   const api = 'goods_list';
//   const params = {
//     category_id: type_id,
//     page: self.page,
//     sort_type: self.sort_type,
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
//       self.setState({
//         productList: productlist,
//         nodata: res.data.data == '' && self.page == 1,
//         nomore: res.data.data == '' && self.page != 1,
//       });
//       if (self.page == 1) {
//         self.scrollTop();
//       }
//     },
//     function (err) {
//       Toast.showWithGravity(err.data.msg, Toast.SHORT, Toast.CENTER);
//     },
//   );
// };

// getType = (type_id) => {
//   const self = this;
//   const api = 'category';
//   const params = {parent_category_id: type_id, with_image: 0};
//   request(api, params, function (res) {
//     var all = {
//       id: self.initType,
//       name: '全部',
//     };
//     var typelist = res.data.data;
//     typelist.unshift(all);
//     self.setState({
//       typeList: typelist,
//     });
//   });
// };

// componentDidMount() {
//   let self = this;
//   const type_id = self.props.navigation.getParam('typeId', '');
//   const type_name = self.props.navigation.getParam('typeName', '');
//   if (type_id) {
//     self.initType = type_id;
//     self.type_id = type_id;
//     self.type_name = type_name;
//     self.getProduct(type_id);
//     self.getType(type_id);
//   }
// }

// onscroll(event) {
//   //  page++
//   // console.log('next',event)
//   let contentHeight = event.nativeEvent.contentSize.height; //内容高度
//   let pageHeight = event.nativeEvent.layoutMeasurement.height; //屏幕高度
//   let scrollHeight = event.nativeEvent.contentOffset.y; //滑动距离
//   if (!showloading) {
//     this.setState({
//       showloading: true,
//     });
//   }
//   if (this.page_add) {
//     if (
//       scrollHeight + pageHeight + 200 >= contentHeight &&
//       contentHeight >= pageHeight
//     ) {
//       this.page++;
//       this.page_add = false;
//       this.getProduct(this.type_id);
//     }
//   }
// }

// scrollTop = () => {
//   let self = this;
//   self.refs._scrollview.scrollTo({x: 0, y: 0, animated: false});
// };

// typeClick = (id, indexId) => {
//   // eslint-disable-next-line react/no-string-refs
//   this.refs._flatlist.scrollToIndex({
//     animated: true,
//     viewPosition: 0.5,
//     index: indexId,
//   });
//   this.setState({
//     showloading: false,
//   });
//   this.page = 1;
//   this.type_id = id;
//   this.getProduct(id);
// };

// conditionClick = (index) => {
//   this.page = 1;
//   this.setState({
//     clickIndex: index,
//   });
//   let inittype = this.sort_type;
//   if (index == 0) {
//     this.sort_type = 0;
//   } else if (index == 1) {
//     this.sort_type = inittype != 14 ? 14 : 13;
//   } else if (index == 2) {
//     this.sort_type = inittype != 6 ? 6 : 5;
//   } else {
//     this.sort_type = inittype != 3 ? 3 : 4;
//   }
//   this.getProduct(this.type_id);
// };

// showSearchModal = () => {
//   this.setState({
//     visibel: true,
//   });
// };

// modalClose = () => {
//   this.setState({
//     visibel: false,
//   });
// };

// searchCondition = async (state) => {
//   console.log('state', state);
//   this.page = 1;
//   await this.setState({
//     low_price: state.low_price,
//     high_price: state.high_price,
//     shop_type: state.shop_type,
//     with_cupon: state.with_cupon,
//     productList: [],
//   });
//   this.getProduct(this.type_id);
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: pxToDp(750),
    backgroundColor: '#f5f5f9',
  },
  typelist: {
    // width: pxToDp(750),
    // flexDirection: "row",
    backgroundColor: '#fff',
    // justifyContent: "center",
    // height: pxToDp(80),
    alignItems: 'center',
  },
  typenormal: {
    marginLeft: pxToDp(15),
    marginRight: pxToDp(15),
    marginBottom: pxToDp(10),
    fontSize: pxToDp(30),
    // borderBottomWidth: pxToDp(2),
    // borderBottomColor: "#fff",
  },
  row_line: {
    width: pxToDp(36),
    height: pxToDp(4),
    borderRadius: pxToDp(2),
  },
  condition_area: {
    height: pxToDp(77),
    borderTopColor: '#eaeaef',
    borderTopWidth: pxToDp(1),
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  condition: {
    fontSize: pxToDp(32),
  },
});
