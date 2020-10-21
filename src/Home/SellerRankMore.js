// 查看更多

import React, {useState, useEffect} from 'react';

import pxToDp from '../util/util.js';
import GoodsList from '../components/goodList.js';

import {
  Alert,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Swiper from 'react-native-swiper';
import request from '../util/Request.js';
import LoadingActivity from '../components/loadingActivity.js';
import LinearGradient from 'react-native-linear-gradient';
function SellerRankMore({navigation, route}) {
  const {user_id} = route.params;
  const [detail, setDetail] = useState({});

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    const api = 'SellerRankDetail';
    const params = {user_id2: user_id};
    request(api, params, function (res) {
      console.log(res.data.data.goldInfo.goods_info);
      setDetail(res.data.data);
    });
  };

  return (
    <View style={styles.container}>
      {detail.goldInfo !== undefined && (
        <React.Fragment>
          <LinearGradient
            style={{alignSelf: 'stretch'}}
            start={{x: 0.2, y: 0}}
            end={{x: 0.8, y: 0}}
            colors={['#FD8B11', '#ff4d00']}>
            <View
              style={{
                alignItems: 'center',
                marginBottom: pxToDp(20),

                paddingBottom: pxToDp(20),
              }}>
              <Image
                style={{
                  borderRadius: pxToDp(300),
                  width: pxToDp(150),
                  height: pxToDp(150),
                  backgroundColor: 'black',
                  marginVertical: pxToDp(20),
                }}
                source={{uri: detail.goldInfo.headimg}}
              />
              <Text style={{color: 'white'}}>{detail.goldInfo.nick_name}</Text>
            </View>
          </LinearGradient>
          <View
            style={{
              backgroundColor: 'white',
              alignSelf: 'stretch',
              alignItems: 'center',
              padding: pxToDp(20),
            }}>
            <Text>
              今日卖出
              <Text style={{color: '#ff4d00'}}>
                {detail.goldInfo.need_download}
              </Text>
              单，晒一晒~
            </Text>
          </View>
          <ScrollView style={{flex: 1}}>
            <GoodsList
              //   showload={showLoading}
              //   nomore={noMore}
              dataList={detail.goldInfo.goods_info}
            />
          </ScrollView>
        </React.Fragment>
      )}
    </View>
  );
}
export default SellerRankMore;

var styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#f5f5f9',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
