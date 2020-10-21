//商户合作

import React, { useState } from "react";

import {
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import pxToDp from "../util/util";
function Collaboration(params) {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
        source={require("../image/collab.png")}
      />
    </View>
  );
}
export default Collaboration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
});
