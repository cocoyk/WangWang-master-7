import React, {Component} from 'react';
import request from '../../util/Request';
import pxToDp from '../../util/util';
import WechatModule from '../../util/WechatSdk';
import Navigation from '../component/navigation';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Text,
  View,
  Image,
  ScrollView,
  PermissionsAndroid,
  CameraRoll,
  ProgressBarAndroid,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
var RNFS = require('react-native-fs');
import {WECHAT_MINI_KEY, WECHAT_MINI_TYPE, APP_BASE_URL} from '../../AppConfig';

export default class AgentRule extends Component {
  share_card_title = '';
  share_card_img = '';
  share_img_id = 0;

  constructor(props) {
    super(props);
    this.state = {
      chatimg: '../image/common_icon_head.png',
      nickname: '未授权的访客',
      role: 2,
      vaild_member: null,
      vaild_team_member: null,
      vaild_promotion_income: null,
      member_require: 9999,
      team_member_require: 9999,
      promotion_income_require: 9999,
    };
  }

  componentDidMount() {
    this.getUserinfo();
    this.getMyupgradeCondition();
    this.getSetting();
    this.getShareCard();
    this.getSharePicture();
  }

  getUserinfo = async () => {
    const chatimg = await AsyncStorage.getItem('chatimg');
    const nickname = await AsyncStorage.getItem('nickname');
    const role = await AsyncStorage.getItem('role');
    this.setState({
      chatimg: chatimg,
      nickname: nickname,
      role: role,
    });
  };

  getMyupgradeCondition = () => {
    const self = this;
    const api = 'upgrade_complete_progress';
    const params = {};
    request(api, params, function (res) {
      self.setState({
        vaild_member: res.data.data.valid_agent_count,
        vaild_team_member: res.data.data.valid_team_agent_count,
        vaild_promotion_income: res.data.data.agent_total_income,
      });
    });
  };

  getSetting = () => {
    const self = this;
    const api = 'get_setting';
    const params = {};
    request(api, params, function (res) {
      self.setState({
        member_require: res.data.settings.upgrade_role_3_member_count,
        team_member_require: res.data.settings.upgrade_role_3_team_count,
        promotion_income_require:
          res.data.settings.upgrade_role_3_rebate_amount,
      });
    });
  };

  getShareCard = () => {
    const self = this;
    const api = 'share_mini_card_images';
    const params = {};
    request(api, params, function (res) {
      self.share_card_title = res.data.data[0].title;
      self.share_card_img = res.data.data[0].url;
    });
  };

  getSharePicture = () => {
    const self = this;
    const api = 'share_images';
    const params = {};
    request(api, params, function (res) {
      self.share_img_id = res.data.data[0].id;
    });
  };

  shareCard = async () => {
    const pid = await AsyncStorage.getItem('pid');
    const self = this;
    WechatModule.shareMiniProgramToWx(
      0,
      WECHAT_MINI_KEY,
      self.share_card_img,
      APP_BASE_URL,
      '/pages/home/home?scene=,' + pid + ',1',
      self.share_card_title,
      '',
      WECHAT_MINI_TYPE,
    );
  };

  sharePicture = () => {
    const self = this;
    const api = 'share_image_with_qrcode';
    console.log(self.share_img_id);
    const params = {image_id: self.share_img_id};
    Toast.showWithGravity('图片生成中,请稍后', Toast.LONG, Toast.CENTER);
    request(api, params, function (res) {
      // 图片
      let pathName = new Date().getTime() + 'qrcode.jpg';
      let downloadDest = `${RNFS.ExternalDirectoryPath}/${pathName}`;
      const options = {
        fromUrl: res.data.data,
        toFile: downloadDest,
        // progressDivider: 10,
        // begin: res => {
        // },
        // progress: res => {
        // }
      };
      // Platform.OS === "android";
      RNFS.downloadFile(options)
        .promise.then((res) => {
          if (res && res.statusCode === 200) {
            self.checkPermission(downloadDest);
          }
        })
        .catch((err) => {
          //下载出错时执行
          console.log(err);
        });
    });
  };

  checkPermission = async (path) => {
    try {
      //返回string类型
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      console.log('granted', granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        CameraRoll.saveToCameraRoll(path)
          .then((result) => {
            Toast.showWithGravity(
              '保存成功！地址如下：\n' + result,
              Toast.LONG,
              Toast.CENTER,
            );
            // alert("保存成功！地址如下：\n" + result);
          })
          .catch((error) => {
            Toast.showWithGravity(
              '保存失败！\n' + error,
              Toast.SHORT,
              Toast.CENTER,
            );
            // alert("保存失败！\n" + error);
          });
      } else {
        Toast.showWithGravity(
          '保存失败,请允许相关授权',
          Toast.LONG,
          Toast.CENTER,
        );
        console.log('获取读写权限失败');
      }
    } catch (err) {
      console.log(err.toString());
    }
  };

  upgradeLevel = () => {
    const self = this;
    const api = 'apply_agent';
    const params = {};
    request(api, params, function () {
      Toast.showWithGravity('升级成功', Toast.SHORT, Toast.CENTER);
      AsyncStorage.setItem('role', '2');
      self.setState({
        role: 2,
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Navigation title="代理升级" refresh={true} refresh_page="Mine" />
        <ScrollView style={styles.scrollarea}>
          <View style={styles.top}>
            <View style={styles.back}>
              <Image
                style={styles.chatimg}
                source={{uri: this.state.chatimg}}
              />
            </View>
            <Text numberOfLines={1} style={styles.nickname}>
              {this.state.nickname}
            </Text>
            <Image
              style={styles.level}
              source={
                this.state.role == 2
                  ? require('../image/mine_lv2.png')
                  : this.state.role == 3
                  ? require('../image/mine_lv3.png')
                  : require('../image/mine_lv1.png')
              }
            />
          </View>
          <View style={styles.content}>
            <View style={styles.title}>
              <View style={styles.line} />
              <Text style={styles.titletxt}>
                {this.state.role == 1 ? '经理团长权益' : '总监团长权益'}
              </Text>
              <View style={styles.line} />
            </View>
            <View style={styles.detail}>
              <View style={styles.detailchild}>
                <Image
                  style={styles.logo}
                  source={require('../image/system_icon_1.png')}
                />
                <Text style={styles.childtitle}>
                  {this.state.role == 1 ? '实习团长' : '经理团长'}
                </Text>
                <Text style={styles.childinfo}>所有权利</Text>
              </View>
              <View style={styles.detailchild}>
                <Image
                  style={styles.logo}
                  source={require('../image/system_icon_2.png')}
                />
                <Text style={styles.childtitle}>自购返佣</Text>
                <Text style={styles.childinfo}>
                  {this.state.role == 1 ? '50%' : '100%'}
                </Text>
              </View>
              <View style={styles.detailchild}>
                <Image
                  style={styles.logo}
                  source={require('../image/system_icon_3.png')}
                />
                <Text style={styles.childtitle}>分享返佣</Text>
                <Text style={styles.childinfo}>
                  {this.state.role == 1 ? '50%' : '90%'}
                </Text>
              </View>
              <View style={styles.detailchild}>
                <Image
                  style={styles.logo}
                  source={require('../image/system_icon_4.png')}
                />
                <Text style={styles.childtitle}>下级返佣</Text>
                <Text style={styles.childinfo}>
                  {this.state.role == 1 ? '20%' : '40%'}
                </Text>
              </View>
              <View style={styles.detailchild}>
                <Image
                  style={styles.logo}
                  source={require('../image/system_icon_5.png')}
                />
                <Text style={styles.childtitle}>团队返佣</Text>
                <Text style={styles.childinfo}>
                  {this.state.role == 1 ? '0%' : '20%'}
                </Text>
              </View>
              <View style={styles.detailchild}>
                <Image
                  style={styles.logo}
                  source={require('../image/system_icon_6.png')}
                />
                <Text style={styles.childtitle}>关联总监返佣</Text>
                <Text style={styles.childinfo}>10%</Text>
              </View>
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.title}>
              <View style={styles.line} />
              <Text style={styles.titletxt}>升级条件</Text>
              <View style={styles.line} />
            </View>
            {this.state.role != 1 && (
              <View style={styles.condition}>
                <View style={styles.conditionchild}>
                  <Image
                    style={styles.left}
                    source={require('../image/system_icon2_1.png')}
                  />
                  <View style={styles.right}>
                    <View style={styles.righttop}>
                      <Text style={styles.righttitle}>有效直属团长数</Text>
                      <Text style={styles.rightinfo}>
                        {this.state.vaild_member != null
                          ? this.state.vaild_member +
                            '/' +
                            this.state.member_require
                          : '加载中'}
                      </Text>
                    </View>
                    <ProgressBarAndroid
                      style={styles.progress}
                      indeterminate={false}
                      color="#ff5186"
                      styleAttr="Horizontal"
                      progress={
                        this.state.vaild_member / this.state.member_require
                      }
                    />
                  </View>
                </View>
                <View style={styles.conditionchild}>
                  <Image
                    style={styles.left}
                    source={require('../image/system_icon2_2.png')}
                  />
                  <View style={styles.right}>
                    <View style={styles.righttop}>
                      <Text style={styles.righttitle}>有效团队团长数</Text>
                      <Text style={styles.rightinfo}>
                        {this.state.vaild_team_member != null
                          ? this.state.vaild_team_member +
                            '/' +
                            this.state.team_member_require
                          : '加载中'}
                      </Text>
                    </View>
                    <ProgressBarAndroid
                      style={styles.progress}
                      indeterminate={false}
                      color="#ff5186"
                      styleAttr="Horizontal"
                      progress={
                        this.state.vaild_team_member /
                        this.state.team_member_require
                      }
                    />
                  </View>
                </View>
                <View style={styles.conditionchild}>
                  <Image
                    style={styles.left}
                    source={require('../image/system_icon2_3.png')}
                  />
                  <View style={styles.right}>
                    <View style={styles.righttop}>
                      <Text style={styles.righttitle}>累计佣金</Text>
                      <Text style={styles.rightinfo}>
                        {this.state.vaild_promotion_income != null
                          ? this.state.vaild_promotion_income +
                            '/' +
                            this.state.promotion_income_require
                          : '加载中'}
                      </Text>
                    </View>
                    <ProgressBarAndroid
                      style={styles.progress}
                      indeterminate={false}
                      color="#ff5186"
                      styleAttr="Horizontal"
                      progress={
                        this.state.vaild_promotion_income /
                        this.state.promotion_income_require
                      }
                    />
                  </View>
                </View>
              </View>
            )}
            <Text style={styles.destruction}>
              {this.state.role == 1
                ? '点击下方按钮，立即升级'
                : '有效定义：自购订单＞0或累计佣金＞0'}
            </Text>
          </View>
          {this.state.role != 1 ? (
            <View style={styles.down}>
              <TouchableOpacity onPress={this.sharePicture}>
                <Text style={styles.shareimg}>保存分享图片</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.shareCard}>
                <Text style={styles.sharecard}>邀请好友</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.down}>
              <TouchableOpacity onPress={this.upgradeLevel}>
                <Text style={styles.upgradebutton}>点击升级</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f9',
    alignItems: 'center',
  },
  scrollarea: {
    width: pxToDp(750),
  },
  top: {
    width: pxToDp(710),
    marginLeft: pxToDp(20),
    height: pxToDp(110),
    marginTop: pxToDp(60),
    marginBottom: pxToDp(60),
    borderRadius: pxToDp(20),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff5186',
  },
  back: {
    position: 'absolute',
    top: pxToDp(-38),
    left: pxToDp(40),
    width: pxToDp(130),
    height: pxToDp(130),
    borderRadius: pxToDp(65),
    backgroundColor: '#ff5186',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatimg: {
    width: pxToDp(120),
    height: pxToDp(120),
    borderRadius: pxToDp(60),
    borderColor: '#fff',
    borderWidth: pxToDp(4),
  },
  nickname: {
    width: pxToDp(330),
    marginLeft: pxToDp(190),
    fontSize: pxToDp(36),
    color: '#fff',
    fontWeight: 'bold',
  },
  level: {
    width: pxToDp(156),
    height: pxToDp(40),
  },
  content: {
    width: pxToDp(710),
    marginLeft: pxToDp(20),
    // height: pxToDp(120),
    marginBottom: pxToDp(20),
    borderRadius: pxToDp(20),
    borderColor: '#ffb4cb',
    alignItems: 'center',
    borderWidth: pxToDp(2),
  },
  title: {
    marginTop: pxToDp(40),
    marginBottom: pxToDp(20),
    alignItems: 'center',
    flexDirection: 'row',
  },
  line: {
    width: pxToDp(110),
    height: pxToDp(2),
    backgroundColor: '#ffb4cb',
  },
  titletxt: {
    fontSize: pxToDp(36),
    marginLeft: pxToDp(40),
    marginRight: pxToDp(40),
    color: '#ff5186',
  },
  detail: {
    flexDirection: 'row',
    marginBottom: pxToDp(20),
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  detailchild: {
    width: pxToDp(230),
    alignItems: 'center',
    marginTop: pxToDp(20),
    marginBottom: pxToDp(20),
  },
  logo: {
    width: pxToDp(90),
    height: pxToDp(90),
  },
  childtitle: {
    color: '#4b4f59',
    marginTop: pxToDp(10),
    marginBottom: pxToDp(6),
    fontSize: pxToDp(28),
  },
  childinfo: {
    color: '#848a99',
    fontSize: pxToDp(22),
  },
  condition: {
    width: pxToDp(710),
    marginTop: pxToDp(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  conditionchild: {
    flexDirection: 'row',

    marginBottom: pxToDp(60),
    alignItems: 'center',
  },
  left: {
    width: pxToDp(62),
    height: pxToDp(62),
    marginRight: pxToDp(55),
  },
  righttop: {
    flexDirection: 'row',
  },
  righttitle: {
    fontSize: pxToDp(28),
    color: '#4b4f59',
  },
  rightinfo: {
    fontSize: pxToDp(26),
    flex: 1,
    textAlign: 'right',
    color: '#848a99',
  },
  progress: {
    width: pxToDp(470),
    height: pxToDp(16),
  },
  destruction: {
    fontSize: pxToDp(24),
    color: '#848a99',
    marginBottom: pxToDp(30),
  },
  down: {
    marginBottom: pxToDp(80),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  shareimg: {
    width: pxToDp(340),
    height: pxToDp(90),
    fontSize: pxToDp(36),
    color: '#fff',
    backgroundColor: '#fa8566',
    textAlign: 'center',
    borderRadius: pxToDp(20),
    lineHeight: pxToDp(90),
  },
  sharecard: {
    width: pxToDp(340),
    height: pxToDp(90),
    fontSize: pxToDp(36),
    color: '#fff',
    backgroundColor: '#ff5186',
    textAlign: 'center',
    borderRadius: pxToDp(20),
    lineHeight: pxToDp(90),
  },
  upgradebutton: {
    width: pxToDp(680),
    height: pxToDp(90),
    fontSize: pxToDp(36),
    color: '#fff',
    backgroundColor: '#ff5186',
    textAlign: 'center',
    borderRadius: pxToDp(20),
    lineHeight: pxToDp(90),
  },
});
