import React, { Component, } from 'react';
import {
  Text,
  View,Image,
  TouchableOpacity,Modal,FlatList,TouchableHighlight,ScrollView,Button
,Dimensions
} from 'react-native';
import { CallPI } from '../../../Api/APICall'
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../../../Stylesheets/NAppSS';
import ModalStyle from '../../../Stylesheets/AppSS';
import Loader from '../../Loader'
import { Card, Badge, Icon, withBadge, BadgedIcon } from 'react-native-elements'
import { WebView} from 'react-native-webview';//'react-native-WebView'
import { SliderBox } from "react-native-image-slider-box";
import Header from '../Shared/header'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
//import Header from '../../Header'  test commit
 const {height,width}=  Dimensions.get('screen')
 
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CustomerOpenBalance: 0.00,
      CustomerHuseCredit: '$0.00',
      isLoading: false,
      modalVisible: false,
      isUpcommingBooking: false,
      isUpcommingEvents: false,
      AnnouncementList:  [],
      PaysharingCount: 0,
      images: [
        // "https://source.unsplash.com/1024x768/?nature",
        // "https://source.unsplash.com/1024x768/?water",
        // "https://source.unsplash.com/1024x768/?girl",
        // "https://source.unsplash.com/1024x768/?tree", // Network image
         require('../../../Images/hom-slider1.png'),          // Local image
         require('../../../Images/hom-slider2.png'),
         require('../../../Images/hom-slider3.png'),
         require('../../../Images/hom-slider4.png'),
         require('../../../Images/hom-slider5.png'),
         require('../../../Images/hom-slider6.png'),
      ],
      width:''
    }
  }
  _retrieveData = async () => {
    try {
      const LoginUserID = await AsyncStorage.getItem('LoginUserID');
    }
    catch (error) {

    }
  }
  _GoToFamilyMember = () => {
    this.props.navigation.navigate("FamilyMembersScreen")
  }
  _GoToAnnouncements = () => {

    this.props.navigation.navigate("Announcements")
  }
  _GoToCurreMemberships = () => {

    this.props.navigation.navigate("CurreMemberships")
  }
  _GoToClassManagement = () => {

    this.props.navigation.navigate("ClassManagement")
  }
  _GoToPendingRegistration = () => {

    this.props.navigation.navigate("RecentPendingRegistration")
  }
  _GoToApprovedRegistration = () => {

    this.props.navigation.navigate("RecentApprovedRegistration")
  }
  _GoToPastSchedulerBooking = () => {
    
    this.props.navigation.navigate("UpComingSchedulerBooking")
  }
  _GoToUpComingBooking = () => {

    this.props.navigation.navigate("PastSchedulerBooking")
  }
  _GoToOpenBalanceDetail = () => {

    this.props.navigation.navigate("OpenBalanceDetail")
  }
  _GoToProfile = () => {

    this.props.navigation.navigate("Profiled")
  }
  _GoToScheduler= async () =>
  {
    AsyncStorage.setItem('PaySharingCount', this.state.PaysharingCount.toString());
    this.props.navigation.navigate("CourtScheduler");
  }

  BindOpenBalanceandHouseCredit = async () => {
    const LoginUserID = await AsyncStorage.getItem('LoginUserID');

    this.setState({
      isLoading: true
    })
    var url = `/Dashboard/GetOpenBalanceandHouseCredit?openBalanceUserID=${LoginUserID}`;
 
    await CallPI('GET', url, null, null,  " " , null).then((response) => response.json())
   .then(responseJson => {
       // console.log(JSON.stringify(responseJson))
       //alert('on dash '+ responseJson["HouseCredit"])
        
       
        this.setState({
          CustomerHuseCredit: responseJson["HouseCredit"],
          CustomerOpenBalance: responseJson["OpenBalance"],
          isUpcommingBooking: responseJson.isUpcommingBooking,
          isUpcommingEvents: responseJson.isUpcommingEvents,
          PaysharingCount: responseJson.CustomerPaySharingCount,
        })
       // AsyncStorage.setItem('PaySharingCount', this.state.PaysharingCount);
      
        if(responseJson.IsReadAnnouncements ==false && responseJson.AnnouncementList.length > 0){
          this.setState({
            AnnouncementList: responseJson.AnnouncementList ,
            modalVisible:true,

          })

        }

        this.setState({
          isLoading: false
        })
      }).catch(error => {
        this.setState({
          isLoading: false
        })
        

      });
     await AsyncStorage.setItem('CustomerHouseCredit', this.state.CustomerHuseCredit);

      
  }
  HideModel = async (visible) => {
    this.setState({
      modalVisible:visible
    });
    const LoginUserID = await AsyncStorage.getItem('LoginUserID');
    this.setState({
      isLoading: true
  })
    var url = 'Dashboard/UpdateAnnouncementReadStatus?isUpdateStatus=true';
    await CallPI('POST', url, null, LoginUserID,  " ",null)
    .then((response) => response.json())
    .then(responseJson => {
        console.log(JSON.stringify(responseJson))
        this.setState({
            isLoading: false
        })
    }).catch(error => {
        this.setState({
            isLoading: false
        })
    });
  }
  componentWillUnmount() {
    rol(this);
  }
 async componentDidMount() {
    lor(this);
    // var IsProfileCompleted= await  AsyncStorage.getItem('IsPersonProfileCompleted');
    // alert('IsProfileCompleted    '+IsProfileCompleted)
    // if(IsProfileCompleted != true)
    // {
    //   this.props.navigation.reset({ routes: [{ name: 'Profiled' }]})
    // }
    this.BindOpenBalanceandHouseCredit()
  }
 onLayout = e => {
    this.setState({
      width: e.nativeEvent.layout.width
    });
  };
  render() {
    return (
  <View> 
   <View style={{height: hp('100%'),width:'100%'}} onLayout={this.onLayout}> 
  <View style={{height: hp('20%')}}> 
  <SliderBox
  images={this.state.images}
  parentWidth={this.state.width}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
  dotColor="white"
  sliderBoxHeight={hp('20%')}
  inactiveDotColor="white"
  paginationBoxVerticalPadding={20}
  autoplay
  circleLoop
  //inactiveDotColor="white"
  resizeMethod={'resize'}
  resizeMode={'stretch'}
  paginationBoxStyle={{
    position: "absolute",
    bottom: 0,
    padding: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10,width:'100%'
  }}
  dotStyle={{
    width: 10,
    height: 10,
   
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "rgba(128, 128, 128, 0.92)"
  }}
  
  imageLoadingColor='transparent'

  
/>  
</View>
  <ScrollView>
   
<View style={{  margin:10, paddingBottom:hp('10%')}}>

  
  <View style={styles.MenuItemBox}>
          <TouchableOpacity style={[{padding:hp('1%'),    flex: 1,alignItems: 'center',justifyContent: 'center',}  ]} onPress={() => this._GoToOpenBalanceDetail()}>
            <Text style={{ color: 'red', fontSize:RFValue(25) ,fontWeight:'bold',color:'white'}}>{this.state.CustomerOpenBalance}</Text>
            <Text style={{ color: 'red', fontSize: RFValue(10) ,color:'white'}}>Pay Open Balance</Text>
          </TouchableOpacity>
    </View>
  <View style={styles.MenuItemBox}>

  <TouchableOpacity onPress={() => this._GoToAnnouncements()}>

      <View style={ styles.MenuItemInnerBox}>
        <Image style={styles.MenuItemBoxIcon}  resizeMode="contain"
               source={require('../../../Images/Icon/dashboard-icons/Announcement.png')}/>
           <Text  style={[styles.MenuItemFontSize,styles.MenuItemColor,styles.MenuItemText]}>
            Announcements
          </Text>
      </View>


   </TouchableOpacity>

  </View>
 

  <View style={styles.MenuItemBox}>

    <TouchableOpacity onPress={() =>this._GoToScheduler()}>

    <View style={{justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
    <View style={ styles.MenuItemInnerBox}>
      <Image style={styles.MenuItemBoxIcon}  resizeMode="contain" source={require('../../../Images/Icon/dashboard-icons/Court-Scheduler.png')}/>
      <Text  style={[styles.MenuItemFontSize,styles.MenuItemColor,styles.MenuItemText]}>New Booking </Text>
    </View>
    {
  this.state.PaysharingCount>0?

    <View style={[{marginRight:10 
    ,justifyContent:'center',alignItems:'center',  borderRadius:100}]}>
       <Badge value={this.state.PaysharingCount} status="error"  />
      {/* {/ <Text style={[styles.PaySharingCount]}>{this.state.PaysharingCount}2</Text> /} */}
    </View>
     : null
  }
    </View>
 </TouchableOpacity>

</View>

<View style={styles.MenuItemBox}>

<TouchableOpacity   onPress={() => { this.props.navigation.navigate('Registration') }}>
    <View style={ styles.MenuItemInnerBox}>
      <Image style={styles.MenuItemBoxIcon}  resizeMode="contain"
             source={require('../../../Images/Icon/dashboard-icons/Registration.png')}/>
         <Text  style={[styles.MenuItemFontSize,styles.MenuItemColor,styles.MenuItemText]}>
            Registration
        </Text>
    </View>
 </TouchableOpacity>
</View>
<View style={styles.MenuItemBox}>
<TouchableOpacity onPress={() => { this.props.navigation.navigate('ClassManager') }}>
    <View style={ styles.MenuItemInnerBox}>
      <Image style={styles.MenuItemBoxIcon}  resizeMode="contain"
             source={require('../../../Images/Icon/dashboard-icons/Class-Manager.png')}/>
         <Text  style={[styles.MenuItemFontSize,styles.MenuItemColor,styles.MenuItemText]}>
         Class Manager
        </Text>
    </View>
 </TouchableOpacity>
</View>
<View style={styles.MenuItemBox}>

<TouchableOpacity  onPress={() => this._GoToPendingRegistration()}>

    <View style={ styles.MenuItemInnerBox}>
      <Image style={styles.MenuItemBoxIcon}  resizeMode="contain"
             source={require('../../../Images/Icon/dashboard-icons/Pending-Registrations.png')}/>
         <Text  style={[styles.MenuItemFontSize,styles.MenuItemColor,styles.MenuItemText]}>
           Pending Registrations
        </Text>
    </View>


 </TouchableOpacity>

</View>

<View style={styles.MenuItemBox}>

<TouchableOpacity  onPress={() => this._GoToApprovedRegistration()}>

    <View style={ styles.MenuItemInnerBox}>
      <Image style={styles.MenuItemBoxIcon}  resizeMode="contain"
             source={require('../../../Images/Icon/dashboard-icons/Approved-Registrations.png')}/>
         <Text  style={[styles.MenuItemFontSize,styles.MenuItemColor,styles.MenuItemText]}>
         Approved Registrations
        </Text>
    </View>


 </TouchableOpacity>

</View>
 
<View style={styles.MenuItemBox}>

 
<TouchableOpacity  onPress={() => this._GoToPastSchedulerBooking()}>

    <View style={ styles.MenuItemInnerBox}>
      <Image style={styles.MenuItemBoxIcon}  resizeMode="contain"
             source={require('../../../Images/Icon/dashboard-icons/Scheduler-Bookings.png')}/>
         <Text  style={[styles.MenuItemFontSize,styles.MenuItemColor,styles.MenuItemText]}>
         View Bookings
        </Text>
    </View>


 </TouchableOpacity>

</View>
<View style={styles.MenuItemBox}>

<TouchableOpacity  onPress={() => this._GoToUpComingBooking()}>

    <View style={ styles.MenuItemInnerBox}>
      <Image style={styles.MenuItemBoxIcon}  resizeMode="contain"
             source={require('../../../Images/Icon/dashboard-icons/Upcoming-Events.png')}/>
         <Text  style={[styles.MenuItemFontSize,styles.MenuItemColor,styles.MenuItemText]}>
         Upcoming Events
        </Text>
    </View>


 </TouchableOpacity>

</View>

</View>
  </ScrollView> 

</View>  
</View>  
 

    )
  }
}


// export default  function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         title="Go to notifications"
//       />
//     </View>
//   );
// }