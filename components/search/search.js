import React from 'react';
import { Container, Header, Item, Input, Icon, Button, Text, CheckBox, Body, ListItem, Picker } from 'native-base';
import {Modal, TouchableHighlight, TouchableOpacity, View, StatusBar, StyleSheet, TextInput,ScrollView} from 'react-native';

export class Search extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            checked: false,
            states: ["Cairo", "Alexandria", "Giza", "Aswan", "Asyut", "Beheira", "Beni Suef", "Dakahlia", "New Valley", "Port Said", "Sharqia", "Suez"],
            status: ["Private", "Puplic"],
            selectedState: "",
            selectesStatus: ""
        };
    }

    onStateValueChange(value) {
        this.setState({
            selectedState: value
        });
    }

    onStatusValueChange(value) {
        this.setState({
            selectedStatus: value
        });
    }

    render() {
        const content = this.state.checked
        ? 
        <View>
            <Text style = {styles.inputFieldLabels}> State</Text>
            <Picker
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.selectedState}
                onValueChange={this.onStateValueChange.bind(this)}
                style = {styles.StatePicker}
                >
                {this.state.states.map((item, index) => {
                    return (<Item style = {styles.StatePickerItem} label={item} value={item} key={index}/>) 
                })}
            </Picker>
            <Text style = {styles.inputFieldLabels}> Status</Text>
            <Picker
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.selectedStatus}
                onValueChange={this.onStatusValueChange.bind(this)}
                style = {styles.StatePicker}
                >
                {this.state.status.map((item, index) => {
                    return (<Item style = {styles.StatePickerItem} label={item} value={item} key={index}/>) 
                })}
            </Picker>
        </View>
        : null;

        return (
        <View style={{backgroundColor:'#f5f5f5'}}>



            <ListItem>
                <CheckBox 
                checked={this.state.checked}
                onPress={() => this.setState({ checked: !this.state.checked })} />
                <Body>
                    <Text>Use Filter</Text>
                </Body>
            </ListItem>
            
            { content }
            
            <View style={{width: 200, alignItems: 'center', alignSelf: 'center'}}>
            <Button style={styles.searchButton} block rounded >
                <Text>Search</Text>
            </Button>
            </View>

        </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#F44336',
      height: 70,
      paddingTop: 10
    },

    statusBar: {
        backgroundColor: '#D32F2F'
    },

    inputFieldLabels:{
        paddingTop:5,
        paddingLeft:10,
        fontSize: 20
    },

    StatePicker:{
        flexDirection: 'row',
        marginHorizontal: 25,
    },

    StatePickerItem:{
        fontSize: 16,
        color: '#757575'
    },

    searchButton:{
        marginTop:21, 
        marginBottom:21, 
        backgroundColor:'#F44336'
    }
})