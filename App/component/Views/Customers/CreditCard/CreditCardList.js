import React, { Component } from 'react';
import {
    View, StyleSheet, TouchableHighlight, FlatList, Text,Modal,Alert
} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import style from '../../../../Stylesheets/NAppSS';
import Loader from '../../../Loader'
import { CommonActions } from "@react-navigation/native";
import {Card} from 'react-native-elements'
import AlertBox from '../../Shared/MessageBox'
import  {CallPI} from '../../../../Api/APICall'
import EmptyMessage from '../../Shared/ListEmptyMessage';
import { Icon } from 'react-native-elements'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class UserCreditCardList extends Component {

    constructor(props) {
        super(props)
        this.state = {
          modalVisible: false,
            isLoading: true,
            data: [],
            CardHolderName:'',
            CardType:'',
            cardID:'',
                    // Alert Props
                    Alert_Visibility: false,
                    Alert_Title: '',
                    Alert_Message: '',
                    Alert_MessageMode: '',
                    IsDeleted: false,

                    IsRedirect: false,
        }
    }
    dismissAlert=(values)=>
    { 
      this.DeleteCreditCard(this.state.cardID)
      this.setState({Alert_Visibility:values }) 
  }
    CancelAlert=(values)=>
    { this.setState({Alert_Visibility:values }) }
    GetUserCreditCard = async () => {
        
        const LoginUserID = await AsyncStorage.getItem('LoginUserID');
        var url =  `Customers/GetuserCredditCard?userID=${LoginUserID}&&companyID=1`;
         
        await CallPI('GET', url, null, null,  " " , null).then((response) => response.json())
          .then(responseJson => {
                // Showing response message coming from server after inserting records.
                console.log("car list === "+JSON.stringify( responseJson))
                this.setState({
                    data: responseJson,
                    isLoading: false
                })
            }
            ).catch(error => { 

                this.setState({
                    isLoading: false
                })
                alert(error)
            });
    }
    CreditCardDetail = (visible, CardHolderName, cardType) => {
      this.setState({ modalVisible: visible ,
        CardHolderName: CardHolderName,
        cardType : cardType,});
    }
    HideModel = (visible) => {
      this.setState({
        modalVisible:visible
      });
    }
    componentDidMount( ) {
        this.setState({ isLoading: true })
        this.GetUserCreditCard()
    }

    EditCard(cardID)
    {
      this.props.navigation.navigate("AddEditCreditCard",{
        cardID :  cardID
      })
    }
   
    async DeleteCard(cardID) {
      // Alert.alert(
      //   "Warning",
      //   "are you want to delete this cretid card?",
      //   [
          
      //     {
      //       text: "Cancel",
      //       onPress: () =>  false,
            
      //     },
      //     { text: "OK", onPress: () =>this.DeleteCreditCard(cardID)  }
      //   ]
      // );
      this.setState({
        Alert_Visibility:true,
        cardID:cardID,
        Alert_Title:"Warning",
        Alert_Message:"are you want to delete this cretid card?",
        Alert_MessageMode:"warning",
        IsDeleted:true
      })
      
    }
    async DeleteCreditCard(cardID) {

      var url =  `Customers/DeleteCreditCard?CardID=${cardID}&&isDeleteCard=true`;
      console.log(url)
      this.setState({ isLoading: true })
      await CallPI('POST', url, null, null,  " " , null).then((response) => response.json())
        .then(responseJson => {
          console.log("cccccccccc ccccccc  cc=== n"+JSON.stringify(responseJson))
          this.setState({
            isLoading:false
          })
          if(responseJson.Data.message =="")
          {
            return false;
          }
          else{
            
           // Alert.alert("Success", responseJson.Data.message);
            this.setState({
              Alert_Visibility:true,
              Alert_Title:"Success",
              Alert_Message:responseJson.Data.message,
              Alert_MessageMode:"success"
            })
          }
          
         
         
          this.GetUserCreditCard()
          // this.props.navigation.dispatch(
          //   CommonActions.reset({
          //     index: 1,
          //     routes: [
          //       { name: 'CreditCardList' },
                 
          //     ],
          //   })
          // );
           
        }
        ).catch(error => {
          this.setState({
         
            isLoading:false
          })
        })
    }
    rederItems = ({ item, index }) => {
      return (
        <Card containerStyle={style.CardHeader}> 
        <View style={style.ListItemRow_Space_between_secondary}>
            <Text style={style.ListRowText}>*************{item.CardNumber} </Text>
            <View style={{ flexDirection: 'row' ,paddingRight:5}}>
              {/* <Icon name="menu" type='feather' color='#88aa31' size={28} onPress={() => this.CreditCardDetail(true, item.CardHolderName, item.CreditCardType)} style={{ color: '#88aa31' }} /> */}
              <Icon name="edit" type='FontAwesome' color='#88aa31' size={hp('3%')} onPress={() => this.EditCard(item.CardID)} style={{ color: '#88aa31' }} />
              <Icon name="trash-alt"  type='font-awesome-5'  color='red'  size={hp('3%')}  onPress={() => this.DeleteCard(item.CardID)} containerStyle={{ marginLeft:5 }} />


            </View>
        </View>
       <View style={style.ListItemRow_Space_between}>
       <Text style={style.ListRowText}>Card Expiry Date </Text>
       <Text style={style.ListRowText}> {item.ExpirationDate}</Text>
       </View>
      <View style={style.ListItemRow_Space_between_secondary}>
           <Text style={style.ListRowText}>Card Holder Name </Text>
           <Text style={style.ListRowText}> {item.CardHolderName}</Text>
      </View>
      <View style={style.ListItemRow_Space_between}>
      <Text style={style.ListRowText}>Card Type </Text>
       <Text style={style.ListRowText}> {item.CreditCardType}</Text>
      </View>
  
        </Card>
      )}
    render() { 
  
        return (
         <View style={style.ListPagecontainer}>
           <AlertBox

displayMode={this.state.Alert_MessageMode}
MessageType={''}
displayMsg={this.state.Alert_Message}
Title={this.state.Alert_Title}
visibility={this.state.Alert_Visibility}
dismissAlert={this.dismissAlert}
CancelAlert={this.CancelAlert}

/>
              <Loader loading={this.state.isLoading} />
              <FlatList
                data={this.state.data} 
                renderItem={this.rederItems}
                ListHeaderComponent={() => (!this.state.data.length? <EmptyMessage/> : null ) }
                keyExtractor={(item)=> (item.CardID.toString())}
              />
            </View>
          
          )
    }

}


 