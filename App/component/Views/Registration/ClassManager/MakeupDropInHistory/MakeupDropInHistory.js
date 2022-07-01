import * as React from 'react'
import { StyleSheet, RefreshControl, Text, View, TextInput, Button, TouchableOpacity, Image, Alert,  ScrollView } from 'react-native';
import styles from '../../../../../Stylesheets/NAppSS'

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from 'react-native-elements'
import  DropdownList from '../../../Shared/DropdownList'
import Loader from '../../../../Loader'

import Calender from '../../../../Views/Shared/DateRangePicker';
import DateRangeList from '../../../../Views/Shared/DateRangeList'
import { CallPI } from '../../../../../Api/APICall'
import RNPickerSelect from 'react-native-picker-select';
import {widthPercentageToDP as wp,heightPercentageToDP as hp,listenOrientationChange as lor,removeOrientationListener as rol} from 'react-native-responsive-screen';

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
    try {
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
    catch (e) {
      console.log(" Registration Catch  " + e)
    }
  }
  GetPrograms = async () => {
    try {

      var url = 'ClassManagment/GetAllPrograms?isAllActiveProgram=true';
      await CallPI('GET', url, null, null, "", null).then((response) => response.json()).then(responseJson => {
        console.log(" Program List   " + JSON.stringify(responseJson))
        var programList = [];
        programList.push({ label: "All", value: "All" });
        for (let item of responseJson) {
          programList.push({ label: item.Name, value: item.Value });
        }
        this.setState({ ProgramList: programList })
      })
    }
    catch (e) {
      console.log(" Pro Catch  " + e)
    }
  }

  SetRegistrationType = value=> {
    this.setState({ RegistrationType: value })
  }

  SetProgramID = value=> {
  
    this.setState({ ProgramID: value })

  }
  SelectDateRange =(startDate,endDate)=>{

    
    this.setState({
      DateFrom:startDate,
      DateTo:endDate
        })
  }
 
  
  componentDidMount() {
   
    this.GetRegistrationTypeList()
    this.GetPrograms()
  }
  GetAbsenceHistoryList() {


    this.props.navigation.navigate("MakeupDropInHistoryList", {

      DateFrom: this.state.DateFrom,
      DateTo: this.state.DateTo,
      ProgramID: (this.state.ProgramID =="All"? "":this.state.ProgramID ),
      RegistrationType: (this.state.RegistrationType =="All"? "":this.state.RegistrationType ),
        
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
        <DateRangeList SetDateRangeValues={this.SelectDateRange}/>
              </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputInnerContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '85%' }}>
                <TextInput style={styles.inputs}
                placeholder="Date To"
                value={this.state.DateTo}
                editable={true}
              />
                </View>
                <View style={{ width: '15%', alignItems: 'flex-end', justifyContent: 'center' ,   paddingRight:hp('1%')}}>
                <Calender
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
            <Text style={styles.buttunTextColo}>Sreach</Text>
          </TouchableOpacity>
      </View>
    </View>
     


    )
  }
}