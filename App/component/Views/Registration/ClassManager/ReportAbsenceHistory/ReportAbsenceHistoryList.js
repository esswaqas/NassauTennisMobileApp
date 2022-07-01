import * as React from 'react'
import { StyleSheet, RefreshControl, Text, View, TextInput, Button, TouchableHighlight, Image, Alert, Picker, ScrollView ,FlatList} from 'react-native';
import style from '../../../../../Stylesheets/NAppSS'

import AsyncStorage from "@react-native-async-storage/async-storage";
import EmptyMessage from '../../../Shared/ListEmptyMessage';
import Loader from '../../../../Loader'
import { Card } from 'react-native-elements'


import { CallPI } from '../../../../../Api/APICall'
export default class ReportAbsenceHistory extends React.Component {
    constructor(props) {
        super(props)
      }
      state = {
         
        HistoryList: [],
         
        isLoading: true,
        
        
      }
      async GetList() {

        const LoginUserID = await AsyncStorage.getItem('LoginUserID');
        var DateFrom = this.props.route.params.DateFrom == null ? "'" : this.props.route.params.DateFrom;
        var DateTo = this.props.route.params.DateTo == null ? "" : this.props.route.params.DateTo;
        var ProgramID = this.props.route.params.ProgramID == null ? "" : this.props.route.params.ProgramID;
        var RegistrationType = this.props.route.params.RegistrationType == null ? "" : this.props.route.params.RegistrationType;
        var ClassID = this.props.route.params.ClassID == null ? "" : this.props.route.params.ClassID;
        var addtoGrid = new Object();
      //  alert(RegistrationType +" "+ ProgramID+" "+ClassID + " end ")
        addtoGrid = {
            RegistrationType:RegistrationType,
            ClassID: ClassID,
            ProgramID: ProgramID,
            DateFrom: DateFrom,
            DateTo: DateTo,
 
        };
        LoginUserID
      //  alert(LoginUserID)

        var url = 'ClassManagment/ReportAbsenceHistory?isAsenceHistory=true';
        console.log("Body  ===     " + JSON.stringify(addtoGrid))

        try {
          
            
            await CallPI("POST", url, addtoGrid, LoginUserID,null).then((response) => response.json()).then(responseJson => {
                console.log("  List Result    == " + JSON.stringify(responseJson.lstOpenClasses))
                this.setState({HistoryList:responseJson.lstOpenClasses})
                 
            })} catch (e) {
                console.log(" Pro Catch  " + e)
              }
    }

    componentDidMount() {

        this.setState({
          isLoading: false
        })
  this.GetList()
      }
      rederItems = ({ item, index }) => {
        return (
         
          <Card containerStyle={style.CardHeader}>

          <View style={style.ListItemRow}>
          <Text style={style.ListRowText}>{item.StudentOut }</Text>
          </View>
          <View style={style.ListItemRow}>
          <Text style={style.ListRowText}>({item.Date })({item.Class })({item.ClassDayTime})</Text>
          </View>
          <View style={style.ListItemRow}>
          <Text style={style.ListRowText}>
          {
            item.AdvanceNoticeTimeColor =="Green" ? <Text style={{color:'green'}}>{item.AdvanceNotice} </Text> :<Text style={{color:'red'}}>{item.AdvanceNotice} </Text>
              }
            </Text>
          </View>
          </Card>
        )
      }
      render() {

        return (
          <View style={style.ListPagecontainer}>
          <Loader loading={this.state.isLoading} />  
            <FlatList
        data={this.state.HistoryList} 
        renderItem={this.rederItems}
         ListHeaderComponent={() => (!this.state.HistoryList? <EmptyMessage/> : null ) }
        keyExtractor={(item) => item.ID.toString()}
      />
        </View>
        )}}