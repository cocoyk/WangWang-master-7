import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';
import Toast from 'react-native-simple-toast';
// import request from '../../util/Request';
import pxToDp from '../util/util.js';
// import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

function ChatId(params) {
  const [chatid, setchatid] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.detailinfo}>
        <View style={styles.childinfo}>
          <Text style={styles.title}>微信号</Text>
          <TextInput
            style={styles.input_area}
            onChangeText={(newChatid) => setchatid(newChatid)}
            value={chatid}
            placeholder="微信号"
            placeholderTextColor="#7f7f85"
          />
        </View>
      </View>
      <TouchableOpacity
      // onPress={this.saveChatId}
      >
        <Text style={styles.button}>保存</Text>
      </TouchableOpacity>
    </View>
  );
}
export default ChatId;

// changeChatId() {
//   const self = this;
//   const api = 'bind_wechat_id';
//   const params = {wechat_id: self.state.chatid};
//   request(api, params, function () {
//     AsyncStorage.setItem('chatid', self.state.chatid);
//     DeviceEventEmitter.emit('refreshPage');
//     //   self.props.navigation.getParam("refreshData", "");
//     //   self.props.route.params.refreshData();
//     NavigationService.pop();
//   });
// }

// componentDidMount() {
//   this.getChatId();
// }

// getChatId = async () => {
//   const chatid = await AsyncStorage.getItem('chatid');
//   this.setState({
//     chatid: chatid,
//   });
// };

// saveChatId = () => {
//   if (this.state.chatid == '') {
//     Toast.showWithGravity('微信号不能为空', Toast.SHORT, Toast.CENTER);
//   } else {
//     this.changeChatId();
//   }
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  detailinfo: {
    width: pxToDp(750),
    backgroundColor: '#fff',
    marginTop: pxToDp(10),
  },
  childinfo: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    marginLeft: pxToDp(40),
    marginRight: pxToDp(40),
    paddingTop: pxToDp(10),
    paddingBottom: pxToDp(10),
  },
  title: {
    color: '#1D1D1F',
    fontSize: pxToDp(32),
  },
  input_area: {
    width: pxToDp(500),
    // height: pxToDp(50),
    // lineHeight: pxToDp(50),
    paddingLeft: pxToDp(62),
    fontSize: pxToDp(32),
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: '#fff',
  },
  button: {
    width: pxToDp(600),
    height: pxToDp(90),
    fontSize: pxToDp(36),
    marginTop: pxToDp(40),
    color: '#fefeff',
    backgroundColor: '#ff5186',
    textAlign: 'center',
    borderRadius: pxToDp(10),
    lineHeight: pxToDp(90),
  },
});
