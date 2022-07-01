import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView
} from 'react-native';
 

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Registrationinfo from '../ClinicRegisteration/ClinicRegistration'
import GridItems from '../ClinicRegisteration/ClinicRegistrationGrid'
 
const Tab = createMaterialTopTabNavigator();
export default function UserInformation() {
  return (

    <Tab.Navigator
      initialRouteName="Registrationinfo"
      tabBarOptions={{
        style: {
          height: 55,
          backgroundColor: '#88aa31',
          color: '#FFFFFF'

        },
        activeTintColor: '#fff',
        inactiveTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="Registrationinfo"
        component={Registrationinfo}
        options={{
          tabBarLabel: 'Registration',
          color: '#88aa31',
          title: 'Registration Info',

        }}
      />
       <Tab.Screen
        name="GridItems"
        component={GridItems}
        ta
        options={{
          tabBarLabel: 'Activity(s) Selected:',
          
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      

    </Tab.Navigator>
  );
}



