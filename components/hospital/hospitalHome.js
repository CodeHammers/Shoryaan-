import React from 'react';
import { Container, Icon, Header, Title, Button, Left, Right, Body, Text, Toast, ActionSheet } from 'native-base';
import { TouchableOpacity, View, Image, StatusBar, StyleSheet, ScrollView, AsyncStorage } from 'react-native'
import { H3 } from 'native-base'
import { AuthService } from '../../services/auth'


import I18n, { getLanguages } from 'react-native-i18n';



export class HospitalHome extends React.Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;

        this.state = {
            id: params.id,
            auth_service: new AuthService(),
            languages: ''
        };

    }

    componentWillMount() {
        getLanguages().then(languages => {
            this.setState({ languages: languages });
            //alert(languages)
            //alert(languages)
        });
    }


    /** A function that renders the actual the view on the screen */
    render() {
        const self = this;
        return (

            <Container>
                <StatusBar translucent={false} style={styles.statusBar} barStyle="light-content" />

                <Header style={styles.header} noShadow={true} androidStatusBarColor={'#D32F2F'}>
                    <Left style={{ flex: 1 }}>
                
                        <Icon name='arrow-back'  style={{color:'white'}}  onPress={() => this.props.navigation.goBack()} />
            
                    </Left>

                    <Body style={styles.title}>
                        <Title> Hospital </Title>
                    </Body>
                    <Right style = {{flex: 1}}>
                        <Button transparent>
                        </Button>
                    </Right>

                
                </Header>

                <ScrollView>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('PrivateProfileInfo',{id: this.state.id})  }}>
                            <Image
                                source={require('../../images/home/hos.png')}
                                style={styles.ImageIconStyle}
                            />
                            <Text style={styles.textbutton}>
                               
                                  { this.state.languages.includes('ar') ?  I18n.t('Hospital Profile')  : 'Hospital Profile'} 
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress= {()=>{this.props.navigation.navigate('BloodRequestsDashboard',{id: this.state.id})} }>
                            <Image
                                source={require('../../images/home/hos.png')}
                                style={styles.ImageIconStyle}
                            />
                            <Text style={styles.textbutton}>
                                { this.state.languages.includes('ar') ?  I18n.t('Blood Requests') : 'Blood Requests'  } 

                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container}>
                        <TouchableOpacity style={styles.button}  onPress= {()=>{this.props.navigation.navigate('Managers',{id: this.state.id})} }>
                            <Image
                                source={require('../../images/home/hos.png')}
                                style={styles.ImageIconStyle}
                            />
                            <Text style={styles.textbutton}>
                                 { this.state.languages.includes('ar') ?  I18n.t('Managers') : 'Managers'} 
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}  onPress={()=>{ this.props.navigation.navigate('DonorsStats')}} >
                            <Image
                                source={require('../../images/home/hos.png')}
                                style={styles.ImageIconStyle}
                            />
                            <Text style={styles.textbutton} >
                                  {   this.state.languages.includes('ar') ? I18n.t('Stats') : 'Stats'} 
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

/** Style sheet used for styling components used in the render function */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    header: {
        backgroundColor: '#F44336',
        height: 50
    },

    statusBar: {
        backgroundColor: '#D32F2F'
    },

    textbutton: {
        color: '#F44336',
        fontSize: 16,
        fontWeight: 'bold'
    },

    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    button: {
        flex: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '35%',
        height: 200
    },

    ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 50,
        width: 50,
        resizeMode: 'stretch',
    },
})


I18n.fallbacks = true;

I18n.translations = {
 
  'ar': require('../../locales/ar'),
 
};
