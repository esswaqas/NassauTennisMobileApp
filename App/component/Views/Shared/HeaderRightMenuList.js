 import React, { useState } from 'react';

import { View, Text,Alert } from 'react-native';
import AlertBox from '../Shared/MessageBox'
import Logout from './LogOut'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';
  import { RFValue } from 'react-native-responsive-fontsize';
  //import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
  import appstyle  from '../../../Stylesheets/NAppSS'
  import { useNavigation ,StackActions , useRoute} from '@react-navigation/native';


export default function App({HouseCredit}) {
  const navigation = useNavigation();
  const route = useRoute();
  const [visible, setVisible] = useState(false);
  const [HouseCreditAmount, setHouseCreditAmount] = useState('');
   
  const [Alert_Visibility, setAlert_Visibility] = useState(false);
  const [Alert_Title, setAlert_Title] = useState('');
  const [Alert_Message, setAlert_Message] = useState('');
  const [Alert_MessageMode, setAlert_MessageMode] = useState('');
  // const [isLogout, setisLogout] = useState(false);
  const [isLogOut, setLogOut] = React.useState(false);
  
 
  _dismissAlert = (values) => {
     setAlert_Visibility(values)
}
_CancelAlert = (values) => {
   setAlert_Visibility(values)
}
  const hideMenu = () => setVisible(false);

  const showMenu = async () => {
    //alert('hh')
    var amount =await   AsyncStorage.getItem('CustomerHouseCredit');
    //alert(amount)
 
 

    setHouseCreditAmount(amount)
    setVisible(true);
  }

  _GoToCurreMemberships = () => {

    navigation.navigate("CurrentMemberships")
    
    setVisible(false) 
   }

    _HouseCreditAmount = () => {

      if(Platform.OS=="ios")
      {
    
     
        
     Alert.alert(
          "Current House Credit: ",
          HouseCreditAmount,
          [
             
            { text: "OK", onPress: () => setVisible(false) }
          ]
        )
        
      }else
      {
        
      
             
            setAlert_Visibility(true)
            setAlert_Title("Current House Credit")
            setAlert_Message(HouseCreditAmount)
            setAlert_MessageMode("success")
                      //  setisLoading: false,
         
        
                  //    alert(Alert_Visibility)
       
    
        setVisible(false) 
      }
      }

  

      ManageCreditCard = () => {
         
        navigation.navigate('CreditCardList')
        setVisible(false) 
      }
    
      _GoToFamilyMember = () => {
        navigation.navigate("FamilyMemberList")
        setVisible(false) 
      }
      _GoToTransactionHistory = () => {

        //alert(1)
        navigation.navigate("TransactionHistoryFilter")
      //  navigation.reset({routes: [{ name: 'TransactionHistoryFilter' }]}); 
      // navigation.dispatch(
      //   StackActions.push('TransactionHistoryFilter', { user: 'Wojtek' })
      // )
        setVisible(false) 
      }
      
     
      _GoToProfile = () => {
    
        navigation.navigate("Profiled")
        setVisible(false) 
      }
        
     _Logout =async () =>
     {
   
       AsyncStorage.getAllKeys()
       .then(keys => AsyncStorage.multiRemove(keys))
    
      // this.setState({isLogout:true})
      setVisible(false) 
      setLogOut(true)
     }

  return (
    <View>

<Logout  props={isLogOut}/>  

       <AlertBox
        displayMode={Alert_MessageMode}
        MessageType={'House Credit'} 
        displayMsg={Alert_Message}
        Title={Alert_Title}
        visibility={Alert_Visibility}

        dismissAlert={_dismissAlert}
        CancelAlert = {_dismissAlert}
      />

      <Menu
         visible={visible}
       // anchor={<Text onPress={showMenu}>Show menu</Text>}
        // anchor={<Icon  name="more-vertical" type='feather'  color='white'  size={hp('4%')} onPress={showMenu}
        // <Icon  name="more-vertical" type='feather'  color='white'  size={hp('4%')} onPress={showMenu} style={{ color:'white'}}/>  
         anchor={<Icon  name="dots-vertical"    color='white'  size={hp('4%')} onPress={showMenu} style={{ marginEnd: -15}}/> }

        
        // anchor={<Text onPress={showMenu}>OPEN</Text>}

        onRequestClose={hideMenu}
      
        
      >
           <MenuItem onPress={_GoToProfile}   textStyle={[appstyle.font_12,appstyle.fontFamily]} style={{height:hp('6%')}} >   
          User Profiles
          </MenuItem>
          <MenuDivider color='black' />
 
<MenuItem onPress={_GoToFamilyMember} textStyle={[appstyle.font_12,appstyle.fontFamily]} style={{height:hp('6%')}}>Family Members</MenuItem>
<MenuDivider color='black' />

<MenuItem onPress={_GoToCurreMemberships}  textStyle={[appstyle.font_12,appstyle.fontFamily]} style={{height:hp('6%')}}>Current Memberships</MenuItem>
<MenuDivider color='black' />
<MenuItem onPress={_GoToTransactionHistory} textStyle={[appstyle.font_12,appstyle.fontFamily]} style={{height:hp('6%')}}>Transaction History</MenuItem>
<MenuDivider color='black'/>
<MenuItem  onPress={_HouseCreditAmount} textStyle={[appstyle.font_12,appstyle.fontFamily]} style={{height:hp('6%')}}><Text>House Credit: {HouseCreditAmount} </Text> </MenuItem>
<MenuDivider color='black' />
<MenuItem onPress={ManageCreditCard} textStyle={[appstyle.font_12,appstyle.fontFamily]} style={{height:hp('6%')}}>Manage Credit Card</MenuItem>
<MenuDivider  color='black'/>
<MenuItem onPress={_Logout} textStyle={[appstyle.font_12,appstyle.fontFamily]} style={{height:hp('6%')}}>Log Out</MenuItem>
      </Menu>
    </View>
  );
}