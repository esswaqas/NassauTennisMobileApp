 
import React from "react";
import { StatusBar, View, Text ,Platform} from "react-native";
import { NavigationContainer, NavigationAction ,useRoute,useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

export default function CustomStatusBar({
  visibility
}) 
{
  return (
    Platform.OS === 'ios'   ? 
    
  
    visibility==false? 
     
    null:

  //   //Platform.OS=='ios'?
  //   <View style={{
  //     width: "100%",
  //     height: hp('4%'),
  //     backgroundColor: '#415717'
  // }}>
 
  //     <StatusBar
  //         barStyle="light-content"
  //     /> #415717
 
  // </View>
             <StatusBar   barStyle="light-content" backgroundColor="red" />

 : 
  

    <View> 
{
    visibility===true?
     <StatusBar   barStyle="light-content" backgroundColor="#415717" />
    :
    <StatusBar hidden={!visibility} /> 
}
  
    </View>
  );
}