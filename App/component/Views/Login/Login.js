
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
  state,
  TextInput,
  ScrollView,
  ImageBackground
} from 'react-native';
import Loader from '../../Loader'
import style from '../../../Stylesheets/LoginCS'
import { validateAll } from 'indicative/validator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Testloing from '../Shared/Login'
import { UserLogin } from '../../../Api/LoginApi'
import { connect } from "react-redux";

import { CallPI } from '../../../Api/APICall'

import CheckBox from '../Shared/CheckBox'
import { useRoute } from '@react-navigation/native';
import CustomStatusBar from '../../../component/Views/Shared/StatusBar'
import {setuserID,setusername} from './../../../redux/actions/authAction'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

 

 //export default class LoginView extends Component {
   class LoginView extends Component {

  constructor(props) {
 

    super(props);
    this.state = {
      isLoading: false,
      isLogin: false,
      email: "",
      password: "",
      error: {},
      loginCredential: [],
      invalidUsernamePassword: "",
      loginUserdata: {},
      Rememberme: false
    };

  }
  LoginUser = async (data) => {
    // await AsyncStorage.clear()
    //  this.props.navigation.navigate("Dashboard");
  
    const fcmToken =   await AsyncStorage.getItem("fcmToken")
   
    await AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys))
  //  alert(fcmToken)
    if(fcmToken!= null){
await  AsyncStorage.setItem('fcmToken',   fcmToken);}


    try {
      const rules = {
        email: 'required',
        password: 'required',
      }
      const messages = {
        required: 'Required'
      }
      await validateAll(data, rules, messages)
      var usernmae = data.email;//waqasali';//
      var password = data.password;//123 '123';//
      var loginuserID = '';
      var firstName = '';
      var lastName = '';
      this.setState({
        isLoading: true
      })
      //  var  invalidUsernamePassword =''
      //  await UserLogin(data,invalidUsernamePassword)
      
 
      var url =   `Dashboard/LoginCustomers?username=${usernmae}&password=${password}`;
   
       
      // await fetch(url, {
      //   method: "POST",
      // })
      var response= await  CallPI('POST',url,null,null,'',null);
   //   .then(response => {alert})
      if(response.status==200)
       {
        response.json()
        .then(responseJson => {
//alert('login inner')
          // Showing response message coming from server after inserting records.
       //   alert("login After=======  "+JSON.stringify(responseJson))
          if (responseJson["Message"] == "") {

           // alert(responseJson["userToken"])
            loginuserID = responseJson["ID"];
            firstName = responseJson["FirstName"];
            lastName = responseJson["LastName"];
            AsyncStorage.setItem('LoginUserFirstName', responseJson["FirstName"]);
            AsyncStorage.setItem('Username', responseJson["FirstName"]);
            AsyncStorage.setItem('UserToken', responseJson["FirstName"]);
            AsyncStorage.setItem('LoginUserLastName', responseJson["LastName"]);
            AsyncStorage.setItem('LoginUserImage', responseJson["Image"]);
            AsyncStorage.setItem('LoginUserEmail', responseJson["Email"]);
            AsyncStorage.setItem('LoginUserID', responseJson["ID"]);
            AsyncStorage.setItem('userToken', responseJson["userToken"]);
            // this.props._setuserID(loginuserID)
           //  this.props._setusername(firstName +' '+lastName)
          
            var loginCredential = [];
            //alert(this.state.Rememberme)IsPersonProfileCompleted
            if (this.state.Rememberme == true) {
              AsyncStorage.setItem('Rememberme', "true");

            }
            var isPersonProfileCompleted= responseJson["IsPersonProfileCompleted"];
          //  alert("Lgn == "+isPersonProfileCompleted)
            AsyncStorage.setItem('IsPersonProfileCompleted', isPersonProfileCompleted.toString());
            loginCredential.push({ userToken: responseJson["FirstName"], userName: responseJson["FirstName"], userIsLogin: true, IsPersonProfileCompleted:isPersonProfileCompleted });
            this.setState({
              loginCredential: loginCredential
            })
          }
          else {

            this.setState({
              invalidUsernamePassword: 'Invalid username or password.',// responseJson["Message"]
              isLoading: false
            })

          }
        }
        )
        .catch(error => {
          this.setState({
          
            isLoading: false
          })
         // alert(error)
        //  console.log("  errorrrrr===  "+JSON.stringify(error))
        });
      }
      else{
        this.setState({isLoading: false  })
      }}
    catch (errors) {
      
      //alert(errors)
      const formattedErrors = {}
      errors.forEach(error => formattedErrors[error.field] = error.message);
      this.setState({
        error: formattedErrors
      })
    
    }

  }
  SetRememberme = () => {
    this.setState({
      Rememberme: !this.state.Rememberme
    })
  }


  ForgotPassword() {

    this.props.navigation.navigate("ForgotPassword")

  }

  componentDidMount() {
    lor(this);
  }

  componentWillUnmount() {
    rol(this);
  }
  render() {
    return (


      <ImageBackground source={require('../../../Images/BackgroundPictures/LoginBg.jpg')} resizeMode="cover" style={styles.image}>
        <Testloing LoginProps={this.state.loginCredential} />
        <CustomStatusBar visibility={false} />
        <Loader loading={this.state.isLoading} />
        <View style={{ flexDirection: 'column', height: '100%', 
         justifyContent: 'center',
        alignItems: 'center'
         }}>
          <View style={{ height: hp('20%'),margin:0}}>

            <Image style={{
               flex: 1,
                
               height: hp('100%'),
 
              // alignSelf: 'center',
              // height: hp('25%'),

              // width: wp('80%'),

            }} resizeMode="contain" source={require('../../../Images/logo.png')} />
          </View>
          <View>
            <View style={{
              flexDirection: "row", justifyContent: "center", alignItems: "center",
              marginTop: 20, marginBottom: 15,
            }}>
              <Image
                style={{
                  alignSelf: 'center',
                  height: hp('5%'),
                  width: wp('5%'),
                }}
                resizeMode="contain"
                source={require('../../../Images/Icon/Edit.png')}
              />
              <Text style={[style.textFontFamily, { color: '#ffffff', textAlign: 'center', paddingLeft: 10, fontSize: RFValue(12) }]}>
                Login here
              </Text>
            </View>
          </View>


          <View style={{ alignItems: 'center' }} >


            <View style={{ width: wp('85%') }} >
              <ScrollView >


                {
                  this.state.invalidUsernamePassword != '' ?

                    <View >
                      {
                       
                           <Text style={{color:'white'}}> {this.state.invalidUsernamePassword}<Text  style={[style.ErrorMessage,{fontSize:16}]}>*</Text></Text>

                      }
                    </View>
                    : null
                }
                <View style={style.inputContainer}>
                  {/* <TextInput
        label='Email'
        style={style.inputs}
        underlineColor='transparent'
        underlineColorAndroid
        value={this.state.text}
        onChangeText={text => this.setState({ text })}
         
        theme={{ colors: { primary: 'back',underlineColor:'transparent',un}}}

      /> */}
                  <View style={style.inputInnerContainer}>
                    <TextInput style={style.Logininputs}
                      placeholder="Username"

                      value={this.state.email}
                      onChangeText={(email) => this.setState({ email })}
                    />
                  </View>

                  <View >

                    {
                      this.state.error['email'] && <Text style={{color:'white'}}>{this.state.error['email']}<Text style={[style.ErrorMessage,{fontSize:16}]}>*</Text></Text>

                    }
                  </View>
                </View>

                <View style={style.inputContainer}>


                  <View style={style.inputInnerContainer}>
                    <TextInput style={style.Logininputs}
                      placeholder="Password"
                      secureTextEntry={true}
                      value={this.state.password}
                      onChangeText={(password) => this.setState({ password })}
                    />
                  </View>
                  {

                   
                    this.state.error['password'] && <Text style={{color:'white'}}>{this.state.error['password']}<Text style={[style.ErrorMessage,{fontSize:16}]}>*</Text></Text>

                  }
                </View>



                <View style={style.Checkboxcontainer}>
                  <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: -10 }}>

                    <CheckBox
                      title={"Remember me"}
                      checked={this.state.Rememberme}
                      setValue={this.SetRememberme}

                    />


                    {/* <Text style={[style.textFontFamily,{ color:'white' ,fontSize:9}]} onPress={() => console.log('ok')}>Remember </Text> */}
                  </View>

                  <TouchableOpacity onPress={() => this.props.navigation.navigate("Signup")}    >
                    <Text style={[style.textFontFamily, { fontSize: RFValue(12), color: 'white' }]}>Sign up</Text>
                  </TouchableOpacity>

                </View>

                <TouchableOpacity style={[style.LoginbuttonContainer]} onPress={() => this.LoginUser(this.state)}  >
                  <Text style={{ color: '#FFFF', style }}>LOGIN </Text>
                </TouchableOpacity>
{/* 
                <TouchableOpacity style={[style.buttonContainer]}  onPress={() => this.props.navigation.navigate("Test")}  >
        <Text style={{color:'#FFFF',fontSize:12}}>TEST </Text>
      </TouchableOpacity>   */}
                <View style={[style.inputContainer, { flexDirection: 'row', justifyContent: 'center' }]}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("ForgotUsername")} >
                    <Text style={[style.textColor_white, style.textStyle, style.textFontFamily, { fontSize: RFValue(12) }]}>Forgot your Username</Text>
                  </TouchableOpacity>
                </View>
                <View style={[style.inputContainer, { flexDirection: 'row', justifyContent: 'center',marginTop:5 }]}>
                  <TouchableOpacity onPress={() => this.ForgotPassword()} >
                    <Text style={[style.textColor_white, style.textStyle, style.textFontFamily, { fontSize: RFValue(12) }]}>Forgot your Password</Text>
                  </TouchableOpacity>

                </View>
              </ScrollView>
            </View>
          </View>

        </View>



      </ImageBackground>


      // <Image source={require('../../../Images/BackgroundPictures/LoginBg.jpg')} style={styles.backgroundImage} />



    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,



  },
  image: {
    flex: 1,
    justifyContent: "center"

  }

});


const mapDispatchToProps =(dispatch) =>{
   return {  
     _setuserID : (ss) => dispatch(setuserID(ss)),
     _setusername : (ss) => dispatch(setusername(ss))
    }
  }

  


export default connect(null,{mapDispatchToProps})(LoginView);
