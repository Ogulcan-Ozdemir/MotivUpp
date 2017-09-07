import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Button
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import RNSensitiveInfo from 'react-native-sensitive-info'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions/index'
import * as firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay';

let _firebase;
if (!firebase.apps.length) {
      _firebase = firebase.initializeApp({
        apiKey: "AIzaSyCZCXnhQOUjTWKLZIdPn9xDFXZQuDAtEbk",
        authDomain: "gamificationproject-8697a.firebaseapp.com",
        databaseURL: "https://gamificationproject-8697a.firebaseio.com",
        projectId: "gamificationproject-8697a",
        storageBucket: "gamificationproject-8697a.appspot.com",
    });
}else {
    _firebase=firebase;
}


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //todo kaldır bunları
            email: 'motivupadm@gmail.com',
            password:'123456',
            spinner_visible:true
        };
    }
    componentWillMount(){
        _firebase.auth().onAuthStateChanged((user) => {
            let company_name;
            let user_email;
            RNSensitiveInfo.getItem('company_name', {}).then(value => {
                company_name = value;
            }).then(() => {
                return RNSensitiveInfo.getItem('user_email', {}).then(value => {
                    user_email = value;
                });
            }).then(() => {
                if (user && company_name !== null && user_email !== null) {
                    this.setState({spinner_visible:false})
                    Actions.quiz_page();
                }
            });
        })
    }

    render() {
        return (
            <View style={styles.container}>

                <TextInput
                    style={{height: 40, borderColor: 'gray', width: 300}}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    placeholder={'Enter email here'}
                    keyboardType={'email-address'}
                />

                <TextInput
                    style={{marginTop:10, height: 40, borderColor: 'gray',width: 300}}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    placeholder={'Enter password here'}
                    secureTextEntry={true}
                />
                <View style={{flexDirection:"row", justifyContent: 'space-between', marginTop:15}}>
                    <Button
                        title={'Sign '}
                        style={{fontSize: 20, color: '#F5FCFF' ,backgroundColor:'#4caf50'}}
                        styleDisabled={{color: 'red'}}
                        onPress={this.signBtnClicked.bind(this)}>
                    </Button>

                    <Button
                        title={'Sign Up'}
                        style={{fontSize: 20, color: '#F5FCFF' ,backgroundColor:'#4caf50', marginTop:'10'}}
                        styleDisabled={{color: 'red'}}
                        onPress={this.signUpBtnClicked.bind(this)}>
                    </Button>

                </View>

                <Spinner visible={this.state.spinner_visible} style={[{ justifyContent: 'center' }]} />


            </View>

        );
    }

    signBtnClicked(){
        this.setState({spinner_visible:true});
        _firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                if(user.emailVerified){
                     this.setState({spinner_visible:false});
                     console.log('User successfully logged in', user.uid);
                     Actions.find_organization();

                }else {
                    alert('You should verify your email before sign in')
                }
            })
            .catch((err) => {
              alert(err.message);
            });
    }

    signUpBtnClicked(){
        _firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((user)=>{
               user.sendEmailVerification().then(()=>{
                   alert('Email verification send to your email')
               }).catch((error)=>{
                   alert(error.message)
               })
            }).catch((error)=>{
                alert(error.message)
            })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators,dispatch);
}

function mapStateToProps(state) {

    return{
        flag:state.flag_auth_state.flag,
        user:state.user.current_user,
        array:state.incoming_data.snap
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);