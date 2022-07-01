import React, { Component } from 'react';
import { StyleSheet, RefreshControl, Text, View, Alert, Button, TouchableHighlight, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import style from '../../../../Stylesheets/NAppSS';
import Loader from '../../../Loader';
import { Icon, Card } from 'react-native-elements'
import AsyncStorage from "@react-native-async-storage/async-storage";
import  ErrorMessage from '../../Shared/ListEmptyMessage'
import { CallPI } from '../.../../../../../Api/APICall';
import AlertBox from '../../Shared/MessageBox'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';
export default class MyReservation extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        reservationList: [], isLoading: true,
        Alert_Visibility: false,
        Alert_Title: '',
        Alert_Message: '',
        Alert_MessageMode: '',
        IsCancelReservation: false,
        ItemID: ''
    }

    dismissAlert = (values) => {
        this.setState({ Alert_Visibility: values })
        if (this.state.IsCancelReservation === true) {
            this.setState({ IsCancelReservation: false })
            this.CancelReservations(this.state.ItemID);
        }
    }

    CancelAlert = (values) => { this.setState({ Alert_Visibility: values }) }

    async CancelReservation(id,status) 
    {
        if(status == "Show" )
        {
        this.setState({
            Alert_Visibility: true,
            Alert_Title: 'Alert',
            Alert_Message: "Are you sure you want to cancel this reservation?",
            Alert_MessageMode: 'error',
            ItemID: id,
            IsCancelReservation: true
        })}
    }

    async CancelReservations(id) {

        try {
            //var isPrcess = false;


            this.setState({
                isLoading: true
            })
            var url = 'CustomerScheduler/CancelReservation?id=' + id + '&isCancel='
            await CallPI('GET', url, null, null, "", null).then((response) => response.json()).then(responseJson => {

                console.log(JSON.stringify(responseJson))


                if (responseJson.Success == '' || responseJson.Success == null) {
                    //Alert.alert("Error",responseJson.Error)
                    this.setState({
                        Alert_Visibility: true,
                        Alert_Title: 'Alert',
                        Alert_Message: responseJson.Error,
                        Alert_MessageMode: 'error',
                    })
                }
                else {
                    //Alert.alert("Success",responseJson.Success)
                    this.setState({
                        Alert_Visibility: true,
                        Alert_Title: 'Alert',
                        Alert_Message: responseJson.Success,
                        Alert_MessageMode: 'success',
                    })
                    this.ReservationDetailList()
                }

            }).catch(error => {
                alert("inner catch")
                this.setState({
                    isLoading: false
                })
            });
        }
        catch {
//
       //     alert("catch")
            this.setState({
                isLoading: false
            })
        }
    }

    async ReservationDetailList() {
        const LoginUserID = await AsyncStorage.getItem('LoginUserID');


        var DateFrom = this.props.route.params.DateFrom == null ? null : this.props.route.params.DateFrom;
        var DateTo = this.props.route.params.DateTo == null ? null : this.props.route.params.DateTo;

       var  participantID=this.props.route.params.ParticipantID;
 
        try {


            var url = 'CustomerScheduler/GetCustmerReservation?familyMemberID='+ (participantID=="All"? "" : participantID)+ '&startDate=' + DateFrom + '&endDate=' + DateTo + '&sort='+ '' 
            console.log(JSON.stringify(url))
            await CallPI('GET', url, null, LoginUserID, "", null).then((response) => response.json()).then(responseJson => {

              //alert(JSON.stringify(responseJson.lstActivities))
                this.setState({ reservationList: responseJson.lstActivities, isLoading: false })
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

        this.ReservationDetailList()

    }
    rederItems = ({ item, index }) => {
        return (

            <Card containerStyle={style.CardItem}>
<View style={style.CartItembg_Success}>

<View style={{ width: '83%' }}>
    <Text style={[style.Color_white, { alignItems: 'center' }]}>
    <Text style={style.text}>{item.ScheduleDate}</Text>
    </Text>
</View>

    <View style={{flexDirection:'row' ,width: '17%' ,justifyContent:'center', alignItems:'flex-end' }}>
 <TouchableOpacity  onPress={() => this.CancelReservation(item.ID, item.Status)}>
{
    item.Status == "Show" ?
    <Icon name="cancel" type='material' color='#88aa31' size={hp('3.2%')} style={{ color: '#88aa31' }} />
    :null
}
    </TouchableOpacity>

    <TouchableOpacity style={{marginLeft:10}} onPress={() => { this.UpDatedExt(index) }}>
    {
        item.Expanded ?
            <Icon name="angle-up" type='font-awesome' color={'#fff'} size={hp('3.2%')}   />
            :
            <Icon name="angle-down" type='font-awesome' color={'#fff'} size={hp('3.2%')}  />
    }
    </TouchableOpacity>
    </View>

</View>
                 
                <View style={style.CardContainer}>

                    <View style={[style.ListItemRow_Space_between]}>


                        <Text style={[style.ListRowText,style.font_18]}>{item.UserName}</Text>
                        <Text style={[style.ListRowText]}>{ item.StartTime}-{item.EndTime}</Text>
                       
                    </View>
                </View>

                {
                    item.Expanded ?
                        <View style={style.CardExpandableContainer}>

                           <View style={[style.ListItemRow_Space_between_secondary]}>
                                <Text style={style.ListRowText}>Booking Date </Text>
                                <Text style={style.ListRowText}>{item.BookingDate}</Text>
                            </View>

                            <View style={[style.ListItemRow_Space_between]}>
                                <Text style={style.ListRowText}>Building </Text>
                                <Text style={style.ListRowText}>{item.BuildingName}</Text>
                            </View>
                            <View style={[style.ListItemRow_Space_between_secondary]}>

                                <Text style={style.ListRowText}>Resource </Text>
                                <Text style={style.ListRowText}>{item.Facility} </Text>

                            </View>
                            <View style={[style.ListItemRow_Space_between]}>
                                <Text style={style.ListRowText}>Booking </Text>
                                <Text style={style.ListRowText}>{item.ReservationType}</Text>
                            </View>
                            <View style={[style.ListItemRow_Space_between_secondary]}>
                                <Text style={style.ListRowText}>Status</Text>
                                <Text style={style.ListRowText}>{item.IsRefunded}</Text>
                            </View>
                            <View style={[style.ListItemRow_Space_between]}>
                                <Text style={style.ListRowText}>No of Participants</Text>
                                <Text style={style.ListRowText}>{item.TotalParticipants}</Text>
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
            <View style={style.ListPagecontainer}>
                <Loader loading={this.state.isLoading} />
                <AlertBox
                    displayMode={this.state.Alert_MessageMode}
                    MessageType={''}
                    displayMsg={this.state.Alert_Message}
                    Title={this.state.Alert_Title}
                    visibility={this.state.Alert_Visibility}
                    dismissAlert={this.dismissAlert}
                    CancelAlert={this.CancelAlert}
                />

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
