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
  ScrollView,
  Platform,

} from 'react-native';

 
import AsyncStorage from "@react-native-async-storage/async-storage";
 
import { validateAll } from 'indicative/validator'
import Calender from '../../../../../App/component/Views/Shared/DatePicker'
import styles from ' ../../../App/Stylesheets/NAppSS'
import DropdownList from '../../Shared/DropdownList';
import {CallPI} from '../../../../Api/APICall'
 
import Loader from '../../../../../App/component/Loader'
 
 
import Moment from 'moment';
 
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
 



export default class PersonalInfo extends React.Component {
  constructor(props) {
    super(props)

  }
  state = {
    FirstName: '',
    LastName: '',
    Email: '',
    DateofBirth: '',
    Gender: '',
    Suffix: '',
    AgeGroup: '',
    error: {},
    Participant: '',
    USTARating: '',
    Ability: '',
    Participantdata: [],
    SuffixData: [],
    USTARatingData: [],
    AbilityData: [],
    GenderData: [{
      value: 'M',
      label: 'Male'
    }, {
      value: 'F',
      label: 'Female'
    }],
    isLoading: false,
    rbdagegroup: [{
      value: 'A',
      label: 'Adult'
    }, {
      value: 'J',
      label: 'Junior'
    }],
    IsChangeFamilymember:false,
    isUpdatePersonProfileUpdated :  false,
    RegistrationScreenName :'',
    RegistrationScreenPath :''

  }

  Gender = value => {
    this.setState({
      Gender: value
    })
    this.ResetValidationError('Gender')
    this.SetPersonalInfo()
  }

  FamilyMembers =   (value) => {
 
if(Platform.OS === 'ios'){
  //alert('OS')

  this.SetParticipantSelectedID(value)
  this.props.navigation.reset({ routes: [{ name: 'Profiled' }]})
}
else{


    
if( this.state.IsChangeFamilymember==true)
{
 
 this.SetParticipantSelectedID(value)
 this.props.navigation.reset({ routes: [{ name: 'Profiled' }]})
}
else{

//this.setState({IsChangeFamilymember:true})

  setTimeout(() => {
    
    this.setState({IsChangeFamilymember:true})
  }, 3000);
}}

  
  }
  async  SetParticipantSelectedID (value){
    await AsyncStorage.setItem('ParticipantSelectedID', value.toString());
   
  }
  AbilityList = value => {

    this.setState({
      Ability: value
    })
;
this.ResetValidationError('Ability')
    this.SetPersonalInfo()
  }

  ResetValidationError(fieldName){
    this.state.error[fieldName] = null;
  }

  USTARatingList = value => {
    this.setState({ USTARating: value })
    this.ResetValidationError('USTARating')
    this.SetPersonalInfo()
  }
  SuffixList = value => {
//alert("suff")
    this.setState({
      Suffix: value
    })
    this.SetPersonalInfo()
  }
  _SetAgeGroup = value => {

    this.setState({
      AgeGroup: value
    })
    this.ResetValidationError('AgeGroup')
    this.SetPersonalInfo()
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
        USTARating: 'required',
        Ability: 'required',
      }
      const messages = {
        required: 'Required',
        email: 'The email is invalid.',
        max: '{{ field }} should be less than 20 character.'
      }
      this.SetPersonalInfo()
      await validateAll(data, rules, messages)
      this.props.navigation.navigate("ContactInfo")
    }
    catch (errors) {

      const formattedErrors = {}
      errors.forEach(error => formattedErrors[error.field] = error.message);
      this.setState({
        error: formattedErrors
      })

    }

  }


  SetPersonalInfo = async () => {
     await AsyncStorage.setItem('perFirstName', this.state.FirstName.toString());
     await AsyncStorage.setItem('perLastName', this.state.LastName.toString());
   
     await AsyncStorage.setItem('perEmail', this.state.Email.toString());
     await AsyncStorage.setItem('perParticipant', this.state.Participant.toString());
     await AsyncStorage.setItem('perDateofBirth', this.state.DateofBirth);
     await AsyncStorage.setItem('perGender', this.state.Gender.toString());
     await AsyncStorage.setItem('perAgeGroup', this.state.AgeGroup.toString());
     await AsyncStorage.setItem('perAbility', this.state.Ability.toString());
  
if(this.state.USTARating!= null && this.state.USTARating!= '')
{ await AsyncStorage.setItem('perUSTARating', this.state.USTARating.toString());}
if(this.state.Initail!= null && this.state.Initail!= '')
{ await AsyncStorage.setItem('perInitail', this.state.Initail.toString());}
 
    // await AsyncStorage.setItem('perSuffix', this.state.Suffix.toString());

  }
  async GetProfileInfo() 
  {
    var LoginUserID = null;
    var personselectedID = await AsyncStorage.getItem('ParticipantSelectedID');

    var regIncompletePersonID = await AsyncStorage.getItem('RegIncompleteProfilePerson');
   // alert("regIncompletePersonID===================  "+ regIncompletePersonID);
    if(regIncompletePersonID!= null && regIncompletePersonID !='')
    {
      
      
      LoginUserID = regIncompletePersonID;
      var isupdateProfileFromReg = await AsyncStorage.getItem('ISupdateProfileFromReg');
      //alert("isupdateProfileFromReg==== " +isupdateProfileFromReg )
      if(isupdateProfileFromReg!= null && isupdateProfileFromReg ==="true")
      {
      //  alert("inner==== " +isupdateProfileFromReg )
        var registrationScreenName=   await AsyncStorage.getItem('RegistrationScreen');
        this.setState({
          isUpdatePersonProfileUpdated:true,
          RegistrationScreenName: registrationScreenName.split(',')[1],
          RegistrationScreenPath: registrationScreenName.split(',')[0]
        })

         await AsyncStorage.removeItem('RegIncompleteProfilePerson');
        await AsyncStorage.removeItem('RegistrationScreen');
        await AsyncStorage.removeItem('ISupdateProfileFromReg');
      }
      
    }
    else
    {
    if (personselectedID != null)
    {
      LoginUserID = personselectedID;
    }
    else
    {
      LoginUserID = await AsyncStorage.getItem('LoginUserID');
    }
  }
 
 

    var url =   `Customers/MyProfile?customerProfileID=${LoginUserID}`;
    this.setState({
      isLoading: true
    })
    await  CallPI("GET",url,null,null,'',null)
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson))
        if (responseJson.AgeGroup != null) {
          if (responseJson.AgeGroup == "A") {
            this.setState({
              AgeGroup: 'A'
            })
          }
          else {
            this.setState({
              AgeGroup: 'J'
            })
          }
        }

        this.setState({
          FirstName: responseJson.FirstName,
          LastName: responseJson.LastName,
          Participant: responseJson.ID,
          Suffix: responseJson.Suffix,
          Initail: responseJson.MI,
          USTARating: responseJson.UstaRating === null ? "" : responseJson.UstaRating.toString(),
          Ability: responseJson.Ability === null ? "" : responseJson.Ability.toString(),
          Email: responseJson.Email,
          DateofBirth: responseJson.BirthdayDate === null ? "" : Moment(responseJson.BirthdayDate).format('MM/DD/YYYY'),
          Gender: responseJson.Gender,
        isLoading:false
        })
      }).catch(error => {
        this.setState({
          isLoading: false
        })
      });

    await this.SetPersonalInfo()
    this.setState({
      isLoading: false
    })
  }

  async Participant() {

    const LoginUserID = await AsyncStorage.getItem('LoginUserID');
    var FamilyMembers = [];
    var url =   `Customers/GetFamilyMembers?familyMemberID=${LoginUserID}`;
    // fetch(url, {
    //   method: "GET",
    // })
    await  CallPI("GET",url,null,null,'',null)
      .then(response => response.json())
      .then(responseJson => {
        for (let userObject of responseJson) {
          FamilyMembers.push({ label: userObject.Name, value: userObject.Value });
        }
        this.setState({
          Participantdata: FamilyMembers
        })

      }
      ).catch(error => {

      });
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
  async GetAbility() {

    var url =   `Common/GetAbility?ability=""`;
    // fetch(url, {
    //   method: "GET",
    // })
    await  CallPI("GET",url,null,null,'',null)
      .then(response => response.json())
      .then(responseJson => {

        this.setState({
          AbilityData: responseJson
        })
      }
      ).catch(error => {
      });
  }
  async GetUSTARatingData() {

    var url =   `Common/GetUstaRatingList?ustarating=""`;
    // fetch(url, {
    //   method: "GET",
    // })
    await  CallPI("GET",url,null,null,'',null)
      .then(response => response.json())
      .then(responseJson => {

        this.setState({
          USTARatingData: responseJson
        })
      }
      ).catch(error => {
      });
  }
  async componentDidMount() {
  // var ss= await  profileUSed();
  //  alert("network=="+ ss)
  
    // this.setState({
    //   isLoading: true
    // })
    this.Participant()
    this.GetSuffix()
    this.GetAbility()
    this.GetUSTARatingData()
    this.GetProfileInfo()
    // this.setState({
    //   isLoading: false
    // })


  }
  AddFamilyMember() {
    this.props.navigation.navigate('CurrentFamilyMembers')
  }
 async  RedireactToReistration() 
 {
 
    await AsyncStorage.setItem('UpdatedPersonProfileID', this.state.Participant.toString())
  this.props.navigation.reset({ routes: [{ name: this.state.RegistrationScreenPath }] });
   
  }
  render() {

    return (
      <View style={styles.Pagecontainer}>
        <View style={styles.container}>
          <Loader loading={this.state.isLoading} />  

          <ScrollView style={{ height: hp('70%') }}>
            <View>
         {
            this.state.isUpdatePersonProfileUpdated===true ? 
            <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.RedireactToReistration()} >
            <Text style={styles.buttunTextColo}>Continue with {this.state.RegistrationScreenName} </Text>
          </TouchableOpacity>: null
         }
              <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.AddFamilyMember()} >
                <Text style={styles.buttunTextColo}>Add Family Member </Text>
              </TouchableOpacity>

              <View style={styles.inputContainer}>
                <View style={styles.DropDownInnerContainer}>
  
                   
                  <DropdownList
                    OptionList={this.state.Participantdata}
                    PlaceHolderText={"Participant"}
                    selectedValue={this.state.Participant}
                    setValue={this.FamilyMembers}
                  />     
                </View>
                <View >

                  {
                    this.state.error['Participant'] && <Text style={styles.ErrorMessage}>{this.state.error['Participant']}</Text>
                  }
                </View>
              </View>

              <View style={[styles.inputContainer]}>



                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ width: '65%' }}>
                    <View style={[styles.inputInnerContainer]}>
                      <TextInput style={[styles.inputs]}
                        placeholder="First Name"
                        value={this.state.FirstName}
                        underlineColorAndroid='transparent'
                        onChangeText={(FirstName) => this.setState({ FirstName })}
                        onEndEditing={() => this.SetPersonalInfo()}
                      />
                    </View>
                  </View>
                  <View style={{ width: '33%' }}>
                    <View style={styles.inputInnerContainer}>
                      <TextInput style={[styles.inputs]}
                        placeholder="Initail"
                        value={this.state.Initail}
                        underlineColorAndroid='transparent'
                        onChangeText={(Initail) => this.setState({ Initail })}
                        onEndEditing={() => this.SetPersonalInfo()}
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

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ width: '65%' }}>
                    <View style={[styles.inputInnerContainer]}>
                      <TextInput style={[styles.inputs]}
                        placeholder="Last Name"
                        value={this.state.LastName}
                        underlineColorAndroid='transparent'
                        onChangeText={(FirstName) => this.setState({ FirstName })}
                        onEndEditing={() => this.SetPersonalInfo()}
                      />
                    </View>
                  </View>
                  <View style={{ width: '33%'  }}>
                      <View style={[styles.DropDownInnerContainer]}>
                        <DropdownList
                         
                          OptionList={this.state.SuffixData}
                          PlaceHolderText={"Suffix"}
                          selectedValue={this.state.Suffix}
                          setValue={this.SuffixList}
                        />
                      
                    </View>
                  </View>

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
                    onEndEditing={() => this.SetPersonalInfo()}

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
                <View style={[styles.inputInnerContainer]}>
                  <View style={{ flexDirection: 'row',justifyContent: 'space-between' , justifyContent:'center', alignItems:'center', margin:0, padding:0, }}>
                    <View style={{ width: '85%' }}>

                      <TextInput style={styles.inputs}
                        placeholder="Date of Birth"
                        value={this.state.DateofBirth}
                        editable={this.state.edit}
                      />
                    </View>
                    <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center' , margin:0,padding:0}}>
                     <Calender
                        callback={(date) =>{
                          this.state.error['DateofBirth']=null
                          this.setState({ ...this.state, DateofBirth: date})

                        }

                            
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
                  {/* 
                  <RNPickerSelect
                    onValueChange={(value) => this.Gender(value)}
                    value={this.state.Gender}
                    placeholder={{ label: "Please select gender", value: "" }}
                    items={this.state.GenderData}
                  /> */}
                  <DropdownList
                    OptionList={this.state.GenderData}
                    PlaceHolderText={"Gender"}
                    selectedValue={this.state.Gender}
                    setValue={this.Gender}
                  />

                </View>
                <View >

                  {
                    this.state.error['Gender'] && <Text style={styles.ErrorMessage}>{this.state.error['Gender']}</Text>
                  }
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.DropDownInnerContainer}>
                  {/* <RNPickerSelect

                    onValueChange={(value) => this._SetAgeGroup(value)}
                    value={this.state.AgeGroup}
                    placeholder={{ label: "Please select age", value: "" }}
                    items={this.state.rbdagegroup}
                  /> */}
                  <DropdownList
                    OptionList={this.state.rbdagegroup}
                    PlaceHolderText={"Age"}
                    selectedValue={this.state.AgeGroup}
                    setValue={this._SetAgeGroup}
                  />
                  <View>
                    {
                      this.state.error['AgeGroup'] && <Text style={styles.ErrorMessage}>{this.state.error['AgeGroup']}</Text>
                    }
                  </View>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.DropDownInnerContainer}>
                  {/* <RNPickerSelect
        
        onValueChange={(value) => this.USTARatingList(value)} 
      value={this.state.USTARating}
      placeholder={{ label: "Please select USTA Rating", value: "" }}
      items={  this.state.USTARatingData}
  /> */}
                  <DropdownList
                    OptionList={this.state.USTARatingData}
                    PlaceHolderText={"USTA Rating"}
                    selectedValue={this.state.USTARating}
                    setValue={this.USTARatingList}
                  />


                </View>
                <View>
                  {
                    this.state.error['USTARating'] && <Text style={styles.ErrorMessage}>{this.state.error['USTARating']}</Text>
                  }
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.DropDownInnerContainer}>

                  {/* <RNPickerSelect
        onValueChange={(value) => this.AbilityList(value)} 
      value={this.state.Ability}
      placeholder={{ label: "Please select ability", value: "" }}
      items={  this.state.AbilityData}
  /> */}
                  <DropdownList
                    OptionList={this.state.AbilityData}
                    PlaceHolderText={"Ability"}
                    selectedValue={this.state.Ability}
                    setValue={this.AbilityList}
                  />
                </View>
                <View>
                  {
                    this.state.error['Ability'] && <Text style={styles.ErrorMessage}>{this.state.error['Ability']}</Text>
                  }
                </View>

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

