import React, {useState, useEffect} from 'react';
import pxToDp from '../util/util.js';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Text,
  View,
  TextInput,
  Modal,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-simple-toast';

function searchModal(props) {
  let sceenHeight = Dimensions.get('window').height; //屏幕高度
  const [low_price, setLow_price] = useState('');
  const [high_price, setHigh_price] = useState('');
  const [shop_type, setShop_type] = useState('');
  const [with_cupon, setWith_cupon] = useState(0);

  useEffect(() => {
    setLow_price(props.low_price);
    setHigh_price(props.high_price);
    setShop_type(props.shop_type);
    setWith_cupon(props.with_cupon);
  }, []);

  const resetAndClose = () => {
    setLow_price('');
    setHigh_price('');
    setShop_type('');
    setWith_cupon(0);
    closeModal();
  };

  const closeModal = () => {
    props.hiddenModal();
    // this.setState({
    //   modalVisible: false
    // })
  };

  const conditionShop = () => {
    if (shop_type == '') {
      setShop_type(1);
    } else {
      setShop_type('');
    }
  };

  const searchCondition = () => {
    let reg = /^[1-9]\d*$|^0$|^\s*$/; //正整数
    if (reg.test(low_price) && reg.test(high_price)) {
      console.log('666');
      props.searchCondition({
        low_price: low_price,
        high_price: high_price,
        with_cupon: with_cupon,
        shop_type: shop_type,
      });
      props.hiddenModal();
      AsyncStorage.setItem('rookie_task2', '1');
    } else {
      Toast.showWithGravity('价格必须为整数', Toast.SHORT, Toast.CENTER);
    }
  };

  const conditionPrice = (id) => {
    var init_low;
    var init_high;
    if (id == 0) {
      init_low = 0;
      init_high = 14;
    } else if (id == 1) {
      init_low = 14;
      init_high = 30;
    } else if (id == 2) {
      init_low = 30;
      init_high = 50;
    } else {
      init_low = 50;
      init_high = '';
    }
    if (low_price == init_low && high_price == init_high) {
      setLow_price('');
      setHigh_price('');
    } else {
      setHigh_price(init_high);
      setLow_price(init_low);
    }
  };

  const conditioncoupon = () => {
    if (with_cupon == 1) {
      setWith_cupon(0);
    } else {
      setWith_cupon(1);
    }
  };

  return (
    <View style={{position: 'absolute'}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={true}
        onRequestClose={closeModal}
        // onRequestClose={() => self.closeModal()
      >
        <Text
          onPress={() => {
            closeModal();
          }}
          style={[styles.modalback, {height: sceenHeight}]}
        />
        <View style={styles.modalcontent}>
          <Text style={styles.modaltitle}>价格区间(元)</Text>
          <View style={styles.modalcondition}>
            <Text
              onPress={() => conditionPrice(0)}
              style={
                low_price == 0 && high_price == 14
                  ? styles.conditiondetailclick
                  : styles.conditiondetail
              }>
              0-14
            </Text>
            <Text
              onPress={() => conditionPrice(1)}
              style={
                low_price == 14 && high_price == 30
                  ? styles.conditiondetailclick
                  : styles.conditiondetail
              }>
              14-30
            </Text>
            <Text
              onPress={() => conditionPrice(2)}
              style={
                low_price == 30 && high_price == 50
                  ? styles.conditiondetailclick
                  : styles.conditiondetail
              }>
              30-50
            </Text>
            <Text
              onPress={() => conditionPrice(3)}
              style={
                low_price == 50 && high_price == ''
                  ? styles.conditiondetailclick
                  : styles.conditiondetail
              }>
              50以上
            </Text>

            <TextInput
              style={styles.input_area}
              onChangeText={(low_price) => this.setState({low_price})}
              value={String(low_price)}
              placeholder="最低价"
              placeholderTextColor="#7f7f85"
            />
            <Text style={styles.input_line} />
            <TextInput
              style={styles.input_area}
              onChangeText={(high_price) => this.setState({high_price})}
              value={String(high_price)}
              placeholder="最高价"
              placeholderTextColor="#7f7f85"
            />
          </View>
          <Text style={styles.modaltitle}>店铺偏好</Text>
          <View style={styles.modalcondition}>
            <Text
              // onPress={this.conditionShop}
              style={[
                shop_type == 1
                  ? styles.conditiondetailclick
                  : styles.conditiondetail,
                {width: pxToDp(250)},
              ]}>
              仅查看品牌商品
            </Text>
          </View>
          <Text style={styles.modaltitle}>优惠券</Text>
          <Text
            // onPress={this.conditioncoupon}
            style={[
              with_cupon == 1
                ? styles.conditiondetailclick
                : styles.conditiondetail,
              {width: pxToDp(250)},
            ]}>
            只看有优惠券
          </Text>
          <View style={styles.modaloperation}>
            <Text
              onPress={() => {
                resetAndClose();
              }}
              style={styles.conditionreset}>
              重置
            </Text>
            <Text
              onPress={() => {
                searchCondition();
              }}
              style={styles.conditioncomplete}>
              完成
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default searchModal;

const styles = StyleSheet.create({
  nodata: {
    width: pxToDp(750),
    fontSize: pxToDp(36),
    textAlign: 'center',
  },
  modalback: {
    position: 'absolute',
    width: pxToDp(750),
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d1d1f',
    zIndex: 50,
  },
  modalcontent: {
    position: 'absolute',
    width: pxToDp(600),
    top: pxToDp(180),
    left: pxToDp(75),
    paddingLeft: pxToDp(30),
    paddingRight: pxToDp(30),
    borderRadius: pxToDp(20),
    opacity: 1,
    backgroundColor: '#fff',
    zIndex: 100,
  },
  modaltitle: {
    fontSize: pxToDp(30),
    // fontWeight: "bold",
    color: '#ff4d00',
    paddingTop: pxToDp(40),
    paddingBottom: pxToDp(20),
  },
  modalcondition: {
    width: pxToDp(540),
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  conditiondetail: {
    width: pxToDp(120),
    height: pxToDp(70),
    lineHeight: pxToDp(70),
    textAlign: 'center',
    borderRadius: pxToDp(6),
    marginTop: pxToDp(10),
    marginBottom: pxToDp(10),
    fontSize: pxToDp(28),
    color: '#3f4450',
    backgroundColor: '#f4f4f4',
  },
  conditiondetailclick: {
    width: pxToDp(120),
    height: pxToDp(70),
    lineHeight: pxToDp(70),
    textAlign: 'center',
    borderRadius: pxToDp(6),
    marginTop: pxToDp(10),
    marginBottom: pxToDp(10),
    fontSize: pxToDp(28),
    color: '#fff',
    backgroundColor: '#ff4d00',
  },
  input_area: {
    width: pxToDp(230),
    height: pxToDp(70),
    marginTop: pxToDp(10),
    textAlign: 'center',
    paddingTop: pxToDp(10),
    paddingBottom: pxToDp(10),
    fontSize: pxToDp(28),
    backgroundColor: '#f4f4f4',
    borderRadius: pxToDp(6),
  },
  input_line: {
    width: pxToDp(30),
    height: pxToDp(1),
    marginTop: pxToDp(45),
    backgroundColor: '#848a99',
  },
  modaloperation: {
    height: pxToDp(100),
    width: pxToDp(600),
    marginLeft: pxToDp(-30),
    flexDirection: 'row',
    borderTopColor: '#ff4d00',
    borderTopWidth: pxToDp(1),
    marginTop: pxToDp(50),
  },
  conditionreset: {
    width: pxToDp(300),
    height: pxToDp(100),
    fontSize: pxToDp(38),
    lineHeight: pxToDp(100),
    textAlign: 'center',
    color: '#ff4d00',
  },
  conditioncomplete: {
    width: pxToDp(300),
    height: pxToDp(100),
    fontSize: pxToDp(38),
    backgroundColor: '#ff4d00',
    textAlign: 'center',
    borderBottomRightRadius: pxToDp(20),
    lineHeight: pxToDp(100),
    color: '#fff',
  },
});
