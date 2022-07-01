import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,

  ScrollView
} from 'react-native';

import RadioForm from 'react-native-simple-radio-button';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CallPI } from '../../../../Api/APICall';
import { validateAll } from 'indicative/validator'
import styles from '../../../../Stylesheets/NAppSS'
import Loader from '../../../Loader'

import Calender from '../../Shared/DatePicker'
import { CommonActions } from '@react-navigation/native';
import Moment from 'moment';
import DropdowList from '../../Shared/DropdownList'

export default class PersonalInfo extends React.Component {

  constructor(props) {
    super(props)
  }
  state = {
    FirstName: 'test',
    LastName: '',
    Email: '',
    DateofBirth: '',
    Gender: '',
    Suffix: '',
    AgeGroup: '',
    UserID: '',
    error: {},
    Initail: '',



    SuffixData: [],


    GenderData: [{
      value: 'M',
      label: 'Male'
    }, {
      value: 'F',
      label: 'Female'
    }],
    SuffixData: [],


    rbdagegroup: [{
      value: 'A',
      label: 'Adult'
    }, {
      value: 'J',
      label: 'Junior'
    }],
    isLoading: false

  }

  Gender = (value) => {
    this.setState({
      Gender: value
    })

  }
  SuffixList = (value) => {
    this.setState({
      Suffix: value
    })
  }
  _SetAgeGroup = (value) => {

    this.setState({
      AgeGroup: value
    })

  }
  NextSignUp = async (data) => {
    //alert(11)
    try {
     
      const rules = {
        FirstName: 'required|string|max:20',
        LastName: 'required|string|max:20',
        Email: 'required|email',
        DateofBirth: 'required',
        Gender: 'required',
        AgeGroup: 'required',

        //Ability: 'required',
      }
      const messages = {
        required: 'Required',
        email: 'The email is invalid.',
        max: '{{ field }} should be less than 20 character.'
      }
      await validateAll(data, rules, messages)
     // alert(2)
      await this.SetPersonalInfo();

      this.props.navigation.navigate("ContactInformation")
    }
    catch (errors) {
     // alert(error.message)
      const formattedErrors = {}
      errors.forEach(error => formattedErrors[error.field] = error.message);
      this.setState({
        error: formattedErrors
      })
    }
  }


  async GetProfileInfo() {

    var userID = null;
    var LoginUserID = await AsyncStorage.getItem('LoginUserID');;
    userID = await AsyncStorage.getItem('FamilyMemberID');
    if (userID == null) {
      userID = LoginUserID;
    }




    var url =   `Customers/MyProfile?customerProfileID=${userID}`;
    // await fetch(url, {
    //   method: "GET",
    // })
    await  CallPI("GET",url,null,null,'',null)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          LastName: responseJson.LastName,
          UserID: responseJson.ID,
          Initail: '',//responseJson.MI,
          Email: responseJson.Email,

          DateofBirth: '',
        })
      }
      ).catch(error => {
      });
    this.setState({
      isLoading: false
    })
  }
  async GetSuffix() {

    var url =   `Common/GetSuffix?suffix=""`;
    // fetch(url, {
    //   method: "GET",
    // })
    await  CallPI("GET",url,null,null,'',null)
      .then(response => response.json())
      .then(responseJson => {

        this.setState({
          SuffixData: responseJson
        })

      }
      ).catch(error => {

      });
  }

  componentDidMount() {
    // this.setState({
    //   isLoading: true
    // })

    this.GetSuffix()
    this.GetProfileInfo()
  }
  AddFamilyMember() {
    this.props.navigation.dispatch(
      CommonActions.navigate({
        name: 'CurrentFamilyMembers',
      })
    );
    //this.props.navigation.navigate('CurrentFamilyMembers')
  }
  SetPersonalInfo = async () => {
    await AsyncStorage.setItem('FamilyPersonFirstName', this.state.FirstName.toString());
    await AsyncStorage.setItem('FamilyPersonLastName', this.state.LastName.toString());
    await AsyncStorage.setItem('FamilyPersonInitail', this.state.Initail.toString());
    await AsyncStorage.setItem('FamilyPersonSuffix', this.state.Suffix.toString());
    await AsyncStorage.setItem('FamilyPersonEmail', this.state.Email.toString());
    await AsyncStorage.setItem('FamilyPersonID', this.state.UserID.toString());
    await AsyncStorage.setItem('FamilyPersonDateofBirth', this.state.DateofBirth);
    await AsyncStorage.setItem('FamilyPersonGender', this.state.Gender.toString());
    await AsyncStorage.setItem('FamilyPersonAgeGroup', this.state.AgeGroup.toString());


  }
  render() {

    return (
      <View style={styles.Pagecontainer}>
        <View style={styles.container}>
          <Loader loading={this.state.isLoading} />
          <ScrollView  >

            <View style={[styles.inputContainer]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '65%' }}>
                  <View style={styles.inputInnerContainer}>
                    <TextInput style={[styles.inputs]}
                      placeholder="First Name"
                      value={this.state.FirstName}
                      underlineColorAndroid='transparent'
                      onChangeText={(FirstName) => this.setState({ FirstName })}

                    />
                  </View>
                </View>
                <View style={{ width: '33%' }}>
                  <View style={styles.inputInnerContainer}>

                    <TextInput
                    style={[styles.inputs]}
                      placeholder="Initail"
                      value={this.state.Initail}
                      underlineColorAndroid='transparent'
                      onChangeText={(Initail) => this.setState({ Initail })}

                    />
                  </View>
                </View>
              </View>
              <View >
                {
                  this.state.error['FirstName'] && <Text style={styles.ErrorMessage}>{this.state.error['FirstName']}</Text>
                }
              </View>

            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>

                <TextInput style={[styles.inputs]}
                  placeholder="Last Name"
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
              <View style={styles.DropDownInnerContainer}>
                <DropdowList
                  OptionList={this.state.SuffixData}
                  PlaceHolderText={"Suffix"}
                  selectedValue={this.state.Suffix}
                  setValue={this.SuffixList}

                />
                {/* <RNPickerSelect
        
        onValueChange={(value) => this.SuffixList(value)} 
      value={this.state.Suffix}
      placeholder={{ label: "Please select suffix", value: "" }}
      items={  this.state.SuffixData}
  /> */}


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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>
                  <View style={{ width: '88%' }}>
                    <TextInput style={styles.inputs}
                      placeholder="Date of Birth"
                      value={this.state.DateofBirth}
                    />

                  </View>
                  <View style={{ width: '12%' ,}}>
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
                <DropdowList
                  OptionList={this.state.GenderData}
                  PlaceHolderText={"Gender"}
                  selectedValue={this.state.Gender}
                  setValue={this.Gender}

                />
                {/* <RNPickerSelect
        
        onValueChange={(value) => this.Gender(value)} 
      value={this.state.Gender}
      placeholder={{ label: "Please select gender", value: "" }}
      items={  this.state.GenderData}
  /> */}

              </View>
              <View >

                {
                  this.state.error['Gender'] && <Text style={styles.ErrorMessage}>{this.state.error['Gender']}</Text>
                }
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.DropDownInnerContainer}>
                <DropdowList
                  OptionList={this.state.rbdagegroup}
                  PlaceHolderText={"Age"}
                  selectedValue={this.state.AgeGroup}
                  setValue={this._SetAgeGroup}

                />
              </View>
              <View >

                {
                  this.state.error['AgeGroup'] && <Text style={styles.ErrorMessage}>{this.state.error['AgeGroup']}</Text>
                }

              </View>
            </View>

          </ScrollView>
          <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.NextSignUp(this.state)} >
            <Text style={styles.buttunTextColo}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>



    );

  }

}

