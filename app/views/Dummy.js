/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

const Firebase = require('../config/Firebase.js');
const db = Firebase.database();

const CustomComponents = require('../components');

class Dummy extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text>hello world</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 50,
  },
});

AppRegistry.registerComponent('Dummy', () => Dummy);

module.exports = Dummy;
