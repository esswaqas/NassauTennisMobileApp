import React, { Component } from 'react';
import {
    View, StyleSheet, TouchableOpacity, FlatList, Text,Alert,Image
} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import style from '../../../Stylesheets/NAppSS';
import Loader from '../../../component/Loader'
import { Icon } from 'react-native-elements'
import { CallPI } from '../../../Api/APICall'
import EmptyMessage from '../../Views/Shared/ListEmptyMessage';
import {Card} from 'react-native-elements'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';
  import AlertBox from  '../../Views/Shared/MessageBox'
import { BackHandler } from 'react-native';

export default class FamilyMembers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
        //     data: [{"FirstName":"Hunzla","LastName":"Sheikh","Email":"esshunzla@hotmail.com","IsExpanded":false,"City":"lstbooking","Zip":"12323","Date":null,"ApprovedDate":"01/22/2020","ApprovedDateTime":"06:10:11.0800000","PendingDate":null,"CancelationDate":null,"Status":"Approved","ID":112,"FriendID":23682,"MiddleIntial":"m","lstRequestFriend":null,"lstUsers":null}
        // ,{"FirstName":"Hunzla","LastName":"Sheikh","Email":"esshunzla@hotmail.com","IsExpanded":false,"City":"lstbooking","Zip":"12323","Date":null,"ApprovedDate":"01/22/2020","ApprovedDateTime":"06:10:11.0800000","PendingDate":null,"CancelationDate":null,"Status":"Approved","ID":112,"FriendID":23682,"MiddleIntial":"m","lstRequestFriend":null,"lstUsers":null}
        // ],
        data: [],
        Alert_Visibility: false,
        Alert_Title: '',
        Alert_Message: '',
        Alert_MessageMode: '',
        IsRemoveFriend:false,
        ID:''
        }
    }

    dismissAlert = (values) => {
        this.setState({ Alert_Visibility: values })
    
        if(this.state.IsRemoveFriend===true)
        { 
          this.RemoveUserFriend(this.state.ID) 
          this.setState({ IsRemoveFriend:false,
           })
        }
    }
    CancelAlert = (values) => {
        this.setState({ Alert_Visibility: values })
    }
    GetFamilyData = async () => {

        const LoginUserID = await AsyncStorage.getItem('LoginUserID');
        var url = 'Friends/FriendList?userID='+LoginUserID;
        await CallPI('GET', url, null, LoginUserID,  " " ,null).then((response) => response.json())
        .then(responseJson => {
//console.log("ffffff list === "+JSON.stringify( responseJson))
            this.setState({
                data: responseJson,
                isLoading: false
            })
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });
    }
    RemoveFriend  = async (Id) => 
    {
        console.log(Id)
        // Alert.alert(
        //     "Alert ",
        //     "Completely remove this Friend from your list?",
        //     [
        //       {
        //         text: "Cancel",
        //         onPress: () => console.log("Cancel Pressed"),
        //         style: "cancel"
        //       },
        //       { text: "OK", onPress: () => this.RemoveUserFriend(Id) }
        //     ]
        //   );
          this.setState({
            Alert_Visibility: true,
            Alert_Title: "Alert",
            Alert_Message: "Completely remove this Friend from your list?",
            Alert_MessageMode: 'error',
            IsRemoveFriend:true,
            ID:Id
          })
    }
    RemoveUserFriend  = async (Id) => 
    {
        const LoginUserID = await AsyncStorage.getItem('LoginUserID');
        var url = 'Friends/RemoveFriend?ID='+Id+'&&UserID='+LoginUserID;
        console.log(url)
        await CallPI('GET', url, null, LoginUserID,  " " , null).then((response) => response.json())
        .then(responseJson => {
            if(responseJson=== null || responseJson=== '')
            {
              //  Alert.alert("Error","Friend has not been deleted.")
                this.setState({
                    Alert_Visibility: true,
                    Alert_Title: "Alert",
                    Alert_Message: "Friend has not been deleted.",
                    Alert_MessageMode: 'error',
                    IsRemoveFriend:false
                  })
            }
            else{
           // Alert.alert("Success","Friend has been deleted.")
            this.setState({
                Alert_Visibility: true,
                Alert_Title: "Alert",
                Alert_Message: "Friend has been deleted.",
                Alert_MessageMode: 'success',
                IsRemoveFriend:false
              })
            this.setState({
                data: responseJson,
                isLoading: false
            })}
        }).catch(error => {
            this.setState({

                isLoading: false
            })

        });
    }
    componentWillUnmount() {
        rol(this);
      }
  
    componentDidMount() {
        lor(this)
        this.setState({ isLoading: true })
        this.GetFamilyData()
    }
    rederItems = ({ item, index }) => {
        return (
          <Card containerStyle={[style.CardHeader_Button]}> 

          <View style={style.ListItemRow_Space_between_secondary}>
              <Text style={style.ListRowText}>Name</Text>
              <Text style={style.ListRowText}>{item.FirstName} {item.LastName}</Text>

              {/* <View style={{ flexDirection: 'row' ,paddingRight:5}}>
                 <Icon name="edit" type='FontAwesome' color='#88aa31' size={23} onPress={() => this.EditCard(item.CardID)} style={{ color: '#88aa31' }} />
                <Icon name="trash-alt"  type='font-awesome-5'  color='red'  size={22} onPress={() => this.DeleteCard(item.CardID)} containerStyle={{ marginLeft:5 }} />
              </View> */}
          </View>
         <View style={style.ListItemRow_Space_between}>
         <Text style={style.ListRowText}>Zip</Text>
         <Text style={style.ListRowText}>{item.Zip}</Text>
        </View>
          <View style={style.ListItemRow_Space_between_secondary}>
          <Text style={style.ListRowText}>Email</Text>
          <Text style={style.ListRowText}>{item.Email}</Text>
          </View>
        <View style={[style.ListItemRow_Space_between]}>
        <Text style={style.ListRowText}>City</Text>
         <Text style={style.ListRowText}>{item.City}</Text>
        </View>
        <View style={style.ht_15}>

        </View>

         <TouchableOpacity  activeOpacity={0.1} style={style.btnCardbuttom}  onPress={() => this.RemoveFriend(item.ID)}>
              <Image
                  style={{
                    height:40,
                   width: 40,
                  }}
                  resizeMode="contain"
                  source={require('../../../Images/Icon/delete-02.png')}
                />
              </TouchableOpacity>  
               

           
{/* 
          <View style={style.btnCardbuttom}>
              <TouchableOpacity  activeOpacity={0.1}   onPress={() => this.RemoveFriend(item.ID)}>
              <Image
                  style={{
                    height: hp('10%'),
                   width: wp('10%'),
                  }}
                  resizeMode="contain"
                  source={require('../../../Images/Icon/delete-02.png')}
                />
              </TouchableOpacity>
          </View> */}
       
          </Card>
        )}

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
CancelAlert = {this.CancelAlert}
/>
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


