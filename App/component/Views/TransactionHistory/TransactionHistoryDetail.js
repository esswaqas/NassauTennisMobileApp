import * as React from 'react'
import { StyleSheet, FlatList, Text, View, Modal, TouchableHighlight, TouchableOpacity, Image, Alert, Picker, ScrollView } from 'react-native';
import style from '../../../Stylesheets/NAppSS'

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon, Card } from 'react-native-elements'
import { CallPI } from '../../../Api/APICall';
import Loader from '../../Loader'
import Moment from 'moment';
 import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default class TransactionHistoryDetail extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    isLoading: false,
    data: [],
    RegistrationDetailList: [],
    modalVisible: false
  }


  componentDidMount() {
    this.setState({
      isLoading: false
    })

    var ID = this.props.route.params.ID;

    var Date = this.props.route.params.Date;
    var BuyerName = this.props.route.params.BuyerName;
    var PurchasedFor = this.props.route.params.PurchasedFor;
    var Quantity = this.props.route.params.Quantity;
    var Subtotal = this.props.route.params.Subtotal;
    var ShareAmount = this.props.route.params.ShareAmount;
    var Surcharge = this.props.route.params.Surcharge;
    var Tax = this.props.route.params.Tax;
    var RefundAmount = this.props.route.params.RefundAmount;
    var RgDetails = this.props.route.params.RgDetails;
    var Description = this.props.route.params.Description;
    var IsRegistrationTransaction = this.props.route.params.IsRegistrationTransaction;

    const obj = { 'ID': ID, 'Date': Date, 'BuyerName': BuyerName, 'PurchasedFor': PurchasedFor, 'Quantity': Quantity, 'Subtotal': Subtotal, 'ShareAmount': ShareAmount, 'Surcharge': Surcharge, 'Tax': Tax, 'RefundAmount': RefundAmount, 'RgDetails': RgDetails, "Description": Description, 'IsRegistrationTransaction': IsRegistrationTransaction };
    this.state.data.push(obj);
  }

  async GetRegistarationDetail(ID) {



    var url = `customer/RegistrationDetail?id=${ID}`;
    var detailList = [];
    
    this.setState({isLoading:true})
    await CallPI("GET", url, null, null, null, null,).then(response => response.json())
      .then(responseJson => {

        for (let item of responseJson.Data) {
          detailList.push({Description: item.Description, TransactionStatus: item.TransactionStatus, TransactionPaymentMethod: item.TransactionPaymentMethod, Days: item.RegistrationDays });
        }
        this.setState({
          RegistrationDetailList: detailList,
          modalVisible: true,
          isLoading:false
        })


      }
      ).catch(error => {
        this.setState({isLoading:false})
        console.log(error)
      });
  }
  render() {
    return (
      <View style={style.PageContainer}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >


          <View style={style.ModalView}>

            <Text style={[style.fontFamily, { marginLeft: 13, marginTop: 10 }]}>Registration Detail </Text>

            <FlatList
              data={this.state.RegistrationDetailList}
              renderItem={({ item }) =>
                <View style={style.CardContainer}>

                  <View style={[style.ListItemRow_Space_between_secondary]}>

                    <Text style={style.ListRowText}>Status: {item.TransactionStatus}</Text>
                  </View>
                  <View style={[style.ListItemRow_Space_between]}>
                    <Text style={style.ListRowText}>Description: {item.Description}</Text>
                  </View>
                  {
                      item.Days !='' && item.Days !=null?
                  <View style={[style.ListItemRow_Space_between_secondary]}>
                    <Text style={style.ListRowText}>Days: {item.Days}</Text>
                  </View>:null}
                  {
                    item.TransactionPaymentMethod !='' && item.TransactionPaymentMethod !=null?
                     <View style={[style.ListItemRow_Space_between]}>

                     <Text style={style.ListRowText}>Payment Method: {item.TransactionPaymentMethod}</Text>
                   </View>:null
                  }
                </View>




              }
              keyExtractor={(item) => item.id}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
              
                <TouchableHighlight style={[{ width: '48%'}, style.buttonContainer_danger, { marginTop: 5 , padding: hp('1%') }]}
                  onPress={() => this.setState({ modalVisible: false })} >
                  <Text style={[style.buttunTextColo,{ fontWeight: 'bold' }]}>Close</Text>
                </TouchableHighlight>
             

            </View>




          </View>


        </Modal>
        <Loader loading={this.state.isLoading} />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) =>



            <Card containerStyle={style.CardItem}>
              {
                item.IsRegistrationTransaction == true ?
                  <TouchableOpacity style={style.CartItembg_Success} onPress={() => this.GetRegistarationDetail(item.ID)}>

                    <View style={{ width: '90%' }}>
                      <Text style={[style.Color_white, { alignItems: 'center' }]}>
                        <Text style={style.text}>{Moment(item.Date).format('MM/DD/YYYY')}</Text>
                      </Text>
                    </View>


                    <Icon name="menu" size={hp('3.3%')} color={'white'} />


                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={style.CartItembg_Success} >

                    <View style={{ width: '90%' }}>
                      <Text style={[style.Color_white, { alignItems: 'center' }]}>
                        <Text style={style.text}>{Moment(item.Date).format('MM/DD/YYYY')}</Text>
                      </Text>
                    </View>

                  </TouchableOpacity>

              }
              <View style={style.CardContainer}>
                <View style={[style.ListItemRow_Space_between_secondary]}>
                  <Text style={style.ListRowText}>Date</Text>
                  <Text style={style.ListRowText}>{Moment(item.Date).format('MM/DD/YYYY')}</Text>
                </View>

                <View style={[style.ListItemRow_Space_between]}>
                  <Text style={style.ListRowText}>Name</Text>
                  <Text style={style.ListRowText}>{item.BuyerName}</Text>
                </View>

                <View style={[style.ListItemRow_Space_between_secondary]}>
                  <Text style={style.ListRowText}>Purchase For</Text>
                  <Text style={style.ListRowText}>{item.PurchasedFor}</Text>
                </View>

                <View style={[style.ListItemRow_Space_between]}>
                  <Text style={style.ListRowText}>Quantity</Text>
                  <Text style={style.ListRowText}>{item.Quantity}</Text>
                </View>
                <View style={[style.ListItemRow_Space_between_secondary]}>
                  <Text style={style.ListRowText}>Total</Text>
                  <Text style={style.ListRowText}>
                    ${item.Subtotal.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </Text>
                </View>

                <View style={[style.ListItemRow_Space_between]}>
                  <Text style={style.ListRowText}>Surcharges</Text>
                  <Text style={style.ListRowText}>

                    ${item.Surcharge.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </Text>
                </View>

                <View style={[style.ListItemRow_Space_between_secondary]}>
                  <Text style={style.ListRowText}>Share Amount</Text>
                  <Text style={style.ListRowText}>{item.ShareAmount}</Text>
                </View>
                <View style={[style.ListItemRow_Space_between]}>
                  <Text style={style.ListRowText}>Refund Amount</Text>
                  <Text style={style.ListRowText}>{item.RefundAmount}</Text>
                </View>

                <View style={[style.ListItemRow_Space_between_secondary]}>

                  <Text style={style.ListRowText}>Description: {item.Description}</Text>
                </View>

                <View style={[style.ListItemRow_Space_between]}>
                  <Text style={style.ListRowText}>Detail: {item.RgDetails}</Text>
                </View>

              </View>
            </Card>



          }
          keyExtractor={(item) => item.id}
        />

      </View>
    )
  }

}