import React, { Component,PureComponent } from 'react';
import { View, StyleSheet, TouchableHighlight, TouchableOpacity, FlatList, Text, Image ,BackHandler} from 'react-native';
import style from '../../../Stylesheets/NAppSS';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from '../../../../App/component/Loader'
import { Icon ,Card} from 'react-native-elements'
import { CallPI } from '../../../Api/APICall'
import AlertBox from '../Shared/MessageBox'
import EmptyMessage from '../../../component/Views/Shared/ListEmptyMessage';
import { CommonActions } from '@react-navigation/native';

import { Alert } from 'react-native';
 import {
   widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';
  

export default class openBalance extends Component {
    constructor(props) {

        super(props)
        //this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

        this.state = {
            isLoading: false,
            data: [],
            
            CartList: [],

               // Alert Props
      Alert_Visibility: false,
      Alert_Title: '',
      Alert_Message: '',
      Alert_MessageMode: '',
        }
    }

    dismissAlert=(values)=>
  {
    this.setState({
      Alert_Visibility:values
  })
 // this.props.navigation.reset({routes: [{ name: 'OpenBalanceDetail' }]}); 
  //this.props.navigation.navigate("OpenBalanceDetail")
  this.props.navigation.dispatch(
    CommonActions.reset({
      index:1,
      routes: [
        { name: 'OpenBalanceDetail' },
        // {
        //   name: 'Profile',
        //   params: { user: 'jane' },
        // },
      ],
    })
  );
  
 
}
    
     
  
    GetOpenBalanceDetail = async () => {

        const LoginUserID = await AsyncStorage.getItem('LoginUserID');
        //const LoginUserID = await AsyncStorage.getItem('LoginUserID');

        var clist = await AsyncStorage.getItem('AddToCart');
        var fName = await AsyncStorage.getItem('LoginUserFirstName');
        var lName = await AsyncStorage.getItem('LoginUserLastName');
        var url = `Dashboard/OpenBalanceDetail?openbalanceDetailUserID=${LoginUserID}`;
        // alert(clist)
        this.setState({ isLoading: true })

        await CallPI('GET', url, null, LoginUserID, fName + " " + lName, clist).then((response) => response.json())
            .then(responseJson => {

               // console.log(JSON.stringify(responseJson))
                this.setState({
                    data: responseJson,
                    isLoading: false
                })
            }).catch(error => {
                this.setState({

                    isLoading: false
                })

            });
    }

    async AddToCart(index,OpenBalanceIds, Description, DueOpenBalance, PurchaseFor, BookingID) {
        try {



            const LoginUserID = await AsyncStorage.getItem('LoginUserID');
            var clist = await AsyncStorage.getItem('AddToCart');
            var fName = await AsyncStorage.getItem('LoginUserFirstName');
            var lName = await AsyncStorage.getItem('LoginUserLastName');
            var url = `Customers/AddOpenBalanceIntoCart?isPayOpenBalance=true`;
            var addtocart = new Object();
            addtocart = {
                OpenBalanceIds: OpenBalanceIds,
                Description: Description,
                DueOpenBalance: DueOpenBalance,
                PurchaseFor: PurchaseFor,
                BookingID: BookingID,
            };
            this.setState({ isLoading: true  })
            await CallPI("POST", url, addtocart, LoginUserID, fName + " " + lName, clist).then((response) => response.json())
                .then(responseJson => {
                    this.setState({
                        isLoading: false
                    })
                    console.log("  Result====" + JSON.stringify(responseJson))
                    if (responseJson.isSuccess == true) 
                    {
                        AsyncStorage.setItem("AddToCart", JSON.stringify(responseJson.CartItemsList));
                           
                        const array = [...this.state.data];
                        array[index]['IsAddedToCart'] = (array[index]['IsAddedToCart']=="true"? "false" :"true")
                        this.setState({ data: array })
                      
                        this.setState({
                            Alert_Visibility:true,
                            Alert_Title:"Alert",
                            Alert_Message:"Item has been added to cart.",
                            Alert_MessageMode:"success"
                          })
                      
                    }
                }).catch(error => {
                    console.log(error)
                });

            // const LoginUserID = await AsyncStorage.getItem('LoginUserID');
            // var clist = await AsyncStorage.getItem('AddToCart');
            // var fName = await AsyncStorage.getItem('FirstName');
            // var lName = await AsyncStorage.getItem('LastName');
            // var cartlist = [];
            // var caritems



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

      
        this.GetOpenBalanceDetail()

    }
     
    AmountFormat(num) {

        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    UpDatedExt = (index) => {

        const array = [...this.state.data];

        array[index]['Expanded'] = !array[index]['Expanded']
        this.setState({ data: array })
    }

   rederItems = ({ item, index }) => {
        return ( 
          
            <Card containerStyle={style.CardItem}>
              
              <TouchableOpacity style={style.CartItembg_Success} onPress={() => { this.UpDatedExt(index) }}>
                     
                            <View style={{ width: '90%' }}>
                                <Text style={[style.Color_white ,{alignItems:'center', } ]}>
                                    <Text style={style.font_13}>{item.TransactionDate}</Text>
                                </Text>
                            </View>
                            <View>
                            {
                                item.Expanded ?
                                <Icon name="angle-up" type='font-awesome' color={'#fff'} size={hp('3.3%')}   />
                                :
                                <Icon name="angle-down" type='font-awesome' color={'#fff'} size={hp('3.3%')}   />
                                }
                            </View>
                        
                 </TouchableOpacity> 
                 <View  style={style.CardContainer}>
                 <View style={[style.ListItemRow_Space_between]}>
                          
                                
                 <Text style={style.ListRowText}>{item.PurchaseBy}</Text>

                                 
                             
                 </View>
                 <View style={[ style.ListItemRow_Space_between ]}>
                            <View style={{ width: '90%' }}>
                                
                                <Text style={[style.Color_danger,style.ListRowText]}>{this.AmountFormat(item.DueOpenBalance)}</Text>

                               
                            </View>
                           <View style={{height: hp('6%'),  width: wp('6%'), padding:0,paddingRight:5,margin:0}}>

                                {
                                    item.IsAddedToCart != "true" ?
                                    <TouchableOpacity  activeOpacity={0.1} onPress={() => this.AddToCart(index,item.OpenBalanceIds, item.Description, item.DueOpenBalance, item.PurchaseFor, item.BookingID)}> 
                                     <Image  style={{height: hp('6%'),  width: wp('6%')}}  resizeMode="contain" source={require('../../../Images/Icon/ShoopingCart.png')}/>
                                    </TouchableOpacity>
                                //    <Icon name="shopping-cart" type='material' color='#88aa31' size={24}  style={{ color: '#88aa31' }} />
                                    : 
                                    null
                                }
                            </View> 
                           
                  </View>
                  </View>
                        {
                        item.Expanded ?
                        <View  style={style.CardExpandableContainer}>
                                 <View style={[style.ListItemRow_Space_between_secondary]}>
                                    <Text style={style.ListRowText}>Purchased By</Text>
                                    <Text style={style.ListRowText}>{item.PurchaseBy}</Text>
                                 </View>
                                 
                                 <View style={[style.ListItemRow_Space_between]}>
                                    <Text style={style.ListRowText}>Purchased For </Text>
                                    <Text style={style.ListRowText}>{item.PurchaseBy}</Text>
                                </View>
                                <View style={[style.ListItemRow_Space_between_secondary]}>
                                    <Text style={style.ListRowText}>Amount</Text>
                                    <Text style={style.ListRowText}>{this.AmountFormat(item.OpenBalance)}</Text>
                                </View>
                                <View style={[style.ListItemRow_Space_between]}>
                                    <Text style={style.ListRowText}>Amount Paid</Text>
                                    <Text style={style.ListRowText}>{this.AmountFormat(item.AmountPaid)}</Text>
                                </View>
                                <View style={[style.ListItemRow_Space_between_secondary]}>
                                    <Text style={style.ListRowText}>Open Balance</Text>
                                    <Text style={style.ListRowText}> {this.AmountFormat(item.OpenBalance)}</Text>
                                </View>
                                <View style={[style.ListItemRow_Space_between]}>
                                    <Text style={style.ListRowText}>Paid Open Balance</Text>
                                    <Text style={style.ListRowText}>{this.AmountFormat(item.OpenBalance)}</Text>
                                </View>
                                <View style={[style.ListItemRow_Space_between_secondary]}>
                                    <Text style={style.ListRowText}>Adjust Balance</Text>
                                    <Text style={style.ListRowText}>{this.AmountFormat(item.AdjustedOpenBalance)}</Text>
                                </View>
                                <View style={[style.ListItemRow_Space_between]}>
                                    <Text style={style.ListRowText}>Due Open Balance</Text>
                                    <Text style={style.ListRowText}>{this.AmountFormat(item.DueOpenBalance)}</Text>
                                </View>
                                <View style={[style.ListItemRow_Space_between_secondary]}>
                                    
                                        
                                        <Text style={style.ListRowText}>Description: {item.Description}</Text>
                                     
                                </View>
                            </View>
                            :
                            null
                    }
                  
                    </Card>
                   


            
            )
    }

    render() {
        return (

            <View>
                <Loader loading={this.state.isLoading} />
                <AlertBox
        displayMode={this.state.Alert_MessageMode}
        MessageType={''} 
        displayMsg={this.state.Alert_Message}
        Title={this.state.Alert_Title}
        visibility={this.state.Alert_Visibility}

        dismissAlert={this.dismissAlert}
        CancelAlert = {this.dismissAlert}
      />

                <View style={style.ListPagecontainer}>
                    
                    <FlatList
                        data={this.state.data}

                        renderItem={this.rederItems}

                        ListHeaderComponent={() => (!this.state.data.length? <EmptyMessage/> : null ) }

                        keyExtractor={(item, index) => index.toString()}
                       
                    />
                </View>

            </View>

        );
    }

}

