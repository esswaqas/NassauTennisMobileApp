import React, { Component } from 'react';
import {
  View, styleheet, TouchableHighlight, FlatList, Text
} from 'react-native';
import style from '../../../Stylesheets/NAppSS';
import { HeaderBackground } from '@react-navigation/stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import  {CallPI} from '../../../Api/APICall'
import {Card} from 'react-native-elements'
 
import EmptyMessage from '../../../component/Views/Shared/ListEmptyMessage';
export default class CurrentMembership extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      data: []
    }
  }

GetMembership=async ()=>{

  const LoginUserID = await  AsyncStorage.getItem('LoginUserID');
   //alert(LoginUserID)
  var url =  `Dashboard/GetCurrentMembership?membershipUserID=${LoginUserID}`;
  // fetch(url, {
  //   method: "GET",
  // })
  await  CallPI("GET",url,null,null,'',null).then(response => response.json())
    .then(responseJson => {
     // alert(JSON.stringify(responseJson))
  this.setState({
        data: responseJson
      })}).catch(error => {

  });
}

  componentDidMount() {
   this.GetMembership()
    
  }
  rederItems = ({ item, index }) => {
    return (
      <Card containerStyle={style.CardHeader}> 
      <View style={style.ListItemRow_Space_between_secondary}>
      <Text style={style.ListRowText}>Name</Text>
      <Text style={style.ListRowText}>{item.Name}</Text>
      </View>
     <View style={style.ListItemRow_Space_between}>
     <Text style={style.ListRowText}>Membership</Text>
                <Text style={style.ListRowText}>{item.Membership}</Text>
     </View>
    <View style={style.ListItemRow_Space_between_secondary}>
    <Text style={style.ListRowText}>Expiration</Text>
                <Text style={style.ListRowText}>{item.ExpiredDate}</Text>
    </View>
 

      </Card>
    )
      }

  render() {
    return (

      <View style={style.ListPagecontainer}>     
      <FlatList
       data={this.state.data}
       renderItem={this.rederItems}
       ListHeaderComponent={() => (!this.state.data.length? <EmptyMessage/> : null ) }
       keyExtractor={(item) => item.FirstName}
     />
   </View>
 

    );
  }

}

 