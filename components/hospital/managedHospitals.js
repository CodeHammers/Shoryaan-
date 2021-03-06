import React from 'react'
import { Container, Header, Item, Input, Icon,Title, Button, Text, CheckBox, Body, ListItem, Picker, Content, List, Left, Right, Thumbnail ,Fab} from 'native-base';
import {StyleSheet, View, ScrollView, StatusBar, AsyncStorage} from 'react-native'


import {AuthService} from '../../services/auth'


import I18n, { getLanguages } from 'react-native-i18n';


export class ManagedHospitals extends React.Component
{

    constructor(props){
        super(props)
        this.state ={
            arrayholder:[1,2,3,4,5,6],
            hospitals: [],
            auth_service: new AuthService(this), //instance from an authentication service
            access_token: ''
        }
       
        this.checkStoredToken().then(
            ()=>{this.getHospitalData()}
        )
    }


    componentWillMount() {
        getLanguages().then(languages => {
            this.setState({ languages: languages });
            //alert(languages)
            //alert(languages)
        });
    }


    /** A function that retrieves that access token from the mobile's cache */
    checkStoredToken(){
        return AsyncStorage.getItem("access_token").then((value) => {
            if(value!=undefined){
                this.setState({access_token:value})
            }  
        })
    }


    /** 
     * A function that sends a request to retreive the hospital data that's managed by the currently logged in user 
     */
    getHospitalData(){
        body = JSON.stringify({
            access_token: this.state.access_token
        })
        this.state.auth_service.post(body,'/hospital/user_hospitals')
        .then((response)=>{
            if(response.status!=200){
               alert("Can't connect to server");
            }
            else{
                response.json().then((resJSON) =>{
                    this.setState({hospitals:resJSON})
                })
            }
        })
    }
    

    /** A function that renders the actual view */
    render(){
        return(
            <Container style = {styles.form}>
                <Header style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>
                   
                            <Icon  style={{color:'white'}}  onPress={() => this.props.navigation.goBack()}  name='arrow-back' />
              
                    </Left>

                    <Body style = {styles.title}>
                        <Title> Manage </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                  
                            <Icon name='home'   style={{color:'white'}} />
 
                    </Right>
                </Header>

                <View style={{flexDirection:'row',margin:10}}>               
                    <Text>    {  this.state.languages.includes('ar') ? I18n.t('Managed Hospitals') :  'Managed Hospitals' } </Text>
                    <Right>
                        <Button transparent onPress={()=>{this.getHospitalData()}}> 
                            <Icon style={{color:'red'}} name='md-sync' />
                        </Button>
                    </Right>
        

                
                </View>



                <View>

                    <List dataArray={this.state.hospitals} renderRow={(h) =>
                        <ListItem avatar button={true} onPress={ ()=>{this.props.navigation.navigate('HospitalHome',{id: h.id})} } >
                            <Left>
                                <Thumbnail source={require('../../hos.png')} />
                            </Left>
                            <Body>
                                <Text style={styles.listitemname}>{h.name}</Text>
                                <Text style={styles.StatePickerItem} note>{''}</Text>
                            </Body>
                            <Right>
                            <Icon style={styles.StatePickerItem} style ={  {color: 'red'}  }  name={h.verified ?  'md-eye' : 'md-eye-off'}></Icon>
                            </Right>
                        </ListItem>
                    }>
                    </List>



                </View>

            <Fab
                onPress={()=>this.props.navigation.navigate('CreateHospital')}
                containerStyle={{ }}
                style={{ backgroundColor: 'red' }}
                position="bottomRight">
                <Icon name="add" />
            </Fab>



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
 
  'en': require('../../locales/en'),
   'ar': require('../../locales/ar')
 
};
