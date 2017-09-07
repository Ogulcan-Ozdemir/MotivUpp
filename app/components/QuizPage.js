import React, { Component,PureComponent  } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import * as firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import user_info from 'react-native-sensitive-info';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions/index'
class QuizPage extends PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            quiz_names:[],
            admin:'',
            super_admin:'',
            department:'',
            company_name:'',
            index: 0,
            routes: [
                { key: '1', title: 'First' },
                { key: '2', title: 'Second' },
            ],
            visible:true

        };
        user_info.getItem('admin',{}).then(value=>{
            this.setState({admin:value});
        }).then(()=>{
            return user_info.getItem('super_admin',{}).then(value=>{
                this.setState({super_admin:value})
            }).then(()=>{
                return user_info.getItem('department',{}).then(value=>{
                    this.setState({department:value})
                    // console.log("department1 "+this.state.department)
                }).then(()=>{
                    return user_info.getItem('company_name',{}).then(value=>{
                        this.setState({company_name:value})
                        let array=[];
                        let ref=this.state.company_name+"/quizes/"+this.state.department.replace(" ","+");
                        // console.log(ref)
                        this.props.firebase_test_array(ref);
                    });
                });
            });
        });


      // this.flatlist_value.bind(this);
    }




    // _handleIndexChange = index => this.setState({ index });
    //
    // _renderHeader = props => <TabBar {...props} />;
    //
    // _renderScene = SceneMap({
    //     '1': FirstRoute,
    //     '2': SecondRoute,
    // });


    componentWillMount(){


    }



    render(){
        // console.log(this.state.quiz_names)
        return (
            <View  >
                <FlatList
                data={
                    (this.props.array!==undefined)?
                        this.props.array:
                       this.state.quiz_names}
                renderItem={({item}) =>
                    <TouchableOpacity style={{marginLeft:10,marginTop:10}} onPress={this.on_press_value.bind(this,item.key)}><Text>{item.key}</Text></TouchableOpacity>}
                keyExractor={({item,index})=>item.key}
                />
            </View>

        )
    }

    on_press_value(value){
        Actions.solve_quiz({value:value});
    }
}



function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators,dispatch);
}

function mapStateToProps(state) {
    return{
        count:state.count,
        user:state.user.current_user,
        array:state.incoming_data.snap
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(QuizPage);
