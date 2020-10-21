import React, {Component} from 'react';
import pxToDp from '../util/util.js';

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class bottomTab extends Component {
  bottom_tab_content = [
    {
      pagePath: 'Task',
      text: '任务赚',
      iconPath: require('../image/bottom_icon_task_normal.png'),
      selectedIconPath: require('../image/bottom_icon_task_press.png'),
    },
    {
      pagePath: 'Read',
      text: '阅读赚',
      iconPath: require('../image/bottom_icon_home_normal.png'),
      selectedIconPath: require('../image/bottom_icon_home_press.png'),
    },
    {
      pagePath: 'Home',
      text: '逛逛',
      iconPath: require('../image/bottom_icon_stroll_normal.png'),
      selectedIconPath: require('../image/bottom_icon_stroll_press.png'),
    },
    {
      pagePath: 'Recommend',
      text: '热销榜单',
      iconPath: require('../image/bottom_icon_recommend_normal.png'),
      selectedIconPath: require('../image/bottom_icon_recommend_press.png'),
    },
    {
      pagePath: 'Mine',
      text: '我的',
      iconPath: require('../image/bottom_icon_mine_normal.png'),
      selectedIconPath: require('../image/bottom_icon_mine_press.png'),
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      is_signed: 1,
    };
  }

  componentDidMount = async () => {
    const self = this;
    console.log('55');
    const is_signed = await AsyncStorage.getItem('is_signed');
    self.setState({
      is_signed: is_signed,
    });
    //     console.log("系统", Platform.OS, self.props.navigation);
    //     StatusBar.setBarStyle(
    //       self.props.special ? "default" : "dark-content",
    //       false
    //     );
    //     StatusBar.setBackgroundColor(
    //       self.props.special ? "#ff5186" : "#fff",
    //       false
    //     );
  };

  //   goBack = () => {
  //     const self = this;
  //     NavigationService.pop();
  //     if (self.props.refresh) {
  //       DeviceEventEmitter.emit("refresh" + self.props.refresh_page);
  //     }
  //   };

  tabChange = (item, index) => {
    const self = this;
    if (index == 4) {
      StatusBar.setBarStyle('default', false);
      StatusBar.setBackgroundColor('#ff5186', false);
    } else {
      StatusBar.setBarStyle('dark-content', false);
      StatusBar.setBackgroundColor('#fff', false);
    }
    if (index == 6) {
      NavigationService.push('WebPage', {
        url: 'https://cpu.baidu.com/1057/ce143b8f?scid=29378',
      });
    } else {
      NavigationService.replace(item.pagePath);
    }
  };

  render() {
    const self = this;
    return (
      <View style={styles.footer}>
        {this.bottom_tab_content.map((item, index) => {
          //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
          return (
            <TouchableOpacity
              activeOpacity={1}
              key={index}
              onPress={() => this.tabChange(item, index)}
              style={styles.tabbutton}>
              <Image
                style={styles.icon}
                source={
                  self.props.selected_index == index
                    ? item.selectedIconPath
                    : this.is_signed == 0 && index == 0
                    ? require('../image/bottom_icon_home_normal.png')
                    : item.iconPath
                }
              />
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      self.props.selected_index == index
                        ? '#ff5186'
                        : '#a3a9b9',
                  },
                ]}>
                {this.is_signed == 0 &&
                index == 0 &&
                self.props.selected_index != index
                  ? '签到'
                  : item.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: pxToDp(0),
    backgroundColor: '#fff',
    width: pxToDp(750),
    flexDirection: 'row',
    height: pxToDp(120),
    borderTopColor: '#a3a9b9',
    borderTopWidth: pxToDp(2),
    zIndex: 10,
  },
  tabbutton: {
    width: pxToDp(150),
    height: pxToDp(120),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: pxToDp(60),
    height: pxToDp(60),
  },
  title: {
    fontSize: pxToDp(26),
  },
});
