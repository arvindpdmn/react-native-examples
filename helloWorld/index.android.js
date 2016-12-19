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
  Image,
  TextInput,
  ScrollView,
  ListView
} from 'react-native';

class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {showText: true}; // not passed from parent: a changing state of this component

    // Toggle the state every second
    setInterval(() => {
      this.setState({ showText: !this.state.showText });
    }, 1000);
  }

  render() {
    let display = this.state.showText ? this.props.text : ' ';
    return (
      // Shows styling controlled by parent component via props
      <Text style={this.props.style}>{display}</Text>
    );
  }
}

class ListViewBasics extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }
  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    );
  }
}

export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = {inputText: ''};
  }
  
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
    <ScrollView>
      <View style={styles.container}>
  
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>

        {/* Shows the use of props: source and style */}
        <Image source={pic} style={{width: 193, height: 110}}/>

        {/* Shows the use of custom component Greeting */}
        <View style={{alignItems: 'center'}}>
          <Greeting name='Asian' />
          <Greeting name='Indian' />
          <Greeting name='Bengalurean' />
        </View>

        <View>
          <Blink text='I love to blink' style={styles.salmon} />
          <Blink text='I love to blink in blue' style={{color: 'blue'}} />
        </View>

        <View>
          <Image source={require('./img/favicon.png')} />
          <TextInput
            style={{height: 40, width: 300}}
            placeholder="Type here to translate!"
            onChangeText={(inputText) => this.setState({inputText})}
          />
          <Text style={{padding: 10, fontSize: 42}}>
            {this.state.inputText.split(' ').map((word) => word && '🍕').join(' ')}
          </Text>
        </View>

        <ListViewBasics />
  
      </View>
    </ScrollView>
    );
  }
}


// paddingTop pushes content down but we use ScrollView to scroll down
// Use of marginTop instead will not push children down, but hide them!
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 400
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  salmon: {
    color: 'salmon',
  },
});

AppRegistry.registerComponent('helloWorld', () => HelloWorldApp);
