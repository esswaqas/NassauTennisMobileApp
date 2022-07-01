import React, { Component } from 'react';
import {
    View, StyleSheet, TouchableHighlight, FlatList, Text, Alert
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from '../../../Stylesheets/AppSS';
import Loader from '../../../component/Loader'
import { CommonActions } from "@react-navigation/native";

export default class InviteFriendsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
         
            data: []
        }
    }

 
   
 
            RedirectToPersonTabInfo() {

                this.props.navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        { name: 'FriendHistoryList' },
                      ],
                    })
                  );
            }
    componentDidMount() {
      
          var  id =   this.props.route.params.id;
          var  Status =  this.props.route.params.status;
          var  ApprovedDate =  this.props.route.params.approvedDate;
          var  PendingDate =  this.props.route.params.pendingDate;
          var  CancelationDate =  this.props.route.params.cancelationDate ;
          var  FriendID =  this.props.route.params.friendID ;
          const obj = {'id':id, 'Status':Status, 'ApprovedDate':ApprovedDate, 'PendingDate':PendingDate, 'CancelationDate':CancelationDate,'FriendID':FriendID};
          this.state.data.push(obj);
          this.setState({ isLoading: false })
    }

    render() {
        return (
            <View style={style.PageContainer}>
            <View style={style.container}>
                <Loader loading={this.state.isLoading} />
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) =>
                        <View style={style.FlatListItems}>
                           
                        </View>
                    }
                    keyExtractor={(item) => item.id}
                />
            </View>
            </View>
        );
    }

}

const buttonStyle = StyleSheet.create({


    buttonContainer: {
height:20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
       
        width:'80%',
        borderRadius: 0,
    },
    ButtonColor: {
        backgroundColor: "#88aa31",
    },
})