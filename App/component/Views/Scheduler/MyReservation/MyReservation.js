import React,{Component} from 'react';
import { StyleSheet, RefreshControl, Text, View, TextInput, Alert, TouchableOpacity ,ScrollView     } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from '../../../../Stylesheets/NAppSS';
import Calender from '../../../Views/Shared/DatePicker';
import Loader from '../../../Loader'
import DropdownList from '../../Shared/DropdownList';
import DateRangeList from '../../Shared/DateRangeList'
import { CallPI } from '../../../../Api/APICall';
import RadioButton from '../../Shared/RadioButton';

export default class MyReservation extends Component{

  
constructor(props){
    super(props)
}

     state={
        DateFrom: '',
        DateTo: '',
        Participant: "", 
           Participantdata: [],
           isLoading: true,
           ShowFamilyMembersTransaction: false,


    }
    async Participant() {

      const LoginUserID = await AsyncStorage.getItem('LoginUserID');
      var FamilyMembers = [];
      var url = `Customers/GetFamilyMembers?familyMemberID=${LoginUserID}`;
       
      await  CallPI("GET",url,null,null,null,null,).then(response => response.json())
        .then(responseJson => {

           FamilyMembers.push({ label: "All", value: "All" });

          for (let userObject of responseJson) {
            FamilyMembers.push({ label: userObject.Name, value: userObject.Value });
          }

          this.setState({
            Participantdata: FamilyMembers
          })
  
        }
        ).catch(error => {
          console.log(error)
        });
    }
    SetParticipant = value => {
    //  alert(value)
      this.setState({
        Participant: value
        ,IsSearch: false
      })
    }
    ChangescheckboxValues() {
 
      this.setState({
        ShowFamilyMembersTransaction: !this.state.ShowFamilyMembersTransaction
      })
    }
    SelectDateRange =(startDate,endDate)=>{

    
      this.setState({
        DateFrom:startDate,
        DateTo:endDate
           })
    }
GetReservations()
{

    this.props.navigation.navigate("SchedulerReservationDetail", {
        DateFrom: this.state.DateFrom,
        ParticipantID: this.state.Participant,
       // showFamilyMembersTransaction: this.state.ShowFamilyMembersTransaction,
        DateTo: this.state.DateTo,
      })

}
componentDidMount()
{
 this.setState({
   isLoading: false
 })
 this.Participant()
}

 render(){

     return(

    <View style={styles.Pagecontainer}>
 
    <Loader loading={this.state.isLoading} />


      <View style={styles.container}>
        <ScrollView>
      <View style={styles.inputContainer}>
              <View style={styles.DropDownInnerContainer}>
              <DropdownList
          OptionList={this.state.Participantdata}
          PlaceHolderText={"Family Members"}
          selectedValue= {this.state.Participant}
           setValue={this.SetParticipant}
          />
              </View>
            </View>
            <View style={styles.inputContainer}>
        <DateRangeList SetDateRangeValues={this.SelectDateRange}/>
              </View>
      <View style={styles.inputContainer}>
              <View style={styles.DropDownInnerContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' , alignItems:'center', margin:0}}>
                  <View style={{ width: '85%' }}>

                    <TextInput style={styles.inputs}
                  placeholder="Date From"
                  value={this.state.DateFrom}
                   editable={false}
                />
                  </View>
                  <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                  <Calender
                  callback={(date) =>
                    this.setState({ ...this.state, DateFrom: date })
                  }
                />
                  </View>
                </View>
                
                
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.DropDownInnerContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' , alignItems:'center', margin:0}}>
                  <View style={{ width: '85%' }}>
                  <TextInput style={styles.inputs}
                  placeholder="Date To"
                  value={this.state.DateTo}
                  editable={false}
                />
                  </View>
                  <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                  <Calender
                  callback={(date) =>
                    this.setState({ ...this.state, DateTo: date })
                  }
                />
                  </View>
                </View>
                
                
              </View>
            </View>
        
          
        <TouchableOpacity style={[styles.buttonContainer, ]} onPress={() => this.GetReservations()} >
          <Text style={styles.buttunTextColo}>Search</Text>
        </TouchableOpacity>
 
        </ScrollView>

  </View>
  </View>

)}


}
 