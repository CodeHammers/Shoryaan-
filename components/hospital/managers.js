import React from 'react'
import { Container, Header, Item, Input, Icon,Title, Button, Text, CheckBox, Form,Body, ListItem, Picker, Content, List, Left, Right, Thumbnail } from 'native-base';
import {StyleSheet, View, ScrollView, StatusBar} from 'react-native'

import {AuthService} from '../../services/auth'

import I18n, { getLanguages } from 'react-native-i18n';


export class Managers extends React.Component
{

    constructor(props){
        super(props)
        const { params } = this.props.navigation.state;

        this.state ={
            managers:[],
            id: params.id,
            auth_service: new AuthService(this), //instance from an authentication service
            email: '',
            languages:""
        }
        this.getManagers()
    }



    componentWillMount() {
        getLanguages().then(languages => {
            this.setState({ languages: languages });
        });
    }

    getManagers(){
        this.state.auth_service.get('/hospital/hospital_users?id='+this.state.id)
        .then((res)=> { return res.json() } )
        .then((res_json)=>{
            this.setState({managers: res_json })
        })
    }

    setManager(){
        //alert("msg="+this.state.id +',,hi='+this.state.email)
        //return
        //alert("Not implement in frontEnd yet")
        this.state.auth_service.get('/hospital/add_user_to_hospital?id='+this.state.id+"&email="+this.state.email)
        .then((res)=> { return res.json() } )
        .then((res_json)=>{
            this.setState({managers: res_json })
            alert('Sucess')
        })
    }

    /** A function that renders the actual view */
    render(){
        return(
            <Container style = {styles.form}>
                <Header style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>
                     
                        <Icon name='arrow-back'  style={{color:'white'}}  onPress={() => this.props.navigation.goBack()} />
         
                    </Left>

                    <Body style = {styles.title}>
                        <Title> Managers </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                  
                            <Icon name='home' style={{color:'white'}}  />
           
                    </Right>
                </Header>
                <View style={{flexDirection:'row',margin:10}}>               
                    <Text> {  this.state.languages.includes('ar') ?  I18n.t('Managers') : "Managers" } </Text>
                    <Right>
                        <Button transparent onPress={()=>{this.getManagers()}}> 
                            <Icon style={{color:'red'}} name='md-sync' />
                        </Button>
                    </Right>
          

                
                </View>
                <View>

                    <List dataArray={this.state.managers} renderRow={(arrayholder) =>
                        <ListItem avatar button={true}  style={{marginTop:17}}>
                            <Left>
                                <Thumbnail source={require('../../hos.png')} />
                            </Left>
                            <Body>
                                <Text style={styles.listitemname}>{arrayholder.username}</Text>
                                <Text style={styles.StatePickerItem} note>{arrayholder.email}</Text>
                            </Body>
                            <Right>
                                <Text style={styles.StatePickerItem} note>{ this.state.languages.includes('ar') ? I18n.t('Managers') : "Managers"} </Text>
                            </Right>
                        </ListItem>
                    }>
                    </List>

             <Form style={{margin:15}}>

                    <Item style={{marginTop:8,marginBottom:8}} >
                                <Input   
                                    placeholder={ this.state.languages.includes('ar') ? I18n.t('E-mail') : "E-mail" } 
                                    onChangeText={(text) =>{ this.setState({email: text});}}

                                />
                        
                    </Item>
                    <Button rounded  danger sytle={{marginTop:12}} onPress={()=>{this.setManager()}} >
                        <Text>  { this.state.languages.includes('ar') ? I18n.t("Add New Manager") : "Add New Manager" }  </Text>
                    </Button>
            </Form>
               


                </View>


            </Container>
        )
    }
}

/** Style sheet used for styling components used in the render function */
const styles = StyleSheet.create({
    statusBar:{
        backgroundColor: '#D32F2F'
    },

    header:{
        backgroundColor: '#F44336',
        height: 50
    },

    title:{
        flex: 1,  
        justifyContent: 'center', 
        alignItems: 'center'
    },

    form:{
        backgroundColor: '#FFFF'
    }
})


I18n.fallbacks = true;

I18n.translations = {
 
  'ar': require('../../locales/ar'),
 
};