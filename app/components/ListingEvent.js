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

class ListingEvent extends Component {
  render() {
    return (
      <View style={styles.row}>
        <Image style={{flex: 1, flexDirection: 'row', height: 100, padding: 10}} source={{uri: "https://maps.googleapis.com/maps/api/staticmap?center=" + this.props.item.location.lat + "," + this.props.item.location.lng + "&zoom=13&size=500x200&maptype=roadmap&markers=color:red%7C" + this.props.item.location.lat + "," + this.props.item.location.lng + "&key=AIzaSyBVlVh60b5zD3CzZRCP3W4Aiuy2rtfbvJM"}} />
        <View style={styles.caption}>
          <Text>{this.props.item.name}</Text>
        </View>
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
    // padding: 20,
    justifyContent: 'center'
  },
  name: {
    color: '#333',
    fontSize: 16,
  },
  caption: {
    padding: 10,
  }
})

AppRegistry.registerComponent('ListingEvent', () => ListingEvent);

module.exports = ListingEvent;
