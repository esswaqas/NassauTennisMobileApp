import React, { Component } from 'react';
import {
  View, StyleSheet, TouchableHighlight, FlatList, Text
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from '../../../Stylesheets/NAppSS';
import  {CallPI} from '../../../Api/APICall'
import {Card} from 'react-native-elements'
import EmptyMessage from '../../../component/Views/Shared/ListEmptyMessage';

export default class FamilyMembers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      data: []
    }
  }

GetFamilyData=async ()=>{

  const LoginUserID = await  AsyncStorage.getItem('LoginUserID');
 
  var url =`Dashboard/FamilyMembers?userID=${LoginUserID}`;
 //var url =  'http://192.168.0.117:1237/api/Customers/GetFamilyMembers?familyMemberID=26338';

 await CallPI('GET', url, null, null,  " " , null).then((response) => response.json())
    .then(responseJson => {
      console.log(JSON.stringify(responseJson))
       this.setState({data: responseJson }) 
     })
    .catch(error => {
      alert(JSON.stringify(error))
    });
}

  componentDidMount() {
   this.GetFamilyData()
    
  }
  rederItems = ({ item, index }) => {
    return (
      <Card containerStyle={style.CardHeader}> 
      <View style={style.ListItemRow_Space_between_secondary}>
        <Text style={style.ListRowText}>Name </Text>
        <Text style={style.ListRowText}>{item.FirstName} {item.LastName}</Text>
      </View>
     <View style={style.ListItemRow_Space_between}>
     <Text style={style.ListRowText}>Email </Text>
     <Text style={style.ListRowText}> {item.Email}</Text>
     </View>
    <View style={style.ListItemRow_Space_between_secondary}>
         <Text style={style.ListRowText}>City </Text>
         <Text style={style.ListRowText}> {item.City}</Text>
    </View>
    <View style={style.ListItemRow_Space_between}>
    <Text style={style.ListRowText}>Work Phone </Text>
     <Text style={style.ListRowText}> {item.WorkPhone}</Text>
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

 
 