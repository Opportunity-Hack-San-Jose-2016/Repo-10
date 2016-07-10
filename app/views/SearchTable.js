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

const CustomComponents = require('../components');

class SearchTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows([]),
    };
  }

  componentDidMount () {
    fetch("http://b35afecc.ngrok.io/api/v1/listings/search/" + this.props.query.toLowerCase())
      .then((res) => res.json())
      .then((resJSON) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(resJSON),
        });
        return;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _renderRow (item) {
    if (item.data.type == 'events') {
      return <CustomComponents.ListingEvent item={item.data} />
    } else if (item.data.type == 'jobs') {
      return <CustomComponents.ListingJob item={item.data} />
    } else if (item.data.type == 'coupons') {
      return <CustomComponents.ListingCoupon item={item.data} />
    } else if (item.data.type == 'help') {
      return <CustomComponents.ListingHelp item={item.data} />
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <CustomComponents.SearchBar {...this.props} />
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

AppRegistry.registerComponent('SearchTable', () => Dashboard);

module.exports = SearchTable;
