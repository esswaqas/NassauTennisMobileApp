 
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
 Image
} from 'react-native'
 import styles from '../../../Stylesheets/NAppSS';

 const Option = [
    {
        name: 'Report Absence',
        Link:"ReportAbsence",     
           ImageURL:require('../../../Images/Icon/Report-Absence.png')
    },
    {
        name: 'Request Make-Up',
        Link:"RequestMakeup",    
            ImageURL:require('../../../Images/Icon/Request-Make-Up.png')
    },
    {
        name: 'Drop In Class',
        Link:"DropInClass",       
         ImageURL:require('../../../Images/Icon/Drop-In-Class.png')
    },
    
    {
        name: 'Absence History',
        Link:"ReportAbsenceHistory",     
           ImageURL:require('../../../Images/Icon/Absence-History.png')
    },
    {
        name: 'Make-Up/Drop In History',
        Link:"MakeupDropInHistory",      
          ImageURL:require('../../../Images/Icon/Absence-History.png')
    },
    {
        name: 'FAQs',
        Link:"ClassMangmentFaqs",    
            ImageURL:require('../../../Images/Icon/faq.png')
    },
]
export default class ClassManager extends Component {


    constructor(props) {
        super(props);
        this.state = {
            CustomerOpenBalance: 0.00,
            CustomerHuseCredit: 0.00,
            isLoading: false
        }
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
