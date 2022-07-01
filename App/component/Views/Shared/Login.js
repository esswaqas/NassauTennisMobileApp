import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {AuthContext} from  '../../../component/Views/Shared/Context'
 
 
export default function Fun(LoginProps)
{
    debugger
    const {Login} = React.useContext(AuthContext);
   //alert("outer = "+ JSON.stringify(LoginProps))
    if(LoginProps!== undefined && LoginProps.LoginProps[0] !== undefined)
    {
        if(LoginProps.LoginProps[0].userIsLogin  ==true)
        {
      //  console.log("iiner = OK===" + JSON.stringify(LoginProps) )
        Login(LoginProps)
    }
    }
    return (
        <View >
        </View>
    );
   }