import React, { Component } from 'react';
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
    state,
 
    ScrollView
} from 'react-native';
import { validateAll } from 'indicative/validator'
import CustomStatusBar from  '../../../component/Views/Shared/StatusBar'
import RNPickerSelect from 'react-native-picker-select';
import DropdownList from '../../Views/Shared/DropdownList'
import { CommonActions } from '@react-navigation/native';
import styles from '../../../Stylesheets/LoginCS'

import Loader from '../../../../App/component/Loader'
import {CallPI} from '../../../../App/Api/APICall'
import AlertBox from '../Shared/MessageBox'

var SecretQuestionsList = [  ];
export default class ForgotUsernameEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            VerificationCode: "",
            
           
            Email: "",
            ResetMethod:"",
            SecretQuestionList:[],
          
            SecretQuestion:"",
            SecretAnswer:"",
            error: {},
            Alert_Visibility: false,
            Alert_Title: '',
            Alert_Message: '',
            Alert_MessageMode: '',
            isRedirectPage: false
        };
    }

    dismissAlert=(values)=>
    {
      this.setState({
        Alert_Visibility:values
    })
     
  }
  CancelAlert=(values)=>
  {
    this.setState({
      Alert_Visibility:values
  })
  
  }
    LoginUser = async (data) => {
        try {

          
            const rules = {
                VerificationCode: 'required',
                SecretQuestion: 'required', 
                SecretAnswer: 'required',
                  }
            const messages = {
                required: 'Required',
              
               
            }

            await validateAll(data, rules, messages)
          if(data.Password!= this.state.ConfirmPassword)
          {
             this.setState({
                IsConfirmPassword:true
             })
            return false;
          }
            var email =  this.state.Email;
            var method =  this.state.ResetMethod;
            var verificationCode = data.VerificationCode;
            var secretQuestion = data.SecretQuestion;
            var secretAnswer = data.SecretAnswer;
            this.setState({
                isLoading: true
            })
            
            var url = `Customers/ForgotUserName?email=${email}&sQuestion=${secretQuestion}&sAnswer=${secretAnswer}&verificationCode=${verificationCode}&resetMethod=${method}`;
             await  CallPI("POST",url,null,null,'',null)
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        isLoading: false
                    })
                          if(responseJson.ErrorMessage!= null && responseJson.ErrorMessage!=""){
                       
                        this.setState({
                            Alert_Visibility:true,
                            Alert_Title:"Alert",
                            Alert_Message:responseJson.ErrorMessage,
                            Alert_MessageMode:"error"
                        })
                    }
                    else {
                        
                      
                        //this.props.navigation.goBack("Login");
                        this.setState({

                            Alert_Visibility:true,
                            Alert_Title:"Alert",
                            Alert_Message:responseJson.Message,
                            Alert_MessageMode:"success",
                            isRedirectPage:true
                        })
                        if (this.state.isRedirectPage == true)
                         {
                          this.props.navigation.dispatch(
                            CommonActions.navigate({
                              name: 'ForgotUsername',
                            })
                          );
                        }
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
        console.log(this.props.route.params.Email)
        console.log(this.props.route.params.QuesionList)
        console.log("fjkbfjkdbf sd jsdfn "+this.props.route.params.method)

        SecretQuestionsList=[];
        
    
             

            
        for (let userObject of this.props.route.params.QuesionList) {
  
             SecretQuestionsList.push({ label: userObject.ResetQuestion, value: userObject.ResetQuestion });
          }
          setTimeout(() => {
            this.setState({
                Email: this.props.route.params.Email,
                SecretQuestionList: SecretQuestionsList,
                ResetMethod: this.props.route.params.method
            })

    }, 1000) 
         
       
    }

    SetQuestion =(value) =>{
        this.setState({SecretQuestion:value})
    }
    render() {
        return (
            <View style={styles.Pagecontainer}>
               {/* //  <CustomStatusBar visibility={true}/> */}
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
            <ScrollView >
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

                        <View style={styles.DropDownInnerContainer}>
                      
                        <DropdownList
                          OptionList={this.state.SecretQuestionList}
                          PlaceHolderText={"Please select question"}
                          selectedValue={this.state.SecretQuestion}
                         setValue={this.SetQuestion}
                         />

                            </View>
                        <View >
                            {
                                this.state.error['SecretQuestion'] && <Text style={styles.ErrorMessage}>{this.state.error['SecretQuestion']}</Text>
                            }
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputInnerContainer}>
                            <TextInput style={styles.inputs}
                                placeholder="Secret Answer"
                                value={this.state.SecretAnswer}
                                onChangeText={(SecretAnswer) => this.setState({ SecretAnswer })}
                            />
                        </View>
                        <View >
                            {
                                this.state.error['SecretAnswer'] && <Text style={styles.ErrorMessage}>{this.state.error['SecretAnswer']}</Text>
                            }
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.LoginUser(this.state)}>
                        <Text style={{color:'#FFFF' ,fontWeight:"bold"}}>Submit</Text>
                    </TouchableOpacity>

                    {/* <Text>
           {this.getErrorMessages()}  
        </Text> */}


               

            </ScrollView>
             </View>
             </View>
        );
    }



}

 