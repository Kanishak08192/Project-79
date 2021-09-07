import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DonateSomething from '../Screens/DonateSomething';
import RequestSomething from '../Screens/RequestSomething';


export const AppTabNavigator = createBottomTabNavigator({
   
  'Donate A Item' : {
    screen: DonateSomething,
    navigationOptions :{
      tabBarIcon : <Image source={{uri:'https://cdn3.iconfinder.com/data/icons/valentine-color-line-1/64/Gift-512.png'}} style={{width:40, height:40}}/>,
      tabBarLabel : "Donate A Item",
    }
  },
  'Request A Item': {
    screen: RequestSomething,
    navigationOptions :{
      tabBarIcon : <Image source={{uri:'https://www.openkm.com/resources/images/icon/document-management-big.png'}} style={{width:40, height:40}}/>,
      tabBarLabel : "Request A Item",
    }
  }
});