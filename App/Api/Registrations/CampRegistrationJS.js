import { validateAll } from 'indicative/validator'
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { CommonActions } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,

  TouchableHighlight,
  Image,
  Alert,

  ListItem,
  Modal,
  ListRenderItem,

  ScrollView,
  Left,
  Right,
  FlatList,

} from 'react-native';
import { CallPI } from '../APICall'
export const AddToGrid = async (data) => {




  if (data.Participant == '') {
    Alert.alert("Warning", "please select participant.")
    return false;
  }
  if (data.ProgramID == '') {
    Alert.alert("Warning", "please select Program.")
    return false;
  }
  if (data.ActivityCategoryID == '') {
    Alert.alert("Warning", "please select class.")
    return false;
  }
  if (data.ClasstimeID == '') {

    Alert.alert("Warning", "please select class time.")
    return false;
  }
  if (data.WeekDaysList.length > 0 && data.SelectedWeekDays.length == 0) {

    Alert.alert("Warning", "Please select days.")
    return false;
  }
  if (data.DaysList.length > 0 && data.SelectedDays.length == 0) {
    Alert.alert("Warning", "Please select days.")
    return false;
  }
  if (data.fixDays > 0) {
    //if system not allow customer to get days more than defined days, then prompt customer not to add additional days
    if (data.IsAdditionalDays == false) {

      if (data.SelectedWeekDays.length > 0 && data.SelectedWeekDays.length > fixDays) {
        Alert.alert("Warning", "Please select maximum" + fixDays)
        return false;
      }
      if (data.SelectedDays.length > 0 && data.SelectedDays.length > fixDays) {
        Alert.alert("Warning", "Please select maximum" + fixDays)
        return false;
      }
    }
  }


  var updatedCart = await AsyncStorage.getItem('UpdatedCart');
  var grid = await AsyncStorage.getItem('Grid');

  var rs = true;
  // console.log("frid Test   =   "+grid)

  if (grid != null && grid.length > 0) {

    rs = await   CompareOverlapsDates(grid)
    // alert("alert dadatda==== "+rs)
  }

  if (rs == true) {
    // return rs;

    //return false;
    var cart = await AsyncStorage.getItem('AddToCart');
    var fName = await AsyncStorage.getItem('LoginUserFirstName');
    var lName = await AsyncStorage.getItem('LoginUserLastName');
    const LoginUserID = await AsyncStorage.getItem('LoginUserID');

    var addtoGrid = new Object();
    addtoGrid = {
      activityType: null,
      program: data.programName,
      className: data.ActivityCategory,
      classTimeID: data.ClasstimeID,
      membershipStatus: null,
      days: data.SelectedWeekDays.length > 0 ? "," + data.SelectedWeekDays.map(i => i.value).join(",") : null,
      isFullWeek: data.SelectedWeekDays.length == data.WeekDaysList.length ? true : false,
      totalDays: data.SelectedWeekDays.length > 0 ? data.SelectedWeekDays.length : data.SelectedDays.length,
      weekNo: data.WeekID,
      weekText: data.WeekName,

      selectedDates: data.SelectedDays.length > 0 ? "," + data.SelectedDays.map(i => i.value).join(",") : null,

      membershipID: data.MembershipID,
      purchaserID: data.Participant,
      RegistrationGridItems: JSON.parse(grid),
      RegistrationUpdatedCart: JSON.parse(updatedCart)
    };

    var url = 'CustomerClinicRegistration/UpdateGrid'
    await CallPI("POST", url, addtoGrid, LoginUserID, fName + " " + lName, cart).then((response) => response.json())
      .then(responseJson => {
        //console.log("result ====" + JSON.stringify(responseJson))
        //  console.log("REG RESULT====" + JSON.stringify(responseJson.Data.updateCart))

        if (responseJson.Data.updateCart != null && responseJson.Data.updateCart.length > 0) {
          AsyncStorage.setItem('updateCart', JSON.stringify(responseJson.Data.updateCart));
        }

        if (responseJson.Data.lstGrid != null && responseJson.Data.lstGrid.length > 0) {
          AsyncStorage.setItem('Grid', JSON.stringify(responseJson.Data.lstGrid));
          return true
        }



      })
  }
}
CompareOverlapsDates = async (grid) => {
  var res = true

  if (grid != null && grid.length > 0) {

    var griditems = JSON.parse(grid)
    // alert("Total llll="+griditems.length)

    var selDates = '';
    var selectedDate = [];
    if (data.SelectedWeekDays != null && data.SelectedWeekDays.length > 0) {
      selDates = data.SelectedWeekDays.map(i => i.value).join(",");
      console.log("weeeee ====" + selDates)
    }
    if (data.SelectedDays != null && data.SelectedDays.length > 0) {

      selDates = data.SelectedDays.map(i => i.value.split('-')[0]).join(",");
      console.log("ddddddds ====" + selDates)
    }


    for (let items of griditems) {
      res = await CompareDates(items, selDates)
      //  alert("loooppp==="+res)
      if (res == false) {
        return false;
      }
    }
  }
  return res;
}
CompareDates = async (items, selDates) => {

  var res = true
  //console.log(items.PurchaserID +"=="+ data.Participant +"&&"+ items.Program +"=="+ data.programName +"&&"+ items.Class +"=="+ data.ActivityCategory +"&&"+ items.ClassTime +"=="+ data.ClassTime)
  if (selDates.length > 0) {

    if (items.PurchaserID == data.Participant && items.Program == data.programName && items.Class == data.ActivityCategory && items.ClassTime == data.ClassTime) {
      var array1 = [];
      array1 = selDates.split(',');
      var array2 = [];
      array2 = items.Days.split(',');
      //console.log("dasysss ====" +array1)
      let commonDays = array1.filter(item => array2.includes(item))
      //   console.log("commonDays    === "+commonDays)
      if (commonDays != '' && commonDays.length > 0) {
        Alert.alert("Warning", " You have already added this information.")
        res = false;
      }
    }
  }
  else {
    //  console.log(" pac portion cakll ")
    if (items.PurchaserID == data.Participant && items.Program == data.programName && items.Class == data.ActivityCategory && items.ClassTime == data.ClassTime) {
      // console.log("overlas  full package...")
      Alert.alert("Warning", " You have already added this information.")
      res = false;
    }
  }
  return res;
}


