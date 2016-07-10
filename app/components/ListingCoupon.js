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

const moment = require('moment');

class ListingCoupon extends Component {
  render() {
    return (
      <View style={styles.row}>
        <Text style={styles.name}>{this.props.item.name}</Text>
        <Text style={styles.description}>{this.props.item.description}</Text>
        <Text style={styles.dates}>Valid {moment.unix(parseInt(this.props.item.time.startTime) + 1468181919).format("MMMM D")} - {moment.unix(parseInt(this.props.item.time.endTime) + 1468784919).format("MMMM D")}</Text>
        <Text style={styles.rating}>Worked for {parseInt(this.props.item.score * 10 + 50)}% of users</Text>
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
  description: {
    marginTop: 5
  },
  dates: {
    marginTop: 5
  }
})

AppRegistry.registerComponent('ListingCoupon', () => TopBar);

module.exports = ListingCoupon;
