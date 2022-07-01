
 

import React, { Component } from 'react';
 
import { CallPI } from '../../Api/APICall'
import {
   
  Alert,
   

} from 'react-native';
 
 export   const MembershipAlerts = async (id, activityCategoryID, activityID,purchaserName, cartItems  ) => {
   

 
 
     var url =   'CustomerClinicRegistration/GetCustomerMembershipStatus?id='+id+'&activityCategoryID='+activityCategoryID+'&activityID='+activityID;
     return   await CallPI('GET', url, null, null,  "",cartItems) 
     
      // Alert.alert(
      //     "Attention!",
      //     "There is a membership available that will give a discount for this item.Would you like to purchase or renew a membership at this time?",
      //     [
      //       {
      //         text: "Cancel",
      //         onPress: () => console.log("Cancel Pressed"),
      //         style: "cancel"
      //       },
      //       { text: "OK", onPress: () => console.log("OK Pressed") }
      //     ],
      //     { cancelable: false }
      //   );

  
 


    
    .catch(error => {
      return false;
      });
 
  
 
     
 
  }

  
 

 
