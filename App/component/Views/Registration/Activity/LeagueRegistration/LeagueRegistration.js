import * as React from 'react';
import {StyleSheet,Text,View,TextInput,TouchableOpacity,ScrollView,} from 'react-native';
import { CheckBox } from 'react-native-elements'
import SelectMultiple from 'react-native-select-multiple'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { validateAll } from 'indicative/validator'
import styles from '../../../../../Stylesheets/NAppSS'
import Loader from '../../../../Loader'
import { CommonActions } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { Card } from 'react-native-elements';
import DropdownList from '../../../Shared/DropdownList'
import CCheckBox from '../../../Shared/CheckBox'
import Familys from '../../../../../Api/FamilyMemberList'
import Programs from '../../../../../Api/Registrations/Programs'
import { CallPI } from '../../../../../Api/APICall'
import { MembershipAlerts } from '../../../../../Api/Registrations/MemberAlertPopup'
import Moment from 'moment';
import TransactionHistoryList from '../../../TransactionHistory/TransacrionHistoryList';
import AlertBox from '../../../Shared/MessageBox'



export default class ClinicRegistrations extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    ParticipantName: '',
    ElectronicSignature: 'waqasa',
    Membership: '',
    Participantdata: [],
    MembershipList: [],
    ActivityCategoryList: [],
    ActivityCategory: '',
    ClasstimeList: [],
    ClasstimeID: '',
    ClassTime: '',
    MembershipColor: '#ECEDEB',
    ProgramID: '',
    programName: '',
    ActivityCategoryID: '',
    MembershipID: '',
    Participant: '',
    WeekList: [],
    WeekDaysList: [],
    SelectedWeekDays: [],
    WeekID: '',
    WeekName: '',
    isLoading: false,
DiscountMessage:'',
FreeWeekMessage:'',
    fixDays: '',
    IsAdditionalDays: '',
    lstWeekDaysList: [],
    DaysList: [],
    SelectedDays: [],
    error: {},
    AllDaysCheckbox: false,
    AllWeekDaysCheckbox: false,
    // Alert Props
    Alert_Visibility: false,
    Alert_Title: '',
    Alert_Message: '',
    Alert_MessageMode: '',
    isPurchaseMembership:false,
    IsPersonProfileCompleted: true,
    InCompletePersonID:''

  }
  dismissAlert = (values) => { this.setState({ Alert_Visibility: values }) 
  if(this.state.isPurchaseMembership==true)
  {
    this.SetMembershipPurchaseData()
  }
  if(this.state.IsPersonProfileCompleted===false)
  {
    this.Completeprofile()
  }
}
  CancelAlert = (values) => {
     this.setState({ Alert_Visibility: values,isPurchaseMembership:false })
     if(this.state.IsPersonProfileCompleted===false)
     {
       this.Completeprofile()
     }
     }

  async Completeprofile()
  {

  await  AsyncStorage.setItem("RegIncompleteProfilePerson",this.state.InCompletePersonID.toString());
  await  AsyncStorage.setItem("RegistrationScreen","LeagueRegistration,League Registeration");
  this.props.navigation.dispatch(CommonActions.reset({index: 1, routes: [{name: 'LeagueRegistration', },{ name: 'Profiled' },],}))
 
 }

  SetMembershipPurchaseData = async ()=>
  {
    debugger
    var selectedPerson=  this.state.Participant;
    var program=  this.state.ProgramID;
    var ActivityCategoryID=  this.state.ActivityCategoryID;
    var ClasstimeID=  this.state.ClasstimeID;


    var selectActivityType = "League";
    var IspruchaseMembershipWithActivity = true;
    var res = selectedPerson.toString()+"|"+selectActivityType+"|"+program+"|"+ActivityCategoryID+"|"+ClasstimeID;
    AsyncStorage.setItem('PurchaseMembershipwithActivity',res.toString() );
    AsyncStorage.setItem('IsPurchaseMembershipwithActivity',  IspruchaseMembershipWithActivity.toString());
    this.props.navigation.navigate("MembershipRegistration");
  }
  SelectFamilyMember = (memberID, purchaseName) => {
    this.setState({
      MembershipID:'',
      ProgramID:'',
      ActivityCategoryID:'',
      ClasstimeID:'',
      WeekID:'',
      WeekDaysList:[],
      DaysList:[]
     })
    if (memberID != '') {
      this.ChechFamilymemberStatus(memberID)
     
      
    }
    this.setState({ Participant: memberID, ParticipantName: purchaseName });
    this.setState({ActivityCategoryList:[], ClasstimeList:[], DaysList:[],WeekDaysList:[],FreeWeekMessage:'', DiscountMessage:'',WeekList:[]})
  }

  ChechFamilymemberStatus = async (memberID) => {
    const LoginUserID = await AsyncStorage.getItem('LoginUserID');
    
    var url = 'Customers/CheckCustomerDetail?ID=' + memberID + '&&pageType=""'

    await CallPI('GET', url, null, memberID, "", null).then((response) => response.json())
      .then(responseJson => {
        if (responseJson == true) {

          this.GetFamilyMembershipList(memberID)

        }
        else {
        //  Alert.alert("Warning", "Please compelete your profile first.")
          this.setState({
            Alert_Visibility: true,
            Alert_Title: 'Alert',
            Alert_Message: 'Please compelete your profile first.',
            Alert_MessageMode: 'error',
            IsPersonProfileCompleted: false,
            InCompletePersonID: memberID
          })
        }
      }
      ).catch(error => {
        alert('error')
      });
  }
  GetFamilyMembershipList = async (memberID) => {
    var clist = await AsyncStorage.getItem('AddToCart');
    var Detailurl = 'CustomerClinicRegistration/FamilyMemberDetail?memberID='+memberID;
    await CallPI('GET', Detailurl, null, null, "", clist).then((response) => response.json()).then(responseJson => {
      var membershipList = [];
      var count = 1;
      for (let userObject of responseJson.Data.lstDropDownMembership) {
        membershipList.push({ label: userObject.Name, value: userObject.Value, color: userObject.Color, FontColor: userObject.FontColor });
      }
      this.setState({ MembershipList: membershipList })
      
      if(membershipList.length>0){
        var id = membershipList[0].value
    
        
                this.setState({ MembershipID: id })
              }
    })
  }
  SelectedProgram = (pID, programName) => {
    //  alert('We pass argument from Child to Parent: ' + pID);
    this.setState({ ProgramID: pID,
       programName: programName  ,
      ActivityCategoryID:'',
      ClasstimeID:'',
      WeekID:'',
      WeekDaysList:[],
      DaysList:[]
     })
    this.GetActivityCategory(pID)
  }

  GetActivityCategory = async (programID) => {

    var Detailurl = 'CustomerLeagueRegistration/GetClassesByProgram?ProgramID=' + programID + '&isGetClassess=true';
    
    await CallPI('POST', Detailurl, null, null, "", null).then((response) => response.json()).then(responseJson => {
      var category = [];
      console.log(JSON.stringify("category Type   == ="+responseJson))
      for (let userObject of responseJson.classList) {
        category.push({ label: userObject.Name, value: userObject.ID });
      }
      this.setState({ ActivityCategoryList: category })
    })
  }


  SelectMembership = (values) => {
    this.setState({ MembershipID: values });
    
  }


  SetActivityCategoryID = async (values) => {
    this.setState({ ActivityCategoryID: values })
    if (this.state.Participant == '') {
      //Alert.alert("Alert", "Please select first participant.")
      this.setState({
        Alert_Visibility: true,
        Alert_Title: 'Alert',
        Alert_Message: 'Please select first participant.',
        Alert_MessageMode: 'error',
      })
      return false
    }
    this.setState({
 
      ClasstimeID:'',
      WeekID:'',
      WeekDaysList:[],
      DaysList:[]
     })

    var Detailurl = 'CustomerClinicRegistration/GetClassesTimeByClassID?classID=' + values + '&type=&isGetClassTime=true';
    await CallPI('GET', Detailurl, null, null, "", null).then((response) => response.json()).then(responseJson => {
      var category = [];
      for (let userObject of responseJson.ClassTime) {
        category.push({ label: userObject.ClassDayTime, value: userObject.ID });
      }
      var cate = this.state.ActivityCategoryList.find(data => data.value == values).label;
      this.setState({ ClasstimeList: category })
      this.setState({   ActivityCategory: cate })
    })

  }

  SetActivity = async (values) => {

    if (this.state.Participant == '') {
     
      this.setState({
        Alert_Visibility: true,
        Alert_Title: 'Alert',
        Alert_Message: 'Please select first participant.',
        Alert_MessageMode: 'error',
      })
      return false
    }
    this.setState({
 
    
      WeekID:'',
      WeekDaysList:[],
      DaysList:[],
      AllDaysCheckbox:false
     })
    var clist = await AsyncStorage.getItem('AddToCart');
    //alert(JSON.stringify( this.state.Participantdata))
    var classtimes = this.state.ClasstimeList.find(data => data.value == values).label;
    //alert(classtimes)
    var purchaseName = ''//    this.state.Participantdata.find(data=>data.value== this.state.Participant).label;
     
    this.setState({ ClasstimeID: values,ClassTime: classtimes ,SelectedWeekDays:[],  SelectedDays:[]})
  //check Membership available or not 
  await MembershipAlerts(this.state.Participant, this.state.ActivityCategoryID, values, purchaseName, clist)
  .then((response) => response.json()).then(responseJson =>
   { 
 //alert(responseJson)
    if (responseJson === "nonMember")
     {
    this.setState({
      Alert_Visibility: true,
      Alert_Title: 'Alert',
      Alert_Message: "There is a membership available that will give a discount for this item.\nWould you like to purchase or renew a membership at this time?",
      Alert_MessageMode: 'error',
      isPurchaseMembership:true
    })
    }
 
   })   
    var grid = await AsyncStorage.getItem('Grid');
    var addtoGrid = new Object();
    addtoGrid = {
      RegistrationGridItems: JSON.parse(grid),
    };
    
    var weekURL = 'CustomerClinicRegistration/GetClinicWeeks?purchaserID=' + this.state.Participant + '&id=' + values + '&membershipID=' + this.state.MembershipID + '&classID=' + this.state.ActivityCategoryID

 
    
    await CallPI('POST', weekURL, addtoGrid, null, "", null).then((response) => response.json()).then(responseJson => {
      var WeekList = [];
      console.log('YReeeeeeee= 434 43  ' + JSON.stringify({ responseJson }))
this.setState({
DiscountMessage:responseJson.Data.discount,
FreeWeekMessage:responseJson.Data.freeWeek
})

      if (responseJson.Data.lstCampWeek.length > 0) {
        for (let userObject of responseJson.Data.lstCampWeek) {
          WeekList.push({ label: userObject.Name, value: userObject.ID });
        }
        this.setState({
          WeekList: WeekList,
          DaysList: [],
          SelectedDays: [],
          WeekDaysList: []
        })
      }
      else if (responseJson.Data.lstWeekDays.length > 0) {


        this.setState({
          WeekDaysList: [],
          SelectWeekDays: [],
          WeekList: []

        })
        var days = []; var tueList = []; var WednesList = []; var ThusList = [];
        var FriList = []; var SatList = []; var SunList = [];
        //monday
        for (let userObject of responseJson.Data.lstWeekDays) {
          if (userObject.MonDate != null) {
            days.push({ label: userObject.AppMondayDate, value: userObject.MonDate });
          }
        }
        //tuseday
        for (let userObject of responseJson.Data.lstWeekDays) {
          if (userObject.TueDate != null) {
            days.push({ label: userObject.AppTuesdayDate, value: userObject.TueDate });
          }
        }
        //Wedday
        for (let userObject of responseJson.Data.lstWeekDays) {
          if (userObject.WedDate != null) {
            days.push({ label: userObject.AppWednesdayDate, value: userObject.WedDate });
          }
        }
        //thusday
        for (let userObject of responseJson.Data.lstWeekDays) {
          if (userObject.ThuDate != null) {
            days.push({ label: userObject.AppThursdayDate, value: userObject.ThuDate });
          }
        }

        //Friday
        for (let userObject of responseJson.Data.lstWeekDays) {
          if (userObject.FriDate != null) {
            days.push({ label: userObject.AppFridayDate, value: userObject.FriDate });
          }
        }
        //Satday
        for (let userObject of responseJson.Data.lstWeekDays) {
          if (userObject.SatDate != null) {
            days.push({ label: userObject.AppSaturdayDate, value: userObject.SatDate });
          }
        }
        //Sundday
        for (let userObject of responseJson.Data.lstWeekDays) {
          if (userObject.SunDate != null) {
            days.push({ label: userObject.AppSundayDate, value: userObject.SunDate });
          }
        }

        this.setState({
          DaysList: days
          
        })
      } else {
        this.setState({
          DaysList: [],
          WeekDaysList: [],

          SelectWeekDays: [],

          SelectedDays: []
        })

      }
    })
  }

  SetWeek = async (values) => {

    var weekName = this.state.WeekList.find(data => data.value == values).label;
    this.setState({ WeekID: values, WeekName: weekName })
    var weekDaysURL = 'CustomerClinicRegistration/GetDaysOfTheWeek?campWeekID=' + values;
    await CallPI('POST', weekDaysURL, null, null, "", null).then((response) => response.json()).then(responseJson => {
      var WeekList = [];
      console.log('YReeeeeeee= 434 43  ' + JSON.stringify({ responseJson }))
      for (let userObject of responseJson.lstClinicClassDays) {
        WeekList.push({ label: userObject.Name, value: userObject.ID });
      }
      this.setState({ WeekDaysList: WeekList })
       this.setState({ WeekDaysList: WeekList ,SelectedWeekDays:[],  SelectedDays:[],AllWeekDaysCheckbox:false})

    })

  }


  SelectWeekDays = (SelectedWeekDays) => { this.setState({ SelectedWeekDays }) }
  SelectedDays = (SelectedDays) => { this.setState({ SelectedDays }) }

  async AddToGrid() {

    // var array1 = ["09/12/2020", "09/13/2020","09/14/2020", "09/18/2020",  "09/20/2020"];
    // var array2 = ["09/12/2020", "09/10/2020","09/16/2020", "09/17/2020",  "09/20/2020"];

    // const intersection = array1.filter(element => array2.includes(element));

//alert(this.state.ClassTime)
    if (this.state.Participant == '') {
     // Alert.alert("Alert", "")
      this.setState({
        Alert_Visibility: true,
        Alert_Title: 'Alert',
        Alert_Message: 'Please select participant.',
        Alert_MessageMode: 'error',
      })
      return false;
    }
    if (this.state.ProgramID == '') {
      //Alert.alert("Warning", "")
      this.setState({
        Alert_Visibility: true,
        Alert_Title: 'Alert',
        Alert_Message: 'Please select Program.',
        Alert_MessageMode: 'error',
      })
      return false;
    }
    if (this.state.ActivityCategoryID == '') {
     // Alert.alert("Warning", "please select class.")
      this.setState({
        Alert_Visibility: true,
        Alert_Title: 'Alert',
        Alert_Message: 'Please select class.',
        Alert_MessageMode: 'error',
      })
      return false;
    }
    if (this.state.ClasstimeID == '') {
     
      //Alert.alert("Warning", "please select class time.")
      this.setState({
        Alert_Visibility: true,
        Alert_Title: 'Alert',
        Alert_Message: 'Please select class time.',
        Alert_MessageMode: 'error',
      })
      return false;
    }
    if (this.state.WeekDaysList.length > 0 && this.state.SelectedWeekDays.length == 0) {

      //Alert.alert("Warning", "Please select days.")
      this.setState({
        Alert_Visibility: true,
        Alert_Title: 'Alert',
        Alert_Message: 'Please select days.',
        Alert_MessageMode: 'error',
      })
      return false;
    }
    if (this.state.DaysList.length > 0 && this.state.SelectedDays.length == 0) {
      //Alert.alert("Warning", "Please select days.")
      this.setState({
        Alert_Visibility: true,
        Alert_Title: 'Alert',
        Alert_Message: 'Please select days.',
        Alert_MessageMode: 'error',
      })
      return false;
    }
    if (this.state.fixDays > 0) {
      //if system not allow customer to get days more than defined days, then prompt customer not to add additional days
      if (this.state.IsAdditionalDays == false) {

        if (this.state.SelectedWeekDays.length > 0 && this.state.SelectedWeekDays.length > fixDays) {
        //  Alert.alert("Warning", "Please select maximum" + fixDays)
          this.setState({
            Alert_Visibility: true,
            Alert_Title: 'Warning',
            Alert_Message: "Please select maximum" + fixDays,
            Alert_MessageMode: 'error',
          })
          return false;
        }
        if (this.state.SelectedDays.length > 0 && this.state.SelectedDays.length > fixDays) {
         // Alert.alert("Warning", "Please select maximum" + fixDays)
         this.setState({
          Alert_Visibility: true,
          Alert_Title: 'Warning',
          Alert_Message: "Please select maximum" + fixDays,
          Alert_MessageMode: 'error',
        })
          return false;
        }
      }
    }

    var updatedCart = await AsyncStorage.getItem('updateCart');
    var grid = await AsyncStorage.getItem('Grid');

    var rs = true;
   // console.log("frid Test   =   "+grid)

    if(grid!= null && grid.length>0)
   {
     
  rs= await this.CompareOverlapsDates(grid)
  //alert("alert dadatda==== "+rs)
   }
  
    if(rs==true)
    {
     // return rs;
    
    //return false;
    var cart = await AsyncStorage.getItem('AddToCart');
    var fName = await AsyncStorage.getItem('LoginUserFirstName');
    var lName = await AsyncStorage.getItem('LoginUserLastName');
    const LoginUserID = await AsyncStorage.getItem('LoginUserID');

    var addtoGrid = new Object();
    addtoGrid = {
      activityType: null,
      program: this.state.programName,
      className: this.state.ActivityCategory,
      classTimeID: this.state.ClasstimeID,
      membershipStatus: null,
      days: this.state.SelectedWeekDays.length > 0 ? "," +this.state.SelectedWeekDays.map(i => i.value).join(",") : null,
      isFullWeek: this.state.SelectedWeekDays.length == this.state.WeekDaysList.length ? true : false,
      totalDays: this.state.SelectedWeekDays.length > 0 ? this.state.SelectedWeekDays.length : this.state.SelectedDays.length,
      weekNo: this.state.WeekID,
      weekText: this.state.WeekName,
      selectedDates: this.state.SelectedDays.length > 0 ? ","+ this.state.SelectedDays.map(i => i.value).join(",") : null,
      membershipID: this.state.MembershipID,
      purchaserID: this.state.Participant,
      RegistrationGridItems: JSON.parse(grid),
      RegistrationUpdatedCart: JSON.parse(updatedCart)
    };
 
    var url = 'CustomerClinicRegistration/UpdateGrid'
    await CallPI("POST", url, addtoGrid, LoginUserID, fName + " " + lName, cart).then((response) => response.json())
      .then(responseJson => {
        if (responseJson.Data.updateCart != null && responseJson.Data.updateCart.length > 0) {
          AsyncStorage.setItem('updateCart', JSON.stringify(responseJson.Data.updateCart));
        }
        if (responseJson.Data.lstGrid != null && responseJson.Data.lstGrid.length > 0) {
          AsyncStorage.setItem('Grid', JSON.stringify(responseJson.Data.lstGrid));
          this.setState({SelectedWeekDays:[],
            SelectedDays:[]
        })
         this.props.navigation.navigate("LeagueRegistrationGrid" ,
         {
              ActivityID : this.state.ClasstimeID
         })
       
        }


       
      })
    }
  }
  CompareOverlapsDates =async  (grid)=>{
    var res= true

    if (grid != null && grid.length > 0) {

      var griditems = JSON.parse(grid)
     // alert("Total llll="+griditems.length)

       var selDates = '';
       var selectedDate = [];
      if (this.state.SelectedWeekDays != null && this.state.SelectedWeekDays.length > 0) {
        selDates = this.state.SelectedWeekDays.map(i => i.value).join(",") ;
        console.log("weeeee ====" +selDates )
      }
      if (this.state.SelectedDays != null && this.state.SelectedDays.length > 0) {
        
        selDates = this.state.SelectedDays.map(i => i.value.split('-')[0]).join(",") ;
        console.log("ddddddds ====" +selDates)
      }
 
 
      for (let items of griditems) {
        res=   await this.CompareDates(items,selDates)
      //  alert("loooppp==="+res)
        if(res==false){
            return false;
        }
      }
    }
    return res;
  }
  CompareDates=async (items,selDates)=>{

 var    res =true
//console.log(items.PurchaserID +"=="+ this.state.Participant +"&&"+ items.Program +"=="+ this.state.programName +"&&"+ items.Class +"=="+ this.state.ActivityCategory +"&&"+ items.ClassTime +"=="+ this.state.ClassTime)
    if (selDates.length > 0) {

      if (items.PurchaserID == this.state.Participant && items.Program == this.state.programName && items.Class == this.state.ActivityCategory && items.ClassTime == this.state.ClassTime) {
        var array1 = [];
        array1= selDates.split(',');
         var array2 =[];
         array2= items.Days.split(',');
        //console.log("dasysss ====" +array1)
      let commonDays = array1.filter(item => array2.includes(item))
     //   console.log("commonDays    === "+commonDays)
        if (commonDays!='' && commonDays.length>0)
         {
         // Alert.alert("Warning", " You have already added this information.")
          this.setState({
            Alert_Visibility: true,
            Alert_Title: 'Alert',
            Alert_Message: "You have already added this information.",
            Alert_MessageMode: 'error',
          })
          res= false;
        }
      }
    }
    else {
    //  console.log(" pac portion cakll ")
      if (items.PurchaserID == this.state.Participant && items.Program == this.state.programName && items.Class == this.state.ActivityCategory && items.ClassTime == this.state.ClassTime) {
        // console.log("overlas  full package...")
        // Alert.alert("Warning", " You have already added this information.")
         this.setState({
          Alert_Visibility: true,
          Alert_Title: 'Alert',
          Alert_Message: "You have already added this information.",
          Alert_MessageMode: 'error',
        })
         res= false;
      }
    }
    return res;
  }
  ResetStates=async ()=>{
    this.setState({
      ActivityCategoryList:[],
      ClasstimeList:[],
      WeekList:[],
      WeekDaysList:[],
      DaysList:[],

    })
  }
   CheckedAllDays = async ()=> {
    this.setState({

      AllDaysCheckbox: !this.state.AllDaysCheckbox
    })
    
    if (!this.state.AllDaysCheckbox) {
      this.setState({
        SelectedDays: this.state.DaysList

      })
    }
    else {
      this.setState({
        SelectedDays: []

      })
    }

  }
   CheckedAllWeekDays = async () => {
    
    this.setState({

      AllWeekDaysCheckbox: !this.state.AllWeekDaysCheckbox
    })
    
    if (!this.state.AllWeekDaysCheckbox) {
      this.setState({
        SelectedWeekDays: this.state.WeekDaysList

      })
    }
    else {
      this.setState({
        SelectedWeekDays: []

      })
    }

  }
  async GotoClinicRegistrationGrid(){
    var grid = await AsyncStorage.getItem('Grid');
    var list  =  JSON.parse(grid)
    // alert(JSON.stringify(list))
    if(list=== null  || list.length==0 || list=='' ){
      Alert.alert("warning","Please click Confirm Selection first.")
    }
    else{
     this.props.navigation.navigate("LeagueRegistrationGrid" ,
    {
         ActivityID : this.state.ClasstimeID
    })}
  }
  async componentDidMount() {
  await  AsyncStorage.removeItem('Grid');
  await AsyncStorage.removeItem('updateCart');
  var  IsFromMembership=   await AsyncStorage.getItem('IsFromMembership');
     
     if(IsFromMembership==="true")
     {
     
      this.setState({isLoading:true})
      const purchaseMembershipfromActivity = await AsyncStorage.getItem('PurchaseMembershipwithActivity');
      var personID= purchaseMembershipfromActivity.split('|')[0];
      var program= purchaseMembershipfromActivity.split('|')[2];
      var ActivityCategoryID= purchaseMembershipfromActivity.split('|')[3];
      var ClasstimeID= purchaseMembershipfromActivity.split('|')[4];
      this.setState({Participant:personID,ProgramID:program})
      this.GetActivityCategory(program)
      this.SetActivityCategoryID(ActivityCategoryID)
      this.SetActivity(ClasstimeID)
      
       this.setState({
       // ProgramID:(program),
        ActivityCategoryID:parseInt(ActivityCategoryID),
        ClasstimeID:parseInt(ClasstimeID)
        })
      await AsyncStorage.removeItem("IsFromMembership");
        this.setState({isLoading:false})
     }
  }
  render() {

    return (
      <View style={styles.Pagecontainer}>
      <AlertBox
        displayMode={this.state.Alert_MessageMode}
        MessageType={''}
        displayMsg={this.state.Alert_Message}
        Title={this.state.Alert_Title}
        visibility={this.state.Alert_Visibility}

        dismissAlert={this.dismissAlert}
        CancelAlert={this.CancelAlert}
      />
      <View style={styles.containerWithCard}>

        <ScrollView >
          <Card containerStyle={styles.PageCard}>

            <View style={styles.inputContainer}>

              <Familys SelectFamilyMember={this.SelectFamilyMember} />
            </View>

            <View>
              {
                this.state.error['Participant'] && <Text style={styles.ErrorMessage}>{this.state.error['Participant']}</Text>
              }
            </View>

            <View style={styles.inputContainer}>
              {
                this.state.MembershipList.length > 0 ?
                  <View style={[styles.DropDownInnerContainer, { backgroundColor: this.state.MembershipColor, }]}>
                    <DropdownList
                      OptionList={this.state.MembershipList}
                      PlaceHolderText={"Membership"}
                      selectedValue={this.state.MembershipID}
                      setValue={this.SelectMembership}
                    />
                  </View>
                  : 
                  <Text style={[styles.font_12,styles.fontFamily]}>Non Member</Text>

              }
            </View>
            <View style={styles.inputContainer}>
              <Programs SelectedProgram={this.SelectedProgram}  resetProgram={this.state.ProgramID}/>
            </View>
            <View>
              {
                this.state.error['ProgramID'] && <Text style={styles.ErrorMessage}>{this.state.error['ProgramID']}</Text>
              }
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.DropDownInnerContainer}>
                <DropdownList
                  OptionList={this.state.ActivityCategoryList}
                  PlaceHolderText={"Class"}
                  selectedValue={this.state.ActivityCategoryID}
                  setValue={this.SetActivityCategoryID}
                />
              </View>
            </View>
            <View>
              {
                this.state.error['ActivityCategoryID'] && <Text style={styles.ErrorMessage}>{this.state.error['ActivityCategoryID']}</Text>
              }
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.DropDownInnerContainer}>
                <DropdownList
                  OptionList={this.state.ClasstimeList}
                  PlaceHolderText={"Class Time"}
                  selectedValue={this.state.ClasstimeID}
                  setValue={this.SetActivity}
                />

              </View>

            </View>
            <View>
              {
                this.state.error['ClasstimeID'] && <Text style={styles.ErrorMessage}>{this.state.error['ClasstimeID']}</Text>
              }
            </View>
            {
              this.state.DiscountMessage != '' ?


                <View style={styles.inputContainer}>

<Text style={[styles.font_12,styles.fontFamily]}>{this.state.DiscountMessage}</Text>
                </View>


                : null
            }
            {
              this.state.FreeWeekMessage != '' ?
                <View style={styles.inputContainer}>
                  <Text style={[styles.font_12,styles.fontFamily]}>{this.state.FreeWeekMessage}</Text>
                </View>
                : null

            }

            {
              this.state.WeekList.length > 0 ?
                <View>
                  <View style={styles.inputContainer}>
                    <View style={styles.DropDownInnerContainer}>

                      <DropdownList
                        OptionList={this.state.WeekList}
                        PlaceHolderText={"Week"}
                        selectedValue={this.state.WeekID}
                        setValue={this.SetWeek}
                      />

                    </View>

                  </View>
                  <View>
                    {
                      this.state.error['WeekID'] && <Text style={styles.ErrorMessage}>{this.state.error['WeekID']}</Text>
                    }
                  </View>
                </View>
                : null
            }
            {
              this.state.WeekDaysList.length > 0 ?
                <View>
                  <View style={[styles.CheckboxListContain]}>
                  <Text style={[styles.font_12,styles.fontFamily]}>Days: </Text>
                    <CCheckBox
                      title={"All"}
                      checked={this.state.AllWeekDaysCheckbox}
                      setValue={this.CheckedAllWeekDays}
                    />
                    <SelectMultiple
                      items={this.state.WeekDaysList}
                      rowStyle={styles.CheckboxListContain}
                      selectedItems={this.state.SelectedWeekDays}
                      onSelectionsChange={this.SelectWeekDays}
                    //  rowStyle={styles.CheckboxListContain}
                    />
                  </View>
                </View>
                :
                null
            }
            {
              this.state.DaysList.length > 0 ?
                <View>
                  <View style={[styles.CheckboxListContain]}>
                  <Text style={[styles.font_12,styles.fontFamily]}> Available Days: </Text>
                    {/* <ScrollView style={{height:500}}> */}
                    <CCheckBox
                      title={"All"}
                      checked={this.state.AllDaysCheckbox}
                      setValue={this.CheckedAllDays}
                    />
                    <SelectMultiple
                      items={this.state.DaysList}
                      // renderLabel={renderLabel}
                       rowStyle={styles.CheckboxListContain}
                      selectedItems={this.state.SelectedDays}
                      onSelectionsChange={this.SelectedDays} />
                    {/* </ScrollView > */}
                  </View>
                </View>
                :
                null
            }
          </Card>

        </ScrollView>
        <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.AddToGrid()} >
          <Text style={styles.buttunTextColo}>Confirm Selection  </Text>
        </TouchableOpacity>

        <View style={[{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
          <View style={{ width: '49%', marginRight: 10 }}>
            <TouchableOpacity style={[styles.buttonContainer_danger]} onPress={() => this.props.navigation.reset({ routes: [{ name: 'DashboardList' }] })} >
              <Text style={styles.buttunTextColo}>cancel </Text>
            </TouchableOpacity>

          </View>
          <View style={{ width: '49%' }}>
            <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.GotoClinicRegistrationGrid()} >
              <Text style={styles.buttunTextColo}>Next </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>

    </View>


    );

  }

}
 

