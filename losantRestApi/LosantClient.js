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
        this.state = { temperature: '' }
    }

    tick() {
        let temperature = 25 + 1.2*Math.random();
        this.setState({temperature});

        this.client.device.sendState({
            deviceId: this.props.deviceId,
            applicationId: this.appID,
            deviceState: { data: {temperature} }
        })
        .then((response) => {
            console.log(response); // { success: true }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    componentDidMount() {
        var api = require('losant-rest');
        this.client = api.createClient();

        this.client.auth.authenticateDevice({ credentials: {
                deviceId: this.props.deviceId,
                key: this.props.appKey,
                secret: this.props.appSecret
        }}).then((response) => {
            this.client.setOption('accessToken', response.token);
            this.appID = response.applicationId;
            this.timerID = setInterval(
                () => this.tick(),
                1000
            );
        })
        .catch((error) => {
            console.error(error);
        });
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <Text>{this.state.temperature}</Text>
        );
    }
} 