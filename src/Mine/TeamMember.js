import React, {Component} from 'react';
import Navigation from '../component/navigation';
import pxToDp from '../../util/util';
import Pagination from '../component/pagination';
import Nodata from '../component/nodata';
import LoadingActivity from '../component/loadingActivity';
import NavigationService from '../../util/NavigationService.js';
import request from '../../util/Request';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default class TeamMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodata: false,
      nomore: false,
      typeIndex: 0,
      memberList: [],
    };
    this.typeIndex = 0;
    this.typelist = ['我的徒弟', '我的徒孙'];
    this.page = 1;
  }

  componentDidMount() {
    this.getTeamList();
  }

  getTeamList() {
    const self = this;
    const api = 'my_apprentice';
    const params = {
      page: self.page,
      type: self.typeIndex + 1,
    };
    request(api, params, function (res) {
      console.log(api, params.type, res);
      if (params.type == self.typeIndex + 1) {
        let memberlist;
        if (params.page == 1) {
          memberlist = res.data.data;
        } else {
          let templist = self.state.memberList;
          memberlist = templist.concat(res.data.data);
        }
        self.setState({
          memberList: memberlist,
          nodata: params.page == 1 && res.data.data == '',
          nomore: params.page != 1 && res.data.data == '',
        });
      }
    });
  }

  typeChange = (id) => {
    const self = this;
    console.log(self.typeIndex, id);
    if (self.typeIndex != id) {
      self.page = 1;
      self.typeIndex = id;
      self.getTeamList();
      self.setState({
        memberList: [],
        nomore: false,
        nodata: false,
        typeIndex: id,
      });
    }
  };

  reachedBottom = () => {
    this.page++;
    this.getTeamList();
  };

  renderFooter = () => {
    return (
      <View style={styles.loadingArea}>
        {this.state.nomore ? null : (
          <ActivityIndicator size="small" color="#ff5186" />
        )}
        <Text style={styles.loadingText}>
          {this.state.nomore ? '已加载完毕' : '正在加载'}
        </Text>
      </View>
    );
  };

  toMemberDetail = (data) => {
    NavigationService.push('MemberInfo', {
      user_id: data.pid,
    });
  };

  render() {
    const keyExtractor = (item, index) => index.toString();
    return (
      <View style={styles.container}>
        <Navigation title="我的徒弟" refresh={true} refresh_page="Mine" />
        <Text style={styles.toptitle}>
          师傅可以提徒弟任务的20%提成，提徒孙任务的10%提成
        </Text>
        <View style={styles.typetab}>
          {this.typelist.map((item, index) => {
            //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                key={index}
                style={styles.typechildback}
                onPress={() => this.typeChange(index)}>
                <Text
                  style={
                    this.state.typeIndex === index
                      ? styles.typechild_click
                      : styles.typechild
                  }>
                  {item}
                </Text>
                <Text
                  style={{
                    width: pxToDp(90),
                    height: pxToDp(2),
                    backgroundColor:
                      this.state.typeIndex == index ? '#EF5C6B' : '#fff',
                  }}></Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {this.state.nodata ? (
          <Nodata />
        ) : (
          <FlatList
            style={styles.memberList}
            extraData={this.state}
            // horizontal={true}
            // showsHorizontalScrollIndicator={false}
            onEndReached={() => this.reachedBottom()}
            ListFooterComponent={this.renderFooter}
            data={this.state.memberList}
            renderItem={this.renderItem}
            keyExtractor={keyExtractor}
          />
        )}
      </View>
    );
  }

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.child}
        onPress={() => this.toMemberDetail(item)}>
        <Image
          style={{
            width: pxToDp(90),
            height: pxToDp(90),
            borderRadius: pxToDp(45),
          }}
          source={{uri: item.avatar_url}}></Image>
        <View style={{flex: 1, marginLeft: pxToDp(20)}}>
          <Text
            style={{
              maxWidth: pxToDp(500),
              fontSize: pxToDp(36),
              color: '#212121',
              fontWeight: '500',
            }}
            numberOfLines={1}>
            {item.nickname}
          </Text>
          <Text style={{fontSize: pxToDp(26), color: '#9a9a9a'}}>
            {item.create_time}
          </Text>
        </View>
        <Image
          style={{width: pxToDp(18), height: pxToDp(32)}}
          source={require('../image/common_img_next3.png')}></Image>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  toptitle: {
    width: pxToDp(750),
    height: pxToDp(54),
    lineHeight: pxToDp(54),
    fontSize: pxToDp(24),
    color: '#343434',
    textAlign: 'center',
    backgroundColor: '#FFDEB3',
  },
  typetab: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: pxToDp(750),
    borderBottomColor: '#E4E4E4',
    borderBottomWidth: pxToDp(1),
    justifyContent: 'space-around',
  },
  typechildback: {
    width: pxToDp(375),
    paddingTop: pxToDp(30),
    alignItems: 'center',
  },
  typechild: {
    fontSize: pxToDp(28),
    paddingBottom: pxToDp(20),
    paddingLeft: pxToDp(15),
    paddingRight: pxToDp(15),
    fontWeight: '500',
    color: '#1d1d1f',
  },
  typechild_click: {
    fontSize: pxToDp(28),
    paddingBottom: pxToDp(20),
    paddingLeft: pxToDp(15),
    paddingRight: pxToDp(15),
    fontWeight: 'bold',
    color: '#ff5186',
  },
  child: {
    width: pxToDp(710),
    height: pxToDp(170),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: pxToDp(40),
    paddingRight: pxToDp(50),
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: pxToDp(2),
  },
  loadingArea: {
    height: pxToDp(100),
    marginTop: pxToDp(30),
    marginBottom: pxToDp(30),
    alignItems: 'center',
    textAlign: 'center',
  },
  loadingText: {
    color: '#848a99',
    marginTop: pxToDp(10),
  },
});
