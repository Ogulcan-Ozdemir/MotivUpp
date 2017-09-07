import React, { Component,PureComponent  } from 'react';
import {
    Picker,
    Text,
    View,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    StyleSheet
} from 'react-native';

import * as firebase from 'firebase';
import user_info from 'react-native-sensitive-info';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions/index'
import {Actions} from 'react-native-router-flux'
import Accordion from 'react-native-collapsible/Accordion';
import Modal from 'react-native-modal'
import CustomMultiPicker from "react-native-multiple-select-list";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');

const userList = {
    "1":"admin",
    "2":"super_admin",
}
class Make_new_company extends Component{
    constructor(props){
        super(props);
        this.state= {
            department: '',
            departments: [],
            size: {width, height},
            visible: false,
            emails: "",
            selected_department: "",
            user_department_modal: false,
            selected_user: "",
            users: [],
            new_user:false,
            temp_previleges:[]
        }

    }

    _renderHeader(section) {
        // console.log(section)
        return (
            <View style={{backgroundColor:"#a8b9ad",padding:10}}>
                <Text >{section.department_name}</Text>
            </View>
        );
    }

    on_press_email(email){
        console.log(email)
    }

    _renderContent(section) {
        return (
            <View style={{backgroundColor:"#ffffff",marginLeft:10,padding:5}} >
                {Object.keys(section.emails).map((key)=>{
                    // console.log(section.emails[key])
                   return(
                       <TouchableOpacity style={{paddingTop:5}} key={key} onPress={()=>{
                           console.log(section.emails[key])
                           this.setState({user_department_modal:true})
                           this.setState({selected_user:section.emails[key]})
                       }}>
                       <Text>{section.emails[key]}</Text>
                       </TouchableOpacity>)
                })}
            </View>
        );
    }

    selected_user_privileges(){
        let array=[];
        this.state.users.forEach((key)=>{
            if(key.email.toString()===this.state.selected_user){
                array=[key.admin,key.super_admin];
            }
        })

        return array
    }

    user_options(){
        console.log(this.state.selected_department)
         this.user_check(this.state.selected_user,this.state.departments,this.state.selected_department)
    }


    render(){
        // console.log(this.state.users)
        return (
            <View style={{flex:1,zIndex:1}}>
                <Modal isVisible={this.state.visible}  animationIn={'zoomInDown'} animationOut={'zoomOutUp'} animationInTiming={1000} animationOutTiming={1000} onBackdropPress={()=>this.setState({visible:false})} onBackButtonPress={()=>this.setState({visible:false})}>
                    <View style={{ padding:10, backgroundColor:'#ffffff',justifyContent:'center' }}>

                        <TextInput
                            style={{height: 40, borderColor: 'gray', width: 300}}
                            onChangeText={(deparment) => {
                                this.setState({department:deparment})
                            }}
                            value={this.state.department}
                            placeholder={'Enter departments here'}
                        />

                        <TextInput
                            style={{height: 40, borderColor: 'gray', width: 300}}
                            onChangeText={(emails) => {
                                this.setState({emails:emails})
                            }}
                            value={this.state.emails}
                            placeholder={'Enter emails here'}
                        />

                        <Button
                            title={'Make New Company'}
                            style={{fontSize: 20, color: '#F5FCFF' ,backgroundColor:'#4caf50', marginTop:'10', flex:1}}
                            styleDisabled={{color: 'red'}}
                            onPress={this.departments_fun.bind(this,this.state.department)}
                            >
                        </Button>
                    </View>
                </Modal>
                <Modal isVisible={this.state.user_department_modal} onBackdropPress={()=>this.setState({user_department_modal:false,new_user:false})} onBackButtonPress={()=>this.setState({user_department_modal:false,new_user:false})}>
                    <View style={{ padding:10, backgroundColor:'#ffffff',justifyContent:'center' }}>
                        <Picker
                            selectedValue={this.state.selected_department}
                            onValueChange={(item_value, item_index) => {
                                console.log(item_value)
                                this.setState({selected_department: item_value})}}>
                            {
                              Object.keys(this.state.departments).map((key)=>{
                                 return (
                                     <Picker.Item key={key} label={this.state.departments[key].department_name} value={this.state.departments[key].department_name} />
                                 )
                              })
                              }
                        </Picker>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', width: 300}}
                            onChangeText={(user_email) => {
                                this.setState({selected_user:user_email})}}
                            value={this.state.selected_user}
                            placeholder={'Enter user email here'}
                        />
                        <CustomMultiPicker
                        options={userList}
                        search={false} // should show search bar?
                        multiple={true} //
                        returnValue={"label"} // label or value
                        callback={(privilieges)=>{ 
                            if(this.state.users!==undefined && !this.state.new_user){
                            for(let i=0;i<this.state.users.length;i++) {
                                if (this.state.users[i].email.toString() === this.state.selected_user) {

                                    if (privilieges[0]==="admin") {
                                        console.log(privilieges)
                                        this.state.users[i].set_admin("admin")
                                    } else {
                                        console.log(privilieges)
                                        this.state.users[i].set_admin("not_admin")
                                    }
                                    if (privilieges[1]==="super_admin") {
                                        console.log(privilieges)
                                        this.state.users[i].set_super_admin("super_admin")
                                    } else {
                                        console.log(privilieges)
                                        this.state.users[i].set_super_admin("not_super_admin")
                                    }
                                    break
                                }
                            }
                        }else {
                               if(privilieges[2]==="admin"){
                                   console.log("admin")
                                   privilieges[0]="admin"
                                   privilieges.pop();
                               }else if(privilieges[2]==="not_admin"){
                                   console.log(privilieges)
                                   privilieges[0]="not_admin"
                                   privilieges.pop();
                               }else if(privilieges[2]==="super_admin"){
                                   console.log("super")
                                   privilieges[1]="super_admin"
                                   privilieges.pop();
                               }else if(privilieges[2]==="not_super_admin"){
                                   console.log("else")
                                   privilieges[1]="not_super_admin"
                                   privilieges.pop();
                               }
                               console.log("after remove")
                                console.log(privilieges)
                               this.setState({selected_user_privileges:privilieges})
                            }
                        }} 
                        rowBackgroundColor={"#eee"}
                        rowHeight={40}
                        rowRadius={5}
                        iconColor={"#00a2dd"}
                        iconSize={30}
                        selectedIconName={"ios-add-circle-outline"}
                        unselectedIconName={"ios-remove-circle-outline"}
                        scrollViewHeight={130}
                        selected={this.selected_user_privileges()} 
                        />
                        <Button
                            title={(this.state.new_user)?'add user':'apply changes'}
                            style={{fontSize: 20, color: '#F5FCFF' ,backgroundColor:'#4caf50', marginTop:'10', flex:1}}
                            styleDisabled={{color: 'red'}}
                            onPress={this.user_options.bind(this)}
                        >
                        </Button>
                    </View>
                </Modal>
                {this.state.departments.length===0?
                    <View><Text>You dont enter department</Text></View>:null}
                <Accordion
                    sections={this.state.departments}
                    renderHeader={this._renderHeader}
                    renderContent={(section)=>{
                        return (
                        <View style={{backgroundColor:"#ffffff",marginLeft:10,padding:5}} >
                            {Object.keys(section.emails).map((key)=>{
                                // console.log(section.emails[key])
                                return(
                                    <TouchableOpacity style={{paddingTop:5}} key={key} onPress={()=>{
                                        this.setState({user_department_modal:true})
                                        this.setState({selected_user:section.emails[key]})
                                        this.state.users.forEach((value)=>{
                                            if(value.email===section.emails[key]){
                                                this.setState({selected_department:value.department})
                                            }
                                        })

                                    }}>
                                        <Text>{section.emails[key]}</Text>
                                    </TouchableOpacity>)
                            })}
                        </View>
                    )}}
                    style={{zIndex:1}}
                />
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    active={true}
                    style={{zIndex:2}}
                    position={'right'}
                    onPress={()=> {
                        if (this.state.departments.length > 0) {
                            this.setState({user_department_modal: true, new_user: true,selected_department:""})
                        }else {
                            alert("You should enter at least one department before add user");
                        }
                    }}
                    buttonText={'add user'}
                    buttonTextStyle={{fontSize:15,marginLeft:15}}
                   />

                <Button
                    title={'Make New Department'}
                    style={{fontSize: 20, color: '#F5FCFF' ,backgroundColor:'#4caf50', marginTop:'10', flex:1}}
                    styleDisabled={{color: 'red'}}
                    onPress={()=>{this.setState({visible:true})}}
                />


            </View>
        )
    }

    departments_fun(value){
        let temp_email;
        let temp_emails;
        let email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value.toString().length > 0) {

                let departments = this.state.departments;
                let temp_emails;
                let temp_deps = [];
                for (let i = 0; i < departments.length; i++) {
                    temp_deps.push(departments[i].department_name);
                    // console.log(temp_dep)
                }

                if (!temp_deps.includes(value)) {
                    if (this.state.emails.length > 0 && this.state.emails.toString().indexOf(",") <= 0) {
                        temp_email = this.state.emails.toString();
                        if (email_regex.test(temp_email)) {
                            this.user_check(temp_email,departments,value)
                        } else {
                            alert("You enter invalid email")
                        }
                    } else if (this.state.emails.toString().indexOf(",") >= 0) {
                        temp_emails = [];
                        this.state.emails.split(",").forEach((email) => {
                            if (email_regex.test(email)) {
                                let checked_email=this.user_check(email,departments,value)
                                // console.log(checked_email)
                                if(checked_email!==undefined) {
                                    temp_emails.push(checked_email);
                                }


                            }
                        })
                        // console.log(temp_emails)
                        // if (temp_emails.length > 0) {
                        //     let temp_dep = {
                        //         department_name: value,
                        //         emails: temp_emails
                        //     }
                        //     console.log(this.state.users)
                        //     departments.push(temp_dep)
                        //     this.setState({emails: ""})
                        //     this.setState({departments: departments})
                        //     this.setState({visible: false})
                        //
                        // } else {
                        //     alert("None of emails you enter was a valid")
                        // }

                    } else {
                        alert("You should enter at least one email")
                    }
                } else {
                    alert("This department implemented before")
                }


        } else {
            alert("Enter department name");
        }

    }

    user_check(temp_email,departments,value){
        let flag=false;
        let email=undefined;
        if(this.state.users.length>0){
            this.state.users.forEach((value)=>{
                if(value.email===temp_email && this.state.new_user){
                    alert("You can't add this user because user in "+value.department);
                    flag=true;
                }

            });
            console.log(value)
            if(!flag && this.state.departments.length>0){
                const new_user=new User(temp_email,value,"not_admin","not_super_admin");
                if(this.state.temp_previleges.length>0){
                    this.state.temp_previleges.forEach((key)=>{
                        if(key==="admin"){
                            new_user.set_admin("admin");
                        }else if(key==="super_admin"){
                            new_user.set_super_admin("super_admin")
                        }
                    })
                    console.log(new_user)
                }
                // let temp_dep = {
                //     department_name: value,
                //     emails: [temp_email]
                // }

                this.state.departments.forEach((key)=>{
                    if(key.department_name===value){
                        // console.log( departments[departments.indexOf(key)]);
                        console.log("Before new value")
                        if(!key.emails.includes(temp_email)){
                            console.log("Before new value")
                            let temp_emails= departments[departments.indexOf(key)].emails.concat(temp_email);
                            let temp_dep=departments[departments.indexOf(key)];
                            temp_dep.emails=temp_emails;
                            departments[departments.indexOf(key)]=temp_dep;
                            console.log(departments[departments.indexOf(key)]);
                            // this.setState({:})
                        }
                    }

                });
                this.setState({users:[...this.state.users,new_user]})
                console.log(departments);
                this.setState({emails: ""})
                this.setState({departments: departments})
                this.setState({visible: false})
                if(this.state.selected_user!==""){
                    this.setState({selected_user:"",user_department_modal:false,temp_previleges:[]})
                }
            }
        }
        else {
            const new_user=new User(temp_email,value,"not_admin","not_super_admin");
            let temp_dep = {
                department_name: value,
                emails: [temp_email]
            }
            this.setState({users:[...this.state.users,new_user]})

            // console.log(this.state.users);
            departments.push(temp_dep)
            this.setState({emails: ""})
            this.setState({departments: departments})
            this.setState({visible: false})
        }
        return email
    }


}

class User {
    constructor(email, department, admin, super_admin) {
        this.email = email;
        this.department = department;
        this.admin = admin;
        this.super_admin = super_admin;
    }

    get_email() {
        return this.email;
    }
    get_department() {
        return this.department;
    }
    get_admin() {
        return this.admin;
    }
    get_super_admin() {
        return this.super_admin;
    }

    set_email(email){
        this.email=email;
    }

    set_department(department){
        this.department=department;
    }

    set_admin(admin){
        this.admin=admin;
    }

    set_super_admin(super_admin){
        this.super_admin=super_admin;
    }
}


const styles = StyleSheet.create({

    container: {

        flex: 1,

        justifyContent: 'center',

        alignItems: 'center',

        backgroundColor: '#F5FCFF'

    },

    welcome: {

        fontSize: 20,

        textAlign: 'center',

        margin: 10

    },

    actionButtonIcon: {

        fontSize: 20,

        height: 22,

        color: 'white',

    }

});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators,dispatch);
}

function mapStateToProps(state) {
    return{
        user:state.user.current_user,
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Make_new_company);