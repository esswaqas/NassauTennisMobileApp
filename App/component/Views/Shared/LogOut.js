import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,ToolbarAndroid

} from 'react-native';
import {AuthContext} from  '../../../component/Views/Shared/Context'

export default function Logout({props})
{
    const {LogOut} = React.useContext(AuthContext);
      
    if(props==true)
    {
        
        LogOut()
    }
    return (
 
        <View >
           
        </View>

 
       
    );
   }