import React from 'react';
import { View ,TextInput,ActivityIndicator,ImageBackground,StyleSheet,StatusBar,AsyncStorage} from 'react-native';
import { 
    Container, Header, Content, Form, Item, Input, sLabel ,Label,Icon,Button,Text,Card, CardItem,  Footer, FooterTab, Picker,Toast,Thumbnail,Badge} 
    from 'native-base';

import {AuthService} from '../../services/auth'


export class Login extends React.Component {
  constructor(props) {
    super(props);
    const navigate = this.props.nv
    const self = this.props.self
    this.state = {
      password: '',
      email:'',
      show_loader:false,
      access_token: null,
      valid_pass: undefined,
      valid_email: undefined,
      valid_state: 0,
      auth_service: new AuthService(this),
      navigate: navigate,
      self: self
    };
  }






  validate_password(pass=false){
    
    pl = pass || this.state.password
    pl = pl.length
    if(pl<8){
      this.setState({valid_state:3}) ;
      this.setState({valid_pass:false});  
      
    }
    else{
          
      if(this.state.valid_state == 3){
        this.setState({valid_state:0})
        if(this.state.valid_email!=undefined)
          this.validate_email()
      }
      this.setState({valid_pass:true});
    }
  }


  validate_email(em){

    email = em || this.state.email
    if(!this.validateEmail(this.state.email)){
      this.setState({valid_state:1}) ;
      this.setState({valid_email:false});  
      
    }
    else{
          
      if(this.state.valid_state == 1){
        this.setState({valid_state:0})
 
        if(this.state.valid_pass!=undefined)
          this.validate_password()
      }
      this.setState({valid_email:true});
    }

  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }





  login() {
    this.state.auth_service.login()
  
  }

   /**
   * create Toast pattern to avoid repeating code                                     
   * **********************************************************
   */
  showToast(msg,btn){
    Toast.show({
      text: msg,
      position: 'bottom',
      buttonText: btn,
      duration: 5000,
      style: {
        backgroundColor: "#212121",
        opacity:0.76
       }
    })
  }


  render() {
    const self = this;
    return (
 
        <View style={{alignItems:'center',alignContent:'space-between'}}>
   
  
                <Form style={{marginBottom:15}}>

              
              <Item style={{width:'100%'}}>
                        <Icon style={{color:'red'}}   active name='mail' />
                        <Input  placeholder='email'
                        onChangeText={(text) =>{ this.setState({email: text});this.validate_email(text)}}
                        keyboardType='email-address'
                        />

                       {this.state.valid_email ==true&&
                        (
                          <Icon style={{color:'green'}}  name='checkmark-circle' />
                        )
                      }
                      {this.state.valid_email==false &&
                        (
                          <Icon style={{color:'red'}}  name='close-circle' />
                        )
                      }
                      </Item>


                  
                    <Item style={{width:'100%'}}>
                      <Icon style={{color:'red'}}    name='key' />
                      <Input   
                      secureTextEntry={true} placeholder='password'
                      onChangeText={(text) => {this.setState({password: text});this.validate_password(text)}  }
                      />
                      {this.state.valid_pass ==true&&
                        (
                          <Icon style={{color:'green'}}  name='checkmark-circle' />
                        )
                      }
                      {this.state.valid_pass==false &&
                        (
                          <Icon style={{color:'red'}}  name='close-circle' />
                        )
                      }
                    </Item>
                </Form>

             <View>
             {this.state.valid_state==1 && (
                  <Badge   style={{backgroundColor:'#F44336',opacity:.8}}>
                  <Text  style={{color:'white'}} note>Email is malformed
                  </Text>
                </Badge>
               )}

              {this.state.valid_state==3 && (
                  <Badge   style={{backgroundColor:'#F44336',opacity:.8}}>
                  <Text  style={{color:'white'}} note>password too short: min 8 characters
                  </Text>
                </Badge>
               )}
              
              </View>
                <Button
                 style={{marginTop:21,marginBottom:21,backgroundColor:'#F44336'}}
                 block rounded  primary disabled={this.state.show_loader} iconLeft
                 onPress={ (dull)=>{ this.setState({show_loader:true});this.login()} }

                >

                {this.state.show_loader && (
                 <ActivityIndicator size="large" color="#fff" />
                )            
                }
                {
                    !this.state.show_loader    &&
                    <Icon name= 'person' />
                }
                {
                    !this.state.show_loader &&
                    <Text >Login </Text>
                }
         
                </Button>
        
 
        
      </View>


    );
  }
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
   
    }
  });
  


