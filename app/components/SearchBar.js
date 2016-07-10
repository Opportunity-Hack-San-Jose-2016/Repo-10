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
  TextInput,
  TouchableOpacity,
} from 'react-native';

class SearchBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      query: ""
    }
  }

  handleSearch () {
    this.props.navigator.push({
      component: this.props.view.SearchTable,
      payload: {
        query: this.state.query
      }
    });
  }

  render() {
    return (
      <View style={styles.topBar}>
        <Image style={styles.logo} source={require('./UPLogo.png')} />
        <TextInput
          style={styles.query}
          onChangeText={ (text) => {this.setState({query: text})} }
          placeholder="Search" />
        <TouchableOpacity style={styles.searchContainer} onPress={this.handleSearch.bind(this)}>
          <Image style={styles.search} source={require('./search.png')} />
        </TouchableOpacity>
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
    flex: 8,
    marginTop: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  space: {
    flex: 1000
  },
  logo: {
    flex: 1,
    width: 30,
    height: 30,
    justifyContent: 'flex-start',
    padding: 10,
    marginRight: 20,
  },
  query: {
    flex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 5,
    marginRight: 20,
    padding: 10,
    height: 50,
    marginTop: 5,
  },
  searchContainer: {
    flex: 150
  },
  search: {
    width: 30,
    height: 30,
    justifyContent: 'flex-end',
  }
})

AppRegistry.registerComponent('SearchBar', () => SearchBar);

module.exports = SearchBar;
