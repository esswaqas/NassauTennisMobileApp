// import * as React from 'react';
// import { Button, View } from 'react-native';
import StartApp from './App/Navigation/StackNavigation'
import React,{useEffect} from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {requestUserPermission} from './Utles/notificationService'
import { LogBox } from 'react-native';


 
 
 

export default function App() {

  useEffect(()=>{
 
    LogBox.ignoreLogs(['Warning: ...']); //Hide warnings
  
    LogBox.ignoreAllLogs();//Hide all warning notifications on front-end
    requestUserPermission()

  },[])
  return (
     <StartApp/>

  //   <NavigationContainer>
  //   <Drawer.Navigator initialRouteName="Hometest">
  //     <Drawer.Screen name="Hometest" component={stackNav} />
  //     {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
  //   </Drawer.Navigator>
  // </NavigationContainer>
   );
}