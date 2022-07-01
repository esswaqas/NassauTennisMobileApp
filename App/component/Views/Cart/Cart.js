import React, { Component } from 'react';
import {
  View, StyleSheet, Image, FlatList, Text, Alert,ScrollView,TouchableOpacity
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import style from '../../../Stylesheets/NAppSS';
import { Icon,Card } from 'react-native-elements'
 
import { CommonActions } from '@react-navigation/native';
import Payment from '../Payment/Payment';
import Header from '../Shared/header'
import { CallPI } from '../../../Api/APICall'

 import AlertBox from '../Shared/MessageBox'
import Loader from '../../Loader'
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';
export default class MyCart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      CartItem: [],
      TotalAmount: '',
      TotalAmounts: 0.00,
      Ispayment: false,
      Alert_Visibility: false,
      Alert_Title: '',
      Alert_Message: '',
      Alert_MessageMode: '',
      IsRemoveItem:false,
      IsMembershipRemoveItem:false,
      CartItemID:'',
      ispurchaseMemberhipWithActivity:false,
      buttonText:'',
      MessageType:''

    }
  }
  dismissAlert = (values) => { this.setState({ Alert_Visibility: values })
  if(this.state.IsRemoveItem==true)
  {
   if(this.state.IsMembershipRemoveItem==true)
   {
    this.RemoveMembershipItemPermission(this.state.CartItemID)
   }
   else{

     this.RemoveItems(this.state.CartItemID)
   }
  }

   
 }
  CancelAlert = (values) => {

     this.setState({ Alert_Visibility: values,IsMembershipRemoveItem:false }) 
    }
  PaymentProcess = async () => {
    //alert('send daa')
    if(this.state.CartItem.length>0)
    {
      this.props.navigation.reset({routes: [{ name: 'Payment' , params:{ IsPayment: false}}]});
      this.setState({Ispayment:true})
    }
   else
    {

    this.setState({
      Alert_Visibility: true,
      Alert_Title: 'Alert',
      Alert_Message: 'There is no item in cart.',
      Alert_MessageMode: 'error',
    })

  }

  }
  BindCartList = async () => {
    var Cart = await AsyncStorage.getItem('AddToCart');
    const LoginUserID = await AsyncStorage.getItem('LoginUserID');

    var url =  `Customers/MyCart?customerID=${LoginUserID}&&isBindCart=true`;
    console.log(url)
    // await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(JSON.parse(Cart))
    // })

    await CallPI('POST',url,JSON.parse(Cart),null,'',null)
    .then((response) =>
      response.json()
    ).then(responseJson => {
      // Showing response message coming from server after inserting records.
     //console.log(" cart   =  " + JSON.stringify(responseJson))
 

      this.setState({
        CartItem: responseJson.CartList,
        isLoading: false,
        TotalAmount: responseJson.TotalAmount
      })
      var amount=   this.state.TotalAmount.split('$')[1]
      this.setState({TotalAmounts: parseFloat(amount).toFixed(2)})
    }).catch(error => {
     // alert("Error  " + JSON.stringify(error))
      this.setState({ isLoading: false })

    });



  }
  RemoveItem = async(id, isItemMembership)=>
  {

    //alert(isItemMembership)
    this.setState({
      Alert_Visibility: true,
      Alert_Title: 'Alert',
      Alert_Message: 'Are you sure you want to remove this from your Cart?',
      Alert_MessageMode: 'error',
      CartItemID:id,
      IsRemoveItem:true,
      IsMembershipRemoveItem:isItemMembership==true
    })

  }
  RemoveMembershipItemPermission(id)
  {
    this.setState({
      Alert_Visibility: true,
      Alert_Title: 'Are you sure?',
      Alert_Message: 'Removing membership selection may change the price of remaining items in cart.',
      Alert_MessageMode: 'error',
      CartItemID:id,
      MessageType: "CartItem",
      IsMembershipRemoveItem:false 
    })
    //this.RemoveItems(id)
  }
    RemoveItems = async(id)=>{
 
       
      
        
        var cart = await AsyncStorage.getItem('AddToCart');
          var updatedCart = await AsyncStorage.getItem('UpdatedCart');   
          var grid = await AsyncStorage.getItem('Grid');
          var Campgrid = await AsyncStorage.getItem('CampGrid');
          const LoginUserID = await AsyncStorage.getItem('LoginUserID');
          var addtoGrid = new Object();

          addtoGrid = {
            CampRegistrationGridItems: JSON.parse(Campgrid), 
            RegistrationGridItems: JSON.parse(grid),
            RegistrationUpdatedCart: JSON.parse(updatedCart)
          };

         var   url =  'Customer/DeleteCartItem?id='+id;
       //  console.log("test Heade  =  "+JSON.stringify(cart));
       //   console.log(url)
          await CallPI("POST", url, addtoGrid, LoginUserID, '', cart).then((response) => response.json()).then(responseJson =>{
           console.log("DATA=== "+JSON.stringify(responseJson.CartItemsList))
            // AsyncStorage.setItem("AddToCart", responseJson.CartList);
            AsyncStorage.setItem("AddToCart", JSON.stringify(responseJson.CartItemsList));
              this.props.navigation.dispatch(
              CommonActions.reset({
                  routes: [
                      {
                          name: 'MyCart',
                      }
                  ],
              })
          )   
          })
        
    }
    async  SetCartSession ()  {
     // AsyncStorage.clear();
 
      await AsyncStorage.setItem('AddToCart',  this.state.CartItem);
    }
    rederItems = ({ item, index }) => {
      return (
       
        // <Card containerStyle={style.CardHeader}>
        <View >
          <Card containerStyle={[style.CardHeader_Button,{zIndex:0}]}> 
          
             

        <View style={style.ListItemRow}>
        <Text style={[style.ListRowText,{fontWeight:'bold'}]}>
           {
           item.ProductName != null ? item.ProductName : item.Facility != null ? item.Facility : item.Activity
           }
        </Text>
        </View>
        <View style={style.ListItemRow}>
        <Text style={style.ListRowText}>{item.PurchaserName} / {item.UserName}</Text>
        </View>
        {
          item.StartTime != null &&
        <View style={style.ListItemRow}>
        <Text style={style.ListRowText}>
        {item.StartTime}   {item.EndTime}
       
          </Text>
        </View>
         }
        <View style={style.ListItemRow}>
        <Text style={[style.ListRowText_danger,{fontWeight:'bold'}]}> {item.Price} </Text>
        </View>
        <View style={style.ht_15}>

</View>



        </Card>
          
           <TouchableOpacity  activeOpacity={0.1} style={style.btnCardbuttom}   onPress={() => this.RemoveItem(item.ID, item.IsItemMembership)}>
           
               <Image
                   style={[style.ImageIcon,{zIndex:1}]} resizeMode="contain"
                   source={require('../../../Images/Icon/delete-02.png')}
                   />
           </TouchableOpacity> 
                   
                   </View>
      )
    }
  async componentDidMount() {


    await this.BindCartList()

    this.GetActivityMembershipData()
    //this.setState({CartItem:Cart})
    //  var  Cart =await  AsyncStorage.getItem('AddToCart');
    //  console.log(Cart)
  }
  GetActivityMembershipData = async ()=>
 {
    const ispurchaseMembershipfromActivity = await AsyncStorage.getItem('IsPurchaseMembershipwithActivity');

   //alert(ispurchaseMembershipfromActivity)
    const purchaseMembershipfromActivity = await AsyncStorage.getItem('PurchaseMembershipwithActivity');
    if(ispurchaseMembershipfromActivity=="true")
    {
      this.setState({ispurchaseMembershipfromActivity:true })

      var activityName= purchaseMembershipfromActivity.split('|')[1];
      if(activityName=="Clinic"){
this.setState({buttonText:'Continue with Clinic Registration' })
      }
      else if(activityName=="Camp")
      {
        this.setState({buttonText:'Continue with camp Registration' })
      }
      else if(activityName=="League")
      {
        this.setState({buttonText:'Continue with League Registration' })
      }
      else if(activityName=="Other")
      {
        this.setState({buttonText:'Continue with Other Registration' })
      }
    }
   
    
  }
  PurchaseActivity =async ()=>
  {
    const ispurchaseMembershipfromActivity = await AsyncStorage.getItem('IsPurchaseMembershipwithActivity');
    const purchaseMembershipfromActivity = await AsyncStorage.getItem('PurchaseMembershipwithActivity');
    if(ispurchaseMembershipfromActivity=="true")
    {
      //this.setState({ispurchaseMembershipfromActivity:true })
      await AsyncStorage.removeItem("IsPurchaseMembershipwithActivity");
      AsyncStorage.setItem('IsFromMembership',"true" );
      var activityName= purchaseMembershipfromActivity.split('|')[1];
      if(activityName=="Clinic"){
        this.props.navigation.navigate("ClinicRegistration")
      }
      else if(activityName=="Camp")
      {
        this.props.navigation.navigate("CampRegistration")
      }
      else if(activityName=="League")
      {
        this.props.navigation.navigate("LeagueRegistration")
      }
      else if(activityName=="Other")
      {
        this.props.navigation.navigate("OtherRegistration")
      }
    }
  }

  render() {
    return (
     
       
        <View style={style.Pagecontainer}>
        <View  style={[style.containerWithCardRow]}>
        <AlertBox
  displayMode={this.state.Alert_MessageMode}
  MessageType={this.state.MessageType}
  displayMsg={this.state.Alert_Message}
  Title={this.state.Alert_Title}
  visibility={this.state.Alert_Visibility}
  dismissAlert={this.dismissAlert}
  CancelAlert={this.CancelAlert}
/>
       <Loader loading={this.state.isLoading} /> 
        <Loader loading={this.state.isLoading} />
        <FlatList
          data={this.state.CartItem}
          renderItem={this.rederItems}
          
          keyExtractor={(item) => item.ID}
        />
            <View style={{marginRight:20 , marginLeft:20}}>
              {
                this.state.ispurchaseMembershipfromActivity ?
              
               <TouchableOpacity style={[style.buttonContainer]} onPress={() => this.PurchaseActivity()} >
                <Text style={style.buttunTextColo}>  {this.state.buttonText} </Text>
                </TouchableOpacity>: null
                }
               <TouchableOpacity style={[style.buttonContainer]} onPress={() => this.PaymentProcess()} >
                <Text style={style.buttunTextColo}>Pay Now {this.state.TotalAmount} </Text>
                </TouchableOpacity>
         
            </View>
 
     </View>
     </View>
   // : 
    // <header  navigation={navigation}  title={"Class Manager"}/>
    //  <Payment  navigation={this.props.navigation} /> 

    );
  }

}


