import * as types from './types'
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
import user_info from 'react-native-sensitive-info'
import {Actions} from 'react-native-router-flux'
// export function increment_number() {
//     return{
//         type: types.increment_number,
//     }
// }
export function sign_in(email,password){
    return(dispatch,getState)=>{
        _firebase.auth().signInWithEmailAndPassword(email,password).then((user)=>{

            dispatch(sign_in_verified(user))
        }).catch((error)=>{
            console.error('Error occured while sign in '+error.message);
        });
    }
}

export function sign_in_verified(user){
    return{
        type:types.sign_in,
        current_user
    }
}

export function firebase_test_array(ref) {
    return(dispatch,getState)=>{
        _firebase.database().ref(ref).once('value').then((snapshot)=>{
            let array=[];
            let quizes=snapshot.val();
            Object.keys(quizes).map((key)=>{
                let item ={
                    key:key
                };
                array.push(item);
            });
            dispatch(firebase_array(array))
        }).catch((error)=>{
            console.error('Error occured while fetch data '+error.message);
        });
    }
}



export function firebase_questions_array(company_name,department,value){
    return(dispatch,getState)=>{
        user_info.getItem('department',{}).then(value=>{
            department=value;
        }).then(()=>{
            return user_info.getItem('company_name',{}).then(value=>{
               company_name=value;
            });
        }).then(()=>{
            firebase.database().ref(company_name+"/quizes/"+department.replace(" ","+")+"/"+value).once('value',(snapshot)=>{
                let questions_key=snapshot.val();
                let temp_array=[];
                let video_image_url=[];
                Object.keys(questions_key).map((key)=>{
                    firebase.database().ref(company_name+"/question_pool/"+department.replace(' ','+')+"/questions/"+questions_key[key]).once('value').then((snapshot)=>{
                        let item=snapshot.val();
                        if(item.type===0 || item.type===2){
                            let url="";
                            url= firebase.storage().refFromURL(item.imageAndVideoView).getDownloadURL();
                            video_image_url[questions_key[key]]=url;
                        }
                        temp_array[questions_key[key]]=item;
                        return temp_array;
                    });
                });
                dispatch(firebase_questions_array_data(temp_array,video_image_url));

            })
        });
    }
}

export function firebase_array(snap) {
    return{
        type:types.firebase_array,
        snap,
    }
}

export function firebase_questions_array_data(snap,url){
    return{
        type:types.firebase_questions_array,
        snap,
        url
    }
}



export function auth_state(){
    return(dispatch,getState)=> {

    }
}

export function auth_state_changed(flag){
    return{
        type:types.firebase_auth_state,
        flag
    }
}