import React, { Component, useState, useEffect } from 'react';
import {  SafeAreaView, StyleSheet, ScrollView, TouchableOpacity,View, Text, StatusBar, Image, AppRegistry,BackHandler} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Button } from 'react-native-elements';
import { NavigationContainer, NavigationAction ,useRoute} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CustomStatusBar from '../../App/component/Views/Shared/StatusBar'
import SafeAreaProvider from 'react-native-safe-area-context'
import RightMenu from '../../App/component/Views/Shared/RightMenu'
import HeaderLeft from '../../App/component/Views/Shared/HeaderLeftside'
import appStyle from '../../App/Stylesheets/NAppSS'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

import { Provider } from 'react-redux';
import store from '../../App/redux/store'
// import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginView from '../../App/component/Views/Login/Login'
 import AsyncStorage from '@react-native-async-storage/async-storage'
// import Variables from  '../../App/ApplicaionVariables'
import SignUpView from '../../App/component/Views/Signup';
import SideMenu from '../../App/Navigation/SideMenu';
import SignupTermsConditions from '../../App/component/Views/SignupTermsConditions';
import ForgotPassword from '../../App/component/Views/Login/ForgotPassword';
import ResetPassword from '../../App/component/Views/Login/ResetPassword';
import ForgotUsername from '../../App/component/Views/Login/ForgotUsername';
import ForgotusernameEmail from '../../App/component/Views/Login/ForgotusernameEmail';


  import Dashboard from '../../App/component/Views/Dashboard/Dashboard';
import DashboardFamilyMembers from '../../App/component/Views/Dashboard/FamilyMembers';
import Announcements from '../../App/component/Views/Dashboard/AnnouncementsList';
import CurrentMemberships from '../../App/component/Views/Dashboard/CurrentMembership';
import ClassManagement from '../../App/component/Views/Dashboard/ClassManagement';
import RecentApprovedRegistration from '../../App/component/Views/Dashboard/RecentApprovedRegistration';
import RecentPendingRegistration from '../../App/component/Views/Dashboard/RecentPendingRegistration';

import Registration from '../../App/component/Views/Dashboard/Registration';
import CourtScheduler from '../../App/component/Views/Dashboard/CourtScheduler';
import ClassManagers from '../../App/component/Views/Dashboard/ClassManager';

import PastSchedulerBooking from '../../App/component/Views/Dashboard/PastSchedulerBooking';
import Profile from '../../App/component/Views/Dashboard/Profile';
import UpComingSchedulerBooking from '../../App/component/Views/Dashboard/UpComingSchedulerBooking';
import OpenBalanceDetail from '../../App/component/Views/Dashboard/OpenBalanceDetail';
import Header from '../../App/component/Views/Shared/header';

import CurrentFamilyMembers from '../../App/component/Views/Customers/FamilyMembers/CurrentFamilyMemberList';
import AddFamilyMember from '../../App/component/Views/Customers/FamilyMembers/AddFamilyMembers'

import Friends from '../../App/component/Views/Dashboard/Friends'
import FriendList from '../../App/component/Views/Friends/FreindsList'
import InviteFriend from '../../App/component/Views/Friends/FriendInvitaion'
import InviteFriendList from '../../App/component/Views/Friends/FriendInvitaionList'
import FriendHistoryList from '../../App/component/Views/Friends/FriendHistoryList'
import FriendHistoryDetail from '../../App/component/Views/Friends/FriendHistoryDetail'

import TransactionHistory from '../../App/component/Views/TransactionHistory/TransactionHistory'
import TransactionHistoryList from '../../App/component/Views/TransactionHistory/TransacrionHistoryList'
import TransactionHistoryDetail from '../../App/component/Views/TransactionHistory/TransactionHistoryDetail'
import CreditCardList from '../../App/component/Views/Customers/CreditCard/CreditCardList'
import AddEditCreditCard from '../../App/component/Views/Customers/CreditCard/AddEditCreditCard'
import MembershipRegistration from '../../App/component/Views/Registration/Membership/MemberShipRegistration'
// Clinic Registration 

import ClinicRegistration from '../component/Views/Registration/Activity/ClinicRegisteration/ClinicRegistration'
import ClinicRegistrationGrid from '../component/Views/Registration/Activity/ClinicRegisteration/ClinicRegistrationGrid'
import ClinicRegistrationTerms from '../component/Views/Registration/Activity/ClinicRegisteration/ClininicRegistrationTerms'


// camp Registration 

import CampRegistration from '../component/Views/Registration/Activity/CampRegistration/CampRegistration'
import CampRegistrationGrid from '../component/Views/Registration/Activity/CampRegistration/CampRegistrationGrid'
//import ClinicRegistrationGrid from '../component/Views/Registration/Activity/ClinicRegisteration/ClinicRegistrationGrid'
import CampRegistrationTerms from '../component/Views/Registration/Activity/CampRegistration/CampRegistrationTerms'
// league Registration 
import LeagueRegistration from '../component/Views/Registration/Activity/LeagueRegistration/LeagueRegistration'
import LeagueRegistrationGrid from '../component/Views/Registration/Activity/LeagueRegistration/LeagueRegistrationGrid'
import LeagueRegistrationTerms from '../component/Views/Registration/Activity/LeagueRegistration/LeagueRegistrationTerms'
// league Registration 
import OtherRegistration from '../component/Views/Registration/Activity/OtherRegistration/OtherRegistration'
import OtherRegistrationGrid from '../component/Views/Registration/Activity/OtherRegistration/OtherRegistrationGrid'
import OtherRegistrationTerms from '../component/Views/Registration/Activity/OtherRegistration/OtherRegistrationTerms'
import RegistrationFaqs from '../component/Views/Registration/Activity/Faqs'
import Test from '../../App/component/Test'
// Class Manager 
import ReportAbsence from '../component/Views/Registration/ClassManager/ReportAbsence/ReportAbsence'
import AbsenceMessage from '../component/Views/Registration/ClassManager/ReportAbsence/AbsenceMessage'
import RequestMakeup from '../component/Views/Registration/ClassManager/RequestMakeUp/RequestMakeup'
import DropInClass from '../component/Views/Registration/ClassManager/DropInClass/DropInClass'
import ReportAbsenceHistory from '../component/Views/Registration/ClassManager/ReportAbsenceHistory/ReportAbsenceHistory'
import ReportAbsenceHistoryList from '../component/Views/Registration/ClassManager/ReportAbsenceHistory/ReportAbsenceHistoryList'
import MakeupDropInHistory from '../component/Views/Registration/ClassManager/MakeupDropInHistory/MakeupDropInHistory'
import MakeupDropInHistoryList from '../component/Views/Registration/ClassManager/MakeupDropInHistory/MakeupDropInHistoryList'
import ClassMangmentFaqs from '../component/Views/Registration/ClassManager/Faqs'

// // Scheduler

import Scheduler from '../../App/component/Views/Scheduler/CustomerScheduler/index';
import SchedulerFacilityCourts from '../../App/component/Views/Scheduler/CustomerScheduler/SchedulerFacilityCourts';
import SchedulerTimeSlots from '../../App/component/Views/Scheduler/CustomerScheduler/SchedulerTimeSlots';
import SchedulerPaymentDetail from '../../App/component/Views/Scheduler/CustomerScheduler/SchedulerPaymentDetail';

import SchedulerReservation from '../../App/component/Views/Scheduler/MyReservation/MyReservation'
import ManageContract from '../../App/component/Views/Scheduler/ManageContract/ManageContract'
import ManageContractList from '../../App/component/Views/Scheduler/ManageContract/ManageContractList'
import ManageContractDetailList from '../../App/component/Views/Scheduler/ManageContract/ManageContractDetailList'


import SchedulerReservationDetail from '../../App/component/Views/Scheduler/MyReservation/MyReservationDetail'
import CustomerPaySharing from '../../App/component/Views/Scheduler/CustomerPaySharing/CustomerPaySharing'
import CustomerPaymentSharing from '../../App/component/Views/Payment/CustomerPaymentSharing'
import MyCart from '../../App/component/Views/Cart/Cart'
import Payment from '../../App/component/Views/Payment/Payment'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";




import { AuthContext } from '../component/Views/Shared/Context'

var IsCustimerProfileCompleted =true;

const headerStyleOption={
  headerStyle: {
    backgroundColor: '#88aa31',
      height:hp('10%'),
  },
  headerBackTitleVisible: false,
  headerTintColor: '#fff',
  //headerTitle: "FAQ's",
  headerTitleStyle:{
    fontSize: RFValue(15),
        fontWeight: 'bold',
        color: 'white',
       
       padding:0,
        textAlign: 'center',
        flexWrap: 'wrap',
  }
}

const customHeaderTitleContainerStyle={
  
  headerTitleContainerStyle:{
  //backgroundColor:'red',
 
  //position:'absolute',
  alignItems:'center',
  flexDirection:'row',
  justifyContent:'center',
 
  opacity:1,
  //width:'100%'

},

headerStyle:  
 {
  backgroundColor: '#88aa31',
  headerTitleAlign:'center',
   height:100,

  flexDirection:'row',
  //justifyContent:'center',
  alignItems:'center',
  width:'100%',
   
},
screenOptions:{
  headerStatusBarHeight:0,
  }

}
const Drawer = createDrawerNavigator();




const Stack = createNativeStackNavigator();
const DashBooardStack = createNativeStackNavigator();
const CurrentMemberShitStack = createNativeStackNavigator();
const PrfileStack = createNativeStackNavigator();
const FriendStack = createNativeStackNavigator();
const InviteFriendStack = createNativeStackNavigator();
const FriendHistoryStack = createNativeStackNavigator();
const TransactionHistoryStack = createNativeStackNavigator();
const MembershiRegistrationStack = createNativeStackNavigator();
const ClinicRegistrationStack = createNativeStackNavigator();
const CampRegistrationStack = createNativeStackNavigator();

const LeagueRegistrationStack = createNativeStackNavigator();
const OtherRegistrationStack = createNativeStackNavigator();

const CartStack = createNativeStackNavigator();
const PaymentStack = createNativeStackNavigator();
const RegistrationStack = createNativeStackNavigator();
const ClassManagerStack = createNativeStackNavigator();
const SchedulerStack = createNativeStackNavigator();
const OpenBalanceDetailStack = createNativeStackNavigator();
// class Managers

const ReportAbsenceStack = createNativeStackNavigator();
const RequestMakeupStack = createNativeStackNavigator();
const DropInClassStack = createNativeStackNavigator();
const ReportAbsenceHistoryStack = createNativeStackNavigator();
const MakeupDropInHistoryStack = createNativeStackNavigator();
const CustomerProcessPaymentSharingStack = createNativeStackNavigator();
// Scheduler Screen
const ManageContractStack = createNativeStackNavigator();
const ManageContactListStack = createNativeStackNavigator();





const PrfileStackScreen = ({ navigation }) => (
  <PrfileStack.Navigator>

    <PrfileStack.Screen name="Profile" component={Profile}
      options={{
         header: ()=> (<Header navigation={navigation} title={"Profile"} />),
         //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Profile"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Profile"} />),
        ...customHeaderTitleContainerStyle
      }} />
    <PrfileStack.Screen name="CurrentFamilyMembers" component={CurrentFamilyMembers}
      options={{

         header: ()=> (<Header navigation={navigation} title={"Family Member"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Family Member"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Family Member"} />),
        ...customHeaderTitleContainerStyle
      }} />
    <PrfileStack.Screen name="AddFamilyMember" component={AddFamilyMember}
      options={{
       // header: ()=> (<Header navigation={navigation} title={"Add New Family Member"}  isBack={true} />),
        //   header: ()=> (<Header navigation={navigation} title={"Activity(s) Selected"}  isBack={true} />),
         headerTitle: 'Add New Family Member',
         ...headerStyleOption
      }} />
  </PrfileStack.Navigator>


)
const CartStackScreen = ({ navigation }) => (
  <CartStack.Navigator>

    <CartStack.Screen name="MyCart" component={MyCart}
      options={{

         header: ()=> (<Header navigation={navigation} title={"My Cart"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"My Cart"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"My Cart"} />),
        ...customHeaderTitleContainerStyle
      }} />
  </CartStack.Navigator>


)
const PaymentStackScreen = ({ navigation }) => (
  <PaymentStack.Navigator>
    <PaymentStack.Screen name="Payment" component={Payment}
      options={{
         header: ()=> (<Header navigation={navigation} title={"Payment"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Payment"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Payment"} />),
        ...customHeaderTitleContainerStyle
      }} />
  </PaymentStack.Navigator>


)
const RegistrationScreen = ({ navigation }) => (
  <RegistrationStack.Navigator >

    <RegistrationStack.Screen name="Registration" component={Registration}
      options={{

         header: ()=> (<Header navigation={navigation} title={"Registration"}  isBack={true} routeName={"DashboardList"}/>),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Registration"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Registration"} />),
     //   ...customHeaderTitleContainerStyle
      }} />

    <RegistrationStack.Screen name="RegistrationFaqs" component={RegistrationFaqs}

      options={{ 
        //header: ()=> (<Header navigation={navigation} title={"Registration Faq's"}  isBack={true} />),

           headerTitle: "Registration Faq's" ,
          ... headerStyleOption
      }}
    />
  </RegistrationStack.Navigator>


)
const ClassManagerScreen = ({ navigation }) => (
  <ClassManagerStack.Navigator>

    <ClassManagerStack.Screen name="ClassManager" component={ClassManagers}
      options={{
         header: ()=> (<Header navigation={navigation} title={"Class Manager"}    isBack={true} routeName={"DashboardList"}/>),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Class Manager"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Class Manager"} />),
        ...customHeaderTitleContainerStyle

      }} />

    <ClassManagerStack.Screen name="ClassMangmentFaqs" component={ClassMangmentFaqs}

      options={{
       // header: ()=> (<Header navigation={navigation} title={"Class Manager Faq's"}  isBack={true} />),

        //   header: ()=> (<Header navigation={navigation} title={"Activity(s) Selected"}  isBack={true} />), 
        headerTitle: "Class Manager Faq's" ,...headerStyleOption
        }}
    />


  </ClassManagerStack.Navigator>
)

const ReportAbsenceScreen = ({ navigation }) =>
(
  <ReportAbsenceStack.Navigator>
    <ReportAbsenceStack.Screen name="ReportAbsence" component={ReportAbsence}
      options={{
         header: ()=> (<Header navigation={navigation} title={"Report Absence"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Report Absence"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Report Absence"} />),
        ...customHeaderTitleContainerStyle
      }} />

    <ReportAbsenceStack.Screen name="AbsenceMessage" component={AbsenceMessage}
      options={{
       // header: ()=> (<Header navigation={navigation} title={"Report Activity Absence"}  isBack={true} />),

       //   header: ()=> (<Header navigation={navigation} title={"Activity(s) Selected"}  isBack={true} />),
        headerTitle: "Report Activity Absence",...headerStyleOption

      }}
    />
  </ReportAbsenceStack.Navigator>
)


const RequestMakeupScreen = ({ navigation }) =>
(
  <RequestMakeupStack.Navigator>
    <RequestMakeupStack.Screen name="RequestMakeup" component={RequestMakeup}
      options={{
         header: ()=> (<Header navigation={navigation} title={"Request Makeup"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Request Makeup"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Request Makeup"} />),
        ...customHeaderTitleContainerStyle
      }} />
  </RequestMakeupStack.Navigator>
)

const DropInClassScreen = ({ navigation }) =>
(
  <DropInClassStack.Navigator>


    <RequestMakeupStack.Screen name="DropInClass" component={DropInClass}
      options={{
         header: ()=> (<Header navigation={navigation} title={"Drop In Class"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Drop In Class"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Drop In Class"} />),
        ...customHeaderTitleContainerStyle
      }} />
  </DropInClassStack.Navigator>
)

const ReportAbsenceHistoryScreen = ({ navigation }) =>
(
  <ReportAbsenceHistoryStack.Navigator>

    <ReportAbsenceHistoryStack.Screen name="ReportAbsenceHistory" component={ReportAbsenceHistory}
      options={{
         header: ()=> (<Header navigation={navigation} title={"Report Absence History"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Report Absence History"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Report Absence History"} />),
        ...customHeaderTitleContainerStyle
      }} />

    <ReportAbsenceHistoryStack.Screen name="ReportAbsenceHistoryList" component={ReportAbsenceHistoryList}
      options={{ 
        //header: ()=> (<Header navigation={navigation} title={"Report Absence History List"}  isBack={true} />),

     //     header: ()=> (<Header navigation={navigation} title={"Activity(s) Selected"}  isBack={true} />),
      headerTitle: 'Report Absence History List' ,...headerStyleOption
      }}
    />

  </ReportAbsenceHistoryStack.Navigator>
)


const MakeupDropInHistoryScreen = ({ navigation }) =>
(
  <MakeupDropInHistoryStack.Navigator>

    <MakeupDropInHistoryStack.Screen name="MakeupDropInHistory" component={MakeupDropInHistory}
      options={{
         header: ()=> (<Header navigation={navigation} title={"Make-Up/Drop In History"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Make-Up/Drop In History"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Make-Up/Drop In History"} />),
        ...customHeaderTitleContainerStyle
      }} />

    <MakeupDropInHistoryStack.Screen name="MakeupDropInHistoryList" component={MakeupDropInHistoryList}
      options={{
        //header: ()=> (<Header navigation={navigation} title={"Make-Up/Drop In History List"}  isBack={true} />),

         //  header: ()=> (<Header navigation={navigation} title={"Activity(s) Selected"}  isBack={true} />), 
         headerTitle: 'Make-Up/Drop In History List' ,...headerStyleOption
        }}
    />

  </MakeupDropInHistoryStack.Navigator>
)


const MembershipRegistrationScreen = ({ navigation }) => (

  <MembershiRegistrationStack.Navigator>
    <MembershiRegistrationStack.Screen name="MembershipRegistration" component={MembershipRegistration}
      options={{
         header: ()=> (<Header navigation={navigation} title={"Membership Registration"}  isBack={true} routeName={"Registration"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Membership Registration"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Membership Registration"} />),
      
        ...customHeaderTitleContainerStyle,


      }} />

  </MembershiRegistrationStack.Navigator>
)

const ClinicRegistrationScreen = ({ navigation }) => (

  <ClinicRegistrationStack.Navigator>
    <ClinicRegistrationStack.Screen name="ClinicRegistration" component={ClinicRegistration}
      options={{
         header: ()=> (<Header navigation={navigation} title={"Clinic Registration"} isBack={true} routeName={"Registration"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Clinic Registration"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Clinic Registration"} />),
        ...customHeaderTitleContainerStyle

      }} />

    <DashBooardStack.Screen name="ClinicRegistrationGrid" component={ClinicRegistrationGrid}

      options={{ 
      // header: ()=> (<Header navigation={navigation} title={"Activity(s) Selected"}  isBack={true} />),

      //    header: ()=> (<Header navigation={navigation} title={"Activity(s) Selected"}  isBack={true} />), 
     headerTitle: 'Activity(s) Selected',...headerStyleOption
       }}
    />


    <ClinicRegistrationStack.Screen name="ClinicRegistrationTerms" component={ClinicRegistrationTerms}

      options={{ // header: ()=> (<Header navigation={navigation} title={"Registration Terms'"}  isBack={true} />),
       headerTitle: 'Registration Terms', ...headerStyleOption
       }
      }
    />

  </ClinicRegistrationStack.Navigator>
)


const CampRegistrationScreen = ({ navigation }) => (

  <CampRegistrationStack.Navigator>
    <CampRegistrationStack.Screen name="CampRegistration" component={CampRegistration}
      options={{
         header: ()=> (<Header navigation={navigation} title={"Camp Registration"} isBack={true} routeName={"Registration"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Camp Registration"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Camp Registration"} />),
        ...customHeaderTitleContainerStyle

      }} />
    <DashBooardStack.Screen name="CampRegistrationGrid" component={CampRegistrationGrid}

      options={{   //header: ()=> (<Header navigation={navigation} title={"Activity(s) Selected"}  isBack={true} />),
       headerTitle: 'Activity(s) Selected' ,...headerStyleOption
      }}
    />
    <DashBooardStack.Screen name="CampRegistrationTerms" component={CampRegistrationTerms}

      options={{   //header: ()=> (<Header navigation={navigation} title={"Camp Registration Terms"}  isBack={true} />), 
      headerTitle: 'Camp Registration Terms',...headerStyleOption
     }}
    />




  </CampRegistrationStack.Navigator>
)
const LeagueRegistrationScreen = ({ navigation }) => (

  <LeagueRegistrationStack.Navigator>
    <LeagueRegistrationStack.Screen name="LeagueRegistration" component={LeagueRegistration}
      options={{
         header: ()=> (<Header navigation={navigation} title={"League Registration"} isBack={true} routeName={"Registration"}  />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"League Registration"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"League Registration"} />),
        ...customHeaderTitleContainerStyle

      }} />

    <DashBooardStack.Screen name="LeagueRegistrationGrid" component={LeagueRegistrationGrid}
      options={{  // header: ()=> (<Header navigation={navigation} title={"Activity(s) Selected"}  isBack={true} />), 
      headerTitle: 'Activity(s) Selected' ,...headerStyleOption
    }}
    />


    <ClinicRegistrationStack.Screen name="LeagueRegistrationTerms" component={LeagueRegistrationTerms}
      options={{ //  header: ()=> (<Header navigation={navigation} title={"Activity(s) Selected"}  isBack={true} />), 
      headerTitle: 'Registration Terms',...headerStyleOption
     }}
    />

  </LeagueRegistrationStack.Navigator>
)
const OtherRegistrationScreen = ({ navigation }) => (

  <OtherRegistrationStack.Navigator>
    <OtherRegistrationStack.Screen name="OtherRegistration" component={OtherRegistration}
      options={{
         header: ()=> (<Header navigation={navigation} title={"Other Registration"} isBack={true} routeName={"Registration"}  />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Other Registration"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Other Registration"} />),
        ...customHeaderTitleContainerStyle

      }} />

    <OtherRegistrationStack.Screen name="OtherRegistrationGrid" component={OtherRegistrationGrid}

      options={{  // header: ()=> (<Header navigation={navigation} title={"Activity(s) Selected"}  isBack={true} />),
       headerTitle: 'Activity(s) Selected' ,...headerStyleOption
      }}
    />


    <OtherRegistrationStack.Screen name="OtherRegistrationTerms" component={OtherRegistrationTerms}

      options={{ //  header: ()=> (<Header navigation={navigation} title={"Registration Terms"}  isBack={true} />), 
      headerTitle: 'Registration Terms' ,...headerStyleOption
    }}
    />
  </OtherRegistrationStack.Navigator>
)
const DashboardScreens = ({ navigation }) => (
  <DashBooardStack.Navigator style={styles.headerText}>


    <DashBooardStack.Screen name="Dashboard" component={Dashboard}

      options={{
        
      //   header: ()=> (<Header navigation={navigation} title={"Dashboard"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Dashboard"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Dashboard"} />),
        ...customHeaderTitleContainerStyle,
    
    ///eaderStyle:{height:100}

    header: () => (<Header navigation={navigation} title={"Dashboard"} />),
     



      }} />



    <DashBooardStack.Screen name="Announcements" component={Announcements}

      // options={{ 
      //  //   header: ()=> (<Header navigation={navigation} title={"Activity(s) Selected"}  isBack={true} />), headerTitle: 'Announcements',
      //   header: () => (<Header navigation={navigation} title={"Announcements"} />),
      //  }}
       options={{  // header: ()=> (<Header navigation={navigation} title={"Class Management"}  isBack={true} />),
        headerTitle: 'Announcements' ,...headerStyleOption
       }}
    />


    <DashBooardStack.Screen name="ClassManagement" component={ClassManagement}

      options={{  // header: ()=> (<Header navigation={navigation} title={"Class Management"}  isBack={true} />),
       headerTitle: 'Class Management' ,...headerStyleOption
      }}
    />
    <DashBooardStack.Screen name="RecentApprovedRegistration" component={RecentApprovedRegistration}
      options={{

         // header: ()=> (<Header navigation={navigation} title={"Recent Approved Registrations"}  isBack={true} />),
        headerTitle: 'Recent Approved Registrations',...headerStyleOption
      }} />


    <DashBooardStack.Screen name="RecentPendingRegistration" component={RecentPendingRegistration}
      options={{
        //  header: ()=> (<Header navigation={navigation} title={"Recent Pending Registrations"}  isBack={true} />),
        headerTitle: 'Recent Pending Registrations',...headerStyleOption
      }}
    />




    <DashBooardStack.Screen name="PastSchedulerBooking" component={PastSchedulerBooking}
      options={{
       //   header: ()=> (<Header navigation={navigation} title={"Upcoming Events"}  isBack={true} />), 
        headerTitle: 'Upcoming Events',...headerStyleOption
      }} />
    <DashBooardStack.Screen name="UpComingSchedulerBooking" component={UpComingSchedulerBooking}
      options={{
         // header: ()=> (<Header navigation={navigation} title={"Scheduler Booking(s)"}  isBack={true} />), 
          headerTitle: 'Scheduler Booking(s)',...headerStyleOption
      }} />

 




  </DashBooardStack.Navigator>
)
const CurrentMembershipScreen = ({ navigation }) => (
  <CurrentMemberShitStack.Navigator>
    <CurrentMemberShitStack.Screen name="CurrentMemberships" component={CurrentMemberships}
      options={{

         header: ()=> (<Header navigation={navigation} title={"Current Memberships"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Current Memberships"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Current Memberships"} />),
        ...customHeaderTitleContainerStyle
      }}

    />
  </CurrentMemberShitStack.Navigator>
)
const FamilyMemberListScreen = ({ navigation }) => (
  <DashBooardStack.Navigator>
    <DashBooardStack.Screen name="FamilyMembersScreen" component={DashboardFamilyMembers}
      options={{
         header: ()=> (<Header navigation={navigation} title={"Family Members"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Family Members"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Family Members"} />),
        ...customHeaderTitleContainerStyle
      }} />
  </DashBooardStack.Navigator>
)
const CreditCardScreen = ({ navigation }) => (
  <DashBooardStack.Navigator>
    <DashBooardStack.Screen name="CreditCardList" component={CreditCardList}
      options={{

         header: ()=> (<Header navigation={navigation} title={"Manage Card(s)"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Manage Card(s)"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Manage Card(s)"} />),
        ...customHeaderTitleContainerStyle
      }} />
    <DashBooardStack.Screen name="AddEditCreditCard" component={AddEditCreditCard}
      options={{
        //  header: ()=> (<Header navigation={navigation} title={"Add/Edit Credit Card"}  isBack={true} />),
         headerTitle: 'Add/Edit Credit Card',...headerStyleOption
      }} />
  </DashBooardStack.Navigator>
)
const FriendMenu = ({ navigation }) => (

  <FriendStack.Navigator>



    <FriendStack.Screen name="Friends" component={Friends}

      options={{

         header: ()=> (<Header navigation={navigation} title={"Friends"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Friends"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Friends"} />),

        ...customHeaderTitleContainerStyle
      }} />



    <FriendStack.Screen name="FriendList" component={FriendList}
      options={{

        //  header: ()=> (<Header navigation={navigation} title={"My Friends List"}  isBack={true} />),
       headerTitle: 'My Friends List',...headerStyleOption
      }} />


  </FriendStack.Navigator>
)
const InviteFriendScreen = ({ navigation }) => (

  <InviteFriendStack.Navigator>
    <InviteFriendStack.Screen name="InviteFriend" component={InviteFriend}
      options={{

         header: ()=> (<Header navigation={navigation} title={"Invite Friend"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Invite Friend"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Invite Friend"} />),
        ...customHeaderTitleContainerStyle
      }}

    />

    <InviteFriendStack.Screen name="InviteFriendList" component={InviteFriendList}
      options={{

       //   header: ()=> (<Header navigation={navigation} title={"Invite Friend List"}  isBack={true} />),
        headerTitle: 'Invite Friend List',...headerStyleOption
      }} />

  </InviteFriendStack.Navigator>
)
const FriendHistoryScreen = ({ navigation }) => (

  <FriendHistoryStack.Navigator>


    <FriendHistoryStack.Screen name="FriendHistoryList" component={FriendHistoryList}
      options={{
         header: ()=> (<Header navigation={navigation} title={"Friends History List"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Friends History List"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Friends History List"} />),
        ...customHeaderTitleContainerStyle
      }} />

    <FriendHistoryStack.Screen name="FriendHistoryDetail" component={FriendHistoryDetail}
      options={{
         // header: ()=> (<Header navigation={navigation} title={"Friends History Detail"}  isBack={true} />),
        headerTitle: 'Friends History Detail',...headerStyleOption
      }} />
  </FriendHistoryStack.Navigator>
)
const TransactionHistoryScreen = ({ navigation }) => (

  <TransactionHistoryStack.Navigator>

    <TransactionHistoryStack.Screen name="TransactionHistory" component={TransactionHistory}
      options={{

         header: ()=> (<Header navigation={navigation} title={"Transaction History"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Class Manager"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Class Manager"} />),
        ...customHeaderTitleContainerStyle
      }}
    />


    <TransactionHistoryStack.Screen name="TransactionHistoryList" component={TransactionHistoryList}
      options={{

        //  header: ()=> (<Header navigation={navigation} title={"Transaction History List"} />),
        // //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Transaction History List"} />),
        // // headerRight:() => (<RightMenu navigation={navigation} title={"Transaction History List"} />),
        // ...customHeaderTitleContainerStyle
        headerTitle: 'Transaction History List',...headerStyleOption
      }}
    />

    <TransactionHistoryStack.Screen name="TransactionHistoryDetail" component={TransactionHistoryDetail}
      options={{

         // header: ()=> (<Header navigation={navigation} title={"Transaction History List"}  isBack={true} />),
        headerTitle: 'Transaction History List',...headerStyleOption
      }}
    />



  </TransactionHistoryStack.Navigator>
)

const SchedulerScreen = ({ navigation }) => (

  <SchedulerStack.Navigator>

    <DashBooardStack.Screen name="CourtScheduler" component={CourtScheduler}
      options={{
       
         header: ()=> (<Header navigation={navigation} title={"Scheduler"}  isBack={true} routeName={"DashboardList"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Scheduler"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Scheduler"} />),
        ...customHeaderTitleContainerStyle
      }}

    />
    <SchedulerStack.Screen name="Scheduler" component={Scheduler}
      options={{

         header: ()=> (<Header navigation={navigation} title={"Scheduler"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Scheduler"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Scheduler"} />),
        ...customHeaderTitleContainerStyle
      }}

    />
    <SchedulerStack.Screen name="SchedulerFacilityCourts" component={SchedulerFacilityCourts}
      options={{
         header: ()=> (<Header navigation={navigation} title={"Scheduler"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Scheduler"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Scheduler"} />),
        ...customHeaderTitleContainerStyle
      }}
    />
    <SchedulerStack.Screen name="SchedulerTimeSlots" component={SchedulerTimeSlots}
      options={{
         header: ()=> (<Header navigation={navigation} title={"Scheduler"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Scheduler"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Scheduler"} />),
        ...customHeaderTitleContainerStyle
      }}
    />
    <SchedulerStack.Screen name="SchedulerPaymentDetail" component={SchedulerPaymentDetail}
      options={{
        //  header: ()=> (<Header navigation={navigation} title={"Booking Detail"}  isBack={true} />),
        headerTitle: 'Booking Detail',...headerStyleOption
      }}

    />


    <SchedulerStack.Screen name="MyCourtReservation" component={SchedulerReservation}
      options={{

         header: ()=> (<Header navigation={navigation} title={"My Reservations"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"My Reservations"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"My Reservations"} />),
        ...customHeaderTitleContainerStyle
      }}
    />

    <SchedulerStack.Screen name="SchedulerReservationDetail" component={SchedulerReservationDetail}
      options={{
       //   header: ()=> (<Header navigation={navigation} title={"My Reservation Detail"}  isBack={true} />),
          headerTitle: 'My Reservation Detail',...headerStyleOption
      }}

    />

    <SchedulerStack.Screen name="CustomerPaySharing" component={CustomerPaySharing}
      options={{

         header: ()=> (<Header navigation={navigation} title={"Payment Sharing List"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Payment Sharing List"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Payment Sharing List"} />),
        ...customHeaderTitleContainerStyle
      }}



    />
    <SchedulerStack.Screen name="CustomerPaymentSharing" component={CustomerPaymentSharing}
      options={{

         header: ()=> (<Header navigation={navigation} title={"Payment Sharing"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Payment Sharing"} />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Payment Sharing"} />),
        ...customHeaderTitleContainerStyle
      }}


    />
  </SchedulerStack.Navigator>
)

const ManageContractScreen = ({ navigation }) => (
  <ManageContractStack.Navigator >

    <ManageContractStack.Screen name="ManageContract" component={ManageContract}
      options={{

         header: ()=> (<Header navigation={navigation} title={"Manage Contract"} />),
        //headerLeft: () => (<HeaderLeft navigation={navigation} title={"Manage Contract"}  />),
        // headerRight:() => (<RightMenu navigation={navigation} title={"Manage Contract"}  />),
        ...customHeaderTitleContainerStyle
      }} />

    <ManageContractStack.Screen name="ManageContractList" component={ManageContractList}
      options={{
         // header: ()=> (<Header navigation={navigation} title={"Manage Contract"}  isBack={true} />),
        headerTitle: 'Manage Contract',...headerStyleOption
      }}
    />
    <ManageContractStack.Screen name="ManageContractDetailList" component={ManageContractDetailList}
      options={{
      //    header: ()=> (<Header navigation={navigation} title={"Manage Contract Detail"}  isBack={true} />),
        headerTitle: 'Manage Contract Detail',...headerStyleOption
      }}
    />


  </ManageContractStack.Navigator>

)
const ManageContactListScreen = ({ navigation }) => (
  <ManageContactListStack.Navigator >
    <ManageContactListStack.Screen name="ManageContractList" component={ManageContractList}
      options={{
        //  header: ()=> (<Header navigation={navigation} title={"Manage Contract"}  isBack={true} />),
        headerTitle: 'Manage Contract',...headerStyleOption
      }}
    />
  </ManageContactListStack.Navigator>
)
// const customerProcessPaymentSharingScreen =  ({navigation})=>(
//   <CustomerProcessPaymentSharingStack.Screen name="CustomerPaymentSharing" component={CustomerPaymentSharing}
//   options={{

//     headerTitle:( )=>  ( <Header  navigation={navigation}  title={"Payment Sharing"}/>),
//     ...customHeaderTitleContainerStyle
//            }} 
//  /> )

const OpenBalanceDetailStackScreen = ({ navigation }) => (

  <OpenBalanceDetailStack.Navigator>

    <OpenBalanceDetailStack.Screen name="OpenBalanceDetail" component={OpenBalanceDetail}
      options={{
       //  header: ()=> (<Header navigation={navigation} title={"Open Balance Detail"} />),

         header: ()=> (<Header navigation={navigation} title={"Open Balance Detail"} isBack={true} routeName={"DashboardList"} />),
         ...customHeaderTitleContainerStyle
      }}
       />
  </OpenBalanceDetailStack.Navigator>

)



const StackNav = ({ navigation }) => (
  <Stack.Navigator>



    {/* <Stack.Screen name=" " component={AppStartPage}   
         options={{
          headerShown:false,
         
        }}
         /> */}
    <Stack.Screen name="Login" component={LoginView}
      options={{
        headerShown: false,
        //  StatusBar:true
      }} />

    <Stack.Screen name="Signup" component={SignUpView}
      options={{
         // header: ()=> (<Header navigation={navigation} title={"Activity(s) Selected"}  isBack={true} />),
        headerTitle: 'Signup ',...headerStyleOption
       
        
      }} />




    <Stack.Screen name="SignupTermsConditions" component={SignupTermsConditions}
      options={{
        //  header: ()=> (<Header navigation={navigation} title={"Terms & Conditions"}  isBack={true} />),
        headerTitle: 'Terms & Conditions',...headerStyleOption
      }} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword}
      options={{
        //  header: ()=> (<Header navigation={navigation} title={"Forgot Password"}  isBack={true} />),
        headerTitle: 'Forgot Password',...headerStyleOption
      }} />

    <Stack.Screen name="ResetPassword" component={ResetPassword}
      options={{
        //  header: ()=> (<Header navigation={navigation} title={"Reset Password"}  isBack={true} />),
      headerTitle: 'Reset Password',...headerStyleOption
        //headerLeft: null,
      }} />
    <Stack.Screen name="ForgotUsername" component={ForgotUsername}
      options={{
       //   header: ()=> (<Header navigation={navigation} title={"Forgot Username"}  isBack={true} />),
        headerTitle: 'Forgot Username',...headerStyleOption
      }} />
    <Stack.Screen name="ForgotusernameEmail" component={ForgotusernameEmail}
      options={{
        //  header: ()=> (<Header navigation={navigation} title={"Forgot Username"}  isBack={true} />),
        headerTitle: 'Forgot Username',...headerStyleOption
      }} />

    {/* <Stack.Screen name="CurrentFamilyMembers" component={CurrentFamilyMembers}
          options={{
              header: ()=> (<Header navigation={navigation} title={"Activity(s) Selected"}  isBack={true} />),
            headerTitle: 'Current Family Members'
          }} />  */}




     <Stack.Screen name="Test" component={Test}
      options={{
         headerTitle: 'Test'
      }} />


  </Stack.Navigator>
)
UserInformation = async () => {
  const FirstName = await AsyncStorage.getItem('LoginUserFirstName');

  const LastName = await AsyncStorage.getItem('LoginUserLastName');
  
 return FirstName+' '+LastName
}

export default function Main() {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      // case 'REGISTER': 
      //   return {
      //     ...prevState,
      //     userName: action.id,
      //     userToken: action.token,
      //     isLoading: false,
      //   };
    }
  };

  // const [userToken, setuserToken] = useState(null);
  // const [userName, setuserName] = useState(null);
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  const authContext = React.useMemo(() => ({
    Login: async (LoginProps) => {

      const userToken = LoginProps.LoginProps[0].userToken;//await AsyncStorage.getItem('UserToken');
      const userName = LoginProps.LoginProps[0].userName;//await AsyncStorage.getItem('Username');
      IsCustimerProfileCompleted  = LoginProps.LoginProps[0].IsPersonProfileCompleted;
      
      console.log('user token Login: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    LogOut: async () => {
      try {

        await AsyncStorage.removeItem('UserToken');
        await AsyncStorage.getItem('Username');
        
      }
      catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },

  }), []);
  
  useEffect( async () => {

 
      let userToken;
      let rememberme;
      userToken = null;
      rememberme=  null;
      
      try
       {
        
         
           rememberme = await AsyncStorage.getItem('Rememberme');
       // alert("get re== "+ rememberme)
        if(rememberme=="true"){
          userToken = await AsyncStorage.getItem('UserToken')
          if(userToken==undefined || userToken==null){
            userToken= null;
          }
          
        }
        
        //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

        
      }
      catch (e)
       {
        console.log(e);
      }
      console.log('user token Ready: ', userToken);

      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
 //   }, 0);
  }, []);
  return (
    <Provider store={store}>

    <AuthContext.Provider value={authContext}>

      {
        //useRoute().name==='Login'? null:
    

         <CustomStatusBar visibility={  loginState.userToken==null ?false:true} />
         

        // <StatusBar translucent backgroundColor='transparent' />   

      }
      <NavigationContainer >
        {/* <StackNav/>   */}

         {
           loginState.userToken == null ?
          //  // userToken==null ?
            <StackNav />
            :
            <Drawer.Navigator drawerContent={props => <SideMenu {...props} />}
            initialRouteName=  {IsCustimerProfileCompleted ==false? "Profiled":"DashboardList"}
              screenOptions={{
                swipeEnabled: IsCustimerProfileCompleted ==false? false:true,
                drawerStyle: {
                  backgroundColor: '#c6cbef',
                  ...Platform.select({
                    isPad :{
                      width: wp('80%'),
                    },
                    ios: {
                      width: wp('60%'),
                    },
                    android: {
                      width: wp('60%'),
                    }
                    // default: {
                    //   // other platforms, web for example
                    //   fontFamily:  'OpenSans-Regular',
                    // }
                  }),
                  
                },
              }}
            >
              <Drawer.Screen name="DashboardList" component={DashboardScreens} options={{ drawerLabel: 'Dashboard', unmountOnBlur: true , headerShown:false}} />
              <Drawer.Screen name="Profiled" component={PrfileStackScreen} options={{ drawerLabel: 'Profile', unmountOnBlur: true , headerShown:false}} />
              <Drawer.Screen name="TransactionHistoryFilter" component={TransactionHistoryScreen} options={{ drawerLabel: 'Transaction History', unmountOnBlur: true , headerShown:false}} />



              <Drawer.Screen name="Friends" component={FriendMenu} options={{ drawerLabel: 'Friend', unmountOnBlur: true , headerShown:false}} />
              <Drawer.Screen name="InviteFriend" component={InviteFriendScreen} options={{ drawerLabel: 'Invite Friend', unmountOnBlur: true, headerShown:false }} />
              <Drawer.Screen name="Registration" component={RegistrationScreen} options={{ drawerLabel: 'Registration', unmountOnBlur: true , headerShown:false}} />
              <Drawer.Screen name="FriendHistory" component={FriendHistoryScreen} options={{ drawerLabel: 'Friend History', unmountOnBlur: true, headerShown:false }} />
              <Drawer.Screen name="MembershipRegistration" component={MembershipRegistrationScreen} options={{ drawerLabel: 'MembershipRegistration', unmountOnBlur: true , headerShown:false}}   />
              <Drawer.Screen name="ClinicRegistration" component={ClinicRegistrationScreen} options={{ drawerLabel: 'Clinic Registration', unmountOnBlur: true, headerShown:false }} />
              <Drawer.Screen name="MyCart" component={CartStackScreen} options={{ drawerLabel: 'My Cart', unmountOnBlur: true , headerShown:false}} />
              <Drawer.Screen name="LeagueRegistration" component={LeagueRegistrationScreen} options={{ drawerLabel: 'League Registration', unmountOnBlur: true, headerShown:false }} />
              <Drawer.Screen name="CampRegistration" component={CampRegistrationScreen} options={{ drawerLabel: 'Camp Registration', unmountOnBlur: true , headerShown:false}} />

              <Drawer.Screen name="OtherRegistration" component={OtherRegistrationScreen} options={{ drawerLabel: 'Other Registration', unmountOnBlur: true , headerShown:false}} />
              <Drawer.Screen name="Payment" component={PaymentStackScreen} options={{ drawerLabel: 'Payment', unmountOnBlur: true , headerShown:false}} />
              <Drawer.Screen name="ClassManager" component={ClassManagerScreen} options={{ drawerLabel: 'Class Manager', unmountOnBlur: true , headerShown:false}} />

              <Drawer.Screen name="CourtScheduler" component={SchedulerScreen} options={{ drawerLabel: 'Class Manager', unmountOnBlur: true , headerShown:false}} />
              <Drawer.Screen name="OpenBalanceDetail" component={OpenBalanceDetailStackScreen} options={{ drawerLabel: 'Open Balance Detail', unmountOnBlur: true , headerShown:false}} />
             <Drawer.Screen name="ReportAbsence" component={ReportAbsenceScreen} options={{ drawerLabel: 'ReportAbsence', unmountOnBlur: true , headerShown:false}} />
              <Drawer.Screen name="RequestMakeup" component={RequestMakeupScreen} options={{ drawerLabel: 'Request Make-up', unmountOnBlur: true , headerShown:false }}  />
              <Drawer.Screen name="DropInClass" component={DropInClassScreen} options={{ drawerLabel: 'Drop-In Classes', unmountOnBlur: true , headerShown:false}} />

              <Drawer.Screen name="ReportAbsenceHistory" component={ReportAbsenceHistoryScreen} options={{ drawerLabel: 'Report Absence History', unmountOnBlur: true , headerShown:false}} />
              <Drawer.Screen name="MakeupDropInHistory" component={MakeupDropInHistoryScreen} options={{ drawerLabel: 'Makeup Drop-In History', unmountOnBlur: true , headerShown:false}} />

              <Drawer.Screen name="ManageContract" component={ManageContractScreen} options={{ drawerLabel: 'Manage Contract', unmountOnBlur: true , headerShown:false}} />

              <Drawer.Screen name="CurrentMemberships" component={CurrentMembershipScreen} options={{ drawerLabel: 'Current Memberships', unmountOnBlur: true , headerShown:false}} /> 
              <Drawer.Screen name="FamilyMemberList" component={FamilyMemberListScreen} options={{ drawerLabel: 'Family Members', unmountOnBlur: true , headerShown:false}} />
               <Drawer.Screen name="CreditCardList" component={CreditCardScreen} options={{ drawerLabel: 'Manage Credit Card', unmountOnBlur: true , headerShown:false}} /> 



            </Drawer.Navigator>

        } 
      </NavigationContainer>



    </AuthContext.Provider>
    </Provider>

 
   );
 }

const styles = StyleSheet.create({
  body: {
    flex: 1,
    margin: 50,
    justifyContent:'center',
    alignItems: 'center',
    
  },
  containersss: {
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 0.75,

    justifyContent: 'center',
    alignItems: 'center',

  },
  LoginbuttonContainer: {
     
 
    marginTop: 15,
    width:'100%'

  },
  SignUpButton: {
    marginTop: 5,
    
    color: '#88aa31',
    width:'100%'

  },
  container: {
    width: '100%',
     height: '100%',
     flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
   
},
header: {
marginLeft:50
},
headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    flexWrap: 'wrap',
    textAlign:'center',
 
},
headerbackgroundColor: {
  backgroundColor: 'red', 

}

,icon:{

    position:'absolute',
    left:0,
    color:'white'

}
});
 


