/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/Screens/Login.js";
import PhoneLogin from "./src/Screens/PhoneLogin.js";
import Route from "./src/Screens/Route.js";
import CollecteGoods from "./src/Mine/CollectGoods.js";
import IncomeDetail from "./src/Mine/IncomeDetail.js";

import CustomerService from "./src/Mine/CustomerService.js";
import Personal from "./src/Mine/Personal.js";
import ChatId from "./src/Mine/ChatId.js";
import PhoneNum from "./src/Mine/PhoneNum.js";
import Withdrawl from "./src/Mine/Withdrawl.js";
import WithdrawlRecord from "./src/Mine/WithdrawlRecord.js";
import WithdrawCash from "./src/Mine/WithdrawCash.js";
import WithdrawComplete from "./src/Mine/WithdrawComplete.js";
import PromotionRule from "./src/Mine/PromotionRule.js";
import Setting from "./src/Mine/Setting.js";
import Collaboration from "./src/Mine/Collaboration.js";
import Search from "./src/Screens/Search.js";
import Detail from "./src/Screens/Detail.js";
import SellerRank from "./src/Home/SellerRank.js";
import SellerRankMore from "./src/Home/SellerRankMore.js";
import ChildType from "./src/Screens/ChildType.js";
import PlatformPage from "./src/Home/PlatformPage.js";
import MyFriends from "./src/Mine/MyFriends.js";
import MyFriendsDetail from "./src/Mine/MyFriendsDetail.js";
import MyOrder from "./src/Mine/MyOrder.js";
import MyRights from "./src/Mine/MyRights.js";
import Splash from "./src/Screens/Splash.js";
import ZhuangLian from "./src/Home/ZhuangLian.js";
import Invite from "./src/Home/Invite.js";
import JinQun from "./src/Home/JinQun.js";
import Newbie from "./src/Home/Newbie.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={Splash}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Route"
          component={Route}
        />
        {/* mine */}
        <Stack.Screen
          name="ZhuangLian"
          component={ZhuangLian}
          options={{ headerTitle: "转链" }}
        />
        <Stack.Screen
          name="Collboration"
          component={Collaboration}
          options={{ headerTitle: "商务合作" }}
        />
        <Stack.Screen
          name="Invite"
          component={Invite}
          options={{ headerTitle: "邀请好友" }}
        />
        <Stack.Screen
          name="Newbie"
          component={Newbie}
          options={{ headerTitle: "新人免单" }}
        />
        <Stack.Screen
          name="JinQun"
          component={JinQun}
          options={{ headerTitle: "专属客服" }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Search"
          component={Search}
        />
        <Stack.Screen
          options={{ headerTitle: "商品详情" }}
          name="Detail"
          component={Detail}
        />
        {/* mine */}
        <Stack.Screen
          options={{ headerTitle: "收藏夹" }}
          name="CollectGoods"
          component={CollecteGoods}
        />
        <Stack.Screen
          options={{ headerTitle: "收益详情" }}
          name="IncomeDetail"
          component={IncomeDetail}
        />

        <Stack.Screen
          options={{ headerTitle: "专属客服" }}
          name="CustomerService"
          component={CustomerService}
        />
        <Stack.Screen
          options={{ headerTitle: "个人中心" }}
          name="Personal"
          component={Personal}
        />
        <Stack.Screen
          options={{ headerTitle: "微信号" }}
          name="ChatId"
          component={ChatId}
        />
        <Stack.Screen
          options={{ headerTitle: "手机号" }}
          name="PhoneNum"
          component={PhoneNum}
        />
        <Stack.Screen
          options={{ headerTitle: "取款" }}
          name="Withdrawl"
          component={Withdrawl}
        />
        <Stack.Screen
          options={{ headerTitle: "我的权益" }}
          name="MyRights"
          component={MyRights}
        />
        <Stack.Screen
          options={{ headerTitle: "取款记录" }}
          name="WithdrawlRecord"
          component={WithdrawlRecord}
        />
        <Stack.Screen
          options={{ headerTitle: "取款" }}
          name="WithdrawCash"
          component={WithdrawCash}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="WithdrawComplete"
          component={WithdrawComplete}
        />
        <Stack.Screen
          options={{ headerTitle: "代理规范" }}
          name="PromotionRule"
          component={PromotionRule}
        />
        <Stack.Screen
          options={{ headerTitle: "设置" }}
          name="Setting"
          component={Setting}
        />
        <Stack.Screen
          options={{ headerTitle: "商家合作" }}
          name="Collaboration"
          component={Collaboration}
        />
        <Stack.Screen
          name="MyFriends"
          options={{ title: "我的好友" }}
          component={MyFriends}
        />
        <Stack.Screen
          options={{ title: "我的好友" }}
          name="MyFriendsDetail"
          component={MyFriendsDetail}
        />
        <Stack.Screen
          name="MyOrder"
          options={{ title: "我的订单" }}
          component={MyOrder}
        />
        {/* Homepage */}
        <Stack.Screen
          options={{ headerTitle: "卖家榜单" }}
          name="SellerRank"
          component={SellerRank}
        />
        <Stack.Screen
          options={{ headerTitle: "卖家" }}
          name="SellerRankMore"
          component={SellerRankMore}
        />
        <Stack.Screen
          options={{ headerTitle: "淘宝" }}
          name="PlatformPage"
          component={PlatformPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
