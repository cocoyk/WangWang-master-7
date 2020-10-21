import React, {Component} from 'react';
import pxToDp from '../util/util.js';
import SVGAPlayer from '../../util/SVGAPlayer';
import LottieView from 'lottie-react-native';
import * as Progress from 'react-native-progress';
import LottieWrapper from '../../util/LottieWrapper';
import NavigationService from '../../util/NavigationService.js';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class browserIcon extends Component {
  _lottie3;
  lottie;
  interval_sec;

  constructor(props) {
    super(props);
    this.state = {
      //   is_signed: 1
      left_second: 30,
    };
  }

  componentDidMount = async () => {
    const self = this;
    self.lottie.play();
    // self.getNowtimeSec();
    // const is_signed = await AsyncStorage.getItem("is_signed");
    // self.setState({
    //   is_signed: is_signed
    // });
    // setTimeout(function() {
    //   self._lottie3.play();
    // }, 600);
  };

  componentWillUnmount() {
    clearInterval(this.interval_sec);
  }

  getNowtimeSec() {
    var self = this;
    // clearInterval(interval)
    self.interval_sec = setInterval(function () {
      var left_second = self.state.left_second;
      if (left_second > 0) {
        left_second -= 0.25;
      }
      self.setState({
        left_second: left_second == 0 ? 30 : left_second,
      });
    }, 250);
  }

  play = () => {
    this.lottie.play();
  };

  pause = () => {
    this.lottie.pause();
  };

  animateEnd = (finished) => {
    const self = this;
    const api = 'read_auto_get_gold';
    const params = {};
    if (finished) {
      console.log('播放完毕');
    }
  };

  render() {
    const self = this;
    return (
      <View style={styles.container}>
        <LottieWrapper
          style={{height: pxToDp(142)}}
          ref={(r) => {
            this.lottie = r;
          }}
          loop={true}
          onFinished={this.animateEnd}
          duration={60 * 1000}
          source={require('../image/read_img_pbar.json')}
        />
        <LottieView
          style={{position: 'absolute', height: pxToDp(142)}}
          autoPlay={true}
          source={require('../image/read_img_pbarrd.json')}
        />
        {/* <Progress.Circle
          style={{
            borderRadius: 42,
            width: 84,
            height: 84
          }}
          size={84} // 圆的直径
          progress={(30 - this.state.left_second) / 30} // 进度
          unfilledColor="#FFC5D7" // 剩余进度的颜色
          color={"#ff5186"} // 颜色
          thickness={6} // 内圆厚度
          direction="clockwise" // 方向
          borderWidth={0} // 边框
        >
          <SVGAPlayer
            source={require("../image/read_img_cionget.svga")}
            loops={0}
            clearsAfterStop={false}
            style={[
              styles.goldlottie1,
              {
                width: pxToDp(100),
                height: pxToDp(100)
              }
            ]}
          />
          <LottieView
            style={{
              width: pxToDp(200),
              height: pxToDp(300)
            }}
            speed={1}
            ref={r => {
              this._lottie3 = r;
            }}
            onAnimationFinish={() => {
              console.log("3完毕");
            }}
            autoPlay={true}
            loop
            source={require("../image/read_img_pbarrd.json")}
          /> */}
        {/* <View
            style={{
              position: "absolute",
              top: 6,
              left: 6
            }}
          >
            <TouchableOpacity
              activeOpacity={0.75}
              onPressIn={() => {
                console.log("onPressIn");
              }}
              onPressOut={() => {
                console.log("onPressOut");
              }}
              onPress={() => {}}
              onLongPress={() => console.log("onLongPress")}
            >
              <Image
                style={{ width: 72, height: 72 }}
                source={require("../image/common_icon_success.png")}
              />
            </TouchableOpacity>
          </View> */}
        {/* </Progress.Circle> */}
        {/* <LottieView
          style={{
            height: pxToDp(300)
          }}
          speed={1}
          ref={r => {
            this._lottie3 = r;
          }}
          onAnimationFinish={() => {
            console.log("3完毕");
          }}
          autoPlay={false}
          loop
          source={require("../image/bp_img_pbar2.json")}
        />
        <SVGAPlayer
          source={require("../image/read_img_cionget.svga")}
          loops={0}
          clearsAfterStop={false}
          style={[
            styles.goldlottie1,
            {
              width: pxToDp(60),
              height: pxToDp(60)
            }
          ]}
        />
        <SVGAPlayer
          source={require("../image/bp_img_coin.svga")}
          loops={0}
          clearsAfterStop={false}
          style={[
            styles.goldlottie2,
            {
              width: pxToDp(60),
              height: pxToDp(60)
            }
          ]}
        />
        <Image
          style={[
            styles.goldlottie3,
            {
              width: pxToDp(60),
              height: pxToDp(60)
            }
          ]}
          source={require("../image/bp_img_coin_n.png")}
        />
        <SVGAPlayer
          source={require("../image/bp_img_pbar(3).svga")}
          loops={0}
          clearsAfterStop={false}
          style={[
            styles.redpaket,
            {
              width: pxToDp(150),
              height: pxToDp(300)
            }
          ]}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: pxToDp(120),
    right: pxToDp(20),
    width: pxToDp(142),
    height: pxToDp(142),
    borderRadius: pxToDp(71),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    zIndex: 10,
  },
  goldlottie1: {
    position: 'absolute',
    top: pxToDp(50),
    left: pxToDp(35),
  },
  goldlottie2: {
    position: 'absolute',
    top: pxToDp(120),
    left: pxToDp(35),
  },
  goldlottie3: {
    position: 'absolute',
    top: pxToDp(190),
    left: pxToDp(35),
  },
  redpaket: {
    position: 'absolute',
    left: pxToDp(-6),
  },
});
