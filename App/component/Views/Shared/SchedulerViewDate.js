import React, {useState} from 'react';
import {View, Button, Platform,TouchableOpacity,Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/EvilIcons';
import styles from '../../../Stylesheets/DashboardSS';


 
  export default function date({ callback }) {
    
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate==undefined ?  new Date():selectedDate
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    var cdate = currentDate;
    let date= parseInt(cdate.getMonth()+1) + "/"+ cdate.getDate()+"/"+cdate.getFullYear();
    callback(date);
  };

 
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
 
  const showDatepicker = () => {
    showMode('date');
  };
 
  const showTimepicker = () => {
    showMode('time');
  };
  return (
     
   <View style={styles.RegistrationsOptionBox}>
    <TouchableOpacity style={[styles.Inner, styles.ShowdpwAnimaterd, { backgroundColor: 'white' }]}  onPress={() => {this.props.navigation.navigate(u.Link)}}>
      <Text style={styles.TextColor}>Scheduler</Text>
    </TouchableOpacity>
     
      
       {show && (  
        <DateTimePicker
          testID="dateTimePicker"
           value={date}
           mode={mode}
             is24Hour={true}
           display="default"
           onChange={onChange}
        />
        )}   
    </View>
  );
};