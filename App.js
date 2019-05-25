import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';

import Home from './screens/Home';
import Settings from './screens/Settings';


const Screens = createStackNavigator({
  Home,
  Settings,
}, {
  initialRouteName: 'Home',
})

export default createAppContainer(Screens);
