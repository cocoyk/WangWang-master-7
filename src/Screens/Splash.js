/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";

import pxToDp from "../util/util";

import {
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

function Splash({ navigation }) {
  useEffect(() => {
    setTimeout(function () {
      navigation.navigate("Route");
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
        source={require("../image/splash.png")}
      />
    </View>
  );
}
export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f9",
  },
});
