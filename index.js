/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import codePush from 'react-native-code-push';

const MyApp = codePush(App);

AppRegistry.registerComponent(appName, () => MyApp);
