import * as React from 'react'
import { StyleSheet, FlatList, Text, View, TextInput, Button, TouchableOpacity, Image, Alert, Picker, ScrollView } from 'react-native';
import style from '../../../Stylesheets/NAppSS'

import AsyncStorage from "@react-native-async-storage/async-storage";
 import Loader from '../../Loader'

import Moment from 'moment';
import EmptyMessage from '../../../component/Views/Shared/ListEmptyMessage';
import { Icon, Card } from 'react-native-elements'
import  {CallPI} from '../../../Api/APICall'
import { RFPercentage, RFValue } from "react-native-responsive-screen";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class TransactionHistoryList extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    isLoading: false,
    data: []
  }
  async GetTransactionList() {

    const LoginUserID = await AsyncStorage.getItem('LoginUserID');
    var list = this.props.route.params.data == null ? "" : this.props.route.params.data;
    // var DateTo = this.props.route.params.DateTo == null ? "" : this.props.route.params.DateTo;
    // var Participant = this.props.route.params.Participant == null ? "" : this.props.route.params.Participant;
    // var Status = this.props.route.params.Status == null ? "" : this.props.route.params.Status;
    // var OrderBy = this.props.route.params.OrderBy == null ? "" : this.props.route.params.OrderBy;
    // var SortBy = this.props.route.params.SortBy == null ? "" : this.props.route.params.SortBy;
    // var ShowFamilyMembersTransaction = this.props.route.params.ShowFamilyMembersTransaction;

    this.setState({
      data: list,
      isLoading: false
    })
 
  }

  TransactionDetail(ID, Date, BuyerName, PurchasedFor, Quantity, Subtotal, ShareAmount, Surcharge, Tax, RefundAmount, RgDetails, Description,IsRegistrationTransaction) {

    this.props.navigation.navigate("TransactionHistoryDetail", {
      ID: ID,
      Date: Date,
      BuyerName: BuyerName,
      PurchasedFor: PurchasedFor,
      Quantity: Quantity,
      Subtotal: Subtotal,
      ShareAmount: ShareAmount,
      Surcharge: Surcharge,
      Tax: Tax,
      RefundAmount: RefundAmount,
      RgDetails: RgDetails,
      Description: Description,
      IsRegistrationTransaction: IsRegistrationTransaction
    })
  }

  updateDate() {
    // alert(1)
  }
  componentDidMount() {
    this.setState({
      isLoading: true
    })
    this.GetTransactionList()
  }
  render() {

    return (

      <View style={style.ListPagecontainer}>

        <Loader loading={this.state.isLoading} />

        <FlatList
          data={this.state.data} renderItem={({ item }) =>
            <Card containerStyle={style.CardItem}>
              <TouchableOpacity style={style.CartItembg_Success} onPress={() => this.TransactionDetail(item.ID, item.Date, item.BuyerName, item.PurchasedFor, item.Quantity, item.Subtotal, item.ShareAmount, item.Surcharge, item.Tax, item.RefundAmount, item.RegistrationDays, item.Description,item.IsRegistrationTransaction)}>
              
                  <View style={{ width: '90%' }}>
                    <Text style={[style.Color_white, { alignItems: 'center' }]}>
                      <Text style={style.text}>{Moment(item.Date).format('MM/DD/YYYY')}</Text>
                    </Text>
                  </View>
                  <View>
                    <Icon name="menu" size={hp('3.3%')}   color={'white' } />
                  
                </View>
              </TouchableOpacity>
              <View  style={style.CardContainer}>
              <View style={style.ListItemRow_secondary}>
                <Text style={style.ListRowText}>{item.Description}</Text>
              </View>
              </View>
            </Card>
          }
          ListHeaderComponent={() => (!this.state.data.length? <EmptyMessage/> : null ) }
          keyExtractor={(item) => item.ID.toString()}
        />



      </View>
    )
  }

}