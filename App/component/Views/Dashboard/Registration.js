
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
 Image
} from 'react-native'
 import styles from '../../../Stylesheets/NAppSS';
 import AsyncStorage from "@react-native-async-storage/async-storage";

const Option = [
    {
        name: 'Clinic Registration',
        Link:"ClinicRegistration",
        ImageURL:require('../../../Images/Icon/Clinic-Registration.png')
    },
    {
        name: 'Camp Registration',
        Link:"CampRegistration",
        ImageURL:require('../../../Images/Icon/Camp-Registration.png')
    },
    {
        name: 'League Registration',
        Link:"LeagueRegistration",
        ImageURL:require('../../../Images/Icon/League-Registration.png')    
    },
    {
        name: 'Other Registration',
        Link:"OtherRegistration",    
        ImageURL:require('../../../Images/Icon/Other-Registration.png')  
      },
    {
        name: 'Membership Registration',
        Link:"MembershipRegistration",
        ImageURL:require('../../../Images/Icon/Membership-Registration.png')

    },
    {
        name: 'FAQs',
        Link:"RegistrationFaqs",    
            ImageURL:require('../../../Images/Icon/faq.png')

    },
]
export default class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            CustomerOpenBalance: 0.00,
            CustomerHuseCredit: 0.00,
            isLoading: false
        }
    }
    async componentDidMount() 
    {
        
        await AsyncStorage.removeItem('IsPurchaseMembershipwithActivity');
        await AsyncStorage.removeItem('PurchaseMembershipwithActivity');
        await AsyncStorage.removeItem("IsFromMembership");
        
       
    }
    render() {
        return (
            <View style={styles.Pagecontainer}>
            <View style={[styles.container,{marginTop:10}]}>
            <ScrollView>

      {
 Option.map((u, i) => {
   
    return (
      <View style={styles.MenuItemBox}>
      <TouchableOpacity onPress={() => {this.props.navigation.navigate(u.Link)}}>
          <View style={ styles.MenuItemInnerBox}>
            <Image style={styles.MenuItemBoxIcon}  resizeMode="contain"
               source={u.ImageURL}
                   />
               <Text  style={[styles.MenuItemFontSize,styles.MenuItemColor,styles.MenuItemText]}>
               {u.name}
              </Text>
          </View>
       </TouchableOpacity>
      </View>
  )

})

      }

               
       </ScrollView>
            </View>
            </View>
          
        )
    }
}
