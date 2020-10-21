/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

console.disableYellowBox = true;//去除warn
if (process.env.NODE_ENV==="development") {
  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;// 查看网络请求
}
AppRegistry.registerComponent(appName, () => App);
