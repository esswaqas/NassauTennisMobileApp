import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  ScrollView,
  StatusBar,SafeAreaView


} from 'react-native';
import CheckBox from '../../component/Views/Shared/CheckBox'
import { Card } from 'react-native-elements'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import MyTabBar from '../Views/Shared/TabBar'
import RadioButton from '../Views/Shared/RadioButton';
import DropdownList from '../Views/Shared/DropdownList';
import appStyle from '../../Stylesheets/NAppSS'
//import ModalDropdown from 'react-native-modal-dropdown';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { validateAll } from 'indicative/validator'
import { CallPI } from '../../../App/Api/APICall'
import styles from '../../Stylesheets/NAppSS'


import Loader from '../../../App/component/Loader'
import Calender from '../../../App/component/Views/Shared/DatePicker'
import CustomSwitch from '../Views/Shared/CustomSwitch';
import AlertBox from  '../Views/Shared/MessageBox'
import CustomStatusBar from '../../../App/component/Views/Shared/StatusBar'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
const Tab = createMaterialTopTabNavigator();

var rbdagegroup = [
  { label: 'Adult', value: 'A' },
  { label: 'Junior', value: 'J' }
];
var FamilyMembers = [

];

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props)
  }
 inputRefs = {
    firstTextInput: null,
    favSport0: null,
    favSport1: null,
    lastTextInput: null,
    favSport5: null,
  };
  state = {
    FirstName: '',
    LastName: '',
    Email: '',
       DateofBirth: '',
    Gender: '',
    AgeGroup: '',
    edit: false,

    GenderData: [{
      value: 'M',
      label: 'Male'
    }, {
      value: 'F',
      label: 'Female'
    }],
    error: {},
    Alert_Visibility: false,
    Alert_Title: '',
    Alert_Message: '',
    Alert_MessageMode: '',
    isRedirectPage:false
  }

  dismissAlert = (values) => {
    this.setState({ Alert_Visibility: values })
}
CancelAlert = (values) => {
    this.setState({ Alert_Visibility: values })
}

  _dropdown_6_onSelect(idx, value) {
    var gen = ""
    if (value != "") {
      gen = value == "Male" ? "M" : "F"

    }
    this.setState({
      Gender: gen
    })

  }
  
  _SetAgeGroup = value => {
  
    this.setState({
      AgeGroup: value
    })
   // this.SetAgeGroup(index)
   };
 

  FillData = async () => {
    this.setState({
      FirstName: 'afzal',
      LastName: 'ali',
      Email: 'esswaqas@hotmail.com',


      DateofBirth: '',
      Gender: '',
      AgeGroup: ''
    })
  }
  NextSignUp = async (data) => {
    try {
      const rules = {
        FirstName: 'required|string|max:20',
        LastName: 'required|string|max:20',
        Email: 'required|email',
        DateofBirth: 'required',
        Gender: 'required',
        AgeGroup: 'required',
      }
      const messages = {
        required: 'Required',
        email: 'The email is invalid.',
        max: '{{ field }} should be less than 20 character.'
      }
      this.SetPersonalInfo()
      await validateAll(data, rules, messages)
      this.props.navigation.navigate("AddressInfos")

    }
    catch (errors) {

      const formattedErrors = {}
      errors.forEach(error => formattedErrors[error.field] = error.message);
      this.setState({
        error: formattedErrors
      })
    }

  }

  Gender(value) {
    this.setState({
      Gender: value
    })

  }
  SetPersonalInfo = async () => {

    await AsyncStorage.setItem('perFirstName', this.state.FirstName);
    await AsyncStorage.setItem('perLastName', this.state.LastName);
    await AsyncStorage.setItem('perEmail', this.state.Email);
    await AsyncStorage.setItem('perDateofBirth', this.state.DateofBirth);
    await AsyncStorage.setItem('perGender', this.state.Gender);
    await AsyncStorage.setItem('perAgeGroup', this.state.AgeGroup);

  }
    onSelectSwitch = index => {
   this.Gender(index==1?'M': index==2? 'F':'')
  };
  render() {

    return (


      <View style={[styles.Pagecontainer,{marginTop:0}]}>
       <StatusBar
                    translucent
                    barStyle="light-content"
                    //  backgroundColor="rgba(0, 0, 0, 0.251)"
                    backgroundColor='magenta'
                 />
        <View style={[styles.container, { marginTop: '2%' }]}>
 


          <ScrollView style={{height:hp('60%')}}>
            <View style={styles.inputContainer}>
              <Text style={[styles.font_12 ,{ textAlign: 'center', color: '#415717', fontWeight: 'bold' }]}>Fill the below form</Text>
            </View>
            <View style={styles.inputContainer}>

              <View style={styles.inputInnerContainer}>
                <TextInput style={styles.inputs}
                  placeholder="First Name"
                  value={this.state.FirstName}
                  place
                  underlineColorAndroid='transparent'
                  onChangeText={(FirstName) => this.setState({ FirstName })}
                />
              </View>
              <View >
                {
                  this.state.error['FirstName'] && <Text style={styles.ErrorMessage}>{this.state.error['FirstName']}</Text>
                }
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>
                <TextInput style={styles.inputs}
                  placeholder="Last Name"
                  underlineColorAndroid='transparent'
                  value={this.state.LastName}
                  onChangeText={(LastName) => this.setState({ LastName })}
                />
              </View>
              <View >
                {
                  this.state.error['LastName'] && <Text style={styles.ErrorMessage}>{this.state.error['LastName']}</Text>
                }
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>
                <TextInput style={styles.inputs}
                  placeholder="Email"
                  keyboardType="email-address"
                  value={this.state.Email}
                  onChangeText={(Email) => this.setState({ Email })}
                />
              </View>
              <View>
                {
                  this.state.error['Email'] && <Text style={styles.ErrorMessage}>{this.state.error['Email']}</Text>
                }
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ width: '80%' }}>

                    <TextInput style={styles.inputs}
                      placeholder="Date of Birth"
                      value={this.state.DateofBirth}
                      editable={this.state.edit}
                    />
                  </View>
                  <View style={{ width: '20%', alignItems: 'flex-end', justifyContent: 'center' ,paddingRight:hp('1%')}}>
                    <Calender
                      callback={(date) =>
                        this.setState({ ...this.state, DateofBirth: date })
                      }
                    />
                  </View>
                </View>



              </View>
              <View >

                {
                  this.state.error['DateofBirth'] && <Text style={styles.ErrorMessage}>{this.state.error['DateofBirth']}</Text>

                }
              </View>
            </View>
          
            <View style={styles.inputContainer}>
              <View style={styles.DropDownInnerContainer}>
                {/* <RNPickerSelect
                  onValueChange={(value) => console.log(value)}
                  onValueChange={(value) => this._SetAgeGroup(value)}
                  value={this.state.AgeGroup}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                      top: 50,
                      right: 60,
                    },
                    placeholder: {
                      color: 'purple',
                      fontSize:12,
                     },
                  }}
                   useNativeAndroidPickerStyle={false}
                  placeholder={{ label: "Age Group", value: "" }}
                  items={rbdagegroup}
                /> */}
                 {/* <RNPickerSelect

                  InputAccessoryView={() => null}
                  style={pickerSelectStyles}
                  pickerProps={{color:'red'}}
                  textInputProps={{color:'red'}}
                  placeholder={{ label: "Age Group", value: "" }}
                  items={rbdagegroup}
                  value={this.state.AgeGroup}
                  onValueChange={(value) => this._SetAgeGroup(value)}
            
          /> */}

        <DropdownList
          OptionList={rbdagegroup}
          PlaceHolderText={"Age Group"}
          selectedValue= {this.state.AgeGroup}
           setValue={this._SetAgeGroup}
          />
              </View>
              <View >

                {
                  this.state.error['AgeGroup'] && <Text style={styles.ErrorMessage}>{this.state.error['AgeGroup']}</Text>
                }
              </View>
            </View>


            <View style={[styles.inputContainer]}>
            <View style={{alignItems: 'center'}}>
        <CustomSwitch
          selectionMode={ this.state.Gender=='M'?1:this.state.Gender=='F' ?2:  0}
          roundCorner={true}
          option1={'Male'}
          option2={'Female'}
 
          onSelectSwitch={this.onSelectSwitch}
          selectionColor={'#88aa31'}
        />
      </View>
      <View >

{
  this.state.error['Gender'] && <Text style={styles.ErrorMessage}>{this.state.error['Gender']}</Text>
}
</View>
        
            </View>
            {/* <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.FillData()} >
            <Text style={styles.loginText}>Fill</Text>
          </TouchableHighlight>   */}
        
          </ScrollView>
        
          <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.NextSignUp(this.state)} >
              <Text style={styles.buttunTextColo}>Next</Text>
            </TouchableOpacity>
        
        </View>
      </View>


    );

  }

}


class AddressInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isChecked: true,
      TermsConditioncheckbox: false,
      StreetAddress: '',
      City: '',
      State: '',
      ZipCode: '',
      Familyhead: '',
      error: {},
      PerFirstName: '',
      PerLastName: '',
      PerEmail: '',
      PerDateofBirth: '',
      PerGender: '',
      PerAgeGroup: '',
      isLoading: false,
      StateList: [],
      isFamilyMemberShow: false,
      isFamilyDuplicationCheced: false,
      FamilyMembersList:[],

      Alert_Visibility: false,
      Alert_Title: '',
      Alert_Message: '',
      Alert_MessageMode: '',
      isRedirectPage:false,
      isSendEmailToExistUsre:false,
      ExisUserID : ''
      
    }

  }

  dismissAlert = (values) => {
    this.setState({ Alert_Visibility: values })

    if(this.state.isSendEmailToExistUsre===true)
    { 
      this.SendEmailToExistUser(this.state.ExisUserID) 
      this.setState({ isSendEmailToExistUsre:false,
        ExisUserID:'' })
    }
}
CancelAlert = (values) => {
    this.setState({ Alert_Visibility: values })
}
  SignUpUsers = async (data) => {
    try {


      const rules = {
        StreetAddress: 'required',
        City: 'required',
        State: 'required',
        ZipCode: 'required',
        TermsConditioncheckbox: 'required',
        isChecked: 'required'
      }
      const messages = {
        required: 'Required',

      }
      await this.GetPersonalInfo()
      await validateAll(data, rules, messages)
      if (this.state.TermsConditioncheckbox == false) {
        //alert("Please accept ther terms and condition.")
        this.setState({
          Alert_Visibility:true,
          Alert_Title:"Warning",
          Alert_Message:"Please accept the terms and condition.",
          Alert_MessageMode:"success"
        })
        return false;
      }
      if (this.state.PerFirstName == null || this.state.PerLastName == null || this.state.PerEmail == null || this.state.PerDateofBirth == null || this.state.PerGender == null || this.state.PerAgeGroup == null) {
        //Alert.alert(Error, "Please complete personal informaion first.");
        this.setState({
          Alert_Visibility:true,
          Alert_Title:"Warning",
          Alert_Message:"Please complete personal informaion first.",
          Alert_MessageMode:"success"
        })
        return false;
      }

      this.setState({
        isLoading: true
      })

      // if (this.state.isFamilyMemberShow != true &&  this.isFamilyDuplicationCheced== false) {
      //   await this.DuplicateFamilyMembers();
      //   alert( this.state.isFamilyDuplicationCheced)
      //   return false
      // }
      console.log(JSON.stringify({
        FirstName: this.state.PerFirstName,
        LastName: this.state.PerLastName,
        Email: this.state.PerEmail,
        Gender: this.state.PerGender,
        Age: this.state.PerAgeGroup,
        StreetAddress: this.state.StreetAddress,
        City: this.state.City,
        State: this.state.State,
        Zip: this.state.ZipCode,
        Familyhead: this.state.Familyhead
      }))
     //  
     //await fetch(domain + 'Customers/SignUp', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify()
      // }) // 
      
      var  objs = new Object();
      objs={
        FirstName: this.state.PerFirstName,
        LastName: this.state.PerLastName,
        Email: this.state.PerEmail,
        Gender: this.state.PerGender,
        Age: this.state.PerAgeGroup,
        StreetAddress: this.state.StreetAddress,
        City: this.state.City,
        State: this.state.State,
        Zip: this.state.ZipCode,
        Familyhead: this.state.Familyhead
      }
      await CallPI('POST','Customers/SignUp',objs,null,'',null)
      .then((response) => response.json())
        .then(responseJson => {

          if (responseJson.CustomerAlreadyExist != null && responseJson.CustomerAlreadyExist != '') {
            this.setState({
              isLoading: false
            })
            this.setState({
              Alert_Visibility:true,
              Alert_Title:"Alert",
              Alert_Message: responseJson.CustomerAlreadyExist,
              Alert_MessageMode:"success",
              isSendEmailToExistUsre:true,
              ExisUserID:responseJson.UserID
            })

            // Alert.alert(
            //   "",
            //   responseJson.CustomerAlreadyExist,
            //   [
            //     {
            //       text: "Cancel",
            //       onPress: () => console.log("Cancel Pressed"),
            //       style: "cancel"
            //     },
            //     { text: "OK", onPress: () => this.SendEmailToExistUser(responseJson.UserID) }
            //   ],
            //   { cancelable: false }
            // );
            return false;
          }
          if (responseJson["Message"] != null && responseJson["Message"] != "") {
            this.removeItemValue('perFirstName');
            this.removeItemValue('perFirstName');
            this.removeItemValue('perLastName');
            this.removeItemValue('perEmail');
            this.removeItemValue('perDateofBirth');
            this.removeItemValue('perGender');
            this.removeItemValue('perAgeGroup');
            this.setState({
              isLoading: false
            })
            //Alert.alert("Success", responseJson["Message"])
            this.setState({
              Alert_Visibility:true,
              Alert_Title:"Success",
              Alert_Message:  responseJson["Message"],
              Alert_MessageMode:"success",
               
            })
            this.props.navigation.goBack("Signup");

          }

        }).catch(error => {

        });

    }
    catch (errors) {
      // console.warn(errors)
      const formattedErrors = {}
      errors.forEach(error => formattedErrors[error.field] = error.message);
      this.setState({
        error: formattedErrors
      })
    }
  }

  GetPersonalInfo = async () => {

    const perFirstName = (await AsyncStorage.getItem('perFirstName'));
    const perLastName = await AsyncStorage.getItem('perLastName');
    const perEmail = await AsyncStorage.getItem('perEmail');
    const perDateofBirth = await AsyncStorage.getItem('perDateofBirth');
    const perGender = await AsyncStorage.getItem('perGender');
    const perAgeGroup = await AsyncStorage.getItem('perAgeGroup');

    this.setState({
      PerFirstName: perFirstName,
      PerLastName: perLastName,
      PerEmail: perEmail,
      PerDateofBirth: perDateofBirth,
      PerGender: perGender,
      PerAgeGroup: perAgeGroup,
    })
  }
  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch (exception) {
      return false;
    }
  }
  async TermAndCondition() {
    try {

      this.props.navigation.navigate("SignupTermsConditions");
    }
    catch (exception) {
      return false;
    }
  }
  async DuplicateFamilyMembers() {
    var lastname = this.state.PerLastName;
    var email = this.state.PerEmail;
    var address = this.state.StreetAddress;

    FamilyMembers = [];


    var url = `Customers/GetDuplicateFamilyMembers?lastname=${lastname}&email=${email}&address=${address}`;
    // await fetch(url, {
    //   method: "GET",
    // })
    await CallPI('GET',url,null,null,'',null)
    .then((response) => response.json())
      .then(responseJson => {
        if (responseJson.IsDuplicatePerson == true) 
        {
          // AsyncStorage.setItem('FamilyMemberScreen', responseJson.FamilyMembers);
          console.log(JSON.stringify(responseJson.FamilyMembers))
          for (let userObject of responseJson.FamilyMembers) {

            FamilyMembers.push({ label: userObject.Name + ' ' + userObject.Suffix + '-' + userObject.Address, value: userObject.ID,isSelected:false });
          }

          FamilyMembers.push({ label: 'None', value: '' });

          this.setState({
            isLoading: false,
            isFamilyMemberShow: true,
            isFamilyDuplicationCheced: true,
            FamilyMembersList:FamilyMembers
          })

        }
        else {

          this.setState({
            isLoading: false,
            isFamilyDuplicationCheced: true,
            isFamilyMemberShow: false,
          })
        }

      }).catch(error => {
        this.setState({
          isLoading: false,
          isFamilyDuplicationCheced: true
        })
      });

  }

  async SendEmailToExistUser(userID) {

    var url =    `Customers/SendEmailToExistUser?emailToCustomerID=${userID}`;
    // await fetch(url, {
    //   method: "GET",
    // })
    await CallPI('GET',url,null,null,'',null)
    this.setState({
      isLoading: false,
    })
  }
  _SetFamilyhead(value) {
    this.setState({
      Familyhead: value
    })

  }
  async updateStreetAddess() {

    await this.GetPersonalInfo()
    if (this.state.PerFirstName == null || this.state.PerLastName == null || this.state.PerEmail == null || this.state.PerDateofBirth == null || this.state.PerGender == null || this.state.PerAgeGroup == null) {
      //Alert.alert(Error, "Please complete personal informaion first.");
      this.setState({
        Alert_Visibility:true,
        Alert_Title:"Alert",
        Alert_Message:  "Please complete personal informaion first.",
        Alert_MessageMode:"error",
         
      })
      return false;
    }

    await this.DuplicateFamilyMembers();

  }
  SetCustomerState= val=> {
    this.setState({
      State: val
    })
  }
  ChangescheckboxValues=()=> {
    //alert(this.state.TermsConditioncheckbox)
    this.setState({
      TermsConditioncheckbox: !this.state.TermsConditioncheckbox
    })
  }
  rederItems = ({ item, index }) => {
    return (
      <TouchableOpacity style={{ backgroundColor: index % 2 === 0 ? '#f5f4f2' : 'white', flexDirection: 'row', margin: 5, padding: 5 }} onPress={() => { this.SelectFamilyMember(index) }}>
        {
          <RadioButton props={item.isSelected} />
        }
        <Text> {item.label}</Text>
      </TouchableOpacity>
    )
  }
  SelectFamilyMember =   (index) => {
    const array = [...this.state.FamilyMembersList];
    var value = array[index]['value'];
    for (var i =0 ;i<array.length; i++ )
    {
   
     if(i==index){
       array[i]['isSelected'] = !array[i]['isSelected']
     }
     else{
       array[i]['isSelected'] =false;
     }}
       this.setState({ FamilyMembersList: array })
       this._SetFamilyhead(value)
   }

 async GetStateList()
 {

  var url =   `Common/GetStates?state=""`;
    await CallPI('GET',url,null,null,'',null)
    .then((response) => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson))
        this.setState({
          StateList:responseJson
       })

      }).catch(error => {
       //alert(error)
      });
      
  }
  async componentDidMount() {
this.GetStateList()

   
  }
  render() {
    return (

      <View style={styles.Pagecontainer}>
      
        <Loader loading={this.state.isLoading} />
        <AlertBox

displayMode={this.state.Alert_MessageMode}
MessageType={''} 
displayMsg={this.state.Alert_Message}
Title={this.state.Alert_Title}
visibility={this.state.Alert_Visibility}
dismissAlert={this.dismissAlert}
CancelAlert = {this.CancelAlert}

/>
        <View style={[styles.container]}>
          <ScrollView >
          <View style={styles.inputContainer}>
          <Text style={[styles.font_12 ,{ textAlign: 'center', color: '#415717', fontWeight: 'bold' }]}>Fill the below form</Text>

            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>
                <TextInput style={styles.inputs}
                  placeholder="Street Address"
                  value={this.state.StreetAddress}
                  onChangeText={(StreetAddress) => this.setState({ StreetAddress })}
                  onEndEditing={() => this.updateStreetAddess({})}
                />
              </View>
              <View>
                {
                  this.state.error['StreetAddress'] && <Text style={styles.ErrorMessage}>{this.state.error['StreetAddress']}</Text>
                }
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>
                <TextInput style={styles.inputs}
                  placeholder="City"

                  value={this.state.City}
                  onChangeText={(City) => this.setState({ City })}
                />
              </View>
              <View >

                {
                  this.state.error['City'] && <Text style={styles.ErrorMessage}>{this.state.error['City']}</Text>

                }
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.DropDownInnerContainer}>

              <DropdownList
          OptionList={this.state.StateList}
          PlaceHolderText={"State"}
          selectedValue={this.state.State}
           setValue={this.SetCustomerState}
          />
                

              </View>
              <View >
                {
                  this.state.error['State'] && <Text style={styles.ErrorMessage}>{this.state.error['State']}</Text>
                }
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>
                <TextInput style={styles.inputs}
                  placeholder="Zip Code"
                  underlineColorAndroid='transparent'
                  keyboardType='numeric'
                  maxLength={5}
                  value={this.state.ZipCode}
                  onChangeText={(ZipCode) => this.setState({ ZipCode })}
                />
              </View>
              <View >
                {
                  this.state.error['ZipCode'] && <Text style={styles.ErrorMessage}>{this.state.error['ZipCode']}</Text>
                }
              </View>
            </View>
            <View style={styles.Checkboxcontainer}>              
              <CheckBox
              styles={{margin:0}}
                title={"Please accept the terms & conditions"}
                checked={this.state.TermsConditioncheckbox}
                setValue={this.ChangescheckboxValues}
                />
                {/* style={styles.TermsConditionsCheckbox}
                onFillColor={'#415717'}
                tintColors={{ true: '#415717' }}
                 
                value={this.state.TermsConditioncheckbox}
                onChange={() => this.ChangescheckboxValues()} />
              <Text style={{ marginBottom: '1%' , fontSize:10, flex: 1, flexWrap: 'wrap'}} onPress={() => this.TermAndCondition()}>Please accept the terms & conditions </Text>
         */}
            </View>

            {
               this.state.isFamilyMemberShow &&
           
              <Card containerStyle={{padding: 3 ,borderTopWidth:3, borderTopColor:"#213749", margin:1}}  >
                <Text>
                    <Text style={{ color: 'red', flex: 1,flexWrap: 'wrap', fontWeight: "bold" }}>NOTE:</Text> 
                    If you or anyone in your family already has a login, DO NOT create a New User here. Use Login screen.
                  </Text>
                  <Text style={{ color: 'red', flexWrap: 'wrap', fontWeight: "bold" }}>
                    Please review the existing user(s) in our system listed below.
                  </Text>
                  <Text style={{ flexWrap: 'wrap',}}>
                    If you are listed as an existing user: Please
                    <Text style={{ fontWeight: "bold", flexWrap: 'wrap',  }}> DO NOT </Text>
                    click ‘Sign Up’. Use Login screen and retrieve credentials.
                  </Text>
                  <Text style={{flex: 1, flexWrap: 'wrap',}}>
                    If you only recognize a family member, and want to add a New User to family: Make a selection before clicking ‘Sign Up’.
                  </Text>
                  <Text>
                    Select <Text style={{ fontWeight: "bold",flexWrap: 'wrap', }}>None</Text> before clicking “Sign Up’ to create an unrelated New User..
                  </Text>
                  <View style={{marginTop:5}}>
                    
                 <FlatList 
                        data={this.state.FamilyMembersList}

                        renderItem={this.rederItems}

                    
                        keyExtractor={(item, index) => index.toString()}
                       
                    />
                    
                    </View>

              {/* <View style={{ borderTopColor: 'black', borderTopWidth: 1, }}>
                <View style={{  flexDirection: 'row', alignContent: 'center', justifyContent: 'center',  }} >
                  
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', width: 350, }} >
                 
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', width: 350, }} >
                 
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', width: 350, }} >
               
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', width: 350, }} >

                 
                </View>
                <View style={{ borderTopColor: 'black', borderTopWidth: 1, marginTop: '5%' }}>
                  <RadioForm
                    radio_props={FamilyMembers}
                    initial={false}
                    circleSize={0}
                    initial={false}
                    buttonColor={'#50C900'}
                    formHorizontal={false}
                    labelHorizontal={true}
                    buttonSize={10}
                    buttonOuterSize={20}
                    thickness={10}
                    buttonWrapStyle={{ margin: 100 }}
                    radioStyle={{ paddingRight: 20 }}
                    buttonInnerColor={'50C900'}
                    style={{ marginTop: '5%' }}
                    onPress={(value) => this._SetFamilyhead(value)}
                  />
                </View>
              </View> */}
           </Card>
            }
            <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.SignUpUsers(this.state)} >
              <Text style={styles.buttunTextColo}>Submit</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      
      </View>
      
    );

  }

}






export default function UserInformation() {
  return (

    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}

    //  tabStyle= {{
    //   backgroundColor: 'black',
 
    //  }}
    //  tabBarOptions={{
    //   activeTintColor: 'white',
    //   inactiveTintColor: 'grey',
    //   showLabel: true,
      
    //   tabStyle: {
    //     backgroundColor: 'black',
   
    //   },
    //   style: {
    //     backgroundColor: 'red',
    //     borderTopColor: "transparent",
      
    //   },
    // }}
    //  screenOptions={({ route }) => ({
    //    tabBarLabel: ({ tintColor, focused, item }) => {
    //  return focused
    //    ? 
       
    //    (
    //    <Text style={[styles.font_15,styles.fontFamily,{ fontWeight: 'bold',  color:'white' , flex:1,flexWrap:'wrap'}]} >
    //      {
    //      route.name=="Personalinfo"?
    //      "Personal":
    //        "Address" 
     
    //      }
    //      </Text>)
     
    //    : (<Text style={[styles.font_15,styles.fontFamily,{ fontWeight: 'normal',  color:'white' , flex:1,flexWrap:'wrap'}]} >
    //     {
    //    route.name=="Personalinfo"?
    //    "Personal":
    //      "Address" 
     
    //    }
        
         
    //      </Text>
    //    )
    //  },
       
    //  })}
    //  tabBarOptions={{
       
    //    indicatorStyle: { backgroundColor: 'white' ,   },
    //    style: {
    //      backgroundColor: '#415717',
         
    //     // fontWeight:'bold'
    //    }
    //  }}
     >
         <Tab.Screen name="Personalinfo" component={PersonalInfo}
       options={{tabBarLabel:'Personal'}}
      />
      <Tab.Screen name="AddressInfos" component={AddressInfo}   options={{tabBarLabel:'Address'}} />
     
     </Tab.Navigator>
  
  );
}
 

