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
  import Personalinformation from '../../../../../App/component/Views/Customers/FamilyMembers/PersonalInformation'
  import ContactInformation from '../../../../../App/component/Views/Customers/FamilyMembers/ContactInformation'
  import MyTabBar from '../../Shared/TabBar';
  import styles from '../../../../Stylesheets/NAppSS';

const Tab = createMaterialTopTabNavigator();
export default function UserDataInformation() {
  return (
    //  <View></View>
 
<Tab.Navigator
     
     tabBar={props => <MyTabBar {...props} />}
>
 
 
<Tab.Screen name="Personalinformation" component={Personalinformation}  options={{tabBarLabel:'Personal'}}  />
    <Tab.Screen name="ContactInformation" component={ContactInformation}   options={{tabBarLabel:'Contact'}} />
 </Tab.Navigator>
 
 );
}



