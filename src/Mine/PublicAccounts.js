import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import pxToDp from "../../util/util";
import Navigation from "../component/navigation";
import { packageVersion } from "../../util/CustomUpdate";
import {
  CHANNEL
} from "../../AppConfig"

export default class PublicAccounts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigation title="关注公众号" refresh={true} refresh_page="Mine" />
        <Image
          style={styles.img}
          source={require("../image/public_image.png")}
        />
        <Text style={styles.content}>微信公众号</Text>
        <Text style={styles.content}>xiaoyaotuanzhang</Text>
        <Text style={{ marginTop: pxToDp(20) }}>版本: {packageVersion} 渠道: {CHANNEL}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center"
  },
  img: {
    width: pxToDp(692),
    height: pxToDp(692),
    marginTop: pxToDp(55),
    marginBottom: pxToDp(70)
  },
  content: {
    fontSize: pxToDp(30),
    marginTop: pxToDp(6),
    color: "#1d1d1f"
  }
});
