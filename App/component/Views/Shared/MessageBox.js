// import React, {useState, Component } from 'react';


// import { Platform, StyleSheet, View, Text, Modal, Button, TouchableOpacity,  Image,Alert } from 'react-native';


 
 

 
  
// export default function AlertBox({visible,title,message,messageType})
// {
//   const [IsVisible, SetIsVisible] = useState(visible);
//       return (
//         <View style={ [styles.MainContainer, IsVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '']}>
//           <Modal
//             visible={IsVisible}
//             transparent={true}
//             animationType={"fade"}
//             >
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//               <View style={styles.Alert_Main_View}>
//                 <Image
//                   style={{
//                     alignSelf: 'flex-end',
//                     top: '-14%', right: '-3%',
//                     position: 'absolute',
//                     height: hp('10%'),
//                    width: wp('10%'),
//                   }}
//                   resizeMode="contain"
//                   onPress={() => { SetIsVisible(false) }} 
//                   source={require('../../../Images/Icon/cross.png')}
//                 />
//                 <View style={{width: '90%',}}>
//                 <Text style={[styles.Alert_Title,{ color: messageType=="error"? "red": '#000'}]}> {title} </Text>
//                   <Text style={styles.Alert_Message}>{message} </Text>
//              <View style={{  alignItems: 'center', justifyContent: 'center', backgroundColor: '#88aa31'  , borderRadius:5, padding:10}}>
//                   <TouchableOpacity
//                     activeOpacity={0.7}
                  
//                     onPress={() => { SetIsVisible(false) }} 
//                   >
//                     <Text style={styles.TextStyle}> OK </Text>
//                   </TouchableOpacity>
//                 </View>
//                 </View>
//               </View>
//             </View>
//           </Modal>
//         </View>
//       );
  
 

// }
 

// const styles = StyleSheet.create({

//   MainContainer: {

//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: (Platform.OS == 'ios') ? 20 : 0

//   },

//   Alert_Main_View: {

//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: "white",
//     height: '35%',
//     width: '90%',
//     borderWidth: 1,
//     borderColor: '#fff',
//     borderRadius: 7,
//     position: 'relative'

//   },
 

//   Alert_Message: {

//     fontSize: 14,
//     color: "#000",
//     textAlign: 'center',
//     padding: 10,
   

//   },
//   Alert_Title: {

//     fontSize: 14,
   
//     textAlign: 'center',
//     padding: 10,
   

//   },

  

//   TextStyle: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 14,
   
//   }

// });

////


import React, {useState} from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import {Modal, Text, View, TouchableOpacity,Image, Platform } from 'react-native';
 import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import styless  from '../../../Stylesheets/NAppSS'
export default function CustomAlert({
  displayMode,
  displayMsg,
  Title,
  visibility,
  MessageType,
  dismissAlert,
  CancelAlert,
}) {
   return (
    <View>
      {
        visibility==true?
    
      <Modal
        visible={true}
        animationType={'fade'}
        transparent={true}
        animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>

          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'white',
              padding: '2%',
              width: wp('90%'),borderWidth: 2,borderColor: '#fff',borderRadius: 7,elevation: 10, position:'relative'
            }}>
              <TouchableOpacity  activeOpacity={1} style={{  alignSelf: 'flex-end',top: Platform.OS==="ios"? (-hp('4.5%')): -30, right: Platform.OS==="ios"?(-wp('4.5%')):-10, position: 'absolute',}}  onPress={() => CancelAlert(false)}>
              <Image
                  style={{
                    height:  Platform.isPad? hp('7%') : hp('10%'),
                    width:  Platform.isPad? hp('7%') : wp('10%'),
                  }}
                  resizeMode="contain"
                  source={require('../../../Images/Icon/cross.png')}
                />
              </TouchableOpacity>

            <View style={{alignItems: 'center', margin: 10}}>
              {
              
              displayMode == 'success' ?  
              <Text style={[styless.font_15,{  marginTop: 5, marginBottom: 5,  color:'#667649' ,fontWeight:'bold', textTransform: 'uppercase' }]}>{Title}</Text>
                :
             <Text style={[styless.font_15,{ marginTop: 5,marginBottom: 5,color:'red' ,fontWeight:'bold', textTransform: 'uppercase'}]}>{Title}</Text>
              }
              {
              MessageType === "House Credit"? 
              <Text style={[styless.font_20,{fontWeight:'bold', color:'#6c6c6c'}]}>{displayMsg}</Text>
              :
             
              <Text style={[styless.font_14,]}>{displayMsg}</Text>
              }
            </View>

            {MessageType === "CartItem"?

<TouchableOpacity
activeOpacity={0.9}
onPress={() => dismissAlert(false)}
style={{
  width: ('95%'),
  borderRadius: 5,
  alignItems: 'center',
  justifyContent: 'center',

  borderColor: '#88aa31',
  borderBottomWidth: 0,
  borderRadius: 5,
  marginBottom: 10,
  backgroundColor: '#88aa31'
}}>
<Text style={[styless.font_12,{color: 'white', margin: hp('1.5%'), }]}>Continue</Text>
</TouchableOpacity>
            :

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => dismissAlert(false)}
              style={{
                width: ('95%'),
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
            
                borderColor: '#88aa31',
                borderBottomWidth: 0,
                borderRadius: 5,
                marginBottom: 10,
                backgroundColor: '#88aa31'
              }}>
              <Text style={[styless.font_12,{color: 'white', margin: hp('1.5%'), }]}>OK</Text>
            </TouchableOpacity>
            }
         
          </View>
        </View>
      </Modal>:null
        }
    </View>
  );
}