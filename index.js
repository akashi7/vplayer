/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Trackplayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);
Trackplayer.registerPlaybackService(() => require('./Service.js'));
