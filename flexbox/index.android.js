import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';

class FlexDimensionsBasics extends Component {
  render() {
    return (
      // Try removing the `flex: 1` on the parent View.
      // The parent will not have dimensions, so the children can't expand.
      <View style={{flex: 1}}>
        <View style={{height: 100}}>
          <View style={{flex: 1, backgroundColor: 'powderblue'}} />
          <View style={{flex: 2, backgroundColor: 'skyblue'}} />
          <View style={{flex: 3, backgroundColor: 'steelblue'}} />
        </View>

        <View style={{flex: 1, flexDirection: 'row', alignItems: 'stretch'}}>
          <View style={{width: 50, backgroundColor: 'powderblue'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
        </View>

        <View style={{flex: 2, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
        </View>
      </View>
    );
  }
};

AppRegistry.registerComponent('flexbox', () => FlexDimensionsBasics);