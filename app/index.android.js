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
  ListView,
  StatusBar,
  Navigator,
  BackAndroid,
} from 'react-native';

const Firebase = require('./config/Firebase.js');
const db = Firebase.database();

// const component = require('./components/index.js');
const view = require('./views/index.js');

class HelperUpper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows([])
    };
    this.listings = db.ref("listings");
    BackAndroid.addEventListener('hardwareBackPress', () => {
     this.navigator.pop();
     return true;
    });
  }

  renderScene(route, navigator) {
    this.navigator = navigator;
    if (route.component == 'inline') {
      return route.payload
    } else {
      return (
        <View style={{flex: 1}}>
          <StatusBar
            barStyle="default"
            barStyle="light-content"
            {...route.statusBar}
          />

          {
            React.createElement(
              route.component,
              {...this.props, ...route.payload, route, navigator, view: view}
            )
          }
        </View>
      );
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{
          component: view.Dashboard,
          statusBar: {
          },
        }}
        renderScene={this.renderScene.bind(this)} />
    );
  }
}

const styles = StyleSheet.create({
})

AppRegistry.registerComponent('HelperUpper', () => HelperUpper);
