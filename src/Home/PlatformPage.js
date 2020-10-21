// 淘宝 etc。。。
import React, {useState, useEffect, useCallback} from 'react';
import GoodsList from '../components/goodList.js';
import pxToDp from '../util/util.js';

import {
  Alert,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Button,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

function PlatformPage({navigation}) {
  const [count, setCount] = useState(0);
  const [clickIndex, setclickIndex] = useState(0);
  const [currenIndex, setCurrenIndex] = useState(0);
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

  useEffect(() => {
    if (currenIndex < 25) {
      navigation.setOptions({
        headerTintColor: 'white',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,

          backgroundColor: '#ff4200',
        },
        headerTitle: '淘宝天猫',
        headerTitleStyle: {alignSelf: 'center'},
        headerRight: () => <View></View>,
      });
    } else {
      navigation.setOptions({
        headerTintColor: 'black',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,

          backgroundColor: 'white',
        },
        headerTitle: '淘宝天猫',
        headerTitleStyle: {alignSelf: 'center'},
        headerRight: () => <View></View>,
      });
    }
  }, [currenIndex]);

  const onScroll = (event) => {
    setCurrenIndex(event.nativeEvent.contentOffset.y);
  };

  const MemoGoodsList = React.memo(({productList}) => {
    console.log('rendered');
    return (
      <GoodsList
        //   showload={showLoading}
        //   nomore={noMore}
        dataList={productList}
      />
    );
  });

  return (
    <View style={styles.container}>
      {currenIndex < 25 && (
        <View
          style={{
            flex: 1,
            backgroundColor: '#ff4200',
            alignSelf: 'stretch',
            justifyContent: 'flex-end',
            paddingVertical: pxToDp(40),
          }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <View
                style={{
                  borderRadius: pxToDp(100),
                  margin: pxToDp(20),
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', margin: pxToDp(20)}}>
                  <Image
                    style={styles.searchlogo}
                    source={require('../image/search_icon.png')}
                  />
                  <Text style={{color: 'grey'}}>复制标题 搜索优惠券</Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    borderTopRightRadius: pxToDp(100),
                    borderBottomRightRadius: pxToDp(100),
                    paddingHorizontal: pxToDp(30),
                    alignItems: 'center',
                    backgroundColor: 'gold',
                  }}>
                  <Text style={{color: 'white'}}>搜商品</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View
        style={{
          flex: 4,

          alignSelf: 'stretch',
        }}>
        <View style={styles.condition_area}>
          <TouchableOpacity activeOpacity={0.8}>
            <Text
              style={[
                styles.condition,
                {
                  color: clickIndex === 0 ? '#ff5186' : '#3f4450',
                },
              ]}>
              综合
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8}>
            <Text
              style={[
                styles.condition,
                {
                  color: clickIndex === 2 ? '#ff5186' : '#3f4450',
                },
              ]}>
              销量
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.condition,
                {
                  color: clickIndex === 3 ? '#ff5186' : '#3f4450',
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
                clickIndex === 3
                  ? sort_type === 3
                    ? require('../image/price_up.png')
                    : require('../image/price_down.png')
                  : require('../image/price_normal.png')
              }
            />
          </TouchableOpacity>
        </View>

        <ScrollView onScroll={onScroll}>
          <MemoGoodsList productList={productList} />
        </ScrollView>
      </View>
    </View>
  );
}
export default PlatformPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#f5f5f9',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  searchlogo: {
    // position: "absolute",
    marginRight: pxToDp(15),
    width: pxToDp(33),
    height: pxToDp(33),
    // left: pxToDp(50)
  },
  condition_area: {
    height: pxToDp(80),
    paddingTop: pxToDp(-2),
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  condition: {
    fontSize: pxToDp(32),
  },
});
