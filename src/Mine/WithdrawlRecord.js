import React, {useState} from 'react';
import pxToDp from '../util/util.js';
// import request from "../../util/Request";
// import Navigation from "../component/navigation";
// import NavigationService from "../../util/NavigationService.js";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

function WithdrawlRecord(params) {
  let page = 1;
  const [recordList, setRecordList] = useState([]);
  const [nodata, setNodata] = useState(false);

  const renderItem = ({item}) => {
    return (
      <View style={styles.childrecord}>
        <View style={styles.top}>
          <Text style={styles.title}>
            提现到{item.pay_type === 1 ? '支付宝' : '微信钱包'}
          </Text>
          <Text style={styles.amount}>￥{item.amount}</Text>
        </View>
        <View style={styles.top}>
          <Text style={styles.date}>{item.create_time}</Text>
          <Text style={styles.status}>已到账</Text>
        </View>
      </View>
    );
  };

  const keyExtractor = (item, index) => index.toString();
  return (
    <View style={styles.container}>
      {nodata ? (
        <Text style={styles.nodata}>暂无提现数据</Text>
      ) : (
        <ScrollView>
          <FlatList
            style={styles.list}
            data={recordList}
            // extraData={this.state}
            renderItem={(item) => this.renderItem(item)}
            keyExtractor={keyExtractor}
          />
        </ScrollView>
      )}
    </View>
  );
}
export default WithdrawlRecord;

const styles = StyleSheet.create({
  nodata: {
    fontSize: pxToDp(40),
    textAlign: 'center',
    marginTop: pxToDp(50),
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f9',
  },
  list: {
    marginTop: pxToDp(20),
    width: pxToDp(750),
    // marginBottom: 10,
    backgroundColor: '#F5F5F9',
  },
  childrecord: {
    width: pxToDp(750),
    paddingTop: pxToDp(30),
    paddingBottom: pxToDp(20),
    backgroundColor: '#FFF',
    paddingLeft: pxToDp(30),
    paddingRight: pxToDp(30),
    marginBottom: pxToDp(20),
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: pxToDp(10),
    paddingBottom: pxToDp(10),
  },
  title: {
    color: '#3f4450',
    fontSize: pxToDp(32),
  },
  amount: {
    flex: 1,
    textAlign: 'right',
    color: '#ff5186',
    fontWeight: 'bold',
    fontSize: pxToDp(48),
  },
  date: {
    flex: 1,
    color: '#848a99',
    fontSize: pxToDp(24),
  },
  status: {
    textAlign: 'right',
    color: '#848a99',
    fontSize: pxToDp(24),
  },
});
