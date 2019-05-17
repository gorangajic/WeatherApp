import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';

class App extends React.Component {
  render() {
    return (
      <ImageBackground
        source={require('./assets/indjija.jpg')}
        style={{width: '100%', height: '100%'}}
      >
        <View style={styles.container}>
          <Image source={require('./assets/sun.png')} />
          <Text style={styles.name}>Indjija</Text>
          <Text style={styles.type}>Clear Sky</Text>
          <Text style={styles.temp}>16 °C</Text>
          <Button
            title="Pretrazi Grad"
            onPress={() => {
              Alert.alert('Hello');
            }}
            color="#fff"
          />
          <Text style={styles.updateTime}>
            Vreme ažuriranja 12:00:00
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  name: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  type: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 5,
  },
  temp: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 5,
  },
  updateTime: {
    color: '#fff',
    fontSize: 14,
  }
});
