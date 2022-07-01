



 
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
        name: 'Friend List',
        Link:"FriendList",
        ImageURL:require('../../../Images/Icon/friend-list.png')
    },
    {
        name: 'Invite Friend',
        Link:"InviteFriend"
        ,ImageURL:require('../../../Images/Icon/invite-friend.png')
    },
    {
        name: 'Friend History',
        Link:"FriendHistory",
        ImageURL:require('../../../Images/Icon/friend-history.png')
    }
]
export default class Friends extends Component {


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
