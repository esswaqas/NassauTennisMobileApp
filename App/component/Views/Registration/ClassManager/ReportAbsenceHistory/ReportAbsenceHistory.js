import * as React from 'react'
import { StyleSheet, RefreshControl, Text, View, TextInput, Button, TouchableOpacity, Image, Alert, Picker, ScrollView } from 'react-native';
import styles from '../../../../../Stylesheets/NAppSS'

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from 'react-native-elements'
import {widthPercentageToDP as wp,heightPercentageToDP as hp,listenOrientationChange as lor,removeOrientationListener as rol} from 'react-native-responsive-screen';

import Loader from '../../../../Loader'

 
import Calender from '../../../../Views/Shared/DateRangePicker';
import DateRangeList from '../../../../Views/Shared/DateRangeList'
import { CallPI } from '../../../../../Api/APICall'
import  DropdownList from '../../../Shared/DropdownList'
export default class ReportAbsenceHistoryList
  extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    RegistrationType: '',
    DateFrom: '',
    DateTo: '',
    RegistrationTypeList: [],
    ProgramList: [],
    ProgramID: '',
    isLoading: false,
    ClassID: '',
    ClassList: [],
    

  }
  GetRegistrationTypeList = async () => {
    try 
    {
      var url = 'ClassManagment/GetAllRegistrationTypeList?isAllRegistrationType=true';
      await CallPI('GET', url, null, null, "", null).then((response) => response.json()).then(responseJson => {
        console.log(" Registration List   " + JSON.stringify(responseJson))
        var RegistrationList = [];
        RegistrationList.push({ label: "All", value: "All" });

        for (let item of responseJson) {
          RegistrationList.push({ label: item.Name, value: item.Value });
        }
        this.setState({ RegistrationTypeList: RegistrationList })
      })
    }
    catch (e) 
    {
      console.log(" Registration Catch  " + e)
    }
  }
  GetPrograms = async () => {
    try {

      var url = 'ClassManagment/GetAllPrograms?isAllActiveProgram=true';
      await CallPI('GET', url, null, null, "", null).then((response) => response.json()).then(responseJson => {
        console.log(" Program List   " + JSON.stringify(responseJson))

        var programlist = [];
        programlist.push({ label: "All", value: "All" });
        for (let item of responseJson) {
          programlist.push({ label: item.Name, value: item.Value });
        }
        this.setState({ ProgramList: programlist })
      })
    }
    catch (e) {
      console.log(" Pro Catch  " + e)
    }
  }

  SetRegistrationType = value => {
    
    this.setState({ RegistrationType: value })
    this.GetCategory(this.state.RegistrationType, this.state.ProgramID)
  }

  SetProgramID = value =>
   {

    this.setState({ ProgramID: value })
    this.GetCategory(this.state.RegistrationType, value)

   }
  
  SetClass = value  => {
   
    this.setState({ ClassID: value })
 
  }
  SelectDateRange =(startDate,endDate)=>{

    
    this.setState({
      DateFrom:startDate,
      DateTo:endDate
        })
  }
  GetCategory = async (registrationTypeID, programId) => {

    try {
      var url = 'ClassManagment/GetActivityCategories?programID=' + programId + '&typeID=' + registrationTypeID + '&isGetActivityCategory=true';
      await CallPI('GET', url, null, null, "", null).then((response) => response.json()).then(responseJson => {
        console.log(" cate List   " + JSON.stringify(responseJson))
        var classList = [];
        classList.push({ label: "All", value: "All" });
        for (let item of responseJson) {
          classList.push({ label: item.Name, value: item.Value });
        }
        this.setState({ ClassList: classList })
      })
    }
    catch (e) {
      console.log(" Pro Catch  " + e)
    }
  }
  componentDidMount() {
   
    this.GetRegistrationTypeList()
    this.GetPrograms()
  }
  GetAbsenceHistoryList() {


    this.props.navigation.navigate("ReportAbsenceHistoryList", {

      DateFrom: this.state.DateFrom,
      DateTo: this.state.DateTo,
      
      ProgramID:  (this.state.ProgramID =="All"? "": this.state.ProgramID),

      
      RegistrationType:  (this.state.RegistrationType =="All"? "": this.state.RegistrationType),

      ClassID:  (this.state.ClassID =="All"? "": this.state.ClassID),
     
    })
  }
  render() {

    return (
      <View style={styles.Pagecontainer}>
        <View style={styles.containerWithCard}>

          <Loader loading={this.state.isLoading} />
          <ScrollView >
          <Card containerStyle={styles.PageCardHeader}>
            <View style={styles.inputContainer}>
              <View style={styles.DropDownInnerContainer}>

                <DropdownList 
                  OptionList={this.state.RegistrationTypeList}
                  PlaceHolderText={"Registration Type"}
                 selectedValue={this.state.RegistrationType}
                  setValue={ this.SetRegistrationType}
                  />
               
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.DropDownInnerContainer}>

              <DropdownList 
                  OptionList={this.state.ProgramList}
                  PlaceHolderText={"Program"}
                 selectedValue={this.state.ProgramID}
                  setValue={ this.SetProgramID}
                  />

                 
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.DropDownInnerContainer}>
              <DropdownList 
                  OptionList={this.state.ClassList}
                  PlaceHolderText={"Category"}
                 selectedValue={this.state.ClassID}
                  setValue={ this.SetClass}
                  />
               
              </View>
            </View>
            <View style={styles.inputContainer}>
        <DateRangeList SetDateRangeValues={this.SelectDateRange}/>
              </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' , alignItems:'center'}}>
                  <View style={{ width: '85%' }}>
                  <TextInput style={styles.inputs}
                  placeholder="Date From"
                  value={this.state.DateFrom}
                  editable={true}
                />
                  </View>
                  <View style={{ width: '15%', alignItems: 'flex-end', justifyContent: 'center' ,   paddingRight:hp('1%')}}>
                  <Calender
                  callback={(date) =>
                    this.setState({ ...this.state, DateFrom: date })
                  }
                  startDate={this.state.DateFrom}
                  endDate={this.state.DateTo}
                  Type={"startDate"}
                />
                  </View>
                </View>
                
               
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' , alignItems:'center', margin:0}}>
                  <View style={{ width: '85%'  }}>
                  <TextInput style={styles.inputs}
                  placeholder="Date To"
                  value={this.state.DateTo}
                  editable={true}
                />
                  </View>
                  <View style={{ width: '15%', alignItems: 'flex-end', justifyContent: 'center' ,   paddingRight:hp('1%')}}>
                  <Calender
                  style={{marin:0}}
                  callback={(date) =>
                    this.setState({ ...this.state, DateTo: date })
                  }
                  startDate={this.state.DateFrom}
                  endDate={this.state.DateTo}
                  Type={"endDate"}

                />
                  </View>
                </View>
                
               
              </View>
            </View>
            
         
          </Card>
          </ScrollView>
          <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.GetAbsenceHistoryList()} >
              <Text style={styles.buttunTextColo}>Search</Text>
            </TouchableOpacity>
        </View>
      </View>


    )
  }
}