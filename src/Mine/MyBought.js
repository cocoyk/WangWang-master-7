import React, {useState} from 'react';

import pxToDp from '../util/util.js';

import LoadingActivity from '../components/loadingActivity.js';
import Nodata from '../components/nodata.js';

import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

function MyBought({navigation}) {
  let page = 1;
  let sceenHeight = Dimensions.get('window').height;

  const [brandList, setBrandList] = useState([]);
  const [nodata, setNodata] = useState(false);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        // onPress={() => this.shopToClick(item.goods_id)}
      >
        <View style={styles.child}>
          <View style={styles.childtop}>
            <Image
              style={styles.left}
              source={{uri: item.goods_thumbnail_url}}
            />
            <View style={styles.right}>
              <Text style={styles.righttop}>{item.goods_name}</Text>
              <View style={styles.rightdown}>
                <Text style={styles.amount}>
                  订单金额(元)￥{item.order_amount}
                </Text>
                <Text style={styles.status}>
                  {item.show_status == 0
                    ? item.order_status == -1
                      ? '待支付'
                      : item.order_status == 0
                      ? '等待成团'
                      : item.order_status == 1
                      ? '等待确认收货'
                      : '交易完成'
                    : item.show_status == 1
                    ? '售后中'
                    : '售后完成'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.childdown}>
            <Text style={styles.date}>
              {item.order_pay_time.replace('T', ' ')}下单
            </Text>
            {/* <Text style={styles.operation}>查看订单</Text> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item, index) => index.toString();
  return (
    <View style={styles.container}>
      {!nodata ? (
        <ScrollView
        // onScroll={(event) => this.onscroll(event)}
        >
          {brandList ? (
            <FlatList
              style={styles.brandList}
              // horizontal={true}
              // showsHorizontalScrollIndicator={false}
              data={brandList}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          ) : (
            <View style={{marginTop: pxToDp(300)}}>
              <LoadingActivity />
            </View>
          )}
        </ScrollView>
      ) : (
        <Nodata />
      )}
    </View>
  );
}
export default MyBought;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f9',
    alignItems: 'center',
  },
  brandList: {
    marginTop: pxToDp(10),
  },
  child: {
    backgroundColor: '#fff',
    padding: pxToDp(30),
    marginBottom: pxToDp(10),
  },
  childtop: {
    flexDirection: 'row',
    paddingBottom: pxToDp(20),
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#eaeaef',
  },
  left: {
    width: pxToDp(132),
    height: pxToDp(132),
    marginRight: pxToDp(20),
  },
  right: {
    width: pxToDp(536),
  },
  righttop: {
    fontSize: pxToDp(28),
    color: '#1d1d1f',
  },
  rightdown: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
  },
  amount: {
    flex: 1,
    fontSize: pxToDp(26),
    color: '#848a99',
  },
  status: {
    color: '#1d1d1f',
    fontSize: pxToDp(26),
  },
  childdown: {
    flexDirection: 'row',
    paddingTop: pxToDp(20),
    alignItems: 'center',
  },
  date: {
    color: '#848a99',
    fontSize: pxToDp(24),
    flex: 1,
  },
  operation: {
    color: '#848a99',
    width: pxToDp(141),
    height: pxToDp(45),
    textAlign: 'center',
    lineHeight: pxToDp(45),
    marginLeft: pxToDp(20),
    borderColor: '#848a99',
    borderWidth: pxToDp(2),
    borderRadius: pxToDp(22),
    fontSize: pxToDp(26),
  },
});
