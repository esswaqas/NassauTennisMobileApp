import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,



} from 'react-native';

import RadioForm from 'react-native-simple-radio-button';
import RNPickerSelect from 'react-native-picker-select';
import SelectMultiple from 'react-native-select-multiple'

import CheckBox from '../../Shared/CheckBox';
import Dropdown from '../../Shared/DropdownList';
import { Card } from 'react-native-elements';
import AsyncStorage from "@react-native-async-storage/async-storage";
 import styles from ' ../../../App/Stylesheets/NAppSS'
import Loader from '../../../Loader'
import { CommonActions } from '@react-navigation/native';
import { CallPI } from '../../../../Api/APICall'
 import AlertBox  from '../../Shared/MessageBox'

export default class Payment extends React.Component {
    constructor(props) {
        super(props)

    }
    state = {

        isLoading: false,
        IspayOwenPart: false,
        isPurchaserMember: '',
        TotalMembers: '1',
        TotalFamilyMembers: '1',
        TotalFreindsMembers: '1',
        TotalOtherMembers: '1',
        CourtMemberCharges: '',
        CourtNonMemberCharges: '',
        ParticipantNoList: [{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6', label: '6' }],
        ScheduleDate: '',
        BuildingName: '',
        CourtName: '',
        Hour: '',
        CourtCharges: 0.00,
        StartTime: '',
        EndTime: '',
        SchedulerModel: '',
        FamilyMemberList: [],
        FriendsList: [],
        CourtList: [],
        SelectedFriendsList: [],
        SelectedFamilyMemberList: [],
        Alert_Visibility: false,
        Alert_Title: '',
        Alert_Message: '',
        Alert_MessageMode: '',

    }

    dismissAlert = (values) => { this.setState({ Alert_Visibility: values })
     
   }
    CancelAlert = (values) => { this.setState({ Alert_Visibility: values }) }
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

    SetMonthValue(value) {
        this.setState({ Month: value })
    }
    SetYesrValue(value) {
        this.setState({ Year: value })
    }



    SelectFamilyMember = (SelectedFamilyMemberList) => {

        //alert(JSON.stringify(SelectedFamilyMemberList))
        if (this.BindMembers(SelectedFamilyMemberList, this.state.SelectedFriendsList) == true) {
            this.setState({ SelectedFamilyMemberList });
        }
    }
    SelectFriends = (SelectedFriendsList) => {
        // alert("befor  fff:  "+JSON.stringify(SelectedFriendsList))
        if (this.BindMembers(this.state.SelectedFamilyMemberList, SelectedFriendsList) == true) {
            this.setState({ SelectedFriendsList });
        }

        // this.BindMembers()
    }
    BindMembers(SelectedFamilyMemberList, SelectedFriendsList) {
        var member = 0;
        var nonmeber = 0;
        var cost = 0;
        //alert("be "+ this.state.TotalMembers)
        if (this.state.TotalMembers != '')
         {
            var list = [];

            for (let item of SelectedFamilyMemberList) {
                list.push({ label: item.label, value: item.value });
            }
            for (let item of SelectedFriendsList) {
                list.push({ label: item.label, value: item.value });
            }

            var totalMembers = this.state.TotalMembers;
            // var id = $(this).val().split(' ');

            if ((parseInt(totalMembers) - parseInt(list.length) >= 0)) {
                //if ($(this).is(":checked")) {
                var others = parseInt(totalMembers) - parseInt(list.length);
                if (parseInt(others) >= 0) {

                    list.map(function (v, i) {
                        //alert(JSON.stringify(v))
                        var val = v.value.split(' ');
                        if (val[1] == 'M') {
                            member += 1;
                        }
                        else if (val[1] == 'N') {
                            nonmeber += 1;
                        }
                    })

                    cost = parseFloat((parseFloat(member) / parseFloat(totalMembers)) * parseFloat(this.state.CourtMemberCharges)) + parseFloat((parseFloat(nonmeber) / parseFloat(totalMembers)) * parseFloat(this.state.CourtNonMemberCharges)) + parseFloat((parseFloat(others) / parseFloat(totalMembers)) * parseFloat(this.state.CourtNonMemberCharges));
                    cost = cost.toFixed(2)
                    this.setState({

                        TotalFamilyMembers: SelectedFamilyMemberList.length,
                        TotalFreindsMembers: SelectedFriendsList.length,
                        TotalOtherMembers: others,
                        CourtCharges: cost,

                    })

                }
                return true;
            }
            else {
               // Alert.alert('Warning', "“");
                this.setState({
                    Alert_Visibility: true,
                    Alert_Title: 'Warning',
                    Alert_Message: 'Total Participants” does not match number of participants checked.',
                    Alert_MessageMode: 'error',
                  })
                return false;
                // $(this).prop("checked", false)
            }
        }
        else {

          //  alert('Warning', "Please first select total participants.");
            this.setState({
                Alert_Visibility: true,
                Alert_Title: 'Warning',
                Alert_Message: 'Please first select total participants.',
                Alert_MessageMode: 'error',
              })
            return false;
            //  $(this).prop("checked", false)
        }
    }
    SetParticipants = (value) => {
       // alert(value)
        this.setState({ TotalMembers: value });
        this.BindMembers(this.state.SelectedFamilyMemberList, this.state.SelectedFriendsList) 
        // if (this.BindMembers(this.state.SelectedFamilyMemberList, this.state.SelectedFriendsList) == false)
        //  {
        //     this.setState({ TotalMembers: value });
        // }
    }

    ProcessPayment = async (data) => {



if(this.state.TotalMembers==""){
    this.setState({
        Alert_Visibility: true,
        Alert_Title: 'Alert',
        Alert_Message: 'Please select participant.',
        Alert_MessageMode: 'error',
      })
      return false;
}
        var prrcessObj = new Object();
        var url = 'CustomerScheduler/SaveSchedulerPayment?isPurchaserMember=' + this.state.isPurchaserMember
        var clist = await AsyncStorage.getItem('AddToCart');

        var family = [];
        var friends = [];
        for (let item of this.state.SelectedFamilyMemberList) {
            family.push(item.value)
        }
        for (let item of this.state.SelectedFriendsList) {
            friends.push(item.value)
        }
        prrcessObj.PostedFriend = {
            FriendsIDs: friends,
        };
        prrcessObj.PostedMembers = {
            FamilyMemberIDs: family,
        };
        prrcessObj.PayOwnPart = this.state.IspayOwenPart;
        prrcessObj.TotalMembers = this.state.TotalMembers;
        prrcessObj.Charges = this.state.CourtCharges;
        prrcessObj.IsInstructor = false;
        prrcessObj.sc = JSON.parse(this.state.SchedulerModel);

        //console.log(JSON.stringify(prrcessObj)) 
        await CallPI('POST', url, prrcessObj, null, "", clist).then((response) => response.json())
            .then(responseJson => {

                if (responseJson.Data.errorMessage == "") {
                   // Alert.alert("Success", "Item has been added to cart")
                    this.setState({
                        Alert_Visibility: true,
                        Alert_Title: 'Success',
                        Alert_Message: 'Item has been added to cart',
                        Alert_MessageMode: 'success',
                      })
                    this.Redirect(responseJson)
                }
                else {
                   // Alert.alert("Error", responseJson.Data.errorMessage)
                    this.setState({
                        Alert_Visibility: true,
                        Alert_Title: 'Error',
                        Alert_Message: responseJson.Data.errorMessage,
                        Alert_MessageMode: 'error',
                      })
                }


            })



    }

    async Redirect(responseJson) {

        AsyncStorage.setItem("AddToCart", JSON.stringify(responseJson.Data.lstMyCart));
        AsyncStorage.setItem("IsPurchaserMember", JSON.stringify(responseJson.Data.isMainCutomerPurchaserMember));
        //this.navigation.reset({routes: [{ name: 'MyCart' }]});
        this.props.navigation.reset({routes: [{ name: 'MyCart' }]});

        // this.props.navigation.dispatch(
        //     CommonActions.reset({
        //         index: 9,
        //         routes: [

        //             { name: 'MyCart' },
        //         ],
        //     })
        // )

    }



    async componentDidMount() {
        var res = this.props.route.params.response;
        //alert(res.Data.pay.Charges)

        var family = [];
        var friends = [];
        for (let item of res.Data.pay.FamilyMember) {

            if (item.ID.split(' ')[2] == 'log') {

                this.setState({ isPurchaserMember: item.ID })
                this.state.SelectedFamilyMemberList.push({ label: item.Name, value: item.ID });
            }
            family.push({ label: item.Name, value: item.ID });
        }
        for (let item of res.Data.pay.FriendsList) {
            friends.push({ label: item.Name, value: item.ID });
        }


        this.setState({
            CourtList: res.Data.pay.lstCourtDetail,
            FamilyMemberList: family,
            FriendsList: friends,
            CourtMemberCharges: res.Data.memberCharges,
            CourtNonMemberCharges: res.Data.nonMemberCharges,
            CourtCharges: res.Data.pay.Charges,
            TotalFamilyMembers: 0,
            TotalFreindsMembers: 0,
            TotalOtherMembers: 0,
            SchedulerModel: JSON.stringify(res.Data.sc)

        })
    }

    setpayOwenPart = () => {

        this.setState({
            IspayOwenPart: !this.state.IspayOwenPart
        })
    }

    render() {

        return (
            <View style={styles.Pagecontainer}>

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
                <View style={styles.containerWithCard}>
                    <ScrollView >

                        <Card containerStyle={styles.PageCardHeader}>
                            {

                                this.state.CourtList.map(function (v, i) {
                                    return (
                                        <View>

                                            <View style={styles.ListItemRow_Space_between_secondary}>
                                                <Text style={styles.ListRowText}>Start Time </Text>
                                                <Text style={styles.ListRowText}>{v.StartTime}</Text>
                                            </View>
                                            <View style={styles.ListItemRow_Space_between}>
                                                <Text style={styles.ListRowText}>End Time </Text>
                                                <Text style={styles.ListRowText}>{v.EndTime}</Text>
                                            </View>
                                            <View style={styles.ListItemRow_Space_between_secondary}>
                                                <Text style={styles.ListRowText}>Hours </Text>
                                                <Text style={styles.ListRowText}>{v.Hours}</Text>
                                            </View>

                                            <View style={styles.ListItemRow_Space_between}>
                                                <Text style={styles.ListRowText}>Date </Text>
                                                <Text style={styles.ListRowText}>{v.Date}</Text>
                                            </View>
                                            <View style={styles.ListItemRow_Space_between_secondary}>
                                                <Text style={styles.ListRowText}>Resource </Text>
                                                <Text style={styles.ListRowText}>{v.BuildingName}-{v.CourtName}</Text>
                                            </View>
                                        </View>

                                    )
                                })
                            }
                        </Card>

                        <View style={[styles.inputContainer, { marginTop: 10 }]}>
                                 <Text style={styles.font_12}>Total Participants</Text>  
                            <View style={styles.DropDownInnerContainer}>
                                <Dropdown
                                    OptionList={this.state.ParticipantNoList}
                                    PlaceHolderText={"Total Participants"}
                                    selectedValue={this.state.TotalMembers}
                                    setValue={this.SetParticipants}
                                />
                            </View>
                        </View>

                        <View style={[styles.Checkboxcontainer,{marginTop:0}]}>
                            <CheckBox
                                title={"Email Other(s) to pay share"}
                                checked={this.state.IspayOwenPart}
                                setValue={this.setpayOwenPart}
                            />
                         
                        </View>
                        {
                            this.state.FamilyMemberList.length > 0 ?
                                <View style={[styles.CheckboxListContain]}>
                                    <Text style={styles.fontFamily}> Family: </Text>
                                    <SelectMultiple
                                        items={this.state.FamilyMemberList}
                                        selectedItems={this.state.SelectedFamilyMemberList}
                                        onSelectionsChange={this.SelectFamilyMember} />

                                </View>

                                :
                                null
                        }
                        {
                            this.state.FriendsList.length > 0 ?
                                <View style={styles.CheckboxListContain}>
                                    <Text style={styles.fontFamily}> Friends: </Text>
                                    <SelectMultiple
                                        items={this.state.FriendsList}
                                        selectedItems={this.state.SelectedFriendsList}
                                        onSelectionsChange={this.SelectFriends} />
                                </View>
                                :
                                null
                        }
                        <View style={[styles.inputContainer,{marginTop:5}]}>
                            <View style={styles.ListItemRow_Space_between_secondary}>
                                <Text style={styles.ListRowText}>Family</Text>
                                <Text style={styles.ListRowText}>{this.state.TotalFamilyMembers} </Text>
                            </View>
                            <View style={styles.ListItemRow_Space_between}>
                                <Text style={styles.ListRowText}>Friends </Text>
                                <Text style={styles.ListRowText}>{this.state.TotalFreindsMembers} </Text>
                            </View>
                            <View style={styles.ListItemRow_Space_between_secondary}>
                            <Text style={styles.textHeader}>Others </Text>
                              <Text style={styles.ListRowText}>{this.state.TotalOtherMembers} </Text>
                            </View>
                            <View style={styles.ListItemRow_Space_between}>
                            <Text style={styles.ListRowText}>Total Charge </Text>
                            <Text style={styles.ListRowText}>${parseFloat( this.state.CourtCharges).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </Text> 

                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.ProcessPayment()} >
                        <Text style={styles.buttunTextColo}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>

            </View>


        );

    }

}

