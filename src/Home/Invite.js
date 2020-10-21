import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  PermissionsAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import pxToDp from "../util/util.js";
import request from "../util/Request.js";
import AsyncStorage from "@react-native-community/async-storage";
import Swiper from "react-native-swiper";
import RNFetchBlob from "rn-fetch-blob";
import Toast from "react-native-simple-toast";
import LoadingActivity from "../components/loadingActivity.js";

function Invite({ navigation }) {
  const [imgList, setImgList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLoading, setShowLoading] = useState(false);

  const openApp = () => {
    Linking.canOpenURL("weixin://")
      .then((supported) => {
        if (!supported) {
          console.log("无法打开");
        } else {
          return Linking.openURL("weixin://");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkPermission = async (imgURL) => {
    //Function to check the platform
    //If iOS the start downloading
    //If Android then ask for runtime permission

    if (Platform.OS === "ios") {
      downloadImage(imgURL);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message: "This app needs access to your storage to download Photos",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //Once user grant the permission start downloading

          downloadImage(imgURL);
        } else {
          //If permission denied then show alert 'Storage Permission Not Granted'

          Toast.show("未授予存储权限", Toast.SHORT);
        }
      } catch (err) {
        //To handle permission related issue
        console.warn(err);
      }
    }
  };

  const downloadImage = (imgURL) => {
    //Main function to download the image
    let date = new Date(); //To add the time suffix in filename
    //Image URL which we want to download
    let image_URL = imgURL;

    //Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = "." + ext[0];
    //Get config and fs from RNFetchBlob
    //config: To pass the downloading related options
    //fs: To get the directory path in which we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        //Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          "/image_" +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: "Image",
      },
    };
    config(options)
      .fetch("GET", image_URL)
      .then((res) => {
        //Showing alert after successful downloading
        console.log("res -> ", JSON.stringify(res));

        Toast.show("图片已成功保存到相册", Toast.SHORT);
      });
  };

  const getExtention = (filename) => {
    //To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const getImgList = () => {
    setShowLoading(true);
    AsyncStorage.getItem("token").then((val) => {
      console.log(val);
      if (val !== null) {
        const api = "inviteimg";
        const params = { platform: 1, token: val };
        request(api, params, function (res) {
          console.log(res.data.data.shareImgList);
          setImgList(res.data.data.shareImgList);
          setShowLoading(false);
        },function(res){
          navigation.navigate("Login");
        },function(res){
          navigation.navigate("Login");
        });
      } else {
        navigation.navigate("Login");
      }
    });
  };

  const getPoster = (type, id) => {
    setShowLoading(true);
    AsyncStorage.getItem("token").then((val) => {
      if (val !== null) {
        const api = "geninviteimg";
        const params = { platform: 1, token: val, type: type, imgId: id };
        request(api, params, function (res) {
          console.log(res.data.data);
          checkPermission(res.data.data.share_img);
          setShowLoading(false);
        },function(res){
          navigation.navigate("Login");
        },function(res){
          navigation.navigate("Login");
        });
      } else {
        navigation.navigate("Login");
      }
    });
  };
  useEffect(() => {
    getImgList();
  }, []);

  return (
    <View style={styles.container}>
      <Swiper
        style={{ paddingTop: pxToDp(30) }}
        onIndexChanged={(index) => {
          setCurrentIndex(index);
        }}
        autoplay={true}
        autoplayTimeout={4}
      >
        {imgList.map((el) => {
          return (
            <Image
              style={{
                borderWidth: pxToDp(20),
                borderColor: "white",
                alignSelf: "center",
                width: pxToDp(500),
                height: pxToDp(888),
              }}
              source={{ uri: el.image_url }}
            />
          );
        })}
      </Swiper>

      <View style={{ marginVertical: pxToDp(20), alignSelf: "center" }}>
        <Text style={{ color: "white" }}>
          新用户扫二维码识别小程序 / 授权登录即可绑定关系
        </Text>
      </View>
      <View
        alignSelf="stretch"
        flexDirection="row"
        justifyContent="space-evenly"
      >
        <TouchableOpacity
          onPress={() => {
            getPoster("imgId", imgList[currentIndex].id);
          }}
        >
          <LinearGradient
            style={{ borderRadius: pxToDp(10) }}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 0 }}
            colors={["#FD8B11", "#ff4d00"]}
          >
            <View
              style={{
                paddingVertical: pxToDp(10),
                paddingHorizontal: pxToDp(30),
              }}
            >
              <Text style={{ color: "white" }}>生成会员邀请码</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            getPoster("imgId", imgList[currentIndex].id);
            openApp();
          }}
        >
          <LinearGradient
            style={{ borderRadius: pxToDp(10) }}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 0 }}
            colors={["#FD8B11", "#ff4d00"]}
          >
            <View
              style={{
                paddingVertical: pxToDp(10),
                paddingHorizontal: pxToDp(30),
              }}
            >
              <Text style={{ color: "white" }}>分享小程序</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: pxToDp(20), alignSelf: "center" }}>
        <TouchableOpacity
          onPress={() => {
            getPoster("shouyi");
          }}
        >
          <LinearGradient
            style={{ borderRadius: pxToDp(10), marginBottom: pxToDp(20) }}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 0 }}
            colors={["#FD8B11", "#ff4d00"]}
          >
            <View
              style={{
                paddingVertical: pxToDp(10),
                paddingHorizontal: pxToDp(200),
              }}
            >
              <Text style={{ color: "white" }}>生成收益海报</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {showLoading === true && (
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              opacity: 0.6,
              width: pxToDp(150),
              height: pxToDp(150),
              borderRadius: pxToDp(20),
              backgroundColor: "grey",
            }}
          >
            <LoadingActivity />
          </View>
        </View>
      )}
    </View>
  );
}
export default Invite;
var styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#31313D",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
