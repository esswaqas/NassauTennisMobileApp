import React, { Component } from 'react';
import { Platform } from 'react-native';

 
 
import AsyncStorage from "@react-native-async-storage/async-storage";

 export   const CallPI = async (CallType, rURL, bodyObject,userID, userName, CartItems) => {
   
    const LoginUserID = await AsyncStorage.getItem('LoginUserID');
    const userToken = await AsyncStorage.getItem('userToken');
    const fcmToken =  await AsyncStorage.getItem("fcmToken")
    //alert("fcmToken API  = = = "+fcmToken )
    //alert("fcmToken API  = = = "+fcmToken +"  userToken==    "+userToken)

//alert("userToken  = = = "+userToken)
 
  
if(CallType==="POST")
{
 
    try{

 var url = 'http://testing.njtennis.net/api/' + rURL; 
 //var url = 'https://nassautennis.net/api/'+ rURL; 
  //console.log("ccccccccccccc rrrrrrrrrrrrrrrrrrrrrrrr  ===="+CartItems)
//   console.log("dsadsds  Carto0ite,re  ===="+JSON.stringify(
//       bodyObject
//       ))
      
      
      console.log ("URL =="+url)

 return  await fetch(url, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'LoginUserID':  ''+LoginUserID +'',
          'LoginUserName': ''+userName+'',
          'CompanyID':  '1',
          'fcmToken':  ''+fcmToken+'',
          'Platform':  ''+(Platform.OS=='ios'? 'Ios':'Android')+'',
          
          'CartItems': CartItems==null?'':CartItems,
          "Authorization":"Bearer "+userToken
      },
      body: JSON.stringify(
          bodyObject
      )
  })
    } catch (errors) {
        
       // alert('There has been a problem with your f¸etch operation: ' + error.message);

      }
  
     
 

}
else
{

  
  var url =  'http://testing.njtennis.net/api/'+rURL;
 //var url = 'https://nassautennis.net/api/' + rURL; 
    
  console.log(url)
    return await   fetch(url, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'LoginUserID':  ''+LoginUserID +'',
            'CompanyID':  ''+1+'',
            'LoginUserName': ''+userName+'',
            'CartItems': CartItems==null?'':CartItems,
           "Authorization":"Bearer "+userToken
        },
    })
}
     
//return res;
  }

  
 

 