import * as React from 'react'
import { StyleSheet, RefreshControl, TouchableOpacity,Text, View, TextInput, Button, TouchableHighlight, Image, Alert, ScrollView ,FlatList} from 'react-native';
import style from '../../../../../Stylesheets/NAppSS'

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card ,Icon} from 'react-native-elements'

import Loader from '../../../../Loader'
import EmptyMessage from '../../../Shared/ListEmptyMessage'

import {List} from "react-native-paper";
import { CallPI } from '../../../../../Api/APICall'
 

export default class ReportAbsenceHistory extends React.Component {
 
    constructor(props) {
        super(props)
      }
      state = {
         
        HistoryList: [],
        isExpanded:false,
        isLoading: true,
        
        
      }
      async GetList() {

        const LoginUserID = await AsyncStorage.getItem('LoginUserID');
        var DateFrom = this.props.route.params.DateFrom == null ? "'" : this.props.route.params.DateFrom;
        var DateTo = this.props.route.params.DateTo == null ? "" : this.props.route.params.DateTo;
        var ProgramID = this.props.route.params.ProgramID == null ? "" : this.props.route.params.ProgramID;
        var RegistrationType = this.props.route.params.RegistrationType == null ? "" : this.props.route.params.RegistrationType;
         var addtoGrid = new Object();
        addtoGrid = {
            RegistrationType:RegistrationType,
          
            ProgramID: ProgramID,
            DateFrom: DateFrom,
            DateTo: DateTo,
 
        };
        
       

        var url = 'ClassManagment/RequestMakeUpDropInHistory?isMakeupDropInHistory=true';
        console.log("Body  ===     " + JSON.stringify(addtoGrid))

        try {
          
            
            await CallPI("POST", url, addtoGrid, LoginUserID,null).then((response) => response.json()).then(responseJson => {
                console.log("  List Result    == " + JSON.stringify(responseJson.lstRequestModel))
                this.setState({HistoryList:responseJson.lstRequestModel})
                 
            })} catch (e) {
                console.log(" Pro Catch  " + e)
              }
    }
    Extended(){
        this.setState({isExpanded:!this.state.isExpanded})
    }
    componentDidMount() {

        this.setState({
          isLoading: false
        })
       
  this.GetList()
      }
      UpDatedExt=(index)=>
      {
  
  const array = [...this.state.HistoryList];
   
  array[index]['Expanded'] = ! array[index]['Expanded']
  this.setState({HistoryList:array})
      }
      rederItems=({item ,index})=>{
          return(
            <Card containerStyle={style.CardItem}>
                   <TouchableOpacity style={style.CartItembg_Success} onPress={() => { this.UpDatedExt(index) }}>
                     
                     <View style={{ width: '90%' }}>
                         <Text style={[style.Color_white,{alignItems:'center'} ]}>
                             <Text style={style.ListRowText}>{item.UserName}</Text>
                         </Text>
                     </View>
                     <View>
                     {
                         item.Expanded ?
                         <Icon name="angle-up" type='font-awesome' color={'#fff'} size={24} />
                         :
                         <Icon name="angle-down" type='font-awesome' color={'#fff'} size={24} />
                         }
                     </View>
                 
          </TouchableOpacity> 
             <View  style={style.CardContainer}>
                 <View style={[style.ListItemRow_Space_between]}>
                          
                                
                 <Text style={style.ListRowText}>{"("+item.RequestFor+")("+item.Class+")"}</Text>

                                 
                             
                 </View>
               </View>{
               item.Expanded ?
                        <View  style={style.CardExpandableContainer}>
                                 <View style={[style.ListItemRow_Space_between_secondary]}>
                                 <Text style={style.ListRowText}>Requested Date</Text>
                      <Text style={style.ListRowText}>{item.RequestDateTime}</Text>
                                 </View>
                                 
                                 <View style={[style.ListItemRow_Space_between]}>
                                 <Text style={style.ListRowText}>Date</Text>
                      <Text style={style.ListRowText}>{item.Date}</Text>
                                </View>
                                <View style={[style.ListItemRow_Space_between_secondary]}>
                                <Text style={style.ListRowText}>Day</Text>
                      <Text style={style.ListRowText}>{item.Day}</Text>
                                </View>
                                <View style={[style.ListItemRow_Space_between]}>
                                <Text style={style.ListRowText}>Status</Text>
                  <Text style={style.ListRowText}>{ item.Status}</Text>
                                </View>
                                <View style={[style.ListItemRow_Space_between_secondary]}>
                                <Text style={style.ListRowText}>Status Date</Text>
                  <Text style={style.ListRowText}>{item.StatusDateTime}</Text>
                                </View>
                               
                            </View>
                            :
                            null
                            }
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

                ListHeaderComponent={() => (!this.state.HistoryList.length? <EmptyMessage/> : null ) }

                keyExtractor={(item, index) => index.toString()}
               
            />
        </View>
          

 

        )
    }
    }