import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, Alert, Button, TouchableHighlight, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import style from '../../../../Stylesheets/NAppSS';
import Loader from '../../../Loader';
import { Icon, Card } from 'react-native-elements'
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CallPI } from '../.../../../../../Api/APICall';
import ErrorMessage from '../../Shared/ListEmptyMessage'
export default class MyReservation extends Component {

    constructor(props) {
        super(props)
    }

    state = {

        reservationList: [],
        isLoading: true,


    }

    async Payshare(ID, MainID, bookID, amount) {
        //  await  this.GetCustomerPaySharingDetail  (this.props.route.params.ID,this.props.route.params.MainID,this.props.route.params.bookID,this.props.route.params.amount)
        // alert(ID+" - "+MainID+" - "+bookID+" - "+amount);
         //this.props.navigation.navigate("CustomerPaymentSharing")
           // this.props.navigation.reset({routes: [{ name: 'CustomerPaymentSharing'}]});
        //  this.props.navigation.reset({routes: [{ name: 'CustomerPaymentSharing' , params:{
        //     isCustomerPayShare: true,
        //     ID: ID.toString(),
        //     MainID: MainID.toString(),
        //     bookID: bookID.toString(),
        //     amount: amount
        //     }}]});
      //  alert(MainID)
      debugger
        this.props.navigation.navigate("CustomerPaymentSharing", {
            isCustomerPayShare: true,
            ID: ID.toString(),
            MainID: MainID,
            bookID: bookID,
            amount: amount
        })
    }


    async GetPaySharingList() {
        const LoginUserID = await AsyncStorage.getItem('LoginUserID');


        try {
            var url = '/CustomerScheduler/GetCsutomerPaySharingList?userID=' + LoginUserID + '&isPaySharingList=true';
            await CallPI('GET', url, null, null, "", null).then((response) => response.json()).then(responseJson => {

                console.log(JSON.stringify(responseJson))
                this.setState({ reservationList: responseJson.lstCustomerPaymentSharing, isLoading: false })
            }).catch(error => {
                this.setState({
                    isLoading: false
                })
            });
        }
        catch
        {

            this.setState({
                isLoading: false
            })
        }
    }
    UpDatedExt = (index) => {

        const array = [...this.state.reservationList];

        array[index]['Expanded'] = !array[index]['Expanded']
        this.setState({ data: array })
    }

    componentDidMount() {

        this.GetPaySharingList()

    }
    rederItems = ({ item, index }) => {
        return (

            <Card containerStyle={[style.CardHeader_Button]}>
                <View style={{ flexDirection: 'row' }}>

                    <View style={{ width: '75%' }}>
                        <View style={style.ListItemRow}>
                            <Text style={style.ListRowText}>{item.BookingDate}</Text>
                        </View>
                        <View style={style.ListItemRow}>
                            <Text style={style.ListRowText}>{item.StartTime}-{item.EndTime}</Text>
                        </View>
                        <View style={style.ListItemRow}>
                            <Text style={style.ListRowText}>{item.BuildingName}-{item.FacilityName}</Text>
                        </View>
                        <View style={style.ListItemRow}>
                            <Text style={style.ListRowText}>${item.Amount} </Text>
                        </View>
                    </View>

                    <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center' }}>
                        {/* <Icon name="share-square" type='font-awesome' color='#88aa31' size={24} style={{ color: '#88aa31' }} onPress={() => this.Payshare(item.ParticipantID, item.MianCustomerID, item.BookingID, item.Amount)} /> */}
                        <TouchableOpacity activeOpacity={0.1}  onPress={() => this.Payshare(item.ParticipantID, item.MianCustomerID, item.BookingID, item.Amount)}>
                            <Image
                                style={style.ImageIcon} resizeMode="contain"
                                source={require('../../../../Images/Icon/share.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            </Card>
        )
    }

    render() {
        return (
            <View style={style.ListPagecontainer}>
                <Loader loading={this.state.isLoading} />
                <FlatList
                    data={this.state.reservationList}

                    renderItem={this.rederItems}
                    ListHeaderComponent={() => (!this.state.reservationList.length ?
                        <ErrorMessage/>
                        : null)
                    }

                  
                   
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }

}
