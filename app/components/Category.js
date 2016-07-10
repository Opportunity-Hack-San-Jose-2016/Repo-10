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
  TouchableOpacity,
} from 'react-native';

class Category extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => {this.props.navigator.push({
          component: this.props.view.ListingTable,
          payload: {
            type: this.props.item.name
          }
        })}}>
        <View style={styles.row}>
          <Text>{this.props.item.name}</Text>
          <Text style={styles.description}>{this.props.item.description}</Text>
        </View>
      </TouchableOpacity>
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
    color: '#333333',
    fontSize: 12
  }
})

AppRegistry.registerComponent('Category', () => TopBar);

module.exports = Category;
