import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight,TouchableOpacity ,Image, Alert, ListItem, Modal, ListRenderItem, ScrollView, Left, Right, FlatList, } from 'react-native';
import { CheckBox } from 'react-native-elements'
 import RadioButton from '../../../Shared/RadioButton';
 import Icon from 'react-native-vector-icons/FontAwesome';

 import AsyncStorage from '@react-native-async-storage/async-storage'

import { validateAll } from 'indicative/validator'
import styles from '../../../../../Stylesheets/NAppSS'
import Loader from '../../../../Loader'
import RNPickerSelect from 'react-native-picker-select';
import Familys from '../../../../../Api/FamilyMemberList'
import { CallPI } from '../../../../../Api/APICall'
import Calender from '../../../Shared/DatePicker';
import { CommonActions } from '@react-navigation/native';
import { Card } from 'react-native-elements'
import  DropdownList from '../../../Shared/DropdownList'
import AlertBox from  '../../../Shared/MessageBox'
import {widthPercentageToDP as wp,heightPercentageToDP as hp,listenOrientationChange as lor,removeOrientationListener as rol} from 'react-native-responsive-screen';
export default class ReportAbsence extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    ParticipantName: '',
    Date: '',
    Participant: '',
    AbsnceErrorMessage: '',
    HourNotice: '',
    ClasstoMissed: '',
    RegisterClassesList: [],
    AbsenceReasonList:[],
    AbsenceReason:'', 

      isLoading: false,

      Alert_Visibility: false,
      Alert_Title: '',
      Alert_Message: '',
      Alert_MessageMode: '',
  }
  dismissAlert = (values) => {
    this.setState({ Alert_Visibility: values })
}
CancelAlert = (values) => {
    this.setState({ Alert_Visibility: values })
}

  SelectFamilyMember = async (memberID, purchaseName) => {
    if (memberID != '') {
      var weekDaysURL = 'ReportAbsence/GetRegisteredActivitiesForAbsence?userID=' + memberID + '&date=&isAbsence=true';
      await CallPI('POST', weekDaysURL, null, null, "", null).then((response) => response.json()).then(responseJson => {
        console.log(JSON.stringify(responseJson))
        if (responseJson.absnceErrorMessage != null && responseJson.absnceErrorMessage != '') {
          this.setState({ AbsnceErrorMessage: responseJson.absnceErrorMessage })
        }
        else{

         registerClassess = [];
          for (let item of responseJson.model.lstRegisteredActivities) {
            registerClassess.push({ label: '(' + item.Activity + ')(' + item.Program + ')' + ' (' + item.Class + ')' + ' (' + item.ClassDayTime + ')', value: item.ActivityID + ',' + item.ProgramID + ',' + item.SelectedClassID + ',' + item.ClassDayTimeID, isSelected:false });
          }
          console.log(JSON.stringify(registerClassess))
          this.setState({ RegisterClassesList: registerClassess })
          this.setState({ AbsnceErrorMessage: '' })

        }
      })
    }
    this.setState({ Participant: memberID, ParticipantName: purchaseName });
  }
  SelectDate = async (date) => {
    this.setState({ Date: date })
    var weekDaysURL = 'ReportAbsence/GetRegisteredActivitiesForAbsence?userID=' + this.state.Participant + '&date=' + date + '&isAbsence=true';
    console.log("URL   " + weekDaysURL)
    await CallPI('POST', weekDaysURL, null, null, "", null).then((response) => response.json()).then(responseJson => {
      console.log("testsetsefd      dsdsdv ========  " + JSON.stringify(responseJson))
      if (responseJson.absnceErrorMessage != null && responseJson.absnceErrorMessage != '') {
        this.setState({ AbsnceErrorMessage: responseJson.absnceErrorMessage })
        this.setState({ RegisterClassesList: [] })
      }
      else {


       var registerClassess = [];
        for (let item of responseJson.model.lstRegisteredActivities) {
          registerClassess.push({ label: '(' + item.Activity + ')(' + item.Program + ')' + ' (' + item.Class + ')' + ' (' + item.ClassDayTime + ')', value: item.ActivityID + ',' + item.ProgramID + ',' + item.SelectedClassID + ',' + item.ClassDayTimeID });
        }
       
        console.log(JSON.stringify(registerClassess))
        this.setState({ RegisterClassesList: registerClassess })
        this.setState({ AbsnceErrorMessage: '' })
      }

    })
  }



  _SetSetclasstoMissed(id) {
 
    this.setState({
      ClasstoMissed: id
    })
  }
  _setAbsenceRession = value =>{
 
    this.setState({
      AbsenceReason: value
    })
  }
  SubmitAbsenceReason = async () => {
    if(this.state.Participant==''){
      //Alert.alert("warning","Please select participant.")
      this.setState({
        Alert_Visibility: true,
        Alert_Title: 'Warning',
        Alert_Message: 'Please select participant.',
        Alert_MessageMode: 'warning',
      })
      return false
    }
    if(this.state.Date==''){
      //Alert.alert("warning","Please select Date to be Missed.")
      this.setState({
        Alert_Visibility: true,
        Alert_Title: 'Warning',
        Alert_Message: 'Please select Date to be Missed.',
        Alert_MessageMode: 'warning',
      })
      return false
    }
    if(this.state.ClasstoMissed==''){
      //Alert.alert("warning","Please select an activity.")
      this.setState({
        Alert_Visibility: true,
        Alert_Title: 'Warning',
        Alert_Message: 'Please select an activity.',
        Alert_MessageMode: 'warning',
      })
      return false
    }
    if(this.state.AbsenceReason==''){
      //Alert.alert("warning","Please select absence reason.")
      this.setState({
        Alert_Visibility: true,
        Alert_Title: 'Warning',
        Alert_Message: 'Please select absence reason.',
        Alert_MessageMode: 'warning',
      })
      return false
    }
    this.setState({isLoading:true})
    var absenceURL = 'ReportAbsence/SubmitReportAbsence?customerID=' + this.state.Participant + '&ClasstoMissedDate=' + this.state.Date +'&ClassMissedID='+this.state.ClasstoMissed +'&absenceReason='+ this.state.AbsenceReason+'&isSubmitAbsence=true';
    console.log("absenceURL ===     " + absenceURL)
   
    await CallPI('POST', absenceURL, null, null, "", null).then((response) => response.json()).then(responseJson => {

      console.log(" e after login   == "+JSON.stringify(responseJson))
if(responseJson.result=="Absence time must be less than reported time.")
{
  //Alert.alert("Error","Absence time must be less than reported time.")
  this.setState({
    Alert_Visibility: true,
    Alert_Title: 'Alert',
    Alert_Message: 'Absence time must be less than reported time.',
    Alert_MessageMode: 'error',
  })
  this.setState({isLoading:true})
}
else{
  if(responseJson.result=="Success")
  {
    this.setState({
      Participant :'',
      ClasstoMissed :'',
      Date:'',
      ParticipantName:'',
      AbsenceReason:'',
      RegisterClassesList:'',
      isLoading:false
    })

    this.props.navigation.dispatch(
      CommonActions.reset({
          index: 15,
          routes: [
              {
                  name: 'ReportAbsence',
              },
              { name: 'AbsenceMessage' },
          ],
      })
  )
    // this.props.navigation.navigate("AbsenceMessage", {
    //   HourNote: responseJson.hourDifferenceNote
    // })
  }
}


    })
  }


  async componentDidMount() {

    var url = 'ReportAbsence/GetAbsenceTimeDuration';
    await CallPI('GET', url, null, null, "", null).then((response) => response.json()).then(responseJson => {
      console.log(" calllinf f   "+JSON.stringify(responseJson))
      if (responseJson.noticeHoursMessage != null && responseJson.noticeHoursMessage != '') {
        this.setState({ HourNotice: responseJson.noticeHoursMessage })
      }
        this.setState({AbsenceReasonList:responseJson.registrationAbsencereasonList})
    })

  }
  rederItems = ({ item, index }) => {
    return (
      
        index % 2 === 0 ?
    <TouchableOpacity  style={[styles.ListItemRow_secondary,{marginBottom:10,marginLeft:2}]} onPress={() => { this.UpDatedExt(index) }}>
   
   <RadioButton props={item.isSelected} />
 
   <Text style={styles.ListRowText}> {item.label}</Text>
    </TouchableOpacity>
    : 
    <TouchableOpacity  style={[styles.ListItemRow,{marginBottom:10,marginLeft:2}]} onPress={() => { this.UpDatedExt(index) }}>
    {
   <RadioButton props={item.isSelected} />
    }
  <Text style={styles.ListRowText}> {item.label}</Text>
    </TouchableOpacity>
  

)
  }
  UpDatedExt =   (index) => {
    const array = [...this.state.RegisterClassesList];
    var value = array[index]['value'];
    for (var i =0 ;i<array.length; i++ )
    {
     if(i==index){
       array[i]['isSelected'] = !array[i]['isSelected']
     }
     else{
       array[i]['isSelected'] =false;
     }
    }
    this._SetSetclasstoMissed(value)
  }
  render() {
    return (
      <View style={styles.Pagecontainer}>
      <View style={styles.containerWithCard}>
      <AlertBox
displayMode={this.state.Alert_MessageMode}
MessageType={''} 
displayMsg={this.state.Alert_Message}
Title={this.state.Alert_Title}
visibility={this.state.Alert_Visibility}
dismissAlert={this.dismissAlert}
CancelAlert = {this.CancelAlert}
/>
        <Loader loading={this.state.isLoading} />
        {/* hand-o-right */}
         <ScrollView>
        <Card containerStyle={styles.PageCardHeader}>
       

            <View style={[styles.inputContainer]}>
              <Text style={[styles.font_12,{ backgroundColor: 'white' }]}>
                <Text style={[styles.font_12,{ fontWeight: "bold" }]}>Complete request below to report a future class absence.</Text> {"\n"}
                <Text style={[styles.font_12,{ fontWeight: "bold", color: 'red' }]}>
                  <Icon name="hand-o-right" size={15} style={{ color: 'red' }} /> {this.state.HourNotice} Hour(s)</Text> notice required for Make-up eligibility {"\n"}
               </Text>

            </View>
            <View style={[styles.inputContainer]}>
            <Familys SelectFamilyMember={this.SelectFamilyMember} />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ width: '85%' }}>

                  <TextInput style={styles.inputs}
                  placeholder="Date to be Missed"
                  value={this.state.Date}
                  editable={false}
                />
                  </View>
                  <View style={{ width: '15%', alignItems: 'flex-end', justifyContent: 'center' , paddingRight:hp('1%')}}>
                  <Calender
                  callback={(date) =>
                    this.SelectDate(date)
                  }
                />
                  </View>
                </View>
              
                
              </View>
            </View>

            {
              this.state.RegisterClassesList != '' ?
                <View style={styles.inputContainer}>
                  <View style={styles.inputInnerContainer}>
                    <Text>{this.state.AbsnceErrorMessage}</Text>
                  </View>
                </View> : null
            }
             
            {
              
              
              this.state.RegisterClassesList.length > 0 ?
               
               <FlatList
               data={this.state.RegisterClassesList} 
               renderItem={this.rederItems}
             
               keyExtractor={(item) => item.value}
             />

                  // <RadioForm
                  //   radio_props={this.state.RegisterClassesList}
                  //   initial={false}
                  //   circleSize={0}
                  //   initial={false}
                  //   buttonColor={'#50C900'}
                  //   formHorizontal={false}
                  //   labelHorizontal={true}
                  //   buttonSize={10}
                  //   buttonOuterSize={20}
                  //   thickness={10}
                    
                  //   radioStyle={{ paddingRight: 20 }}
                  //   buttonInnerColor={'50C900'}
                     
                  //   onPress={(value) => this._SetSetclasstoMissed(value)}
                  // />

                
                : null
            }
          

          <View style={styles.inputContainer}>
        <View style={styles.DropDownInnerContainer}>
          
        <DropdownList
          OptionList={this.state.AbsenceReasonList}
          PlaceHolderText={"Select"}
          selectedValue={this.state.AbsenceReason}
          setValue={this._setAbsenceRession}
         />
       
          
        </View>
        
      </View>
   
       
        </Card>
        </ScrollView>
        <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.SubmitAbsenceReason()} >
                    <Text style={styles.buttunTextColo}>Submit</Text>
          </TouchableOpacity>
      </View>
      </View>


    );

  }

}


