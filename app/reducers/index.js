import {combineReducers} from 'redux'
import * as firebase_reducer from './firebase'
import * as solve_quiz_reducer from './solve_quiz_reducer'
export default  combineReducers(Object.assign(firebase_reducer,solve_quiz_reducer));