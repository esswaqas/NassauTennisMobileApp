import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  
  TouchableOpacity,FlatList,
  Image,
  Alert,
  state,
  ScrollView, 
  Platform
} from 'react-native';

export default class RadioButton extends Component {
    render() {
    return (


      
        <View style={[{
          height:  Platform.isPad? 35: 24,
          width: Platform.isPad? 35: 24,
          borderRadius: Platform.isPad? 18:12,
          borderWidth: 2,
          borderColor: '#344a0a',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:'white'
        }]}>
          {
            this.props.props  ?
              <View style={{
                height: Platform.isPad? 18: 12,
                width:  Platform.isPad? 18: 12,
                borderRadius: 10,
                backgroundColor: '#344a0a',
              }}/>
              : null
          }
        </View>
        
        
    );
  }}