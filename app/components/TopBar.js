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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: 'black',
    height: 84,
    marginTop: 0,
    padding: 10,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header: {
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
