import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
   
    Image,
    Alert,
    state,
    ScrollView
} from 'react-native';
import { validateAll } from 'indicative/validator'
import CustomStatusBar from  '../../../component/Views/Shared/StatusBar'
import styles from '../../../Stylesheets/LoginCS'
import Loader from '../../../../App/component/Loader'
import {CallPI} from  '../../../Api/APICall';
import AlertBox from '../Shared/MessageBox'
export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            VerificationCode: "",
            Password: "",
            ConfirmPassword: "",
            Username: "",
            error: {},
            IsConfirmPassword:false,

            Alert_Visibility: false,
            Alert_Title: '',
            Alert_Message: '',
            Alert_MessageMode: '',
            isRedirectPage:false
        };
    }
    dismissAlert=(values)=>
    {
      this.setState({
        Alert_Visibility:values
    })
    if(this.state.isRedirectPage==true)
    {this.props.navigation.reset({routes: [{ name: "Login" }]})}
  }
  CancelAlert=(values)=>
  {
    this.setState({
      Alert_Visibility:values
  })

  if(this.state.isRedirectPage==true)
  {this.props.navigation.reset({routes: [{ name: "Login" }]})}
  }
    LoginUser = async (data) => {
        try {

          
            const rules = {
                VerificationCode: 'required',
                Password: 'required|string|max:40|min:3',
                ConfirmPassword:'required',
                   }
            const messages = {
                required: 'Required',
               // confirmed: 'Password does not match.',
                max: 'Passeord should be less than 40 characters',
                min: 'Password is too short.'
            }
           
            await validateAll(data, rules, messages)
          if(data.Password!= this.state.ConfirmPassword)
          {
            this.setState({
                Alert_Visibility:true,
                Alert_Title:"Alert",
                Alert_Message:"Confirm password does not match.",
                Alert_MessageMode:"error", 
                 isRedirectPage:false
            })
            return false;
          }
         
           var usernmae =  this.state.Username;
            var verificationCode = data.VerificationCode;
            var password = data.Password;
             
            this.setState({
                isLoading: true
            })
            
            var url =  `Customers/UpdateForgotPasswordCode?username=${usernmae}&verificationCode=${verificationCode}&password=${password}`;
            // await fetch(url, {
            //     method: "POST",
            // })
            
            await  CallPI('POST', url,null,null, '',  null)
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        isLoading: false
                        
                    })
                        if (responseJson.IsTimeExceded == true) 
                        {
                           // Alert.alert("",responseJson.ErrorMessage)
                            this.setState({
                                Alert_Visibility:true,
                                Alert_Title:"Alert",
                                Alert_Message:responseJson.ErrorMessage,
                                Alert_MessageMode:"error", 
                                 isRedirectPage:false

                            })
                         
                    } else if(responseJson.ErrorMessage!= null && responseJson.ErrorMessage!=""){
                        //Alert.alert("",responseJson.ErrorMessage)
                        this.setState({
                            Alert_Visibility:true,
                            Alert_Title:"Alert",
                            Alert_Message:responseJson.ErrorMessage,
                            Alert_MessageMode:"error", 
                             isRedirectPage:false
                        })
                    }
                    else {
                        //Alert.alert("",responseJson.Message)
                        this.setState({
                            Alert_Visibility:true,
                            Alert_Title:"Alert",
                            Alert_Message:responseJson.Message,
                            Alert_MessageMode:"success",  isRedirectPage:true
                        })
                      
                    }
               
                   
                }
                )
                .catch(error => {

                });
             
        }
        catch (errors) {
            const formattedErrors = {}
            errors.forEach(error => formattedErrors[error.field] = error.message);
            this.setState({
                error: formattedErrors
            })
        }

    }
    componentDidMount() {
        console.log(this.props.route.params.usernmame)
           this.setState({
            Username: this.props.route.params.usernmame
        })
    }


    render() {
        return (
            <View style={styles.Pagecontainer}>
                 {/* <CustomStatusBar visibility={true}/> */}
                <AlertBox
        displayMode={this.state.Alert_MessageMode}
        MessageType={''} 
        displayMsg={this.state.Alert_Message}
        Title={this.state.Alert_Title}
        visibility={this.state.Alert_Visibility}

        dismissAlert={this.dismissAlert}
        CancelAlert = {this.CancelAlert}
      />
                <View style={styles.container}>

               <ScrollView>
                <Loader loading={this.state.isLoading} />
                    <View style={styles.inputContainer}>
                        <View style={styles.inputInnerContainer}>
                            <TextInput style={styles.inputs}
                                placeholder="Verification Code"
                                value={this.state.VerificationCode}
                                onChangeText={(VerificationCode) => this.setState({ VerificationCode })}
                            />
                        </View>
                        <View >
                            {
                                this.state.error['VerificationCode'] && <Text style={styles.ErrorMessage}>{this.state.error['VerificationCode']}</Text>
                            }
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputInnerContainer}>
                            <TextInput style={styles.inputs}
                                placeholder="Password"
                                secureTextEntry={true}
                                value={this.state.Password}
                                onChangeText={(Password) => this.setState({ Password })}
                            />
                        </View>
                        {
                            this.state.error['Password'] && <Text style={styles.ErrorMessage}>{this.state.error['Password']}</Text>
                        }
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputInnerContainer}>
                            <TextInput style={styles.inputs}
                                placeholder="Confirm Password"
                                secureTextEntry={true}
                                value={this.state.ConfirmPassword}
                                onChangeText={(ConfirmPassword) => this.setState({ ConfirmPassword })}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.LoginUser(this.state)}>
                        <Text style={{color:'#FFFF' ,fontWeight:"bold"}}>Submit</Text>
                    </TouchableOpacity>

            </ScrollView>
                </View>
            </View>
        );
    }



}