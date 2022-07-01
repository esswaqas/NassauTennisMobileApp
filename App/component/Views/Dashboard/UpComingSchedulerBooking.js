


import React, { Component } from 'react';
import {
  View, styleheet, TouchableHighlight, FlatList, Text, ScrollView
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
 import { Card } from 'react-native-elements'
import style from '../../../Stylesheets/NAppSS';
import Loader from '../../Loader'
import EmptyMessage from '../../../component/Views/Shared/ListEmptyMessage';
import { CallPI } from '../../../Api/APICall'


import {
  widthPercentageToDP as wp,
   heightPercentageToDP as hp,
   listenOrientationChange as lor,
   removeOrientationListener as rol
 } from 'react-native-responsive-screen';
export default class UpComingSchedulerBooking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      UpcommingBookingList: [  ],
      PastBookingList: [ ],
 
    }
  }

 
  GetBookings = async () => {

    const LoginUserID = await AsyncStorage.getItem('LoginUserID');
this.setState({
  isLoading:true
})
    var url =  `Dashboard/GetDashBoardSchedularBookingList?schedularBookingUserID=${LoginUserID}`;
 
    await CallPI('GET', url, null, LoginUserID, " ", null).then((response) => response.json())
      .then(responseJson => {
     console.log(JSON.stringify(responseJson))
        this.setState({
          // UpcommingBookingList: responseJson.lstUpComingSchedularBooking,
          // PastBookingList: responseJson.lstPastSchedularBooking
          UpcommingBookingList: responseJson.lstUpComingSchedularBooking,
          PastBookingList: responseJson.lstPastSchedularBooking
        })
        this.setState({
          isLoading:false
        })
      }).catch(error => {
        this.setState({
          isLoading:false
        })
      });
  }

  componentWillUnmount() {
    rol(this);
  }
  componentDidMount() {
    lor(this)
    this.GetBookings()

  }
  rederUpcommingItems = ({ item, index }) => {
    return (
      <View style={style.listItems}>
   
   <View style={{margin:5, backgroundColor: '#f6f3f3', flex:1, padding:7}}>
       <Text style={style.fontFamily}> {item.BookingDate}  </Text>
<Text style={style.fontFamily}> {item.Building} - {item.Court}  </Text>
<  Text style={style.fontFamily}> {item.StartTime} - {item.EndTime}  </Text>
      </View>
      </View>
     
    )}
  render() {
    return (
      <View style={style.ListPagecontainer}>
                {/* <Loader loading={this.state.isLoading} /> */}
     
        {/* <ScrollView style={{ width: '100%' }}> */}
   
        <Card containerStyle={[style.CardItemList,{marginBottom:5,height:'46%'}]}>
        <View style={[style.CartItembg_Success]}>
        <Text style={[style.Color_white]}>
              Upcoming Bookings
          </Text>
          </View>
          <View style={{
            height:'90%'}}>
          <FlatList
      data={this.state.UpcommingBookingList}
      renderItem={this.rederUpcommingItems}
     
   ListHeaderComponent={() => (!this.state.UpcommingBookingList.length?

    <EmptyMessage/>
    : null)
  }

  keyExtractor={(item,index)=>index.toString()}
      />
</View>
         
        
        </Card>
        
        <Card containerStyle={[style.CardItemList,{marginBottom:10,height:'46%'}]}>
          
          <View style={style.CartItembg_Success}>
          <Text style={[style.Color_white]}>
              Past Bookings
          </Text>
        </View>
          <View style={{height:'90%'}}>
          <FlatList
      data={this.state.PastBookingList}
      renderItem={this.rederUpcommingItems}
     
   ListHeaderComponent={() => (!this.state.PastBookingList.length?

    <EmptyMessage/>
    : null)
  }

  keyExtractor={(item,index)=>index.toString()}
      />
</View>
         
        
        </Card>
        
      </View>
    );
  }

}

