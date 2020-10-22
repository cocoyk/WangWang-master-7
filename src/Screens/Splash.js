/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";

import SplashScreen from 'react-native-splash-screen';

import {
  View,
} from "react-native";

function Splash({ navigation }) {
  useEffect(() => {
    setTimeout(function () {
      SplashScreen.hide();
      navigation.navigate("Route");
    }, 3000);
  }, []);
  return (
    <View>
    </View>
  );
}
export default Splash;

