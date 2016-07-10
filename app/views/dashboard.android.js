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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows([
        {
          name: 'Events',
          type: 'category'
        },
        {
          name: 'Jobs',
          type: 'category'
        },,
        {
          name: 'Coupons',
          type: 'category'
        },,
        {
          name: 'Help',
          type: 'category'
        },,
        {
          name: 'About Us',
          type: 'category'
        },
      ])
    };
    this.listings = db.ref("listings");
  }

  componentDidMount () {
  }

  _renderRow (item) {
    return (
      <CustomComponents.Category item={item} {...this.props} />
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <CustomComponents.TopBar />
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
});

AppRegistry.registerComponent('Dashboard', () => Dashboard);

module.exports = Dashboard;
