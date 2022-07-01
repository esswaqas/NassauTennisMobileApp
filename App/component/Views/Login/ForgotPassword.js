import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  
  TouchableOpacity,FlatList,
  Image,
  Alert,
  state,
  ScrollView, 
} from 'react-native';
import { validateAll } from 'indicative/validator'
import styles from '../../../Stylesheets/LoginCS'
import Loader from '../../../../App/component/Loader'
import RadioButton from '../Shared/RadioButton';
import AlertBox from '../Shared/MessageBox'
import CustomStatusBar from  '../../../component/Views/Shared/StatusBar'
import {CallPI} from '../../../Api/APICall'

// import { Avatar, Button,  Card, Title, Paragraph } from 'react-native-paper';
// import { Card, ListItem, Button, Icon } from 'react-native-elements'

import { Card } from 'react-native-elements'

var ResetPasswordOptionList = [];
export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: "",
      Username: "",
      error: {},
      ResetMethod: "",
      isRedirectPage: false,
      ShowPassword: true,
      ShowResetPasswordOptions: false,
      ResetPasswordOptionList: [ {label:'******144',value:0, isSelected:false},
      {label:'******299',value:0 , isSelected:false}],

      // Alert Props
      Alert_Visibility: false,
      Alert_Title: '',
      Alert_Message: '',
      Alert_MessageMode: '',
    };
    // this._onPressButton = this._onPressButton.bind(this)
  }
  dismissAlert=(values)=>
  {
    this.setState({
      Alert_Visibility:values
  })
this.props.navigation.navigate("ResetPassword",{
  usernmame :  this.state.Username
});    
}
CancelAlert=(values)=>
{
  this.setState({
    Alert_Visibility:values
})
this.props.navigation.navigate("ResetPassword",{
  usernmame :  this.state.Username
});
}


 
  LoginUser = async (data) => {
    try {
    
      const rules = {
        email: 'required',
        Username: 'required',
      }
      const messages = {
        required: 'Required'
      }
      await validateAll(data, rules, messages)

      var usernmae = data.Username;
      var email = data.email;

      var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      var cellphonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

      var type = "";
      if (cellphonePattern.test(data.email) == true) {
        type = "Phone";
        
        this.setState({
          ResetMethod: type
        })
      }

      if (pattern.test(data.email) != true && type == "") {
        //alert("Email is not valid.")
        this.setState({
          Alert_Visibility:true,
          Alert_Title:"Alert",
          Alert_Message:"Email is not valid.",
          Alert_MessageMode:"success"
        })
        return false;
      }
      this.setState({
        isLoading: true
      })

     
      var url = `Customers/ForgotPassword?email=${email}&username=${usernmae}&resetPasswordMethod=${type}`;
      await CallPI('POST', url, null, null,  " ", null).then(response => response.json())
        .then(responseJson => {
 console.log(JSON.stringify(responseJson))
 
          if(responseJson.ErrorMessage !=null && responseJson.ErrorMessage !=""  )
          {

           
           this.setState({
         
            Alert_Visibility:true,
            Alert_Title:"Alert",
            Alert_Message:responseJson.ErrorMessage,
            Alert_MessageMode:"success",
            isLoading: false,
            })
          }else{

          if (responseJson.IsCellPhone == true)
          
          {
            ResetPasswordOptionList=[];
            ResetPasswordOptionList.push({ label: responseJson.CellPhone, value:0 , isSelected:false});
            ResetPasswordOptionList.push({ label: responseJson.Email, value: 1, isSelected:false});
            this.setState({
              ResetPasswordOptionList:ResetPasswordOptionList,
              ShowResetPasswordOptions: true,
              ShowPassword: false,
            })
            setTimeout(() => {
              this.setState({   isLoading: false
              })}, 1000)
            }
          else {

            this.setState({
              Alert_Visibility:true,
              Alert_Title:"Alert",
              Alert_Message:responseJson.Message,
              Alert_MessageMode:"success",

            isLoading: false,
            isRedirectPage:true
            

            })

          //   Alert.alert("",responseJson.Message,
          //   [  { text: "OK", onPress: () => {   this.props.navigation.navigate("ResetPassword",{
          //     usernmame :  this.state.Username
          //   });
          // }}]
          //   )
            
          }}
        }
        ).catch(error => {

        });
      //this.props.navigation.navigate("ResetPassword");


    }
    catch (errors) {
      const formattedErrors = {}
      errors.forEach(error => formattedErrors[error.field] = error.message);
      this.setState({
        error: formattedErrors
      })
    }

  }

 async SelectResetOptions(value) {
 
 
    var email =     this.state.email;
    var usernmae = this.state.Username;
    var codeMethod = value == 0 ? 'SMS' : 'Email';
    var resetType =  this.state.ResetMethod;
    this.setState({
      isLoading: true
    })
    var url = `Customers/SendForgotPasswordCode?email=${email}&username=${usernmae}&sendCodeMethod=${codeMethod}&resetMethod=${resetType}`;
    await CallPI('POST', url, null, null,  " ", null)
      .then(response => response.json())
      .then(responseJson => {
 console.log(JSON.stringify(responseJson))
        if (responseJson.Message != "") {
          this.setState({
            Alert_Visibility:true,
            Alert_Title:"Alert",
            Alert_Message:responseJson.Message,
            Alert_MessageMode:"success",

          isLoading: false,
          isRedirectPage:true
          })
        //   Alert.alert("",responseJson.Message,
        //   [  { text: "OK", onPress: () => {   this.props.navigation.navigate("ResetPassword",{
        //     usernmame :  this.state.Username
        //   });
        // }}]
        //   )
          
         }
        else {
          this.setState({
             isLoading: false
          })
        }
      }
      )
      .catch(error => {

      });
   

  }

   
  
  rederItems = ({ item, index }) => {
    return (
    <TouchableOpacity style={  {backgroundColor: index % 2 === 0 ? '#f5f4f2' : 'white', flexDirection:'row' , margin:5,padding:5}} onPress={() => { this.UpDatedExt(index) }}>
       
{
   
   <RadioButton props={item.isSelected} />
}

<Text> {item.label}</Text>
    </TouchableOpacity>

)


  }
    UpDatedExt =   (index) => {
    
 const array = [...this.state.ResetPasswordOptionList];
 var value = array[index]['value'];
 

 for (var i =0 ;i<array.length; i++ )
 {

  if(i==index){
    array[i]['isSelected'] = !array[i]['isSelected']
  }
  else{
    array[i]['isSelected'] =false;
  }

 }
    this.setState({ ResetPasswordOptionList: array })

    
    this.SelectResetOptions(value)
}
  render() {
    return (
      // <View style={styles.Pagecontainer}>
      //       <View style={styles.container}>
      //       <ScrollView>
      //       <View style={styles.inputContainer}>
      //     <View style={styles.inputInnerContainer}>
      //       <TextInput style={styles.inputs}
      //         placeholder="Username"
               
      //         value={this.state.Username}
      //         onChangeText={(Username) => this.setState({ Username })}
      //       />
      //     </View>

      //     <View >

      //       {
      //           this.state.error['Username'] && <Text style={styles.ErrorMessage}>{this.state.error['Username']}</Text>

      //       }
      //     </View>
      //   </View>
            
      //       </ScrollView>
      //   </View>
      //   </View>

      <View style={styles.Pagecontainer}>
 {/* <CustomStatusBar visibility={true}/> */}
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
         <ScrollView>
           {
          this.state.ShowPassword &&
          <View >
           
            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>
                <TextInput style={styles.inputs}
                  placeholder="Username"
                  value={this.state.Username}
                  onChangeText={(Username) => this.setState({ Username })}
                />
              </View>
              {
                this.state.error['Username'] && <Text style={styles.ErrorMessage}>{this.state.error['Username']}</Text>
              }
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>
                <TextInput style={styles.inputs}
                  placeholder="Email or Cell phone"
                  value={this.state.email}
                  onChangeText={(email) => this.setState({ email })}
                />
              </View>
              <View>
                {
                  this.state.error['email'] && <Text style={styles.ErrorMessage}>{this.state.error['email']}</Text>
                }
              </View>
            </View>
            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.LoginUser(this.state)}>
              <Text style={[styles.buttonTextColor, styles.buttonFontSize]}>Next</Text>
            </TouchableOpacity>
            
          </View>
        }  

        {
           
         this.state.ShowResetPasswordOptions &&

            <View style={styles.inputContainer}>

  
 
   


           

              <View style={{ marginTop: '5%'  }}>

              <Card containerStyle={{padding: 0 ,borderTopWidth:3, borderTopColor:"#213749", margin:1}} >
              <View>
                <Text style={{ fontSize:12 }}>
                  We will send you a code that you can use to log in
               </Text>
             </View>
               <View>
                 <FlatList
                        data={this.state.ResetPasswordOptionList}

                        renderItem={this.rederItems}

                        ListHeaderComponent={() => (!this.state.ResetPasswordOptionList.length ?
                          <View >
                              <View>
                                  <Text>
                                      <Text style={style.text}> No record found.  </Text>
                                  </Text>
                              </View>

                          </View>
                          : null)
                      }
                        keyExtractor={(item, index) => index.toString()}
                       
                    />
                    
                    </View>
                    </Card>
                
              </View>
            </View>
          }
         </ScrollView>
        </View>
      </View>

     
      
    );
  }

}