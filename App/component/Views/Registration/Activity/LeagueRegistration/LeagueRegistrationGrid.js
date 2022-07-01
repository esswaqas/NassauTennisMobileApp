import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Text, Image, RefreshControl } from 'react-native';
import style from '../../../../../Stylesheets/NAppSS';

import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from '../../../../../../App/component/Loader'
import { Icon, Card } from 'react-native-elements'
import { CallPI } from '../../../../../Api/APICall'
import { CommonActions } from '@react-navigation/native';



export default class RegistratonGrid extends Component {
    constructor(props) {

        
        super(props)
        
        this.state = {
            isLoading: false,
            ActivityID:'',
            data: [],
            refreshing: true,
            CartList: []
        }
    }
    ChooseMoreItems= async ()=>{
        this.props.navigation.dispatch(CommonActions.goBack());

    }
  
    RegistrationTerms= async ()=>{
        this.props.navigation.navigate("LeagueRegistrationTerms",{
            ActivityID: this.state.ActivityID
        })
    }

    async RemoveGridItem(id , messageVisible) {
 
        var updatedCart = await AsyncStorage.getItem('UpdatedCart');
        var grid = await AsyncStorage.getItem('Grid');
          var cart = await AsyncStorage.getItem('AddToCart');
          var fName = await AsyncStorage.getItem('LoginUserFirstName');
          var lName = await AsyncStorage.getItem('LoginUserLastName');
          const LoginUserID = await AsyncStorage.getItem('LoginUserID');
    
          var addtoGrid = new Object();
          addtoGrid = {
            RegistrationGridItems: JSON.parse(grid),
            RegistrationUpdatedCart: JSON.parse(updatedCart)
          };
    
          console.log("rid body   ====" + JSON.stringify(addtoGrid))
         
          var url = 'CustomerClinicRegistration/RemoveGridItem?gridID='+id+'&messageVisible=false'
          await CallPI("POST", url, addtoGrid, LoginUserID, fName + " " + lName, cart).then((response) => response.json())
            .then(responseJson => {
              console.log("grif  result ====" + JSON.stringify(responseJson))
                  AsyncStorage.setItem('updateCart', JSON.stringify(responseJson.Data.updateCart));
         
              
                AsyncStorage.setItem('Grid', JSON.stringify(responseJson.Data.lstProgramGrid));
              
              this.setState({ data: responseJson.Data.lstProgramGrid });
            })
        }
    async componentDidMount() {
       
        var  ass= this.props.route.params.ActivityID;
      
        this.setState({
            ActivityID:ass
                   })
 
        var grid = await AsyncStorage.getItem('Grid');
        if (grid != null && grid.length > 0) {
            this.setState({ data: JSON.parse(grid) });
        }
    }

    render() {
        return (
            <View style={style.Pagecontainer}>
            <View  style={[style.containerWithCardRow]}>
                <Loader loading={this.state.isLoading} />
                {/* <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.Reg()} /> */}
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) =>
                    <View >
<Card containerStyle={[style.CardHeader_Button]}> 

<View style={style.ListItemRow_Space_between_secondary}>
    <Text style={style.ListRowText}>Purchase For</Text>
    <Text style={style.ListRowText}>{item.PurchaseFor}</Text>

</View>
<View style={style.ListItemRow_Space_between}>
<Text style={style.ListRowText}>Program</Text>
<Text style={style.ListRowText}>{item.Program}</Text>
</View>
<View style={style.ListItemRow_Space_between_secondary}>
<Text style={style.ListRowText}>Class</Text>
<Text style={style.ListRowText}>{item.Class}</Text>
</View>
<View style={[style.ListItemRow_Space_between]}>
<Text style={style.ListRowText}>Class Time</Text>
<Text style={style.ListRowText}>{item.ClassTime}</Text>
</View>

<View style={[style.ListItemRow_Space_between_secondary]}>
<Text style={style.ListRowText}>Price</Text>
<Text style={style.ListRowText}>          
${item.Cost.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
</Text>
</View>
<View style={style.ListItemRow_Space_between}>
<Text style={style.ListRowText}>Days</Text>
<Text style={style.ListRowText}>{item.Days}</Text>
 </View>
<View style={style.ListItemRow_Space_between_secondary}>
 
</View>
<View style={style.ht_15}>

</View>
</Card>

<TouchableOpacity  activeOpacity={0.1} style={style.btnCardbuttom}  onPress={() => this.RemoveGridItem(item.ID,false)}>
    <Image
        style={[style.ImageIcon]} resizeMode="contain"
        source={require('../../../../../Images/Icon/delete-02.png')}
      />
</TouchableOpacity>  

</View>
                         
                    }
                   
                    keyExtractor={(item, index) => index.toString()}
                />

               <View style={{marginRight:20 , marginLeft:20}}>
               <TouchableOpacity style={[style.buttonContainer]} onPress={() => this.ChooseMoreItems()} >
                <Text style={style.buttunTextColo}>Choose More {this.state.TotalAmount} </Text>
                </TouchableOpacity>
                {
               this.state.data.length>0? 
                <TouchableOpacity style={[style.buttonContainer]} onPress={() => this.RegistrationTerms()} >
                <Text style={style.buttunTextColo}>Next {this.state.TotalAmount} </Text>
                </TouchableOpacity>
                :null
            }
            </View>
            </View>
            </View>
        );
    }

}

