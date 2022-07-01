import React, { Component } from 'react';
 
import {
 
  Text,
  View,
 
StyleSheet
} from 'react-native';
import { CallPI } from '../Api/APICall'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import styles from '../../App/Stylesheets/NAppSS'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Icon } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

  export default class FamilyMemberList extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    Participantdata: [],
    Participant: '',
  }

    async Participant() {
    var LoginUserID = await AsyncStorage.getItem('LoginUserID') ;
    LoginUserID  =LoginUserID==null? 0:LoginUserID;
   // alert(LoginUserID)
    
    var DropDownFamilyMembers = [];
    
    var url = `Customers/GetFamilyMembers?familyMemberID=${LoginUserID}`;
    
    await CallPI('GET', url, null, null, "", null).then((response) => response.json()).then(responseJson => {
       // alert(JSON.stringify(responseJson))
        for (let userObject of responseJson) {
          DropDownFamilyMembers.push({ label: userObject.Name, value: userObject.Value });
        }
        
        this.setState({
          Participantdata: DropDownFamilyMembers,
         })

      }
      ).catch(error => {
        //alert(JSON.stringify(error))
      });
  }
  FamilyMembers(itemValue)
  {
     
    var purchaseName  =''
 if(itemValue!=''){
      purchaseName =    this.state.Participantdata.find(data=>data.value== itemValue).label;
    }
    this.props.SelectFamilyMember(itemValue,purchaseName)
    this.setState({
      Participant:itemValue
    })
  }
   
  async componentDidMount() {
    this.Participant()
   var  IsFromMembership=   await AsyncStorage.getItem('IsFromMembership');
   if(IsFromMembership==="true")
   {
   // await AsyncStorage.removeItem("IsFromMembership");
     const purchaseMembershipfromActivity = await AsyncStorage.getItem('PurchaseMembershipwithActivity');
     var personID= purchaseMembershipfromActivity.split('|')[0];
     this.setState({Participant:parseInt(personID)})
   }
   var  updatedPersonProfileID  =  await AsyncStorage.getItem('UpdatedPersonProfileID')
    if(updatedPersonProfileID!= null && updatedPersonProfileID!= '')
    {
     this.setState({Participant:parseInt(updatedPersonProfileID)})
     await AsyncStorage.removeItem("UpdatedPersonProfileID");
    }
  }
  render() {
     return (
      // <View style={styles.inputContainer}>
      //   <View style={styles.innerDropdownContainer}>
      <View style={styles.DropDownInnerContainer}>
    
      <RNPickerSelect
               onValueChange={(value) => this.FamilyMembers(value)} 
            value={this.state.Participant}
            placeholder={{ label: "Participants", value: "", color: '#a5a5a5', }}
       
            items={  this.state.Participantdata}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
             return    <Icon name="sort-desc" type='font-awesome'  size={hp('3.5%')} />
           }}
           style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: Platform.OS=='ios'?0: 7,
              right: 20,
            },
            placeholder: {
              color: '#a5a5a5',
            
            },
          }}
        />
          {/* <Picker
            selectedValue={this.state.Participant}
            placeholder="Participant"
            
            onValueChange={(itemValue, itemIndex) => this.FamilyMembers(itemValue)}
          >
            <Picker.Item label='Participant' value='' key='' color='gray' />
            {
              this.state.Participantdata.map((v) => {
                return <Picker.Item label={v.label} value={v.value} key={v.value}  />
              })
            }
          </Picker> */}
        
        
      </View>
    )
  }

}
 

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
  //   justifyContent:'center',
  //   alignItems:'center',
  //   fontSize: 13,
  //   paddingVertical: 8,
  //   paddingHorizontal: 20,
  //   //borderWidth: 1,
  //   borderColor: 'gray',
  //   backgroundColor: '#e9e9e9',
  //   borderRadius: 8,
  //  // marginTop:9,
  //   color: 'black',
  fontSize: RFValue(13),
  paddingHorizontal: 13,
  paddingVertical: 8,
  backgroundColor: '#e9e9e9',
  //borderWidth: 0.5,
  //borderColor: 'purple',
 borderRadius: 8,
  color: 'black',
  },
  inputAndroid: {
    fontSize: RFValue(13),
    paddingHorizontal: 13,
    paddingVertical: 8,
    backgroundColor: '#e9e9e9',
    //borderWidth: 0.5,
    //borderColor: 'purple',
   borderRadius: 8,
    color: 'black',
    //paddingRight: 30, // to ensure the text is never behind the icon
  },
});
