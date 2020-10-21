import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import pxToDp from '../util/util';
import AsyncStorage from '@react-native-community/async-storage';
import request from '../util/Request.js';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-simple-toast';

function MyFriends({navigation, route}) {
  const keyExtractor = (item, index) => index.toString();

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Toast.show('已复制微信号到粘贴板', Toast.SHORT);
  };

  const {friendsList} = route.params;

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: '#f5f5f9',
          marginHorizontal: pxToDp(20),
          marginBottom: pxToDp(25),

          paddingTop: pxToDp(40),
          paddingBottom: pxToDp(20),
          paddingHorizontal: pxToDp(20),
          borderRadius: pxToDp(10),
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.avatar} source={{uri: item.headimgurl}} />
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.nameText}>{item.nick_name}</Text>
                <Text style={styles.idText}>{'(' + item.user_id + ')'}</Text>
              </View>
              <Text style={styles.dateText}>{item.login_time_show}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              copyToClipboard(item.link_wechat);
            }}>
            <Image
              style={{
                marginRight: pxToDp(20),
                height: pxToDp(46) * 1.5,
                width: pxToDp(52) * 1.5,
                tintColor: 'grey',
              }}
              source={require('../image/login2_img_wechat.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: pxToDp(2.5),
            backgroundColor: '#E1E1E1',
            marginHorizontal: pxToDp(20),
            marginTop: pxToDp(40),
            marginBottom: pxToDp(20),
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.highlitedText}>{item.invite_player_num}</Text>
            <Text style={{color: 'grey'}}>成员（人）</Text>
          </View>
          <View
            style={{
              width: pxToDp(2.5),
              marginVertical: pxToDp(7.5),
              alignSelf: 'stretch',
              backgroundColor: '#E1E1E1',
            }}
          />
          <View style={{alignItems: 'center'}}>
            <Text style={styles.highlitedText}>{item.pay_amount_total}</Text>
            <Text style={{color: 'grey'}}>拼多多销售额</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
        <View
          style={{
            paddingLeft: pxToDp(10),
            flexDirection: 'row',
            backgroundColor: '#f5f5f9',
            alignItems: 'center',
            width: pxToDp(500),
            borderRadius: pxToDp(5),
          }}>
          <Image
            style={styles.searchlogo}
            source={require('../image/search_icon.png')}
          />
          <Text style={styles.searchbutton}>搜索邀请码</Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: 'black',
              paddingVertical: pxToDp(20),
              paddingHorizontal: pxToDp(30),
              borderRadius: pxToDp(5),
            }}>
            <Text style={{color: 'white', fontSize: pxToDp(25)}}>搜索</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tabBar}>
        <View>
          <Text style={styles.tabText}>最近注册</Text>
          <View style={styles.tabLine} />
        </View>
        <View>
          <Text style={styles.tabText}>拼多多顺序</Text>
          <View style={styles.tabLine} />
        </View>
        <View>
          <Text style={styles.tabText}>运营商</Text>
          <View style={styles.tabLine} />
        </View>
      </View>
      <FlatList
        data={friendsList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}
export default MyFriends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  titleTxt: {
    marginLeft: pxToDp(20),
    fontSize: pxToDp(60),
    marginBottom: pxToDp(40),
  },
  searchArea: {
    padding: pxToDp(20),
    marginTop: pxToDp(20),
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: pxToDp(30),
  },
  searchlogo: {width: pxToDp(31), height: pxToDp(33)},
  searchbutton: {
    color: '#ABABAB',
    paddingLeft: pxToDp(10),
    fontSize: pxToDp(30),
  },

  tabBar: {
    padding: pxToDp(20),
    marginTop: pxToDp(20),
    marginBottom: pxToDp(20),
    marginHorizontal: pxToDp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabText: {
    fontSize: pxToDp(32),
  },
  tabLine: {
    alignSelf: 'center',
    marginTop: pxToDp(20),
    width: pxToDp(100),
    height: pxToDp(3),
    backgroundColor: 'black',
  },
  avatar: {
    height: pxToDp(80),
    width: pxToDp(80),
    borderRadius: pxToDp(100),
    marginRight: pxToDp(20),
  },
  dateText: {
    fontSize: pxToDp(25),
    color: 'grey',
  },
  idText: {
    color: 'grey',
  },
  nameText: {
    marginRight: pxToDp(20),
    fontSize: pxToDp(30),
    fontWeight: '900',
  },
  highlitedText: {
    marginBottom: pxToDp(20),
    fontSize: pxToDp(35),
    color: '#D5AB3D',
  },
});
