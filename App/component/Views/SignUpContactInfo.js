import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
 
  ScrollView


} from 'react-native';
import CheckBox from '@react-native-community/checkbox'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import RadioForm from 'react-native-simple-radio-button'
 //import ModalDropdown from 'react-native-modal-dropdown';
import AsyncStorage from "@react-native-async-storage/async-storage";
 
import { validateAll } from 'indicative/validator'
import {CallPI} from '../../../App/Api/APICall'
import styles from '../../Stylesheets/SignupSS'
import {Picker} from '@react-native-community/picker'
import Loader from '../../../App/component/Loader'
import Calender from '../../../App/component/Views/Shared/DatePicker'

//import CheckBox from '../../component/Views/Shared/CheckBox';
 

 export default  class AddressInfo extends React.Component {

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
      StateList:[],
      isFamilyMemberShow: false,
      isFamilyDuplicationCheced: false,

    }

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
      if (this.state.TermsConditioncheckbox == false)
      {
        alert("Please accept ther terms and condition.")
        return false;
      }
      if (this.state.PerFirstName == null || this.state.PerLastName == null || this.state.PerEmail == null || this.state.PerDateofBirth == null || this.state.PerGender == null || this.state.PerAgeGroup == null) {
        Alert.alert(Error, "Please complete personal informaion first.");
        return false;
      }

      this.setState({
        isLoading: true
      })

      
    
      // await fetch(domain+'Customers/SignUp', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify()
      // })
      var body =  new Object();
      body=  {
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
      await CallPI('POST','Customers/SignUp',body,null,'',null)
      .then((response) => response.json())
        .then(responseJson => {

          if (responseJson.CustomerAlreadyExist != null && responseJson.CustomerAlreadyExist != '') {
            this.setState({
              isLoading: false
            })
            Alert.alert(
              "",
              responseJson.CustomerAlreadyExist,
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => this.SendEmailToExistUser(responseJson.UserID) }
              ],
              { cancelable: false }
            );
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
            Alert.alert("Success", responseJson["Message"])
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
  async  removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch (exception) {
      return false;
    }
  }
  async  TermAndCondition() {
    try {

      this.props.navigation.navigate("SignupTermsConditions");
    }
    catch (exception) {
      return false;
    }
  }
  async  DuplicateFamilyMembers() {
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
        if (responseJson.IsDuplicatePerson == true) {
          // AsyncStorage.setItem('FamilyMemberScreen', responseJson.FamilyMembers);
          for (let userObject of responseJson.FamilyMembers) {

            FamilyMembers.push({ label: userObject.Name + ' ' + userObject.Suffix + '-' + userObject.Address, value: userObject.ID });
          }
          
          FamilyMembers.push({ label: 'None', value: '' });

          this.setState({
            isLoading: false,
            isFamilyMemberShow: true,
            isFamilyDuplicationCheced:true
          })

        }
        else {

          this.setState({
            isLoading: false,
            isFamilyDuplicationCheced:true,
            isFamilyMemberShow: false,
          })
        }

      }).catch(error => {
        this.setState({
          isLoading: false,
          isFamilyDuplicationCheced:true
        })
      });

  }

  async SendEmailToExistUser(userID) {

    var url = `Customers/SendEmailToExistUser?emailToCustomerID=${userID}`;
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
  async updateStreetAddess(){

    await this.GetPersonalInfo()
if (this.state.PerFirstName == null || this.state.PerLastName == null || this.state.PerEmail == null || this.state.PerDateofBirth == null || this.state.PerGender == null || this.state.PerAgeGroup == null) {
  Alert.alert(Error, "Please complete personal informaion first.");
  return false;
}

await this.DuplicateFamilyMembers();

  }
  SetCustomerState(val){
    this.setState({
      State:val
    })
  }
  ChangescheckboxValues(){

    
    this.setState({
      TermsConditioncheckbox: !this.state.TermsConditioncheckbox
    })
  }
 async componentDidMount()
  {
    // alert('ttt')
     var url =  `Common/GetStates?state=""`;
     console.log('ttt  '+ url)
    //  await fetch(url, {
    //      method: "GET",
    //  })
     await CallPI('GET',url,null,null,'',null)
         .then(response => response.json())
         .then(responseJson => {
     alert(JONS.stringify(responseJson))
             this.setState({
                 StateList: responseJson
             })

         }
         ).catch(error => {

         });
  }
  render() {
    return (

      <View style={styles.Adresscontainer}>
        <Loader loading={this.state.isLoading} />
          <View style={[styles.container]}>
        <ScrollView>
            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>
                <TextInput style={styles.inputs}
                  placeholder="Street Address"
                  value={this.state.StreetAddress}
                  onChangeText={(StreetAddress) => this.setState({ StreetAddress })}
                  onEndEditing={() => this.updateStreetAddess({ })}
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


                                    <Picker  selectedValue={this.state.State} onValueChange={(itemValue, itemIndex) => this.SetCustomerState(itemValue)}>
                                    <Picker.Item label='Please select state' value='' key='' color='gray' />
                                    {
                                        this.state.StateList.map((v) => {
                                            return <Picker.Item label={v.label} value={v.value} key={v.value} />
                                        })
                                    }
                                </Picker>
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
                style={styles.TermsConditionsCheckbox}
                value={this.state.TermsConditioncheckbox} 
                onChange={() => this.ChangescheckboxValues()} />
              <Text style={{ marginBottom: '1%' }} onPress={() => this.TermAndCondition()}>Please accept the terms & conditions </Text>
            </View>
            {
                 this.state.isFamilyMemberShow &&

              <View style={{ borderTopColor : 'black',  borderTopWidth: 1,}}>
                <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', width: 350, }} >
                  <Text>
                    <Text style={{ color: 'red', fontWeight: "bold" }}>NOTE:</Text> If you or anyone in your family already has a login, DO NOT create a New User here. Use Login screen.
                     </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', width: 350, }} >
                  <Text style={{ color: 'red', fontWeight: "bold" }}>
                    Please review the existing user(s) in our system listed below.
                   </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', width: 350, }} >
                  <Text>
                    If you are listed as an existing user: Please
                     <Text style={{ fontWeight: "bold" }}> DO NOT </Text>
                      click ‘Sign Up’. Use Login screen and retrieve credentials.
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', width: 350, }} >
                    <Text>
                    If you only recognize a family member, and want to add a New User to family: Make a selection before clicking ‘Sign Up’.
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', width: 350, }} >

                  <Text>
                    Select <Text style={{ fontWeight: "bold" }}>None</Text> before clicking “Sign Up’ to create an unrelated New User..
                   </Text>
                </View>
                <View  style={{ borderTopColor : 'black',  borderTopWidth: 1,marginTop: '5%' }}>
                  <RadioForm
                    radio_props={FamilyMembers}
                    initial={false}
                    circleSize={0}
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
                    onPress={(value) => this._SetFamilyhead(value)}
                  />
                </View>
              </View>
            }
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.SignUpUsers(this.state)} >
              <Text style={styles.loginText}>Submit</Text>
            </TouchableHighlight>

        </ScrollView>
          </View>
      </View>
    );

  }

}





 

 