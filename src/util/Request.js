// obtained from react native tutorials

import Axios from "axios";
import qs from "qs";
import AsyncStorage from "@react-native-community/async-storage";
import NavigationService from "../util/NavigationService.js";
import SimpleToast from "react-native-simple-toast";
import { APP_BASE_URL } from "../AppConfig";

async function request(api, params, successCallback, errorCallback) {
  params.channel_id = 2000;
  let appBaseUrl = APP_BASE_URL;
  if (api === "applogin") {
    appBaseUrl = "http://dl.wwzg01.com";
  }
  const data = qs.stringify(params);
  console.log("api测试", appBaseUrl);
  const headers = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    Accept: "application/json",
  };
  Axios.post(appBaseUrl + "/apixcx/" + api + "/", data, headers)
    .then(function (res) {
      if (res.data.code === 0) {
        if (successCallback) {
          successCallback(res);
        }
      } else if (res.data.code === -5000) {
        // token 错误或失效
        NavigationService.replace("Login");
      } else {
        if (errorCallback) {
          errorCallback(res);
        }
        console.error(api + "出错了: " + JSON.stringify(res.data));
      }
    })
    .catch(function (error) {
      Object.keys(error).forEach(function (key) {
        console.log(key, error[key]);
      });
      if (!error.response) {
        SimpleToast.show("网络错误，请检查网络连接", SimpleToast.LONG);
      }
      console.log(api, "出错了: ", error);
    });
}

export async function requestGet(api, params, successCallback, errorCallback) {
  if (!global.userToken) {
    console.log("获取token");
    global.userToken = await AsyncStorage.getItem("token");
  }
  if (params) {
    params.token = global.userToken;
    params.channel_id = 2000;
  }
  const appBaseUrl = APP_BASE_URL;
  let headers = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: global.userToken,
    },
  };
  Axios.get(appBaseUrl + "/api/" + api + "/", params, headers)
    .then(function (res) {
      if (res.data.code == 1) {
        if (successCallback) {
          successCallback(res);
        }
      } else if (res.data.code == -5000) {
        // token 错误或失效
        NavigationService.replace("Login");
      } else {
        if (errorCallback) {
          errorCallback(res);
        }
        console.error(api + "出错了: " + JSON.stringify(res.data));
      }
    })
    .catch(function (error) {
      Object.keys(error).forEach(function (key) {
        console.log(key, error[key]);
      });
      if (!error.response) {
        SimpleToast.show("网络错误，请检查网络连接", SimpleToast.LONG);
      }
      console.log(api, "出错了: ", error);
    });
}

export default request;
