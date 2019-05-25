import React from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: 'metric',
        };
    }
    componentDidMount () {
        AsyncStorage.getItem('unit').then((unit) => {
            if (!unit) {
                return;
            }
            this.setState({ unit });
        });
    }
    render() {
        return (<View>
            <Text>Settings Page</Text>

            <Button
                onPress={() => {
                    const newUnit = this.state.unit === 'metric' ? 'imperial' : 'metric';
                    this.setState({
                        unit: newUnit,
                    });
                    AsyncStorage.setItem('unit', newUnit);
                }}
                title={this.state.unit.toUpperCase()}
            />
        </View>);
    }
}

export default Settings;
