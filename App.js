import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import WelcomeScreen from './Screens/WelcomeScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { AppTabNavigator } from './components/AppTabNavigator';

export default class App extends React.Component {
  render() {
    return <AppContainer/>;
  }
}

const TabNavigator = createBottomTabNavigtor({
  WelcomeScreen: { screen: WelcomeScreen },
  TabNavigator:{screen: AppTabNavigator}
});

const AppContainer =  createAppContainer(SwitchNavigator);
