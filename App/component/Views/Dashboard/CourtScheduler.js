 
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
 Image
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../../../Stylesheets/NAppSS';
import Loader from '../../Loader'
 import Calender from '../Shared/SchedulerViewDate'
//import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
 import { CallPI } from "../../../Api/APICall";
 import Moment from "moment"
 import { Card, Badge, Icon, withBadge, BadgedIcon } from 'react-native-elements'

 
const Option = [
    // {
    //     name: 'View Scheduler',
    //     Link:"Scheduler",
    //     ImageURL:require('../../../Images/Icon/View-Scheduler.png')
    // },

    // {
    //     name: 'Pay Sharing',
    //     Link:"CustomerPaySharing",
    //     ImageURL:require('../../../Images/Icon/Pay-Sharing.png')
    // },

    {
        name: 'My Reservations',
        Link:"MyCourtReservation",
        ImageURL:require('../../../Images/Icon/My-Reservations.png')
       
    },
    {
        name: 'Manage Contracts',
        Link:"ManageContract",
        ImageURL:require('../../../Images/Icon/manage-contacts.png')
    }
    
]

export default class CourtScheduler extends Component {

    constructor(props) {
        super(props);
        this.state = {
          CustomerOpenBalance: 0.00,
          CustomerHuseCredit: 0.00,
          isLoading:false,
          ScheduleDate:'',
          show:false,
          date: new Date(),
          mode:'date',
          PaysharingCount:0
         }
      }
      ShowDate()
      {
       
          this.setState({show:true})
      }
      hideDatePicker = () => {
     
        this.setState({show:false})
      };
            handleConfirm = (date) => {
            console.warn("A date has been picked: ", date);
           // callback(Moment(date).format('MM/DD/YYYY'));
            this.hideDatePicker();
      this.props.navigation.navigate("Scheduler", {
        DisplayScheduleDate: Moment(date).format("dddd, MMMM Do YYYY"),
        ScheduleDate: Moment(date).format('MM/DD/YYYY'),
    })
      }
      componentWillUnmount() {
        rol(this);
      }
    async  componentDidMount()
      {
        lor(this);
        var paySharingCount = await AsyncStorage.getItem('PaySharingCount');
        this.setState({
          PaysharingCount: parseInt(paySharingCount)
        })
        //alert("stta   "+ this.state.PaysharingCount)
      }
    
      render() {
        return (
            <View style={styles.Pagecontainer}>
            <View style={[styles.container,{marginTop:10}]}>
            <ScrollView>
            <View style={styles.MenuItemBox}>
     <TouchableOpacity  onPress={() => {this.ShowDate()}}>
         <View style={ styles.MenuItemInnerBox}>
           <Image style={styles.MenuItemBoxIcon}  resizeMode="contain"
                  source={require('../../../Images/Icon/View-Scheduler.png')}
                  />
              <Text  style={[styles.MenuItemFontSize,styles.MenuItemColor,styles.MenuItemText]}>
              View Scheduler
             </Text>
         </View>
     </TouchableOpacity>
     </View>
     <View style={styles.MenuItemBox}>
    <TouchableOpacity onPress={() => {this.props.navigation.navigate("CustomerPaySharing")}}>

       <View style={{justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
        <View style={ styles.MenuItemInnerBox}>
          <Image style={styles.MenuItemBoxIcon}  resizeMode="contain" source={require('../../../Images/Icon/Pay-Sharing.png')}/>

             <Text  style={[styles.MenuItemFontSize,styles.MenuItemColor,styles.MenuItemText]}>
             Pay Sharing
            </Text>
        </View>
        {
 this.state.PaysharingCount>0?
 <View style={[{marginRight:10, backgroundColor:'red' 
 ,justifyContent:'center',alignItems:'center',  borderRadius:100}]}>
  <Badge value={this.state.PaysharingCount} status="error" />

   {/* {/ <Text style={[styles.PaySharingCount]}>{this.state.PaysharingCount}</Text> /} */}
 </View>: null
  }
        </View>
     </TouchableOpacity>
    </View>

      {
 Option.map((u, i) => {
  
 
   {
    return (
      <View style={styles.MenuItemBox}>
      <TouchableOpacity onPress={() => {this.props.navigation.navigate(u.Link)}}>
          <View style={ styles.MenuItemInnerBox}>
            <Image style={styles.MenuItemBoxIcon}  resizeMode="contain"
               source={u.ImageURL}
                   />
               <Text  style={[styles.MenuItemFontSize,styles.MenuItemColor,styles.MenuItemText]}>
               {u.name}
              </Text>
          </View>
       </TouchableOpacity>
      </View>
  )

}})

      }
 </ScrollView>
{/* {this.state.show && (  
        <DateTimePicker
          testID="dateTimePicker"
           value={this.state.date}
           mode={this.state.mode}
             is24Hour={true}
           display="default"
           onChange={this.onChange}
        />
        )
        } */}

<DateTimePickerModal
        isVisible={this.state.show }
        mode="date"
        onConfirm={this.handleConfirm}
        onCancel={this.hideDatePicker}
      />
            </View>
         
          
            </View>
           
        )
      }
}
