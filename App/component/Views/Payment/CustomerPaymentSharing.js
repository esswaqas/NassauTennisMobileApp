
import * as React from 'react';
import {StyleSheet,Text,View,TextInput,Button,TouchableOpacity,Image,Alert,ScrollView} from 'react-native';
 
 
import CustomSwitch from '../../Views/Shared/CustomSwitch';
import AlertBox from '../../Views/Shared/MessageBox'
import {CreditCartType} from  '../../Views/Customers/CreditCard/GetCartType'

import DropdownList from '../../Views/Shared/DropdownList'
import RadioForm from 'react-native-simple-radio-button';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from '../../Views/Shared/CheckBox';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
 import { validateAll } from 'indicative/validator'
import styles from ' ../../../App/Stylesheets/NAppSS'
import Loader from '../../Loader'
import { Card } from 'react-native-elements';
import { CallPI } from '../../../Api/APICall';
import {AmountFormat} from '../Shared/Contans'
var CreditCardOptionList = [
    { label: 'New', value: 'New' },
    { label: 'On File', value: 'onFile' },
];
const yearArry = [];

export default class Payment extends React.Component {
    constructor(props) {
        super(props)

    }
    state = {
        ShowTotalAmount: '',
        TotalAmount: '',
        CustomerPaySharingList: '',
        ShowHosueCerdit: '',
        isLoading:false,
        HosueCerdit: '',
        HouseCreditAmount: '',
        UseHouseCredit:'',
        CardHolderName: '',
        isCustomerPayShare : false,
        CardNumber: '',
        CardNumberOnlyLast4number: '',
        VerifiactionCode: '',
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
        OnFileCreditCard: '',
        OnFileCreditCardList: [],
        MonthList: [{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6', label: '6' }, { value: '7', label: '7' }, { value: '8', label: '8' }, { value: '9', label: '9' }, { value: '10', label: '10' }, { value: '11', label: '11' }, { value: '12', label: '12' }],
        YearList: [],
        IsPaywithHouseCredit: false,
        isUseFileCredit: false,
        creditCardOption: "New",
        HouseCreditUsageMessage:'',
        isFullPaymentWithHOuseCredit:false,
        Editable:true,
        IsLoadProfile:false,
        IsKeepOnFile:false,
// message box
Alert_Visibility: false,
Alert_Title: '',
Alert_Message: '',
Alert_MessageMode: '',
isRedirectPage: false,
IsUpdateCreditInfoShow: false,
ShowAvailableCreditCardInfo: true
    }

    dismissAlert = (values) => {
        this.setState({ Alert_Visibility: values })
        if (this.state.IsUpdateCreditInfoShow === true) {
            this.UpdateCredtInfoShow()
        }
        if (this.state.isRedirectPage == true) {
            this.Redirect()
        }
    }
    CancelAlert = (values) => {
        this.setState({ Alert_Visibility: values })
        if (this.state.IsUpdateCreditInfoShow === true) {
            this.UpdateCredtInfoShow()
        }
        // if (this.state.isRedirectPage == true) {
        //     this.Redirect()
        // }
    }
    GetYearList() {

        var currentyear = (new Date()).getFullYear();
        var startYear = currentyear ;
        for (var i = startYear; i <= currentyear + 10; i++) {
            var year = i;
            yearArry.push({ value: year.toString(), label: year.toString() });
        }

        this.setState({
            YearList: yearArry
        })
    }

    SetMonthValue = (value) => {
        this.setState({ Month: value })
    }
    SetYesrValue = (value)=> {
        this.setState({ Year: value })
    }
    SetStateValue=(value) => {
        this.setState({ State: value })
    }

    async GetStateList() {
        var url =   `Common/GetStates?state=""`;
        // await fetch(url, {
        //     method: "GET",
        // })
        await  CallPI('GET', url,null,null, ' ',  null)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    StateList: responseJson
                })
            }
            ).catch(error => {
            })
    }

    GetCustomerPaySharingDetail = async (id,MainID,bookID,amount) =>
     {
      
     //   var Cart = await AsyncStorage.getItem('AddToCart');
        const LoginUserID = await AsyncStorage.getItem('LoginUserID');
        var url =  'CustomerScheduler/PaymentSharing?ID=' + id + '&logInUserID=' + LoginUserID + '&BooKID=' + bookID + '&MainID=' + MainID + '&amount=' + amount
    await CallPI('POST', url,"",LoginUserID, "",null )
        .then(response => response.json())
        .then(responseJson => {
    console.log("fh sdf                    === = == = = ==   "+JSON.stringify(responseJson))
               if (responseJson.clinicModel.PaySharingError !=null && !(responseJson.clinicModel.PaySharingError = '')   ) 
               {
                    if (responseJson.clinicModel.PaySharingError == 'Customer is not a participant.') {
                        //Alert.alert("Error", responseJson.clinicModel.PaySharingError)
                        this.setState({
                            Alert_Visibility: true,
                            Alert_Title: "Alert",
                            Alert_Message: responseJson.clinicModel.PaySharingError,
                            Alert_MessageMode: "error"
                        })
                    }
                    this.Redirect()
                    return false
                }
          
         //  alert("CArt from start =  "+ JSON.stringify(responseJson.cart))
            this.setState({

                ShowTotalAmount:  AmountFormat(responseJson.clinicModel.TotalAmount),
                ShowHosueCerdit:  AmountFormat(responseJson.clinicModel.HouseCreditAmount),
                isLoading: false,
                HouseCreditAmount: responseJson.clinicModel.HouseCreditAmount,
                TotalAmount: responseJson.clinicModel.TotalAmount,
                CustomerPaySharingList: JSON.stringify(responseJson.cart)
            })
            var fileCard = [];
            for (let userObject of responseJson.clinicModel.lstUserCreditCardInformation)
             {
                fileCard.push({ label: userObject.Description, value: userObject.ID });
             }
            this.setState({ OnFileCreditCardList: fileCard })
        }).catch(error => {
           // alert(JSON.stringify("rororr =="+error))
            this.setState({ isLoading: false })

        });



    }

    onSelectSwitch = index => {
       
        this.SelectCreditCardOption(index == 1 ? 'New' : index == 2 ? 'onFile' : '')
    };

    SelectCreditCardOption = async (values) => {
        if (values == "onFile") {
            this.setState({

                isUseFileCredit: true,
                Editable:false,
                IsLoadProfile: false,
                IsKeepOnFile: false,  Address: '',
                City: '',
                State: '',
                ZipCode: '',
                creditCardOption:'onFile',


            })
          //  alert(JSON.stringify(this.state.OnFileCreditCardList))
        }
        else {
         // await this.GetCustomerAddress('')
            this.setState({

                isUseFileCredit: false,
                IsLoadProfile: false,
                Editable:true.valueOf,         
                       IsKeepOnFile: true,  Address: '',
                       City: '',
                       State: '',
                       ZipCode: '',
                       creditCardOption:'New',


            })

        }
    }

 
    ConfirmHouseCredit= async ()=>{
        
        if(this.state.UseHouseCredit==''){
           // Alert.alert("Error", "Please enter amount first.");
            this.setState({
                Alert_Visibility: true,
                Alert_Title: "Alert",
                Alert_Message: "Please enter amount first.",
                Alert_MessageMode: "error"
            })
            return false;
        }
    //    alert(this.state.HouseCreditAmount)
        var houseCredit = parseFloat(this.state.HouseCreditAmount);
        var totalDueAmount = parseFloat(this.state.TotalAmount);
        //this.setState({ IsPaywithHouseCredit:true})
       //  alert(houseCredit+"  ,"+ totalDueAmount)
        return this.creditCardValidation(houseCredit, this.state.UseHouseCredit, totalDueAmount);
    }
     
    
      creditCardValidation(houseCredit, enterAmount, totalDueAmount) {
        
        houseCredit = houseCredit > totalDueAmount ? totalDueAmount : houseCredit;
        var enterHouseCredit = parseFloat(enterAmount);
        //  if (enterHouseCredit > houseCredit || enterHouseCredit > totalDueAmount) {

         if (enterHouseCredit > totalDueAmount) {
             ///Alert.alert('Error', "Adjust Amount of House Credit to Apply.");
             this.setState({
                Alert_Visibility: true,
                Alert_Title: "Alert",
                Alert_Message: "Adjust Amount of House Credit to Apply.",
                Alert_MessageMode: "error",
                IsUpdateCreditInfoShow: true
            })
            return false;
        }
        else if (enterHouseCredit > houseCredit ) {

            this.setState({UseHouseCredit:houseCredit.toString()})
            this.setState({ HouseCreditUsageMessage:"Select Card on File, or Enter New Card Information for remaining balance of $" + parseFloat(totalDueAmount - enterHouseCredit).toFixed(2) + " Payment."})
            this.setState({ IsPaywithHouseCredit:true,  isFullPaymentWithHOuseCredit:false})
            return false;
       }
        //$(".txtHouseCredit").val(parseFloat(enterAmount).toFixed(2));
        ///if person use house credit only then no need for credit card and vice versa

        if (this.state.UseHouseCredit == totalDueAmount) {

            this.setState({ HouseCreditUsageMessage:"House Credit will be used for entire payment.\nPlease Click 'Submit' below."})
            this.setState({ IsPaywithHouseCredit:true,
             isFullPaymentWithHOuseCredit:true
            })
           // Alert.alert("Alert","Click ‘Submit’ to use Available House Credit,\nor \n‘Reset Credit’ to use Credit Card.")
            this.setState({
                Alert_Visibility: true,
                Alert_Title: "Alert",
                Alert_Message: "Click ‘Submit’ to use Available House Credit,\nor \n Click 'Reset Credit’ to use Credit Card.",
                Alert_MessageMode: "success",
                IsUpdateCreditInfoShow: true
            })

        } else {
            
            this.setState({ HouseCreditUsageMessage:"Select Card on File, or Enter New Card Information for remaining balance of $" + parseFloat(totalDueAmount - enterHouseCredit).toFixed(2) + " Payment."})
            this.setState({ IsPaywithHouseCredit:true,  isFullPaymentWithHOuseCredit:false})
            //$(".dvHouseCreditMessage").show();
        }
        return true;
    }

    ResetHouseCredit(){
        this.setState({ UseHouseCredit:'',  isFullPaymentWithHOuseCredit:false, IsPaywithHouseCredit:false})
    }

    GetOnFileCreditCardOption = async (value) => {
       // alert(1)

       // var name  = this.state.OnFileCreditCardList.find(data=>data.value==value).label;
        var url =   `Customers/GetCreditCardByCardID?CardID=${value}&&isGetCard=true`;
  
    // await fetch(url, {
    //   method: "GET",
    // })
    await  CallPI('GET', url,null,null, ' ',  null)
      .then(response => response.json())
      .then(responseJson => {
      console.log(JSON.stringify(responseJson))
        this.setState({
          CardNumber:responseJson.Data.cardNumberOnlyLast4number,
          CardNumberOnlyLast4number:responseJson.Data.cardNumberOnlyLast4number,
          CardHolderName: responseJson.Data.cardHolderName,
          Address: responseJson.Data.address,
          City: responseJson.Data.city,
          State: responseJson.Data.state,
          ZipCode: responseJson.Data.zip,
          VerifiactionCode: responseJson.Data.cvv,
          Month: responseJson.Data.month,
          Year: responseJson.Data.year,
          CardID: responseJson.Data.cardID,
          UserID: responseJson.Data.userID,
          TransarmorToken: responseJson.Data.transarmorToken,
          CardType: responseJson.Data.creditCardType,
          OnFileCreditCard: value,
          IsLoadProfile:false,
        })
      }
      ).catch(error => {
        this.setState({
            CardNumber:'',
            CardNumberOnlyLast4number:'',
            CardHolderName: '',
            Address: '',
            City:    '',
            State:   '',
            ZipCode: '',
            VerifiactionCode: '',
            Month:  '',
            Year:   '',
            CardID: '',
            UserID: '',
            TransarmorToken: '',
            CardType: '',
            OnFileCreditCard: '',
            IsLoadProfile:false,
          })
      })
      
    }
    GetCustomerAddress = async () => {
        if(this.state.creditCardOption !='New'){
            this.setState({ IsLoadProfile: false })

            return false
        }
       let  isLoad= !this.state.IsLoadProfile
        if(isLoad==true)
        {
           
        const LoginUserID = await AsyncStorage.getItem('LoginUserID');
        var url =   `Customers/GetCustomerAddress?customerID=${LoginUserID}&&isGetAddress=true`;
  console.log(url)
    // await fetch(url, {
    //   method: "GET",
    // })
    await  CallPI('GET', url,null,null, ' ',  null)
      .then(response => response.json())
      .then(responseJson => {
      console.log("TEAT     ttttttttttttt======"+JSON.stringify(responseJson))
        this.setState({
          Address: responseJson.Data.address,
          City: responseJson.Data.city,
          State: responseJson.Data.state,
          ZipCode: responseJson.Data.zip,
        })
        
      }
      ).catch(error => {
        alert(error)
      })
    }else{
        this.setState({
            Address: '',
            City: '',
            State: '',
            ZipCode: '',
          })
    }

    this.setState({IsLoadProfile:isLoad})
    }
    SetKeepOnFile = async () => {
        if(this.state.creditCardOption =='New'){
            this.setState({ IsKeepOnFile: !this.state.IsKeepOnFile })
        }
        else{
            this.setState({ IsKeepOnFile: false })

        }

         // this.setState({IsKeepOnFile:!this.state.IsKeepOnFile})
    }
     
    ProcessPayment=async (data)=>{

        try {
//var houseCreditAmount=0;
     var prrcessObj = new Object();
            const rules = {
              CardHolderName: 'required|string',
              CardNumber: 'required|min:16',
              City: 'required',
              State: 'required',
              Month: 'required',
              ZipCode: 'required',
              Year: 'required',
              VerifiactionCode:  'required|string|min:3',
              CardType: 'required',
              Address: 'required',
            }
            const messages = {
              required: 'Required',
              
              'CardNumber.min': 'Credit card must be at least 16 numbers.',
              'VerifiactionCode.min': 'Verification code must be at least 3 numbers.',
              
            }
            var houseCredit = parseFloat(this.state.HouseCreditAmount);
            var totalDueAmount = parseFloat(this.state.TotalAmount);
            //this.setState({ IsPaywithHouseCredit:true})
          //  alert(houseCredit+"  ,"+ totalDueAmount)
          if (this.state.ShowAvailableCreditCardInfo === true) {
            var result =  this.creditCardValidation(houseCredit, this.state.UseHouseCredit, totalDueAmount);
          
            console.log(result)
            if(result==false)
            {
                return false;
            }
        }
            
            
            if(!this.state.isFullPaymentWithHOuseCredit==true)
            {
             await validateAll(data, rules, messages)
            }
            //  this.setState({
            //     isLoading:true
            //   })
         
           var url =  'CustomerScheduler/ProcessPaymentSharing'
          const LoginUserID = await AsyncStorage.getItem('LoginUserID');
          var Cart = await AsyncStorage.getItem('AddToCart');
   
  
  
            this.setState({
            UserID:LoginUserID
            })
            prrcessObj.processPaymentModel={
                CardHolderName: this.state.CardHolderName,
                CardNumber: this.state.CardNumber,
                VerificationString: this.state.VerifiactionCode,
                Zip: this.state.ZipCode,
                Address: this.state.Address,
                City: this.state.City,
                State: this.state.State,
                UserID: this.state.UserID,
                ID: this.state.CardID,
                CardType: this.state.CardType,
                TransarmorToken: this.state.TransarmorToken,
                Year: this.state.Year,
                Month: this.state.Month,
                IsDefault: this.state.IsKeepOnFile
            };
            console.log("reree  = == = = = "+this.state.CustomerPaySharingList)
            prrcessObj.cartItem =JSON.parse(this.state.CustomerPaySharingList)
            prrcessObj.HouseCredit =   this.state.UseHouseCredit;
            prrcessObj.loginUserID = LoginUserID;
            prrcessObj.isFullPaymentWithHOuseCredit = this.state.isFullPaymentWithHOuseCredit;
            console.log(url) 
            console.log(JSON.stringify(prrcessObj)) 
           // return false;
    //    await fetch(url, {
    //           method: 'POST',
    //           headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify(
    //             prrcessObj
    //           )
    //         })

            await  CallPI('POST', url,prrcessObj,null, '',  null)
            .then((response) => response.json())
              .then(responseJson => {
                  console.log(JSON.stringify({responseJson}))
                if(responseJson.PaymentProcessError!=null&& responseJson.PaymentProcessError!=""){
                 // Alert.alert("Error", responseJson.PaymentProcessError);
                  this.setState({
                    Alert_Visibility: true,
                    Alert_Title: "Alert",
                    Alert_Message: responseJson.PaymentProcessError,
                    Alert_MessageMode: "error"
                })
                  this.setState({
                    isLoading:false
                  })
                  return false;
                }
                else{
                    this.setState({

                        Alert_Visibility: true,
                        Alert_Title: "Alert",
                        Alert_Message: responseJson.PaymentProcessSuccess,
                        Alert_MessageMode: "success",
                        isRedirectPage: true,

                    })
                    //Alert.alert("Success",responseJson.PaymentProcessSuccess)
                
                   // this.Redirect()
       }
                this.setState({
                  isLoading:false
                })
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

    async Redirect() {
        await  AsyncStorage.removeItem("AddToCart");
        this.props.navigation.reset({ routes: [{ name: 'DashboardList' }] });
        }
    CancelTransaction=()=>{
        this.props.navigation.reset({ routes: [{ name: 'DashboardList' }] });
        // this.props.navigation.dispatch(

        //     // CommonActions.reset({
        //     //     index: 0,
        //     //     routes: [
        //     //         {
        //     //             name: 'Payment',
        //     //         },
        //     //         { name: 'DashboardList' },
        //     //     ],
        //     // })
    
        // ) 
    }
    async componentDidMount() {
     
        this.GetYearList()
        await this.GetStateList()
       
      //var ispayShar = this.props.route.params?.isCustomerPayShare==null? false : this.props.route.params.isCustomerPayShare;
        //   alert("ID==" + this.props.route.params.ID)
        //   alert("MainID==" + this.props.route.params.MainID)
        //   alert("bookID==" + this.props.route.params.bookID)
        //   alert("amount==" + this.props.route.params.amount)
        //if(ispayShar==true){
           // alert('Pay shar')
         //   setState({isCustomerPayShare:true})
         //}
       await  this.GetCustomerPaySharingDetail  (this.props.route.params.ID,this.props.route.params.MainID,this.props.route.params.bookID,this.props.route.params.amount)
         
        var houseCredit = parseFloat(this.state.HouseCreditAmount);
        if (houseCredit > 0 && this.state.ShowAvailableCreditCardInfo === true) {
            var totalDueAmount = parseFloat(this.state.TotalAmount);
            this.setState({ UseHouseCredit: this.state.TotalAmount.toString() })
            this.creditCardValidation(houseCredit, totalDueAmount, totalDueAmount);
        }
       
       // await this.GetCustomerAddress('')
        
        if(this.state.creditCardOption=='New')
        {
          this.setState({IsKeepOnFile:true})
        }
    }

    UpdateCredtInfoShow() {

        //alert('test')
      //  alert(11)
        this.setState({ ShowAvailableCreditCardInfo: false })
    }
    async    SetCreditCard(number)
    {
         
        var cardType= await CreditCartType(number)
       
       this.setState({CardNumber:number,CardType:cardType })

    }
    render() {

        return (
            

            <View style={[styles.Pagecontainer]}>
                <AlertBox

                    displayMode={this.state.Alert_MessageMode}
                    MessageType={''}
                    displayMsg={this.state.Alert_Message}
                    Title={this.state.Alert_Title}
                    visibility={this.state.Alert_Visibility}
                    dismissAlert={this.dismissAlert}
                    CancelAlert={this.CancelAlert}

                />
                <View style={styles.containerWithCard}>
                    <ScrollView >
                        <Loader loading={this.state.isLoading} />
                        <Card containerStyle={styles.PageCardHeader}>

                            <View style={styles.ListItemRow_secondary}>
                                <Text style={styles.ListRowText}>
                                    Total Due for selected item(s): {this.state.ShowTotalAmount}

                                </Text>
                            </View>
                            <View style={styles.ListItemRow}>
                                <Text style={styles.ListRowText}>

                                    No charge if registration is not accepted.
                                </Text>
                            </View>
                            <View style={styles.ListItemRow_secondary}>
                                <Text style={styles.ListRowText}>
                                    Available House Credit: {this.state.ShowHosueCerdit}
                                </Text>
                            </View>

                            <View style={[styles.inputContainer]}>
                                <View style={styles.inputInnerContainer}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <View style={{ width: '58%' }}>
                                            <TextInput style={[styles.inputs]}
                                                placeholder="Enter House Credit"
                                                value={this.state.UseHouseCredit}
                                                keyboardType={"number-pad"}
                                                underlineColorAndroid='transparent'
                                                onChangeText={(UseHouseCredit) => this.setState({ UseHouseCredit })} />
                                        </View>


                                        <View style={{ width: '42%', alignItems: 'flex-end', justifyContent: 'center', }}>

                                            <TouchableOpacity style={[styles.buttonContainer, { marginBottom: 0, marginRight: 10, padding: 5 }]} onPress={() => this.ConfirmHouseCredit()} >
                                                <Text style={[styles.buttunTextColo]}>Confirm Credit</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>


                                </View>


                            </View>
                            {this.state.IsPaywithHouseCredit &&
                                <View style={[styles.inputContainer]}>
                                    <View style={styles.inputInnerContainer}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ width: '58%' }}>
                                                <Text style={[styles.Color_danger, styles.fontFamily,styles.font_12]}>

                                                    {
                                                        this.state.HouseCreditUsageMessage
                                                    }
                                                </Text>
                                            </View>
                                            <View style={{ width: '42%', alignItems: 'flex-end', justifyContent: 'center', }}>
                                                <TouchableOpacity style={[styles.buttonContainer_danger, { marginBottom: 0, marginRight: 5, padding: 6 }]} onPress={() => this.ResetHouseCredit()} >
                                                    <Text style={[styles.buttunTextColo]}>Reset Credit</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>}
                        </Card>

                        <View style={[styles.inputContainer, { marginTop: 10 }]}>
                            <View style={{ alignItems: 'center' }}>
                                <CustomSwitch
                                    selectionMode={this.state.creditCardOption == 'New' ? 1 : this.state.creditCardOption == 'onFile' ? 2 : 0}
                                    roundCorner={true}
                                    option1={'New'}
                                    option2={'On File'}

                                    onSelectSwitch={this.onSelectSwitch}
                                    selectionColor={'#88aa31'}
                                />
                            </View>


                        </View>





                        {
                            this.state.isUseFileCredit == true
                            &&
                            <View style={styles.inputContainer}>
                                <View style={styles.innerDropdownContainer}>

                                    <DropdownList
                                        OptionList={this.state.OnFileCreditCardList}
                                        PlaceHolderText={"Credit Card"}
                                        selectedValue={this.state.OnFileCreditCard}
                                        setValue={this.GetOnFileCreditCardOption}
                                    />

                                    {/* <RNPickerSelect
                                            onValueChange={(value) => this.GetOnFileCreditCardOption(value)}
                                            value={this.state.OnFileCreditCard}
                                            placeholder={{ label: "Select Credit Card", value: "" }}
                                            items={this.state.OnFileCreditCardList}
                                        /> */}
                                </View>

                                <View >
                                    {
                                        this.state.error['State'] && <Text style={styles.ErrorMessage}>{this.state.error['State']}</Text>
                                    }
                                </View>
                            </View>


                        }
                        <View style={styles.inputContainer}>
                            <View style={styles.inputInnerContainer}>

                                <TextInput style={styles.inputs}
                                    placeholder="Card Number"
                                    keyboardType={"numeric"}
                                    value={this.state.CardNumber}
                                    editable={this.state.Editable}
                                    maxLength={16}
                                    onChangeText = {(CardNumber)=> this.SetCreditCard(CardNumber)}
                           
                                />
                            </View>
                            <View>
                                {
                                    this.state.error['CardNumber'] && <Text style={styles.ErrorMessage}>{this.state.error['CardNumber']}</Text>
                                }
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.inputInnerContainer}>
                                <TextInput style={styles.inputs}
                                    placeholder="Name Shown on Card"
                                    value={this.state.CardHolderName}
                                    editable={this.state.Editable}

                                    onChangeText={(CardHolderName) => this.setState({ CardHolderName })}
                                />
                            </View>
                            <View>
                                {
                                    this.state.error['CardHolderName'] && <Text style={styles.ErrorMessage}>{this.state.error['CardHolderName']}</Text>
                                }
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputInnerContainer}>
                                <TextInput style={styles.inputs}
                                    placeholder="Card Type"
                                    value={this.state.CardType}
                                    editable={false}
                                    onChangeText={(CardType) => this.setState({ CardType })}
                                />
                            </View>
                            <View>
                                {
                                    this.state.error['CardType'] && <Text style={styles.ErrorMessage}>{this.state.error['CardType']}</Text>
                                }
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputInnerContainer}>
                                <TextInput style={styles.inputs}
                                    placeholder="Verification / CVV2"
                                    value={this.state.VerifiactionCode}
                                    editable={this.state.Editable}
                                    keyboardType='numeric'
                                    maxLength={4}

                                    onChangeText={(VerifiactionCode) => this.setState({ VerifiactionCode })}
                                />
                            </View>
                            <View>
                                {
                                    this.state.error['VerifiactionCode'] && <Text style={styles.ErrorMessage}>{this.state.error['VerifiactionCode']}</Text>
                                }
                            </View>
                        </View>
                        <View style={styles.inputContainer}>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                <View style={{ width: '50%' }}>


                                    <View style={styles.DropDownInnerContainer}>



                                        {/* <RNPickerSelect

                                                onValueChange={(value) => this.SetMonthValue(value)}
                                                value={this.state.Month}
                                                placeholder={{ label: "Select Month", value: "" }}
                                                items={this.state.MonthList}
                                            /> */}

                                        <DropdownList
                                            OptionList={this.state.MonthList}
                                            PlaceHolderText={"Month"}
                                            selectedValue={this.state.Month}
                                            setValue={this.SetMonthValue}
                                        />

                                    </View>
                                </View>

                                <View style={{ width: '48%' }}>
                                    <View style={styles.DropDownInnerContainer}>

                                          <DropdownList
                                            OptionList={this.state.YearList}
                                            PlaceHolderText={"Year"}
                                            selectedValue={this.state.Year}
                                            setValue={this.SetYesrValue}
                                            />

                                        {/* <RNPickerSelect
                                            onValueChange={(value) => this.SetYesrValue(value)}
                                            value={this.state.Year}
                                            placeholder={{ label: "Select Year", value: "" }}
                                            items={this.state.YearList}
                                        /> */}


                                    </View>
                                </View>
                            </View>


                            <View >
                                {
                                    this.state.error['Month'] && <Text style={styles.ErrorMessage}>{this.state.error['Month']}</Text>
                                }
                            </View>
                        </View>
                        <View style={styles.Checkboxcontainer}>
                        <CheckBox
                              title={"Load from profile"}
                              checked={this.state.IsLoadProfile}
                              setValue={this.GetCustomerAddress}
                            />
                            {/* <CheckBox
                                style={{ justifyContent: 'space-between' }}
                                value={this.state.IsLoadProfile}
                                onFillColor={'#72797f'}
                                tintColors={{ true: '#72797f' }}
                                onChange={(val) => this.GetCustomerAddress(val)} />

                            <Text style={{ justifyContent: 'space-between' }} >
                                Load from profile

                            </Text> */}
                            <View>

                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputInnerContainer}>
                                <TextInput style={styles.inputs}
                                    value={this.state.Address}
                                    placeholder="Number + Address "
                                    underlineColorAndroid='transparent'
                                    editable={this.state.Editable}

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
                                    editable={this.state.Editable}

                                    onChangeText={(City) => this.setState({ City })}

                                />
                            </View>
                            <View>
                                {
                                    this.state.error['City'] && <Text style={styles.ErrorMessage}>{this.state.error['City']}</Text>
                                }
                            </View>
                        </View>

                        {/* -------------- */}
                        <View style={styles.inputContainer}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '50%' }}>
                                    <View style={styles.inputInnerContainer}>
                                        <TextInput
                                            style={styles.inputs}
                                            keyboardType='numeric'
                                            value={this.state.ZipCode}
                                            editable={this.state.Editable}

                                            placeholder="Zip"
                                            maxLength={5}
                                            onChangeText={(LastName) => this.setState({ LastName })}
                                         />
                                    </View>
                                    <View >
                                        {
                                            this.state.error['ZipCode'] && <Text style={styles.ErrorMessage}>{this.state.error['ZipCode']}</Text>
                                        }
                                    </View>
                                </View>
                                <View style={{ width: '48%' }}>
                                    <View style={styles.DropDownInnerContainer}>

                                        {/* <RNPickerSelect

                                            onValueChange={(value) => this.SetStateValue(value)}
                                            value={this.state.State}
                                            placeholder={{ label: "Select state", value: "" }}
                                            items={this.state.StateList}
                                        /> */}
<DropdownList
                                            OptionList={this.state.StateList}
                                            PlaceHolderText={"State"}
                                            selectedValue={this.state.State}
                                            setValue={this.SetStateValue}
                                            />



                                    </View>
                                    <View >
                                        {
                                            this.state.error['State'] && <Text style={styles.ErrorMessage}>{this.state.error['State']}</Text>
                                        }
                                    </View>
                                </View>
                            </View>


                        </View>
                        {/* -------------- */}

                        <View style={styles.Checkboxcontainer}>
                        <CheckBox
                              title={"Keep on file"}
                              checked={this.state.IsKeepOnFile}
                              setValue={this.SetKeepOnFile}
                            />
                            {/* <CheckBox
                                style={{ justifyContent: 'space-between' }}
                                value={this.state.IsKeepOnFile}
                                onFillColor={'#72797f'}
                                tintColors={{ true: '#72797f' }}
                                onChange={(val) => this.SetKeepOnFile(val)} />

                            <Text style={{ justifyContent: 'space-between' }} >
                                Keep on file

                            </Text> */}
                            <View>

                            </View>
                        </View>


                    </ScrollView>

                    <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.ProcessPayment(this.state)} >
                        <Text style={styles.buttunTextColo}>Submit</Text>
                    </TouchableOpacity>



                    <TouchableOpacity style={[styles.buttonContainer_danger]} onPress={() => this.CancelTransaction()} >
                        <Text style={[styles.buttunTextColo, { textAlign: 'center', color: 'white', fontSize: 12 }]}>Cancel</Text>
                    </TouchableOpacity>
                </View>



            </View>




        );

    }

}

