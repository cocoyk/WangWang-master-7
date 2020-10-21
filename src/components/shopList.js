import React, {Component} from 'react';
import pxToDp from '../util/util';
// import NavigationService from "../../util/NavigationService.js";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class shopList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      shopList: [],
    };
  }

  componentDidMount() {}

  shopClick = (shop_id) => {
    NavigationService.push('Shop', {shop_id: shop_id});
  };

  goodsClick = (goods_id) => {
    NavigationService.push('Detail', {goodsId: goods_id});
  };

  render() {
    const self = this;
    const keyExtractor = (item, index) => index.toString();
    return (
      <View style={{width: pxToDp(750)}}>
        <FlatList
          style={styles.shoplist}
          numColumns={'1'}
          extraData={self.state}
          // eslint-disable-next-line react/prop-types
          data={self.props.dataList}
          renderItem={self.renderItem}
          keyExtractor={keyExtractor}
        />
        {self.props.showload ? (
          <View style={styles.loadingArea}>
            {self.props.nomore ? null : (
              <ActivityIndicator
                style={{marginBottom: pxToDp(10)}}
                size="small"
                color="#ED4F4F"
              />
            )}
            <Text style={styles.loadingText}>
              {self.props.nomore ? '已经到底了' : '正在加载'}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }

  renderItem = ({item}) => {
    const keyExtractor = (item, index) => index.toString();
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.shop_area}
          onPress={() => this.shopClick(item.mall_id)}>
          <Image
            source={{uri: item.img_url}}
            style={{width: pxToDp(100), height: pxToDp(100)}}
          />
          <View style={styles.shop_info}>
            <Text style={{color: '#1d1d1f', fontSize: pxToDp(32)}}>
              {item.mall_name}
            </Text>
            <View style={{color: '#1d1d1f', fontSize: pxToDp(32)}}>
              <Text style={styles.promote_rate}>全店推广{item.mall_rate}</Text>
            </View>
          </View>
          <Text style={styles.shop_view}>进店逛逛</Text>
        </TouchableOpacity>
        <FlatList
          style={styles.goodslist}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={item.goods}
          renderItem={this.renderItemGoods}
          keyExtractor={keyExtractor}
        />
      </View>
    );
  };

  renderItemGoods = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => this.goodsClick(item.goods_id)}>
        <View style={styles.other_goods}>
          <Image
            resizeMode="stretch"
            defaultSource={require('../image/common_img.jpg')}
            source={{uri: item.image_url}}
            style={styles.goods_img}
          />
          <Text numberOfLines={2} style={styles.goodsname}>
            {item.goods_name}
          </Text>
          <View style={styles.down_price}>
            <Text style={styles.price_title}>券后价</Text>
            <Text style={{color: '#1d1d1f', fontSize: pxToDp(24)}}>
              ￥{item.discount_price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    width: pxToDp(750),
    marginBottom: pxToDp(20),
    backgroundColor: '#FFF',
  },
  shop_area: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: pxToDp(20),
    marginRight: pxToDp(30),
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(20),
  },
  shop_info: {
    flex: 1,
    marginLeft: pxToDp(20),
    // width:pxToDp(440)
  },
  shop_view: {
    width: pxToDp(143),
    height: pxToDp(42),
    color: '#fff',
    backgroundColor: '#ff8387',
    textAlign: 'center',
    lineHeight: pxToDp(42),
    fontSize: pxToDp(24),
    borderTopRightRadius: pxToDp(22),
    borderBottomRightRadius: pxToDp(22),
    borderBottomLeftRadius: pxToDp(22),
    borderTopLeftRadius: pxToDp(22),
  },
  promote_rate: {
    width: pxToDp(150),
    height: pxToDp(32),
    textAlign: 'center',
    lineHeight: pxToDp(32),
    backgroundColor: '#ffe7e1',
    color: '#fa6d47',
    fontSize: pxToDp(22),
    borderTopRightRadius: pxToDp(6),
    borderBottomRightRadius: pxToDp(6),
    borderBottomLeftRadius: pxToDp(6),
    borderTopLeftRadius: pxToDp(6),
  },
  goodslist: {
    marginLeft: pxToDp(20),
  },
  loadingArea: {
    height: pxToDp(150),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: pxToDp(30),
  },
  shoplist: {
    color: '#F55186',
    marginTop: pxToDp(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F5F5F9',
  },
  other_goods: {
    width: pxToDp(230),
    alignItems: 'center',
  },
  goods_img: {
    width: pxToDp(210),
    height: pxToDp(210),
  },
  goodsname: {
    width: pxToDp(210),
    fontSize: pxToDp(24),
    color: '#3f4450',
    marginLeft: pxToDp(10),
    marginTop: pxToDp(15),
  },
  down_price: {
    flexDirection: 'row',
    width: pxToDp(210),
    marginLeft: pxToDp(10),
    marginTop: pxToDp(5),
    marginBottom: pxToDp(15),
    alignItems: 'center',
  },
  price_title: {
    color: '#4ac1a4',
    height: pxToDp(30),
    borderWidth: pxToDp(2),
    paddingLeft: pxToDp(8),
    paddingRight: pxToDp(2),
    fontSize: pxToDp(20),
    borderColor: '#4ac1a4',
    borderTopRightRadius: pxToDp(6),
    borderBottomRightRadius: pxToDp(6),
    borderBottomLeftRadius: pxToDp(6),
    borderTopLeftRadius: pxToDp(6),
  },
});
