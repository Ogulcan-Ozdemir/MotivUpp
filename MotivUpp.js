import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Login from './components/Login';
class MotivUpp extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="login" component={Login} title="Login Page" initial={true} />
                </Scene>
            </Router>
        )
    }
}

export default MotivUpp;
