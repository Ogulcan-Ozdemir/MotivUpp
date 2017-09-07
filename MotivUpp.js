import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Button
} from 'react-native';
import Login from './app/components/Login';
import find_organization from './app/components/FindOrganization';
import quiz_page from './app/components/QuizPage';
import solve_quiz from './app/components/Solve_quiz'
import make_new_company from './app/components/Make_new_company'
import {Provider} from 'react-redux';
import {createStore,applyMiddleware, combineReducers, compose ,} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger';
import reducer from './app/reducers'


const logger_middleware =createLogger({predicate:(getState,action)=> __DEV__});
function configureStore(initialState){
    const enhancer=compose(applyMiddleware(thunkMiddleware,logger_middleware));
    return createStore(reducer,initialState,enhancer);
}
class MotivUpp extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="login" component={Login} title="Login Page" initial={true} />
                    <Scene key="find_organization" component={find_organization} title="Find or Make organization" />
                    <Scene key="quiz_page" component={quiz_page} title="Quiz page" />
                    <Scene key="solve_quiz" component={solve_quiz} title="Solve quiz"/>
                    <Scene key="make_new_company" component={make_new_company} title="Make new company" />
                </Scene>
            </Router>
        )
    }


}

const store=configureStore({});

const App  = () =>(
    <Provider store={store} >
        <MotivUpp/>
    </Provider>
);

export default App;
