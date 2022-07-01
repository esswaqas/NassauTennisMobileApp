
import React, { Component,useState,useEffect } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    StyleSheet, ToolbarAndroid,Platform

} from 'react-native';
import { CommonActions } from '@react-navigation/native';

import AlertBox from '../../Views/Shared/MessageBox'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';
  import { useRoute } from '@react-navigation/native';

//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-elements'
 import AsyncStorage from "@react-native-async-storage/async-storage";
<Icon
    reverse
    name='ios-american-football'
    type='ionicon'
    color='#517fa4'
/>
//let iscomplete = true
 
OpenMenu = () => {

   

    navigation.openDrawer();
}




export default function Header({ navigation, title,isBack ,routeName}) {
    
     let [ispersonProfileCompleteds, setSispersonProfileCompleted] = useState(true);
     let [isVisibleMessage, setVisibleMessage] = useState(false);
    const dismissAlert = (values) => {
        setVisibleMessage(false)
    }
    const CancelAlert = (values) => {
        setVisibleMessage(false)
    }
    function GotoScreen(navigation){

     // alert(routeName)
      navigation.dispatch(
        CommonActions.navigate({
          name: routeName,
         
        })
      );
    }

   
  useEffect(() => 
    {
//       const route = useRoute();
// alert(route.name);
        async function fetchData() {
          var   vv= await  AsyncStorage.getItem('IsPersonProfileCompleted');
        //alert("header  = " +vv )
      
        if (vv == "false" ) {
            setSispersonProfileCompleted(false);
            setVisibleMessage(true)
           // alert("Please Complete profile")
        }}
        fetchData();
      },[]);
  
    
    return (

        <View style={styles.container}>
                   {/* Alert_Visibility:true,
          Alert_Title:"Warning",
          Alert_Message:"Please enter state",
          Alert_MessageMode:"success" */}
                <AlertBox
            displayMode={"error"}
            MessageType={''} 
            displayMsg={"Please complete profile first."}
            Title={"Warning"}
            visibility={isVisibleMessage}
            dismissAlert={dismissAlert}
            CancelAlert = {CancelAlert}
          />
            { 

            ispersonProfileCompleteds==true?
        
            isBack==true  && Platform.OS =='ios'?
           

        <Icon name= "chevron-left"   type="materialIcons"  color='white' size={hp('5%')} onPress={() => GotoScreen(navigation)} />
        :
        isBack==true?
<Icon name= "arrow-back"   type="materialIcons"  color='white' size={hp('4%')} onPress={() => GotoScreen(navigation)} />

        :
        <Icon name="menu" color='white' size={hp('4%')} onPress={() => navigation.openDrawer()} />
        :
        <Icon name="menu" color='white' size={hp('4%')}   />
        }
       </View>

     );

 
}
const styles = StyleSheet.create({
    container: {
        // width: '100%',
        // height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:0,
        //backgroundColor: '#88aa31',
    //   backgroundColor: 'pink',
  
       
    },
   
})