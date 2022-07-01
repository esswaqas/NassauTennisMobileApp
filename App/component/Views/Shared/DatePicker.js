import React, {useState} from 'react';
import {View, Button, Platform,Image,TouchableOpacity,TouchableHighlight} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';
import Icon from 'react-native-vector-icons/EvilIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
 
  export default function date({ callback }) {
    
  // const [date, setDate] = useState(new Date());
  // const [mode, setMode] = useState('date');
  // const [show, setShow] = useState(false);
  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate==undefined ?  new Date():selectedDate
  //   setShow(Platform.OS === 'ios');
  //   setDate(currentDate);
  //   var cdate = currentDate;
  //   let date= parseInt(cdate.getMonth()+1) + "/"+ cdate.getDate()+"/"+cdate.getFullYear();
  //   callback(date);
  // };

 
  // const showMode = currentMode => {
  //   setShow(true);
  //   setMode(currentMode);
  // };
 
  // const showDatepicker = () => {
  //   showMode('date');
  // };
 
  // const showTimepicker = () => {
  //   showMode('time');
  // };
  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
     
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    //console.warn("A date has been picked: ", date);
    callback(Moment(date).format('MM/DD/YYYY'));
    hideDatePicker();

  };
  return (
    <View>
      <View >

        {/* <Icon  name="calendar" size={35}   onPress={showDatePicker}/>   */}
        
        <TouchableOpacity activeOpacity={1} onPress={showDatePicker} >
        <Image  
        style={{
          alignSelf: 'center',
          height:hp('3.5%'),// 30,
          width:hp('3.5%'),
        }}
        resizeMode="contain"
       
        source={require('../../../Images/Icon/calendar.png')}
          />
          </TouchableOpacity>

      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
     
     
    </View>
  );
};