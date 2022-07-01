import React, { Component } from 'react';
import Loader from '../../../../../App/component/Loader'
import styles from '../../../../Stylesheets/AppSS'

import {
    View, TouchableHighlight,Text,Alert, TextInput,ScrollView,FlatList
} from 'react-native';
 import { CallPI } from '../../../../Api/APICall'
import  style  from '../../../../../App/Stylesheets/AppSS'
import moment from 'moment';

export default class SchedulerSlots extends  Component {
    constructor(props){
        super(props)
    }
    state={
      
        SchedulerTimeSlotsList:[],
        SchedulerDate:  '',
        BuildingID:  '',
        BuildingName:  '',
        CourtID:  '',
        CourtName:  '',
        isLoading:false
    }
   
      UpDatedExt=(index)=>
      {
 
        const array = [...this.state.SchedulerTimeSlotsList];
   
        array[index]['IsSelectTime'] = ! array[index]['IsSelectTime']
        
        if(array[index]['IsSelectTime'] ==true){
          array[index]['Color'] = '#88aa31'
        }
        else {
          array[index]['Color'] = "#f2f2f2"}

  this.setState({SchedulerTimeSlotsList:array})
      }
      rederItems=({item ,index})=>{
        return(
            <View style={style.TimeSlotsFlatListItems}>
              <TouchableHighlight style={[style.TimeSlotsButton,{backgroundColor:item.Color}]} onPress={() => this.UpDatedExt(index)} >
               <Text style={style.TouchableButtonTimeSlotsText}>{item.Time}    </Text>
              </TouchableHighlight> 
          </View>
    )
    }
     
    ProcessBooking(){
      
      
      debugger
      var ids = "";
      var prevMinutes = 0;
      var isOneResource = true;
      var prevCourtID = 0;
      var count = 0;
     
     var filterList = this.state.SchedulerTimeSlotsList.filter(i=>i.IsSelectTime==true);
    // alert("teetrt t = "+JSON.stringify(filterList))
   
     for(let item of filterList)
      {
          ids = ids + "," + item.ID;
         // alert(item.ID)
          debugger
          if (parseFloat(item.ID.split('-')[1]) != prevCourtID && count != 0) {
              Alert.alert('warning', "Only 1 Resource can be booked at a time.");
              isOneResource = false;
              return false;
          }
           else if (count != 0 && parseFloat(item.ID.split('-')[1]) == prevCourtID && (parseFloat(item.ID.split('-')[2].split(':')[0]) * 60) + parseFloat(item.ID.split('-')[2].split(':')[1]) != parseFloat(parseFloat(prevMinutes == 30 ? -30 : prevMinutes) + 30)) {
            Alert.alert('warning', "Only 1 Resource can be booked at a time.");
              isOneResource = false;
              return false;  
            }
          prevCourtID = parseFloat(item.ID.split('-')[1]);
          prevMinutes = (parseFloat(item.ID.split('-')[2].split(':')[0]) *60) + parseFloat(item.ID.split('-')[2].split(':')[1]);
          count++;
      }
      debugger
      if (ids == "") 
      {
        Alert.alert('warning', "Please highlight schedule selection first.");
          return;
      }
      if (!isOneResource) {
          return false;
      }
      var selectedTime = ids;
     selectedTime = selectedTime.substring(1);//decodeURIComponent(selectedTime.substring(1));

      var start = selectedTime.split(',')[0].split('-')[2].substring(0, 5);
      var end = selectedTime.split(',')[selectedTime.split(',').length - 1].split('-')[2];

      if (end.split(':')[1] == 30) //45
      {
          end = (parseInt(end.split(':')[0]) + parseInt(1)) + ":00";
      } else {
          end = end.split(':')[0] + ":" + (parseInt(end.split(':')[1]) + parseInt(30));
      }
      var timeDifference = (((parseInt(end.split(':')[0]) - parseInt(start.split(':')[0])) * 60) + (parseInt(end.split(':')[1]) - parseInt(start.split(':')[1]))) / 60;
      //before proceed to payment, confirm booking time and duration from customer 
      const sst = moment(start, ["HH.mm"]).format("hh:mm a");
      const set = moment(end, ["HH.mm"]).format("hh:mm a");
      const sdate =moment(this.state.SchedulerDate).format("dddd, MMMM Do YYYY");
      var confirmMessage = "You have selected:\n" + timeDifference + "Hour(s)\n" + sst+ " to " + set + "\n"+sdate+"\nPlease confirm to proceed.";
    
      Alert.alert("Confirm Booking",confirmMessage,[
      {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
      },
      { text: "OK", onPress: () => this.BookingDetail(ids) }
  ])
    }
    async BookingDetail(ids)
     {
 
      var url= 'CustomerScheduler/SchedulerPayment?date='+this.state.SchedulerDate;
     
      this.setState({isLoading:true})
      var addtoGrid = new Object();
    addtoGrid = {
      SelectedValues:ids

    }
    console.log("ddd   "+JSON.stringify(addtoGrid))
      await CallPI("POST",url,addtoGrid,"",null).then(response => response.json()).then(responseJson => {
        console.log("dsad = = " +JSON.stringify(responseJson))
        this.setState({isLoading:false})
        this.props.navigation.navigate("SchedulerPaymentDetail", {
          response: responseJson
      })
          }
         ).catch(error => {
          this.setState({isLoading:false})

           console.log(error)
         });
     }

       async componentDidMount() {
        var list = this.props.route.params.TimeSlotsList;
        var ScheduleDate = this.props.route.params.ScheduleDate;
        var buildingID = this.props.route.params.buildingID;
        var buildingName = this.props.route.params.buildingName;
        var courtId = this.props.route.params.courtId;
        var CourtName = this.props.route.params.courtName;
         setTimeout(() => {
            this.setState({
                SchedulerTimeSlotsList: list,
                SchedulerDate:ScheduleDate,
                BuildingID:buildingID,
                BuildingName:buildingName,
                CourtID:courtId,
                CourtName:CourtName
             })
           
         }, 1000);
       
       
     
       
       }
       render() {
        return (
         
          <View style={styles.PageContainer}> 
             <View style={styles.container}> 
            <Loader loading={this.state.isLoading} />
            <View style={styles.inputContainer}>
    
            <TouchableHighlight style={[style.TouchableButton]} onPress={() => this.ProcessBooking()} >
              <Text style={style.TouchableButtonText}>Booking  </Text>
            </TouchableHighlight>
             </View>
        <View style={{ margin:10}}>
        <Text>Available time slots:</Text>
        <FlatList
            data={this.state.SchedulerTimeSlotsList}
            renderItem={ this.rederItems}
            ListHeaderComponent={() => (!this.state.SchedulerTimeSlotsList.length ?
                <View style={style.listItemsEmptyMessage}>
                    <View>
                        <Text>
                            <Text style={style.text}> No record found.  </Text>
                        </Text>
                    </View>

                </View>
                : null)
            }
             
            keyExtractor={(item, index) => index.toString()}
        />
 
 </View>
          </View>
          </View>
    
        );
      }
}