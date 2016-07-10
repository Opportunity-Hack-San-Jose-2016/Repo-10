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

class ListingHelp extends Component {
  render() {
    return (
      <View style={styles.row}>
        <Text style={styles.name}>{this.props.item.name}</Text>
        <Text style={styles.description}>{this.props.item.description}</Text>
        <Text style={styles.rating}>Rating: {parseFloat(this.props.item.score).toFixed(2)}/5, aid in 3-7 days</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#eeeeee',
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#c0c0c0',
    marginHorizontal: 10,
    marginVertical: 15,
    marginTop: 0,
    padding: 20,
    justifyContent: 'center'
  },
  name: {
    color: 'black',
    fontSize: 16,
  },
  rating: {
    marginTop: 5,
  },
  description: {
    marginTop: 5,
  }
})

AppRegistry.registerComponent('ListingHelp', () => ListingHelp);

module.exports = ListingHelp;
