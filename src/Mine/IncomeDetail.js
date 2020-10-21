/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import pxToDp from "../util/util.js";

import Formate from "../util/formate.js";
import LinearGradient from "react-native-linear-gradient";
import LoadingActivity from "../components/loadingActivity.js";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Feather";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import request from "../util/Request.js";

function IncomeDetail(params) {
  const [viewOption, setViewOption] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  const [incomeDetail, setIncomeDetail] = useState();

  const getIncomeDetails = async () => {
    AsyncStorage.getItem("token").then((val) => {
      const api = "getIncomeDetailsList";
      const params = { token: val, total: 1 };
      console.log(val);
      request(api, params, function (res) {
        console.log(res.data.data);
        setIncomeDetail(res.data.data.incomedetailList);
      });
    });
  };

  useEffect(() => {
    getIncomeDetails();
  }, []);
  return (
    <View style={styles.container}>
      {incomeDetail !== undefined ? (
        <React.Fragment>
          <LinearGradient
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 0 }}
            colors={["#FD8B11", "#ff4d00"]}
            style={{ backgroundColor: "#131315" }}
          >
            <View
              style={{
                marginHorizontal: pxToDp(35),
                borderTopLeftRadius: pxToDp(10),
                borderTopRightRadius: pxToDp(10),
              }}
            >
              <View
                style={{
                  paddingHorizontal: pxToDp(20),
                  paddingVertical: pxToDp(50),
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    width: pxToDp(300),
                    paddingVertical: pxToDp(20),
                  }}
                >
                  <Text style={{ color: "white" }}>我在旺旺联盟赚了(元)</Text>
                  <Text style={{ color: "white" }}>
                    {incomeDetail.agent_amount_total}
                  </Text>
                </View>
                <View style={styles.bar} />
                <View
                  style={{
                    alignItems: "center",
                    width: pxToDp(300),
                    paddingVertical: pxToDp(20),
                  }}
                >
                  <Text style={{ color: "white" }}>累计登陆(天)</Text>
                  <Text style={{ color: "white" }}>
                    {incomeDetail.loginDays}
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
          <ScrollView style={{ flex: 1 }}>
            <View>
              <Text style={styles.dateTitle}>今日</Text>
              <View style={styles.figureContainer}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.figuretText}>
                    {incomeDetail.agent_amount_estimate_today}
                  </Text>
                  <Text style={styles.figureTypeText}>收益</Text>
                </View>
                <View style={styles.bar} />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.figuretText}>
                    {incomeDetail.orders_all_today}
                  </Text>
                  <Text style={styles.figureTypeText}>总订单</Text>
                </View>
                <View style={styles.bar} />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.figuretText}>
                    {incomeDetail.orders_estimate_today}
                  </Text>
                  <Text style={styles.figureTypeText}>有效订单</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.dateTitle}>昨日</Text>
              <View style={styles.figureContainer}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.figuretText}>
                    {incomeDetail.agent_amount_estimate_yestoday}
                  </Text>
                  <Text style={styles.figureTypeText}>收益</Text>
                </View>
                <View style={styles.bar} />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.figuretText}>
                    {incomeDetail.orders_all_yestoday}
                  </Text>
                  <Text style={styles.figureTypeText}>总订单</Text>
                </View>
                <View style={styles.bar} />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.figuretText}>
                    {incomeDetail.orders_estimate_yestoday}
                  </Text>
                  <Text style={styles.figureTypeText}>有效订单</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.dateTitle}>本周</Text>
              <View style={styles.figureContainer}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.figuretText}>
                    {incomeDetail.agent_amount_estimate_thisweek}
                  </Text>
                  <Text style={styles.figureTypeText}>收益</Text>
                </View>
                <View style={styles.bar} />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.figuretText}>
                    {incomeDetail.orders_all_thisweek}
                  </Text>
                  <Text style={styles.figureTypeText}>总订单</Text>
                </View>
                <View style={styles.bar} />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.figuretText}>
                    {incomeDetail.orders_estimate_thisweek}
                  </Text>
                  <Text style={styles.figureTypeText}>有效订单</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.dateTitle}>上周</Text>
              <View style={styles.figureContainer}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.figuretText}>
                    {incomeDetail.agent_amount_estimate_lastweek}
                  </Text>
                  <Text style={styles.figureTypeText}>收益</Text>
                </View>
                <View style={styles.bar} />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.figuretText}>
                    {incomeDetail.orders_all_lastweek}
                  </Text>
                  <Text style={styles.figureTypeText}>总订单</Text>
                </View>
                <View style={styles.bar} />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.figuretText}>
                    {incomeDetail.orders_estimate_lastweek}
                  </Text>
                  <Text style={styles.figureTypeText}>有效订单</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.dateTitle}>本月</Text>
              <View style={styles.figureContainer}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.figuretText}>
                    {incomeDetail.agent_amount_estimate_thismonth}
                  </Text>
                  <Text style={styles.figureTypeText}>收益</Text>
                </View>
                <View style={styles.bar} />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.figuretText}>
                    {incomeDetail.orders_all_thismonth}
                  </Text>
                  <Text style={styles.figureTypeText}>总订单</Text>
                </View>
                <View style={styles.bar} />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.figuretText}>
                    {incomeDetail.orders_estimate_thismonth}
                  </Text>
                  <Text style={styles.figureTypeText}>有效订单</Text>
                </View>
              </View>
            </View>

            <View>
              <Text style={styles.dateTitle}>上月</Text>
              <View style={styles.figureContainer}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.figuretText}>
                    {incomeDetail.agent_amount_estimate_lastmonth}
                  </Text>
                  <Text style={styles.figureTypeText}>收益</Text>
                </View>
                <View style={styles.bar} />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.figuretText}>
                    {incomeDetail.orders_all_lastmonth}
                  </Text>
                  <Text style={styles.figureTypeText}>总订单</Text>
                </View>
                <View style={styles.bar} />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.figuretText}>
                    {incomeDetail.orders_estimate_lastmonth}
                  </Text>
                  <Text style={styles.figureTypeText}>有效订单</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </React.Fragment>
      ) : (
        <LoadingActivity />
      )}
    </View>
  );
}
export default IncomeDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  title: {
    color: "white",
    fontSize: pxToDp(50),
    marginBottom: pxToDp(40),
  },
  dateTitle: {
    marginVertical: pxToDp(20),
    fontSize: pxToDp(50),
    fontWeight: "bold",
    marginLeft: pxToDp(20),
  },
  figuretText: {
    fontSize: pxToDp(35),
    fontWeight: "bold",
  },
  figureTypeText: {
    marginTop: pxToDp(10),
    color: "grey",
  },

  bar: {
    width: pxToDp(2.5),
    alignSelf: "stretch",
    backgroundColor: "grey",
  },
  figureContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#f5f5f9",
    marginHorizontal: pxToDp(20),
    paddingVertical: pxToDp(30),
    borderRadius: pxToDp(10),
  },
});
