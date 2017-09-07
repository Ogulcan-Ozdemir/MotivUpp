import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button
} from 'react-native';

import * as firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import user_info from 'react-native-sensitive-info';
import Modal from 'react-native-modal'

class FindOrganization extends Component{
    constructor(props){
        super(props);
        this.state={
            organization_name: '',
            visible:false,
            new_organization_name:''
        }
    }

    show_modal=()=>this.setState({visible:true});
    hide_modal=()=>this.setState({visible:false});

    render(){
      return(
          <View>
            <TextInput
                style={{height: 40, borderColor: 'gray', width: 300}}
                onChangeText={(organization_name) => {
                    let patt1 = /\W/g;
                    if(patt1.test(organization_name)){
                        alert('You can\'t enter this char')
                    }else {
                        this.setState({organization_name})}
                }}
                value={this.state.organization_name}
                placeholder={'Enter organization name'}
            />

              <Button
                  title={'Find'}
                  style={{fontSize: 20, color: '#F5FCFF' ,backgroundColor:'#4caf50', marginTop:'10', flex:1}}
                  styleDisabled={{color: 'red'}}
                  onPress={this.find_organization_btn.bind(this,this.state.organization_name)}>
              </Button>

              <Modal isVisible={this.state.visible}  animationIn={'zoomInDown'} animationOut={'zoomOutUp'} animationInTiming={1000} animationOutTiming={1000} onBackdropPress={()=>this.setState({visible:false})} onBackButtonPress={()=>this.setState({visible:false})}>
                  <View style={{ padding:10, backgroundColor:'#ffffff',justifyContent:'center' }}>
                      <TextInput
                          style={{height: 40, borderColor: 'gray', width: 300}}
                          onChangeText={(organization_name) =>{
                              let patt1 = /\W/g;
                              if(patt1.test(organization_name)){
                                  alert('You can\'t enter this char')
                              }else {
                                  this.setState({organization_name})}}
                              }
                          value={this.state.organization_name}
                          placeholder={'Enter organization name'}
                      />

                      <Button
                          title={'Make New Company'}
                          style={{fontSize: 20, color: '#F5FCFF' ,backgroundColor:'#4caf50', marginTop:'10', flex:1}}
                          styleDisabled={{color: 'red'}}
                          onPress={this.make_new_company.bind(this,this.state.organization_name)}>
                      </Button>

                      {/*<Button*/}
                          {/*title={'Cancel'}*/}
                          {/*style={{fontSize: 20, color: '#F5FCFF' ,backgroundColor:'#4caf50', marginTop:'20', flex:1}}*/}
                          {/*styleDisabled={{color: 'red'}}*/}
                          {/*onPress={this.hide_modal.bind(this)}>*/}
                      {/*</Button>*/}
                  </View>
              </Modal>

        </View>
      )
    }

    make_new_company(value){
        if(value.toString().length>0){
            this.hide_modal()
            Actions.make_new_company({company_name:value})
        }else {
            alert("You should enter company name")
        }

    }

    find_organization_btn(name){
        if(name.toString().length>0) {
            return firebase.database().ref("firms").once('value').then((snapshot) => {
                let value = snapshot.val();
                let firms_array = Object.keys(value).map((key) => value[key]
                );
                if (firms_array.includes(name)) {
                    return firebase.database().ref(name + "/PropertiesOfUsers/" + firebase.auth().currentUser.email.replace(".", "%")).once('value').then((snapshot) => {
                        let user = snapshot.val();
                        if (user !== null) {
                            user_info.setItem('company_name', name, {});
                            user_info.setItem('user_email', firebase.auth().currentUser.email, {});
                            user_info.setItem('admin', user.admin.toString(), {});
                            user_info.setItem('super_admin', user.superAdmin.toString(), {});
                            user_info.setItem('department', user.department, {});
                            Actions.quiz_page();
                        } else {
                            this.setState({visible: true})
                        }
                    }).catch((error) => {
                        console.log(error)
                    })
                } else {
                    this.setState({visible: true})
                }

            }).catch((error) => {
                alert(error.toString());
            });
        }else {
            alert("You should enter company name")
        }

    }
}

export default FindOrganization;