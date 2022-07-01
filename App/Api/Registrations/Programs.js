import React, { Component } from 'react';
import { CallPI } from '../../Api/APICall'
import {
  StyleSheet,
  Text,
  View,
 

} from 'react-native';
import { Icon } from 'react-native-elements'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import styles from '../../../App/Stylesheets/NAppSS'
import { AsyncStorage } from "@react-native-async-storage/async-storage";

import RNPickerSelect from 'react-native-picker-select'; 
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

  export default class Programs extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    Programdata: [],
    programID: '',
  }
  static getDerivedStateFromProps(props, prevState) {
    if(props.resetProgram !== prevState.programID){
      //Change in props
     // alert(props.resetProgram)
      return{
        programID: props.resetProgram
      };
  }
   
     
  }


  async Progaram() {
   // const LoginUserID = await AsyncStorage.getItem('LoginUserID');
    var DropDownFamilyMembers = [];
     var url =  'Common/GetProgramsForRegistration?programlist="yes"';
    // fetch(url, {
    //   method: "GET",
    // })
    //alert('pi')
    await  CallPI("GET",url,null,null,'',null)
      .then(response => response.json())
      .then(responseJson => {
          
      //  alert(JSON.stringify(responseJson))
        this.setState({
            Programdata: responseJson,
         })

      }
      ).catch(error => {
      });
  }
  SetProgaram(itemValue){
    if(itemValue !=''){

    
    var programName =   this.state.Programdata.find(data=>data.value== itemValue)!= null? this.state.Programdata.find(data=>data.value== itemValue).label:'';
    this.props.SelectedProgram(itemValue,programName)
  }
  else
  {
    this.props.SelectedProgram('','')  }
    this.setState({
      programID:itemValue
    })
  }
   
  
  async componentDidMount() {

   // alert('p')
    this.Progaram()

    var IsFromMembership=   await AsyncStorage.getItem('IsFromMembership');
    if(IsFromMembership==="true")
    {
     //await AsyncStorage.removeItem("IsFromMembership");
     const purchaseMembershipfromActivity = await AsyncStorage.getItem('PurchaseMembershipwithActivity');
     var program= purchaseMembershipfromActivity.split('|')[2];
    //alert("prrrr  "+ program)
     this.setState({programID:(program)})
    } 
    }
  render() {
    return (
      <View>
      <View style={styles.DropDownInnerContainer}>
      <RNPickerSelect
         
        onValueChange={(value) => this.SetProgaram(value)} 
        value={this.state.programID}
        placeholder={{ label: "Program", value: "", color: '#a5a5a5', }}
            items={  this.state.Programdata}
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



