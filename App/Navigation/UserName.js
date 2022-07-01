 

  import React, { Component } from 'react';
import { APIUrl } from '../Api/ApiUrl'

import {
 
 
  View,
  Dimensions,
  StyleSheet,Image
} from 'react-native';
//import styles from '../../App/Stylesheets/AppSS'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { Picker } from '@react-native-community/picker';
import {Caption,Paragraph,Drawer,Text,TouchableRipple,Switch,TouchableOpacity} from 'react-native-paper';
import { Tile,Avatar } from 'react-native-elements';
 
const vw = Dimensions.get('window').width/100;
const vh = Dimensions.get('window').height/100;
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
  export default class FamilyMemberList extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    
    UserName: '',
    Image:'',
    Email:'',
    ImageURL:''
  }

    
   
  async  componentDidMount() {
    var  FirstName = await AsyncStorage.getItem('LoginUserFirstName');
    var  LastName = await AsyncStorage.getItem('LoginUserLastName');
    var  image = await AsyncStorage.getItem('LoginUserImage');
    var  email = await AsyncStorage.getItem('LoginUserEmail');
   var UserName =FirstName+" "+LastName 
   
var url = await APIUrl()+'App_Shared/ProfileImage/'+image;
//'http://testing.njtennis.net/App_Shared/ProfileImage/'+image: '',
  this.setState({
      UserName:UserName,
      Image: image,//  image!= null && image!= ''? url :'',
      Email:email,
      ImageURL:url
  })

 }
  render() {
   
    return (
        
    //  <View style={{flexDirection:'row',justifyContent:'flex-start', alignItems:'center'}}>

    //     {/* <Image style={{height: 40, width: 40,alignSelf:'center' }} 
    //     source={this.state.Image == null? require('../../App/Images/left-side-menu-icons/user.png')
    //     :{uri:'http://testing.njtennis.net/App_Shared/ProfileImage/090921053446.jpg' }}
    //     /> */}
    //        {/* <Image style={{ height: 40, width: 40,alignSelf:'center' }} 
    //        resizeMode="center" 
    //        onLoad={() => this.forceUpdate()}   
    //        source={{ uri:  'https://nassautennis.net/App_Shared/ProfileImage/090921053446.jpg' }} /> */}

    //         {
    //             this.state.Image !=''?
    //             <Avatar
    //         size={45}
    //         rounded
    //         source={{ uri: 'https://nassautennis.net/App_Shared/ProfileImage/'+ this.state.Image  }}
    //         containerStyle={{ backgroundColor: '#6733b9' }}
    //       />
    //         :
    //         <Image style={{ height: 40, width: 40,alignSelf:'center' }} resizeMode="center" source={require('../../App/Images/left-side-menu-icons/user.png')} />
    //         }
    //        <Text style={styles.title}>{this.state.UserName}</Text>
    //         </View>
    <View style={styles.DrawerItem}>

     <View style={styles.imageView}>
    { this.state.Image !=''?

    <Avatar
            size={hp('5%')}
            rounded
            source={{ uri: 'https://nassautennis.net/App_Shared/ProfileImage/'+ this.state.Image  }}
            containerStyle={{ backgroundColor: '#6733b9' }}
          />
    :
     <Image style={styles.imageIcon}  resizeMode="contain" source={require('../../App/Images/left-side-menu-icons/user.png')} />
  }
     </View>

  <Text style={styles.LabelStyle}>{this.state.UserName}</Text>
      </View>

   
    )
  }

}
 
  


const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 0,
    },
    title: {
      fontSize: 2*vh,
     textAlign:'center',
      fontWeight: 'bold',
      paddingLeft:15,

    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 2*vh,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft:1*vh
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 1.5*vh,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 1*vw,
    },
    drawerSection: {
      marginTop: 1.5*vh,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },


    DrawerItem: {
      flexDirection:'row',backgroundColor:'white'
      ,//padding: 1* vh,// 10,
      marginBottom:1* vh,// 10,
      justifyContent:'flex-start', alignItems:'center', 
      marginTop: 0, marginLeft: 0, marginRight: 0, borderRadius: 0, 
      paddingLeft: 3* vh,//  30, 
      paddingRight: 2* vh,//  30, 
      paddingTop: 1* vh,//  30, 
      paddingBottom: 1* vh,//  30, 
      
      borderTopWidth:0.1,
      borderBottomWidth:0.1,
      
      shadowColor: "#000",
      shadowOffset:{
      width: 0,
      height: 2,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
   
    
    },
    imageIcon:{
  
      flex: 1,
      //width: '100%',
     // height: '100%',
      resizeMode: 'contain' ,
    alignSelf:'center'
    },
  
      imageView:{
        width:wp('5%'), 
        height:hp('5%'),
        alignItems:'center',
        alignSelf:'center',
        marginRight:hp('1%')
  
       },
       LabelStyle: {
        paddingLeft:15,
        fontSize:RFValue(13),
        ...Platform.select({
          ios: {
             
          },
          android: {
            fontFamily:  'OpenSans-Regular',
          }
          // default: {
          //   // other platforms, web for example
          //   fontFamily:  'OpenSans-Regular',
          // }
        }),
      },
  });
 