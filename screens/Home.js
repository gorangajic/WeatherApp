import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import FromNow from '../components/FromNow';
import Icon from '../components/Icon';

const APP_ID = 'f4b157a7c1cbcf427f66fb113ee9be8e';
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?mode=json&APPID=' + APP_ID;

// Za domaci sacuvati stanje putem AsyncStorage
// https://facebook.github.io/react-native/docs/asyncstorage

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: 'Indjija',
      weather: null,
      loading: false,
      unit: 'metric',
    };
  }

  componentDidMount() {
    this.didFocus = this.props.navigation.addListener('didFocus', () => {
      this.dohvatiVremeStorage();
    });
  }

  componentWillUnmount() {
    this.didFocus.remove();
  }

  dohvatiVremeStorage() {

    Promise.all([
      AsyncStorage.getItem('city'),
      AsyncStorage.getItem('unit'),
    ])
    .then((states) => {
      const city = states[0];
      const unit = states[1];
      console.log(states);

      if (!city && !unit) {
        this.dohvatiVreme();
        return;
      }
      const newState = {};
      if (city) {
        newState.city = city;
      }
      if (unit) {
        newState.unit = unit;
      }
      this.setState(newState, () => {
        this.dohvatiVreme();
      });
    })
  }

  dohvatiVreme() {

    // postavljanje loading flaga na true
    this.setState({ loading: true });
    AsyncStorage.setItem('city', this.state.city);
    // saljemo zahtev ka API-u
    fetch(`${BASE_URL}&q=${this.state.city}&units=${this.state.unit}`)
      .then((res) => res.json())
      .then(result => {
        // poziva se ova funkcija
        // u kojoj obradjujemo zahtev
        console.log(result);
        // ako temperatura nije pronadjena prikazujemo gresku sa servera
        // ili Something went wrong
        if (!result.main || typeof result.main.temp === 'undefined') {
          if (result.message) {
            Alert.alert(result.message);
          } else {
            Alert.alert('Something went wrong');
          }
          // stavljamo flag loading na false
          // samim tim skrivamo loading indikator
          this.setState({ loading: false });
          return;
        }

        // updejtujemo stanje aplikacije
        // weather state cuva temperaturu
        // trenutni grad i status
        this.setState({
          loading: false,
          weather: {
            temp: result.main.temp,
            city: result.name,
            status: result.weather[0].description,
            icon: result.weather[0].icon,
            updateTime: result.dt,
          },
        })
      }).catch((error) => {
        // ako server nije dostupan poziva se ova metoda
        Alert.alert(error.message);
      })
  }
  render() {
    let loadingIndicator

    if (this.state.loading) {
      loadingIndicator = <ActivityIndicator
        size="large"
        color="#ffffff"
      />
    } else {
      loadingIndicator = null;
    }

    let prikazVremena = null;

    if (this.state.weather) {
      prikazVremena = <View // prikaz trenutnog vremena ako je dostupno
          style={{ alignItems: 'center', marginBottom: 10 }}
        >
          <Icon size="large" icon={this.state.weather.icon} />
          <Text style={styles.name}>{this.state.weather.city}</Text>
          <Text style={styles.type}>{this.state.weather.status}</Text>
          <Text style={styles.temp}>
            {this.state.weather.temp} {this.state.unit === 'metric' ? '°C' : '°F'}
          </Text>
        </View>
    }

    return (
      <ImageBackground
        source={require('../assets/indjija.jpg')}
        style={{width: '100%', height: '100%'}}
      >
        <View style={styles.container}>
          {loadingIndicator}
          {prikazVremena}
          <TextInput
            onChangeText={(text) => { // funkcija koja se poziva kad se text promeni
              // updejtujemo vrednost grada u state-u
              this.setState({
                city: text,
              })
            }}
            value={this.state.city} // postavljanje vrednosti inputa
            style={{ backgroundColor: 'white', width: 100 }}
          />
          <Button
            title="Pretrazi Grad"
            onPress={() => { // poziva se kada korisnik klikne na dugme
              this.dohvatiVreme();
            }}
            color="#fff"
          />
          {this.state.weather ? <View>
            <FromNow
              time={this.state.weather.updateTime}
            />
          </View> : null}
          <Button
            title="Change Settings"
            onPress={() => this.props.navigation.push('Settings')}
          />
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
