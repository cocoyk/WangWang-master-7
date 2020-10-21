// obtained from react native tutorials

// import { PixelRatio } from 'react-native';
import {Dimensions} from 'react-native';

function pxToDp(amount) {
  //   ratio: PixelRatio.get(),
  //   pixel: 1 / PixelRatio.get(),
  const sceenWidth = Dimensions.get('window').width; //屏幕宽度
  // const sceenHeight = Dimensions.get("window").height; //屏幕高度

  const UIWidth = 750;

  return (amount * sceenWidth) / UIWidth;
}

export default pxToDp;
