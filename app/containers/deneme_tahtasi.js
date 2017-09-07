import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
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
import Carousel  from 'react-native-looped-carousel';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions'
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get('window');

class DenemeTahtasi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //todo kaldır bunları
            email: 'motivupadm@gmail.com',
            password:'123456',
            size: { width, height},
            array:[
                {key:"1"},
                {key:"2"},
                {key:"3"}
            ],
            ref_page:[],
            selected:[],
            visible:true
        };

        // this.props.firebase_test_array();
    }

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }

    componentWillMount(){
        // console.log(AppState().state);
        // _firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user)=>{
        // _firebase.database().ref("IEU/quizes/Computer+Engineering/Job Safety").once('value',(snapshot)=>{
        //     let questions_key=snapshot.val();
        //     let temp_array=[];
        //     Object.keys(questions_key).map((key)=>{
        //         _firebase.database().ref("IEU/question_pool/Computer+Engineering/questions/-KjycQhDx9iKdBCr7Xx9").once('value').then((snapshot)=>{
        //             let item=snapshot.val();
        //             // console.log(item);
        //             temp_array.push(item);
        //             return temp_array;
        //         }).then((array)=>{
        //             this.setState({array:array})
        //             // console.log("array "+array);
        //         }).then(()=>{
        //
        //         })
        //     })
        //
        // })
        // })
        this.props.sign_in('motivupadm@gmail.com','123456')
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                visible: !this.state.visible
            });
        }, 3000);
    }

    render() {

        return (

            <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
                <Carousel
                    style={this.state.size}
                    pageInfo
                    autoplay={false}
                    onAnimateNextPage={(p) => console.log(p)}
                    arrows={true}
                >
                    {
                     (this.props.array!==undefined)?
                        Object.keys(this.props.array).map((key)=>{
                         // console.log("key in "+this.state.selected.includes(key));
                         let array=[];
                         console.log(Array.prototype.includes(key));
                         // array=this.state.selected;

                         // if(array.prototype.includes(key)==="true" && array!==undefined) {
                         //     return (
                         //         <View key={key} style={[{
                         //             backgroundColor: '#2315da',
                         //             justifyContent: 'center'
                         //         }, this.state.size]}>
                         //             <TouchableOpacity onPress={this.on_press.bind(this, key)}>
                         //                 <Text style={{textAlign: 'center'}}>{this.props.array[key]}</Text>
                         //             </TouchableOpacity>
                         //         </View>
                         //     )
                         // }else {
                             return (
                                 <View key={key} style={[{
                                     backgroundColor: '#ffffff',
                                     justifyContent: 'center'
                                 }, this.state.size]}>
                                     <TouchableOpacity onPress={this.on_press.bind(this, key)}>
                                         <Text style={{textAlign: 'center'}}>{this.props.array[key]}</Text>
                                     </TouchableOpacity>
                                 </View>
                             )
                         // }
                    }):
                         <View style={[{ backgroundColor: '#BADA55', justifyContent: 'center' }, this.state.size]}>
                             <Spinner visible={this.state.visible} style={[{ justifyContent: 'center' }]} />

                         </View>}
                    {/*<View style={[{ backgroundColor: '#BADA55' }, this.state.size]}><Text>1</Text></View>*/}
                    {/*<View style={[{ backgroundColor: 'red' }, this.state.size]}><Text>2</Text></View>*/}
                    {/*<View style={[{ backgroundColor: 'blue' }, this.state.size]}><Text>3</Text></View>*/}
                </Carousel>
                {/*<Text>user {*/}
                {/*(this.props.user!==undefined)?*/}
                    {/*this.props.user.email:""*/}
                 {/*}</Text>*/}
                {/*<Text>*/}
                    {/*count {this.props.count}*/}
                {/*</Text>*/}
                {/*<TouchableOpacity onPress={()=>this.increment_number()}>*/}
                    {/*<Text>increment number</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>

        );
    }

    on_press(value){
        // this.setState({selected:this.state.selected.push(value)})
        console.log(value);
    }

    increment_number(){
        this.props.firebase_test_array();
    }


}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators,dispatch);
}

function mapStateToProps(state) {
    console.log(state.incoming_data.snap);
    return{
        count:state.count,
        user:state.user.current_user,
        array:state.incoming_data.snap
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DenemeTahtasi);