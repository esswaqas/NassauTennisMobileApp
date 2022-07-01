
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
import { TextInputMask } from 'react-native-masked-text'

 import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateAll } from 'indicative/validator'
import styles from ' ../../../App/Stylesheets/NAppSS'
 
import {CallPI} from '../../../../Api/APICall'
import Loader from '../../../../../App/component/Loader'
import { CommonActions } from '@react-navigation/native';
import AlertBox from '../../../../../App/component/Views/Shared/MessageBox'
import LoginPage from '../../Shared/Login'


export default class AddressInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      IsSendSmsNotification: false,
      EmergencyContact: '',
      EmergencyPhone: '',
      SecretQuestion: '',
      SecretAnswer: '',
      Login: '',
      FirstName: '',
      LastName: '',
      Email: '',
      DateofBirth: '',
      Gender: '',
      Suffix: '',
      Initail: '',
      AgeGroup: '',
      HomePhone: '',
      DaytimePhone: '',
      CellPhone: '',
      Address: '',
      CellProvider: '',
      City: '',
      Fax: '',
      State: '',
      ZipCode: '',
      ID: '',

      USTARating: '',
      Ability: '',
      SystemError: {},
      isLoading: false,
      UpdatePerson: false,

      Alert_Visibility: false,
      Alert_Title: '',
      Alert_Message: '',
      Alert_MessageMode: '',
      isRedirectPage:false,
      loginCredential: [],
      IsProfileCompleteRedirect:false


    }

  }
  dismissAlert = (values) => {

    this.setState({ 
      Alert_Visibility: values,
      IsProfileCompleteRedirect:true
      
     })
     if(this.state.isRedirectPage===true){

       this.SetLoginedInParticipentID();
     }
}
CancelAlert = (values) => {
    this.setState({ 
      Alert_Visibility: values,
      IsProfileCompleteRedorect:true

     })
     if(this.state.isRedirectPage===true){

      this.SetLoginedInParticipentID();
    }
}
  
  UpdateProfile = async (data) => 
  {

    try {
     
      var putURL = 'Customers/UpdateProfile?myprofile="profile"';
      const rules = {

        EmergencyContact: 'required',
        EmergencyPhone: 'required',
        SecretAnswer: 'required',
        SecretQuestion: 'required',
      }

      const messages = {
        required: 'Required',
      }

     //var rs= await this.GetPersonalInfo()
     //alert("ssss   "+rs)
      if ( await this.GetPersonalInfo()== true)
       {
        
        if (await this.GetContactInfo() === false) {
          
          return false;
        
        }
      }
      else
       {
    
        this.setState({
          Alert_Visibility:true,
          Alert_Title:"Alert",
          Alert_Message:"Please complete personal information.",
          Alert_MessageMode:"success"
        })

        this.props.navigation.navigate("Personalinfo")
        return false;
      }
      
  var  userToken = await   AsyncStorage.getItem('UserToken');
  var  username =  await AsyncStorage.getItem('Username');
      await validateAll(data, rules, messages)
      this.setState({
        isLoading: true
      })
      var profile = new Object();
      // await fetch(putURL, {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify()
      // })

      profile=   {
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        Email: this.state.Email,
        Suffix: this.state.Suffix,
        MI: this.state.Initail,
        ID: this.state.ID,
        BirthdayDate: this.state.DateofBirth,
        Gender: this.state.Gender,
        AgeGroup: this.state.AgeGroup,
        Ability: this.state.Ability,
        UstaRating: this.state.USTARating,
        HomePhone: this.state.HomePhone,
        DaytimePhone: this.state.DaytimePhone,
        CellPhone: this.state.CellPhone,
        Address: this.state.Address,
        CellProvider: this.state.CellProvider,
        City: this.state.City,
        Fax: this.state.Fax,
        State: this.state.State,
        ZipCode: this.state.ZipCode,
        IsSendSmsNotification: this.state.IsSendSmsNotification,
        EmergencyContact: this.state.EmergencyContact,
        EmergencyPhone: this.state.EmergencyPhone,
        SecretQuestion: this.state.SecretAnswer,
        SecretAnswer: this.state.SecretAnswer,
      }
      await  CallPI("POST",putURL,profile,null,'',null)
      .then((response) => response.json())
        .then(responseJson => {
        //  console.log(responseJson.Message )
          if (responseJson.Message !=  "") {

           // Alert.alert("", responseJson.Message)
            this.setState({
              Alert_Visibility:true,
              Alert_Title:"Alert",
              Alert_Message:responseJson.Message,
              Alert_MessageMode:"success"
            })
            this.setState({
              isLoading: false
            })
            

           
           var  loginCredential =[];
           this.SetCompleteProfile()

                  loginCredential.push({ userToken: userToken, userName: username, userIsLogin: true, IsPersonProfileCompleted:true });
           this.setState({
             loginCredential: loginCredential,
             isRedirectPage: true
           })
          

           }
 
        }).catch(error => {
          
          this.setState({
            isLoading: false
          })
        });

    }
    catch (errors) {


      const systemformattedErrors = {}
      errors.forEach(SystemError => systemformattedErrors[SystemError.field] = SystemError.message);
      this.setState({
        SystemError: systemformattedErrors
      })

    }

  }
  async  SetCompleteProfile()
  {
    this.setState({
      IsProfileCompleteRedorect:true  
    })

    await AsyncStorage.setItem('IsPersonProfileCompleted', "true")
  }

async  SetLoginedInParticipentID ()
{
 var userID=   await AsyncStorage.getItem('LoginUserID');
 var registrationScreenName=   await AsyncStorage.getItem('RegistrationScreen');
 //alert("registrationScreenName "+  registrationScreenName)
if(registrationScreenName!= null && registrationScreenName!= '')
 {
  await AsyncStorage.setItem('ISupdateProfileFromReg',"true");
 }
 await AsyncStorage.setItem('ParticipantSelectedID', userID.toString());
 if(userID!= null)
{
  this.setState({isRedirectPage:false})
  this.props.navigation.reset({ routes: [{ name: 'Profiled' }]})
} 
  }
  GetPersonalInfo = async () => {


    const firstname = await AsyncStorage.getItem('perFirstName');

    const lastname = await AsyncStorage.getItem('perLastName');

    const email = await AsyncStorage.getItem('perEmail');

    const participantID = await AsyncStorage.getItem('perParticipant');
    const initail = await AsyncStorage.getItem('perInitail');
    const suffix = await AsyncStorage.getItem('perSuffix');

    const dateof = await AsyncStorage.getItem('perDateofBirth');
    const gender = await AsyncStorage.getItem('perGender');
    const ageGroup = await AsyncStorage.getItem('perAgeGroup');
    const ability = await AsyncStorage.getItem('perAbility');
    const ustarRatin = await AsyncStorage.getItem('perUSTARating');

    this.setState({
      FirstName: firstname,
      LastName: lastname,
      Email: email,
      ID: participantID,
      DateofBirth: dateof,
      Gender: gender,
      AgeGroup: ageGroup,
      USTARating: ustarRatin,
      Ability: ability,
      Suffix: suffix,
      Initail: initail
    })
    //alert("FirstName="+firstname+" LastName= "+lastname+" email= "+email+" participantID= "+participantID+" dateof= "+dateof+" gender= "+gender+" ustarRatin= "+ustarRatin+" ability= "+ability+" suffix= "+suffix+" ageGroup= "+ageGroup)
    //return false;

    if (firstname == null || lastname == null || email == null || participantID == null || dateof == null || gender == null || ageGroup == null || ability == null || ustarRatin == null ) {
      return false;
    }
    else {
      return true;
    }

  }


  GetContactInfo = async () => {

    const homephone = await AsyncStorage.getItem('ContactHomePhone');
    const daytimephone = await AsyncStorage.getItem('ontactDaytimePhone');
    const cellphone = await AsyncStorage.getItem('ontactCellPhone');
    const address = await AsyncStorage.getItem('ontactAddress');
    const cellprovider = await AsyncStorage.getItem('ontactCellProvider');
    const city = await AsyncStorage.getItem('ontactCity');
    const fax = await AsyncStorage.getItem('ontactFax');
    const state = await AsyncStorage.getItem('ontactState');
   // alert("ontactState = "+state)
    const zipcode = await AsyncStorage.getItem('ZipCode');

   
    this.setState({
      HomePhone: homephone,
      DaytimePhone: daytimephone,
      CellPhone: cellphone,
      CellProvider: cellprovider,
      Address: address,
      City: city,
      Fax: fax,
      State: state,
      ZipCode: zipcode,
    })
    if (address == null)
     {
      // Alert.alert(
      //   "", "Please enter address",
      //   [
      //     { text: "OK", onPress: () => this.RedirectToContect() }
      //   ], { cancelable: false });
        this.setState({
          Alert_Visibility:true,
          Alert_Title:"Warning",
          Alert_Message:"Please enter address",
          Alert_MessageMode:"warning"
        })
      return false;
    }
    if (city == null) 
    {

      // Alert.alert(
      //   "", "Please enter city",
      //   [
      //     { text: "OK", onPress: () => this.RedirectToContect() }
      //   ], { cancelable: false });
        this.setState({
          Alert_Visibility:true,
          Alert_Title:"Warning",
          Alert_Message:"Please enter city",
          Alert_MessageMode:"success"
        })
      return false;
    }
    if (state == null) {
      // Alert.alert(
      //   "", "Please enter state",
      //   [
      //      { text: "OK", onPress: () => this.RedirectToContect() }
      //   ], { cancelable: false });
        this.setState({
          Alert_Visibility:true,
          Alert_Title:"Warning",
          Alert_Message:"Please enter state",
          Alert_MessageMode:"success"
        })
      return false;

    }

    if (zipcode == null) {
      // Alert.alert(
      //   "", "Please enter zip code",
      //   [
      //      { text: "OK", onPress: () => this.RedirectToContect() }
      //   ], { cancelable: false });
      this.setState({
        Alert_Visibility:true,
        Alert_Title:"Warning",
        Alert_Message:"Please enter zip code",
        Alert_MessageMode:"success"
      })
      return false;

    }
  
    if((this.state.HomePhone ===''|| this.state.HomePhone ===null  ) &&  (this.state.CellPhone ===''|| this.state.CellPhone ===null  )      &&   (this.state.DaytimePhone ===''|| this.state.DaytimePhone ===null  )){
      this.setState({
        Alert_Visibility:true,
        Alert_Title:"Warning",
        Alert_Message:"Please enter at least one phone number.",
        Alert_MessageMode:"success"
      })
      return false;
    }

  }
  RedirectToContect() {
    this.props.navigation.navigate("ContactInfo")
  }
  async GetSystemInfo() {
    

    this.setState({
      isLoading: true
    })
    var LoginUserID = null;
    var personselectedID = await AsyncStorage.getItem('ParticipantSelectedID');
   
    if (personselectedID != null) {
      LoginUserID = personselectedID;
    }
    else {
      LoginUserID = await AsyncStorage.getItem('LoginUserID');
    }
 
    const url =   `Customers/MyProfile?customerProfileID=${LoginUserID}`;

    // fetch(url, {
    //   method: "GET",
    // })
    await  CallPI("GET",url,null,null,'',null)
      .then(response => response.json())
      .then(responseJson => {
     
        // if (responseJson.ok) {    
        this.setState({
        IsSendSmsNotification: responseJson.CellPhone== '' || responseJson.CellPhone===null? false: responseJson.IsSendSmsNotification === null ? false : responseJson.IsSendSmsNotification,
          EmergencyContact: responseJson.EmergencyContact,
          EmergencyPhone: responseJson.EmergencyPhone,
          SecretQuestion: responseJson.SecretQuestion,
          SecretAnswer: responseJson.SecretAnswer,
          Login: responseJson.Login,
        })

      }

      ).catch(error => {

      });
  }


  // componentWillUnmount(){
  //  // alert("add will")
  // }
  
  componentDidMount() {
   
 // alert("add")
    this.GetSystemInfo()
    this.setState({
      isLoading: false
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
        CancelAlert = {this.CancelAlert}
      />
      

        <LoginPage LoginProps={this.state.loginCredential} />    
      
      <View style={styles.container}>
        <Loader loading={this.state.isLoading} />
        <ScrollView >
          <View >


            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>
                <TextInput style={styles.inputs}
                  placeholder="Emergency Contact"
                  value={this.state.EmergencyContact}
                  onChangeText={(EmergencyContact) => {
                    this.state.SystemError['EmergencyContact'] =null

                    this.setState({ EmergencyContact })}}
                />
              </View>
              <View >
                {
                  this.state.SystemError['EmergencyContact'] && <Text style={styles.ErrorMessage}>{this.state.SystemError['EmergencyContact']}</Text>
                }
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>
                {/* <TextInput style={styles.inputs}
                  placeholder="Emergency Phone"
                  keyboardType="number-pad"
                  maxLength={13}
                  value={this.state.EmergencyPhone}
                  onChangeText={(EmergencyPhone) => this.setState({ EmergencyPhone })}
                /> */}
                  <TextInputMask
                                    type={'cel-phone'}
                                    options={{
                                        maskType: 'BRL',//for international set it -&amp;nbsp;INTERNATIONAL type masking
                                        withDDD: true,
                                        dddMask: '999 999 9999'//this is a your define formatting you use according to your requirment
                                    }}
                                    maxLength={12}              //set length according to your input requirment
                                    value={this.state.EmergencyPhone}
                                    placeholder={'Emergency Phone'}
                                    onChangeText={(EmergencyPhone) => {
                                      this.state.SystemError['EmergencyPhone'] =null

                                      this.setState({ EmergencyPhone })}}
                                    style={styles.inputs} ref='mobile'
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    keyboardType={'number-pad'}
                                />
              </View>
              <View>
                {
                  this.state.SystemError['EmergencyPhone'] && <Text style={styles.ErrorMessage}>{this.state.SystemError['EmergencyPhone']}</Text>
                }
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>

                <TextInput style={styles.inputs}
                  placeholder="Login"
                  editable={false}
                  value={this.state.Login}
                  onChangeText={(Login) => this.setState({ Login })}
                />


              </View>

            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>

                <TextInput style={styles.inputs}
                  placeholder="Secret Question"
                  value={this.state.SecretQuestion}
                  onChangeText={(SecretQuestion) => {

                    this.state.SystemError['SecretQuestion'] =null
                    this.setState({ SecretQuestion })}
                  }
                />


              </View>
              <View >
                {
                  this.state.SystemError['SecretQuestion'] && <Text style={styles.ErrorMessage}>{this.state.SystemError['SecretQuestion']}</Text>
                }
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>
                <TextInput style={styles.inputs}
                  placeholder="Secret Question"
                  value={this.state.SecretAnswer}
                  onChangeText={(SecretAnswer) =>
                    {
                      this.state.SystemError['SecretAnswer'] =null
                       this.setState({ SecretAnswer })}
                    }
                />
              </View>
              <View >
                {
                  this.state.SystemError['SecretAnswer'] && <Text style={styles.ErrorMessage}>{this.state.SystemError['SecretAnswer']}</Text>
                }
              </View>
            </View>
           <TouchableOpacity style={[styles.buttonContainer, ]} onPress={() => this.UpdateProfile(this.state)} >
              <Text style={styles.buttunTextColo}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      </View>
    );

  }

}

