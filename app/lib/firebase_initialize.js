import * as firebase from 'firebase';
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

class firebase_initialize {
    static sign_in(email,password){
        _firebase.auth().signInWithEmailAndPassword(email,password).then((user)=>{
            return user;
        }).catch((error)=>{
            console.error('Error occured while sign in '+error.message);
        });
    }

    static database_ref(route){
       return _firebase.database().ref(route);
    }

    static storage_ref(url){
        return _firebase.database().refFromURL(url);
    }

}

export default firebase_initialize;