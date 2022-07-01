
import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Platform,
    StyleSheet, ToolbarAndroid

} from 'react-native';
import styes from '../../../Stylesheets/NAppSS'
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-elements'
import CustomStatusBar from '../Shared/StatusBar'
import RightMenu from '../Shared/RightMenu'
import HeaderLeft from '../Shared/HeaderLeftside'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';
<Icon
    reverse
    name='ios-american-football'
    type='ionicon'
    color='#517fa4'
/>
 

// import {AuthContext} from  '../../component/Views/Shared/Context'

import LogoutOption from './RightMenu'

OpenMenu = () => {

    navigation.openDrawer();
}


export default function Header({ navigation, title,isBack,routeName }) {
    return (

       
   

                 <View style={{ 
            height: hp('9%'),  
            backgroundColor: '#88aa31',
             flexDirection:'row',
             justifyContent:'space-between',
             alignItems:'center',
           
     paddingLeft:10,
     paddingRight:15,
  //   paddingTop:   Platform.isPad=== 'ios' ?  hp('5%'),
     ...Platform.select({
        isPad :{
            paddingTop:hp('1%')
        },
        ios: {
            paddingTop:hp('5%')
        },
        android: {
          fontFamily:  'OpenSans-Regular',
        }
        // default: {
        //   // other platforms, web for example
        //   fontFamily:  'OpenSans-Regular',
        // }
      }),
    


             }}>

       
        <View styes={{backgroundColor: 'red', paddingLeft:100 }}>
          <HeaderLeft  navigation={navigation} title={title} isBack={isBack} routeName={routeName} />
       </View>
       <View styes={{backgroundColor: 'yellow' }}>
       <Text style={[styes.font_16,styes.fontFamily,{color:'white'}]}>{title}</Text>
       </View>
       <View styes={{backgroundColor: 'pink' }}>
      <RightMenu  navigation={navigation} title={title}  />
       </View>

     </View>
     

//         <View style={styles.container}>
   
//    <Text style={[styes.font_14,{color: 'white', fontWeight: 'bold'}]}>{title}</Text>


//                 {/* <View style={styles.LeftIcon}>
//                     <Icon name="menu" color='white' size={28} onPress={() => navigation.openDrawer()} />
//                 </View>
//                 <View style={styles.Title}>
//                     <View >
//                         <Text style={styles.headerText}> {title} </Text>
//                     </View>
//                 </View>
//                 <View style={styles.rightIcon}>
//                     <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//                         <LogoutOption navigation={navigation} title={title}
//                         />
//                     </View>
//                 </View> */}
//         </View>
);

//  if(isSideMenu==true)
// {
//     return (

//                 <View style={styles.container}>
              
//                         <View style={styles.LeftIcon}>

//                             <Icon name="menu" color='white' size={28} onPress={() => navigation.openDrawer()} />

//                         </View>

//                         <View style={styles.Title}>
//                             <View style={{ alignItems: 'flex-start' }}>
//                                 <Text style={styles.headerText}> {title} </Text>
//                             </View>
//                         </View>

//                         <View style={styles.rightIcon}>


//                             <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

//                                 <LogoutOption navigation={navigation} title={title}

//                                 />

//                             </View>


//                         </View>
//                 </View>
//     );
// }
//     else{
//         return (
//  <View style={styles.container}>
              
//                         <View style={styles.LeftIcon}>

//                              <Icon name="cancel" type='material' color='white' size={28}  style={{ color: '#88aa31' }} onPress={()=> navigation.goBack(null)} />

//                         </View>

//                         <View style={styles.Title}>
//                             <View style={{ alignItems: 'flex-start' }}>
//                                 <Text style={styles.headerText}> {title} </Text>
//                             </View>
//                         </View>

//                         <View style={styles.rightIcon}>


//                             <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

//                                 <LogoutOption navigation={navigation} title={title}

//                                 />

//                             </View>


//                         </View>
//                 </View>
//     );
//     }
}
const styles = StyleSheet.create({
    container: {
      //  width: '100%',
     //  height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: '#88aa31',
      //  backgroundColor: 'yellow',
     // paddingBottom:567
  
       
    },
    Title: {
        width: '65%',
        height:'100%',
        marginLeft: 0,
        paddingLeft: 0,
        alignItems:'center',
        justifyContent:'center',
       paddingLeft:12
       // backgroundColor:'yellow'

    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
       
        textAlign: 'left',
        flexWrap: 'wrap',
        textAlign:'center'

    }
    , LeftIcon: {
        width: '10%',
       // position: 'absolute',
     
        color: 'white',
       marginLeft:10,
       //backgroundColor:'red',
       alignItems:'center',
       justifyContent:'center'
    }
    , rightIcon: {
        width: '25%',
        //position: 'absolute',
       
        color: 'white',
         //paddingRight:10,
         alignItems:'center',
        justifyContent:'center',
        backgroundColor:'red',

    },

})

