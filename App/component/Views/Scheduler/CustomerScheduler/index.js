import * as React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  StyleSheet,
  Text,
  View,
  TextInput,  TouchableHighlight,
  Image,
  Alert,
  ListItem,
  Modal,
  Button,
  TouchableOpacity,ScrollView,Left,Right,SafeAreaView,
  FlatList,Dimensions,
 } from 'react-native';
 
 import AsyncStorage from "@react-native-async-storage/async-storage";
 import styles from '../../../../Stylesheets/NAppSS'
import AlertBox from '../../../../component/Views/Shared/MessageBox'
import Loader from '../../../../../App/component/Loader'
import { DataTable } from 'react-native-paper'
import moment from 'moment';
const {dheight,dwidth}=  Dimensions.get('window')
const vw = Dimensions.get('window').width
 
  import { CallPI } from '../../../../Api/APICall'
import { Col } from 'native-base';
import { RectButton } from 'react-native-gesture-handler';
 
// import TransactionHistoryList from '../../../TransactionHistory/TransacrionHistoryList';
const DATA = [
  {
    id: '1',
    title: 'Building 1',
  },
  {
    id: '2',
    title: 'Building 2  ',
  },
  {
    id: '3',
    title: 'Building 3  ',
  },
];
 
export default  class SchedulerBooing extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    isLoading:false,
   ScheduleDate:'',
   FacilityList:[],
   myRef: React.createRef(),
   CourtList:[],
   CourtListForClearSelection:[],
   CourtHeaderList:[],
   DisplayScheduleDate:'',
   ShowScheduler:false,
   //message Props
   Alert_Visibility: false,
   Alert_Title: '',
   Alert_Message: '',
   Alert_MessageMode: '',
   IsCancelBooking: false,
   cancelbookingID:'',
   isTimeExceed:true,
   isTimeExceedMessage:false
  }
  dismissAlert = (values) => { 
    this.setState({ Alert_Visibility: values })
  if(this.state.IsCancelBooking==true)
  {
    this.BookingDetail(this.state.cancelbookingID)
  }
  

  if(this.state.isTimeExceedMessage==true)
  {
    this.props.navigation.reset({ routes: [{ name: 'DashboardList' }] });
  }
 }
  CancelAlert = (values) => {

     this.setState({ Alert_Visibility: values }) 
     if(this.state.isTimeExceedMessage==true)
     {
       this.props.navigation.reset({ routes: [{ name: 'DashboardList' }] });
     }
    }


ScrollList(){


  this.state.myRef.current.scrollToOffset({animated: false, offset: -5})

 // this.state.myRef.current.ScrollTo({x: 0})
}

SelectBuidings(index,value)
{

  const array = [...this.state.FacilityList];
   
 for (let item  of  this.state.FacilityList) {
      
      //alert(JSON.stringify(item.TimeSlotsList.filter(i=>i.IsSelected==true)))

    //const obj = {'ID': item.TimeSlotsList.find(data => data.IsSelected == true).ID}
    if(item.value ==value && item.IsSelectBuilding == false)
    {

      item.TextColor =  '#ffffff'
      item.borderColor =  '#ffffff'
      item.Color =  '#ffffff'
      item.IsSelectBuilding = true
      this.GetAvailableCourtTimeSlots(value)
    }
    else 
    {
      item.TextColor =  '#ffffff'
      item.borderColor = "#334909"
      item.Color =  '#ffffff'
      item.IsSelectBuilding = false
      this.setState({CourtList:[]})
       
    }

  }
  // array[index]['IsSelectBuilding'] = ! array[index]['IsSelectBuilding']

  
  // if(array[index]['IsSelectBuilding'] ==true){
  //   array[index]['TextColor'] =  '#ffffff'
  //   array[index]['borderColor'] =  '#88aa31'
  //   array[index]['Color'] =  '#88aa31'
  //   array[index]['IsSelectBuilding'] = true

  // }
  // else {
  //   array[index]['TextColor'] = '#000000'
  //   array[index]['borderColor'] =  '#000000'
  //   array[index]['Color'] =  '#ffffff'
  // }

this.setState({FacilityList:array})



}

async GetFacilyList(){
      
  const  LoginUserID= await AsyncStorage.getItem('LoginUserID');
  var url ='CustomerScheduler/SchedulerFacilities?loginUserID='+LoginUserID;
 
  await CallPI("GET",url,null,null,"",null).then(response => response.json()).then(responseJson => {
  
   console.log("testststs  "+JSON.stringify(responseJson))
      var facilityList=[];
      this.setState({ isLoading:false })
      for (let userObject of responseJson)

       {
          facilityList.push({ label: userObject.Name  , value: userObject.ID ,Color:'#ffffff' , borderColor:"#334909", TextColor:'#88aa31', IsSelectBuilding:false});
        }
      
        this.setState({
    
          FacilityList:facilityList,
         
       })
     }).catch(error => {
     console.log(error)
     this.setState({isLoading:false})
   });
}


async  GetAvailableCourtTimeSlots(value)
{
 
 
 if(value=='')
 {
   //Alert.alert("Warning","Please set any courts first.")
   this.setState({
    Alert_Visibility: true,
    Alert_Title: 'Alert',
    Alert_Message: 'Please set any courts first.',
    Alert_MessageMode: 'error',
  })
   return false;
 }
    var url = 'CustomerScheduler/GetAvailableTimeSlots?buildingID='+value+"&&scheduleDate="+this.state.ScheduleDate ;
     
    this.setState({ isLoading: true    })

     await CallPI("GET",url,null,null,"",null).then(response => response.json()).then(responseJson => {
      this.setState({ isLoading: false})
   
      let header = responseJson.filter(cl => cl.TimeSlotsList.some(c => c.IsHeader ==true));
      let list = responseJson.filter(cl => cl.TimeSlotsList.some(c => c.IsHeader !=true));
    
      this.setState({ShowScheduler:true,  CourtList: list, CourtHeaderList:header})
    

      if(this.state.CourtList.length==0){
       // Alert.alert("warning","Time for the selected date is not define.")
        this.setState({
          Alert_Visibility: true,
          Alert_Title: 'Alert',
          Alert_Message: 'Time for the selected date is not define.',
          Alert_MessageMode: 'error',
        })
        return false;
      }
    
   }
     ).catch(error => {
       console.log(error)
      //  this.setState({ isLoading: false    })
     });
 
}

 SelectCourt=   (ID , parentIndex,childindex)=>{

  //alert(parentIndex)
  //let result = this.state.CourtList.filter(cl => cl.TimeSlotsList.some(c => c.IsHeader !=true));
   const array = this.state.CourtList;
   const childarray =  array[parentIndex]['TimeSlotsList'];
   childarray[childindex]['IsSelected'] = ! childarray[childindex]['IsSelected'];
   array[parentIndex]['TimeSlotsList'] =childarray;
   this.setState(
     {ShowScheduler:true,
      CourtList: array
    })

}

createTableHeader = () => {

 // let result = this.state.CourtList.filter(cl => cl.TimeSlotsList.some(c => c.IsHeader==true));
  

  return(  
    this.state.CourtHeaderList.map((v, p) => {
      return( 
        <DataTable.Header  style={{ marginTop:0,paddingLeft:0,paddingRight:0,height:"auto", backgroundColor:'#88aa31'}}>
     
             {
         v.TimeSlotsList.map((col, c) => {
          return(  
            <View style={{
               borderRightColor:'white' ,
               borderRightWidth: c==this.state.CourtHeaderList.length-1?0: 0.4,
               borderLeftColor:'white' ,
               borderLeftWidth: c==0?0: 0.8,
               padding:5,
               alignSelf:'center',
              // backgroundColor: "#88aa31" ,
               alignItems:'center',
               width:wp('18%'),
              backgroundColor: "#88aa31" ,
             
             }} > 

{
   col.Name==""? 
   <Text style={{fontSize:RFValue(15),color: '#ffffff', textAlign:'center'  }}>Time
  
   </Text>:
    <Text style={{fontSize:RFValue(15),color: '#ffffff', textAlign:'center' }}>
    {
      col.Name  
    }   
  </Text>

}
       
            </View>
            // <DataTable.Title style={{
            //   // flex: 1,
            //   // flexDirection:'column',
            //   display:"flex",
            //   alignItems:'center',
            //   width:wp('20%'),
            //   borderRadius:0,
            //   borderColor:col.borderColor ,
            //   borderWidth:0.4,
            //   alignSelf:'center',
            //   backgroundColor: "#88aa31" ,
            //   textAlign:'center'
            //  }} > 
            
            
            // <Text style={{fontSize:RFValue(15),color: '#ffffff', textAlign:'center',fontWeight:'bold' }}>
            //   {
            //     col.Name
            //   }
            // </Text>
             
              
            // </DataTable.Title>
                        
                         
                     
                          
                          )
         })
        
           }
             </DataTable.Header>
            
                      )}))

}
createTable = () => {
  //let result = this.state.CourtList.filter(cl => cl.TimeSlotsList.some(c => c.IsHeader !=true));
//  console.log("Row ===  "+JSON.stringify(result));
 
return(  
   
 
  this.state.CourtList.map((v, p) => {
    return( 
      <DataTable.Row style={{ borderBottomWidth: 0 ,margin:0,paddingLeft:0,paddingRight:0,paddingTop:0,height:'auto', 
      
     
      }}>
      {
   
      v.TimeSlotsList.map((col, c) => {
        return(
     
         
 
         
  
          <View
          style={{
           
      backgroundColor: '#fff',
      width: '100%',
   
            alignSelf:'center',
           // backgroundColor: "#88aa31" ,
            alignItems:'center',
            borderBottomWidth:0.3,
            //marginBottom:5,

          justifyContent:'center',
           backgroundColor: "white" ,
           width:wp('18%'),
           height:hp('8%')
          }} >
            
        {

  col.ISTime==true ? 
  
  < View style={{
              // borderWidth:0,
             //  padding:5,
               alignSelf:'center',
             
               width:wp('18%'),
               height:hp('7%'),

              // backgroundColor: "#88aa31" ,
               alignItems:'center',
               justifyContent:'center',
               marginBottom:1,

    backgroundColor: col.BackGroundcolor ,
    textAlign:'center'
    }} > 
  
  
  <Text style={{fontSize:RFValue(15),  textAlign:'center' }}>
    {
      col.Name
     
    }
   
  </Text>
   
    
  </View>
  
  :
  
            col.IsAvailable==false ? 
      
             <View style={{
              borderColor:'black',
              borderWidth:0.5,
              borderRadius:5,
             marginTop:2,
               height:hp('3.35%'),
               width:hp('3.35%'),
              alignSelf:'center',
             // backgroundColor: "#88aa31" ,
              alignItems:'center',
              justifyContent:'center',
                      backgroundColor:col.IsBooked==true? "#03fceb": 'grey' ,
                      
                       }} > 
                  
            
 
                      
                    </View>
                    
                    :
  
                    <TouchableOpacity style={{
                     borderColor:'black',
                     borderWidth:0.5,
                     borderRadius:5,
                    
                      height:hp('3.35%'),
                      width:hp('3.35%'),
              
                      alignSelf:'center',
                     // backgroundColor: "#88aa31" ,
                      alignItems:'center',
                      justifyContent:'center',
                      backgroundColor: col.IsSelected=== true? "#88aa31"  : "#fff" ,
                     
                       
                      }} 
                        onPress={() => {this.SelectCourt(col.ID,p,c)}}> 
                  
                  {/* <Text style={{fontSize:RFValue(15),  textAlign:'center' }}>
                        {
                        // col.IsAvailable==false? 
                        // col.ID===""? Col.Name: ""
                        
                        // : " "
                        
                        
                        }
                        
                        </Text> */}
                      
                    </TouchableOpacity>
      
}
  
  </View>
                    
                    
                    
                    )
                    }
                    )
                  }
  
    </DataTable.Row>
   )
 
  
  }))

}

componentDidMount() {
  lor(this);
  //alert(wp('100%') + " "+ )
 this.GetFacilyList()
  var ScheduleDate = this.props.route.params.ScheduleDate;
  var DisplayScheduleDate = this.props.route.params.DisplayScheduleDate;
  this.setState({
     ScheduleDate:ScheduleDate,
     DisplayScheduleDate:DisplayScheduleDate
   })
  
 }
 componentWillUnmount() {
  rol(this);
  //alert(vw)
}

  renderItem = ({ item,index }) => {
    return(
      <View style={{flex:1}}>
      <TouchableOpacity style={styles.buttonContainer}>
      <Text>Building 1</Text>
      </TouchableOpacity>
    </View>
  )
  }

 async ProcessBooking(){
      
    if(this.state.ShowScheduler==false){
      //Alert.alert("Warning","Please select facility.")
      this.setState({
        Alert_Visibility: true,
        Alert_Title: 'Alert',
        Alert_Message: 'Please select facility.',
        Alert_MessageMode: 'error',
      })
      return false
    }
      
    debugger
    var ids = "";
    var prevMinutes = 0;
    var isOneResource = true;
    var prevCourtID = 0;
    var count = 0;
   
    let filterList=[];
    let selectItem=[];


    console.log("Court  llllllll "+ JSON.stringify(this.state.CourtList))
    //return false
    for (let item  of  this.state.CourtList) {
      
      //alert(JSON.stringify(item.TimeSlotsList.filter(i=>i.IsSelected==true)))
     // return false;

    //const obj = {'ID': item.TimeSlotsList.find(data => data.IsSelected == true).ID}
    //alert(item.TimeSlotsList.filter(i=>i.IsSelected==true).length)
    if(item.TimeSlotsList.filter(i=>i.IsSelected==true)!=  null && item.TimeSlotsList.filter(i=>i.IsSelected==true).length>0)
    {
      //alert(item.TimeSlotsList.filter(i=>i.IsSelected==true).length)
     let selectItem =  item.TimeSlotsList.filter(i=>i.IsSelected==true);
     // alert(JSON.stringify(selectItem));
      selectItem.map(x => 
        
        
        filterList.push({"ID": x.ID})
        
        );
    //   for(let citem in selectItem)
    //   {

      

    //   //  let commonDays =  item.TimeSlotsList.filter(i=>i.IsSelected==true);
    //     alert(citem.ID)
    //     filterList.push({"ID": citem.ID});
    //   }
    }
  }
 // return false;


    // // // filterList.push(item.TimeSlotsList.filter(i=>i.IsSelected==true));
  console.log("ORG  ==="+JSON.stringify(filterList))
     
 

  

    // console.log("ADDed Data = "+ JSON.stringify(filterList))
 
   //var filterList = this.state.CourtList.filter(i=>i.IsSelectTime==true);
  // alert("teetrt t = "+JSON.stringify(filterList))
  if (filterList.length ==0) 
  {
    //Alert.alert('warning', "Make at least 1 time slot selection above.");
    this.setState({
      Alert_Visibility: true,
      Alert_Title: 'Alert',
      Alert_Message: 'Make at least 1 time slot selection above.',
      Alert_MessageMode: 'error',
    })
      return false;
  }

  //alert(filterList.length)

  // for(let item of filterList)

   filterList.map(item=>
    {
 
        ids = ids + "," + item.ID;
      
        debugger

       // alert("prevCourtID ==" +prevCourtID +"  count "+ count)
        if (parseFloat(item.ID.split('-')[1]) != prevCourtID && count != 0) {
           // Alert.alert('warning', "");
            this.setState({
              Alert_Visibility: true,
              Alert_Title: 'Warning',
              Alert_Message: 'Only a single, consecutive booking may be selected.',
              Alert_MessageMode: 'error',
              IsCancelBooking: false,
            })
            isOneResource = false;
            return false;
        }
         else if (count != 0 && parseFloat(item.ID.split('-')[1]) == prevCourtID && (parseFloat(item.ID.split('-')[2].split(':')[0]) * 60) + parseFloat(item.ID.split('-')[2].split(':')[1]) != parseFloat(parseFloat(prevMinutes == 30 ? -30 : prevMinutes) + 30)) {
        //  Alert.alert('warning', "Only a single, consecutive booking may be selected.");
          this.setState({
            Alert_Visibility: true,
            Alert_Title: 'Warning',
            Alert_Message: 'Only a single, consecutive booking may be selected.',
            Alert_MessageMode: 'error',
            IsCancelBooking: false,

          })
          isOneResource = false;
            return false;  
          }
          debugger
        prevCourtID = parseFloat(item.ID.split('-')[1]);
        prevMinutes = (parseFloat(item.ID.split('-')[2].split(':')[0]) *60) + parseFloat(item.ID.split('-')[2].split(':')[1]);
        count++;
    })
    debugger
    
    if (!isOneResource) {
        return false;
    }
    var selectedTime = ids;
   selectedTime = selectedTime.substring(1);//decodeURIComponent(selectedTime.substring(1));

    var start = selectedTime.split(',')[0].split('-')[2].substring(0, 5);
    var end = selectedTime.split(',')[selectedTime.split(',').length - 1].split('-')[2];

    if (end.split(':')[1] == 30) //45
    {
        end = (parseInt(end.split(':')[0]) + parseInt(1)) + ":00";
    } else {
        end = end.split(':')[0] + ":" + (parseInt(end.split(':')[1]) + parseInt(30));
    }
    var facilityID = selectedTime.split(',')[0].split('-')[4].substring(0, 5);
    var selectDate = this.state.ScheduleDate;// $("#txtDate").val();

    var timeDifference = (((parseInt(end.split(':')[0]) - parseInt(start.split(':')[0])) * 60) + (parseInt(end.split(':')[1]) - parseInt(start.split(':')[1]))) / 60;
    //before proceed to payment, confirm booking time and duration from customer 
    const sst = moment(start, ["HH.mm"]).format("hh:mm a");
    const set = moment(end, ["HH.mm"]).format("hh:mm a");
    const sdate =moment(this.state.SchedulerDate).format("dddd, MMMM Do YYYY");
    var confirmMessage = "You have selected:\n" + timeDifference + " Hour(s)\n" + sst+ " to " + set + "\n"+sdate+"\nPlease confirm to proceed.";
  
    var url = 'CustomerScheduler/checkBookingTimeLimit?facilityID=' + facilityID + '&selectedDate=' + selectDate + '&endTime=' + end;
    
   // alert(url)
    this.setState({isLoading:true})
    await CallPI("GET",url,"","",null).then(response => response.json()).then(responseJson => {
      this.setState({isLoading:false})
      console.log("Limimt time= " +JSON.stringify(responseJson))
      
     // responseJson.Data.isExceed
     // responseJson.Data.leftDays
      if(responseJson.Data.isExceed==true)
      {
        
        var  message  = "Bookings can only be made " +  responseJson.Data.leftDays + " Days," + responseJson.Data.leftHour+" Hours in advance."
        this.setState({
          Alert_Visibility: true,
          Alert_Title: 'Alert',
          Alert_Message: message,
          Alert_MessageMode: 'success',
          isTimeExceedMessage:true
         // cancelbookingID:ids
        })

      }
      else
      {
       
        this.setState({
         
          isTimeExceed:false
        })
      }
    

          }
        ).catch(error => {
         this.setState({isLoading:false})
          console.log(error)
        });

        if(this.state.isTimeExceed==false)
        {
this.setState({
  Alert_Visibility: true,
  Alert_Title: 'Alert',
  Alert_Message: confirmMessage,
  Alert_MessageMode: 'error',
  IsCancelBooking:true,
  cancelbookingID:ids
})
}
  }

  async BookingDetail(ids)
  {

   var url= 'CustomerScheduler/SchedulerPayment?date='+this.state.ScheduleDate;
  
   this.setState({isLoading:true})
   var addtoGrid = new Object();
 addtoGrid = {
   SelectedValues:ids

 }
 
 
   await CallPI("POST",url,addtoGrid,"",null).then(response => response.json()).then(responseJson => {
    console.log("dsad = = " +JSON.stringify(responseJson))
     this.setState({isLoading:false})
     this.props.navigation.navigate("SchedulerPaymentDetail", {
       response: responseJson
   })
       }
      ).catch(error => {
       this.setState({isLoading:false})
        console.log(error)
      });
  }
  CacncelSelection()
  {
 
   
    for (let item  of  this.state.FacilityList) {
         
         //alert(JSON.stringify(item.TimeSlotsList.filter(i=>i.IsSelected==true)))
   
       //const obj = {'ID': item.TimeSlotsList.find(data => data.IsSelected == true).ID}
       if(item.IsSelectBuilding == true)
       {
   
         item.TextColor =  '#ffffff'
         item.borderColor =  '#88aa31'
         item.Color =  '#88aa31'
         item.IsSelectBuilding = true
         this.GetAvailableCourtTimeSlots(item.value )
       }
       else 
       {
         item.TextColor =  '#88aa31'
         item.borderColor =  '#88aa31'
         item.Color =  '#ffffff'
         item.IsSelectBuilding = false
         this.setState({CourtList:[]})
          
       }
   
     }
   
 }
  render() {

    return (
      <View style={styles.Pagecontainer}>
             <AlertBox
  displayMode={this.state.Alert_MessageMode}
  MessageType={''}
  displayMsg={this.state.Alert_Message}
  Title={this.state.Alert_Title}
  visibility={this.state.Alert_Visibility}

  dismissAlert={this.dismissAlert}
  CancelAlert={this.CancelAlert}
/>
          <Loader loading={this.state.isLoading} />
          <ScrollView  persistentScrollbar={true} >  

      <View  
       style={{ flexDirection: 'row',justifyContent: 'center' }} >
{
  
  this.state.FacilityList.length>0?  
  <ScrollView horizontal persistentScrollbar={true} >  
<View style={{width:'100%', marginLeft:'auto',marginRight:'auto',flexDirection:'row'}}>

  {this.state.FacilityList.map((item,index)=>{
       return(
         <TouchableOpacity style={{ 
             flexDirection: 'row',
             justifyContent: 'center',
             alignItems: 'center',
             marginBottom: 0,
             borderRadius: 0,
            
             backgroundColor:   item.IsSelectBuilding ? '#597e15' : '#415717' ,

           
             //borderWidth:2,margin:0,
             width: this.state.FacilityList.length ==1? wp('100%'): this.state.FacilityList.length ==2? wp('100%')/2 : wp('100%')/3,
             paddingBottom:15,
             paddingTop:15,
             borderRightWidth: (this.state.FacilityList.length-1==index)? 0:1,
             borderRightColor:'white',
             flexShrink:1,
             flex:1,
            // padding:   wp('100%')/ 3  ,//(wp('100%')-wp('95%')),
             
           //  borderBottomColor: item.borderColor,
 //  borderBottomWidth :item.borderColor=='#ffffff'?4: null,
 
    }} onPress={() => {this.SelectBuidings(index,item.value)}}>

         <Text style={[styles.font_15,styles.fontFamily, {   textAlign:'center',color:'white' ,fontWeight:item.borderColor=='#ffffff'? 'bold':'normal'}]}>{item.label} </Text> 
         
         </TouchableOpacity>
        
      
       )
  })}
    {/* <View style={{ }}>
      <TouchableOpacity style={styles.buttonContainer}>
      <Text>Building 1</Text>
      </TouchableOpacity>
    </View>   */}
     </View>
  </ScrollView>  
       :
       null
       }
       
    
        
     </View>
    
       <View  style={{width:wp('100%'), marginTop:10 }}>
          <Text style={[{textAlign:'center'},styles.fontFamily,styles.font_12]}> {this.state.DisplayScheduleDate}</Text>
      </View>

      <View  style={{ alignItems:'center' ,marginTop:10 ,height:hp('63%'),   backgroundColor:'light grey',marginBottom:10}}> 



      
     <ScrollView  nestedScrollEnabled={true}  persistentScrollbar={true} contentContainerStyle={{margin:0,padding:0}}>
       <View style={{width:'97%', marginLeft:'auto',marginRight:'auto', borderRadius:7 ,borderWidth:2 , borderColor:'#c6c6c6'}}>
     <ScrollView horizontal persistentScrollbar={true} contentContainerStyle={{marginLeft:0, marginRight:0 ,backgroundColor:'white' }} >
     
     <DataTable style={{borderRadius:7}}>
      
         

 {

  this.state.ShowScheduler==true? 
this.createTableHeader()

: null
}  
  {
  this.state.ShowScheduler==true? 
this.createTable()
 
: null
}      

 
                 
          
</DataTable>
</ScrollView>
</View>
</ScrollView>  
      </View>

<View style={[styles.ListItemRow,{justifyContent:'center' }]}>

               <View style={{ width: '48%' }}>
                <TouchableOpacity style={[styles.buttonWithBorder]} onPress={() => this.CacncelSelection()}  >
                    <Text style={styles.buttun_Success}>CLEAR</Text>
                </TouchableOpacity>  
                </View>
               <View style={{ width: '48%'  }}>
                <TouchableOpacity style={[styles.buttonContainer,{marginLeft:5}]} onPress={() => this.ProcessBooking()}  >
                    <Text style={styles.buttunTextColo}>PROCEED </Text>
                </TouchableOpacity> 
                </View>
     </View>
     </ScrollView> 
     </View>
  
    );

  }

}
   
