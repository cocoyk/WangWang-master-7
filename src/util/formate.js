// obtained from react native tutorials

// import { PixelRatio } from 'react-native';
// import Dimensions from "Dimensions";

// function pxToDp(amount) {
//   //   ratio: PixelRatio.get(),
//   //   pixel: 1 / PixelRatio.get(),
//   const sceenWidth = Dimensions.get("window").width; //屏幕宽度
//   // const sceenHeight = Dimensions.get("window").height; //屏幕高度

//   const UIWidth = 750;

//   return (amount * sceenWidth) / UIWidth;
// }

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

//今日
function getToday() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();

  return [year, month, day].map(formatNumber).join('-');
}

//昨日
function getYesterday() {
  const yesDate = new Date(new Date().setDate(new Date().getDate() - 1));
  const year = yesDate.getFullYear();
  const month = yesDate.getMonth() + 1;
  const day = yesDate.getDate();
  return [year, month, day].map(formatNumber).join('-');
}

//一周前
function getWeekday() {
  const yesDate = new Date(new Date().setDate(new Date().getDate() - 6));
  const year = yesDate.getFullYear();
  const month = yesDate.getMonth() + 1;
  const day = yesDate.getDate();
  return [year, month, day].map(formatNumber).join('-');
}

//上月初
function getLastMonthFirst() {
  const tempyear = new Date().getFullYear();
  const tempmonth = new Date().getMonth();
  let year = tempmonth == 0 ? tempyear - 1 : tempyear;
  let month = tempmonth == 0 ? 12 : tempmonth;
  const day = 1;
  return [year, month, day].map(formatNumber).join('-');
}

//上月末
function getLastMonthEnd() {
  const tempyear = new Date().getFullYear();
  const tempmonth = new Date().getMonth();
  let year = tempmonth == 0 ? tempyear - 1 : tempyear;
  let month = tempmonth == 0 ? 12 : tempmonth;
  const day = new Date(year, month, 0).getDate();
  return [year, month, day].map(formatNumber).join('-');
}

//本月初
function getThisMonthFirst() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = 1;

  return [year, month, day].map(formatNumber).join('-');
}

//本月末
function getThisMonthEnd() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date(year, month, 0).getDate();
  return [year, month, day].map(formatNumber).join('-');
}

export default {
  getToday,
  getYesterday,
  getWeekday,
  getLastMonthFirst,
  getLastMonthEnd,
  getThisMonthFirst,
  getThisMonthEnd,
};
