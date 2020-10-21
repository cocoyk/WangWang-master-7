/* eslint-disable react/prop-types */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Mine from './Mine';
import Home from './Home.js';
import Mine from './Mine.js';

import HotRank from '../Screens/HotRank.js';
import pxToDp from '../util/util';
import {Image, StatusBar, Text, AppState, StyleSheet} from 'react-native';
import Login from './Login';
import Explore from './Explore.js';
import { color } from 'react-native-reanimated';

function Route() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headed: null,
          activeTintColor: '#ff4d00',
          activeBackgroundColor: '#ff4d00',
          showIcon: true,
          tabBarOnPress: (event) => {
            event.defaultHandler();
          },
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused
                    ? require('../image/main_selected.png')
                    : require('../image/main_unselected.png')
                }
                style={{
                  height: pxToDp(50),
                  width: pxToDp(50),
                }}
              />
            );
          },
          tabBarLabel:  ({focused}) => 
          {return (
            <Text 
             style={{
                color:
                focused
                ? '#ff4d00'
                : 'grey',
                fontSize:pxToDp(20)
                }}
            >首页</Text>)
          },
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          headed: null,
          activeTintColor: '#ff4d00',
          activeBackgroundColor: '#ff4d00',
          showIcon: true,
          tabBarOnPress: (event) => {
            event.defaultHandler();
          },
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused
                    ? require('../image/find_selected.png')
                    : require('../image/find_unselected.png')
                }
                style={{
                  height: pxToDp(50),
                  width: pxToDp(50),
                }}
              />
            );
          },
          tabBarLabel:  ({focused}) => 
          {return (
            <Text 
             style={{
                color:
                focused
                ? '#ff4d00'
                : 'grey',
                fontSize:pxToDp(20)
                }}
            >线报</Text>)
          },       
       }}
      />
      <Tab.Screen
        name="HotRank"
        component={HotRank}
        options={{
          headed: null,
          activeTintColor: '#ff4d00',
          activeBackgroundColor: '#ff4d00',
          showIcon: true,
          tabBarOnPress: (event) => {
            event.defaultHandler();
          },
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused
                    ? require('../image/hotrank_selected.png')
                    : require('../image/hotrank_unselected.png')
                }
                style={{
                  height: pxToDp(50),
                  width: pxToDp(50),
                }}
              />
            );
          },
          tabBarLabel:  ({focused}) => 
          {return (
            <Text 
             style={{
                color:
                focused
                ? '#ff4d00'
                : 'grey',
                fontSize:pxToDp(20)
                }}
            >榜单</Text>)
          },        
      }}
      />
      <Tab.Screen
        name="Mine"
        component={Mine}
        options={{
          headed: null,
          activeTintColor: '#ff4d00',
          activeBackgroundColor: '#ff4d00',
          showIcon: true,
          tabBarOnPress: (event) => {
            event.defaultHandler();
          },
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused
                    ? require('../image/mine_selected.png')
                    : require('../image/mine_unselected.png')
                }
                style={{
                  height: pxToDp(50),
                  width: pxToDp(50),
                }}
              />
            );
          },
          tabBarLabel:  ({focused}) => 
          {return (
            <Text 
             style={{
                color:
                focused
                ? '#ff4d00'
                : 'grey',
                fontSize:pxToDp(20)
                }}
            >我的</Text>)
          },        
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconback: {
    position: 'relative',
    bottom: pxToDp(10),
    zIndex: 10,
  },
});

export default Route;
