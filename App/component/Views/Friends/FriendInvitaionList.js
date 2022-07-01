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

export default class InviteFriendsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            data: [],
            Alert_Visibility: false,
            Alert_Title: '',
            Alert_Message: '',
            Alert_MessageMode: '',
        }
    }
    dismissAlert = (values) => {
        this.setState({ Alert_Visibility: values })
    }
    CancelAlert = (values) => {
        this.setState({ Alert_Visibility: values })
    }


    GetUserListData = async () => {
        const LoginUserID = await AsyncStorage.getItem('LoginUserID');

        var firstName = this.props.route.params.firstName;
        var lastName = this.props.route.params.lastName;
        var email = this.props.route.params.email;
       
        var url =  `Friends/UserList?userID=${LoginUserID}&&firstName=${firstName}&&lastName=${lastName}&&email=${email}`;
        await CallPI('GET', url, null, LoginUserID,  " " ,null).then((response) => response.json())
            .then(responseJson => {
                // Showing response message coming from server after inserting records.
                this.setState({
                    data: responseJson,
                    isLoading: false
                })
            }
            ).catch(error => {
                this.setState({
                    isLoading: false
                })
            });
    }

    async InviteFriend(userID) {
        const LoginUserID = await AsyncStorage.getItem('LoginUserID');
        var url = `Friends/SendFriendRequest?requestUserID=${userID}&&customerID=${LoginUserID}`;
        console.log(url)

        await CallPI('POST', url, null, LoginUserID,  " " ,null).then((response) => response.json())
            .then(responseJson => {
                // Showing response message coming from server after inserting records.
                if (responseJson.indexOf("your request has been sent") > -1) {
                    //alert(responseJson)
                    this.setState({
                        Alert_Visibility: true,
                        Alert_Title: "Alert",
                        Alert_Message: responseJson,
                        Alert_MessageMode: 'error',
                       
                      })
                } else {
                   // alert(responseJson)
                    this.setState({
                        Alert_Visibility: true,
                        Alert_Title: "Alert",
                        Alert_Message: responseJson,
                        Alert_MessageMode: 'success',
                       
                      })
                }
                this.setState({

                    isLoading: false
                })
            }
            ).catch(error => {
                this.setState({
                    isLoading: false
                })
            });
    }
    componentDidMount() {
        this.setState({ isLoading: true })

        this.GetUserListData()

    }
 
rederItems = ({ item, index }) => {
    return (
      <Card containerStyle={[style.CardHeader_Button]}> 

            <View style={style.ListItemRow_Space_between_secondary}>
                <Text style={style.ListRowText}>Name</Text>
                <Text style={style.ListRowText}> {item.f_name} {item.l_name}</Text>

            </View>
            <View style={style.ListItemRow_Space_between}>
                <Text style={style.ListRowText}>Zip</Text>
                <Text style={style.ListRowText}>{item.zip}</Text>
            </View>
            <View style={style.ListItemRow_Space_between_secondary}>
                <Text style={style.ListRowText}>
                    City
                </Text>
                <Text style={style.ListRowText}>{item.city}</Text>
            </View>
            <View style={[style.ListItemRow_Space_between]}>
                <Text style={style.ListRowText}>
                    Middle Initial
                </Text>
                <Text style={style.ListRowText}> {item.mi}</Text>
            </View>
            <View style={[style.ListItemRow_Space_between_secondary]}>
            <Text style={style.ListRowText}>Suffix</Text>
                <Text style={style.ListRowText}> {item.suffix}</Text>
            </View>
  
     {/* <TouchableOpacity  activeOpacity={0.1} style={style.btnCardbuttom}  onPress={() => this.RemoveFriend(item.ID)}>
          <Image
              style={{
                height:40,
               width: 40,
              }}
              resizeMode="contain"
              source={require('../../../Images/Icon/delete-02.png')}
            />
          </TouchableOpacity>   */}
           <View style={[style.ListItemRow,{justifyContent:'center'}]}>
            
                <View style={{width:'50%'}}>
                <TouchableOpacity style={[style.buttonContainer,{ padding: 8,marginTop:10}]}  onPress={() => this.InviteFriend(item.id)}  >
                                            <Text style={style.buttunTextColo}>Invite </Text>
               </TouchableOpacity>
                </View>
               
          
                        </View>
       
 
   
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


