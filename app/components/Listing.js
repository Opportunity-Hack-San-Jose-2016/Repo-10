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

const ListingHelp = require('./ListingHelp.js');
const ListingJob = require('./ListingJob.js');
const ListingCoupon = require('./ListingCoupon.js');

class Listing extends Component {
  render() {
    if (this.props.item.type == 'events') {
      return (<ListingEvent item={this.props.item} />);
    }
    return (
      <View style={styles.row}>
        <Text>{JSON.stringify(this.props.item)}</Text>
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
  }
})

AppRegistry.registerComponent('Listing', () => Listing);

module.exports = Listing;
