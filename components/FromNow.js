import React from 'react';
import moment from 'moment';
import { Text, StyleSheet } from 'react-native';

class FromNow extends React.Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (<Text
      style={styles.text}
    >
        Azurirano: {moment(this.props.time, 'X').fromNow()}
    </Text>);
  }
}

export default FromNow;

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 18,
    },
});
