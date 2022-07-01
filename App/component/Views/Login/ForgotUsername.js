import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  StatusBar,
  ScrollView, TouchableOpacity, FlatList
} from 'react-native';
import { validateAll } from 'indicative/validator'
import styles from '../../../Stylesheets/LoginCS'
import Loader from '../../../../App/component/Loader'
import { CallPI } from '../../../Api/APICall'
import { Card } from 'react-native-elements'
import RadioButton from '../Shared/RadioButton';
import AlertBox from '../Shared/MessageBox'
import appStyle from '../../../Stylesheets/NAppSS'
import CustomStatusBar from  '../../../component/Views/Shared/StatusBar'

var ResetPasswordOptionList = [];
export default class ForgotUsername extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: "",
      ResetMethod: "",
      error: {},

      ShowPassword: true,
      ShowResetPasswordOptions: false,
      ResetPasswordOptionList: [{ label: '******144', value: 0, isSelected: false },
      { label: '******299', value: 0, isSelected: false }],

      Alert_Visibility: false,
      Alert_Title: '',
      Alert_Message: '',
      Alert_MessageMode: '',
      isRedirectPage: false

    };
    // this._onPressButton = this._onPressButton.bind(this)
  }
  dismissAlert = (values) => {
    this.setState({
      Alert_Visibility: values
    })

  }
  CancelAlert = (values) => {
    this.setState({
      Alert_Visibility: values
    })

  }
  ForgotUsername = async (data) => {
    debugger
    try {




      const rules = {
        email: 'required',
      }
      const messages = {
        required: 'Required'
      }
      await validateAll(data, rules, messages)

      var email = data.email;
      this.setState({
        isLoading: true
      })
      var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      var cellphonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

      var type = "";
      if (cellphonePattern.test(data.email) == true) {
        type = "Phone";
      }
      //  alert(type)
      this.setState({
        ResetMethod: type
      })
      if (pattern.test(data.email) != true && type == "") {
        alert("Email is not valid.")
        return false;
      }
      var url = `Customers/ForgotUsername?userEmailorCellPhone=${email}&type=${type}`;
      await CallPI('POST', url, null, null, " ", null).then((response) => response.json())
        .then(responseJson => {
          if (responseJson.ErrorMessage != "" && responseJson.ErrorMessage != null) {

            this.setState({
              Alert_Visibility: true,
              Alert_Title: "Alert",
              Alert_Message: responseJson.ErrorMessage,
              Alert_MessageMode: "error"
            })
            this.setState({
              isLoading: false
            })
          }
          else {

            if (responseJson.IsCellPhone == true) {
              ResetPasswordOptionList = [];
              for (let userObject of responseJson.lstCellphone) {
                if (userObject.IsCellPhone == true) {
                  ResetPasswordOptionList.push({ label: userObject.CellPhone, value: userObject.ID.toString() + '|SMS', isSelected: false });
                }
                else {

                  ResetPasswordOptionList.push({ label: userObject.Email, value: userObject.ID.toString() + '|Email', isSelected: false });
                }

                //console.log(JSON.stringify(ResetPasswordOptionList))
                this.setState({ ResetPasswordOptionList: ResetPasswordOptionList })
              }

              this.setState({
                ShowResetPasswordOptions: true,
                ShowPassword: false,

              })
              setTimeout(() => {
                this.setState({
                  isLoading: false

                })
              }, 1000)

            }
            else {

              this.setState({
                isLoading: false
              })
              // Alert.alert("", responseJson.Message,
              //   [{
              //     text: "OK", onPress: () => {
              //       this.props.navigation.navigate("ResetPassword", {
              //         usernmame: this.state.Username
              //       });
              //     }
              //   }]
              // )
              this.setState({
                Alert_Visibility: true,
                Alert_Title: "Alert",
                Alert_Message: responseJson.Message,
                Alert_MessageMode: "success",
                isRedirectPage: true

              })
              if (this.state.isRedirectPage = true) {
                this.props.navigation.navigate("ResetPassword", {
                  usernmame: this.state.Username
                });
              }

            }
          }
        }
        ).catch(error => {
          this.setState({
            isLoading: false

          })
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

  async SelectResetOptions(methodValue) {


    var email = this.state.email;
    var resetMehtod = this.state.ResetMethod;
    var codeMethod = methodValue;
    this.setState({
      isLoading: true
    })

    var url = `Customers/SendForgotUsernameCode?email=${email}&sendCodeMethod=${codeMethod}&resetMethod=${resetMehtod}`;
   
    await CallPI('POST', url, null, null, " ", null).then((response) => response.json())
      .then(responseJson => {
      
        if (responseJson.Message != "") {
          this.setState({
            isLoading: false,
          })
          console.log("result   ======"+JSON.stringify(responseJson))
         
          this.setState({
            Alert_Visibility: true,
            Alert_Title: "Alert",
            Alert_Message: responseJson.Message,
            Alert_MessageMode: "success"
          })
          this.props.navigation.navigate("ForgotusernameEmail", {
            Email: this.state.email,
            QuesionList: responseJson.lstQuestion,
            method: this.state.ResetMethod

          });

        }
        else {
          this.setState({
            isLoading: false
          })
        }

      }).catch(error => {
        this.setState({
          isLoading: false
        })

      });



  }

  componentDidMount() {
    this.setState({
      ShowPassword: true,
      ShowResetPasswordOptions: false
    })
  }
  rederItems = ({ item, index }) => {
    return (
      <TouchableOpacity style={{ backgroundColor: index % 2 === 0 ? '#f5f4f2' : 'white', flexDirection: 'row', margin: 5, padding: 5 }} onPress={() => { this.UpdateItemStatus(index) }}>

        {

          <RadioButton props={item.isSelected} />
        }

        <Text style={appStyle.font_12}> {item.label}</Text>
      </TouchableOpacity>
    )
  }
  UpdateItemStatus = (index) => {
    const array = [...this.state.ResetPasswordOptionList];
   // console.log("ttrtrtrtttttttttttttttttt    ======"+JSON.stringify(array))
    var methodValue = array[index]['value'];
    for (var i = 0; i < array.length; i++) {

      if (i == index) {
        array[i]['isSelected'] = !array[i]['isSelected']
      }
      else {
        array[i]['isSelected'] = false;
      }

    }
    this.setState({ ResetPasswordOptionList: array })
    
    this.SelectResetOptions(methodValue)
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
          CancelAlert={this.CancelAlert}
        />
        <View style={styles.container}>

          <ScrollView >
            <Loader loading={this.state.isLoading} />
            {
              this.state.ShowPassword &&
              <View>

                <View style={styles.inputContainer}>
                  <View style={styles.inputInnerContainer}>
                    <TextInput style={styles.inputs}
                      placeholder="Email or Cell Phone"
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
                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.ForgotUsername(this.state)}>
                  <Text style={[appStyle.font_12,{ color: 'white', fontWeight: 'bold' }]}>Next</Text>
                </TouchableHighlight>
              </View>
            }

            {
              this.state.ShowResetPasswordOptions &&
              <View style={styles.inputContainer}>
                <View style={{ marginTop: '5%' }}>
                  <Card containerStyle={styles.CardList} >
                    <View>
                      <Text style={styles.CardListText}>
                        We will send you a code that you can use to log in
                      </Text>
                    </View>
                    <View>
                      <FlatList
                        data={this.state.ResetPasswordOptionList}
                        renderItem={this.rederItems}
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

