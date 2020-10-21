import React, { Component } from "react";
import Navigation from "../component/navigation";
import request from "../../util/Request";
import {
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  CameraRoll
} from "react-native";
import Toast from "react-native-simple-toast";
const EZSwiper = require("react-native-ezswiper");
import WechatModule from "../../util/WechatSdk";
import AsyncStorage from "@react-native-community/async-storage";
import pxToDp from "../../util/util";
var RNFS = require("react-native-fs");
import {
  WECHAT_MINI_KEY,
  WECHAT_MINI_TYPE,
  APP_BASE_URL,
} from "../../AppConfig"

export default class Invite extends Component {
  sceenHeight = Dimensions.get("window").height;
  shareCardTitle = "";
  shareCardImg = "";
  shareImgId = 0;

  constructor(props) {
    super(props);
    this.state = {
      cardList: [],
      imgList: [],
      tabindex: 0
    };
  }

  componentDidMount() {
    this.getShareCard();
    this.getShareImg();
  }

  getShareCard() {
    const self = this;
    const api = "share_mini_card_images";
    const params = {};
    request(api, params, function (response) {
      self.shareCardImg = response.data.data[0].url;
      self.shareCardTitle = response.data.data[0].title;
      self.setState({
        cardList: response.data.data
      });
    });
  }

  getShareImg() {
    const self = this;
    const api = "share_images";
    const params = {};
    request(api, params, function (response) {
      self.shareImgId = response.data.data[0].id;
      self.setState({
        imgList: response.data.data
      });
    });
  }

  tabChange = index => {
    this.setState({
      tabindex: index
    });
  };

  shareToOthers = () => {
    if (this.state.tabindex == 0) {
      this.shareCard();
    } else {
      this.shareImg();
    }
  };

  shareCard = async () => {
    const pid = await AsyncStorage.getItem("pid");
    const self = this;
    WechatModule.shareMiniProgramToWx(
      0,
      WECHAT_MINI_KEY,
      self.shareCardImg,
      APP_BASE_URL,
      "/pages/home/home?scene=," + pid + ",1",
      self.shareCardTitle,
      "",
      WECHAT_MINI_TYPE
    );
  };

  shareImg() {
    const self = this;
    const api = "share_image_with_qrcode";
    const params = { image_id: self.shareImgId };
    Toast.showWithGravity("图片生成中,请稍后", Toast.LONG, Toast.CENTER);
    request(api, params, function (res) {
      // 图片
      let pathName = new Date().getTime() + "qrcode.jpg";
      let downloadDest = `${RNFS.ExternalDirectoryPath}/${pathName}`;
      const options = {
        fromUrl: res.data.data,
        toFile: downloadDest
        // progressDivider: 10,
        // begin: res => {
        // },
        // progress: res => {
        // }
      };
      // Platform.OS === "android";
      RNFS.downloadFile(options)
        .promise.then(res => {
          if (res && res.statusCode === 200) {
            self.checkPermission(downloadDest);
          }
        })
        .catch(err => {
          //下载出错时执行
          console.log(err);
        });
    });
  }

  checkPermission = async path => {
    try {
      //返回string类型
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      console.log("granted", granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        CameraRoll.saveToCameraRoll(path)
          .then(result => {
            Toast.showWithGravity(
              "保存成功！地址如下：\n" + result,
              Toast.LONG,
              Toast.CENTER
            );
            // alert("保存成功！地址如下：\n" + result);
          })
          .catch(error => {
            Toast.showWithGravity(
              "保存失败！\n" + error,
              Toast.SHORT,
              Toast.CENTER
            );
            // alert("保存失败！\n" + error);
          });
      } else {
        Toast.showWithGravity(
          "保存失败,请允许相关授权",
          Toast.LONG,
          Toast.CENTER
        );
        console.log("获取读写权限失败");
      }
    } catch (err) {
      console.log(err.toString());
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Navigation title="发展会员" refresh={true} refresh_page="Mine" />
        <View style={styles.tab}>
          <TouchableOpacity onPress={() => this.tabChange(0)}>
            <Text
              style={
                this.state.tabindex == 0
                  ? styles.tabchildclick
                  : styles.tabchild
              }
            >
              分享小程序
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.tabChange(1)}>
            <Text
              style={
                this.state.tabindex == 1
                  ? styles.tabchildclick
                  : styles.tabchild
              }
            >
              分享图片
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.info}>分享小程序给好友，好友购物将返利给你</Text>
        {this.state.tabindex == 0 ? (
          <EZSwiper
            style={styles.cardswiper}
            dataSource={this.state.cardList}
            width={pxToDp(750)}
            height={pxToDp(400)}
            autoplayTimeout={0}
            renderRow={this.renderCard}
            onDidChange={this.renderShowCard}
            cardParams={{
              cardSide: pxToDp(500),
              cardSmallSide: pxToDp(300)
              // cardSpace: pxToDp(0)
            }}
            ratio={0.867}
          />
        ) : (
            <EZSwiper
              style={styles.imgswiper}
              dataSource={this.state.imgList}
              width={pxToDp(750)}
              height={pxToDp(710)}
              autoplayTimeout={0}
              renderRow={this.renderImage}
              onDidChange={this.renderShowImage}
              cardParams={{
                cardSide: pxToDp(400),
                cardSmallSide: pxToDp(500)
                // cardSpace: pxToDp(20)
              }}
              ratio={0.867}
            />
          )}
        <TouchableOpacity onPress={this.shareToOthers}>
          <Text style={styles.share}>
            {this.state.tabindex == 0 ? "分享好友" : "保存分享图片"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderCard = item => {
    // var str = JSON.stringify(item);
    // var json = JSON.parse(str);
    // var a = item["id"];
    if (item && item.id) {
      return (
        <Image
          style={styles.card}
          resizeMode={"contain"}
          source={{ uri: item.url }}
        />
      );
    }
  };

  renderShowCard = currentItem => {
    if (currentItem && currentItem.id) {
      this.shareCardTitle = currentItem.title;
      this.shareCardImg = currentItem.url;
    }
  };

  renderImage = item => {
    // var str = JSON.stringify(item);
    // var json = JSON.parse(str);
    // var a = item["id"];
    if (item && item.id) {
      return (
        <Image
          style={styles.img}
          resizeMode={"contain"}
          source={{ uri: item.url }}
        />
      );
    }
  };

  renderShowImage = currentItem => {
    if (currentItem && currentItem.id) {
      this.shareImgId = currentItem.id;
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  tab: {
    width: pxToDp(750),
    paddingLeft: pxToDp(60),
    paddingRight: pxToDp(60),
    paddingTop: pxToDp(30),
    borderBottomColor: "#f5f5f9",
    borderBottomWidth: pxToDp(10),
    flexDirection: "row",
    justifyContent: "space-around"
  },
  tabchild: {
    fontSize: pxToDp(28),
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(20),
    color: "#1d1d1f",
    borderBottomColor: "#fff",
    borderBottomWidth: pxToDp(2)
  },
  tabchildclick: {
    fontSize: pxToDp(28),
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(20),
    color: "#ff5186",
    borderBottomColor: "#ff5186",
    borderBottomWidth: pxToDp(2)
  },
  info: {
    fontSize: pxToDp(28),
    color: "#848a99",
    paddingBottom: pxToDp(40),
    paddingTop: pxToDp(40)
  },
  cardswiper: {
    width: pxToDp(750),
    height: pxToDp(400)
  },
  imgswiper: {
    width: pxToDp(750),
    height: pxToDp(710)
  },
  card: {
    width: pxToDp(500),
    height: pxToDp(400)
  },
  img: {
    width: pxToDp(400),
    height: pxToDp(710)
  },
  share: {
    width: pxToDp(270),
    height: pxToDp(90),
    borderRadius: pxToDp(90),
    textAlign: "center",
    lineHeight: pxToDp(90),
    margin: pxToDp(60),
    color: "#fff",
    fontSize: pxToDp(36),
    backgroundColor: "#ff1476"
  }
});
