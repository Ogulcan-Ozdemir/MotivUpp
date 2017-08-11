import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button
} from 'react-native';

import * as firebase from 'firebase';
const _firebase = firebase.initializeApp({
    apiKey: "AIzaSyCZCXnhQOUjTWKLZIdPn9xDFXZQuDAtEbk",
    authDomain: "gamificationproject-8697a.firebaseapp.com",
    databaseURL: "https://gamificationproject-8697a.firebaseio.com",
    projectId: "gamificationproject-8697a",
    storageBucket: "gamificationproject-8697a.appspot.com",

});
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
            buttonState:'normal'
        };
    }
    render() {
        return (
            <View style={styles.container}>

                <TextInput
                    style={{height: 40, borderColor: 'gray', width: 300}}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    placeholder={'Enter email here'}
                />

                <TextInput
                    style={{marginTop:10, height: 40, borderColor: 'gray',width: 300}}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    placeholder={'Enter password here'}
                />
                <View>
                <Button
                    title={'Sign İn'}
                    style={{fontSize: 20, color: '#F5FCFF' ,backgroundColor:'#4caf50', flex:1}}
                    styleDisabled={{color: 'red'}}
                    onPress={this.signBtnClicked.bind(this)}>
                </Button>

                <Button
                    title={'Sign Up'}
                    style={{fontSize: 20, color: '#F5FCFF' ,backgroundColor:'#4caf50', marginTop:'10', flex:1}}
                    styleDisabled={{color: 'red'}}
                    onPress={this.signUpBtnClicked.bind(this)}>
                </Button>
                </View>
            </View>
        );
    }

    signBtnClicked(){
        _firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                if(user.emailVerified){
                    console.log('User successfully logged in', user);
                    alert('user signed in')
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

export default Login;