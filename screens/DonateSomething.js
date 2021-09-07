import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../Config';

export default class BookDonateScreen extends React.Component {
  showReason1 = () => {
    alert(
      'In this screen, you will see the list of all the requested items and you can just exchange the item with the requester. But, this screen is not completed yet. So stay updated for the next stages of the app. Hope you will love !'
    );
  };
  constructor() {
    super();
    this.state = {
      requestedItemList: [],
    };
    this.requestRef = null;
  }

  getRequestedItemList = () => {
    this.requestRef = db.collection('Requested_Item').onSnapshot((snapshot) => {
      var requestedItemList = snapshot.docs.map((document) => document.data());
      this.setState({
        requestedItemList: requestedItemList,
      });
    });
  };

  componentDidMount() {
    this.getRequestedItemList();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={item.reason_for_request}
        titleStyle={{
          color: 'black',
          fontWeight: 'bold',
          fontFamily: 'Britannic',
          backgroundColor: 'gold',
        }}
        rightElement={
          <TouchableOpacity style={styles.button}>
            <Image
              style={{ width: 50, height: 50 }}
              source={{
                uri:
                  'https://cdn1.iconfinder.com/data/icons/donate-glyph-silhouettes/300/191420395Untitled-3-512.png',
              }}
            />
          </TouchableOpacity>
        }
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#57A3FD', border: 'dashed' }}>
        <Text style={styles.header}>
          <u>
            <b> Barter System App </b>
          </u>
        </Text>
        <TouchableOpacity onPress={this.showReason1}>
          <Image
            style={styles.imageIcon}
            source={{
              uri:
                'http://www.netanimations.net/Animated-gif-spinning-question-mark-picture-moving.gif',
            }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          {this.state.requestedItemList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: 'Britannic',
                  backgroundColor: 'gold',
                  padding: 15,
                  border: 'dashed',
                }}>
                <u>
                  <b>List Of All Requested Item</b>
                </u>
              </Text>
              <Text
                style={{
                  fontFamily: 'Britannic',
                  fontSize: 15,
                  backgroundColor: '#feb7b5',
                  padding: 10,
                  border: 'dashed',
                  margin: 10,
                }}>
                Sorry, no item available at the moment...
              </Text>
            </View>
          ) : (
            <FlatList
              style={styles.flatList}
              keyExtractor={this.keyExtractor}
              data={this.state.requestedItemList}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  header: {
    fontFamily: 'Footlight Mt Light',
    fontSize: 30,
    textAlign: 'center',
    padding: 5,
    backgroundColor: '#c4dfff',
    margin: 5,
    border: 'dashed',
  },
  imageIcon: {
    width: 25,
    height: 45,
    marginLeft: 290,
    marginTop: -47,
  },
});
