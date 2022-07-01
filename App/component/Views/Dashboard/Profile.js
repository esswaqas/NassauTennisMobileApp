import   React,{useState,useEffect} from 'react';
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
  
import MyTabBar from '../Shared/TabBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from '../../../Stylesheets/NAppSS';
 import { CallPI } from '../../../Api/APICall';
import Personalinfo from '../../../../App/component/Views/Dashboard/Profile/PersonalInformation'
import Addressinfo from '../../../../App/component/Views/Dashboard/Profile/AddressInformation'
import ContactInfo from '../../../../App/component/Views/Dashboard/Profile/ContactInformation'
const Tab = createMaterialTopTabNavigator();
 import { ProAuthContext } from '../Shared/ProfileContext'
var test ='waq'
export default function UserInformation() {


  //  const  SetData =async (data)=>{
  //    alert("data"+ data)
  //   await AsyncStorage.setItem('PersonProfileData', data.toString());
  //  }
  // useEffect(() => {
  //   async function fetchData() {
  //   //  await AsyncStorage.setItem('ParticipantSelectedID', value.toString());
  //     var LoginUserID = null;
  //     var personselectedID = await AsyncStorage.getItem('ParticipantSelectedID');

  //   var regIncompletePersonID = await AsyncStorage.getItem('RegIncompleteProfilePerson');
  //   if(regIncompletePersonID!= null && regIncompletePersonID !='')
  //   {
  //     LoginUserID = regIncompletePersonID;
  //   } 
  //     else{
  //       if (personselectedID != null)
  //       {
  //         LoginUserID = personselectedID;
  //       }
  //       else
  //       {
  //         LoginUserID = await AsyncStorage.getItem('LoginUserID');
  //       }
  //     }
  //     var url =  `Customers/MyProfile?customerProfileID=${LoginUserID}`;
      
  //     await CallPI("GET", url, null, null, '', null).then((response) => response.json())
  //               .then(responseJson => {
                  
  //                   console.log("  Result====" + JSON.stringify(responseJson))
  //                   SetData(responseJson)
                   
  //               }).catch(error => {
  //                   console.log(error)
  //               });
  // }
  //   fetchData();
  // }, []);
  return (

    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}
    //<ProAuthContext.Provider value={{Data:"test"}}> */}
     
  //   screenOptions={({ route }) => ({
  //     tabBarLabel: ({ tintColor, focused, item }) => {
  //   return focused
  //     ? 
  //     (<Text style={[styles.font_15,styles.fontFamily,{ fontWeight: 'bold',  color:'white' , flex:1,flexWrap:'wrap'}]} >
  //       {
  //       route.name=="Personalinfo"?
  //       "Personal":
  //       route.name=="ContactInfo"?
  //       "Contact": "System"

  //       }
  //       </Text>)

  //     : (<Text style={[styles.font_15,styles.fontFamily,{ fontWeight: 'normal',  color:'white' , flex:1,flexWrap:'wrap'}]} >
  //      {
  //       route.name=="Personalinfo"?
  //       "Personal":
  //       route.name=="ContactInfo"?
  //       "Contact": "System"

  //       }
        
  //       </Text>
  //     )
  // },
      
  //   })}
  //   tabBarOptions={{
  //     indicatorStyle: { backgroundColor: 'white' ,   },
  //     style: {
  //       backgroundColor: '#415717',
  //      // fontWeight:'bold'
  //     }
  //   }}
  >
    <Tab.Screen name="Personalinfo" component={Personalinfo}  options={{tabBarLabel:'Personal', unmountOnBlur: true}}/>
    <Tab.Screen name="ContactInfo" component={ContactInfo}   options={{tabBarLabel:'Contact', unmountOnBlur: true}}  />
    <Tab.Screen name="Addressinfo" component={Addressinfo}   options={{tabBarLabel:'System', unmountOnBlur: true}}   />

  </Tab.Navigator>
  // </ProAuthContext.Provider>
     
  );
}



