import React, { Component } from 'react';
import Loader from '../../../../../App/component/Loader'
import styles from '../../../../Stylesheets/AppSS'

import {
    View, TouchableHighlight,Text, TextInput,ScrollView,Alert
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CallPI } from '../../../../Api/APICall'
export default class SchedulerFacility extends  Component {
    constructor(props){
        super(props)
    }
    state={
        isLoading: false,
        ScheduleDate:'',
        data:[],
        FacilityCourtList:[],
        CourtID:'',
        buildingID:'',
        BuildingName:''
      
    }
    
    SetCourts(courtID){
       
         this.setState({
            CourtID:courtID
         })
      }
     async GetFacilityCourts(buildingID)

     {
      
    var buildingName=  this.state.data.find(data=>data.value==buildingID).label
     
         const LoginUserID = await AsyncStorage.getItem('LoginUserID');
         var url = 'CustomerScheduler/SchedulerFacilitiesCourts?buildingID='+buildingID+'&&loginUserID='+LoginUserID;
         this.setState({ isLoading: true    })
         await CallPI("GET",url,null,null,"",null).then(response => response.json()).then(responseJson => {
         var facilityList=[];
           for (let userObject of responseJson)
           {
              
             facilityList.push({ label: userObject.Name  , value: userObject.ID });
           }
            this.setState({
                FacilityCourtList: facilityList,
                isLoading: false,
                buildingID:buildingID,
                BuildingName:buildingName,
                data:''
            })
          }
          ).catch(error => {
            console.log(error)
          });
     }

   async  GetAvailableCourtTimeSlots()
     {

      var courtName=  this.state.FacilityCourtList.find(data=>data.value==this.state.CourtID).label
      if(this.state.CourtID=='')
      {
        Alert.alert("Warning","Please set any courts first.")
        return false;
      }
         var url = 'CustomerScheduler/GetAvailableTimeSlots?buildingID='+this.state.buildingID+'&&courtID='+this.state.CourtID+"&&scheduleDate="+this.state.ScheduleDate ;
          
         this.setState({ isLoading: true    })

          await CallPI("GET",url,null,null,"",null).then(response => response.json()).then(responseJson => {
        
          this.setState({ isLoading: false})
          var facilityList=[];
           for (let item of responseJson)
           {
            // alert(this.state.buildingID+"--"+this.state.CourtID)
            
             var id = this.state.BuildingName+'-'+this.state.CourtID+"-"+item.BooknigStartTime+"-"+courtName+"-"+this.state.buildingID
             facilityList.push({ Time: item.BooknigStartTime  , Color: "#f2f2f2",IsSelectTime:false ,ID:id});
           }
           if(facilityList.length==0){
             Alert.alert("warning","Time for the selected date is not define.")
             return false;
           }
          this.props.navigation.navigate("SchedulerTimeSlots", {

            TimeSlotsList: facilityList,
            buildingID:this.state.buildingID,
            buildingName:this.state.BuildingName,
            courtId:this.state.CourtID,
            courtName:courtName,
            ScheduleDate: this.state.ScheduleDate
                   })
        }
          ).catch(error => {
            console.log(error)
            this.setState({ isLoading: false    })
          });
      
    }
      componentDidMount() {
        var list = this.props.route.params.facilityList;
        var ScheduleDate = this.props.route.params.ScheduleDate;
        this.setState({
            data:list,
            ScheduleDate:ScheduleDate,
            FacilityCourtList:''
         })
       }

      
    render()
    {
        return(
<View style={styles.PageContainer}>
<View style={styles.container}>
<Loader loading={this.state.isLoading} />
<ScrollView >
{
         this.state.data.length>0? 
  <View style={{ marginTop: '10%' }}>
  <Text>Please select building</Text>
  <RadioForm
                    radio_props={this.state.data}
                    initial={false}
                    circleSize={0}
                    // initial={false}
                    buttonColor={'#50C900'}
                    formHorizontal={false}
                    labelHorizontal={true}
                    buttonSize={10}
                    buttonOuterSize={20}
                    thickness={10}
                    buttonWrapStyle={{ margin: 100 }}
                    radioStyle={{ paddingRight: 20 }}
                    buttonInnerColor={'50C900'}
                    style={{marginTop: '5%' }}
                   
                    onPress={(value) => this.GetFacilityCourts(value)}
                  />
    <TouchableHighlight   >
      <Text style={styles.TouchableButtonText}></Text>
    </TouchableHighlight>
  </View>
:
null
}
{
         this.state.FacilityCourtList.length>0? 
  <View style={{ marginTop: '10%' }}>
  <Text>Please select building</Text>
  <RadioForm
                    radio_props={this.state.FacilityCourtList}
                    initial={false}
                    circleSize={0}
                    // initial={false}
                    buttonColor={'#50C900'}
                    formHorizontal={false}
                    labelHorizontal={true}
                    buttonSize={10}
                    buttonOuterSize={20}
                    thickness={10}
                    buttonWrapStyle={{ margin: 100 }}
                    radioStyle={{ paddingRight: 20 }}
                    buttonInnerColor={'50C900'}
                    style={{marginTop: '5%' }}
                    onPress={(value) => this.SetCourts(value)}
                  />
    <TouchableHighlight style={[styles.TouchableButton]} onPress={() => this.GetAvailableCourtTimeSlots()} >
      <Text style={styles.TouchableButtonText}>Next</Text>
    </TouchableHighlight>
  </View>
:
null
}
</ScrollView>
</View>
</View>
 
   );
}
}