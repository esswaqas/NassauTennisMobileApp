import React, { Component } from 'react';
import { View, StyleSheet, Touch, TouchableHighlight, TouchableOpacity, FlatList, Text, Alter, BackHandler } from 'react-native';
import style from '../../../../Stylesheets/NAppSS';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from '../../../../../App/component/Loader'
 
import { CallPI } from '../../../../Api/APICall'
 import  ErrorMessage from '../../Shared/ListEmptyMessage'
import { Icon, Card } from 'react-native-elements'

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
            BankContactList: []
        }
    }




    componentDidMount() {


        // this.props.route.params.BankedCourtList;
        var list = this.props.route.params.BandkedCourtList;
        var mID = this.props.route.params.MemberID;
        this.setState({
            BankContactList: list,
            MemberID: mID
        })

    }


    UpDatedExt = (index) => {

        const array = [...this.state.BankContactList];
        array[index]['IsExpanded'] = !array[index]['IsExpanded'];
        this.setState({ BankContactList: array })
    }

    BookedCourtDetail = async (contractID, bookingID) => {


        this.setState({isLoading:true})

        const LoginUserID = await AsyncStorage.getItem('LoginUserID');
        var url = 'CustomerScheduler/GetBankedCourtListByID?customerID=' + this.state.MemberID + '&&loginUserID=' + LoginUserID + '&&contractID=' + contractID + '&&bookingID=' + bookingID;
        console.log(url)
        await CallPI("GET", url, null, null, "", null).then(response => response.json()).then(responseJson => {
            console.log("reeeeeeeeee  " + JSON.stringify(responseJson))
            this.setState({ isLoading: false })
            this.props.navigation.navigate("ManageContractDetailList", {
                BookedContactCourtList: responseJson,
            })
        }).catch(rr => {
            this.setState({ isLoading: false })
        })

    }

    rederItems = ({ item, index }) => {
        return (

            <Card containerStyle={style.CardItem}>

                    <View style={style.CartItembg_Success}>

                        <View style={{ width: '83%' }}>
                            <Text style={[style.Color_white, { alignItems: 'center' }]}>
                                <Text style={style.ListRowText}>{item.Contract}</Text>
                            </Text>
                        </View>
                        <View style={{flexDirection:'row' ,width: '17%' , justifyContent:'center' ,alignItems:'flex-end'}}>


                            <TouchableOpacity  onPress={() => { this.BookedCourtDetail(item.ContractID, item.BookingID) }}>
                            <Icon name="menu" title="Detail" color='#fff' size={hp('3.3%')} style={{ color: '#88aa31' }}  />
                            </TouchableOpacity>

                            <TouchableOpacity  style={{marginLeft:10}} onPress={() => { this.UpDatedExt(index) }}>
                            {
                                item.IsExpanded ?
                                    <Icon name="angle-up" type='font-awesome' color={'#fff'}  size={hp('3.3%')}  />
                                    :
                                    <Icon name="angle-down" type='font-awesome' color={'#fff'}   size={hp('3.3%')}    />
                            }
                            </TouchableOpacity>
                        </View>
                        </View>
                    <View style={style.CardContainer}>
                        <View style={[style.ListItemRow_Space_between]}>
                            <Text style={style.ListRowText}>Contract Bookings</Text>
                            <Text style={style.ListRowText}>{item.NoOfCaontractCourts}</Text>
                        </View>
                    </View>
                    {
                        item.IsExpanded ?
                        <View style={style.CardExpandableContainer}>
                                <View style={[style.ListItemRow_Space_between_secondary]}>
                                    <Text style={style.ListRowText}>Overlap/Out of Range: </Text>
                                    {
                                        item.OverlapCourt > 0 ?
                                            <Text style={[style.ListRowText, { color: 'red' }]}>{item.OverlapCourt}  </Text>
                                            :
                                            <Text style={style.ListRowText}>{item.OverlapCourt}  </Text>
                                    }
                                 </View>
                                  <View style={[style.ListItemRow_Space_between]}>
                                    <Text style={style.ListRowText}>Used</Text>
                                    <Text style={style.ListRowText}>{item.UsedCourt}</Text>
                                  </View>
                                  <View style={[style.ListItemRow_Space_between_secondary]}>
                                    <Text style={style.ListRowText}>Forfeited</Text>
                                    <Text style={style.ListRowText}>{item.ForfeitedCourt}</Text>
                                  </View>
                                    <View style={[style.ListItemRow_Space_between]}>
                                    <Text style={style.ListRowText}>Remaiing</Text>
                                    <Text style={style.ListRowText}>{item.RemainingCount}</Text>
                                    </View>

                            </View>
                            :
                            null
                    }




                 
            </Card>
            )}

    render() {
        return (

           
                <View style={style.ListPagecontainer}>            
                <Loader loading={this.state.isLoading} />
                   
                        <FlatList
                            data={this.state.BankContactList}
                            renderItem={this.rederItems}
                            ListHeaderComponent={() => (!this.state.BankContactList ?
                                <ErrorMessage/>
                                : null)
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                
           

        );
    }

}

