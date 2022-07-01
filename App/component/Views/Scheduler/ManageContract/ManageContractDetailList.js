import React, { Component } from 'react';
import { View, StyleSheet, Touch, TouchableHighlight, TextInput, TouchableOpacity, Modal, FlatList, Text, Alert, BackHandler } from 'react-native';
//import style from '../../../../Stylesheets/DashboardSS';
import style from '../../../../Stylesheets/NAppSS'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from '../../../../../App/component/Loader'
import { CallPI } from '../../../../Api/APICall'

import { AmountFormat } from '../../../../../App/component/Views/Shared/Contans'
import { Icon, Card } from 'react-native-elements'

import Calender from '../../../../component/Views/Shared/DatePicker'

import { CommonActions } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';
export default class ManageContract extends Component {
    constructor(props) {

        super(props)
        //this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

        this.state = {
            isLoading: false,
            MemberID: '',
            modalVisible: false,
            BookedContactList: [],
            MakeupDate: '',
            MakekupDetailID: ''

        }
    }



    BindList(list) {
        var CList = [];

        for (let item of list) {
            var ishideCancelButton = false;
            var ishideMakeButtonButton = false;
            var makeButtonButtonColor = '#88aa31';
            var cancelButtonButtonColor = '#88aa31';
            var cancelDateColor = '';
            if (item.IsCancelled == "cancelDateRedCancelButtonDisable") {
                //$(this).closest('tr').find('.btnCancel').hide();
                ishideCancelButton = true;
                if (item.CancellationDate != "") {
                    cancelDateColor = "red"
                }
            }
            if (item.IsCancelled == "cancelButtonDisable") {
                //$(this).closest('tr').find('.btnCancel').hide();
                ishideCancelButton = true;

            }
            if (item.IsCancelled == "cancelButtonEnableCancelButtonRed") {

                //$(this).closest('tr').find('.btnCancel').show();
                ishideCancelButton = false;
                //  $(this).closest('tr').find('.btnCancel').addClass("btn-danger");
                cancelButtonButtonColor = 'red'
            }
            if (item.IsCancelled == "cancelButtonEnable") {
                // $(this).closest('tr').find('.btnCancel').show();
                ishideCancelButton = false;
            }

            if (item.IsMakeUp == "makeUpButtonEnableCancelButtonYellowCancelButtonDisable") {
                // $(this).closest('tr').find('.btnMakeUp').show();
                // $(this).closest('tr').find('.btnCancel').hide();
                //  $(this).closest('tr').find('.btnCancel').addClass("btn-warning");
                ishideMakeButtonButton = false
                ishideCancelButton = true;
                cancelButtonButtonColor = 'yellow'
            }
            if (item.IsMakeUp == "makeUpButtonDisableCancelButtonRedCancelButtonDisable") {
                // $(this).closest('tr').find('.btnMakeUp').hide();
                // $(this).closest('tr').find('.btnCancel').hide();
                // $(this).closest('tr').find('.btnCancel').addClass("btn-danger");
                ishideMakeButtonButton = true
                ishideCancelButton = true;
                cancelButtonButtonColor = 'red'
            }
            if (item.IsMakeUp == "makeUpButtonEnable") {
                // $(this).closest('tr').find('.btnMakeUp').show();
                ishideMakeButtonButton = false

            }
            if (item.IsMakeUp == "makeUpButtonDisable") {
                //$(this).closest('tr').find('.btnMakeUp').hide();
                ishideMakeButtonButton = true
            }

            if (item.IsCancelled == "true") {
                if (item.CancellationDate != "") {
                    //$(this).closest('tr').find('.cancelDate').addClass("red");
                    cancelDateColor = 'red'
                }
            }

            CList.push({
                ID: item.ID,
                PersonID: item.PersonID,
                BookingID: item.BookingID,
                PersonName: item.PersonName,
                Facility: item.Facility,
                IsExpanded: false,
                Resource: item.Resource,
                DayOfWeek: item.DayOfWeek,
                StartTime: item.StartTime,
                EndTime: item.EndTime,
                CancellationDate: item.CancellationDate,
                ResheduledDate: item.ResheduledDate,
                ResheduledBy: item.ResheduledBy,
                BookingDate: item.BookingDate,
                ScheduledDate: item.ScheduledDate,
                IsOverlap: item.IsOverlap,
                IsMakeUp: item.IsMakeUp,
                IsCancelled: item.IsCancelled,

                ishideCancelButton: ishideCancelButton,
                ishideMakeButtonButton: ishideMakeButtonButton,
                makeButtonButtonColor: makeButtonButtonColor,
                cancelButtonButtonColor: cancelButtonButtonColor,
                cancelDateColor: cancelDateColor,
            });
        }
        this.setState({ BookedContactList: CList })
    }

    componentDidMount() {


        // this.props.route.params.BankedCourtList;

        var list = this.props.route.params.BookedContactCourtList;
        this.BindList(list)

    }




    Cancelbooking(detailID, buttonColor) {

        if (buttonColor == 'red') {
            Alert.alert(
                "Confirmation",
                "This Cancellation is Ineligible for a Make-Up.\nClick Ok to continue, or Cancel to retain booking.",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => this.Cancel(detailID, true) }
                ]
            );
        }
        else {
            Alert.alert(
                "Are you sure?",
                "Cancel this booking.",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => this.Cancel(detailID, null) }
                ]
            );
        }
    }

    async Cancel(DetailID, IsMakeUpAllowed) {
        const LoginUserID = await AsyncStorage.getItem('LoginUserID');
        var url = 'CustomerScheduler/CancelCourt?ID=' + DetailID + '&&IsMakeUpAllowed=' + IsMakeUpAllowed + '&&loginUserID=' + LoginUserID;

        await CallPI("GET", url, null, null, "", null).then(response => response.json()).then(responseJson => {

            console.log("dsdsadss sd sd sad sd sd sad   ===== " + JSON.stringify(responseJson.LstBankedCourts))
            if (responseJson.ErrorResponseMessage != '') {
                Alert.alert("", responseJson.ErrorResponseMessag);
            }
            else {
                Alert.alert("", responseJson.SuccessResponseMessage);
            }
            this.BindList(responseJson.LstBankedCourts)

        })


    }

    async MakeupCourt(detailID, buttonColor) {

        if (buttonColor == "red") {
            Alert.alert('Alert', "Cancellation not made with enough notice.");
            return false;
        } else {
            this.setState({ MakekupDetailID: detailID, modalVisible: true })
        }
    }
    async GoToscheduler() {
        if (this.state.MakeupDate == '') {
            Alert.alert("", "Please Select new schedule date.")
            return false;
        }
        var url = 'CustomerScheduler/GoToMakeUpOrBookingAdditionalTimeScheduler?ID=' + this.state.MakekupDetailID + '&&date=' + this.state.MakeupDate + '&&type=makeup';
        await CallPI("GET", url, null, null, "", null).then(response => response.json()).then(responseJson => {

            this.setState({modalVisible: false,MakeupDate:''})
            if (responseJson.Error == "out of contract date")
             {

        Alert.alert(
                "Are you sure",
                "You Have Selected a Date Outside of the Defined Contract Date Range.\nDo You Still Want to Book This?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => this.GoToschedulerForMake() }
                ]
            );
            }
            else 
            {
                this.GoToschedulerForMake() 
            }

        })
    }
    async  GoToschedulerForMake (detailID, isMakeup){
         // location.href = "/CourtBooking/GetSchedular?date=" + $(".schedulerDate").val();

    }

    UpDatedExt = (index) => {

        const array = [...this.state.BookedContactList];
        array[index]['IsExpanded'] = !array[index]['IsExpanded'];
        this.setState({ BookedContactList: array })
    }


    rederItems = ({ item, index }) => {
        return (
            <Card containerStyle={style.CardItem}>

<View style={style.CartItembg_Success}>

<View style={{ width: '83%' }}>
                            <Text style={[style.Color_white, { alignItems: 'center' }]}>
                                <Text style={style.ListRowText}>{item.PersonName}</Text>
                            </Text>
                        </View>
                        <View style={{flexDirection:'row' ,width: '17%' ,justifyContent:'center' ,alignItems:'flex-end'}}>
                          
                        {
                                item.ishideMakeButtonButton ? null :
                                  
                                        <TouchableOpacity onPress={() => { this.MakeupCourt(item.ID) }}>
                                            <Icon name="folder-open" type='font-awesome' color={item.makeButtonButtonColor} size={hp('3.2%')} />
                                        </TouchableOpacity>
                                    
                            }
                                    {
                                        item.ishideCancelButton ? null :
                            <TouchableOpacity style={{marginLeft:10}} onPress={() => { this.Cancelbooking(item.ID, item.cancelButtonButtonColor) }}>
                                            <Icon name="times-circle-o" type='font-awesome' color={item.cancelButtonButtonColor} size={hp('3.2%')} />
                                </TouchableOpacity>
                                    }


                            <TouchableOpacity style={{marginLeft:10}} onPress={() => { this.UpDatedExt(index) }}>
                            {
                                item.IsExpanded ?
                                    <Icon name="angle-up" type='font-awesome' color={'#fff'} size={hp('3.2%')} />
                                    :
                                    <Icon name="angle-down" type='font-awesome' color={'#fff'} size={hp('3.2%')}  />
                            }
                            </TouchableOpacity>
                        </View>
</View>
            <View style={style.CardContainer}>
                        <View style={[style.ListItemRow_Space_between]}>
                        <Text style={style.ListRowText}>{item.Facility} - {item.Resource}</Text>

                            <Text style={style.ListRowText}>{item.StartTime} - {item.EndTime}</Text>
                        </View>
                        <View style={[style.ListItemRow_Space_between]}>
                        <Text style={style.ListRowText}> {item.BookingDate} - {item.ScheduledDate}</Text>

                         </View>
                       
           </View>
                <View>

                 
                     
                 

                    {
                        item.IsExpanded ?
                        <View style={style.CardExpandableContainer}>

                             <View style={[style.ListItemRow_Space_between_secondary]}>
                                    <Text style={style.ListRowText}>Day</Text>
                                    <Text style={style.ListRowText}>{item.DayOfWeek}  </Text>
                                    </View>
                                <View style={[style.ListItemRow_Space_between]}>
                                    <Text style={style.ListRowText}>Booking Date: </Text>
                                    <Text style={style.ListRowText}>{item.BookingDate}  </Text>
                                    </View>
                                <View style={[style.ListItemRow_Space_between_secondary]}>
                                    <Text style={style.ListRowText}>Scheduled Date </Text>
                                    <Text style={style.ListRowText}>{item.ScheduledDate}  </Text>
                                    </View>
                                <View style={[style.ListItemRow_Space_between]}>
                                    <Text style={style.ListRowText}>Overlap/Out of Range: </Text>
                                    <Text style={style.ListRowText}>{item.IsOverlap}  </Text>
                                    </View>
                                <View style={[style.ListItemRow_Space_between_secondary]}>
                                    <Text style={style.ListRowText}>Cancellation Date: </Text>

                                    <Text style={style.ListRowText}>{item.CancellationDate}  </Text>
                                    </View>
                                <View style={[style.ListItemRow_Space_between]}>
                                    <Text style={style.ListRowText}>Resheduled to: </Text>
                                    <Text style={style.ListRowText}>{item.ResheduledDate}  </Text>
                                    </View>
                                <View style={[style.ListItemRow_Space_between_secondary]}>
                                    <Text style={style.ListRowText}>Resheduled By: </Text>
                                    <Text style={style.ListRowText}>{item.ResheduledBy}  </Text>
                                    </View>



                            </View>
                            :
                            null
                    }




                </View>
                </Card>)
    }

    render() {
        return (

            <View style={style.ListPagecontainer}>   
                <Loader loading={this.state.isLoading} />


               
                <View >

                    <Modal
                        style={[style.ModalView,{ height: '50%' }]}
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                        }}
                    >

                        <View style={style.ManageContractModalView}>
                            <View style={style.inputContainer}>
                                <View style={[style.inputInnerContainer], { borderBottomColor: 'black', borderBottomWidth: 1 }}>

                                    <Text >Make up {"\n"}</Text>
                                </View>
                            </View>
                            <View style={[style.inputContainer], { marginTop: '5%' }}>
                                <View style={style.inputInnerContainer}>

                
                                    <TextInput style={{ backgroundColor: '#ECEDEB', height: 45, width: '88%', borderRadius: 20 }}
                                        placeholder="New Booking Date"
                                        value={this.state.MakeupDate}
                                        editable={false}
                                    />
                                                        <Calender
                                        callback={(date) =>
                                            this.setState({ ...this.state, MakeupDate: date })
                                        }

                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '5%' }}>
                                <View style={{ width: '50%', paddingRight: 2 }}>
                                    <TouchableOpacity style={[style.buttonContainer,{paddingTop:5,paddingBottom:5,paddingLeft:5 ,paddingRight:5}]}
                                        onPress={() => {
                                            this.GoToscheduler();
                                        }}
                                    >
                                        <Text style={style.buttunTextColo}>Go to Scheduler</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '30%' }}>
                                    <TouchableOpacity style={[style.buttonContainer_danger,{paddingTop:5,paddingBottom:5,paddingLeft:5 ,paddingRight:5}]}
                                        onPress={() => {
                                            this.setState({ modalVisible: false ,MakeupDate:''})
                                        }}
                                    >
                                        <Text style={style.buttunTextColo}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </Modal>
                    <FlatList
                        data={this.state.BookedContactList}

                        renderItem={this.rederItems}

                        ListHeaderComponent={() => (!this.state.BookedContactList ?
                            <View style={style.listItemsEmptyMessage}>
                                <View>
                                    <Text>
                                        <Text style={style.text}> No record found.  </Text>
                                    </Text>
                                </View>

                            </View>
                            : null)
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

            
            </View>

        );
    }

}
