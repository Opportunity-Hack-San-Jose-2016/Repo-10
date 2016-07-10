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

class ListingTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows([])
    };
  }

  componentDidMount () {
    fetch("http://192.168.85.118:8080/api/v1/listings/type/" + this.props.type.toLowerCase())
      .then((res) => res.json())
      .then((resJSON) => {
        console.log(resJSON);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(resJSON)
        });
        return;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _renderRow (item) {
    return (
      <CustomComponents.Listing item={item} />
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections={true}
          style={styles.listContainer} />
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
})

AppRegistry.registerComponent('ListingTable', () => Dashboard);

module.exports = ListingTable;
