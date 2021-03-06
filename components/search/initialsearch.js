import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Title, Button, Icon, Tabs, Tab, Item, Input, Text } from 'native-base';
import { StatusBar, StyleSheet, View, TextInput, ScrollView } from 'react-native'
import { Content, List, ListItem, Thumbnail } from 'native-base';

import { Search } from './search'
import { AuthService } from '../../services/auth'
import MapView from 'react-native-maps';
import Marker  from 'react-native-maps';

import I18n, { getLanguages } from 'react-native-i18n';

/**
 * A view containing the two search tabs 
 * tab 1: search by hospital's name, state and status
 * tab 2: search hospitals in Map relative to user's location (not implemented yet)
*/
export class InitialSearch extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        markers: [1,2,3,4,5,6],
        region: {
                  latitude: 26.78825,
                  longitude: 30.4324,
                  latitudeDelta: 10.0922,
                  longitudeDelta: 10.0421,
                },
        mr: {
          latitude: 26.78825,
          longitude: 30.4324,
        },
        arrayholder: [],
        auth_service: new AuthService(this),
        languages:""
      };
      this.Search()
      
    }

    componentWillMount() {
        getLanguages().then(languages => {
            this.setState({ languages: languages });
            //alert(languages)
        });
    }

    Search() {
        url = '/hospital/index'

        this.state.auth_service.get(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loading: false })

                this.setState({ arrayholder: responseJson })
            });
    }
    /** A function that renders that actual view on the screen */
    render() {
        return (
            <Container>

                <StatusBar translucent={false} style={styles.statusBar} barStyle="light-content" />

                <Header style={styles.header} hasTabs noShadow={true} androidStatusBarColor={'#D32F2F'}>
                    <Left style={{ flex: 1 }}>
                   
                        <Icon name='arrow-back' style={{color:'white'}}   onPress={() => this.props.navigation.goBack()}/>
                  
                    </Left>

                    <Body style={styles.title}>
                        <Title> Search </Title>
                    </Body>

                    <Right style={{ flex: 1 }}>
                    </Right>
                </Header>

                <Tabs initialPage={0}>
                    <Tab tabStyle={styles.inactiveTabStyle} textStyle={styles.inactiveTabTextStyle}
                        activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTabTextStyle} heading={ this.state.languages.includes('ar') ?  I18n.t("Search") : 'Search'}>
                        <Search self={this} />

                    </Tab>

                    <Tab tabStyle={styles.inactiveTabStyle} textStyle={styles.inactiveTabTextStyle}
                        activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTabTextStyle} heading={ this.state.languages.includes('ar') ? I18n.t("Map") : 'Map'}>

                        <MapView style={{flex:1}}
                            region={this.state.region}
                            onRegionChange={this.onRegionChange}
                        >

                            {this.state.arrayholder.map(marker => (
                                <MapView.Marker
                                coordinate={  {latitude: marker.locationLatitude,longitude: marker.locationLongitude} }
                                title={marker.name}
                                description={marker.status}
                                />
                            ))}

                        </MapView>

                    </Tab>
                </Tabs>

            </Container>
        );
    }
}

/** Style sheet used for styling components used in the render function */
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F44336',
        height: 50
    },

    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    statusBar: {
        backgroundColor: '#D32F2F'
    },

    inactiveTabStyle: {
        backgroundColor: '#F44336'
    },

    inactiveTabTextStyle: {
        color: '#FFFF'
    },

    activeTabStyle: {
        backgroundColor: '#F44336'
    },

    activeTabTextStyle: {
        color: '#FFFF'
    },
})

I18n.fallbacks = true;

I18n.translations = {

    'en': require('../../locales/en'),
    'ar-EG': require('../../locales/ar')
};