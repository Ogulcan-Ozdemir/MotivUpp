import {AppRegistry,} from 'react-native';
import MotivUpp from './MotivUpp'
//todo this is a temproray solution using react-native-firebase maybe solve problem http://invertase.io/react-native-firebase/#/
console.ignoredYellowBox = [
    'Setting a timer'
]
AppRegistry.registerComponent('MotivUpp', () => MotivUpp);

