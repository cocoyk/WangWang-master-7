import React, {useState} from 'react';
import pxToDp from '../util/util.js';

import {
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

function ProductList(props) {
  const [role, setRole] = useState('');

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => this.goodsClick(item.goods_id)}>
        <View style={styles.container}>
          <Image
            resizeMode="stretch"
            source={{uri: item.goods_img}}
            style={styles.thumbnail}
          />
          <View style={styles.goodsinfo}>
            <Text numberOfLines={2} style={styles.goodsname}>
              {item.goods_name}
            </Text>
            <Text style={styles.saleacount}>销量{item.sold_quantity}件</Text>
            {role !== 1 ? (
              <Text style={styles.promotemoney}>
                赚￥
                {role === 2
                  ? (item.promotion_price * 0.5).toFixed(2)
                  : item.promotion_price.toFixed(2)}
              </Text>
            ) : (
              <Text style={styles.promotemoney}>立即购买</Text>
            )}
            <View style={styles.down}>
              <View style={styles.down_price}>
                <View style={styles.coupondiscount}>
                  <Text style={styles.coupon}>券</Text>
                  <Text style={styles.discount}>
                    ￥{item.coupon_discount}元
                  </Text>
                </View>
                <View style={styles.price}>
                  <Text
                    style={{
                      color: '#1d1d1f',
                      lineHeight: pxToDp(28),
                      fontSize: pxToDp(22),
                    }}>
                    券后￥
                  </Text>
                  <Text
                    style={{
                      color: '#1d1d1f',
                      lineHeight: pxToDp(28),
                      fontSize: pxToDp(28),
                    }}>
                    {item.discount_price}元
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item, index) => index.toString();
  return (
    <View style={{width: pxToDp(750)}}>
      <FlatList
        // contentContainerStyle={{margin: pxToDp(10)}}
        style={styles.goodslist}
        numColumns={'2'}
        // extraData={self.state}
        // eslint-disable-next-line react/prop-types
        data={props.dataList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      {props.showload ? (
        <View style={styles.loadingArea}>
          {props.nomore ? null : (
            <ActivityIndicator
              style={{
                marginBottom: pxToDp(10),
              }}
              size="small"
              color="#ff5186"
            />
          )}
          <Text style={styles.loadingText}>
            {props.nomore ? '已加载完毕' : '正在加载'}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
export default ProductList;

const styles = StyleSheet.create({
  container: {
    width: pxToDp(750),

    paddingBottom: pxToDp(30),
    paddingLeft: pxToDp(20),
    paddingTop: pxToDp(30),
    paddingRight: pxToDp(20),
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderBottomColor: '#eaeaef',
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
    position: 'relative',
    paddingLeft: pxToDp(20),
    backgroundColor: '#fff',
    borderBottomLeftRadius: pxToDp(14),
    borderBottomRightRadius: pxToDp(14),
  },
  goodsname: {
    width: pxToDp(480),
    fontSize: pxToDp(28),
    paddingRight: pxToDp(10),
    backgroundColor: '#fff',
  },
  coupondiscount: {
    flexDirection: 'row',
    borderWidth: pxToDp(2),
    borderColor: '#FF5186',
    borderTopLeftRadius: pxToDp(10),
    borderBottomLeftRadius: pxToDp(10),
    borderTopRightRadius: pxToDp(8),
    borderBottomRightRadius: pxToDp(8),
  },
  coupon: {
    paddingLeft: pxToDp(6),
    paddingRight: pxToDp(6),
    paddingBottom: pxToDp(2),
    fontSize: pxToDp(22),
    color: '#FFFFFF',
    backgroundColor: '#FF5186',
    borderTopLeftRadius: pxToDp(8),
    borderBottomLeftRadius: pxToDp(8),
  },
  discount: {
    paddingLeft: pxToDp(6),
    paddingRight: pxToDp(10),
    paddingBottom: pxToDp(2),
    fontSize: pxToDp(22),
    color: '#FF5186',
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: pxToDp(10),
    borderBottomRightRadius: pxToDp(10),
  },
  saleacount: {
    color: '#848a99',
    marginRight: pxToDp(10),
    marginTop: pxToDp(4),
    marginBottom: pxToDp(6),
    fontSize: pxToDp(22),
  },
  promotemoney: {
    position: 'absolute',
    bottom: pxToDp(44),
    left: pxToDp(20),
    color: '#ffffff',
    backgroundColor: '#FF5186',
    paddingLeft: pxToDp(10),
    marginBottom: pxToDp(10),
    paddingRight: pxToDp(10),
    paddingBottom: pxToDp(1),
    borderRadius: pxToDp(4),
    fontSize: pxToDp(24),
  },
  down: {
    position: 'absolute',
    bottom: pxToDp(0),
    left: pxToDp(20),
    // marginTop: pxToDp(10),
    // alignItems: "center",
    // marginBottom: pxToDp(15),
    backgroundColor: '#fff',
  },
  down_price: {
    flexDirection: 'row',
    marginTop: pxToDp(10),
  },
  price: {
    // flex: 1,
    flexDirection: 'row',
    marginLeft: pxToDp(20),
    // justifyContent:'flex-end',
    alignItems: 'flex-end',
  },
  loadingArea: {
    height: pxToDp(150),
    // marginTop: pxToDp(50),
    // marginBottom: pxToDp(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: pxToDp(30),
  },
  btn: {
    height: pxToDp(35),
    backgroundColor: '#4d796e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: pxToDp(10),
    borderWidth: pxToDp(2),
    borderColor: '#ffffff',
  },
  goodslist: {
    marginTop: pxToDp(10),
    backgroundColor: '#FFF',
  },
});
