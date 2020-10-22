## 注意事项
1. 修复ios14图片不显示问题  
   /node_modules/react-native/Libraries/Image/RCTUIImageViewAnimated.m 278行增加 
   else {
    [super displayLayer:layer];
    }
   参考链接 https://github.com/facebook/react-native/issues/29279#issuecomment-658244428 