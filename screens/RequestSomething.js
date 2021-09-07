import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import db from '../Config';
import firebase from 'firebase';

export default class RequestSomething extends React.Component {
  showReason1 = () => {
    alert(
      'In this screen, you can request for any item. In the first blank, you have to write the item that you need. In the second field, you have to write that why do you need the item. Well later on I will add more fields in this screen. Hope you will love the app.'
    );
  };
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      itemName: '',
      reasonToRequest: '',
      colorChoice: '',
      address: '',
      phoneNo: '',
      name: '',
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = (itemName, reasonToRequest) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();
    db.collection('Requested_Item').add({
      User_id: userId,
      item_name: itemName,
      reason_for_request: reasonToRequest,
      Request_Id: randomRequestId,
      date: firebase.firestore.Timestamp.now().toDate(),
    });

    this.setState({
      itemName: '',
      reasonToRequest: '',
    });

    return alert('Successfully Requested for the item');
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'red' }}>
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
        <KeyboardAvoidingView style={styles.keyBoardStyle}>
          <ScrollView style={{ width: '100%' }}>
            <TextInput
              style={styles.formTextInput}
              placeholder={'Enter the name of the item here'}
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({
                  itemName: text,
                });
              }}
              value={this.state.itemName}
            />
            <TextInput
              style={[styles.formTextInput, { height: 300 }]}
              multiline
              numberOfLines={7}
              placeholder={'Why do you need the item'}
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({
                  reasonToRequest: text,
                });
              }}
              value={this.state.reasonToRequest}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.addRequest(
                  this.state.itemName,
                  this.state.reasonToRequest
                );
              }}>
              <Text
                style={{
                  fontFamily: 'Footlight Mt',
                  fontWeight: 'bold',
                  fontSize: 25,
                }}>
                Request
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyBoardStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTextInput: {
    width: '90%',
    height: 35,
    alignSelf: 'center',
    borderRadius: 0,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    fontFamily: 'Footlight Mt',
    backgroundColor: '#feb7b5',
    border: 'dashed',
    fontSize: 15,
    textAlign: 'center',
  },
  button: {
    width: '70%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    backgroundColor: 'gold',
    border: 'dashed',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
    alignSelf: 'center',
  },
  header: {
    fontFamily: 'Footlight Mt Light',
    fontSize: 30,
    textAlign: 'center',
    padding: 5,
    backgroundColor: 'gold',
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
