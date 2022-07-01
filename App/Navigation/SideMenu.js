import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, useState, Image ,Platform, TouchableOpacity} from 'react-native';

import { Avatar, Title, Caption, Paragraph, Drawer, Text,  Switch } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
 
import UserInformation from '../Navigation/UserName';
import { Icon } from 'react-native-elements';

const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;
import Nstyle from '../Stylesheets/NAppSS'
import Logout from '../component/Views/Shared/LogOut'
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
export default function SideMenu(props) {
  const [isLogOut, setLogOut] = React.useState(false);

  
  const updatedSwitchData = val => {
    setLogOut(val);
     
   };
  
  // alert(name)
  //const {value} = UserInformation();;
  //alert(JSON.stringify((value)))
  return (
    <View style={{flex: 1,backgroundColor:'#f3f2f0'}}>
      <Logout  props={isLogOut}/>  
    <DrawerContentScrollView {...props} contentContainerStyle={{ 
    
    paddingBottom:0, paddingTop:0
    }}>
               <View style={[{      marginBottom:0,marginTop:0}]}>
                 
               <Image style={{ height: Platform.isPad? hp('30%') : hp('20%'), width: Platform.isPad?  wp('60%'): wp('60%'),
               alignSelf:'center'
               
              }} 
               resizeMode="cover" source={require('../../App/Images/left-side-menu-icons/top-part.jpg')} />


             {/* <Image style={{
               marginTop: 0, paddingTop: 0,
               
  width: 900,
  height: 900,
  resizeMode: 'contain'


             }}
               resizeMode="center" source={require('../../App/Images/left-side-menu-icons/top-part.jpg')} />

 */}

           </View>
           <View>
            <UserInformation />
            </View>
           <TouchableOpacity style={styles.DrawerItem} onPress={() => { props.navigation.reset({ routes: [{ name: 'DashboardList' }] }); }}>
             <View style={styles.imageView}>
              <Image style={styles.imageIcon}  resizeMode="contain" source={require('../../App/Images/left-side-menu-icons/dashboard.png')} />
              </View>

           <Text style={styles.LabelStyle}>Dashboard</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.DrawerItem}   onPress={() => { props.navigation.reset({ routes: [{ name: 'CourtScheduler' }] }) }}>
           <View style={styles.imageView}>

              <Image style={styles.imageIcon}  resizeMode="contain" source={require('../../App/Images/left-side-menu-icons/Court-Scheduler.png')} />
              </View>
           <Text style={styles.LabelStyle}>New Booking</Text>
           </TouchableOpacity>

           <TouchableOpacity style={styles.DrawerItem}           onPress={() => {   props.navigation.reset({routes: [{ name: 'Registration' }]}); }}>
           <View style={styles.imageView}>
         
              <Image style={styles.imageIcon}  resizeMode="contain" source={require('../../App/Images/left-side-menu-icons/Registration.png')} />
              </View>
           <Text style={styles.LabelStyle}>Registration </Text>
           </TouchableOpacity>
          

           <TouchableOpacity style={styles.DrawerItem}           onPress={() => {   props.navigation.reset({routes: [{ name: 'ClassManager' }]});}}>
           <View style={styles.imageView}>
            
              <Image style={styles.imageIcon}  resizeMode="contain" source={require('../../App/Images/left-side-menu-icons/Class-Manager.png')} />
              </View>
           <Text style={styles.LabelStyle}>Class Manager </Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.DrawerItem}           onPress={() => {   props.navigation.reset({routes: [{ name: 'Friends' }]}); }}>
           <View style={styles.imageView}>
             
              <Image style={styles.imageIcon}  resizeMode="contain" source={require('../../App/Images/left-side-menu-icons/Friends.png')} />
              </View>
           <Text style={styles.LabelStyle}>Friends</Text>
           </TouchableOpacity>
      </DrawerContentScrollView>
       <Drawer.Section style={styles.bottomDrawerSection}>

       <TouchableOpacity style={styles.DrawerLastItem}    onPress={() => {  updatedSwitchData(true) }}>
       <View style={styles.imageView}>
      
       <Image style={styles.imageIcon} resizeMode="contain" source={require('../../App/Images/left-side-menu-icons/logout.png')} />
       </View>
           <Text style={styles.LabelStyle}>LogOut </Text>
       </TouchableOpacity>

      </Drawer.Section>
      </View>
 
  )
}

//export default SideMenu;

const styles = StyleSheet.create({
  drawerContent: {
    // flex: 1,padding:0
  },
  userInfoSection: {
    // paddingLeft: 3*vh,
  },
  title: {
    fontSize: 2 * vh,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 2 * vh,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 1 * vh
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 1.5 * vh,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 1 * vw,
  },
  drawerSection: {



    flex: 1
    //  marginLeft:0,
    // marginBottom:4,
    //   marginRight:-5,
    // marginTop:-5,
    //backgroundColor:'red'


  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  DrawerItem: {
    flexDirection:'row',backgroundColor:'white'
    ,//padding: 1* vh,// 10,
    marginBottom:1* vh,// 10,
    justifyContent:'flex-start', alignItems:'center', 
    marginTop: 0, marginLeft: 0, marginRight: 0, borderRadius: 0, 
    paddingLeft: 3* vh,//  30, 
    paddingRight: 2* vh,//  30, 
    paddingTop: 1* vh,//  30, 
    paddingBottom: 1* vh,//  30, 
    
    borderTopWidth:0.1,
    borderBottomWidth:0.1,
    
    shadowColor: "#000",
    shadowOffset:{
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
 
  
  },
  DrawerLastItem: {
    flexDirection:'row',padding:15, 
    justifyContent:'flex-start', alignItems:'center', 
    marginTop: 0, marginLeft: 0, marginRight: 0, borderRadius: 0, paddingLeft: 30, 
    
    borderTopWidth:0.1,
    borderBottomWidth:0.1,
    
   
 
  
  },
  LabelStyle: {
    paddingLeft:15,
    fontSize:RFValue(13),
    ...Platform.select({
      ios: {
         
      },
      android: {
        fontFamily:  'OpenSans-Regular',
      }
      // default: {
      //   // other platforms, web for example
      //   fontFamily:  'OpenSans-Regular',
      // }
    }),
  },
  imageIcon:{
  
    flex: 1,
    //width: '100%',
   // height: '100%',
    resizeMode: 'contain' ,
  alignSelf:'center'
  },

    imageView:{
      width:wp('5%'), 
      height:hp('5%'),
      alignItems:'center',
      alignSelf:'center',
      marginRight:hp('1%')

     }
});