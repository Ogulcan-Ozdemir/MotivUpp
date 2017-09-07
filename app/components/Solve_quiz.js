import React, { Component,PureComponent  } from 'react';
import {
    Image,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import * as firebase from 'firebase';
import user_info from 'react-native-sensitive-info';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions/index'
import Carousel  from 'react-native-looped-carousel';
import Spinner from 'react-native-loading-spinner-overlay';
import Video from 'react-native-video-player';
const { width, height } = Dimensions.get('window');
class Solve_quiz extends Component{
    constructor(props){
        super(props);
        this.state={
            questions:undefined,
            department:'',
            company_name:'',
            size: { width, height},
            selected_answers:[],
            visible:true,
            finish:false
        }
    }

    componentWillMount(){
        // console.log(this.props.value);
        user_info.getItem('department',{}).then(value=>{
            this.setState({department:value});
        }).then(()=>{
            return user_info.getItem('company_name',{}).then(value=>{
            this.setState({company_name:value})
            this.setState({questions:[]})
          });
        }).then(()=>{
             let ref=this.state.company_name+"/quizes/"+this.state.department.replace(" ","+");
             // console.log(ref);
             this.props.firebase_questions_array(this.state.company_name,this.state.department,this.props.value);
        });
    }

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }

    render(){
        return(
                <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
                    <Carousel
                        style={this.state.size}
                        pageInfo
                        autoplay={false}
                        onAnimateNextPage={(p) => {
                            console.log(this.props.array.keys.length)
                            if(this.state.questions.length===p){
                                console.log("bitir")
                                this.setState({finish:true})
                            }else {
                                this.setState({finish:false})
                            }
                            }}
                        arrows={true}
                    >
                        {
                            (this.state.questions!==undefined)?
                                Object.keys(this.state.questions).map((key)=>{
                                    // console.log(this.state.questions);
                                    let item=this.state.questions[key];
                                    // console.log(item);
                                    if(item.type===1) {
                                        return ( <View  key={key} style={[{
                                            backgroundColor: '#ffffff',
                                            justifyContent: 'center',

                                        }, this.state.size]}>
                                            <View ref={key} style={{marginLeft:30}}>
                                            <Text>{item.question}</Text>
                                                <TouchableOpacity ref={key+"---"+item.answer1} onPress={this.on_press.bind(this, key,item.answer1)}>
                                            <Text>{item.answer1}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity ref={key+"---"+item.answer2} onPress={this.on_press.bind(this, key,item.answer2)}>
                                            <Text>{item.answer2}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity ref={key+"---"+item.answer3} onPress={this.on_press.bind(this, key,item.answer3)}>
                                            <Text>{item.answer3}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity ref={key+"---"+item.answer4} onPress={this.on_press.bind(this, key,item.answer4)}>
                                            <Text>{item.answer4}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            {(this.state.finish)?  <TouchableOpacity onPress={this.finish.bind(this)}>
                                                <Text>Finish</Text>
                                            </TouchableOpacity>:null}
                                        </View>)
                                    }else if(item.type===0) {
                                        if(this.props.urls!==undefined){
                                            return ( <View key={key} style={[{
                                                backgroundColor: '#ffffff',
                                            }, this.state.size]}>
                                                <View  style={{marginTop:15}}>
                                                    {/*<Text>{"image url "+item.imageAndVideoView}</Text>*/}
                                                    <Image
                                                        style={{width: this.state.size.width, height: this.state.size.height/3}}
                                                        source={{uri: this.props.urls[key].ya}}
                                                    />
                                                    <View ref={key} style={{marginLeft:30,justifyContent:'center',marginTop:30}}>
                                                    <Text>{item.question}</Text>
                                                    <TouchableOpacity ref={key+"---"+item.answer1} onPress={this.on_press.bind(this, key,item.answer1)}>
                                                        <Text>{item.answer1}</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity ref={key+"---"+item.answer2} onPress={this.on_press.bind(this, key,item.answer2)}>
                                                        <Text>{item.answer2}</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity ref={key+"---"+item.answer3} onPress={this.on_press.bind(this, key,item.answer3)}>
                                                        <Text>{item.answer3}</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity ref={key+"---"+item.answer4} onPress={this.on_press.bind(this, key,item.answer4)}>
                                                        <Text>{item.answer4}</Text>
                                                    </TouchableOpacity>
                                                    </View>
                                                </View>
                                                {(this.state.finish)?  <TouchableOpacity onPress={this.finish.bind(this)}>
                                                    <Text>Finish</Text>
                                                </TouchableOpacity>:null}
                                            </View>)
                                        }
                                    }else {
                                        return ( <View key={key} style={[{
                                            backgroundColor: '#ffffff',
                                        }, this.state.size]}>
                                            <View ref={key} style={{marginTop:15}}>
                                                <Video video={{uri:this.props.urls[key].ya}}   
                                                       videoWidth={this.state.size.width}
                                                       loop={true}
                                                       videoHeight={this.state.size.height/3}
                                                />
                                                <View ref={key} style={{marginLeft:30,justifyContent:'center',marginTop:30}}>
                                            <Text>{item.question}</Text>
                                                <TouchableOpacity ref={key+"---"+item.answer1} onPress={this.on_press.bind(this, key,item.answer1)}>
                                            <Text>{item.answer1}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity ref={key+"---"+item.answer2} onPress={this.on_press.bind(this, key,item.answer2)}>
                                            <Text>{item.answer2}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity ref={key+"---"+item.answer3} onPress={this.on_press.bind(this, key,item.answer3)}>
                                            <Text>{item.answer3}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity ref={key+"---"+item.answer4} onPress={this.on_press.bind(this, key,item.answer4)}>
                                            <Text>{item.answer4}</Text>
                                                </TouchableOpacity>
                                                </View>
                                            </View>
                                            {(this.state.finish)?  <TouchableOpacity onPress={this.finish.bind(this)}>
                                                <Text>Finish</Text>
                                            </TouchableOpacity>:null}
                                        </View>)
                                    }
                                }):
                                <View style={[{ backgroundColor: '#ffffff', justifyContent: 'center' }, this.state.size]}>
                                    <Spinner visible={this.state.visible} style={[{ justifyContent: 'center' }]} />
                                </View>}
                    </Carousel>
                </View>
        )
    }


    finish(){
        console.log("bitir")
    }

   on_press(key,value){
        let ref=key+"---"+value;
       console.log(this.state.selected_answers);
       this.props.selected_answer_fun(key,value);
        this.refs[ref].setNativeProps({
            backgroundColor:'#BADA55'
        })
   }

    componentWillReceiveProps(props){
        this.setState({questions:props.array})
        console.log(this.state.questions);
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators,dispatch);
}

function mapStateToProps(state) {
    if(state.incoming_questions_array.snap!==undefined) {
        console.log(state.incoming_questions_array.snap);
    }
    return{
        user:state.user.current_user,
        array:state.incoming_questions_array.snap,
        urls:state.incoming_questions_array.url
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Solve_quiz);