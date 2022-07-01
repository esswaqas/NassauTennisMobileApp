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
import { CommonActions } from "@react-navigation/native";
import RadioForm from 'react-native-simple-radio-button';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import AlertBox from '../../Shared/MessageBox'
import { validateAll } from 'indicative/validator'

import styles from '../../../../Stylesheets/NAppSS'
import Loader from '../../../Loader'
import Calender from '../../Shared/DatePicker'
 

import RNPickerSelect from 'react-native-picker-select';
import DropdownList from '../../Shared/DropdownList';

import UpComingSchedulerBooking from '../../Dashboard/UpComingSchedulerBooking';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { CallPI } from '../../../../Api/APICall';
//import Moment from 'moment';
const yearArry = [];
export default class AddEditCreditCard extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    Name: '',
    CardNumber: '',
    CardNumberOnlyLast4number:'',
    VerifiactionCode:'',
    City: '',
    TransarmorToken: '',
    UserID: '',
    CardID: '',
    State: '',
    StateList: [],
    Month: '',
    ZipCode: '',
    Year: '',
    Cvv: '',
    CardType: '',
    Address: '',
    error: {},
    MonthList: [{ value: '01', label: '1' }, { value: '02', label: '2' }, { value: '03', label: '3' }, { value: '04', label: '4' }, { value: '05', label: '5' }, { value: '06', label: '6' }, { value: '07', label: '7' }, { value: '08', label: '8' }, { value: '09', label: '9' }, { value: '10', label: '10' }, { value: '11', label: '11' }, { value: '12', label: '12' }],
    YearList: [],

    isLoading: false,

                // Alert Props
                Alert_Visibility: false,
                Alert_Title: '',
                Alert_Message: '',
                Alert_MessageMode: '',
                IsRedirect: false,

  }

  dismissAlert=(values)=>
  { this.setState({Alert_Visibility:values }) }
  CancelAlert=(values)=>
  { this.setState({Alert_Visibility:values }) }

  Save = async (data) => {
    try {

     
      const rules = {
        Name: 'required|string',
        CardNumber: 'required|min:16',
        City: 'required',

      
        State: 'required',
        

        Month: 'required',
        ZipCode: 'required',
        Year: 'required',
        Cvv:  'required|string|min:3',
        CardType: 'required',
        Address: 'required',
      }
      const messages = {
        required: 'Required',
        
        'CardNumber.min': 'Credit card must be at least 16 numbers.',
        'Cvv.min': 'Verification code must be at least 3 numbers.',
        
      }

       await validateAll(data, rules, messages)
       
     // this.setState({isLoading:true})
     if(this.state.UserID!=null && this.state.UserID>0 &&  this.state.CardNumberOnlyLast4number!= this.state.CardNumber){
       
      this.setState({transarmorToken:''})
     }
     else{
      this.setState({CardNumber:''})
     }
     var url =   'Customers/AddEditCreditCard?isCustomer=true';
    const LoginUserID = await AsyncStorage.getItem('LoginUserID');
      this.setState({
      UserID:LoginUserID
      })
      console.log(JSON.stringify({

        CardHolderName: this.state.Name,
        CardNumber: this.state.CardNumber,
        VerificationString: this.state.Cvv,
        Zip: this.state.ZipCode,
        Address: this.state.Address,
        City: this.state.City,
        State: this.state.State,
        UserID: this.state.UserID,
        ID: this.state.CardID,
        CardType: this.state.CardType,
        TransarmorToken: this.state.TransarmorToken,
        Year: this.state.Year,
        Month: this.state.Month
       
               
              }))
//  await fetch(url, {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify()
//       })
      var body =  new Object();
      body =
      {
        CardHolderName: this.state.Name,
        CardNumber: this.state.CardNumber,
        VerificationString: this.state.Cvv,
        Zip: this.state.ZipCode,
        Address: this.state.Address,
        City: this.state.City,
        State: this.state.State,
        UserID: this.state.UserID,
        ID: this.state.CardID,
        CardType: this.state.CardType,
        TransarmorToken: this.state.TransarmorToken,
        Year: this.state.Year,
        Month: this.state.Month
       }
      await CallPI('POST',url,body, null,'',null)
      .then((response) => response.json())
        .then(responseJson => {
          
          if(responseJson.indexOf("error") > -1){
            //Alert.alert("Error", responseJson);
            this.setState({
              Alert_Visibility:true,
              Alert_Title:"Alert",
              Alert_Message:responseJson,
              Alert_MessageMode:"error"
            })
            return false;
          }
          else{
            this.setState({
              Alert_Visibility:true,
              Alert_Title:"Alert",
              Alert_Message:responseJson,
              Alert_MessageMode:"success"
            })
            //Alert.alert("Success", responseJson);
          }
          
          this.setState({
         
            isLoading:false
          })
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'CreditCardList' },
                 
              ],
            })
          );

        }).catch(error => {
        this.setState({isLoading:false})
        });
    } catch(errors){
      const formattedErrors = {}
      errors.forEach(error => formattedErrors[error.field] = error.message);
      this.setState({
        error: formattedErrors
        
      })
    }

  }

  GetYearList() {

    var currentyear = (new Date()).getFullYear();
    var startYear = currentyear - 5;
    for (var i = startYear; i <= currentyear + 10; i++) {
      var year = i;
      yearArry.push({ value: year.toString(), label: year.toString() });
    }
    this.setState({
      YearList: yearArry
    })
  }
  SetMonthValue = value => {
    this.setState({ Month: value })
  }
  SetYesrValue = value => {
    this.setState({ Year: value })
  }
  SetStateValue= value => {
    this.setState({ State: value })
  }
  GetCardType()
  {
  if ((this.state.CardNumber)!= '' || (this.state.CardNumber)!= null) 
  {
     var type= this.CreditCardTypeFromNumber(this.state.CardNumber);
      this.setState({
        CardType:type
      })
  } 
  else
  {
      
      //alert("Please enter valid credit card number.");
      this.setState({
        Alert_Visibility:true,
        Alert_Title:"Warning",
        Alert_Message:"Please enter valid credit card number.",
        Alert_MessageMode:"Warning"
      })
      this.setState({
        CardNumber:'',
        CardType:''
      })
      return false;
  }

}
  CreditCardTypeFromNumber(num) {
  // first, sanitize the number by removing all non-digit characters.
  num = num.replace(/[^\d]/g, '');
  // now test the number against some regexes to figure out the card type.
  if (num.match(/^5[1-5]\d{14}$/)) {
      return 'mastercard';
  } else if (num.match(/^4\d{15}/) || num.match(/^4\d{12}/)) {
      return 'visa';
  } else if (num.match(/^3[47]\d{13}/)) {
      return 'American Express';
  } else if (num.match(/^6011\d{12}/)) {
      return 'discover';
  }
  else if (num.match(/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/)) {
      return 'Diners Club';
  }
  else if (num.match(/^(?:2131|1800|35\d{3})\d{11}$/)) {
      return 'jcb';
  }
  return '';
}


  async GetStateList() {
    var url =  `Common/GetStates?state=""`;
    // await fetch(url, {
    //   method: "GET",
    // })
    await CallPI('GET',url,null,null,'',null)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          StateList: responseJson
        })
      }
      ).catch(error => {
      });
  }
  async GetCardDetail(cardID) {

    var url = `Customers/AddEditCreditCard?CardID=${cardID}&&isEdit=true`;
  
    // await fetch(url, {
    //   method: "GET",
    // })
    await CallPI('GET',url,null,null,'',null)
      .then(response => response.json())
      .then(responseJson => {
      console.log(JSON.stringify(responseJson))
        this.setState({
          CardNumber:responseJson.Data.cardNumberOnlyLast4number,
          CardNumberOnlyLast4number:responseJson.Data.cardNumberOnlyLast4number,
          Name: responseJson.Data.cardHolderName,
          Address: responseJson.Data.address,
          City: responseJson.Data.city,
          State: responseJson.Data.state,
          ZipCode: responseJson.Data.zip,
          Cvv: responseJson.Data.cvv,
          Month: responseJson.Data.month,
          Year: responseJson.Data.year,
          CardID: responseJson.Data.cardID,
          UserID: responseJson.Data.userID,
          TransarmorToken: responseJson.Data.transarmorToken,
          CardType: responseJson.Data.creditCardType
        })
        
      }
      ).catch(error => {
        
      })
  }
  async componentDidMount() {
    this.GetYearList()
    await this.GetStateList()
    var  cardID =   this.props.route.params.cardID;
    
    if(cardID!= null && cardID>0){
     
     this.GetCardDetail(cardID)
    }

    // this.setState({
    //   CardNumber: "4788250000028291",
    //   Name: "waqas",
    //   Address: "adree",
    //   City: "cc",
    //   State: "AL",
    //   ZipCode: "1233",
    //   Cvv: "123",
    //   Month: "10",
    //   Year: "2023",
    //   CardID: "",
    //   UserID: "waqas",
    //   TransarmorToken: "",
    //   CardType: "visa",
    // })
  }
  CancelTransaction=()=>{
    this.props.navigation.reset({routes: [{ name: 'CreditCardList' }]});
    // this.props.navigation.dispatch(

    //     CommonActions.reset({
    //         index: 0,
    //         routes: [
    //             {
    //                 name: 'CreditCardList',
    //             },
    //             { name: 'CreditCardList' },
    //         ],
    //     })

    // ) 
}

  render() {
    return (
      <View style={styles.Pagecontainer}>
      <View style={styles.container}>
      <AlertBox
        displayMode={this.state.Alert_MessageMode}
        MessageType={''} 
        displayMsg={this.state.Alert_Message}
        Title={this.state.Alert_Title}
        visibility={this.state.Alert_Visibility}

        dismissAlert={this.dismissAlert}
        CancelAlert = {this.CancelAlert}
      />
        <Loader loading={this.state.isLoading} />
      
        <ScrollView style={styles.PageScroll_heght}>
         

            <View style={[styles.inputContainer]}>
              <View style={styles.inputInnerContainer}>
                <TextInput style={styles.inputs}
                  placeholder=" Name"
                  value={this.state.Name}
                  
                  onChangeText={(Name) => this.setState({ Name })}
                />
              </View>
              <View >
                {
                  this.state.error['Name'] && <Text style={styles.ErrorMessage}>{this.state.error['Name']}</Text>
                }
              </View>
            </View>

            <View style={[styles.inputContainer]}>
              <View style={styles.inputInnerContainer}>
                <TextInput style={styles.inputs}
                  placeholder="Card Number"
                  keyboardType='numeric'
                  maxLength={16}
                  value={this.state.CardNumber}
                  underlineColorAndroid='transparent'
                  onChangeText={(CardNumber) => this.setState({ CardNumber })}
                  onEndEditing={() => this.GetCardType( )}
                />

              </View>
              <View >
                {
                  this.state.error['CardNumber'] && <Text style={styles.ErrorMessage}>{this.state.error['CardNumber']}</Text>
                }
              </View>
            </View>
            <View style={[styles.inputContainer]}>
              <View style={styles.inputInnerContainer}>
                <TextInput style={styles.inputs}
                  placeholder="Card Type"
                  value={this.state.CardType}

                  underlineColorAndroid='transparent'
                  onChangeText={(cardType) => this.setState({ cardType })}
                  editable={false}
                />

              </View>
              
            </View>
            <View style={styles.inputContainer}>
              <View style={{flexDirection:'row'}}>
                
             
             

              
            
 

                {/* <Picker
                  style={{ width: '50%', backgroundColor: '#ECEDEB' }}
                  selectedValue={this.state.Month}

                  onValueChange={(itemValue, itemIndex) => this.SetMonthValue(itemValue)}
                >

                  <Picker.Item label='Select Month' value='' key='' color='gray' />
                  {
                    this.state.MonthList.map((v) => {
                      return <Picker.Item label={v.label} value={v.value} key={v.value} />
                    })
                  }

                  
                </Picker> */}

                  {/* <RNPickerSelect
                   style={{ width: '50%', backgroundColor: '#ECEDEB' }}
               onValueChange={(value) => this.SetMonthValue(value)} 
            value={this.state.Month}
            placeholder={{ label: "Select Month", value: "" }}
            items={  this.state.MonthList}
        /> */}

        <View style={{ width: '50%' , marginRight:2}}>
        <View style={styles.DropDownInnerContainer}>
       
         <DropdownList 
                 OptionList ={this.state.MonthList}
                 PlaceHolderText={"Month"}
                 selectedValue= {this.state.Month}
                 setValue={this.SetMonthValue}
                 />
 </View>
 <View >
                {
                  this.state.error['Month'] && <Text style={styles.ErrorMessage}>{this.state.error['Month']}</Text>
                }
              </View>
 </View>
                {/* <Picker style={{ width: '50%', backgroundColor: '#ECEDEB' }}
                  selectedValue={this.state.Year}

                  onValueChange={(itemValue, itemIndex) => this.SetYesrValue(itemValue)}
                >
                  <Picker.Item label='Select Year' value='' key='' color='gray' />
                  {
                    this.state.YearList.map((v) => {
                      return <Picker.Item label={v.label} value={v.value} key={v.value} />
                    })
                  }

                </Picker> */}
                <View style={{ width: '50%' , marginLeft:2}}> 
                 <View style={styles.DropDownInnerContainer}>
                <DropdownList 
                 OptionList ={this.state.YearList}
                 PlaceHolderText={"Year"}
                 selectedValue= {this.state.Year}
                 setValue={this.SetYesrValue}
                 />
               </View>
                  {/* <RNPickerSelect
                  style={{ width: '50%', backgroundColor: '#ECEDEB' }}
                  onValueChange={(value) => this.SetYesrValue(value)} 
                  value={this.state.Year}
                  placeholder={{ label: "Select Year", value: "" }}
                  items={  this.state.YearList}
                  /> */}
              <View>
                {
                  this.state.error['Year'] && <Text style={styles.ErrorMessage}>{this.state.error['Year']}</Text>
                }
              </View>
              </View>
            
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>
                <TextInput style={styles.inputs}
                  value={this.state.Cvv}
                  placeholder="Cvv"
                  underlineColorAndroid='transparent'
                  keyboardType='numeric'
                  maxLength={4}
                  onChangeText={(Cvv) => this.setState({ Cvv })}

                />
              </View>
              <View>
                {
                  this.state.error['Cvv'] && <Text style={styles.ErrorMessage}>{this.state.error['Cvv']}</Text>
                }
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>
                <TextInput style={styles.inputs}
                  value={this.state.Address}
                  placeholder="Number + Address "
                  underlineColorAndroid='transparent'
                  onChangeText={(Address) => this.setState({ Address })}

                />
              </View>
              <View>
                {
                  this.state.error['Address'] && <Text style={styles.ErrorMessage}>{this.state.error['Address']}</Text>
                }
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>
                <TextInput style={styles.inputs}
                  value={this.state.City}
                  placeholder="City"
                  underlineColorAndroid='transparent'
                  onChangeText={(City) => this.setState({ City })}

                />
              </View>
              <View>
                {
                  this.state.error['City'] && <Text style={styles.ErrorMessage}>{this.state.error['City']}</Text>
                }
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.DropDownInnerContainer}>
              <DropdownList 
                 OptionList ={this.state.StateList}
                 PlaceHolderText={"State"}
                 selectedValue= {this.state.State}
                 setValue={this.SetStateValue}

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
                  value={this.state.ZipCode}
                  keyboardType='numeric'
                  placeholder="Zip"
                  maxLength={5}
                  underlineColorAndroid='transparent'
                  onChangeText={(ZipCode) => this.setState({ ZipCode })}

                />
              </View>
              <View>
                {
                  this.state.error['ZipCode'] && <Text style={styles.ErrorMessage}>{this.state.error['ZipCode']}</Text>
                }
              </View>
            </View>




            
            </ScrollView>

            <View style={styles.PageFooter_heght}>
            <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.Save(this.state)} >
              <Text style={styles.buttunTextColo}>Save</Text>
            </TouchableOpacity>
           
            <TouchableOpacity style={[styles.buttonContainer_danger]} onPress={() => this.CancelTransaction()} >
              <Text style={styles.buttunTextColo}>Cancel</Text>
            </TouchableOpacity>
            
             
             
     
      </View>
      </View>
      </View>


    );

  }

}

