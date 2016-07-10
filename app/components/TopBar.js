/**
 * HelperUpper React Native App
 * https://github.com/Opportunity-Hack-San-Jose-2016/Repo-10
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

class TopBar extends Component {
  render() {
    return (
      <View style={styles.topBar}>
        <Image style={styles.logo} source={require('./UPLogo.png')} />
        <Text style={styles.header}>HelperUpper</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: 'black',
    height: 100,
    marginTop: 0,
    padding: 10,
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header: {
    marginTop: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  logo: {
    width: 60,
    height: 30,
  },
})

AppRegistry.registerComponent('TopBar', () => TopBar);

module.exports = TopBar;
