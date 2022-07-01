import React, { Component } from 'react';
import {
  View,StyleSheet,TouchableHighlight,FlatList,Text,ScrollView


} from 'react-native';
import style from '../../../Stylesheets/NAppSS';
  import { WebView} from 'react-native-webview';//'react-native-WebView'
import {Card} from 'react-native-elements'

import AsyncStorage from "@react-native-async-storage/async-storage";
 
import EmptyMessage from '../../../component/Views/Shared/ListEmptyMessage';
import { CallPI } from '../../../Api/APICall'
 
 
  export default class RecentApprovedRegistration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      data: []
    }
  }

GetApprovedRegistraion=async ()=>{

  const LoginUserID = await  AsyncStorage.getItem('LoginUserID');
   
  var url = `Dashboard/GetRecentPendingRegistrationList?pendingRegistrationUserID=${LoginUserID}`;
 
  await CallPI('GET', url, null, null,  " " , null)
  .then(response => response.json())
    .then(responseJson => {
     // alert(JSON.stringify(responseJson))
  this.setState({
        data: responseJson
      })}).catch(error => {

  });
}

  componentDidMount() {
   this.GetApprovedRegistraion()
    
  }

   
  rederItems = ({ item, index }) => {
return (
  index % 2 === 0 ?  
  <View style={style.ListItemRow_secondary}>
    <Text style={style.ListRowText}>{item.PurchaserName}</Text>
  <Text style={style.ListRowText}>{item.Activity}</Text>
  
  </View>
  : 
  <View style={style.ListItemRow}>
  <Text style={style.ListRowText}>{item.PurchaserName}</Text>
  <Text style={style.ListRowText}>{item.Activity}</Text>
  </View>
)
  }

  render() {
    return (
      <View style={style.ListPagecontainer}>
          <Card containerStyle={style.CardHeader}> 

      <FlatList
      data={this.state.data}
      renderItem={this.rederItems}
     
   ListHeaderComponent={() => (!this.state.data.length?

    <EmptyMessage/>
    : null)
  }

  keyExtractor={(item,index)=>index.toString()}
      />
</Card>
      </View>

    );
  }

}

 
