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
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Clipboard from '@react-native-community/clipboard';
import RNFetchBlob from 'rn-fetch-blob';

function ShareModal(props) {
  let sceenHeight = Dimensions.get('window').height; //屏幕高度
  const closeModal = () => {
    props.hiddenModal();
    // this.setState({
    //   modalVisible: false
    // })
  };

  const checkPermission = async () => {
    //Function to check the platform
    //If iOS the start downloading
    //If Android then ask for runtime permission

    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //Once user grant the permission start downloading

          downloadImage();
        } else {
          //If permission denied then show alert 'Storage Permission Not Granted'

          Toast.show('未授予存储权限', Toast.SHORT);
        }
      } catch (err) {
        //To handle permission related issue
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    //Main function to download the image
    let date = new Date(); //To add the time suffix in filename
    //Image URL which we want to download
    let image_URL = props.share_img;

    //Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    //Get config and fs from RNFetchBlob
    //config: To pass the downloading related options
    //fs: To get the directory path in which we want our image to download
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        //Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then((res) => {
        //Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));

        Toast.show('图片已成功保存到相册', Toast.SHORT);
      });
  };

  const getExtention = (filename) => {
    //To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const copyToClipboard = () => {
    let text =
      props.shareTemplateArr[0] +
      props.shareTemplateArr[1] +
      props.shareTemplateArr[2] +
      props.shareTemplateArr[3] +
      props.shareTemplateArr[4] +
      props.shareTemplateArr[99];
    Clipboard.setString(text);
    Toast.show('已复制分享链接到粘贴板', Toast.SHORT);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        closeModal();
      }}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <View
          style={{
            backgroundColor: 'white',
            padding: pxToDp(20),
            alignSelf: 'stretch',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: pxToDp(20),
            }}>
            <Text style={{fontSize: pxToDp(40)}}>分享</Text>
            <TouchableOpacity
              onPress={() => {
                closeModal();
              }}>
              <Image
                style={{width: pxToDp(50), height: pxToDp(50)}}
                source={require('../image/common_btn_close.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: pxToDp(20)}}>
            <Text style={{color: 'grey'}}>{props.shareTemplateArr[0]}</Text>
            <Text style={{color: 'grey'}}>{props.shareTemplateArr[1]}</Text>
            <Text style={{color: 'grey'}}>{props.shareTemplateArr[2]}</Text>
            <Text style={{color: 'grey'}}>{props.shareTemplateArr[3]}</Text>
            <Text style={{color: 'grey'}}>{props.shareTemplateArr[4]}</Text>
            <Text style={{color: 'grey'}}>{props.shareTemplateArr[99]}</Text>
          </View>
          <View
            style={{
              alignSelf: 'stretch',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: pxToDp(30),
                width: pxToDp(710),
              }}>
              <TouchableOpacity
                onPress={() => {
                  checkPermission();
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f9',
                    width: pxToDp(340),
                    height: pxToDp(130),
                    borderRadius: pxToDp(10),
                  }}>
                  <Text>复制文案并</Text>
                  <Text>生成分享图片</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  copyToClipboard();
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f9',
                    width: pxToDp(340),
                    height: pxToDp(130),
                    borderRadius: pxToDp(10),
                  }}>
                  <Text>复制</Text>
                  <Text>文案推广内容</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',

                width: pxToDp(710),
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f9',
                    width: pxToDp(340),
                    height: pxToDp(130),
                    borderRadius: pxToDp(10),
                  }}>
                  <Text>获取外部跳</Text>
                  <Text>转微信领券链接</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f9',
                    width: pxToDp(340),
                    height: pxToDp(130),
                    borderRadius: pxToDp(10),
                  }}>
                  <Text>旺旺小程序分享</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ShareModal;

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
