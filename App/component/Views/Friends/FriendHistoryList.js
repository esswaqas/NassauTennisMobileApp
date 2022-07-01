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
 export default class FriendHistoryList extends Component {

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
    GetFriendListData = async () => {
       
        const LoginUserID = await AsyncStorage.getItem('LoginUserID');
         var url =  `Friends/FriendHistoryList?userID=${LoginUserID}&&isHistory=true`;
        // fetch(url, {
        //     method: "GET",
        // })
        await CallPI( "GET",url, null,null,'',null)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    data: responseJson.lstRequestFriend,
                    isLoading: false
                })
            }
            ).catch(error => { });
    }

  async  CancelRequest(id)
    {
         
        this.setState({
            isLoading: true
        })
         var url =  `Friends/CancelFriendRequest?requestID=${id}&&isCancelFriendRequest=true`;
       
        await CallPI( "POST",url, null,null,'',null)

            .then(response => response.json())
            .then(responseJson => {
                if(responseJson.SuccessMessage!=null || responseJson.SuccessMessage!='')
                {
                    
                   
                        this.setState({
                            Alert_Visibility: true,
                            Alert_Title: "Alert",
                            Alert_Message:  responseJson.SuccessMessage,
                            Alert_MessageMode: 'success',
                            IsRemoveFriend:false
                          })
                         this.GetFriendListData();
                }
                else{
                    //alert(JSON.stringify(responseJson))
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
    async  ResendRequest(id,fID){
        this.setState({
            isLoading: true
        })
        const LoginUserID = await AsyncStorage.getItem('LoginUserID');
        var url =  `Friends/ResendFriendRequest?id=${id}&&friendID=${fID}&&isResendRequest=yes&&customerID=${LoginUserID}`;
        fetch(url, {
            method: "POST",
        })
        await CallPI( "POST",url, null,null,'',null)

            .then(response => response.json())
            .then(responseJson => {
                if(responseJson.SuccessMessage!=null || responseJson.SuccessMessage!=''){
                    
                   
                    this.setState({
                        Alert_Visibility: true,
                        Alert_Title: "Alert",
                        Alert_Message:  responseJson.SuccessMessage,
                        Alert_MessageMode: 'success',
                        IsRemoveFriend:false
                      })
                    this.GetFriendListData();
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
        this.GetFriendListData()
    }

   
    UpDatedExt = (index) => 
    {
        const array = [...this.state.data];
        array[index]['IsExpanded'] = !array[index]['IsExpanded'];
        this.setState({ data: array });
    }

    rederItems = ({ item, index }) => {
        return (
            <Card containerStyle={[style.CardHeader_Button]}> 

            <View style={style.ListItemRow_Space_between_secondary}>
                <Text style={style.ListRowText}>Name</Text>
                <Text style={style.ListRowText}>{item.FirstName} {item.LastName}</Text>

            </View>
            <View style={style.ListItemRow_Space_between}>
                <Text style={style.ListRowText}>Email</Text>
                <Text style={style.ListRowText}>{item.Email}</Text>
            </View>
            <View style={style.ListItemRow_Space_between_secondary}>
            <Text style={style.ListRowText}>Approved Date</Text>
                                        <Text style={style.ListRowText}>{item.ApprovedDate}</Text>
            </View>
            <View style={[style.ListItemRow_Space_between]}>
            <Text style={style.ListRowText}>Pending Date</Text>
                                        <Text style={style.ListRowText}>{item.PendingDate}</Text>
            </View>
            <View style={[style.ListItemRow_Space_between_secondary]}>
            <Text style={style.ListRowText}>Cancel Date</Text>
                                        <Text style={style.ListRowText}>{item.CancelationDate}</Text>
            </View>
   
           <View style={[style.ListItemRow,{justifyContent:'center'}]}>
            
                    
                    {
                       item.Status == "Pending" ?
                       <View style={{ width: '40%' }}>
                        <TouchableOpacity style={[style.buttonContainer_danger, { padding: 8, marginTop: 10 ,marginRight: 10}]} onPress={() => this.CancelRequest(item.ID)}  >
                            <Text style={{ color: '#FFFF', fontWeight: "bold" }}>Cancel</Text>
                        </TouchableOpacity>  
                        </View>
                        : 
                        null
                    }

                    {  
                       item.Status == "Pending" || item.Status == "Cancel" ?
                       <View style={{ width: '40%' }}>
                        <TouchableOpacity style={[style.buttonContainer, { padding: 8, marginTop: 10 }]} onPress={() => this.ResendRequest(item.ID, item.FriendID)}  >
                            <Text style={{ color: '#FFFF', fontWeight: "bold" }}>Resend </Text>
                        </TouchableOpacity> 
                        </View>
                        :  
                        null
                    }

          
                        </View>
       
 
   
      </Card>
             
         )}
    render() {
        return (
            <View style={style.ListPagecontainer}>
             
                  {/* <Loader loading={this.state.isLoading} />   */}
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