import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';

var {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');

var ANIMATION_END_Y = Math.ceil(deviceHeight * .5);
var NEGATIVE_END_Y = ANIMATION_END_Y * -1;
var startCount = 1;

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function Heart(props) {
    return (
        <View {...props} style={[styles.heart, props.style]}>
            <View style={[styles.leftHeart, styles.heartShape]} />
            <View style={[styles.rightHeart, styles.heartShape]} />
        </View> 
    )  
}

class AnimatedHeart extends Component {
  constructor(props) {
    super(props);
    this.state = {position: new Animated.Value(0)}
  }

  componentWillMount() {
    this._yAnimation = this.state.position.interpolate({
      inputRange: [NEGATIVE_END_Y, 0],
      outputRange: [ANIMATION_END_Y, 0]
    });

    this._opacityAnimation = this._yAnimation.interpolate({
      inputRange: [0, ANIMATION_END_Y],
      outputRange: [1, 0]
    });

    this._scaleAnimation = this._yAnimation.interpolate({
      inputRange: [0, 15, 30],
      outputRange: [0, 1.2, 1],
      extrapolate: 'clamp'
    });

    this._xAnimation = this._yAnimation.interpolate({
      inputRange: [0, ANIMATION_END_Y/2, ANIMATION_END_Y],
      outputRange: [0, 15, 0]
    })

    this._rotateAnimation = this._yAnimation.interpolate({
      inputRange: [0, ANIMATION_END_Y/4, ANIMATION_END_Y/3, ANIMATION_END_Y/2, ANIMATION_END_Y],
      outputRange: ['0deg', '-2deg', '0deg', '2deg', '0deg']
    });
  }

  componentDidMount() {
    Animated.timing(this.state.position, {
      duration: 2000,
      toValue: NEGATIVE_END_Y
    }).start(this.props.onComplete);
  }

  getHeartAnimationStyle() {
    return {
      transform: [
        {translateY: this.state.position},
        {translateX: this._xAnimation},
        {scale: this._scaleAnimation},
        {rotate: this._rotateAnimation}
      ],
      opacity: this._opacityAnimation
    }
  }

  render() {
    return (
        <Animated.View style={[styles.heartWrap, this.getHeartAnimationStyle(), this.props.style]}>
          <Heart />
        </Animated.View>
    )
  }
}

AnimatedHeart.defaultProps = {
  onComplete: () => {}
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {hearts: []}
    this.addHeart = this.addHeart.bind(this);
    this.removeHeart = this.removeHeart.bind(this);
  }

  addHeart() {
    startCount += 1;
    this.state.hearts.push({
      id: startCount,
      right: getRandomNumber(50, 150)
    });
    this.setState(this.state);
  }

  removeHeart(v) {
    var index = this.state.hearts.findIndex((heart) => heart.id === v);
    this.state.hearts.splice(index, 1);
    this.setState(this.state);
  }

  render() {
    return (
      <View style={styles.container}>
				<TouchableWithoutFeedback style={styles.container} onPress={this.addHeart}>
          <View style={styles.container}>
            {
              this.state.hearts.map((v, i) =>
                <AnimatedHeart 
                  key={v.id}
                  onComplete={() => this.removeHeart(v.id)}
                  style={{right: v.right}}
                />
              )
            }
          </View>
        </TouchableWithoutFeedback>
          
      	<Text style={styles.message}>Tap anywhere to see hearts!</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    fontSize: 15,
    color: '#888',
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
  },
  heartWrap: {
      position: 'absolute',
      bottom: 30,
      backgroundColor: 'transparent'
  },
  heart: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent'
  },
  heartShape: {
    width: 30,
    height: 45,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#6427d1',
  },
  leftHeart: {
    transform: [
        {rotate: '-45deg'}
    ],
    left: 5
  },
  rightHeart: {
    transform: [
        {rotate: '45deg'}
    ],
    right: 5
  }
});

AppRegistry.registerComponent('heartAnime', () => App);
