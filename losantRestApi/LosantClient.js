import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class LosantClient extends Component {
    constructor(props) {
        super(props);
        this.state = { temperature: 10 }
    }

    componentDidMount() {
        var api = require('losant-rest');
        var client = api.createClient();

        client.auth.authenticateDevice({ credentials: {
                deviceId: this.props.deviceId,
                key: this.props.appKey,
                secret: this.props.appSecret
        }}).then((response) => {
            client.setOption('accessToken', response.token);
            var appId = response.applicationId;
            let temperature = 25 + 1.2*Math.random();
            var state = { data: {temperature} };
            this.setState({temperature});
            return client.device.sendState({
                deviceId: this.props.deviceId,
                applicationId: appId,
                deviceState: state
            });
        })
        .then((response) => {
            console.log(response); // { success: true }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <Text>{this.state.temperature}</Text>
        );
    }
} 